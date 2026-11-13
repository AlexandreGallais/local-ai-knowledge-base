---
title: "no-leading-empty-lines"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-leading-empty-lines.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-leading-empty-lines

📝 Disallow empty lines at the beginning of a file.

💼🚫 This rule is enabled in the following configs: ✅ `recommended`, 🎨 `recommended-css`, 🌐 `recommended-html`, 🧩 `recommended-json`, 📚 `recommended-markdown`, 💎 `recommended-soml`, 🛠️ `recommended-toml`, 📋 `recommended-yaml`. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Disallow empty lines at the beginning of a file. A line is empty when it contains only spaces or tabs followed by an LF, CRLF, or CR line ending. The rule has no options.

This rule works across file types, including JavaScript, TypeScript, CSS, HTML, JSON, JSONC, JSON5, Markdown, SOML, TOML, and YAML. It supports native ESLint languages such as `@eslint/json`.

The fix removes all complete leading empty lines in one edit. It preserves the first content line's indentation, the byte order mark (BOM), and everything after the leading empty lines, including comments and blank lines inside multiline strings. Empty files and whitespace-only files without a line ending are allowed.

Named virtual files created by processors, such as fenced code blocks in Markdown, are ignored. Processor output that retains the physical file's name is checked.

## Examples

These files fail:

```json

{"value": 1}
```

```yaml

# Configuration
value: 1
```

These files pass:

```json
{"value": 1}
```

```yaml
# Configuration

value: 1
```
