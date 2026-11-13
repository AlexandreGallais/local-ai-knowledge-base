---
title: "at-rule-empty-line-before"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/at-rule-empty-line-before/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# at-rule-empty-line-before

Require or disallow an empty line before at-rules.

```css
a {}
          /* ← */
@media {} /* ↑ */
/**          ↑
 *   This line */
```

This rule ignores:

- at-rules that are the very first node in the source
- the `@charset` rule
- `@import` in Less

The `fix` option can automatically fix all of the problems reported by this rule.

This rule doesn't have any message arguments.

## Options

### `"always"`

There _must always_ be an empty line before at-rules.

```json
{
  "at-rule-empty-line-before": "always"
}
```

The following patterns are considered problems:

```css
a {} @media {}
```

```css
a {}
@media {}
```

The following patterns are _not_ considered problems:

```css
a {}

@media {}
```

### `"never"`

There _must never_ be an empty line before at-rules.

```json
{
  "at-rule-empty-line-before": "never"
}
```

The following patterns are considered problems:

```css
a {}

@media {}
```

The following patterns are _not_ considered problems:

```css
a {} @media {}
```

```css
a {}
@media {}
```

## Optional secondary options

### `except`

```json
{ "except": ["array", "of", "options"] }
```

#### `"after-same-name"`

Reverse the primary option for at-rules that follow another at-rule with the same name.

This means that you can group your at-rules by name.

Given:

```json
{
  "at-rule-empty-line-before": ["always", { "except": ["after-same-name"] }]
}
```

The following patterns are _not_ considered problems:

```css
@import url(x.css);
@import url(y.css);

@media (min-width: 100px) {}
@media (min-width: 200px) {}
```

```css
a {

  @extends .foo;
  @extends .bar;

  @include x;
  @include y {}
}
```

#### `"inside-block"`

Reverse the primary option for at-rules that are inside a block.

Given:

```json
{
  "at-rule-empty-line-before": ["always", { "except": ["inside-block"] }]
}
```

The following patterns are considered problems:

```css
a {

  @extend foo;
  color: pink;
}

b {
  color: pink;

  @extend foo;
}
```

The following patterns are _not_ considered problems:

```css
a {
  @extend foo;
  color: pink;
}

b {
  color: pink;
  @extend foo;
}
```

#### `"blockless-after-same-name-blockless"`

Reverse the primary option for blockless at-rules that follow another blockless at-rule with the same name.

This means that you can group your blockless at-rules by name.

Shared-line comments do not affect this option.

Given:

```json
{
  "at-rule-empty-line-before": [
    "always",
    { "except": ["blockless-after-same-name-blockless"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
@import url(x.css);
@import url(y.css);

@namespace svg url('http://www.w3.org/2000/svg');
```

```css
@import url(x.css); /* comment */
@import url(y.css);

@namespace svg url('http://www.w3.org/2000/svg');
```

```css
a {

  @extends .foo;
  @extends .bar;

  @include loop;
  @include doo;
}
```

#### `"blockless-after-blockless"`

Reverse the primary option for blockless at-rules that follow another blockless at-rule.

Shared-line comments do not affect this option.

Given:

```json
{
  "at-rule-empty-line-before": [
    "always",
    { "except": ["blockless-after-blockless"] }
  ]
}
```

The following patterns are considered problems:

```css
@import url(x.css);

@import url(y.css);

@media print {}
```

The following patterns are _not_ considered problems:

```css
@import url(x.css);
@import url(y.css);

@media print {}
```

```css
@import url(x.css); /* comment */
@import url(y.css);

@media print {}
```

#### `"first-nested"`

Reverse the primary option for at-rules that are nested and the first child of their parent node.

Given:

```json
{
  "at-rule-empty-line-before": ["always", { "except": ["first-nested"] }]
}
```

The following patterns are considered problems:

```css
a {

  @extend foo;
  color: pink;
}

b {
  color: pink;
  @extend foo;
}
```

The following patterns are _not_ considered problems:

```css
a {
  @extend foo;
  color: pink;
}

b {
  color: pink;

  @extend foo;
}
```

### `ignore`

```json
{ "ignore": ["array", "of", "options"] }
```

#### `"after-comment"`

Ignore at-rules that follow a comment.

Shared-line comments do not trigger this option.

Given:

```json
{
  "at-rule-empty-line-before": ["always", { "ignore": ["after-comment"] }]
}
```

The following patterns are _not_ considered problems:

```css
/* comment */
@media {}
```

```css
/* comment */

@media {}
```

```css
@media {} /* comment */

@media {}
```

#### `"first-nested"`

Ignore at-rules that are nested and the first child of their parent node.

Given:

```json
{
  "at-rule-empty-line-before": ["always", { "ignore": ["first-nested"] }]
}
```

The following patterns are _not_ considered problems:

```css
@supports {
  @media {}

  @media {}
}
```

#### `"inside-block"`

Ignore at-rules that are inside a block.

Given:

```json
{
  "at-rule-empty-line-before": ["always", { "ignore": ["inside-block"] }]
}
```

The following patterns are _not_ considered problems:

```css
a {
  @extend foo;
  color: pink;
}

a {

  @extend foo;
  color: pink;
}

b {
  color: pink;
  @extend foo;
}

b {
  color: pink;

  @extend foo;
}
```

#### `"blockless-after-same-name-blockless"`

Ignore blockless at-rules that follow another blockless at-rule with the same name.

This means that you can group your blockless at-rules by name.

Given:

```json
{
  "at-rule-empty-line-before": [
    "always",
    { "ignore": ["blockless-after-same-name-blockless"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css

@import url(x.css);
@import url(y.css);

@namespace svg url('http://www.w3.org/2000/svg');
```

```css
a {

  @extends .foo;
  @extends .bar;

  @include loop;
  @include doo;
}
```

#### `"blockless-after-blockless"`

Ignore blockless at-rules that follow another blockless at-rule.

Given:

```json
{
  "at-rule-empty-line-before": [
    "always",
    { "ignore": ["blockless-after-blockless"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
@import url(x.css);

@import url(y.css);

@media print {}
```

```css
@import url(x.css);
@import url(y.css);

@media print {}
```

### `ignoreAtRules`

```json
{ "ignoreAtRules": ["array", "of", "at-rules", "/regex/"] }
```

Ignore specified at-rules.

Given:

```json
{
  "at-rule-empty-line-before": [
    "always",
    { "ignoreAtRules": ["namespace", "/^my-/"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
@import "foo.css";
@namespace svg url('http://www.w3.org/2000/svg');
```

```css
a {}
@my-at-rule {}
```
