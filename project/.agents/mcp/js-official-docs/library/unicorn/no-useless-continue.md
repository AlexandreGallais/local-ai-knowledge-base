---
title: "no-useless-continue"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-useless-continue.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-useless-continue

📝 Disallow useless `continue` statements.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

A `continue` statement at the end of a loop iteration is unnecessary, since the loop advances to the next iteration anyway.

This mirrors the `no-useless-return` core rule.

Labeled `continue` statements are ignored, since they may target an outer loop.

## Examples

```js
// ❌
for (const item of items) {
	process(item);
	continue;
}

// ✅
for (const item of items) {
	process(item);
}
```

```js
// ❌
for (const item of items) {
	if (shouldSkip(item)) {
		continue;
	}
}

// ✅
for (const item of items) {
	if (!shouldSkip(item)) {
		// …
	}
}
```

```js
// ✅
for (const item of items) {
	if (shouldSkip(item)) {
		continue;
	}

	process(item);
}
```
