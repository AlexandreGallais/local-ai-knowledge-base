---
title: "OpenType font features (part 4 of 4)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/fonts/opentype_fonts/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OpenType font features (part 4 of 4)

## Font feature settings

`font-feature-settings` is the 'low-level syntax' that allows explicit access to every named available OpenType feature. This gives a lot of control but has some disadvantages in how it impacts inheritance and — as mentioned above — if you wish to change one setting, you have to redeclare the entire string (unless you're using CSS custom properties to set the values). Because of this, it's best to use the standard properties shown above wherever possible.

There are a huge number of possible features. You can see examples of a number of them above, and there are several resources available for finding more of them.

The general syntax looks like this:

```css
.small-caps {
  font-feature-settings: "smcp", "c2sc";
}
```

According to the specification you can either supply just the 4-character feature code or supply a 1 following the code (for enabling that feature) or a 0 (zero) to disable it. This is helpful if you have a feature like ligatures enabled by default but you would like to turn them off like so:

```css
.no-ligatures {
  font-feature-settings:
    "liga" 0,
    "dlig" 0;
}
```

### More on font-feature-settings codes

- 'The Complete CSS Demo for OpenType Features' (can't vouch for the truth of the name, but it's pretty big)
- A list of OpenType features on Wikipedia

## Using CSS feature detection for implementation

Since not all properties are evenly implemented, it's good practice to set up your CSS using feature detection to utilize the correct properties, with `font-feature-settings` as the fallback.

For example, small caps can be set several ways, but if you want to ensure that no matter what the underlying capitalization is that you end up with everything in small caps, it requires 2 settings with `font-feature-settings` versus a single property value using `font-variant-caps`.

```css
.small-caps {
  font-feature-settings: "smcp", "c2sc";
}

@supports (font-variant-caps: all-small-caps) {
  .small-caps {
    font-feature-settings: normal;
    font-variant-caps: all-small-caps;
  }
}
```

## See also

### Demos of CSS OpenType features in CSS

- The Complete CSS Demo for OpenType Features

### Web font analysis tools

- Wakamai Fondue
- Axis Praxis

### W3C Specifications

- Font Feature Properties in CSS Fonts Module Level 3
- font-variant-alternatives in CSS Fonts Module Level 4

### Other resources

- Using OpenType features by Tim Brown, Head of Typography, Adobe
- Adobe's Syntax for OpenType features in CSS
