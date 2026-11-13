---
title: "HTMLStyleElement: blocking property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlstyleelement/blocking/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLStyleElement: blocking property

The read-only **`blocking`** property of the `HTMLStyleElement` returns a live `DOMTokenList` object containing the operations that should be blocked on the fetching of an external resource. It reflects the `<style>` element's `blocking` content attribute.

## Value

A live `DOMTokenList` object.

Although the `blocking` property itself is read-only in the sense that you can't replace the `DOMTokenList` object, you can still assign to the `blocking` property directly, which is equivalent to assigning to its `value` property. You can also modify the `DOMTokenList` object using the `add()`, `remove()`, `replace()`, and `toggle()` methods.

## Examples

```html
<style id="el" blocking="render">
  p {
    color: blue;
  }
</style>
```

```js
const el = document.getElementById("el");
console.log(el.blocking); // Output: DOMTokenList ["<example-value>"]
```

## See also

- `HTMLLinkElement.blocking`
- `HTMLScriptElement.blocking`
