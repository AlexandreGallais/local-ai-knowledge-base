---
title: "Variable fonts (part 1 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/fonts/variable_fonts/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Variable fonts

**Variable fonts** are an evolution of the OpenType font specification that enables many different variations of a typeface to be incorporated into a single file, rather than having a separate font file for every width, weight, or style. They let you access all the variations contained in a given font file via CSS and a single `@font-face` reference. This article will give you all you need to know to get you started using variable fonts.

> **Note:**
> To use variable fonts on your operating system, you need to make sure that it is up to date. For example, Linux OSes need the latest Linux FreeType version, and macOS prior to High Sierra (10.13) does not support variable fonts. If your operating system is not up to date, you will not be able to use variable fonts in web pages or the Firefox Developer Tools.

## Variable Fonts: what they are, and how they differ

To better understand what's different about variable fonts, it is worth reviewing what non-variable ones are like and how they compare.

### Standard (or Static) fonts

In the past, a typeface would be produced as several individual fonts, and each font would represent one specific width/weight/style combination. So you would have separate files for 'Roboto Regular', 'Roboto Bold', and 'Roboto Bold Italic' — meaning that you could end up with 20 or 30 different font files to represent a complete typeface (it could be several times that for a large typeface that has different widths as well).

In such a scenario, to use a typeface for typical use on a site for body copy you would need at least four files: regular, italic, bold, and bold italic. If you wanted to add more weights, like a lighter one for captions or a heavier one for extra emphasis, that would mean several more files. This results in more HTTP requests, and more data being downloaded (usually around 20k or more per file).

### Variable fonts

With a variable font, all of those permutations can be contained in a single file. That file would be larger than a single font, but in most cases smaller or about the same size as the 4 you might load for body copy. The advantage in choosing the variable font is that you have access to the entire range of weights, widths, and styles available, rather than being constrained to only the few that you previously would have loaded separately.

This allows for common typographic techniques such as setting different size headings in different weights for better readability at each size or using a slightly narrower width for data-dense displays. For comparison, it is typical in a typographic system for a magazine to use 10–15 or more different weight and width combinations throughout the publication — giving a much wider range of styles than currently typical on the web (or indeed practical for performance reasons alone).

#### A note about font families, weights, and variants

You might notice that we have been talking about having a specific font file for every weight and style (i.e., bold and italic and bold italic), rather than relying upon the browser to synthesize them. The reason for this is that most typefaces have very specific designs for bolder weights and italics that often include completely different characters (lower-case 'a' and 'g's are often quite different in italics, for example). To most accurately reflect the typeface design and avoid differences between browsers and how they may or may not synthesize the different styles, it's more accurate to load the specific font files where needed when using a non-variable font.

You may also find that some variable fonts come split into two files: one for uprights and all their variations, and one containing the italic variations. This is sometimes done to reduce the overall file size in cases where the italics aren't needed or used. In all cases, it is still possible to link them with a common `font-family` name so you can call them using the same `font-family` and appropriate `font-style`.
