---
title: "selector-max-attribute"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/selector-max-attribute/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# selector-max-attribute

Limit the number of attribute selectors in a selector.

```css
    [rel="external"] {}
/** ↑
 * This type of selector */
```

Each selector in a selector list is evaluated separately.

> **Note:**
> In versions prior to `17.0.0`, this rule would evaluate functional pseudo-classes separately, such as `:not()` and `:is()`, and resolve nested selectors (in a nonstandard way) before counting.

This rule supports 2 message arguments: the selector and the configured maximum.

## Options

### `number`

Specify a maximum attribute selectors allowed.

Given:

```json
{
  "selector-max-attribute": 2
}
```

The following patterns are considered problems:

```css
[type="number"][name="quality"][data-attribute="value"] {}
```

```css
[type="number"][name="quality"][disabled] {}
```

The following patterns are _not_ considered problems:

```css
[type="text"] {}
```

```css
[type="text"][name="message"] {}
```

```css
[type="text"][disabled] {}
```

```css
[type="text"][name="message"] {
  & [disabled] {}
}
```

## Optional secondary options

### `ignoreAttributes`

```json
{ "ignoreAttributes": ["array", "of", "attributes", "/regex/"] }
```

Given:

```json
{
  "selector-max-attribute": [0, { "ignoreAttributes": ["/^data-my-/", "dir"] }]
}
```

The following patterns are _not_ considered problems:

```css
[dir] [data-my-attr] {}
```

```css
[dir] [data-my-other-attr] {}
```
