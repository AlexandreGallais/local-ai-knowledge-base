---
title: "comma-spacing"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/comma-spacing.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# comma-spacing

📝 Enforce consistent spacing before and after commas in JSON and SOML.

🚫 Disabled by default.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Enforces no whitespace before commas and exactly one ASCII space after commas on the same line in JSON, JSONC, and JSON5 using `@eslint/json`, and in SOML using `eslint-soml`.

Preserves line breaks and surrounding whitespace, including comma-first layouts. Ignores spacing after trailing commas directly before `]` or `}`, but still checks spacing before them.

Checks spacing between commas and adjacent comments, preserving comment contents and whitespace beyond them. For example, `[1,/* comment */]` becomes `[1, /* comment */]`. Commas inside strings and comments are ignored.

This rule has no options and does not support `eslint-plugin-jsonc` languages.

For JavaScript and TypeScript, use `@stylistic/comma-spacing`, which allows multiple spaces after commas.

## Examples

### Incorrect

```json
[1 ,2,  3]
```

```json
{"first": 1,"second": 2}
```

### Correct

```json
[1, 2, 3]
```

```json
{"first": 1, "second": 2}
```

```jsonc
[1, /* Keep comment */2]
```

```json5
[1, 2,]
```
