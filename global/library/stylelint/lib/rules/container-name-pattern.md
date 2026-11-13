---
title: "container-name-pattern"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/container-name-pattern/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# container-name-pattern

Specify a pattern for container names.

```css
@container foo (width > 400px) {}
/**        ↑
 * The pattern of this */
```

Use this rule to enforce a convention. For example, require kebab-case names for consistency with the specifications' examples.

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
