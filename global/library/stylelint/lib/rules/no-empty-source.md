---
title: "no-empty-source"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/no-empty-source/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# no-empty-source

Disallow empty sources.

```css

```

Use this rule to avoid leftovers from edits. An empty source does nothing.

A source containing only whitespace, e.g., spaces, tabs, or newlines, is considered empty.

This rule doesn't have any message arguments.

## Options

### `true`

```json
{
  "no-empty-source": true
}
```

The following patterns are _not_ considered problems:

```css
a {}
```

```css
/* Only comments */
```
