---
title: "HTMLAnchorElement: toString() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlanchorelement/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAnchorElement: toString() method

The **`HTMLAnchorElement.toString()`** stringifier method returns a string containing the whole URL, which is the same value as `HTMLAnchorElement.href`.

## Syntax

```js
toString()
```

### Parameters

None.

### Return value

A string containing the element's complete URL.

## Examples

### Calling toString on an anchor element

```js
// An <a id="myAnchor" href="/en-US/docs/HTMLAnchorElement"> element is in the document
const anchor = document.getElementById("myAnchor");
anchor.toString(); // returns 'https://developer.mozilla.org/en-US/docs/HTMLAnchorElement'
```

## See also

- The `HTMLAnchorElement` interface it belongs to.
