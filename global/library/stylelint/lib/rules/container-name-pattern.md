---
title: "container-name-pattern"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/container-name-pattern/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# container-name-pattern

Specify a pattern for container names.

```css
@container foo (width > 400px) {}
/**        ↑
 * The pattern of this */
```

This rule supports 2 message arguments: the container name and the configured pattern.

## Options

### `string`

Specify a regex string not surrounded with `"/"`.

Given:

```json
{
  "container-name-pattern": "foo-.+"
}
```

The following patterns are considered problems:

```css
@container foo {}
```

```css
a { container-name: bar; }
```

```css
a { container: baz / inline-size; }
```

The following patterns are _not_ considered problems:

```css
@container foo-bar {}
```

```css
a { container-name: foo-bar; }
```

```css
a { container: foo-baz / inline-size; }
```
