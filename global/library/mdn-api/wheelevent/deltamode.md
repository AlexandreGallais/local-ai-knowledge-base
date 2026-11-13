---
title: "WheelEvent: deltaMode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/wheelevent/deltamode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WheelEvent: deltaMode property

The **`WheelEvent.deltaMode`** read-only property returns an
`unsigned long` representing the unit of the delta values scroll amount.
Permitted values are:

| Constant          | Value  | Description                               |
| ----------------- | ------ | ----------------------------------------- |
| `DOM_DELTA_PIXEL` | `0x00` | The delta values are specified in pixels. |
| `DOM_DELTA_LINE`  | `0x01` | The delta values are specified in lines.  |
| `DOM_DELTA_PAGE`  | `0x02` | The delta values are specified in pages.  |

You must check the `deltaMode` property to determine the unit of the `deltaX`, `deltaY`, and `deltaZ` values. Do not assume that those values are specified in pixels. Some browsers, for compatibility reasons, may return different units for the `delta*` values depending on whether `deltaMode` has been accessed, to accommodate for websites not explicitly checking the `deltaMode` property.

## Value

An `unsigned long`.

## Examples

```js
const syntheticEvent = new WheelEvent("syntheticWheel", {
  deltaX: 4,
  deltaMode: 0,
});

console.log(syntheticEvent.deltaMode);
```

## See also

- `wheel`
- `WheelEvent`
