---
title: "CSSNestedDeclarations: style property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssnesteddeclarations/style/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSNestedDeclarations: style property

The read-only **`style`** property of the `CSSNestedDeclarations` interface represents the styles associated with the nested rules.

## Value

A `CSSStyleProperties` object.

Although the `style` property itself is read-only in the sense that you can't replace the `CSSStyleProperties` object, you can still assign to the `style` property directly, which is equivalent to assigning to its `cssText` property. You can also modify the `CSSStyleProperties` object using the `setProperty()` and `removeProperty()` methods.

## Examples

This stylesheet contains a nested `cssRules`.

The first `console.log` shows the top-level `style`, the second shows the nested `@media` query with its nested style and the final shows the nested style declared after the `@media` query.

```css
.foo {
  font-size: 1.2rem;
  @media screen {
    color: tomato;
    background-color: darkgrey;
  }
  color: black;
}
```

```js
let myRules = document.styleSheets[0].cssRules;
console.log(myRules[0].style);
// { "0": "font-size" }
console.log(myRules[0].cssRules[0].cssRules[0].style);
// { "0": "color", "1": "background-color" }
console.log(myRules[0].cssRules[1].style);
// { "0": "color" }
```

## See Also

- `CSSNestedDeclarations`
- The Nested Declarations Rule
