---
title: "media-type-no-deprecated"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/media-type-no-deprecated/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# media-type-no-deprecated

Disallow deprecated media types.

```css
    @media tv {}
/**        ↑
 * Deprecated media type */
```

Several CSS media types defined in earlier specifications have been deprecated and should no longer be used. According to the CSS media queries specification, the following media types are recognized as valid but match nothing:

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
