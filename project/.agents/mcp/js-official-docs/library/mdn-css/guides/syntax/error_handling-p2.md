---
title: "CSS error handling (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/syntax/error_handling/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS error handling (part 2 of 2)

## Grammar check

After parsing each declaration, style rule, at-rule, etc., the user agent checks to make sure the grammar follows the rules for that declaration. For example, if a property value is of the wrong data type or a descriptor is not valid for the at-rule being described, the content that does not match the expected grammar is deemed invalid and gets ignored.

Each CSS property accepts specific data types. For example, the `background-color` property accepts either a valid `<color>` or a CSS global keyword. When the value assigned to a property is of the wrong type, such as `background-color: 45deg`, the declaration is invalid and therefore ignored.

### Invalid custom properties

Custom properties are generally considered valid when declared, but may create invalid CSS when accessed, i.e., they may be used as a value (via the `var` function) for a property that does not accept that value type. The browser parses each custom property when encountered without regard to where the property is consumed.

Generally, when a property value is invalid, the declaration is ignored and the property falls back to the last valid value. Invalid computed custom property values, however, work slightly differently.

When a `var()` substitution is invalid, the declaration is not ignored and the initial or inherited value of the property is used instead. The property is set to a new value, but possibly not the expected one.

Let's look at an example to illustrate this behavior:

```css
:root {
  --theme-color: 45deg;
}
body {
  background-color: var(--theme-color);
}
```

In the above code, the custom property declaration is valid. The `background-color` declaration is also valid at compute time. However, when the browser substitutes the custom property in `var(--theme-color)` with `45deg` as a value of the `background-color` property, the grammar is invalid. An `angle` is not a valid `background-color` value. In this case, the declaration is not ignored as invalid. Rather, when a custom property is of the wrong type, if the property is inheritable, the value is inherited from its parent. If the property is not inheritable, the default initial value is used. In the case of `background-color`, the property value is not an inherited value, so the initial value of `transparent` is used.

To better control the way custom properties fall back, use the `@property` at-rule to define the initial value of the property:

```css
@property --theme-color {
  syntax: "<color>";
  inherits: false;
  initial-value: rebeccapurple;
}
```

## See also

- CSS syntax module
- Syntax guide
- Value definition syntax
