---
title: "no-empty-file"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-empty-file.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-empty-file

📝 Disallow empty files.

💼 This rule is enabled in the following configs: ✅ `recommended`, 🎨 `recommended-css`, 🌐 `recommended-html`, 🧩 `recommended-json`, 📚 `recommended-markdown`, 🛠️ `recommended-toml`, 📋 `recommended-yaml`, ☑️ `unopinionated`.

Meaningless files clutter a codebase.

This applies to files of any extension. It is tested with JavaScript, TypeScript, Vue (`vue-eslint-parser`), HTML (`@html-eslint/parser`), CSS (`@eslint/css`), Markdown (`@eslint/markdown`), TOML (`eslint-plugin-toml`), and YAML (`eslint-plugin-yml`). JSON, JSONC, and JSON5 files parsed by `@eslint/json` require a value, so empty or comment-only files produce a syntax error before this rule runs.

Code extracted by a processor (for example, fenced code blocks in Markdown) is not treated as a file, so an empty extracted block is not reported.

Disallow any files only containing the following:

- Whitespace
- Comments
- Directives
- Empty statements
- Empty block statements
- YAML document markers
- YAML metadata without a value
- Hashbang

## Examples

These files fail:

```js

```

```js
// Comment
```

```js
/* Comment */
```

```js
'use strict';
```

```js
;
```

```js
{
}
```

```js
#!/usr/bin/env node
```

These files pass:

```js
const x = 0;
```

```js
'use strict';
const x = 0;
```

```js
;;
const x = 0;
```

```js
{
	const x = 0;
}
```

## Options

### allowComments

Type: `boolean`\
Default: `false`

Allow files that only contain comments:

```js
'unicorn/no-empty-file': [
	'error',
	{
		allowComments: true,
	},
]
```

This allows files that only contain comments. ESLint disable and enable directives do not count as allowed comments. Files with only a hashbang, directives, empty statements, empty block statements, YAML document markers, or YAML metadata without a value are still reported.
