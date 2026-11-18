#!/usr/bin/env python3
"""The import script of the base, in Python: the same import as import.ts, for a machine without Node.

It takes every part found in its folder (kit-001.txt, js-official-docs-001.txt...), whatever their
packs, checks them all, then writes everything in the project at once: the kit (a project of its own:
package.json, the format and lint configs, AGENTS.md, opencode.json, .agents/ and example code) and
each pasted brick of .agents/mcp/, with its line in opencode.json. One file, the standard library of
Python 3.9 or later only, no package:
    python3 import.py [--from <folder of the parts>] [--target <project root>]
Default: the parts next to this file, the current folder as the project.

A damaged or missing part is named, and nothing is written. In an empty folder, the kit is written
whole. In a project that already exists, nothing the team wrote is replaced: every file outside
.agents/ (package.json, configs, AGENTS.md, skills) is written only when missing, the example code of
the kit (src/) is left aside, and the import lists what it left, to be merged by hand. The bricks of
.agents/mcp/ are replaced whole, and the settings the team added to opencode.json stay.

Parts compressed with gzip are read by every Python 3; with zstd, by Python 3.14 or later; with
brotli, by import.ts only, as the standard library of Python has no brotli.
"""
from __future__ import annotations

import base64
import gzip
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
from typing import Any

MAGIC = "LOCAL-AI-BASE EXPORT"
END = "END OF PART"
Z85 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#"
STREAM_MAGIC = b"LAB2\n"
PART_NAME = re.compile(r"^(.+)-(\d{3})\.txt$")
BRICKS = ".agents/mcp"
BRICK_PATH = re.compile(r"^\.agents/mcp/([^/]+)/")
# The example code of the kit: written in an empty folder, left aside in a project that exists.
EXAMPLE = "src/"
INSTRUCTIONS = [
    ".agents/rules.md",
    ".agents/mcp/*/rules.md",
]
# OpenCode formatters that would run before the format configs of the project on the same files.
BUILT_IN_FORMATTERS = [
    "prettier",
    "biome",
    "oxfmt",
]
ALL_EXTENSIONS = [
    ".ts",
    ".mts",
    ".js",
    ".mjs",
    ".html",
    ".json",
    ".css",
    ".scss",
]
# The formatters OpenCode runs after each write, in this order, as import.ts declares them.
FORMATTERS = [
    {
        "name": "eslint-format",
        "config": "eslint.format.config.mjs",
        "command": [
            "npx",
            "--no",
            "--",
            "eslint",
            "--config",
            "eslint.format.config.mjs",
            "--fix",
            "$FILE",
        ],
        "extensions": [extension for extension in ALL_EXTENSIONS if extension not in (".json", ".css", ".scss")],
    },
    {
        "name": "prettier-format",
        "config": ".prettierrc.json",
        "command": [
            "npx",
            "--no",
            "--",
            "prettier",
            "--write",
            "$FILE",
        ],
        "extensions": ALL_EXTENSIONS,
    },
    {
        "name": "stylelint-format",
        "config": "stylelint.format.config.mjs",
        "command": [
            "npx",
            "--no",
            "--",
            "stylelint",
            "--config",
            "stylelint.format.config.mjs",
            "--fix",
            "--allow-empty-input",
            "$FILE",
        ],
        "extensions": [
            ".css",
            ".scss",
        ],
    },
]
# Formatters of earlier versions of the kit.
OLD_FORMATTERS = ["agents-format"]


class PartError(Exception):
    """A part that cannot be read: its message is said, and nothing is written."""


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def field(lines: list[str], key: str, name: str) -> str:
    for line in lines:
        if line.startswith(f"{key}: "):
            return line[len(key) + 2 :].strip()
    raise PartError(f'{name}: missing "{key}" in the header; paste the part again')


def to_number(text: str) -> int:
    try:
        return int(text)
    except ValueError:
        return 0


