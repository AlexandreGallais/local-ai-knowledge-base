---
title: "HTMLAreaElement: toString() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlareaelement/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAreaElement: toString() method

The **`HTMLAreaElement.toString()`** stringifier method returns a string containing the whole URL, which is the same value as `HTMLAreaElement.href`.

## Syntax

```js
toString()
```

### Parameters

None.

### Return value

A string containing the element's complete URL.

## Examples

### Calling toString on an area element

```js
// An <area id="myArea" href="/en-US/docs/HTMLAreaElement"> element is in the document
const area = document.getElementById("myArea");
area.toString(); // returns 'https://developer.mozilla.org/en-US/docs/HTMLAreaElement'
```

## See also

- The `HTMLAreaElement` interface it belongs to.
