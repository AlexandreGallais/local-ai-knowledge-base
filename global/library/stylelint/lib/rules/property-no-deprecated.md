---
title: "property-no-deprecated"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/property-no-deprecated/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# property-no-deprecated

Disallow deprecated properties.

```css
  a { word-wrap: break-word; }
/**      ↑
 * Deprecated property */
```

Use this rule to avoid properties that browsers may remove at any time. Some already have, and a removed property invalidates the whole declaration.

This rule reports properties that were removed or deprecated after being in the CSS specifications, including editor drafts, and were either:

- shipped in a stable version of a browser
- shipped by a developer channel/edition browser
- shipped but behind experimental flags
- polyfilled with some adoption before any browser actually shipped
- had an MDN page at one point in time

The `fix` option can automatically fix some of the problems reported by this rule.

This rule supports up to 2 message arguments: the deprecated property, or the property and its replacement.

Prior art:

- @isnotdefined/no-obsolete

## Options

### `true`

```json
{
  "property-no-deprecated": true
}
```

The following patterns are considered problems:

```css
a { clip: rect(0, 0, 0, 0); }
```

```css
a { word-wrap: break-word; }
```

The following patterns are _not_ considered problems:

```css
a { clip-path: rect(0 0 0 0); }
```

```css
a { overflow-wrap: break-word; }
```

## Optional secondary options

### `ignoreProperties`

```json
{ "ignoreProperties": ["array", "of", "properties", "/regex/"] }
```

Given:

```json
{
  "property-no-deprecated": [true, { "ignoreProperties": ["clip", "/^grid-/"] }]
}
```

The following patterns are _not_ considered problems:

```css
a { clip: rect(0, 0, 0, 0); }
```

```css
a { grid-row-gap: 4px; }
```
