---
title: "max-nesting-depth"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/max-nesting-depth/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# max-nesting-depth

Limit the depth of nesting.

```css
a { & > b { top: 0; } }
/** ↑
 * This nesting */
```

This rule works by checking rules' and at-rules' actual "nesting depth" against your specified max. Here's how nesting depths works:

```css
a {
  & b { /* nesting depth 1 */
    & .foo { /* nesting depth 2 */
      @media print { /* nesting depth 3 */
        & .baz { /* nesting depth 4 */
          color: pink;
        }
      }
    }
  }
}
```

> **Note:**
> root-level at-rules will **not be included** in the nesting depth calculation, because most users would take for granted that root-level at-rules are "free" (because necessary). So both of the following `.foo` rules have a nesting depth of 2, and will therefore pass if your `max` is less than or equal to 2:

```css
a {
  b { /* 1 */
    .foo {} /* 2 */
  }
}

@media print { /* ignored */
  a {
    b { /* 1 */
      .foo {} /* 2 */
    }
  }
}
```

This rule integrates into Stylelint's core the functionality of the (now deprecated) plugin `stylelint-statement-max-nesting-depth`.

This rule supports 1 message argument: the configured maximum depth.

## Options

### `number`

Specify a maximum nesting depth allowed.

Given:

```json
{
  "max-nesting-depth": 2
}
```

The following patterns are considered problems:

```css
a {
  & .foo { /* 1 */
    &__foo { /* 2 */
      & > .bar {} /* 3 */
    }
  }
}
```

```css
a {
  @media print { /* 1 */
    & .foo { /* 2 */
      & .bar {} /* 3 */
    }
  }
}
```

The following patterns are _not_ considered problems:

```css
a {
  & .foo { /* 1 */
    &__foo {} /* 2 */
  }
}

a .foo__foo .bar .baz {}
```

```css
@media print {
  a {
    & .foo { /* 1 */
      &__foo {} /* 2 */
    }
  }
}
```

## Optional secondary options

### `ignore`

```json
{ "ignore": ["array", "of", "options"] }
```

#### `"blockless-at-rules"`

Ignore at-rules that only wrap other rules, and do not themselves have declaration blocks.

Given:

```json
{
  "max-nesting-depth": [1, { "ignore": ["blockless-at-rules"] }]
}
```

The following patterns are considered problems:

As the at-rules have a declarations blocks.

```css
a {
  &:hover { /* 1 */
    @media (min-width: 500px) { color: pink; } /* 2 */
  }
}
```

```css
a {
  @nest > b { /* 1 */
    .foo { color: pink; } /* 2 */
  }
}
```

The following patterns are _not_ considered problems:

As all of the following `.foo` rules would have a nesting depth of just 1.

```css
a {
  .foo { color: pink; } /* 1 */
}
```

```css
@media print { /* ignored regardless of options */
  a {
    .foo { color: pink; } /* 1 */
  }
}
```

```css
a {
  @media print { /* ignored because it's an at-rule without a declaration block of its own */
    .foo { color: pink; } /* 1 */
  }
}
```

#### `"pseudo-classes"`

Ignore rules where the first selector in each selector list item is a pseudo-class

Given:

```json
{
  "max-nesting-depth": [1, { "ignore": ["pseudo-classes"] }]
}
```

The following patterns are considered problems:

```css
a {
  b { /* 1 */
    .c { /* 2 */
      top: 0;
    }
  }
}
```

```css
a {
  &:hover { /* ignored */
    b { /* 1 */
      .c { /* 2 */
        top: 0;
      }
    }
  }
}
```

```css
a {
  b { /* 1 */
    &::selection { /* 2 */
      color: #64FFDA;
    }
  }
}
```

```css
a {
  b { /* 1 */
    &:hover, .c { /* 2 */
      top: 0;
    }
  }
}
```

The following patterns are _not_ considered problems:

As all of the following pseudo-classes rules would have a nesting depth of just 1.

```css
a {
  b { /* 1 */
    &:hover { /* ignored */
      top: 0;
    }
  }
}
```

```css
a {
  b { /* 1 */
    &:nest {
      &:nest-lvl2 {  /* ignored */
        top: 0;
      }
    }
  }
}
```

```css
a {
  &:hover {  /* ignored */
    b { /* 1 */
      top: 0;
    }
  }
}
```

```css
a {
  &:nest {  /* ignored */
    &:nest-lvl2 {  /* ignored */
      top: 0;
      b { /* 1 */
        bottom: 0;
      }
    }
  }
}
```

```css
a {
  b { /* 1 */
    &:hover, &:focus {  /* ignored */
      top: 0;
    }
  }
}
```

### `ignoreAtRules`

```json
{ "ignoreAtRules": ["array", "of", "at-rules", "/regex/"] }
```

Ignore the specified at-rules.

Given:

```json
{
  "max-nesting-depth": [1, { "ignoreAtRules": ["/^--my-/", "media"] }]
}
```

The following patterns are _not_ considered problems:

```css
a {
  @media print {      /* 1 */
    b {               /* 2 */
      c { top: 0; }   /* 3 */
    }
  }
}
```

```css
a {
  b {                 /* 1 */
    @media print {    /* 2 */
      c { top: 0; }   /* 3 */
    }
  }
}
```

```css
a {
  @--my-at-rule print {  /* 1 */
    b {                /* 2 */
      c { top: 0; }    /* 3 */
    }
  }
}
```

```css
a {
  @--my-other-at-rule print {  /* 1 */
    b {                      /* 2 */
      c { top: 0; }          /* 3 */
    }
  }
}
```

The following patterns are considered problems:

```css
a {
  @import print {       /* 1 */
    b { top: 0; }       /* 2 */
  }
}
```

```css
a {
  @--not-my-at-rule print {   /* 1 */
    b { top: 0; }       /* 2 */
  }
}
```

### `ignorePseudoClasses`

```json
{ "ignorePseudoClasses": ["array", "of", "pseudo-classes", "/regex/"] }
```

Ignore the specified pseudo-classes.

Given:

```json
{
  "max-nesting-depth": [1, { "ignorePseudoClasses": ["hover", "^focus-"] }]
}
```

The following patterns are _not_ considered problems:

```css
a {
  &:hover {   /* ignored */
    b {      /* 1 */
      top: 0;
    }
  }
}
```

```css
a {
  &:hover, &:active { /* ignored */
    b {              /* 1 */
      top: 0;
    }
  }
}
```

The following patterns are considered problems:

```css
a {
  &:visited { /* 1 */
    b {      /* 2 */
      top: 0;
    }
  }
}
```

```css
a {
  &:hover, &:visited { /* 1 */
    b {               /* 2 */
      top: 0;
    }
  }
}
```

### `ignoreRules`

```json
{ "ignoreRules": ["array", "of", "selectors", "/regex/"] }
```

Ignore rules matching with the specified selectors.

Given:

```json
{
  "max-nesting-depth": [
    1,
    { "ignoreRules": [".my-selector", "/^.ignored-sel/"] }
  ]
}
```

The following patterns are _not_ considered problems:

```css
a {
  .my-selector {   /* ignored */
    b {      /* 1 */
      top: 0;
    }
  }
}
```

```css
a {
  .my-selector, .ignored-selector { /* ignored */
    b {              /* 1 */
      top: 0;
    }
  }
}
```

The following patterns are considered problems:

```css
a {
  .not-ignored-selector { /* 1 */
    b {      /* 2 */
      top: 0;
    }
  }
}
```

```css
a {
  .my-selector, .not-ignored-selector { /* 1 */
    b {               /* 2 */
      top: 0;
    }
  }
}
```
