---
title: "Element: previousElementSibling property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/previouselementsibling/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: previousElementSibling property

The **`Element.previousElementSibling`**
read-only property returns the `Element` immediately prior to the specified
one in its parent's `children` list, or `null` if the specified element is the first one in the list.

## Value

An `Element` object, or `null`.

## Examples

```html
<div id="div-01">Here is div-01</div>
<div id="div-02">Here is div-02</div>
<li>This is a list item</li>
<li>This is another list item</li>
<div id="div-03">Here is div-03</div>
```

```js
let el = document.getElementById("div-03").previousElementSibling;
console.log("Siblings of div-03:");
while (el) {
  console.log(el.nodeName);
  el = el.previousElementSibling;
}
```

This example outputs the following into the page when it loads:

```plain
Siblings of div-03:
LI
LI
DIV
DIV
```

## See also

- `Element.nextElementSibling`
