---
title: "selector-max-attribute"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/selector-max-attribute/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# selector-max-attribute

Limit the number of attribute selectors in a selector.

```css
    [rel="external"] {}
/** ↑
 * This type of selector */
```

Use this rule to enforce a convention. For example, limit selectors to `1` attribute, so that selectors stay readable.

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
