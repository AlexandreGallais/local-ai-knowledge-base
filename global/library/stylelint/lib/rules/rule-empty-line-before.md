---
title: "rule-empty-line-before"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/rule-empty-line-before/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# rule-empty-line-before

Require or disallow an empty line before rules.

```css
a {}
      /* ← */
b {}  /* ↑ */
/**      ↑
 * This line */
```

Use this rule to enforce a convention. For example, require an empty line before each multi-line rule for readability.

This rule ignores rules that are the very first node in a source.

The `fix` option can automatically fix all of the problems reported by this rule.

This rule doesn't have any message arguments.

## Options

### `"always"`

There _must always_ be an empty line before rules.

```json
{
  "rule-empty-line-before": "always"
}
```

The following patterns are considered problems:

```css
a {} b {}
```

```css
a {}
b {}
```

The following patterns are _not_ considered problems:

```css
a {}

b {}
```

### `"never"`

There _must never_ be an empty line before rules.

```json
{
  "rule-empty-line-before": "never"
}
```

The following patterns are considered problems:

```css
a {}

b {}
```

The following patterns are _not_ considered problems:

```css
a {} b {}
```

```css
a {}
b {}
```

### `"always-multi-line"`

There _must always_ be an empty line before multi-line rules.

```json
{
  "rule-empty-line-before": "always-multi-line"
}
```

The following patterns are considered problems:

```css
a {
  color: red;
}
b {
  color: blue;
}
```

The following patterns are _not_ considered problems:

```css
a {
  color: red;
}

b {
  color: blue;
}
```

### `"never-multi-line"`

There _must never_ be an empty line before multi-line rules.

```json
{
  "rule-empty-line-before": "never-multi-line"
}
```

The following patterns are considered problems:

```css
a {
  color: red;
}

b {
  color: blue;
}
```

The following patterns are _not_ considered problems:

```css
a {
  color: red;
}
b {
  color: blue;
}
```

## Optional secondary options

### `except`

```json
{ "except": ["array", "of", "options"] }
```

#### `"after-rule"`

Reverse the primary option for rules that follow another rule.

Given:

```json
{
  "rule-empty-line-before": ["always", { "except": ["after-rule"] }]
}
```

The following patterns are considered problems:

```css
a {}

b {}
```

The following patterns are _not_ considered problems:

```css
a {}
b {}
```

#### `"after-single-line-comment"`

Reverse the primary option for rules that follow a single-line comment.

Given:

```json
{
  "rule-empty-line-before": [
    "always",
    { "except": ["after-single-line-comment"] }
  ]
}
```

The following patterns are considered problems:

```css
/* comment */

a {}
```

The following patterns are _not_ considered problems:

```css
/* comment */
a {}
```

#### `"inside-block-and-after-rule"`

Reverse the primary option for rules that are inside a block and follow another rule.

Given:

```json
{
  "rule-empty-line-before": [
    "always",
    { "except": ["inside-block-and-after-rule"] }
  ]
}
```

The following patterns are considered problems:

```css
@media {

  a {}

  b {}
}
```

The following patterns are _not_ considered problems:

```css
@media {

  a {}
  b {}
}
```

#### `"inside-block"`

Reverse the primary option for rules that are inside a block.

Given:

```json
{
  "rule-empty-line-before": ["always", { "except": ["inside-block"] }]
}
```

The following patterns are considered problems:

```css
a {
  color: red;

  & b {
    color: blue;
  }
}

```

The following patterns are _not_ considered problems:

```css
a {
  color: red;
  & b {
    color: blue;
  }
}
```

#### `"first-nested"`

Reverse the primary option for rules that are nested and the first child of their parent node.

Given:

```json
{
  "rule-empty-line-before": ["always", { "except": ["first-nested"] }]
}
```

The following patterns are considered problems:

```css
@media {

  a {}

  b {}
}
```

The following patterns are _not_ considered problems:

```css
@media {
  a {}

  b {}
}
```

### `ignore`

```json
{ "ignore": ["array", "of", "options"] }
```

#### `"after-comment"`

Ignore rules that follow a comment.

Given:

```json
{
  "rule-empty-line-before": ["always", { "ignore": ["after-comment"] }]
}
```

The following patterns are _not_ considered problems:

```css
/* comment */
a {}
```

#### `"first-nested"`

Ignore rules that are nested and the first child of their parent node.

Given:

```json
{
  "rule-empty-line-before": ["always", { "ignore": ["first-nested"] }]
}
```

The following patterns are _not_ considered problems:

```css
@media {
  a {}

  b {}
}
```

#### `"inside-block"`

Ignore rules that are inside a block.

Given:

```json
{
  "rule-empty-line-before": ["always", { "ignore": ["inside-block"] }]
}
```

The following patterns are _not_ considered problems:

```css
@media {
  a {}
}
```

```css
@media {
  a {}
  b {}
}
```
