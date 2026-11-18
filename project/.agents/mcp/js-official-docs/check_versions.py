# Lists the tools of this brick's documentation (library/) whose major version is behind the version
# a project uses. Versions come from the project's package.json. The Python twin of
# check-versions.ts, the same output. Python 3.9 or later, standard library only. From the project root:
#   python3 .agents/mcp/js-official-docs/check_versions.py [project-folder] [brick-folder]
# Exit code: 0 nothing behind, 1 something behind.
from __future__ import annotations

import json
import os
import re
import sys
from typing import Any, NamedTuple


class Behind(NamedTuple):
    document: str
    tool: str
    document_version: int
    project_version: int


# The tool names of the library, and the npm package that gives the version.
PACKAGES = {
    'angular': '@angular/core',
    'angular-api': '@angular/core',
    'angular-cli': '@angular/cli',
    'angular-eslint': 'angular-eslint',
    'eslint': 'eslint',
    'eslint-config-prettier': 'eslint-config-prettier',
    'eslint-headers': 'eslint-plugin-headers',
    'eslint-jsdoc': 'eslint-plugin-jsdoc',
    'eslint-regexp': 'eslint-plugin-regexp',
    'eslint-stylistic': '@stylistic/eslint-plugin',
    'eslint-vitest': '@vitest/eslint-plugin',
    'import-x': 'eslint-plugin-import-x',
    'ngrx-signals': '@ngrx/signals',
    'ngrx-signals-api': '@ngrx/signals',
    'perfectionist': 'eslint-plugin-perfectionist',
    'playwright': '@playwright/test',
    'prettier': 'prettier',
    'rxjs': 'rxjs',
    'rxjs-api': 'rxjs',
    'rxjs-x': 'eslint-plugin-rxjs-x',
    'sass': 'sass',
    'storybook': 'storybook',
    'stylelint': 'stylelint',
    'stylelint-order': 'stylelint-order',
    'stylelint-recess-order': 'stylelint-config-recess-order',
    'tsconfig': 'typescript',
    'typescript': 'typescript',
    'typescript-eslint': 'typescript-eslint',
    'typescript-eslint-guides': 'typescript-eslint',
    'unicorn': 'eslint-plugin-unicorn',
    'vite': 'vite',
    'vitest': 'vitest',
}
ALIASES = {
    'node.js': 'node',
    'nodejs': 'node',
    'ngrx': 'ngrx-signals',
}
DIGITS = re.compile(r'([0-9]+)')


def major(version: Any) -> int | None:
    found = DIGITS.search(version if isinstance(version, str) else '')
    return None if found is None else int(found.group(1))


def read_json(path: str) -> dict[str, Any]:
    try:
        with open(path, encoding='utf-8') as file:
            value = json.load(file)
    except (OSError, ValueError):
        return {}
    return value if isinstance(value, dict) else {}


def project_versions(project: str) -> dict[str, int]:
    # The major version of each known tool that the project declares.
    manifest = read_json(os.path.join(project, 'package.json'))
    declared: dict[str, Any] = {}
    for key in ('devDependencies', 'peerDependencies', 'dependencies'):
        part = manifest.get(key)
        declared.update(part if isinstance(part, dict) else {})
    versions = {tool: major(declared.get(name)) for tool, name in PACKAGES.items()}
    found = {tool: value for tool, value in versions.items() if value is not None}
    engines = manifest.get('engines') if isinstance(manifest.get('engines'), dict) else {}
    node = major(engines.get('node', declared.get('@types/node')))
    if node is not None:
        found['node'] = node
    return found


def tool_key(name: str) -> str:
    lower = name.strip().lower()
    return ALIASES.get(lower, lower)


def check_versions(brick: str, project: str) -> list[Behind]:
    # The tools of library/ whose major version is behind the project's.
    versions = project_versions(project)
    sources = read_json(os.path.join(brick, 'library', 'sources.json')).get('sources')
    behind = []
    for source in sources if isinstance(sources, list) else []:
        tool = source.get('tool') or ''
        version = major(source.get('version'))
        built = os.path.exists(os.path.join(brick, 'library', f'{tool}.index.md'))
        project_version = versions.get(tool_key(tool))
        if built and version is not None and project_version is not None and project_version > version:
            behind.append(Behind(f'library/{tool}/', tool_key(tool), version, project_version))
    return behind


def main() -> int:
    project = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else '.')
    brick = os.path.abspath(sys.argv[2] if len(sys.argv) > 2 else os.path.dirname(os.path.abspath(__file__)))
    behind = check_versions(brick, project)
    for item in behind:
        sys.stdout.write(f'{item.document}: {item.tool} {item.document_version} in the documentation, {item.project_version} in the project\n')
    if behind:
        sys.stdout.write(f'{len(behind)} tool(s) behind this project: trust package.json and the installed packages for these tools.\n')
    else:
        sys.stdout.write('No documentation of this brick is behind this project.\n')
    return 1 if behind else 0


if __name__ == '__main__':
    sys.exit(main())
