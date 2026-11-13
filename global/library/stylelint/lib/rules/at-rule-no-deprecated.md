---
title: "at-rule-no-deprecated"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/at-rule-no-deprecated/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# at-rule-no-deprecated

Disallow deprecated at-rules.

```css
    @viewport {}
/** ↑
 * At-rules like this */
```

Use this rule to avoid at-rules that browsers may remove at any time, e.g. `@nest`. Some already have, and a removed at-rule is ignored along with everything inside.

This rule reports at-rules that were removed or deprecated after being in the CSS specifications, including editor drafts, and were subsequently either:

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
