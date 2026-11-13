---
title: "Using CSS custom properties (variables) (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/cascading_variables/using_custom_properties/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using CSS custom properties (variables) (part 2 of 2)

## Invalid custom properties

Each CSS property can be assigned a defined set of values.
If you try to assign a value to a property that is outside its set of valid values, it's considered _invalid_.

When the browser encounters an invalid value for a regular CSS property (for example, a value of `16px` for the `color` property), it discards the declaration, and elements are assigned the values that they would have had if the declaration did not exist.
In the following example, we see what happens when a regular CSS declaration is invalid; `color: 16px;` is discarded and the previous `color: blue` rule is applied instead:

```html
<p>This paragraph is initially black.</p>
```

```css
p {
  font-weight: bold;
  color: blue;
}

p {
  /* oops, not a valid color */
  color: 16px;
}
```

However, when the values of custom properties are parsed, the browser doesn't yet know where they will be used, so it must consider nearly all values as _valid_.
Unfortunately, these valid values can be used, via the `var()` functional notation, in a context where they might not make sense.
Properties and custom variables can lead to invalid CSS statements, leading to the concept of _valid at computed time_.

When the browser encounters an invalid `var()` substitution, then the initial or inherited value of the property is used.
This example is just like the last one, except we use a custom property.

The browser substitutes the value of `--text-color` in place of `var(--text-color)`, but `16px` is not a valid property value for `color`.
After substitution, the property doesn't make sense, so the browser handles this situation in two steps:

1. Check if the property `color` is inheritable. It is, but this `` doesn't have any parent with the `color` property set. So we move on to the next step.
2. Set the value to its **default initial value**, which is black.

```html
<p>This paragraph is initially black.</p>
```

```css
:root {
  --text-color: 16px;
}

p {
  font-weight: bold;
  color: blue;
}

p {
  color: var(--text-color);
}
```

For such cases, the `@property` at-rule can prevent unexpected results by allowing you to define the initial value of the property:

```html
<p>This paragraph is initially black.</p>
```

```css
@property --text-color {
  syntax: "<color>";
  inherits: false;
  initial-value: teal;
}

:root {
  --text-color: 16px;
}

p {
  font-weight: bold;
  color: blue;
}

p {
  color: var(--text-color);
}
```

## Values in JavaScript

To use the values of custom properties in JavaScript, it is just like standard properties.

```js
// get variable from inline style
element.style.getPropertyValue("--my-var");

// get variable from wherever
getComputedStyle(element).getPropertyValue("--my-var");

// set variable on inline style
element.style.setProperty("--my-var", jsVar + 4);
```

## See also

- `@property` at-rule
- `var()`
- CSS custom properties for cascading variables module
- Custom property syntax
- CSS Properties and Values API
