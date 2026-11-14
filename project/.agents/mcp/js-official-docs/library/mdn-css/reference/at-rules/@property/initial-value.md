---
title: "`initial-value` CSS at-rule descriptor"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@property/initial-value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `initial-value` CSS at-rule descriptor

The **`initial-value`** descriptor of the `@property` at-rule specifies the initial value for the registered CSS custom property.
It is a required descriptor unless the `syntax` descriptor value is the universal syntax (`*`).
If required but missing or invalid, the entire `@property` rule is invalid and ignored.

## Syntax

```css
/* Set initial color value */
initial-value: rebeccapurple;

/* Set initial length value */
initial-value: 16px;
```

### Values

A value that matches the type specified in the `syntax` descriptor.
For example, if `syntax` is `<color>`, then the `initial-value` must be a valid `color` value.

If the value of the `syntax` descriptor is not the universal syntax definition, the `initial-value` descriptor has to be a computationally independent value. This means the value can be converted into a computed value without depending on other values, except for "global" definitions independent of CSS. For example, `10px` is computationally independent—it doesn't change when converted to a computed value. `2in` is also valid, because `1in` is always equivalent to `96px`. However, `3em` is not valid, because the value of an `em` is dependent on the parent's `font-size`.

## Examples

### Setting an initial value for a custom property

This example shows how to define a custom property `--my-color` with an initial color value of `#c0ffee`. This initial value will be used when the property is not inherited (`inherits: false`) and no other value is set on the element.

```css
@property --my-color {
  syntax: "<color>";
  inherits: false;
  initial-value: #c0ffee;
}
```

Using JavaScript `CSS.registerProperty()`:

```js
window.CSS.registerProperty({
  name: "--my-color",
  syntax: "<color>",
  inherits: false,
  initialValue: "#c0ffee",
});
```

## See also

- Other `@property` descriptors: `inherits` and `syntax`
- Registering CSS custom properties
- CSS Properties and Values API
- CSS Painting API
- CSS Typed Object Model
- Houdini APIs
