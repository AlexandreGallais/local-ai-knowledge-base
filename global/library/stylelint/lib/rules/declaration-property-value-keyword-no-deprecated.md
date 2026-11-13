---
title: "declaration-property-value-keyword-no-deprecated"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/declaration-property-value-keyword-no-deprecated/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# declaration-property-value-keyword-no-deprecated

Disallow deprecated keywords for properties within declarations.

```css
  a { color: ThreeDDarkShadow; }
/**     ↑         ↑
 * property and value pairs like these */
```

This rule flags keywords that were removed or deprecated after being in the CSS specifications, including editor drafts, and were subsequently either:

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
