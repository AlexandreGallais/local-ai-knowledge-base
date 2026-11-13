---
title: "custom-media-pattern"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/custom-media-pattern/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# custom-media-pattern

Specify a pattern for custom media query names.

```css
@custom-media --foo (max-width: 30em);
/**             ↑
 * The pattern of this */
```

Use this rule to enforce a convention. For example, require kebab-case names for consistency with the specifications' examples.

This rule supports 2 message arguments: the custom media name and the configured pattern.

## Options

### `string`

Specify a regex string not surrounded with `"/"`.

Given:

```json
{
  "custom-media-pattern": "foo-.+"
}
```

The following patterns are considered problems:

```css
@custom-media --bar (min-width: 30em);
```

The following patterns are _not_ considered problems:

```css
@custom-media --foo-bar (min-width: 30em);
```
