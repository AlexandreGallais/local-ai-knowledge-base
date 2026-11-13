---
title: "selector-max-id"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/selector-max-id/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# selector-max-id

Limit the number of ID selectors in a selector.

```css
    #foo {}
/** ↑
 * This type of selector */
```

Each selector in a selector list is evaluated separately.

> **Note:**
> In versions prior to `17.0.0`, this rule would evaluate functional pseudo-classes separately, such as `:not()` and `:is()`, and resolve nested selectors (in a nonstandard way) before counting.

This rule supports 2 message arguments: the selector and the configured maximum.

## Options

### `number`

Specify a maximum universal selectors allowed.

Given:

```json
{
  "selector-max-id": 2
}
```

The following pattern is considered a problem:

```css
#foo #bar #baz {}
```

The following patterns are _not_ considered problems:

```css
#foo {}
```

```css
#foo #bar {}
```

```css
.foo #foo {}
```

```css
#foo.foo #bar {}
```

## Optional secondary options

### `ignoreContextFunctionalPseudoClasses`

```json
{
  "ignoreContextFunctionalPseudoClasses": [
    "array",
    "of",
    "pseudo-classes",
    "/regex/"
  ]
}
```

Ignore selectors inside of the specified functional pseudo-classes.

Given:

```json
{
  "selector-max-id": [
    0,
    { "ignoreContextFunctionalPseudoClasses": [":not", "/^:(h|H)as$/"] }
  ]
}
```

The following patterns are considered problems:

```css
a:is(#foo) {}
```

The following patterns are _not_ considered problems:

```css
a:not(#foo) {}
```

```css
a:has(#foo) {}
```
