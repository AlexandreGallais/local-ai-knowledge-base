---
title: "`text-autospace` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/text-autospace/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `text-autospace` CSS property

The **`text-autospace`** CSS property allows you to specify the space applied between Chinese/Japanese/Korean (CJK) and non-CJK characters.

Many CJK typographic conventions require a small amount of space between CJK characters and Western letters or numbers (see W3C's descriptions for Chinese and Japanese text layout conventions). Some authors would manually insert a space character for this purpose, but `text-autospace` adds this spacing at the layout engine level, without requiring extra characters in the textual content.

```css
text-autospace: no-autospace;
```

```css
text-autospace: normal;
```

```css
text-autospace: ideograph-alpha;
```

```css
text-autospace: ideograph-numeric;
```

```css
text-autospace: auto;
```

```html
<section id="default-example">
  <div id="example-element" lang="zh">
    <p>HTML超文本标记语言</p>
    <p>42四十二</p>
  </div>
</section>
```

```css
#example-element {
  font: 2rem sans-serif;
}

p {
  margin: 0;
}
```

## Syntax

```css
text-autospace: normal;
text-autospace: no-autospace;
text-autospace: ideograph-alpha;
text-autospace: ideograph-numeric;
text-autospace: punctuation;
text-autospace: insert;
text-autospace: replace;
text-autospace: ideograph-alpha ideograph-numeric punctuation;
text-autospace: ideograph-alpha ideograph-numeric;
text-autospace: ideograph-alpha ideograph-numeric insert;
text-autospace: auto;

/* Global values */
text-autospace: inherit;
text-autospace: initial;
text-autospace: revert;
text-autospace: revert-layer;
text-autospace: unset;
```

### Values

- `normal`
    Creates the default behavior to automatically apply spacing between CJK and non-CJK characters and around punctuation. This value has the same effect as applying both `ideograph-alpha` and `ideograph-numeric`.
- `<autospace>`
    Provides more control over spacing behaviors. It accepts the keyword `no-autospace`, or a combination of one or more of `ideograph-alpha`, `ideograph-numeric`, and `punctuation`, optionally followed by `insert` or `replace`.
    - `no-autospace`
        Disables automatic spacing between CJK and non-CJK characters.
    - `ideograph-alpha`
        Adds spacing only between ideographic characters (such as Katakana and Han) and non-ideographic letters (such as Latin). It does not add spacing between ideographic characters and non-ideographic numbers.
    - `ideograph-numeric`
        Adds spacing only between ideographic characters (such as Katakana and Han) and non-ideographic numbers (such as Latin). It does not add spacing between ideographic characters and non-ideographic letters.
    - `punctuation`
        Adds non-breaking spacing around punctuation as required by language-specific typographic conventions.
    - `insert`
        Adds the specified spacing only if there are no existing spaces between the ideographic and non-ideographic scripts.
    - `replace`
        Replaces existing spacing (such as U+0020) between ideographic and non-ideographic characters with the specified spacing.
- `auto`
    Lets the browser choose typographically appropriate spacing. The spacing may vary across browsers and platforms.

> **Note:**
> If neither `insert` nor `replace` are specified, the behavior is the same as `insert`.

> **Note:**
> This property is additive with the `word-spacing` and `letter-spacing` properties. The amount of spacing contributed by the `letter-spacing` setting is added to the spacing created by `text-autospace`. The same applies to `word-spacing`.

## See also

- `text-spacing-trim`
- `ic` and `ric` units
- CSS Text module
- Mixed text composition in horizontal writing mode in Requirements for Chinese Text Layout on w3.org
- Japanese and Western mixed text composition in Requirements for Japanese Text Layout on w3.org
