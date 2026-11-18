# Checks a skill of the project, in .agents/skills/<name>/SKILL.md: its header, its name, its sections
# and its size. The Python twin of check-skill.ts, the same findings. Python 3.9 or later, standard
# library only.
#   python3 .agents/skills/write-skill/scripts/check_skill.py .agents/skills/<name>
from __future__ import annotations

import os
import re
import sys

MAX_LINES = 150
NAME = re.compile(r'[a-z0-9]+(?:-[a-z0-9]+)*')
FRENCH = re.compile(r'\b(?:le|la|les|des|une|est|pour|avec|dans|qui|pas|cette|sont)\b', re.IGNORECASE | re.ASCII)
WEB = re.compile(r'\b(?:search|look up|browse) (?:on |in )?the (?:web|internet)\b|\bgoogle it\b', re.IGNORECASE | re.ASCII)
JS_SPACE = '\t\n\x0b\x0c\r                  　﻿'


def header_field(lines: list[str], name: str) -> str:
    line = next((item for item in lines if item.startswith(f'{name}:')), '')
    return line[len(name) + 1 :].strip(JS_SPACE)


def check_skill_text(folder_name: str, text: str) -> list[str]:
    # One line per defect of a skill; an empty list when it is well formed.
    lines = text.replace('\r\n', '\n').rstrip(JS_SPACE).split('\n')
    end = lines.index('---', 1) if lines[0] == '---' and '---' in lines[1:] else -1
    header = [] if end < 0 else lines[1:end]
    name = header_field(header, 'name')
    sections = [line[3:].strip(JS_SPACE) for line in lines if line.startswith('## ')]
    checks = [
        (end >= 0, 'missing YAML header between --- lines'),
        (name == folder_name, f'name "{name}" differs from the folder "{folder_name}"'),
        (NAME.fullmatch(name) is not None, 'name must use lower-case letters, digits and single hyphens'),
        (header_field(header, 'description').startswith('Use when'), 'description must start with "Use when"'),
        (any(section.startswith('Example') for section in sections), 'missing ## Example section'),
        ('Final check' in sections, 'missing ## Final check section'),
        (len(lines) <= MAX_LINES, f'{len(lines)} lines; keep a skill at {MAX_LINES} lines or fewer'),
        (len(FRENCH.findall(text)) < 5, 'write the skill in English'),
        (WEB.search(text) is None, 'never ask to search the web'),
    ]
    return [problem for passed, problem in checks if not passed]


def main() -> int:
    if len(sys.argv) < 2:
        print('Usage: python3 check_skill.py .agents/skills/<name>')
        return 2
    folder = os.path.abspath(sys.argv[1])
    path = os.path.join(folder, 'SKILL.md')
    if os.path.isfile(path):
        with open(path, encoding='utf-8', newline='') as file:
            problems = check_skill_text(os.path.basename(folder), file.read())
    else:
        problems = [f'{path} is missing']
    for problem in problems:
        print(f'{path}: {problem}')
    print(f'{len(problems)} findings.')
    return 0 if not problems else 1


if __name__ == '__main__':
    sys.exit(main())
