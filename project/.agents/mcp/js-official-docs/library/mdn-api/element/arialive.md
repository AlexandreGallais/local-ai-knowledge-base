---
title: "Element: ariaLive property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/arialive/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaLive property

The **`ariaLive`** property of the `Element` interface reflects the value of the `aria-live` attribute, which indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.

## Value

A string with one of the following values:

- `"assertive"`
    Indicates that updates to the region have the highest priority and should be presented to the user immediately.
- `"off"`
    Indicates that updates to the region should not be presented to the user unless the user is currently focused on that region.
- `"polite"`
    Indicates that updates to the region should be presented at the next graceful opportunity, such as at the end of speaking the current sentence or when the user pauses typing.

## Examples

In this example the `aria-live` attribute on the element with an ID of `planetInfo` is set to `"polite"`. We then update the value to `"assertive"`.

```html
<div role="region" id="planetInfo" aria-live="polite">
  <h2 id="planetTitle">No planet selected</h2>
  <p id="planetDescription">Select a planet to view its description</p>
</div>
```

```js
let el = document.getElementById("planetInfo");
console.log(el.ariaLive); // "polite"
el.ariaLive = "assertive";
console.log(el.ariaLive); // "assertive"
```
