---
title: "string-no-newline"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/string-no-newline/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
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
