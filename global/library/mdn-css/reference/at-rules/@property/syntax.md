---
title: "`syntax` CSS at-rule descriptor"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@property/syntax/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `syntax` CSS at-rule descriptor

The **`syntax`** descriptor of the `@property` at-rule defines the allowed value types for the registered CSS custom property.
It controls how the property's specified value is processed to derive the computed value.
It is a required descriptor; if missing or invalid, the entire `@property` rule is invalid and ignored.

## Syntax

```css
/* A data type name */
syntax: "<color>";

/* A '|' combinator for multiple data types */
syntax: "<length> | <percentage>";

/* Space-separated list of values */
syntax: "<color>+";

/* Comma-separated list of values */
syntax: "<length>#";

/* Keywords */
syntax: "small | medium | large";

/* Combination of data type and keyword */
syntax: "<length> | auto";

/* Universal syntax value */
syntax: "*";
```

### Values

A string (known as the syntax string) that defines the allowed values.
It can be one of the following:

- One or more syntax component names, which can be:
  - Data type names (written with angle brackets, such as `<color>` or `<length>`)
  - Keywords (written without angle brackets, such as `auto` or `none`)
- The universal syntax `*`, which accepts any valid CSS value.
  It cannot be multiplied or combined with other syntax components.

The syntax component names can be used alone or multiplied and combined in different ways:

- The `+` (space-separated) and `#` (comma-separated) multipliers indicate that a list of values is expected.
  For example, `<color>#` means a comma-separated list of `<color>` values is the expected syntax.

- The vertical line (`|`) combinator can create "or" conditions for the expected syntax.
  For example, `<length> | auto` accepts `<length>` or `auto`, and `<color># | <integer>#` expects a comma-separated list of `<color>` values or a comma-separated list of `<integer>` values.

The following syntax component names are supported:

- `"<angle>"`
    Accepts any valid `angle` value.
- `"<color>"`
    Accepts any valid `<color>` value.
- `"<custom-ident>"`
    Accepts any valid `<custom-ident>` value.
- `"<image>"`
    Accepts any valid `image` value.
- `"<integer>"`
    Accepts any valid `<integer>` value.
- `"<length>"`
    Accepts any valid `<length>` value.
- `"<length-percentage>"`
    Accepts any valid `<length>` or `<percentage>` value and any valid `calc()` expression combining `<length>` and `<percentage>` values.
- `"<number>"`
    Accepts any valid `<number>` value.
- `"<percentage>"`
    Accepts any valid `<percentage>` value.
- `"<resolution>"`
    Accepts any valid `resolution` value.
- `"<string>"`
    Accepts any valid `<string>` value.
- `"<time>"`
    Accepts any valid `<time>` value.
- `"<transform-function>"`
    Accepts any valid `<transform-function>` value.
- `"<transform-list>"`
    Accepts a list of valid `<transform-function>` values. It is equivalent to `"<transform-function>+"`.
- `"<url>"`
    Accepts any valid `<url>` value.

## Examples

### Registering a custom property with type checking

This example shows how to define a custom property `--my-color` that allows only `<color>` values:

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

- Other `@property` descriptors: `inherits` and `initial-value`
- Registering CSS custom properties
- CSS Properties and Values API
- CSS Painting API
- CSS Typed Object Model
- Houdini APIs
