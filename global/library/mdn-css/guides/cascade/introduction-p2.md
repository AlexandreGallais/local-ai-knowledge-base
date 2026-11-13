---
title: "Introduction to the CSS cascade (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/cascade/introduction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Introduction to the CSS cascade (part 2 of 2)

## Author styles: inline styles, layers, and precedence

The table in Cascading order provided a precedence order overview. The table summarized the user-agent, user, and author origin type styles in two lines each with "origin type - normal" and "origin type - !important". The precedence within each origin type is more nuanced. Styles can be contained within layers within their origin type, and, with author styles, there is also the issue of where inline styles land in the cascade order.

The order in which layers are declared is important in determining precedence. Normal styles in a layer take precedence over styles declared in prior layers; with normal styles declared outside of any layer taking precedence over normal layered styles regardless of specificity.

In this example, the author used CSS's `@import` rule to import five external stylesheets within a `<style>` information element.

```html
<style>
  @import "unlayeredStyles.css";
  @import "AStyles.css" layer(A);
  @import "moreUnlayeredStyles.css";
  @import "BStyles.css" layer(B);
  @import "CStyles.css" layer(C);
  p {
    color: red;
    padding: 1em !important;
  }
</style>
```

and then in the body of the document we have inline styles:

```html
<p style="line-height: 1.6em; text-decoration: overline !important;">Hello</p>
```

In the CSS code block above, three cascade layers named "A", "B", and "C", were created, in that order. Three stylesheets were imported directly into layers and two were imported without creating or being assigned to a layer.
The "All unlayered styles" in the list below (normal author style precedence - order 4) includes styles from these two stylesheets and the additional unlayered CSS style blocks. In addition, there are two inline styles, a normal `line-height` declaration and an important `text-decoration` declaration:

| Precedence Order (low to high) | Author style         | Importance   |
| ------------------------------ | -------------------- | ------------ |
| 1                              | A - first layer      | normal       |
| 2                              | B - second layer     | normal       |
| 3                              | C - last layer       | normal       |
| 4                              | All unlayered styles | normal       |
| 5                              | inline `style`       | normal       |
| 6                              | animations           |              |
| 7                              | All unlayered styles | `!important` |
| 8                              | C - last layer       | `!important` |
| 9                              | B - second layer     | `!important` |
| 10                             | A - first layer      | `!important` |
| 11                             | inline `style`       | `!important` |
| 12                             | transitions          |              |

In all origin types, normal styles contained in layers have the lowest precedence. In our example, the normal styles associated with the first declared layer (A) have lower precedence than normal styles in the second declared layer (B), which have lower precedence than normal styles in the third declared layer (C). These layered styles have lower precedence than all normal unlayered styles, which includes normal styles from `unlayeredStyles.css`, `moreUnlayeredStyles.css`, and the `color` of `p` in the `<style>` itself.

If any layered styles in A, B, or C have selectors with higher specificity matching an element, similar to `:root body p { color: black; }`, it doesn't matter. Those declarations are removed from consideration because of _origin_; normal layered styles have less precedence than normal unlayered styles. If, however, the more specific selector `:root body p { color: black; }` was found in `unlayeredStyles.css`, as both _origin and importance_ have the same precedence, _specificity_ would mean the more specific, black declaration would win.

The layer order of precedence is inverted for styles declared as `!important`. Important declarations found in a layer take precedence over important declarations found outside of a layer. Important declarations found in the first layer (A) take precedence over important declarations found in layer B, which take precedence over important declarations found in layer C, which take precedence over important declarations found outside of a layer.

### Inline styles

Only relevant to author styles are inline styles, declared with the `style` attribute. Normal inline styles take precedence over any other normal author styles, no matter the specificity of the selector. If `line-height: 2;` were declared in a `:root body p` selector block in any of the five imported stylesheets, the line height would still be `1.6`. Normal inline styles do not take precedence over animated or transitioned properties.

Important inline styles take precedence over all other author styles, regardless of whether they are important, inline, or layered. Important inline styles also take precedence over animated properties, but not transitioned properties. Three things can override an important inline style:

- An important user style.
- An important user agent style.
- A transitioned property.

### Importance and layers

The origin type precedence order is inverted for important styles. Important styles declared outside of any cascade layer have lower precedence than those declared as part of a layer. Important styles that come in early layers take precedence over important styles declared in subsequent cascade layers.

Take for example the following CSS:

```css
p {
  color: red;
}

@layer B {
  :root p {
    color: blue;
  }
}
```

Even though the red is declared first and has a less specific selector, because unlayered CSS takes precedence over layered CSS, the paragraph will be red. Had we included an inline style on the paragraph setting it to a different color, such as ``, the paragraph would be black.

When we add `!important` to this bit of CSS, the precedence order is reversed with the stylesheet:

```css
p {
  color: red !important;
}

@layer B {
  :root p {
    color: blue !important;
  }
}
```

Now the paragraph will be blue. The `!important` in the earliest declared layer takes precedence over subsequent layers and unlayered important declarations. If the inline style contained `!important`, such as ``, again the paragraph would be black. Inline importance does take precedence over all other author declared `!important` declarations, no matter the specificity.

> **Note:**
> The `!important` flag reverses the precedence of cascade layers. For this reason, try not to use `!important` to override external styles. Instead, use `@import` together with the `layer` keyword or `layer()` function to import external stylesheets (from frameworks, widget stylesheets, libraries, etc.) into layers. Importing stylesheets into a layer as the first declaration in your CSS demotes their precedence, and author-defined layers, defined later in your CSS, will have higher precedence. The `!important` flag should only be used sparingly, if ever, to guard required styles against later overrides, in the first declared layer.

