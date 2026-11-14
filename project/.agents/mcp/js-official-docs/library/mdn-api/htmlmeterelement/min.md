---
title: "HTMLMeterElement: min property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmeterelement/min/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMeterElement: min property

The **`min`** property of the `HTMLMeterElement` interface represents the minimum value of the `<meter>` element as a floating-point number. It reflects the element's `min` attribute, or `0` if no `min` is defined.

This property can also be set directly, for example to set a default value based on some condition.

## Value

A number.

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
console.log(meterElement.min); // 0
++meterElement.min;
console.log(meterElement.min); // 1
```

## See also

- `<meter>`
- `HTMLMeterElement.value`
- `HTMLMeterElement.max`
- `HTMLProgressElement`
