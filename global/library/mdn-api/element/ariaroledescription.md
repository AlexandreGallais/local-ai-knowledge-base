---
title: "Element: ariaRoleDescription property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariaroledescription/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaRoleDescription property

The **`ariaRoleDescription`** property of the `Element` interface reflects the value of the `aria-roledescription` attribute, which defines a human-readable, author-localized description for the role of an element.

## Value

A string.

## Examples

In this example the `aria-roledescription` attribute on the element with an ID of `myApplication` has been set. Using `ariaRoleDescription` we can update the value.

```html
<div
  id="myApplication"
  role="application"
  aria-roledescription="a description of this widget">
  …
</div>
```

```js
let el = document.getElementById("myApplication");
console.log(el.ariaRoleDescription); // "a description of this widget"
el.ariaRoleDescription = "an updated description of this widget";
console.log(el.ariaRoleDescription); // "an updated description of this widget"
```

## See also

- ARIA: application role
