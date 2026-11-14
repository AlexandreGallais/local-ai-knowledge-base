---
title: "CSSMathValue"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssmathvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSMathValue

The **`CSSMathValue`** interface of the CSS Typed Object Model API is the base interface for objects representing complex numeric values produced by the CSS `calc()`, `min()`, `max()`, and `clamp()` functions.

> **Note:**
> `CSSMathValue` cannot be constructed directly.
> Instances are returned by the platform (for example via `StylePropertyMapReadOnly.get()`) as one of its subtypes, listed below.

## Instance properties

- `CSSMathValue.operator` (read-only)
    Returns the operator that the current subtype represents.

## Static methods

_Also inherits methods from its parent interface, `CSSNumericValue`._

## Instance methods

_Also inherits methods from its parent interface, `CSSNumericValue`._

## Interfaces based on CSSMathValue

- `CSSMathClamp`
- `CSSMathInvert`
- `CSSMathMax`
- `CSSMathMin`
- `CSSMathNegate`
- `CSSMathProduct`
- `CSSMathSum`

## Examples

### `calc()` representations

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
  width: calc(30% - 20px);
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

log(`type: ${width.constructor.name}`);
log(`operator: ${width.operator}`);
log(`nested value type: ${width.values[1].constructor.name}`);
log(`nested value operator: ${width.values[1].operator}`);
```

#### Result

`width` is represented by a `CSSMathSum` object whose `operator` is `"sum"`, because `calc(30% - 20px)` is represented as an addition of `30%` and the negation of `20px`.
The second nested value's type is `CSSMathNegate` and its `operator` is `"negate"` (reflecting that negation).
