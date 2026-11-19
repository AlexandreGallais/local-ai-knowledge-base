#!/usr/bin/env python3
"""The export of the base, in Python: cuts an equipped project into parts that import.py reads.

Run it in a project where the base is installed (by import.ts or import.py). It takes the kit
(AGENTS.md, opencode.json and .agents/) and writes the same packs as the export of the base: the pack
"kit" and one pack per documentation brick of .agents/mcp/. The parts are compressed with gzip, which
every Python 3 reads, and encoded in base64: printable ASCII only, safe to paste.
One file, the standard library of Python 3.9 or later only, no package:
    python3 export.py [--source <project root>] [--out <folder>] [--sizes 2m,3m,4m]
                      [--packs kit,js-official-docs]
Default: the current folder as the project, the parts in export-gzip/<size>/, the three sizes, every
pack. Each size folder also gets import.py and import.ts when they sit beside this file.

Never exported: the work files and caches of .agents/, the search index of each brick (built again on
each machine), dependencies and system files.
"""
from __future__ import annotations

import base64
import gzip
import hashlib
import json
import os
import re
import shutil
import sys

MAGIC = "LOCAL-AI-BASE EXPORT"
END = "END OF PART"
STREAM_MAGIC = b"LAB2\n"
BASE64_LINE = 76
# Room left in each part for its header and its end line.
OVERHEAD = 1024
KIT = "kit"
BRICKS = ".agents/mcp"
# 2 MB parts pass the paste and 5 MB ones do not: 3 and 4 MB are tried between them.
DEFAULT_SIZES = [
    "2m",
    "3m",
    "4m",
]
# The entries of a project that belong to the base: everything else is the project's own code.
ROOTS = [
    "AGENTS.md",
    "opencode.json",
    ".agents",
]
IGNORED = re.compile(r"(?:^|/)(?:node_modules|\.DS_Store|__pycache__)(?:/|$)|^\.agents/(?:work|cache)/|^\.agents/mcp/[^/]+/index/")
SCRIPTS = [
    "import.py",
    "import.ts",
]


def size_in_bytes(size: str) -> int:
    """'500k' is 500,000 bytes and '1m' 1,000,000: decimal units, so a part never exceeds its label."""
    match = re.match(r"^(\d+)([km])$", size.strip(), re.IGNORECASE)
    if match is None:
        raise ValueError(f'size must look like 500k or 2m, not "{size}"')
    return int(match.group(1)) * (1000 if match.group(2).lower() == "k" else 1_000_000)


def is_plain_file(path: str) -> bool:
    return os.path.isfile(path) and not os.path.islink(path)


def walk_files(source: str, start: str) -> list[str]:
    """The plain files under a folder of the project, as paths from its root with "/" between folders."""
    found = [os.path.join(folder, name) for folder, _, names in os.walk(start) for name in names]
    return [os.path.relpath(full, source).replace(os.sep, "/") for full in found if is_plain_file(full)]


def list_files(source: str) -> list[str]:
    """The files of the kit in the project: AGENTS.md, opencode.json and the folder .agents/."""
    paths: list[str] = []
    for entry in ROOTS:
        start = os.path.join(source, entry)
        paths += [entry] if is_plain_file(start) else walk_files(source, start)
    return [path for path in paths if not IGNORED.search(path)]


def order_key(path: str) -> tuple[str, str, str]:
    """Similar files side by side, so that the compressor finds their repeats: by extension, folder, name."""
    slash = path.rfind("/")
    name = path[slash + 1 :]
    return (os.path.splitext(name)[1], path[: max(slash, 0)], name)


def docs_bricks(source: str) -> list[str]:
    """The documentation bricks of the project: the folders of .agents/mcp/ with a library."""
    folder = os.path.join(source, BRICKS)
    if not os.path.isdir(folder):
        return []
    return sorted(name for name in os.listdir(folder) if os.path.isfile(os.path.join(folder, name, "library", "sources.json")))


def pack_of(path: str, bricks: list[str]) -> str:
    for brick in bricks:
        if path.startswith(f"{BRICKS}/{brick}/"):
            return brick
    return KIT


def pack_files(source: str) -> dict[str, list[str]]:
    """The paths of each pack: the kit first, then one pack per documentation brick."""
    bricks = docs_bricks(source)
    packs: dict[str, list[str]] = {KIT: []}
    for brick in bricks:
        packs[brick] = []
    for path in sorted(list_files(source), key=order_key):
        packs[pack_of(path, bricks)].append(path)
    return packs


