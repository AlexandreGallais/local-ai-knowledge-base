---
title: "CSSMathValue: operator property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssmathvalue/operator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSMathValue: operator property

The **`operator`** read-only property of the `CSSMathValue` interface returns the operator that the current subtype represents.
For example, if the current `CSSMathValue` subtype is `CSSMathSum`, this property will return the string `"sum"`.

## Value

A `String`.

| Interface                     | Value       |
| ----------------------------- | ----------- |
| `CSSMathSum`     | `"sum"`     |
| `CSSMathProduct` | `"product"` |
| `CSSMathMin`     | `"min"`     |
| `CSSMathMax`     | `"max"`     |
| `CSSMathClamp`   | `"clamp"`   |
| `CSSMathNegate`  | `"negate"`  |
| `CSSMathInvert`  | `"invert"`  |

## Examples

### Basic usage

This example shows how the `operator` property identifies the operation represented by a `calc()` value's `CSSMathValue` subtype, including for a nested value.

#### HTML

```html
<div id="demoBox">Text</div>
```

```html
<pre id="log"></pre>
```

#### CSS

`width` is set using a `calc()` subtraction, which is represented as a `CSSMathSum` whose second term is negated.

```css
#demoBox {
  width: calc(50% - 0.5vw);
}
```

```css
#log {
  height: 80px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}
```

#### JavaScript

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText += `${text}\n`;
}
```

We read the `width` value using `computedStyleMap()`, then log its `operator` and the `operator` of its nested value.

```js
const styleMap = document.querySelector("#demoBox").computedStyleMap();
const width = styleMap.get("width");

log(`operator: ${width.operator}`);
log(`nested value operator: ${width.values[1].operator}`);
```

#### Result

`width` is represented by a `CSSMathSum` object whose `operator` is `"sum"`, because `calc(50% - 0.5vw)` is represented as an addition of `50%` and the negation of `0.5vw`.
The second nested value's `operator` is `"negate"`, reflecting that negation.
