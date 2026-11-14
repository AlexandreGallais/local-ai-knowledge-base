---
title: "HTMLLinkElement: sizes property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmllinkelement/sizes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLLinkElement: sizes property

The read-only **`sizes`** property of the `HTMLLinkElement` interface defines the sizes of the icons for visual media contained in the resource. It reflects the `<link>` element's `sizes` attribute, which takes a list of space-separated sizes, each in the format `<width in pixels>x<height in pixels>`, or the keyword `any`.

It is only relevant if the `rel` is `icon` or a non-standard type like `apple-touch-icon`.

## Value

A `DOMTokenList` object.

Although the `sizes` property itself is read-only in the sense that you can't replace the `DOMTokenList` object, you can still assign to the `sizes` property directly, which is equivalent to assigning to its `value` property. You can also modify the `DOMTokenList` object using the `add()`, `remove()`, `replace()`, and `toggle()` methods.

## Examples

```html
<link rel="icon" sizes="72x72 114x114" href="smallish.ico" />
```

```js
const link = document.querySelector("[rel=icon],[rel=apple-touch-icon]");
console.dir(link.sizes); /* output:
  DOMTokenList [ "<example-value>", "<example-value>" ]
    0: "72x72"
    1: "114x114"
    length: 2
    value: "72x72 114x114"
  */
console.log(link.sizes.value); // output: '72x72 114x114'
console.log(link.sizes.length); // output: 2'
console.log(link.sizes[0]); // output: '72x72'
console.log(link.sizes[1]); // output: '114x114'
```

## See also

- `HTMLLinkElement.rel`
- `HTMLLinkElement.relList`
- `HTMLLinkElement.type`
- `HTMLLinkElement.href`
- `<link>`
- `rel` attribute
