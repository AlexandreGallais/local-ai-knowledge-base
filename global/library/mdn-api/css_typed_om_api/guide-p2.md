---
title: "Using the CSS Typed Object Model (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/css_typed_om_api/guide/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the CSS Typed Object Model (part 2 of 2)

## CSSStyleValue

The `CSSStyleValue` interface of the CSS Typed Object Model API is the base class of all CSS values accessible through the Typed OM API, including `CSSImageValue`, `CSSKeywordValue`, `CSSNumericValue`, `CSSPositionValue`, `CSSTransformValue`, and `CSSUnparsedValue`.

It has two methods:

- `CSSStyleValue.parse()`
- `CSSStyleValue.parseAll()`

As noted above, `StylePropertyMapReadOnly.get('--customProperty')` returns a `CSSUnparsedValue`. We can parse `CSSUnparsedValue` object instances with the inherited `CSSStyleValue.parse()` and `CSSStyleValue.parseAll()` methods.

Let's examine a CSS example with several custom properties, transforms, `calc()`s, and other features. We'll take a look at what their types are by employing short JavaScript snippets outputting to `console.log()`:

```css
:root {
  --main-color: hsl(198 43% 42%);
  --black: hsl(0 0% 16%);
  --white: hsl(0 0% 97%);
  --unit: 1.2rem;
}

button {
  --main-color: hsl(198 100% 66%);
  display: inline-block;
  padding: var(--unit) calc(var(--unit) * 2);
  width: calc(30% + 20px);
  background: no-repeat 5% center url("magic-wand.png") var(--main-color);
  border: 4px solid var(--main-color);
  border-radius: 2px;
  font-size: calc(var(--unit) * 2);
  color: var(--white);
  cursor: pointer;
  transform: scale(0.95);
}
```

Let's add the class to a button (a button which does nothing).

```html
<button>Styled Button</button>
```

```html
<p>
  There is nothing to see here. Please open your browser console to see the
  output!
</p>
```

We grab our `StylePropertyMapReadOnly` with the following JavaScript:

```js
const allComputedStyles = document.querySelector("button").computedStyleMap();
```

The following examples reference `allComputedStyles`:

### CSSUnparsedValue

The `CSSUnparsedValue` represents custom properties:

```js
// CSSUnparsedValue
const unit = allComputedStyles.get("--unit");

console.log(unit); // CSSUnparsedValue {0: " 1.2rem", length: 1}
console.log(unit[0]); // " 1.2rem"
```

When we invoke `get()`, a custom property of type `CSSUnparsedValue` is returned. Note the space before the `1.2rem`. To get a unit and value, we need a `CSSUnitValue`, which we can retrieve using the `CSSStyleValue.parse()` method on the `CSSUnparsedValue`.

```js
const parsedUnit = CSSNumericValue.parse(unit);
console.log(parsedUnit); // CSSUnitValue {value: 1.2, unit: "rem"}
console.log(parsedUnit.unit); // "rem"
console.log(parsedUnit.value); // 1.2
```

### CSSMathSum

Although the `` element is an inline element by default, we've added `display: inline-block;` to enable sizing. In our CSS we have `width: calc(30% + 20px);`, which is a `calc()` function to define the width.

When we `get()` the `width`, we get a `CSSMathSum` returned. `CSSMathSum.values` is a `CSSNumericArray` with 2 `CSSUnitValues`.

The value of `CSSMathValue.operator` is `sum`:

```js
const btnWidth = allComputedStyles.get("width");

console.log(btnWidth); // CSSMathSum
console.log(btnWidth.values); // CSSNumericArray {0: CSSUnitValue, 1: CSSUnitValue, length: 2}
console.log(btnWidth.operator); // 'sum'
```

### CSSTransformValue with CSSScale

The `display: inline-block;` also enables transforming. In our CSS we have `transform: scale(0.95);`, which is a `transform` function.

```js
const transform = allComputedStyles.get("transform");

console.log(transform); // CSSTransformValue {0: CSSScale, 1: CSSTranslate, length: 2, is2D: true}
console.log(transform.length); // 1
console.log(transform[0]); // CSSScale {x: CSSUnitValue, y: CSSUnitValue, z: CSSUnitValue, is2D: true}
console.log(transform[0].x); // CSSUnitValue {value: 0.95, unit: "number"}
console.log(transform[0].y); // CSSUnitValue {value: 0.95, unit: "number"}
console.log(transform[0].z); // CSSUnitValue {value: 1, unit: "number"}
console.log(transform.is2D); // true
```

When we `get()` the `transform` property, we get a `CSSTransformValue`. We can query the length (or number) of transform functions with the `length` property.

Seen as we have a length of `1`, which represents a single transform function, we log the first object and get a `CSSScale` object. We get `CSSUnitValues` when we query the `x`, `y`, and `z` scaling. The readonly `CSSScale.is2D` property is `true` in this scenario.

Had we added `translate()`, `skew()`, and `rotate()` transform functions, the length would have been `4`, each with their own `x`, `y`, `z` values, and each with an `.is2D` property. For example, had we included `transform: translate3d(1px, 1px, 3px)`, the `.get('transform')` would have returned a `CSSTranslate` with `CSSUnitValues` for `x`, `y`, and `z`, and the readonly `.is2D` property would have been `false`.

### CSSImageValue

Our button has one background image: a magic wand.

```js
const bgImage = allComputedStyles.get("background-image");

console.log(bgImage); // CSSImageValue
console.log(bgImage.toString()); // url("magic-wand.png")
```

When we `get()` the `'background-image'`, a `CSSImageValue` is returned. While we used the CSS `background` shorthand property, the inherited `Object.prototype.toString()` method, shows we returned only the image, `'url("magic-wand.png")'`.

Notice that the value returned is the absolute path to the image — this is returned even if the original `url()` value was relative. Had the background image been a gradient or multiple background images, `.get('background-image')` would have returned a `CSSStyleValue`. The `CSSImageValue` is returned only if there is a single image, and only if that single image declaration is a URL.

Finally, we put all this together in one live sample. Remember to use your browser's console to inspect the output.

## Summary

This should get you started with understanding the CSS Typed OM. Take a look at all the CSS Typed OM interfaces to learn more.

## See also

- Using the CSS Painting API
