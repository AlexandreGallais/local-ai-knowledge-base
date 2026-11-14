---
title: "LayoutShiftAttribution"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/layoutshiftattribution/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LayoutShiftAttribution

The `LayoutShiftAttribution` interface provides debugging information about elements which have shifted.

Instances of `LayoutShiftAttribution` are returned in an array by calling `LayoutShift.sources`.

## Instance properties

- `LayoutShiftAttribution.node` (read-only) (experimental)
    Returns the element that has shifted (null if it has been removed).
- `LayoutShiftAttribution.previousRect` (read-only) (experimental)
    Returns a `DOMRectReadOnly` object representing the position of the element before the shift.
- `LayoutShiftAttribution.currentRect` (read-only) (experimental)
    Returns a `DOMRectReadOnly` object representing the position of the element after the shift.

## Instance methods

- `LayoutShiftAttribution.toJSON()` (experimental)
    Returns a JSON-serializable plain object representing the `LayoutShiftAttribution` object. Automatically called by `JSON.stringify()`.

## Examples

The following example observes layout shifts and identifies the most impactful element. The `sources` array is sorted by impact area, in descending order — so the first element (`sources[0]`) represents the element that contributed most to the layout shift. For more detail on that, see Debug Web Vitals in the field.

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.sources || entry.sources.length === 0) continue;

    const mostImpactfulSource = entry.sources[0];
    console.log("Layout shift score:", entry.value);
    console.log("Most impactful element:", largestShiftSource.node);
    console.log("Previous position:", largestShiftSource.previousRect);
    console.log("Current position:", largestShiftSource.currentRect);
  }
});

observer.observe({ type: "layout-shift", buffered: true });
```

## See also

- Debug layout shifts
- Debug Web Vitals in the field
