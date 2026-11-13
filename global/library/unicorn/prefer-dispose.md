---
title: "prefer-dispose"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-dispose.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-dispose

📝 Prefer using `using`/`await using` over manual `try`/`finally` resource disposal.

🚫 Disabled by default.

💡 This rule is manually fixable by editor suggestions.

Explicit Resource Management (the `using` and `await using` declarations) disposes of a resource automatically when the enclosing block exits, replacing the manual `try`/`finally` pattern. It also disposes multiple resources in reverse order and, unlike a hand-written `finally`, preserves the original error when a disposer throws (via `SuppressedError`) instead of silently replacing it.

This rule flags a `try`/`finally` whose only purpose is disposing of a resource declared just before it, and suggests converting it to a `using` declaration.

> **Note:**
> `using foo = …` requires the value to implement `Symbol.dispose` (or `Symbol.asyncDispose` for `await using`); a value that merely has a `.close()` method does not qualify and throws a `TypeError` at runtime. Because this cannot be verified without type information, the rule only offers a suggestion (never an autofix). When type-aware linting is enabled, it additionally confirms the resource is disposable before reporting.

Explicit Resource Management reached Stage 4. It ships in recent versions of Node.js and Chromium; for older environments, transpile with TypeScript or Babel.

## Examples

```js
// ❌
const file = open();
try {
	read(file);
} finally {
	file.close();
}

// ✅
{
	using file = open();
	read(file);
}
```

```js
// ❌
const reader = openReader();
const writer = openWriter();
try {
	pipe(reader, writer);
} finally {
	writer.close();
	reader.close();
}

// ✅
{
	using reader = openReader();
	using writer = openWriter();
	pipe(reader, writer);
}
```

```js
// ❌
async function run() {
	const connection = await connect();
	try {
		await query(connection);
	} finally {
		await connection.close();
	}
}

// ✅
async function run() {
	await using connection = await connect();
	await query(connection);
}
```
