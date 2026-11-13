---
title: "HTMLElement: containerTimingIgnore property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/containertimingignore/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: containerTimingIgnore property

The **`containerTimingIgnore`** property of the `HTMLElement` interface excludes the element and its descendants from contributing to the timing of any ancestor container root in the Container Timing API.

The `containerTimingIgnore` property reflects the value of the `containertimingignore` attribute.

## Value

A boolean value.

## Examples

### Logging the value of `containerTimingIgnore`

In this example, adding the `containertimingignore` attribute to a `` element excludes it from its ancestor container's timing.

```html
<section containertiming="hero">
  <div containertimingignore id="ignored">
    <!-- ... -->
  </div>
</section>
```

We can then read the property and log its value:

```js
const el = document.getElementById("ignored");
console.log(el.containerTimingIgnore); // true
```

For examples of how to use the Container Timing API to get timing information, see `PerformanceContainerTiming`.

## See also

- `PerformanceContainerTiming`
- `containertimingignore` HTML attribute
- `HTMLElement.containerTiming`
