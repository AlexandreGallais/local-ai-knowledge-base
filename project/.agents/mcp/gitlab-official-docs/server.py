# MCP server of a documentation brick, the Python twin of server.ts: search the official
# documentation held in the brick (library/), then read one section. Its name and the words of its
# tools come from brick.json; the code is the same in every documentation brick. It never writes a
# file, but its index, built once in index/ when missing. Python 3.9 or later, standard library only.
# Run by OpenCode in the project folder: python3 .agents/mcp/<brick>/server.py
from __future__ import annotations

import json
import os
import re
import sys
from typing import Any

HERE = os.path.dirname(os.path.abspath(__file__))
# No __pycache__ folder in the project: the brick stays as it was imported.
sys.dont_write_bytecode = True
sys.path.insert(0, HERE)

from build_index import build_indexes, read_text  # noqa: E402
from mcp import Server, Tool, ToolError, inside, required_text, serve, text  # noqa: E402
from search import IndexEntry, Statistics, js_trim, parse_index, search, sections, statistics, utf16_key  # noqa: E402

with open(os.path.join(HERE, 'brick.json'), encoding='utf-8') as settings_file:
    # What makes this brick itself: its name, what it holds, the examples of its tools.
    SETTINGS = json.load(settings_file)

# A file of the documentation, in one of the formats the search reads.
# Its path is the one of the source, spaces and backquotes included; inside() keeps it in the brick.
DOCUMENT = re.compile(r'library/[^#\\]+\.(?:md|mdx|markdown|rst|txt|adoc|tex|texi|ptx|xml|html?|json)(?:\.in)?\Z')
_entries: dict[str, list[IndexEntry]] = {}
_statistics: dict[tuple[str, str], Statistics] = {}


def brick_root() -> str:
    # The folder of this brick. BRICK_ROOT in the environment overrides it (tests).
    return os.environ.get('BRICK_ROOT', HERE)


def entries(brick: str) -> list[IndexEntry]:
    # Every index entry of the brick. Built once when the index is missing.
    cached = _entries.get(brick)
    if cached is not None:
        return cached
    folder = os.path.join(brick, 'index')
    if not os.path.isdir(folder) or not os.listdir(folder):
        build_indexes(brick)
    names = sorted((name for name in os.listdir(folder) if name.endswith('.idx')), key=utf16_key)
    found = [entry for name in names for entry in parse_index(read_text(os.path.join(folder, name)))]
    _entries[brick] = found
    return found


def search_docs(args: dict[str, Any]) -> str:
    query = required_text(args, 'query')
    tool = text(args, 'tool')
    brick = brick_root()
    every = entries(brick)
    scope = every if tool == '' else [entry for entry in every if entry.id.startswith(f'library/{tool}/')]
    key = (brick, tool)
    if key not in _statistics:
        _statistics[key] = statistics(scope)
    hits = search(scope, query, stats=_statistics[key])
    if not hits:
        return f'No section matches "{query}". Try other English words, or the name of the API.'
    return '\n'.join([*(f'{hit.id} | {hit.title}' for hit in hits), 'Read one of them with read_doc and its id.'])


def table_of_contents(identifier: str, document: str) -> str:
    parts = sections(identifier, document)
    first = parts[0].title if parts else identifier
    return '\n'.join([f'{identifier}: {first}', 'Sections:', *(f'- {part.id}' for part in parts if '#' in part.id)])


def read_doc(args: dict[str, Any]) -> str:
    identifier = required_text(args, 'id')
    pieces = identifier.split('#')
    path = pieces[0]
    anchor = pieces[1] if len(pieces) > 1 else None
    if not DOCUMENT.match(path):
        example = SETTINGS['idExample']
        raise ToolError(f'"{identifier}" is not a document id. Use an id that search_docs gives, as "{example}".')
    file = inside(brick_root(), path)
    if not os.path.isfile(file):
        raise ToolError(f'No document "{path}". Use an id that search_docs gives.')
    document = read_text(file)
    parts = sections(path, document)
    if anchor is None:
        whole = parts[0] if parts else None
        if len(parts) == 1 and whole is not None:
            return f'{whole.title}\n\n{js_trim(whole.text)}'
        start = js_trim('' if whole is None else whole.text)[:1500]
        return f'{start}\n\n{table_of_contents(path, document)}'
    part = next((item for item in parts if item.id == identifier), None)
    if part is None:
        raise ToolError(f'No section "{anchor}" in {path}.\n{table_of_contents(path, document)}')
    return f'{part.title}\n\n{js_trim(part.text)}'


SERVER = Server(
    name=SETTINGS['name'],
    version='0.3.0',
    instructions=SETTINGS['instructions'],
    tools=[
        Tool(
            name='search_docs',
            description=SETTINGS['search'],
            properties={
                'query': {
                    'type': 'string',
                    'description': f"English words or an API name, as {SETTINGS['queryExample']}.",
                },
                'tool': {
                    'type': 'string',
                    'description': f"Optional: search one tool only, as {SETTINGS['toolExample']}.",
                },
            },
            required=['query'],
            run=search_docs,
        ),
        Tool(
            name='read_doc',
            description='Read one section of the documentation by its id. Without "#section", returns the start of the page and its sections.',
            properties={
                'id': {
                    'type': 'string',
                    'description': f"A section id from search_docs, as \"{SETTINGS['idExample']}\".",
                },
            },
            required=['id'],
            run=read_doc,
        ),
    ],
)

if __name__ == '__main__':
    serve(SERVER)
