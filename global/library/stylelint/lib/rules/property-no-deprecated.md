---
title: "property-no-deprecated"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/property-no-deprecated/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# property-no-deprecated

Disallow deprecated properties.

```css
  a { word-wrap: break-word; }
/**      ↑
 * Deprecated property */
```

This rule flags properties that were removed or deprecated after being in the CSS specifications, including editor drafts, and were either:

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
