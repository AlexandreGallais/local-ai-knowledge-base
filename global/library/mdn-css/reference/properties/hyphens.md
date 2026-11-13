---
title: "`hyphens` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/hyphens/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `hyphens` CSS property

The **`hyphens`** CSS property specifies how words should be hyphenated when text wraps across multiple lines.

```css
hyphens: none;
```

```css
hyphens: manual;
```

```css
hyphens: auto;
```

```html
<section id="default-example">
  <p id="example-element">An extra­ordinarily long English word!</p>
</section>
```

```css
#example-element {
  border: 2px dashed #999999;
  font-size: 1.5rem;
  text-align: left;
  width: 7rem;
}
```

The example text "An extraordinarily long English word!" contains the hidden `&shy;` (soft hyphen) character: `An extra&shy;ordinarily long English word!`. This character is used to indicate a potential place to insert a hyphen when `hyphens: manual;` is specified.

## Syntax

```css
/* Keyword values */
hyphens: none;
hyphens: manual;
hyphens: auto;

/* Global values */
hyphens: inherit;
hyphens: initial;
hyphens: revert;
hyphens: revert-layer;
hyphens: unset;
```

### Values

This property is specified as one of the following keyword values:

- `none`
    Words are not broken at line breaks, even if characters inside the words suggest line break points. Lines will only wrap at whitespace.
- `manual`
    Default value. Words are broken for line-wrapping only where characters inside the word suggest line break opportunities. See Suggesting line break opportunities below for details.
- `auto`
    The browser is free to automatically break words at appropriate hyphenation points, following whatever rules it chooses. However, suggested line break opportunities (see Suggesting line break opportunities below) will override automatic break point selection when present.

## Description

The `hyphens` property can be used to define how words should be hyphenated when text wraps across multiple lines. It can prevent hyphenation entirely, hyphenate at manually-specified points within the text, or let the browser automatically insert hyphens where appropriate.

Hyphenation rules are language-specific. In HTML, the language is determined by the `lang` attribute. Browsers will only hyphenate if this attribute is present and the appropriate hyphenation dictionary is available. The `auto` setting's behavior depends on the language being properly tagged to select the appropriate hyphenation rules.

In XML, the `xml:lang` attribute must be used. The specification does not define rules for hyphenation in XML content, so the exact hyphenation may vary from browser to browser.

The `hyphenate-character` property can be used to specify an alternative hyphenation character to use at the end of the line, instead of the default language-specific hyphenation character.

If you apply `word-break: break-all` then no hyphens are shown, even if the word breaks at a hyphenation point. If you apply `text-wrap-mode: nowrap`, no wrapping occurs, so no hyphens will appear.

### Suggesting line break opportunities

There are two Unicode characters used to manually specify potential line break points within text:

- U+2010 (HYPHEN)
    The "hard" hyphen character indicates a visible line break opportunity. Even if the line is not actually broken at that point, the hyphen is still rendered.
- U+00AD (SHY)
    An invisible, "**s**oft" **hy**phen. This character is not rendered visibly; instead, it marks a place where the browser should break the word if hyphenation is necessary. In HTML, use `&shy;` to insert a soft hyphen.

> **Note:**
> When the HTML `` element leads to a line break, no hyphen is added.

## Examples

### Basic <example-value>

This example demonstrates the three values of the `hyphens` property.

#### HTML

We include three `` elements containing the same text but with three different classes.

```html
<dl>
  <dt><code>none</code>: no hyphen; overflow if needed</dt>
  <dd lang="en" class="none">An extreme&shy;ly long English word</dd>
  <dt>
    <code>manual</code>: hyphen only at &amp;hyphen; or &amp;shy; (if needed)
  </dt>
  <dd lang="en" class="manual">An extreme&shy;ly long English word</dd>
  <dt><code>auto</code>: hyphens where the algorithm decides (if needed)</dt>
  <dd lang="en" class="auto">An extreme&shy;ly long English word</dd>
</dl>
```

#### CSS

Each of the three classes is set to a different `hyphens` value.

```css
dd {
  width: 55px;
  border: 1px solid black;
}
dd.none {
  hyphens: none;
}
dd.manual {
  hyphens: manual;
}
dd.auto {
  hyphens: auto;
}
```

#### Result

## See also

- `content`
- `overflow-wrap` (formerly `word-wrap`)
- `word-break`
- Guide to wrapping and breaking text
- CSS text module
