---
title: "Document: characterSet property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/characterset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: characterSet property

The **`Document.characterSet`**
read-only property returns the character encoding of the
document that it's currently rendered with.

> **Note:**
> A "character set" and a "character encoding" are related, but different. Despite the
> name of this property, it returns the _encoding_.

## Value

A string.

## Examples

```js
console.log(document.characterSet);
// document's character encoding, such as "ISO-8859-1" or "UTF-8"
```
