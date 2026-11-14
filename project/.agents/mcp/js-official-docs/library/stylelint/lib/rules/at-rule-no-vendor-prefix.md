---
title: "at-rule-no-vendor-prefix"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/at-rule-no-vendor-prefix/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# at-rule-no-vendor-prefix

Disallow vendor prefixes for at-rules.

```css
    @-webkit-keyframes { 0% { top: 0; } }
/**   ↑
 * This prefix */
```

Use this rule to enforce a convention. For example, leave prefixing to a tool such as Autoprefixer, so that your styles only have the prefixes your browsers need.

This rule ignores non-standard vendor-prefixed at-rules that aren't handled by Autoprefixer.

The `fix` option can automatically fix all of the problems reported by this rule. However, it will not remove duplicate at-rules produced when the prefixes are removed. You can use Autoprefixer itself, with the `add` option off and the `remove` option on, in these situations.

This rule supports 1 message argument: the vendor-prefixed at-rule.

## Options

### `true`

```json
{
  "at-rule-no-vendor-prefix": true
}
```

The following patterns are considered problems:

```css
@-webkit-keyframes { 0% { top: 0; } }
```

```css
@-ms-viewport { orientation: landscape; }
```

The following patterns are _not_ considered problems:

```css
@keyframes { 0% { top: 0; } }
```

```css
@viewport { orientation: landscape; }
```

## Optional secondary options

### `ignoreAtRules`

```json
{ "ignoreAtRules": ["array", "of", "at", "rules", "/regex/"] }
```

Given:

```json
{
  "at-rule-no-vendor-prefix": [
    true,
    { "ignoreAtRules": ["-webkit-keyframes", "/-viewport/i"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
@-webkit-keyframes {}
```

```css
@-ms-viewport {}
```
