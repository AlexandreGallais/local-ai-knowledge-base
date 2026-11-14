---
title: "WheelEvent: deltaY property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/wheelevent/deltay/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WheelEvent: deltaY property

The **`WheelEvent.deltaY`** read-only property is a
`double` representing the vertical scroll amount in the
`WheelEvent.deltaMode` unit.

You must check the `deltaMode` property to determine the unit of the `deltaY` value. Do not assume that the `deltaY` value is specified in pixels. Some browsers, for compatibility reasons, may return different units for the `deltaY` value depending on whether `deltaMode` has been accessed, to accommodate for websites not explicitly checking the `deltaMode` property.

## Value

A number.

## Examples

```js
const syntheticEvent = new WheelEvent("syntheticWheel", {
  deltaY: 4,
  deltaMode: 0,
});

console.log(syntheticEvent.deltaY);
```

## See also

- `wheel`
- `WheelEvent`
