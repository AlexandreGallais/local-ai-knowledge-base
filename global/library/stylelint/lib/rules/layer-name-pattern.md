---
title: "layer-name-pattern"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/layer-name-pattern/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# layer-name-pattern

Specify a pattern for layer names.

```css
@layer foo {}
/**    ↑
 * This layer name */
```

This rule supports 2 message arguments: the layer name and the configured pattern.

## Options

### `string`

Specify a regex string not surrounded with `"/"`.

Given:

```json
{
  "layer-name-pattern": "^[a-z][a-z0-9.-]*$"
}
```

The following patterns are considered problems:

```css
@layer Foo;
```

```css
@layer foo.Bar {}
```

```css
@layer foo, Bar {}
```

```css
@import "foo.css" layer(Bar);
```

The following patterns are _not_ considered problems:

```css
@layer foo;
```

```css
@layer foo.bar {}
```

```css
@layer foo, bar {}
```

```css
@import "foo.css" layer(bar);
```
