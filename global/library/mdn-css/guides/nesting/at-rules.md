---
title: "CSS nesting at-rules"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/nesting/at-rules/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS nesting at-rules

Any at-rule whose body contains style rules can be nested inside another style rule using CSS nesting. Style rules nested inside at-rules take their nesting selector definition from the nearest ancestor style rule. Properties can be directly included inside a nested at-rule, acting as if they were nested in a `& {...}` block.

## at-rules that can be nested

- `@media`
- `@supports`
- `@layer`
- `@scope`
- `@container`
- `@starting-style`

## Examples

### Nesting `@media` at-rule

In this example we see three blocks of CSS. The first one shows how to write typical at-rule nesting, the second is an expanded way of writing the nesting as the browser parses it, and the third one shows the non-nested equivalent.

#### Nested CSS

```css
.foo {
  display: grid;
  @media (orientation: landscape) {
    grid-auto-flow: column;
  }
}
```

#### Expanded nested CSS

```css
.foo {
  display: grid;
  @media (orientation: landscape) {
    & {
      grid-auto-flow: column;
    }
  }
}
```

#### Non-nested equivalent

```css
.foo {
  display: grid;
}

@media (orientation: landscape) {
  .foo {
    grid-auto-flow: column;
  }
}
```

### Multiple nested `@media` at-rules

At-rules can be nested within other at-rules. Below you can see an example of this, and how it would be written without nesting.

#### Nested at-rules

```css
.foo {
  display: grid;
  @media (orientation: landscape) {
    grid-auto-flow: column;
    @media (width >= 1024px) {
      max-inline-size: 1024px;
    }
  }
}
```

#### Non-nested equivalent

```css
.foo {
  display: grid;
}
@media (orientation: landscape) {
  .foo {
    grid-auto-flow: column;
  }
}
@media (orientation: landscape) and (width >= 1024px) {
  .foo {
    max-inline-size: 1024px;
  }
}
```

### Nesting Cascade Layers (`@layer`)

Cascade Layers can be nested to create child-layers. These are joined with a `.` (dot).

#### Defining the parent & child layers

We start by defining the named cascade layers, prior to using them, without any style assignments.

```css
@layer base {
  @layer support;
}
```

#### Assigning rules to layers with nesting

Here the `.foo` selector assigns its rules to the **base** `@layer`. The nested **support** `@layer` creates the `base.support` sub-layer, and the `&` nesting selector is used to create the rules for the `.foo .bar` selector.

```css
.foo {
  @layer base {
    block-size: 100%;
    @layer support {
      & .bar {
        min-block-size: 100%;
      }
    }
  }
}
```

#### Equivalent without nesting

```css
@layer base {
  .foo {
    block-size: 100%;
  }
}
@layer base.support {
  .foo .bar {
    min-block-size: 100%;
  }
}
```

## See also

- CSS Nesting module
- `&` nesting selector
- Using CSS nesting
- Nesting and specificity
- Nesting container queries
