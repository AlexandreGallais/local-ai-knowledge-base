---
title: "declaration-property-value-keyword-no-deprecated"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/declaration-property-value-keyword-no-deprecated/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# declaration-property-value-keyword-no-deprecated

Disallow deprecated keywords for properties within declarations.

```css
  a { color: ThreeDDarkShadow; }
/**     ↑         ↑
 * property and value pairs like these */
```

Use this rule to avoid keywords that browsers may remove at any time, e.g. the deprecated system colors. Some already have, and a removed keyword invalidates the whole declaration.

This rule reports keywords that were removed or deprecated after being in the CSS specifications, including editor drafts, and were subsequently either:

- shipped in a stable version of a browser
- shipped by a developer channel/edition browser
- shipped but behind experimental flags
- polyfilled with some adoption before any browser actually shipped
- had an MDN page at one point in time

The `fix` option can automatically fix some of the problems reported by this rule.

This rule supports 2 message arguments: the property name and the deprecated keyword.

Prior art:

- @isnotdefined/no-obsolete

## Options

### `true`

```json
{
  "declaration-property-value-keyword-no-deprecated": true
}
```

The following patterns are considered problems:

```css
a { overflow: overlay; }
```

```css
a { text-justify: distribute; }
```

The following patterns are _not_ considered problems:

```css
a { overflow: auto; }
```

```css
a { text-justify: inter-character; }
```

## Optional secondary options

### `ignoreKeywords`

```json
{ "ignoreKeywords": ["array", "of", "keywords", "/regex/"] }
```

Given:

```json
{
  "declaration-property-value-keyword-no-deprecated": [
    true,
    { "ignoreKeywords": ["ActiveBorder", "/caption/i"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
a {
  color: ActiveBorder;
}
```

```css
a {
  color: InactiveCaptionText;
}
```
