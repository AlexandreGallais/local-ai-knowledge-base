---
title: "no-unsafe-buffer-conversion"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-unsafe-buffer-conversion.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-unsafe-buffer-conversion

📝 Prevent unsafe use of ArrayBuffer view `.buffer`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

The `.buffer` property of a `Buffer` or typed array exposes the whole backing `ArrayBuffer`, not necessarily just the bytes visible through that view. Preserve `byteOffset` and `byteLength` when converting through `.buffer`.

## Examples

```js
// ❌
new Uint8Array(buffer.buffer);

// ✅
new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
```

```js
// ❌
new Uint32Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);

// ✅
new Uint32Array(buffer.buffer, buffer.byteOffset, buffer.byteLength / Uint32Array.BYTES_PER_ELEMENT);
```

```js
// ❌
Buffer.from(bytes.buffer);

// ✅
Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
```

```js
// ❌
bytes.buffer.slice();

// ✅
bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
```
