---
title: "no-duplicate-selectors"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/no-duplicate-selectors/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# no-duplicate-selectors

Disallow duplicate selectors.

```css
    .foo {} .bar {} .foo {}
/** ↑               ↑
 * These duplicates */
```

This rule checks for two types of duplication:

- Duplication of a single selector with a rule's selector list, e.g. `a, b, a {}`.
- Duplication of a selector list within a stylesheet, e.g. `a, b {} a, b {}`. Duplicates are found even if the selectors come in different orders or have different spacing, e.g. `a d, b > c {} b>c, a d {}`.

The same selector _is_ allowed to repeat in the following circumstances:

- It is used in different selector lists, e.g. `a {} a, b {}`.
- The duplicates are determined to originate in different stylesheets, e.g. you have concatenated or compiled files in a way that produces sourcemaps for PostCSS to read, e.g. postcss-import.
- The duplicates are in rules with different parent nodes, e.g. inside and outside of a media query.

This rule resolves nested selectors according to the CSS Nesting specification. So the following two selectors count as a problem, because the resolved selectors end up with a duplicate:

```css
:is(a, b) c {}  /* without nesting */
a, b { & c {} } /* with nesting */
```

> **Warning:**
> This rule is only appropriate for CSS. You should not turn it on for CSS-like languages, such as SCSS or Less.

This rule supports 2 message arguments: the duplicate selector and the line where it first appeared.

## Options

### `true`

```json
{
  "no-duplicate-selectors": true
}
```

The following patterns are considered problems:

```css
.foo,
.bar,
.foo {}
```

```css
.foo {}
.bar {}
.foo {}
```

```css
.foo .bar {}
.bar {}
.foo .bar {}
```

```css
@media (min-width: 10px) {
  .foo {}
  .foo {}
}
```

```css
.foo, .bar {}
.bar, .foo {}
```

```css
a .foo, b + .bar {}
b+.bar,
a
  .foo {}
```

```css
a b {}
a {
  & b {}
}
```

The following patterns are _not_ considered problems:

```css
.foo {}
@media (min-width: 10px) {
  .foo {}
}
```

```css
.foo {
  .foo {}
}
```

```css
.foo {}
.bar {}
.foo .bar {}
.bar .foo {}
```

```css
a b {}
a {
  & b,
  & c {}
}
```

## Optional secondary options

### `disallowInList`

This option will also disallow duplicate selectors within selector lists. Defaults to `false`.

Given:

```json
{
  "no-duplicate-selectors": [true, { "disallowInList": true }]
}
```

The following patterns are considered problems:

```css
input, textarea {
  border: 2px;
}
textarea {
  border: 1px;
}
```

### `ignoreSelectors`

```json
{ "ignoreSelectors": ["array", "of", "selectors", "/regex/"] }
```

Given:

```json
{
  "no-duplicate-selectors": [true, { "ignoreSelectors": ["a", "/foo/"] }]
}
```

The following patterns are _not_ considered problems:

```css
a {}
a {}
```

```css
.foo {}
.foo {}
```
