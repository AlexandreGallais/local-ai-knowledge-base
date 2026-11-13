---
title: "no-blob-to-file"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-blob-to-file.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-blob-to-file

📝 Disallow unnecessary `Blob` to `File` conversion.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

`File` objects implement the `Blob` interface. Converting a `Blob` to a `File` just to pass it to APIs that already accept a `Blob` is unnecessary.

This rule currently checks a narrow pattern: a standalone `const`, initialized with `new File([blob], 'filename')` and used once in `URL.createObjectURL()`, `FormData#append()`, or `FormData#set()`. The `blob` value must be an earlier `const` initialized with `new Blob()`, `new Blob(parts)`, or `new File(parts, name)` without type options, since the File wrapper clears the MIME type. For `FormData`, the receiver must be a `const` initialized with `new FormData()`.

## Examples

```js
// ❌
const blob = new Blob();
const file = new File([blob], 'image.jpg');
URL.createObjectURL(file);

// ✅
URL.createObjectURL(blob);
```

```js
// ❌
const blob = new Blob();
const formData = new FormData();
const file = new File([blob], 'image.jpg');
formData.append('file', file);

// ✅
formData.append('file', blob, 'image.jpg');
```

```js
// ❌
const blob = new Blob();
const formData = new FormData();
const file = new File([blob], 'image.jpg');
formData.set('file', file);

// ✅
formData.set('file', blob, 'image.jpg');
```
