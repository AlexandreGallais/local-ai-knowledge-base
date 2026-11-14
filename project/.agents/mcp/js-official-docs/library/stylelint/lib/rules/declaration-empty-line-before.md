---
title: "declaration-empty-line-before"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/declaration-empty-line-before/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# declaration-empty-line-before

Require or disallow an empty line before declarations.

```css
a {
  --foo: pink;
             /* ← */
  top: 15px; /* ↑ */
}            /* ↑ */
/**             ↑
 *      This line */
```

Use this rule to enforce a convention. For example, require an empty line before the first declaration after custom properties, so that they stand apart.

This rule only checks standard property declarations. Use the `custom-property-empty-line-before` rule for custom property declarations.

The `fix` option can automatically fix all of the problems reported by this rule.

This rule doesn't have any message arguments.

## Options

### `"always"`

```json
{
  "declaration-empty-line-before": "always"
}
```

The following patterns are considered problems:

```css
a {
  --foo: pink;
  top: 5px;
}
```

```css
a {
  bottom: 15px;
  top: 5px;
}
```

The following patterns are _not_ considered problems:

```css
a {
  --foo: pink;

  top: 5px;
}
```

```css
a {

  bottom: 15px;

  top: 5px;
}
```

### `"never"`

```json
{
  "declaration-empty-line-before": "never"
}
```

The following patterns are considered problems:

```css
a {
  --foo: pink;

  bottom: 15px;
}
```

```css
a {

  bottom: 15px;

  top: 5px;
}
```

The following patterns are _not_ considered problems:

```css
a {
  --foo: pink;
  bottom: 15px;
}
```

```css
a {
  bottom: 15px;
  top: 5px;
}
```

## Optional secondary options

### `except`

```json
{ "except": ["array", "of", "options"] }
```

#### `"after-block"`

Reverse the primary option for declarations that follow a block.

Given:

```json
{
  "declaration-empty-line-before": ["never", { "except": ["after-block"] }]
}
```

The following patterns are _not_ considered problems:

```css
a {
  a {}
  
  color: red;
  top: 5px;
}
```

```css
a {
  @media all {}
  
  color: red;
  top: 5px;
}
```

#### `"after-comment"`

Reverse the primary option for declarations that follow a comment.

Shared-line comments do not trigger this option.

Given:

```json
{
  "declaration-empty-line-before": ["always", { "except": ["after-comment"] }]
}
```

The following patterns are considered problems:

```css
a {
  /* comment */

  top: 5px;
}
```

```css
a {
  bottom: 5px; /* comment */
  top: 5px;
}
```

The following patterns are _not_ considered problems:

```css
a {
  /* comment */
  top: 5px;
}

```

```css
a {
  bottom: 5px; /* comment */

  top: 5px;
}

```

#### `"after-declaration"`

Reverse the primary option for declarations that follow another declaration.

Shared-line comments do not affect this option.

Given:

```json
{
  "declaration-empty-line-before": [
    "always",
    { "except": ["after-declaration"] }
  ]
}
```

The following patterns are considered problems:

```css
a {

  bottom: 15px;

  top: 5px;
}
```

```css
a {

  bottom: 15px; /* comment */

  top: 5px;
}
```

The following patterns are _not_ considered problems:

```css
a {

  bottom: 15px;
  top: 5px;
}
```

```css
a {

  bottom: 15px; /* comment */
  top: 5px;
}
```

#### `"first-nested"`

Reverse the primary option for declarations that are nested and the first child of their parent node.

Given:

```json
{
  "declaration-empty-line-before": ["always", { "except": ["first-nested"] }]
}
```

The following patterns are considered problems:

```css
a {

  bottom: 15px;

  top: 5px;
}
```

The following patterns are _not_ considered problems:

```css
a {
  bottom: 15px;

  top: 5px;
}
```

### `ignore`

```json
{ "ignore": ["array", "of", "options"] }
```

#### `"after-comment"`

Ignore declarations that follow a comment.

Given:

```json
{
  "declaration-empty-line-before": ["always", { "ignore": ["after-comment"] }]
}
```

The following patterns are _not_ considered problems:

```css
a {
  /* comment */
  bottom: 15px;
}
```

#### `"after-declaration"`

Ignore declarations that follow another declaration.

Given:

```json
{
  "declaration-empty-line-before": [
    "always",
    { "ignore": ["after-declaration"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
a {

  bottom: 15px;
  top: 15px;
}
```

```css
a {

  bottom: 15px;

  top: 15px;
}
```

```css
a {

  color: orange;
  text-decoration: none;

  bottom: 15px;
  top: 15px;
}
```

#### `"first-nested"`

Ignore declarations that are nested and the first child of their parent node.

Given:

```json
{
  "declaration-empty-line-before": ["always", { "ignore": ["first-nested"] }]
}
```

The following patterns are _not_ considered problems:

```css
a {
  bottom: 15px;

  top: 5px;
}
```

#### `"inside-single-line-block"`

Ignore declarations that are inside single-line blocks.

Given:

```json
{
  "declaration-empty-line-before": [
    "always",
    { "ignore": ["inside-single-line-block"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
a { bottom: 15px; top: 5px; }
```
