---
title: "media-type-no-deprecated"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/media-type-no-deprecated/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# media-type-no-deprecated

Disallow deprecated media types.

```css
    @media tv {}
/**        ↑
 * Deprecated media type */
```

Use this rule to avoid `@media` blocks that never apply. Browsers accept deprecated media types as valid but match nothing. They are:

- `aural`
- `braille`
- `embossed`
- `handheld`
- `projection`
- `speech`
- `tty`
- `tv`

Currently, the recommended media types are:

- `all`
- `screen`
- `print`

The deprecated media types were removed because they were either never widely implemented or their use cases are now better handled by media features rather than broad device categories.

This rule supports 1 message argument: the deprecated media type.

## Options

### `true`

```json
{
  "media-type-no-deprecated": true
}
```

The following pattern is considered a problem:

```css
@media tty {}
```

The following pattern is _not_ considered a problem:

```css
@media screen {}
```

## Optional secondary options

### `ignoreMediaTypes`

```json
{ "ignoreMediaTypes": ["array", "of", "types", "/regex/"] }
```

Ignore the specified media types.

Given:

```json
{
  "media-type-no-deprecated": [true, { "ignoreMediaTypes": ["/^t/", "speech"] }]
}
```

The following patterns are _not_ considered problems:

```css
@media tv {}
```

```css
@media tty {}
```

```css
@media speech {}
```
