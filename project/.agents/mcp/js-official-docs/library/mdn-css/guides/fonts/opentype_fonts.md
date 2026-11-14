---
title: "OpenType font features (part 1 of 4)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/fonts/opentype_fonts/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OpenType font features

Font features or variants refer to different glyphs or character styles contained within an OpenType font. These include things like ligatures (special glyphs that combine characters like 'fi' or 'ffl'), kerning (adjustments to the spacing between specific letterform pairings), fractions, numeral styles, and several others. These are all referred to as OpenType Features, and are made available to use on the web via specific properties and low-level control properties — `font-feature-settings`. This article provides you with all you need to know about using OpenType font features in CSS.

Some fonts will have one or more of these features enabled by default (kerning and default ligatures are common examples), while others are left to the designer or developer to choose to enable in specific scenarios.

In addition to broad feature sets like ligatures or lining figures (numerals that line up evenly as opposed to 'oldstyle', which look more like lower-case letters), there are also very specific ones such as stylistic sets (which might include several specific variants of glyphs meant to be used together), alternates (which might be one or more variants of the letter 'a'), or even language-specific alterations for East Asian languages. In the latter case, these alterations are actually necessary to properly express the language, so they go beyond the more stylistic preference of most other OpenType features.

> **Warning:**
> There are many CSS attributes defined to leverage font features, but unfortunately many are not fully implemented. They are all defined and shown here, but many will only work using the lower-level `font-feature-settings` property. It's possible to write CSS to work both ways but this can become cumbersome. The issue with using `font-feature-settings` for everything is that every time you want to change one of the individual features, you have to redefine the entire string (similar to manipulating variable fonts with `font-variation-settings`).

## Discovering availability of features in fonts

This is sometimes the trickiest thing to work out if you don't have any documentation that came with the fonts (many type designers and foundries will provide sample pages and CSS just for this very reason). But there are some sites that make it easier to figure out. You can visit wakamaifondue.com, drop your font file on the circle where instructed, and in a few moments you'll have a full report on all the capabilities and features of your font. Axis-praxis.org also offers a similar capability, with the ability to click on the features to turn them on or off in a given text block.

## Why you would use them?

Given that these features take a bit of work to discover and use, it may seem a fair question to ask why one would bother to use them. The answer lies in the specific features that will make a site more useful, readable, and polished:

- **Ligatures** like 'ff' or 'fi' make letter spacing and reading more even and smooth.
- **Fractions** can make home improvement and recipe sites much easier to read and understand.
- **Numerals** within paragraphs of text set as 'oldstyle' sit more comfortably between lower-case letters, and likewise setting them as 'tabular numbers' will make them line up better when setting a list of costs in a table say. 'lining' figures on the other hand sit more uniformly on their own or in front of capitalized words.

While none of these features individually will render a site useless due to their absence, each of them in turn can make a site easier to use and more memorable for its attention to detail.

> OpenType features are like secret <example-value> in fonts. Unlock them and you'll find ways to make fonts look and behave differently in subtle and dramatic ways. Not all OpenType features are appropriate to use all of the time, but some features are critical for great typography. _-- Tim Brown, Head of Typography at Adobe_.

### Sometimes it's substance, not just style

There are some cases — like with `font-variant-east-asian` — that OpenType features are directly tied to using different forms of certain glyphs, which can impact meaning and readability. In cases such as these, it's more than just a nicety, but rather an integral part of the content itself.
