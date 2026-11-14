---
title: "HTMLElement: containerTiming property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/containertiming/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: containerTiming property

The **`containerTiming`** property of the `HTMLElement` interface marks the element as a container root for observation in the Container Timing API.

The `containerTiming` property reflects the value of the `containertiming` attribute.
Setting the property adds the attribute, making the element a container root: if the element is already in the document, only subsequent paints contribute to its timing.

## Value

A string.
This is the empty string (`""`) if the attribute isn't set.

## Examples

### Logging the value of `containerTiming`

In this example, adding the `containertiming` attribute to the `` element sets it up as a container root.

```html
<section containertiming="hero" id="hero-section">
  <!-- ... -->
</section>
```

We can then read the property and log its value:

```js
const el = document.getElementById("hero-section");
console.log(el.containerTiming); // "hero"
```

For examples of how to use the Container Timing API to get timing information, see `PerformanceContainerTiming`.

## See also

- `PerformanceContainerTiming`
- `containertiming` HTML attribute
- `HTMLElement.containerTimingIgnore`