def parse_part(text: str, name: str) -> dict[str, Any]:
    lines = [line.rstrip() for line in text.replace("\r\n", "\n").split("\n")]
    separator = lines.index("---") if "---" in lines else -1
    end = next((index for index, line in enumerate(lines) if line.startswith(END)), -1)
    if lines[0] != MAGIC or separator < 0:
        raise PartError(f"{name}: not a part of the export; its first lines are missing")
    if end < 0:
        raise PartError(f"{name}: the end of the part is missing; paste the part again")
    header = lines[:separator]
    numbers = field(header, "part", name).split("/")
    payload = lines[separator + 1 : end]
    if sha256("\n".join(payload).encode("utf-8")) != field(header, "part-sha256", name):
        raise PartError(f"{name}: the content was damaged by the paste; paste the part again")
    return {
        "name": name,
        "pack": field(header, "pack", name),
        "index": to_number(numbers[0]) if len(numbers) > 0 else 0,
        "count": to_number(numbers[1]) if len(numbers) > 1 else 0,
        "compression": field(header, "compression", name),
        "encoding": field(header, "encoding", name),
        "total_bytes": to_number(field(header, "total-bytes", name)),
        "total_sha": field(header, "total-sha256", name),
        "payload": payload,
    }


def z85_decode(text: str, length: int) -> bytes:
    digits = {character: digit for digit, character in enumerate(Z85)}
    output = bytearray()
    for offset in range(0, len(text) - len(text) % 5, 5):
        value = 0
        for character in text[offset : offset + 5]:
            value = value * 85 + digits.get(character, 0)
        output += (value & 0xFFFFFFFF).to_bytes(4, "big")
    return bytes(output[:length])


def decompress(data: bytes, method: str, pack: str) -> bytes:
    if method == "gzip":
        return gzip.decompress(data)
    if method == "zstd":
        try:
            from compression import zstd  # type: ignore[import-not-found]
        except ImportError:
            raise PartError(f'the parts of "{pack}" are compressed with zstd, which Python reads from version 3.14: '
                "run python3.14 import.py, or node import.ts") from None
        return zstd.decompress(data, options={zstd.DecompressionParameter.window_log_max: 30})
    raise PartError(f'the parts of "{pack}" are compressed with {method}, which the standard library of Python does not read: '
        "run node import.ts, or ask for an export in zstd or gzip")


def check_complete(parts: list[dict[str, Any]], pack: str) -> None:
    if len(parts) == 0:
        raise PartError(f'no part of the pack "{pack}" found')
    first = parts[0]
    for part in parts:
        if part["total_sha"] != first["total_sha"] or part["count"] != first["count"]:
            raise PartError(f"{part['name']}: comes from another export than {first['name']}; paste the parts of one export only")
    for index in range(1, first["count"] + 1):
        if not any(part["index"] == index for part in parts):
            raise PartError(f'part {index}/{first["count"]} of "{pack}" is missing: paste {pack}-{index:03d}.txt')


def unpack(stream: bytes) -> list[dict[str, Any]]:
    if stream[: len(STREAM_MAGIC)] != STREAM_MAGIC:
        raise PartError("the decoded export is not readable")
    line_end = stream.index(b"\n", len(STREAM_MAGIC))
    manifest = json.loads(stream[len(STREAM_MAGIC) : line_end].decode("utf-8"))
    offset = line_end + 1
    files = []
    for path, size in manifest:
        if path.startswith("/") or ".." in path.split("/"):
            raise PartError(f"unsafe path in the export: {path}")
        files.append({
            "path": path,
            "data": stream[offset : offset + size],
        })
        offset += size
    return files


def decode_pack(parts: list[dict[str, Any]], pack: str) -> dict[str, Any]:
    check_complete(parts, pack)
    ordered = sorted(parts, key=lambda part: part["index"])
    first = ordered[0]
    text = "".join(line for part in ordered for line in part["payload"])
    if first["encoding"] == "z85":
        compressed = z85_decode(text, first["total_bytes"])
    else:
        compressed = base64.b64decode(text + "=" * (-len(text) % 4))
    if sha256(compressed) != first["total_sha"]:
        raise PartError(f'the parts of "{pack}" do not form the same export; paste them again')
    return {
        "name": pack,
        "files": unpack(decompress(compressed, first["compression"], pack)),
    }


def read_packs(source: str) -> list[dict[str, Any]]:
    """Reads and checks every part found in the folder, grouped by pack. Writes nothing."""
    names = sorted(name for name in os.listdir(source) if PART_NAME.match(name))
    parts = []
    for name in names:
        with open(os.path.join(source, name), encoding="utf-8", newline="") as handle:
            parts.append(parse_part(handle.read(), name))
    packs = sorted({part["pack"] for part in parts})
    if len(packs) == 0:
        raise PartError(f"no part found in {source}: paste the parts (kit-001.txt...) beside import.py")
    return [decode_pack([part for part in parts if part["pack"] == pack], pack) for pack in packs]


