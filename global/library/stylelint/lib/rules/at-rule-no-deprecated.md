---
title: "at-rule-no-deprecated"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/at-rule-no-deprecated/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# at-rule-no-deprecated

Disallow deprecated at-rules.

```css
    @viewport {}
/** ↑
 * At-rules like this */
```

This rule flags at-rules that were removed or deprecated after being in the CSS specifications, including editor drafts, and were subsequently either:

- shipped in a stable version of a browser
- shipped by a developer channel/edition browser
- shipped but behind experimental flags
- polyfilled with some adoption before any browser actually shipped
- had an MDN page at one point in time

The `fix` option can automatically fix some of the problems reported by this rule.

This rule supports 1 message argument: the deprecated at-rule.

Prior art:

- @csstools/stylelint-no-at-nest-rule
- @isnotdefined/no-obsolete

## Options

### `true`

```json
{
  "at-rule-no-deprecated": true
}
```

The following patterns are considered problems:

```css
@viewport {}
```

```css
a { @apply foo; }
```

The following patterns are _not_ considered problems:

```css
@starting-style {}
```

```css
a { @layer {} }
```

## Optional secondary options

### `ignoreAtRules`

```json
{ "ignoreAtRules": ["array", "of", "at-rules", "/regex/"] }
```

Given:

```json
{
  "at-rule-no-deprecated": [true, { "ignoreAtRules": ["/^view/", "apply"] }]
}
```

The following patterns are _not_ considered problems:

```css
@viewport {}
```

```css
a { @apply foo; }
```
