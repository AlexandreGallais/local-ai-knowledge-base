---
title: "layer-name-pattern"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/layer-name-pattern/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# layer-name-pattern

Specify a pattern for layer names.

```css
@layer foo {}
/**    ↑
 * This layer name */
```

Use this rule to enforce a convention. For example, require kebab-case names for consistency with the specifications' examples.

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
