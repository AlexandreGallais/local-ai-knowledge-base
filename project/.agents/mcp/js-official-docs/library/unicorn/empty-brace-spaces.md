---
title: "empty-brace-spaces"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/empty-brace-spaces.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# empty-brace-spaces

📝 Enforce no spaces between braces.

💼🚫 This rule is enabled in the following configs: ✅ `recommended`, 🎨 `recommended-css`, 🧩 `recommended-json`, 💎 `recommended-soml`, 🛠️ `recommended-toml`, 📋 `recommended-yaml`. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Empty blocks and object literals do not need internal whitespace, so this rule enforces a compact, consistent style. It also checks objects and arrays in JSON, JSONC, JSON5, and SOML, blocks in CSS, flow mappings and sequences in YAML, and inline tables and arrays in TOML. Braces and brackets containing comments are left unchanged.

## Examples

```js
// ❌
class Unicorn {
}

// ✅
class Unicorn {}
```

```js
// ❌
try {
	foo();
} catch { }

// ✅
try {
	foo();
} catch {}
```
