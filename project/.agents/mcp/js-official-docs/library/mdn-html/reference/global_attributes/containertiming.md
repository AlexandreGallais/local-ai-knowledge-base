---
title: "`containertiming` HTML global attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/global_attributes/containertiming/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `containertiming` HTML global attribute

The **`containertiming`** global attribute marks an element as a _container root_, for which `PerformanceContainerTiming` entries can be observed by `PerformanceObserver` objects using the `"container"` type.

Any paints to new areas inside the container root's subtree contribute to the container's timing (content painted inside the container root itself is excluded, as are repaints to already painted areas).
Timing entries are reported only until the user scrolls or interacts with the page.
Descendant subtrees can be excluded from a container's timing using the `containertimingignore` attribute.
For more details, see the `PerformanceContainerTiming` interface.

In the DOM, this attribute is reflected as `HTMLElement.containerTiming`.

## Value

A string that identifies the container.
This is returned in `PerformanceContainerTiming.identifier`.

## Examples

### Marking a container root

This example marks two elements as container roots, identified as `"hero"` and `"product-list"`.

```html
<section containertiming="hero">
  <h1>Welcome</h1>
  <img src="hero.jpg" alt="" />
</section>

<div containertiming="product-list">
  <!-- product cards -->
</div>
```

## See also

- `containertimingignore`
- `PerformanceContainerTiming`
- `HTMLElement.containerTiming`
