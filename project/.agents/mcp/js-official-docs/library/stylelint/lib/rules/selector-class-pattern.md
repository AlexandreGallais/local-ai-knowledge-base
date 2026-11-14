---
title: "selector-class-pattern"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-class-pattern/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-class-pattern

Specify a pattern for class selectors.

```css
    .foo, #bar.baz span, #hoo[disabled] { color: pink; }
/** ↑         ↑
 * These class selectors */
```

Use this rule to enforce a convention. For example, require:

- kebab-case names for consistency with the specifications' examples
- a namespace, e.g. `^foo-`

This rule ignores non-outputting Less mixin definitions and called Less mixins.

Escaped selectors (e.g. `.u-size-11\/12\@sm`) are parsed as escaped twice (e.g. `.u-size-11\\/12\\@sm`). Your RegExp should account for that.

This rule supports 2 message arguments: the selector and the configured pattern.

## Options

### `string`

Specify a regex string not surrounded with `"/"`.

The selector value _after `.`_ will be checked. No need to include `.` in your pattern.

Given:

```json
{
  "selector-class-pattern": "foo-[a-z]+"
}
```

The following patterns are considered problems:

```css
.foop {}
```

```css
.foo-BAR {}
```

```css
div > #zing + .foo-BAR {}
```

The following patterns are _not_ considered problems:

```css
.foo-bar {}
```

```css
div > #zing + .foo-bar {}
```

```css
#foop {}
```

```css
[foo='bar'] {}
```
