---
title: "escape-case"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/escape-case.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# escape-case

📝 Require escape sequences to use uppercase or lowercase values.

💼 This rule is enabled in the following configs: ✅ `recommended`, 🎨 `recommended-css`, 🧩 `recommended-json`, 💎 `recommended-soml`, 🛠️ `recommended-toml`, 📋 `recommended-yaml`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Enforces a consistent escaped value style by defining escape sequence values with uppercase or lowercase characters. The default style is uppercase, which promotes readability by making the escaped value more distinguishable from the identifier.

Tagged template literals are ignored because tag functions can observe the raw escape sequences.

In SOML, the configured case is ignored because Unicode escapes must use lowercase hexadecimal digits. Literal strings and keys are skipped.

In TOML, it checks basic <example-value> and quoted keys, including multiline strings. It preserves `\u` and `\U` prefixes and also normalizes parser-tolerated `\x` escapes, which TOML 1.0 does not define. Literal strings and keys are skipped.

In JSON, JSONC, and JSON5, it checks strings and quoted keys, including JSON5 hexadecimal escapes. In YAML, it checks hexadecimal and Unicode escapes in double-quoted scalars. In CSS, it checks one- to six-digit hexadecimal escapes in identifiers, strings, and URLs, preserving escape-terminating whitespace and skipping comments.

## Examples

```js
// ❌
const foo = '\xa9';

// ✅
const foo = '\xA9';
```

```js
// ❌
const foo = '\ud834';

// ✅
const foo = '\uD834';
```

```js
// ❌
const foo = '\u{1d306}';

// ✅
const foo = '\u{1D306}';
```

```js
// ❌
const foo = '\ca';

// ✅
const foo = '\cA';
```

## Options

Type: `string`\
Default: `'uppercase'`

- `'uppercase'` (default)
  - Always use escape sequence values with uppercase characters.
- `'lowercase'`
  - Always use escape sequence values with lowercase characters.

Example:

```js
{
	'unicorn/escape-case': ['error', 'lowercase']
}
```

```js
// ❌
const foo = '\xA9';

// ✅
const foo = '\xa9';
```

```js
// ❌
const foo = '\uD834';

// ✅
const foo = '\ud834';
```

```js
// ❌
const foo = '\u{1D306}';

// ✅
const foo = '\u{1d306}';
```

```js
// ❌
const foo = '\cA';

// ✅
const foo = '\ca';
```
