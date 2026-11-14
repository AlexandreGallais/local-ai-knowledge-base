---
title: "Element: nextElementSibling property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/nextelementsibling/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: nextElementSibling property

The **`Element.nextElementSibling`** read-only
property returns the element immediately following the specified one in its parent's
`children` list, or `null` if the specified element is the last one in the list.

## Value

An `Element` object, or `null`.

## Examples

```html
<div id="div-01">Here is div-01</div>
<div id="div-02">Here is div-02</div>
```

```js
let el = document.getElementById("div-01").nextElementSibling;
console.log("Siblings of div-01:");
while (el) {
  console.log(el.nodeName);
  el = el.nextElementSibling;
}
```

This example outputs the following into the console when it loads:

```plain
Siblings of div-01:
DIV
SCRIPT
```

## See also

- `Element.previousElementSibling`
