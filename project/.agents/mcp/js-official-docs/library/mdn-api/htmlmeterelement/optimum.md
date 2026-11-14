---
title: "HTMLMeterElement: optimum property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmeterelement/optimum/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMeterElement: optimum property

The **`optimum`** property of the `HTMLMeterElement` interface represents the optimum boundary of the `<meter>` element as a floating-point number. It reflects the element's `optimum` attribute, or the midpoint between `min` and `max` values if not defined. The value of `optimum` is clamped by the `min` and `max` values.

This property can also be set directly, for example to set a default value based on some condition.

## Value

A number. Defaults to the midpoint between `HTMLMeterElement.min` and `HTMLMeterElement.max` if not defined.

## Examples

In this example, no `optimum` value is set.

```html
<label for="review">Star rating:</label>
<meter id="review" min="0" max="10" low="2" high="8" value="9"></meter>
```

Though not explicitly defined, the default `optimum` is the midpoint between `min` and `max`, but can be set to any value between `min` and `max`, inclusive.

```js
const meterElement = document.getElementById("fuel");
console.log(meterElement.optimum); // 5
meterElement.optimum = (meterElement.max + meterElement.optimum) / 2;
console.log(meterElement.optimum); // 7.5
```

## See also

- `<meter>`
- `HTMLMeterElement.value`
- `HTMLMeterElement.high`
- `HTMLMeterElement.low`
- `HTMLProgressElement`