Styles that are transitioning take precedence over all important styles, no matter who or how they are declared.

## Complete cascade order

Now that we have a better understanding of origin type and cascade layer precedence, we realize the table in Cascading order could have more accurately been represented by the following table:

   | Precedence Order (low to high) | Style Origin | Importance

   | 1 | user-agent - first declared layer | normal

   | user-agent - last declared layer

   | user-agent - unlayered styles

   | 2 | user - first declared layer | normal

   | user - last declared layer

   | user - unlayered styles

   | 3 | author - first declared layer | normal

   | author - last declared layer

   | author - unlayered styles

   | inline `style`

   | 4 | animations |

   | 5 | author - unlayered styles | `!important`

   | author - last declared layer

   | author - first declared layer

   | inline `style`

   | 6 | user - unlayered styles | <code>!important

   | user - last declared layer

   | user - first declared layer

   | 7 | user-agent - unlayered styles | `!important`

   | user-agent - last declared layer

   | user-agent - first declared layer

   | 8 | transitions |

## Which CSS entities participate in the cascade

Only CSS property/value pair declarations participate in the cascade. CSS at-rule descriptors don't participate in the cascade and HTML presentational attributes are not part of the cascade.

### At-rules

CSS at-rules containing entities other than declarations, such as a `@font-face` rule containing _descriptors_, don't participate in the cascade.

For the most part, the properties and descriptors defined in at-rules don't participate in the cascade. Only at-rules as a whole participate in the cascade. For example, within a `@font-face` rule, font names are identified by `font-family` descriptors. If several `@font-face` rules with the same descriptor are defined, only the most appropriate `@font-face`, as a whole, is considered. If more than one are identically appropriate, the entire `@font-face` declarations are compared using steps 1, 2, and 4 of the algorithm (there is no specificity when it comes to at-rules).

While the declarations contained in most at-rules — such as those in `@media`, `@document`, or `@supports` — participate in the cascade, the at-rule may make an entire selector not relevant, as we saw with the print style in the basic example.

Declarations in `@keyframes` don't participate in the cascade. As with `@font-face`, only the `@keyframes` as a whole is selected via the cascade algorithm. The precedence order of animation is described below.

When it comes to `@import`, the `@import` doesn't participate itself in the cascade, but all of the imported styles do participate. If the `@import` defines a named or anonymous layer, the contents of the imported stylesheet are placed into the specified layer. All other CSS imported with `@import` is treated as the last declared layer. This was discussed above.

Finally, `@charset` obeys specific algorithms and isn't affected by the cascade algorithm.

### Presentational attributes

Presentational attributes are attributes in the source document that can affect styling. For example, when included, the deprecated `align` attribute sets the alignment on several HTML elements and the `fill` attribute defines the color used to paint SVG shapes and text and defines the final state for SVG animations. While they are author styles, presentational attributes do not participate in the cascade.

If the HTML presentation attribute is supported by the user agent, valid presentational attributes included in HTML and SVG, such as the `align` or `fill` attributes, are translated to the corresponding CSS rules (all SVG presentation attributes are supported as CSS properties) and inserted in the author stylesheet prior to any other styles with a specificity equal to `0`.

Presentational attributes cannot be declared `!important`.

## CSS animations and the cascade

CSS animations, using `@keyframes` at-rules, define animations between states. `@keyframes` don't cascade, meaning that at any given time CSS takes values from only one single set of `@keyframes` and never mixes multiple ones. If multiple sets of `@keyframes` are defined with the same animation name, the last defined set in the origin and layer with the greatest precedence is used. Other `@keyframes` are ignored, even if they animate different properties.

```css
p {
  animation: infinite 5s alternate repeatedName;
}

@keyframes repeatedName {
  from {
    font-size: 1rem;
  }
  to {
    font-size: 3rem;
  }
}

@layer A {
  @keyframes repeatedName {
    from {
      background-color: yellow;
    }
    to {
      background-color: orange;
    }
  }
}

@layer B {
  @keyframes repeatedName {
    from {
      color: white;
    }
    to {
      color: black;
    }
  }
}
```

In this example, there are three separate animation declaration named `repeatedName`. When `animation: infinite 5s alternate repeatedName` is applied to the paragraph, only one animation is applied: the keyframe animation defined in the unlayered CSS takes precedence over the layered keyframe animation declarations based on origin and layer precedence order. In this example, only the element's font size will be animated.

> **Note:**
> There are no important animations, as property declarations in a `@keyframes` block that contain `!important` as part of the value are ignored.

## Resetting styles

After your content has finished altering styles, it may find itself in a situation where it needs to restore them to a known state. This may happen in cases of animations, theme changes, and so forth. The CSS property `all` lets you quickly set (almost) everything in CSS back to a known state.

`all` lets you opt to immediately restore all properties to any of their initial (default) state, the state inherited from the previous level of the cascade, a specific origin (the user-agent stylesheet, the author stylesheet, or the user stylesheet), or even to clear the values of the properties entirely.

## See also

- CSS cascading and inheritance module
- Learn: Handling conflicts
- Learn: Cascade layers
- CSS syntax
- Specificity
- Inheritance
- At-rules
- Values: initial, computed, used, and actual
