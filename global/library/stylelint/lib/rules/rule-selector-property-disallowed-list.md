---
title: "rule-selector-property-disallowed-list"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/rule-selector-property-disallowed-list/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# rule-selector-property-disallowed-list

Specify a list of disallowed properties for selectors within rules.

```css
    a { color: red; }
/** ↑   ↑
 * Selector and property name */
```

This rule supports 2 message arguments: the selector and the disallowed property.

## Options

### `Object<string, Array<string>>`

```json
{ "selector": ["array", "of", "properties", "/regex/"] }
```

You can specify a regex for a selector, such as `{ "/foo-/": [] }`.

Given:

```json
{
  "rule-selector-property-disallowed-list": {
    "a": ["color", "/margin/"],
    "/foo/": ["/size/"]
  }
}
```

The following patterns are considered problems:

```css
a { color: red; }
```

```css
a { margin-top: 0px; }
```

```css
html[data-foo] { font-size: 1px; }
```

The following patterns are _not_ considered problems:

```css
a { background: red; }
```

```css
a { padding-top: 0px; }
```

```css
html[data-foo] { color: red; }
```

## Optional secondary options

### `ignore`

```json
{ "ignore": ["array", "of", "options"] }
```

#### `"keyframe-selectors"`

Ignore keyframe selectors.

Given:

```json
{
  "rule-selector-property-disallowed-list": [
    { "/^[a-z]+$/": ["opacity"] },
    { "ignore": ["keyframe-selectors"] }
  ]
}
```

The following pattern is _not_ considered a problem:

```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```
