# Builds the plain-text search index of this brick, the Python twin of build-index.ts: one file per
# tool of library/, in index/, the same bytes as build-index.ts writes. The server builds it by itself
# when index/ is missing; run it again after a change of library/. Python 3.9 or later, standard
# library only. From the project root:
#   python3 .agents/mcp/<brick>/build_index.py
from __future__ import annotations

import os
import shutil
import sys

# No __pycache__ folder in the project: the brick stays as it was imported.
sys.dont_write_bytecode = True
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from search import DOCUMENT_FILE, Section, index_text, sections, utf16_key  # noqa: E402


def read_text(path: str) -> str:
    # As Node reads it: UTF-8, line ends kept as they are.
    with open(path, encoding='utf-8', errors='replace', newline='') as file:
        return file.read()


def document_files(folder: str) -> list[str]:
    # The documentation files of a folder, whatever their format.
    found = []
    for root, folders, files in os.walk(folder):
        folders.sort()
        found.extend(os.path.join(root, name) for name in sorted(files) if DOCUMENT_FILE.search(name))
    return found


def folder_sections(brick: str, folder: str) -> list[Section]:
    return [
        section
        for path in document_files(folder)
        for section in sections(os.path.relpath(path, brick).replace(os.sep, '/'), read_text(path))
    ]


def build_indexes(brick: str) -> list[str]:
    # Returns the names of the index files written, in order.
    output = os.path.join(brick, 'index')
    library = os.path.join(brick, 'library')
    written: list[str] = []
    shutil.rmtree(output, ignore_errors=True)
    os.makedirs(output, exist_ok=True)
    if not os.path.isdir(library):
        return written
    tools = sorted((entry.name for entry in os.scandir(library) if entry.is_dir()), key=utf16_key)
    for tool in tools:
        name = f'{tool}.idx'
        with open(os.path.join(output, name), 'w', encoding='utf-8', newline='') as file:
            file.write(index_text(folder_sections(brick, os.path.join(library, tool))))
        written.append(name)
    return written


def main() -> None:
    brick = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(os.path.abspath(__file__)))
    written = build_indexes(brick)
    index = os.path.join(brick, 'index')
    sys.stdout.write(f'Search index built: {len(written)} file(s) in {index}.\n')


if __name__ == '__main__':
    main()
