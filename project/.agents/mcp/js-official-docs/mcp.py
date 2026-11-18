# The small MCP core of a brick, the Python twin of mcp.ts: JSON-RPC over stdio, one message per
# line, standard library only, Python 3.9 or later. Every brick of .agents/mcp/ holds its own copy of
# this file, the same text, so that removing one brick never breaks another. It speaks the
# "initialize" handshake that OpenCode 2.2.7 uses by default, and the 2026-07-28 revision. Every
# answer is capped, every error is one line, and every call is written to the journal of the
# project: .agents/work/mcp-calls.log.
from __future__ import annotations

import json
import math
import os
import sys
from collections.abc import Callable
from datetime import datetime, timezone
from typing import Any, NamedTuple

Arguments = dict
Json = dict

MODERN_VERSION = '2026-07-28'
LEGACY_VERSIONS = ['2025-11-25', '2025-06-18', '2025-03-26', '2024-11-05']
DEFAULT_MAX_CHARS = 16000
VERSION_KEY = 'io.modelcontextprotocol/protocolVersion'
JS_SPACE = '\t\n\x0b\x0c\r                  　﻿'


class ToolError(Exception):
    # An error the model can act on: shown as one line, never as a stack.
    pass


class Tool(NamedTuple):
    name: str
    description: str
    # Each property: {"type": "string" | "number" | "boolean", "description": ..., "enum": [...]}
    properties: dict[str, dict[str, Any]]
    required: list[str]
    run: Callable[[dict[str, Any]], str]


class Server(NamedTuple):
    name: str
    version: str
    instructions: str
    tools: list[Tool]
    # Characters at most in one answer; 16,000 is about 4,000 tokens.
    max_chars: int = DEFAULT_MAX_CHARS


class ToolResult(NamedTuple):
    text: str
    is_error: bool


def project_root() -> str:
    # The project: the folder OpenCode starts the server in. PROJECT_ROOT overrides it (tests).
    return os.path.abspath(os.environ.get('PROJECT_ROOT', os.getcwd()))


def inside(folder: str, path: str) -> str:
    # A path given by the model, resolved inside a folder; refused when it leaves the folder.
    full = os.path.abspath(os.path.join(folder, path))
    way = os.path.relpath(full, folder)
    if way in {'.', '..'} or way.startswith('..' + os.sep) or os.path.isabs(way):
        raise ToolError(f'"{path}" is outside {folder}. Give a path inside it.')
    return full


def text(args: dict[str, Any], name: str) -> str:
    value = args.get(name)
    return value.strip(JS_SPACE) if isinstance(value, str) else ''


def required_text(args: dict[str, Any], name: str) -> str:
    value = text(args, name)
    if value == '':
        raise ToolError(f'Give "{name}".')
    return value


def utf16_length(value: str) -> int:
    # The length of JavaScript: in UTF-16 code units.
    return len(value) + sum(1 for char in value if ord(char) > 0xFFFF)


