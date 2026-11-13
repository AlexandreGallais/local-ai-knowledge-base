---
title: "Element: role property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: role property

The **`role`** property of the `Element` interface returns the explicitly set WAI-ARIA role for the element.

All HTML elements have an implicit ARIA role, even if that role is `generic`. This semantic association allows tools to present and support interaction with the object in a manner that is consistent with user expectations about other objects of that type. The `role` attribute is used to explicitly set the element's ARIA role, overriding the implicit role. For example, a ``, which has an implicit `list` role, might have `role="treegrid"` explicitly set. The `role` property reflects the explicitly set value of the `role` attribute—in this case `treegrid`; it does not return the element's implicit `list` role unless explicitly set.

The full list of defined ARIA roles can be found on the ARIA roles reference page.

## Value

A string; the value of the `role` attribute or `null` if not explicitly set.

## Examples

In this example, images with empty or missing `alt` attributes are given a `role` of `presentation`:

```js
const images = document.querySelectorAll("img");
images.forEach((image) => {
  if (!image.alt) {
    image.role = "presentation";
  }
});
```

## See also

- `ElementInternals.role`
- ARIA attributes
