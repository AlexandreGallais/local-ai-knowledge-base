---
title: "HTMLMeterElement: high property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmeterelement/high/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMeterElement: high property

The **`high`** property of the `HTMLMeterElement` interface represents the high boundary of the `<meter>` element as a floating-point number. It reflects the element's `high` attribute, or the value of `max` if not defined. The value of `high` is clamped by the `low` and `max` values.

This property can also be set directly, for example to set a default value based on some condition.

## Value

A number that is not less than `HTMLMeterElement.low` nor greater than `HTMLMeterElement.max`.

## Examples

```html
<label for="fuel">Current fuel level:</label>
<meter
  id="fuel"
  min="0"
  max="100"
  low="15"
  high="66"
  optimum="80"
  value="50"></meter>
```

```js
const meterElement = document.getElementById("fuel");
console.log(meterElement.high); // 66
++meterElement.high;
console.log(meterElement.high); // 67
```

## See also

- `<meter>`
- `HTMLMeterElement.value`
- `HTMLMeterElement.max`
- `HTMLMeterElement.low`
- `HTMLProgressElement`
