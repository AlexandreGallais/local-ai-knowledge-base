---
title: "CSS Properties and Values API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/css_properties_and_values_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS Properties and Values API

The **CSS Properties and Values API** — part of the CSS Houdini umbrella of APIs — allows developers to explicitly define their CSS custom properties, allowing for property type checking, default values, and properties that do or do not inherit their value.

## Interfaces

- `CSS.registerProperty`
    Defines how a browser should parse CSS custom properties. Access this interface through `CSS.registerProperty` in JavaScript.
- `@property`
    Defines how a browser should parse CSS custom properties. Access this interface through `@property` at-rule in CSS.

## Examples

The following will register a custom property named `--my-color` using `CSS.registerProperty` in JavaScript. `--my-color` will use the CSS color syntax, it will have a default value of `#c0ffee`, and it will not inherit its value:

```js
window.CSS.registerProperty({
  name: "--my-color",
  syntax: "<color>",
  inherits: false,
  initialValue: "#c0ffee",
});
```

The same registration can take place in CSS using the `@property` at-rule:

```css
@property --my-color {
  syntax: "<color>";
  inherits: false;
  initial-value: #c0ffee;
}
```

## See also

- Using the CSS properties and values API
- CSS Painting API
- CSS Typed Object Model
- Houdini APIs
