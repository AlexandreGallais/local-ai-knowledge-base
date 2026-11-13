---
title: "prefer-short-escape-sequences"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-short-escape-sequences.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-short-escape-sequences

📝 Prefer shorter alternatives to Unicode escape sequences.

💼 This rule is enabled in the following configs: ✅ `recommended`, 🧩 `recommended-json`, 💎 `recommended-soml`, 🛠️ `recommended-toml`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Prefer shorter spellings of `\uXXXX` escapes in JavaScript, JSON, JSONC, JSON5, and TOML strings and quoted keys. Untagged JavaScript templates are also checked. Tagged templates and JSX attributes are ignored because their raw text matters.

Common replacements include `\u000A` → `\n` and `\u0009` → `\t`. JavaScript also uses `\0` and `\v`; `\u0000` is left unchanged before an ASCII digit. Printable ASCII escapes in JavaScript, JSON, JSONC, and JSON5 are handled by `prefer-literal-ascii`. TOML also shortens printable escapes such as `\u002F` → `/`, and uses only escapes valid in TOML 1.0, so `\u001B` is not replaced with TOML 1.1's `\e`.

JSON, JSONC, and JSON5 receive only shorter escapes valid in JSON, regardless of filename, because `@eslint/json` does not expose the active dialect. In particular, `\u0000` and `\u000B` remain unchanged in all three variants. TOML literal strings and keys are ignored because their backslashes are not escapes.

In SOML escaped strings and keys, `\u{a}` becomes `\n` and `\u{9}` becomes `\t`. Literal strings and keys are ignored.

## Examples

For JavaScript:

```js
// ❌
const text = "Line one\u000ALine two";
const template = `Line one\u000ALine two`;

// ✅
const text = "Line one\nLine two";
const template = `Line one\nLine two`;
```

For JSON and JSONC:

```jsonc
// ❌
{
	"\u0009": "Line one\u000ALine two"
}

// ✅
{
	"\t": "Line one\nLine two"
}
```

For JSON5:

```json5
// ❌
{
	message: 'Line one\u000ALine two',
}

// ✅
{
	message: 'Line one\nLine two',
}
```

For TOML basic <example-value>:

```toml
# ❌
message = "Line one\u000ALine two"

# ✅
message = "Line one\nLine two"
```
