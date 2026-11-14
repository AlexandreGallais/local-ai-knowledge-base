---
title: "`inherits` CSS at-rule descriptor"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@property/inherits/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `inherits` CSS at-rule descriptor

The **`inherits`** CSS descriptor of the `@property` at-rule controls whether or not the registered CSS custom property inherits by default.
It is a required descriptor; if missing or invalid, the entire `@property` rule is invalid and ignored.

## Syntax

```css
/* Custom property does not inherit values */
inherits: false;

/* Custom property inherits values */
inherits: true;
```

### Values

- `true`
    The property inherits by default.
- `false`
    The property does not inherit by default.

## Examples

### Setting inheritance behavior of a custom property

This example shows how to define a custom property `--my-color` that does not inherit its value from its parent elements:

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

- Other `@property` descriptors: `initial-value` and `syntax`
- Registering CSS custom properties
- CSS Properties and Values API
- CSS Painting API
- CSS Typed Object Model
- Houdini APIs
