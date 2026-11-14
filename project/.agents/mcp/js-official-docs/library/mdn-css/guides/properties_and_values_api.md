---
title: "CSS properties and values API"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/properties_and_values_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS properties and values API

The **CSS properties and values API** module defines a method for registering new CSS properties, defining the property's data type, inheritance behavior, and, optionally, an initial value.
This API expands on CSS custom properties for cascading variables module, which allows authors to define custom properties in CSS using two dash syntax (`--`).
The CSS properties and values API is part of the CSS Houdini umbrella of APIs.

Custom properties let you reuse values across a project to simplify complex or repetitive stylesheets.
Basic <example-value> properties are defined in the CSS custom properties for cascading variables module.
The CSS properties and values API expands on that module, enabling adding metadata to custom properties using CSS with the `@property` at-rule or, alternatively, using JavaScript's `CSS.registerProperty` method.

Whether registered with CSS or JavaScript, setting metadata on custom properties provides for an expected data type that the browser can use depending on the context, defines an initial value, and lets you control inheritance.

CSS properties and values API custom property registration is more robust than the more basic CSS cascading variable custom property declaration, especially when it comes to transitioning and animating values as browsers can interpolate between custom values of this type, whereas properties that use two dash syntax (`--`) behave more like a string substitution.

## Properties and values API in action

To see how custom properties and values can be used via API, hover over the box below.

```js
CSS.registerProperty({
  name: "--stop-color",
  syntax: "<color>",
  inherits: false,
  initialValue: "cornflowerblue",
});
```

```css
.box {
  padding: 1rem;
  width: 90%;
  height: 4rem;
  font-family: sans-serif;
  font-size: large;
  color: white;
  border-radius: 0.5rem;
}

.box {
  background: linear-gradient(to right, var(--stop-color), lavenderblush);
  transition: --stop-color 2s;
}

.box:hover {
  --stop-color: aquamarine;
}
```

```html
<div class="box"><p>Linear gradient with transition</p></div>
```

The box has a background consisting of a linear gradient from `--stop-color` (the custom property) to `lavenderblush`.
The value of `--stop-color` is set to `cornflowerblue` at first, but when you hover over the box, `--stop-color` transitions to `aquamarine` over two seconds (`linear-gradient(to right, aquamarine, lavenderblush)`).

## Reference

### At-rules and descriptors

- `@property`
  - syntax descriptor
    - `+` and `#` multipliers
    - `|` combinator
  - inherits descriptor
  - initial-value descriptor

### Interfaces and APIs

- `CSSPropertyRule`
- `CSS.registerProperty()`

## Guides

- Registering CSS custom properties
    Covers how to register CSS custom properties with the `@property` at-rule and explains the benefits of doing so.
- Using the CSS properties and values API
    Explains how to register custom properties in CSS and JavaScript, with hints on handling undefined and invalid values, fallbacks, and inheritance.
- CSS Houdini
    Reference guide to Houdini resources including the CSS modules, API guides, and external resources.
- Houdini APIs
    Explains what CSS Houdini is and its advantages, along with a list of available APIs and their statuses.

## Related concepts

- `var`
- CSSRule
- CSSStyleValue
- CSS scoping
- Using shadow DOM
- CSS Typed Object Model API
- CSS Painting API
- Worklet

## See also

- CSS cascading and inheritance
- CSS scoping module
- Using shadow DOM
- CSS Painting API module
- Worklet interface
- CSS `env()`
- CSS Typed Object Model