def owned_by_team(path: str) -> bool:
    """Files the team owns: written when missing, never replaced by an update of the kit."""
    return path != "opencode.json" and (not path.startswith(".agents/") or path.startswith(".agents/skills/"))


def bricks_of(files: list[dict[str, Any]]) -> list[str]:
    """The bricks a pack brings: .agents/mcp/<brick>/..., replaced whole so that no old file stays."""
    bricks: list[str] = []
    for file in files:
        match = BRICK_PATH.match(file["path"])
        if match is not None and match.group(1) not in bricks:
            bricks.append(match.group(1))
    return bricks


def read_json(path: str) -> dict[str, Any]:
    if not os.path.exists(path):
        return {}
    with open(path, encoding="utf-8") as handle:
        value = json.load(handle)
    return value if isinstance(value, dict) else {}


def record(value: Any) -> dict[str, Any]:
    return dict(value) if isinstance(value, dict) else {}


def present_bricks(target: str) -> list[str]:
    """The bricks present in the project: each folder of .agents/mcp/ that holds a server.ts."""
    folder = os.path.join(target, BRICKS)
    if not os.path.isdir(folder):
        return []
    return sorted(name for name in os.listdir(folder) if os.path.isdir(os.path.join(folder, name)) and os.path.exists(os.path.join(folder, name, "server.ts")))


def js_string(value: Any) -> str:
    """String(value) as JavaScript writes it, for the brick a command names."""
    if value is None:
        return "undefined"
    if isinstance(value, str):
        return value
    return json.dumps(value)


def sync_servers(current: dict[str, Any], bricks: list[str]) -> dict[str, Any]:
    """The servers of the config without those of a brick that is gone, then one per brick present."""
    kept: dict[str, Any] = {}
    for name, entry in current.items():
        command = record(entry).get("command")
        brick = None
        if isinstance(command, list):
            match = BRICK_PATH.match(js_string(command[1] if len(command) > 1 else None))
            brick = match.group(1) if match is not None else None
        if brick is None or brick in bricks:
            kept[name] = entry
    for brick in bricks:
        kept[brick] = {
            "type": "local",
            "command": [
                "node",
                f"{BRICKS}/{brick}/server.ts",
            ],
            "codemode": False,
        }
    return kept


def sync_formatter(current: dict[str, Any], configs: list[str]) -> dict[str, Any]:
    """The formatters of the config: one per format config the project holds, and the built-in ones off."""
    ours = [item for item in FORMATTERS if item["config"] in configs]
    names = [item["name"] for item in FORMATTERS]
    kept = {name: value for name, value in current.items() if name not in OLD_FORMATTERS and name not in names}
    if len(ours) == 0:
        return kept
    for name in BUILT_IN_FORMATTERS:
        kept[name] = {"disabled": True}
    for item in ours:
        kept[item["name"]] = {
            "command": item["command"],
            "extensions": item["extensions"],
        }
    return kept


def present_format_configs(target: str) -> list[str]:
    return [item["config"] for item in FORMATTERS if os.path.exists(os.path.join(target, item["config"]))]


def sync_config(config: dict[str, Any], bricks: list[str], format_configs: list[str]) -> dict[str, Any]:
    """opencode.json with the instructions of the base, a formatter per format config of the project and
    one local MCP server per brick present; the other settings of the file are kept as they are."""
    instructions = config.get("instructions")
    instructions = [item for item in instructions if isinstance(item, str)] if isinstance(instructions, list) else []
    formatter = sync_formatter(record(config.get("formatter")), format_configs)
    mcp = record(config.get("mcp"))
    mcp["servers"] = sync_servers(record(mcp.get("servers")), bricks)
    synced = dict(config)
    synced["instructions"] = INSTRUCTIONS + [item for item in instructions if item not in INSTRUCTIONS]
    synced["formatter"] = formatter
    synced["mcp"] = mcp
    return synced


def compact(value: Any) -> str:
    """JSON.stringify(value) of JavaScript."""
    return json.dumps(value, ensure_ascii=False, separators=(",", ":"))


def write(target: str, file: dict[str, Any]) -> None:
    path = os.path.join(target, file["path"])
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "wb") as handle:
        handle.write(file["data"])