def to_stream(source: str, paths: list[str]) -> bytes:
    """One header line of JSON (paths and sizes), then every file's bytes in the same order."""
    files = []
    for path in paths:
        with open(os.path.join(source, path), "rb") as handle:
            files.append((path, handle.read()))
    manifest = json.dumps(
        [[
            path,
            len(data),
        ] for path, data in files],
        ensure_ascii=False,
        separators=(",", ":"),
    )
    return STREAM_MAGIC + manifest.encode("utf-8") + b"\n" + b"".join(data for _, data in files)


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def to_parts(compressed: bytes, pack: str, max_bytes: int) -> list[str]:
    """Cuts the encoded payload into parts of max_bytes at most, header and end line included."""
    text = base64.b64encode(compressed).decode("ascii")
    lines = [text[offset : offset + BASE64_LINE] for offset in range(0, len(text), BASE64_LINE)]
    per_part = max(1, (max_bytes - OVERHEAD) // (BASE64_LINE + 1))
    groups = [lines[start : start + per_part] for start in range(0, len(lines), per_part)] or [[]]
    parts = []
    for position, payload in enumerate(groups):
        index = position + 1
        header = [
            MAGIC,
            f"pack: {pack}",
            "format: 1",
            f"part: {index}/{len(groups)}",
            "compression: gzip",
            "encoding: base64",
            f"total-bytes: {len(compressed)}",
            f"total-sha256: {sha256(compressed)}",
            f"part-sha256: {sha256(chr(10).join(payload).encode('ascii'))}",
            "---",
        ]
        parts.append("\n".join([
            *header,
            *payload,
            f"{END} {index}/{len(groups)}",
            "",
        ]))
    return parts


def clear_parts(folder: str, packs: list[str]) -> None:
    """Removes the old parts of the packs about to be written, and only those."""
    if not os.path.isdir(folder):
        return
    for name in os.listdir(folder):
        if any(re.match(rf"^{re.escape(pack)}-\d{{3}}\.txt$", name) for pack in packs):
            os.remove(os.path.join(folder, name))


def export_packs(source: str, out: str, sizes: list[str], only: list[str] | None = None) -> list[dict[str, object]]:
    """Writes out/<size>/<pack>-001.txt... for every size, and returns one line of summary per pack and size."""
    limits = {size: size_in_bytes(size) for size in sizes}
    packs = {name: paths for name, paths in pack_files(source).items() if only is None or name in only}
    unknown = sorted(set(only or []) - set(packs))
    if unknown:
        raise ValueError(f"no pack named {', '.join(unknown)} in this project")
    # mtime=0: the same project gives the same parts, whatever the day.
    compressed = {name: gzip.compress(to_stream(source, paths), compresslevel=9, mtime=0) for name, paths in packs.items()}
    summaries: list[dict[str, object]] = []
    for size in sizes:
        folder = os.path.join(out, size)
        os.makedirs(folder, exist_ok=True)
        clear_parts(folder, list(packs))
        summaries += [write_parts(folder, name, size, to_parts(data, name, limits[size])) for name, data in compressed.items()]
        copy_scripts(folder)
    return summaries


def write_parts(folder: str, name: str, size: str, parts: list[str]) -> dict[str, object]:
    """Writes the parts of one pack in a size folder; returns its line of summary."""
    for position, text in enumerate(parts):
        with open(os.path.join(folder, f"{name}-{position + 1:03d}.txt"), "w", encoding="ascii", newline="") as handle:
            handle.write(text)
    return {
        "size": size,
        "pack": name,
        "parts": len(parts),
        "bytes": sum(len(text) for text in parts),
    }


def copy_scripts(folder: str) -> None:
    """The two import scripts beside the parts, when they sit beside this file."""
    here = os.path.dirname(os.path.realpath(__file__))
    for script in SCRIPTS:
        if os.path.isfile(os.path.join(here, script)):
            shutil.copyfile(os.path.join(here, script), os.path.join(folder, script))


def option(name: str) -> str | None:
    arguments = sys.argv[1:]
    flag = f"--{name}"
    if flag in arguments:
        position = arguments.index(flag)
        if position + 1 < len(arguments):
            return arguments[position + 1]
    return None


def main() -> int:
    source = os.path.abspath(option("source") or ".")
    out = os.path.abspath(option("out") or "export-gzip")
    sizes = (option("sizes") or ",".join(DEFAULT_SIZES)).split(",")
    packs = option("packs")
    if not os.path.isdir(os.path.join(source, BRICKS)) and not os.path.isfile(os.path.join(source, "AGENTS.md")):
        sys.stderr.write(f"Nothing was written. {source} holds no base: run export.py in a project where the base is installed.\n")
        return 1
    try:
        summaries = export_packs(source, out, sizes, packs.split(",") if packs else None)
    except (ValueError, OSError) as error:
        sys.stderr.write(f"Nothing was written. {error}\n")
        return 1
    print("| Size | Pack | Parts | Bytes |")
    print("| --- | --- | --- | --- |")
    for item in summaries:
        print(f"| {item['size']} | {item['pack']} | {item['parts']} | {item['bytes']} |")
    print(f"Parts written in {out}. Paste one size folder on the other machine, then run python3 import.py there.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
