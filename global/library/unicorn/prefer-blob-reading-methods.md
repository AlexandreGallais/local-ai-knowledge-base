---
title: "prefer-blob-reading-methods"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-blob-reading-methods.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-blob-reading-methods

📝 Prefer `Blob#arrayBuffer()` over `FileReader#readAsArrayBuffer(…)` and `Blob#text()` over `FileReader#readAsText(…)`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

`FileReader` predates promises, and the newer `Blob#arrayBuffer()` and `Blob#text()` methods are much cleaner and easier to use.

## Examples

```js
// ❌
const arrayBuffer = await new Promise((resolve, reject) => {
	const fileReader = new FileReader();
	fileReader.addEventListener('load', () => {
		resolve(fileReader.result);
	});
	fileReader.addEventListener('error', () => {
		reject(fileReader.error);
	});
	fileReader.readAsArrayBuffer(blob);
});

// ✅
const arrayBuffer = await blob.arrayBuffer();
```

```js
// ❌
fileReader.readAsText(blob);

// ✅
const text = await blob.text();
```

```js
// ✅
fileReader.readAsText(blob, 'ascii');
```

```js
// ✅
fileReader.readAsDataURL(blob);
```
