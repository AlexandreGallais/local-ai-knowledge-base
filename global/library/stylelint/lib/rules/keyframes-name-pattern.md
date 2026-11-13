---
title: "keyframes-name-pattern"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/keyframes-name-pattern/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# keyframes-name-pattern

Specify a pattern for keyframe names.

```css
@keyframes slide-right {}
/**             ↑
 * The pattern of this */
```

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
