---
title: "HTMLMeterElement: low property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmeterelement/low/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMeterElement: low property

The **`low`** property of the `HTMLMeterElement` interface represents the low boundary of the `<meter>` element as a floating-point number. It reflects the element's `low` attribute, or the value of `min` if not defined. The value of `low` is clamped by the `min` and `max` values.

This property can also be set directly, for example to set a default value based on some condition.

## Value

A number that is not less than `HTMLMeterElement.min` nor greater than `HTMLMeterElement.max`.

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
console.log(meterElement.low); // 15
--meterElement.low;
console.log(meterElement.low); // 14
```

## See also

- `<meter>`
- `HTMLMeterElement.value`
- `HTMLMeterElement.min`
- `HTMLMeterElement.high`
- `HTMLProgressElement`
