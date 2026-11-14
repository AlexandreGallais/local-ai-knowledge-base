---
title: "HTMLMeterElement: value property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmeterelement/value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMeterElement: value property

The **`value`** property of the `HTMLMeterElement` interface represents the current value of the `<meter>` element as a floating-point number. It reflects the element's `value` attribute. If no `value` is set, it is the `HTMLMeterElement.min` value or `0`, whichever is greater.

This property can also be set directly, for example to set a default value based on some condition.

## Value

A number. Defaults to either `HTMLMeterElement.min` or `0`, whichever if greater, if not defined.

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
console.log(meterElement.value); // 50
--meterElement.value;
console.log(meterElement.value); // 49
```

## See also

- `<meter>`
- `HTMLMeterElement.min`
- `HTMLProgressElement`
