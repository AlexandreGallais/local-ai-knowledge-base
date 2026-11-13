---
title: "keyframes-name-pattern"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/keyframes-name-pattern/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# keyframes-name-pattern

Specify a pattern for keyframe names.

```css
@keyframes slide-right {}
/**             ↑
 * The pattern of this */
```

Use this rule to enforce a convention. For example, require:

- kebab-case names for consistency with the specifications' examples
- a namespace, e.g. `^foo-`, as `@keyframes` names are global and can collide across stylesheets

This rule supports 2 message arguments: the keyframes name and the configured pattern.

## Options

### `string`

Specify a regex string not surrounded with `"/"`.

Given:

```json
{
  "keyframes-name-pattern": "foo-.+"
}
```

The following patterns are considered problems:

```css
@keyframes foo {}
```

```css
@keyframes bar {}
```

```css
@keyframes FOO-bar {}
```

The following patterns are _not_ considered problems:

```css
@keyframes foo-bar {}
```
