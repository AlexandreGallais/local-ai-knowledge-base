---
title: "`<dashed-ident>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/dashed-ident/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<dashed-ident>` CSS type

The **`<dashed-ident>`** CSS data type is a case-sensitive `custom-ident` starting with two dashes that denotes an arbitrary string used as an identifier.

## Syntax

The syntax of `<dashed-ident>` is similar to CSS identifiers (such as property names), except that it is case-sensitive. It is a user-defined identifier preceded by two dashes (`--`).

The double dash at the beginning makes them easily identifiable when reading through a CSS code block, and helps to avoid name clashes with standard CSS keywords.

Just like `custom-ident`s, `<dashed-ident>`s are defined by the user. However, some `<custom-ident>`s are defined by the CSS language itself; `<dashed-ident>`s will never be defined in CSS.

## Examples

### Using with CSS custom properties

When a `<dashed-ident>` is used as a CSS custom property, the property is declared first, and then the `<dashed-ident>` is used within a CSS `var()` function.

```css
html {
  --primary-color: red;
  --secondary-color: blue;
  --tertiary-color: green;
}

h1,
h4 {
  color: var(--primary-color);
}

h2,
h5 {
  color: var(--secondary-color);
}

h3,
h6 {
  color: var(--tertiary-color);
}
```

### Using with @color-profile

When a `<dashed-ident>` is used with the `@color-profile` at-rule, the at-rule is declared first, and then the `<dashed-ident>` is used within a CSS `color()` function.

```css
@color-profile --my-color-profile {
  src: url("https://example.org/SWOP2006_Coated5v2.icc");
}

.header {
  background-color: color(--my-color-profile 0% 70% 20% 0%);
}
```

### Using with @font-palette-values

When a `<dashed-ident>` is used with the `@font-palette-values` at-rule, the at-rule is declared first, and then the `<dashed-ident>` is used as the value for the `font-palette` property.

```css
@font-palette-values --my-palette {
  font-family: "Bixa";
  base-palette: 1;
  override-colors: 0 red;
}

h1,
h2,
h3,
h4 {
  font-palette: --my-palette;
}
```

### Using with env() and param()

When a `<dashed-dent>` is used in an external resource in an `env` CSS function, it can be updated using the `param` CSS function.

```svg
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path fill="env(--color, black)" d="..." />
</svg>
```

```css
path:hover {
  link-parameters: param(--color, tomato);
}
```

## Browser compatibility

_As this type is not a real type but a convenience type used to simplify the definition of other CSS syntax, there is no browser compatibility information as such._

## See also

- `ident`
- `custom-ident`
