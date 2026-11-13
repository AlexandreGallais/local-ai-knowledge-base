---
title: "no-manually-wrapped-comments"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-manually-wrapped-comments.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-manually-wrapped-comments

📝 Disallow manually wrapped comments.

🚫 Disabled by default.

🔧 This rule is automatically fixable by the `--fix` CLI option.

This rule reports separated consecutive line comments, and consecutive lines inside a block comment, that look like one manually wrapped unfinished sentence. End intentionally separate comments with sentence punctuation, `:`, or an emoji-like symbol, or separate paragraphs inside a block comment with a blank line.

This rule also supports CSS comments when linting with `@eslint/css`, JSONC and JSON5 comments when linting with `@eslint/json`, SOML `#` and block comments when linting with `eslint-soml`, TOML `#` comments when linting with `eslint-plugin-toml`, and YAML `#` comments when linting with `eslint-plugin-yml`.

Comments that are not prose are ignored and never merged:

- Tooling directives, for example `eslint-*`, `@ts-check`, `prettier-ignore`, `deno-lint-ignore`, `dprint-ignore`, `noinspection …`, `c8 ignore`, `cspell:disable`, and `spell-checker:`.
- All-caps annotations, for example `MARK:`, `TODO:`, `TODO(owner):`, `FIXME:`, and `NOTE:`.
- Machine-readable SPDX tags, for example `SPDX-License-Identifier`.
- Copyright headers, for example `© 2026 …` and `Copyright 2026 …`. A block comment that contains a copyright, SPDX, or `@license` line is treated as a license header and ignored entirely.
- Editor hints, for example `vim: …`, `-*- … -*-`, `language=HTML`, `region`, and `<editor-fold …>`.
- List items, separators, URLs, and comments containing code characters.

## Examples

```js
// ❌
// This is a long comment but
// I don't like long lines

// ✅
// This is a long comment but I don't like long lines
```

```js
// ✅
// This is a long comment.
// I don't like long lines.
```

```js
// ❌
/**
 * This is a long comment but
 * I don't like long lines
 */

// ✅
/**
 * This is a long comment but I don't like long lines
 */
```

```js
// ✅
/**
 * This is a long comment.
 *
 * I don't like long lines
 */
```

```css
/* ❌ */
/* This is a long comment but
   I don't like long lines */

/* ✅ */
/* This is a long comment but I don't like long lines */
```

Code samples and ASCII diagrams inside block comments that contain no code characters are not distinguished from prose and may be reported.
