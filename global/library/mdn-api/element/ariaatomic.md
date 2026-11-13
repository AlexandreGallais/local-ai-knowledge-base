---
title: "Element: ariaAtomic property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariaatomic/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaAtomic property

The **`ariaAtomic`** property of the `Element` interface reflects the value of the `aria-atomic` attribute, which indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the `aria-relevant` attribute.

## Value

A string with one of the following values:

- `"false"`
    Assistive technologies will present only the changed node or nodes.
- `"true"`
    Assistive technologies will present the entire changed region as a whole, including the author-defined label if one exists.

## Examples

In this example the `aria-atomic` attribute on the element with an ID of `"clock"` is set to "true". Using `ariaAtomic` we update the value to "false".

```html
<div id="clock" role="timer" aria-live="polite" aria-atomic="true"></div>
```

```js
let el = document.getElementById("clock");
console.log(el.ariaAtomic); // true
el.ariaAtomic = "false";
console.log(el.ariaAtomic); // false
```