def cap(answer: str, max_chars: int) -> str:
    # Counted in UTF-16 code units, as mcp.ts counts.
    if utf16_length(answer) <= max_chars:
        return answer
    units = answer.encode('utf-16-le', 'surrogatepass')
    newline = next((position for position in range(min(max_chars, len(units) // 2 - 1), -1, -1) if units[2 * position:2 * position + 2] == b'\n\x00'), -1)
    end = newline if newline > max_chars / 2 else max_chars
    kept = units[:2 * end].decode('utf-16-le', 'replace')
    return f'{kept}\n[truncated: the answer is longer than {max_chars} characters; ask for a smaller part]'


def journal(server: Server, tool: str, answer: str) -> None:
    root = project_root()
    if not os.path.isdir(os.path.join(root, '.agents')):
        return
    try:
        folder = os.path.join(root, '.agents', 'work')
        os.makedirs(folder, exist_ok=True)
        now = datetime.now(timezone.utc)
        stamp = f'{now:%Y-%m-%dT%H:%M:%S}.{now.microsecond // 1000:03d}Z'
        length = utf16_length(answer)
        with open(os.path.join(folder, 'mcp-calls.log'), 'a', encoding='utf-8', newline='') as file:
            file.write(f'{stamp}\t{server.name}\t{tool}\t{length} chars\t~{math.ceil(length / 4)} tokens\n')
    except OSError:
        # The journal must never break an answer.
        pass


def call_tool(server: Server, name: str, args: dict[str, Any]) -> ToolResult:
    tool = next((item for item in server.tools if item.name == name), None)
    if tool is None:
        names = ', '.join(item.name for item in server.tools)
        return ToolResult(f'Unknown tool "{name}". Tools: {names}.', True)
    try:
        result = ToolResult(cap(tool.run(args), server.max_chars), False)
    except ToolError as error:
        result = ToolResult(str(error), True)
    except Exception as error:  # noqa: BLE001 - any other failure is told in one line
        first = str(error).split('\n')[0]
        result = ToolResult(f'Internal error: {first}', True)
    journal(server, name, result.text)
    return result


def tool_list(server: Server) -> list[dict[str, Any]]:
    return [
        {
            'name': tool.name,
            'description': tool.description,
            'inputSchema': {
                'type': 'object',
                'properties': tool.properties,
                'required': tool.required,
                'additionalProperties': False,
            },
        }
        for tool in server.tools
    ]


def reply(identifier: Any, result: dict[str, Any]) -> dict[str, Any]:
    return {'jsonrpc': '2.0', 'id': identifier, 'result': result}


def failure(identifier: Any, code: int, message: str) -> dict[str, Any]:
    return {'jsonrpc': '2.0', 'id': identifier, 'error': {'code': code, 'message': message}}


def request_version(params: Any) -> str | None:
    meta = params.get('_meta') if isinstance(params, dict) else None
    version = meta.get(VERSION_KEY) if isinstance(meta, dict) else None
    return version if isinstance(version, str) else None


def initialize(server: Server, request: dict[str, Any]) -> dict[str, Any]:
    params = request.get('params')
    asked = params.get('protocolVersion') if isinstance(params, dict) else None
    return reply(request.get('id'), {
        'protocolVersion': asked if isinstance(asked, str) and asked in LEGACY_VERSIONS else LEGACY_VERSIONS[0],
        'capabilities': {'tools': {}},
        'serverInfo': {'name': server.name, 'version': server.version},
        'instructions': server.instructions,
    })


def js_string(value: Any) -> str:
    # String(value) of JavaScript, for the few values a request may hold.
    if value is None:
        return 'undefined'
    if isinstance(value, bool):
        return 'true' if value else 'false'
    return str(value)


def _call(server: Server, request: dict[str, Any], complete: dict[str, Any]) -> dict[str, Any]:
    params = request.get('params') if isinstance(request.get('params'), dict) else {}
    args = params.get('arguments') if isinstance(params.get('arguments'), dict) else {}
    result = call_tool(server, js_string(params.get('name')), args)
    return reply(request.get('id'), {
        **complete,
        'content': [{'type': 'text', 'text': result.text}],
        'isError': result.is_error,
    })


def operation(server: Server, request: dict[str, Any], modern: bool) -> dict[str, Any]:
    complete = {'resultType': 'complete'} if modern else {}
    identifier = request.get('id')
    method = request.get('method')
    if method == 'ping':
        return reply(identifier, {})
    if method == 'server/discover':
        return reply(identifier, {
            **complete,
            'supportedVersions': [MODERN_VERSION, *LEGACY_VERSIONS],
            'capabilities': {'tools': {}},
            'instructions': server.instructions,
        })
    if method == 'tools/list':
        return reply(identifier, {**complete, 'tools': tool_list(server)})
    if method == 'tools/call':
        return _call(server, request, complete)
    return failure(identifier, -32601, f'Method not found: {js_string(method)}')


def handle(server: Server, request: dict[str, Any]) -> dict[str, Any] | None:
    # Answers one request, or returns None for a notification.
    if request.get('id') is None:
        return None
    if request.get('method') == 'initialize':
        return initialize(server, request)
    version = request_version(request.get('params'))
    if version is not None and version != MODERN_VERSION:
        return failure(request.get('id'), -32022, f'Unsupported protocol version {version}')
    return operation(server, request, version is not None)


def handle_line(server: Server, line: str) -> dict[str, Any] | None:
    if line.strip(JS_SPACE) == '':
        return None
    try:
        request = json.loads(line)
    except ValueError:
        return failure(None, -32700, 'Parse error')
    if not isinstance(request, dict):
        return failure(None, -32600, 'Invalid request')
    return handle(server, request)


def serve(server: Server) -> None:
    # Reads requests on stdin, one per line, and writes each answer on stdout, in order.
    with open(sys.stdin.fileno(), encoding='utf-8', errors='replace', newline='\n', closefd=False) as requests, \
            open(sys.stdout.fileno(), 'w', encoding='utf-8', newline='\n', closefd=False) as answers:
        for line in requests:
            answer = handle_line(server, line.rstrip('\n'))
            if answer is not None:
                answers.write(json.dumps(answer, ensure_ascii=False, separators=(',', ':')) + '\n')
                answers.flush()
