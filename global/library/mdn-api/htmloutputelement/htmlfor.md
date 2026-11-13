---
title: "HTMLOutputElement: htmlFor property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmloutputelement/htmlfor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOutputElement: htmlFor property

The read-only **`htmlFor`** property of the `HTMLOutputElement` returns a live `DOMTokenList` object containing a list of `id`s of those elements contributing input values to (or otherwise affected) the calculation. It reflects the `<output>` element's `for` content attribute.

## Value

A live `DOMTokenList` object.

Although the `htmlFor` property itself is read-only in the sense that you can't replace the `DOMTokenList` object, you can still assign to the `htmlFor` property directly, which is equivalent to assigning to its `value` property. You can also modify the `DOMTokenList` object using the `add()`, `remove()`, `replace()`, and `toggle()` methods.

## Examples

```js
const outputElem = document.getElementById("result");
for (const id of outputElem.htmlFor) {
  const elem = document.getElementById(id);
  elem.style.outline = "2px solid red";
}
```

## See also

- `<output>`
