---
title: "selector-id-pattern"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/selector-id-pattern/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# selector-id-pattern

Specify a pattern for ID selectors.

```css
.foo, #bar.baz a, #hoo[disabled] { color: pink; }
/**   ↑           ↑
 * These ID selectors */
```

This rule supports 2 message arguments: the selector and the configured pattern.

## Options

### `string`

Specify a regex string not surrounded with `"/"`.

The selector value _after `#`_ will be checked. No need to include `#` in your pattern.

Given:

```json
{
  "selector-id-pattern": "foo-[a-z]+"
}
```

The following patterns are considered problems:

```css
#foop {}
```

```css
#foo-BAR {}
```

```css
div > .zing + #foo-BAR {}
```

The following patterns are _not_ considered problems:

```css
#foo-bar {}
```

```css
div > .zing + #foo-bar {}
```

```css
.foop {}
```

```css
[foo='bar'] {}
```
