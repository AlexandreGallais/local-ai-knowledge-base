---
title: "linebreaks"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/linebreaks/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# linebreaks

Specify unix or windows linebreaks.

The `fix` option can automatically fix all of the problems reported by this rule.

The `message` secondary option can accept the arguments of this rule.

## Options

`string`: `"unix"|"windows"`

### `"unix"`

Linebreaks _must always_ be LF (`\n`).

Lines with CRLF linebreaks are considered problems.

### `"windows"`

Linebreaks _must always_ be CRLF (`\r\n`).

Lines with LF linebreaks are considered problems.
