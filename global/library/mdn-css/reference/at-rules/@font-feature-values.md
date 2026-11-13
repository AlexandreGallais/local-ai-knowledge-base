---
title: "`@font-feature-values` CSS at-rule"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@font-feature-values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `@font-feature-values` CSS at-rule

The **`@font-feature-values`** CSS at-rule lets you use a common name in the `font-variant-alternates` property for features activated differently in OpenType. This can help simplify your CSS when using multiple fonts.

The `@font-feature-values` at-rule may be used either at the top level of your CSS or inside any CSS conditional-group at-rule.

## Syntax

```css
@font-feature-values Font Name {
  font-display: swap;
  @styleset {
    nice-style: 12;
  }
  @swash {
    fancy: 2;
  }
}
```

Each `@font-feature-values` block can contain a list of feature value blocks (listed below), as well as the `font-display` descriptor.

### Feature value blocks

- `@swash`
    Specifies a feature name that will work with the `swash()` functional notation of `font-variant-alternates`. A swash feature value definition allows only one value: `ident1: 2` is valid, but `ident2: 2 4` isn't.
- `@annotation`
    Specifies a feature name that will work with the `annotation()` functional notation of `font-variant-alternates`. An annotation feature value definition allows only one value: `ident1: 2` is valid, but `ident2: 2 4` isn't.
- `@ornaments`
    Specifies a feature name that will work with the `ornaments()` functional notation of `font-variant-alternates`. An ornaments feature value definition allows only one value: `ident1: 2` is valid, but `ident2: 2 4` isn't.
- `@stylistic`
    Specifies a feature name that will work with the `stylistic()` functional notation of `font-variant-alternates`. A stylistic feature value definition allows only one value: `ident1: 2` is valid, but `ident2: 2 4` isn't.
- `@styleset`
    Specifies a feature name that will work with the `styleset()` functional notation of `font-variant-alternates`. A styleset feature value definition allows an unlimited number of values: `ident1: 2 4 12 1` maps to the OpenType values `ss02`, `ss04`, `ss12`, and `ss01`. Note that values higher than `99` are valid, but don't map to any OpenType values and are ignored.
- `@character-variant`
    Specifies a feature name that will work with the `character-variant()` functional notation of `font-variant-alternates`. A character-variant feature value definition allows either one or two values: `ident1: 3` maps to `cv03=1`, and `ident2: 2 4` maps to `cv02=4`, but `ident2: 2 4 5` is invalid.

## Examples

### Using @styleset in a @font-feature-values rule

```css
/* At-rule for "nice-style" in Font One */
@font-feature-values Font One {
  @styleset {
    nice-style: 12;
  }
}

/* At-rule for "nice-style" in Font Two */
@font-feature-values Font Two {
  @styleset {
    nice-style: 4;
  }
}

/* Apply the at-rules with a single declaration */
.nice-look {
  font-variant-alternates: styleset(nice-style);
}
```

## See also

- The `font-variant-alternates` property that uses values that this at-rule defines.
