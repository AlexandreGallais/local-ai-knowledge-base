---
title: "`containertimingignore` HTML global attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/global_attributes/containertimingignore/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `containertimingignore` HTML global attribute

The **`containertimingignore`** global attribute is a boolean attribute that excludes an element and its descendants from contributing to the timing of any ancestor element marked with `containertiming`.
For more details, see the `PerformanceContainerTiming` interface.

In the DOM, this attribute is reflected as `HTMLElement.containerTimingIgnore`.

## Examples

### Excluding a subtree from a container's timing

In this example, the `` and its contents are excluded from the `"hero"` container's timing, while the image still contributes to it.

```html
<section containertiming="hero">
  <img src="hero.jpg" alt="" />
  <div containertimingignore>
    <!-- content painted here does not count toward the "hero" container's timing -->
  </div>
</section>
```

For examples of how to use the Container Timing API to get timing information, see `PerformanceContainerTiming`.

## See also

- `containertiming`
- `PerformanceContainerTiming`
- `HTMLElement.containerTimingIgnore`