def install_packs(packs: list[dict[str, Any]], target: str) -> dict[str, Any]:
    """Writes the packs into the project. The packs are already checked: nothing here can fail on them."""
    files = [file for pack in packs for file in pack["files"]]
    for brick in bricks_of(files):
        shutil.rmtree(os.path.join(target, BRICKS, brick), ignore_errors=True)
    config_file = next((file for file in files if file["path"] == "opencode.json"), None)
    config = read_json(os.path.join(target, "opencode.json"))
    written, kept = write_files(files, target)
    servers = write_config(target, config, config_file)
    return {
        "packs": [pack["name"] for pack in packs],
        "written": written + 1,
        "kept": kept,
        "servers": servers,
    }


def write_files(files: list[dict[str, Any]], target: str) -> tuple[int, list[str]]:
    """Writes every file of the packs but opencode.json; returns how many, and the paths left aside."""
    kept: list[str] = []
    # A project that exists already has its own package.json: the example code of the kit stays out.
    existing = os.path.exists(os.path.join(target, "package.json"))
    written = 0
    for file in files:
        path = file["path"]
        if path == "opencode.json":
            continue
        if (owned_by_team(path) and os.path.exists(os.path.join(target, path))) or (existing and path.startswith(EXAMPLE)):
            kept.append(path)
            continue
        write(target, file)
        written += 1
    return written, kept


def write_config(target: str, config: dict[str, Any], config_file: dict[str, Any] | None) -> list[str]:
    """Writes opencode.json synced with the bricks present; returns them."""
    fresh = len(config) == 0
    if fresh:
        original = config_file["data"].decode("utf-8") if config_file is not None else None
    else:
        with open(os.path.join(target, "opencode.json"), encoding="utf-8", newline="") as handle:
            original = handle.read()
    servers = present_bricks(target)
    base = json.loads(original) if fresh and original is not None else config
    synced = sync_config(base, servers, present_format_configs(target))
    # The file keeps its own layout when its content does not change.
    os.makedirs(target, exist_ok=True)
    with open(os.path.join(target, "opencode.json"), "w", encoding="utf-8", newline="") as handle:
        if original is not None and compact(json.loads(original)) == compact(synced):
            handle.write(original)
        else:
            handle.write(json.dumps(synced, ensure_ascii=False, indent=2) + "\n")
    return servers


def build_indexes(target: str, bricks: list[str]) -> None:
    """The search index of each documentation brick is built on the machine: it never travels."""
    node = shutil.which("node")
    for brick in bricks:
        script = os.path.join(target, BRICKS, brick, "build-index.ts")
        if not os.path.exists(script):
            continue
        if node is None:
            sys.stderr.write(f"{brick} is installed, but its search index was not built: node was not found\n")
            continue
        result = subprocess.run(
            [
                node,
                script,
            ],
            capture_output=True,
            text=True,
            check=False,
        )
        if result.returncode == 0:
            sys.stdout.write(result.stdout)
        else:
            sys.stderr.write(f"{brick} is installed, but its search index was not built: {result.stderr.strip()}\n")


def option(name: str) -> str | None:
    arguments = sys.argv[1:]
    flag = f"--{name}"
    if flag in arguments:
        position = arguments.index(flag)
        if position + 1 < len(arguments):
            return arguments[position + 1]
    return None


def main() -> int:
    source = os.path.abspath(option("from") or os.path.dirname(os.path.realpath(__file__)))
    target = os.path.abspath(option("target") or ".")
    try:
        packs = read_packs(source)
    except (PartError, ValueError, OSError) as error:
        sys.stderr.write(f"Nothing was written. {error}\n")
        return 1
    result = install_packs(packs, target)
    print(f"Installed in {target}: {', '.join(result['packs'])}. "
        f"{result['written']} file(s) written, {len(result['kept'])} left aside.")
    print(f"MCP servers in opencode.json: {', '.join(result['servers']) or 'none'}.")
    if len(result["kept"]) > 0:
        print("Left aside, because the project already has them or its own code: merge them by hand from the kit if needed.")
    for path in result["kept"]:
        print(f"left aside: {path}")
    print("Then: npm install, and npm run check.")
    sys.stdout.flush()
    build_indexes(target, bricks_of([file for pack in packs for file in pack["files"]]))
    return 0


if __name__ == "__main__":
    sys.exit(main())
