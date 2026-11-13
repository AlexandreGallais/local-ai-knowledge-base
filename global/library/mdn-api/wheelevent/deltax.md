---
title: "WheelEvent: deltaX property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/wheelevent/deltax/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WheelEvent: deltaX property

The **`WheelEvent.deltaX`** read-only property is a
`double` representing the horizontal scroll amount in the
`WheelEvent.deltaMode` unit.

You must check the `deltaMode` property to determine the unit of the `deltaX` value. Do not assume that the `deltaX` value is specified in pixels. Some browsers, for compatibility reasons, may return different units for the `deltaX` value depending on whether `deltaMode` has been accessed, to accommodate for websites not explicitly checking the `deltaMode` property.

## Value

A number.

## Examples

```js
const syntheticEvent = new WheelEvent("syntheticWheel", {
  deltaX: 4,
  deltaMode: 0,
});

console.log(syntheticEvent.deltaX);
```

## See also

- `wheel`
- `WheelEvent`
