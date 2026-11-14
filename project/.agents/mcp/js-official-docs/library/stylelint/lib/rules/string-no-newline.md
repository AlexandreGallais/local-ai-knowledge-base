---
title: "string-no-newline"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/string-no-newline/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# string-no-newline

Disallow invalid newlines within strings.

```css
a {
  content: "foo
    bar"; }/*  ↑
 *             ↑
 * The newline here */
```

Use this rule to avoid declarations that browsers ignore. An unescaped newline in a string invalidates the whole declaration.

The spec says this: "A string cannot directly contain a newline. To include a newline in a string, use an escape representing the line feed character in ISO-10646 (U+000A), such as '\A' or '\00000a'." And also: "It is possible to break strings over several lines, for aesthetic or other reasons, but in such a case the newline itself has to be escaped with a backslash (\\)."

> **Note:**
> We recommend configuring this rule so that it doesn't overlap with:
>
> - `at-rule-descriptor-value-no-unknown`
> - `at-rule-prelude-no-invalid`
> - `declaration-property-value-no-unknown`
> - `media-query-no-invalid`

This rule doesn't have any message arguments.

## Options

### `true`

```json
{
  "string-no-newline": true
}
```

The following patterns are considered problems:

```css
a {
  content: "foo
    bar";
}
```

```css
[title="something
is probably wrong"] {}
```

```css
a {
  font-family: "Times
    New
    Roman";
}
```

The following patterns are _not_ considered problems:

```css
a {
  content: "foo\Abar";
}
```

```css
a {
  content: "foo\\nbar";
}
```

```css
[title="nothing\
  is wrong"] {}
```

```css
a {
  font-family: "Times New Roman";
}
```

## Optional secondary options

### `ignore`

```json
{ "ignore": ["array", "of", "options"] }
```

#### `"at-rule-preludes"`

Ignore strings in at-rule preludes.

```json
{
  "string-no-newline": [true, { "ignore": ["at-rule-preludes"] }]
}
```

The following patterns are _not_ considered problems:

```css
@import url('foo
.css');
```

#### `"declaration-values"`

Ignore strings in declaration values.

The following patterns are _not_ considered problems:

```css
a {
  content: "foo
    bar";
}
```
