---
title: "`text-transform` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/text-transform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `text-transform` CSS property

The **`text-transform`** CSS property specifies how to capitalize an element's text. It can be used to make text appear in all-uppercase or all-lowercase, or with each word capitalized. It also can help improve legibility for ruby.

```css
text-transform: capitalize;
```

```css
text-transform: uppercase;
```

```css
text-transform: lowercase;
```

```css
text-transform: none;
```

```css
text-transform: full-width;
```

```css
text-transform: full-size-kana;
```

```css
text-transform: math-auto;
```

```html
<section id="default-example">
  <div class="transition-all" id="example-element">
    <p>
      LONDON. Michaelmas term lately over, and the Lord Chancellor sitting in
      Lincoln's Inn Hall.
    </p>
    <p lang="el">
      Σ is a Greek letter and appears in ΟΔΥΣΣΕΥΣ. Θα πάμε στο "Θεϊκό φαΐ" ή στη
      "Νεράιδα"
    </p>
    <p lang="ja">ァィゥェ ォヵㇰヶ</p>
  </div>
</section>
```

```css
#example-element {
  font-size: 1.2em;
}
```

The `text-transform` property takes into account language-specific case mapping rules such as the following:

- In Turkic languages, like Turkish (`tr`), Azerbaijani (`az`), Crimean Tatar (`crh`), Volga Tatar (`tt`), and Bashkir (`ba`), there are two kinds of `i`, with and without the dot, and two case pairings: `i`/`İ` and `ı`/`I`.
- In German (`de`), the `ß` becomes `SS` in uppercase.
- In Dutch (`nl`), the `ij` digraph becomes `IJ`, even with `text-transform: capitalize`, which only puts the first letter of a word in uppercase.
- In Greek (`el`), vowels lose their accent when the whole word is in uppercase (`ά`/`Α`), except for the disjunctive eta (`ή`/`Ή`). Also, diphthongs with an accent on the first vowel lose the accent and gain a diaeresis on the second vowel (`άι`/`ΑΪ`).
- In Greek (`el`), the lowercase sigma character has two forms: `σ` and `ς`. `ς` is used only when sigma terminates a word. When applying `text-transform: lowercase` to an uppercase sigma (`Σ`), the browser needs to choose the right lowercase form based on context.
- in Irish (`ga`), certain prefixed letters remain in lowercase when the base initial is capitalized, so for example `text-transform: uppercase` will change `ar aon tslí` to `AR AON tSLÍ` and not, as one might expect, `AR AON TSLÍ` (Firefox only). In some cases, a hyphen is also removed upon uppercasing: `an t-uisce` transforms to `AN tUISCE` (and the hyphen is correctly reinserted by `text-transform: lowercase`).

The language is defined by the `lang` HTML attribute or the `xml:lang` XML attribute.

> **Note:**
> Support for language-specific cases varies between browsers, so check the browser compatibility table.

## Syntax

```css
/* Keyword values */
text-transform: none;
text-transform: capitalize;
text-transform: uppercase;
text-transform: lowercase;
text-transform: full-width;
text-transform: full-size-kana;
text-transform: math-auto;

/* Global values */
text-transform: inherit;
text-transform: initial;
text-transform: revert;
text-transform: revert-layer;
text-transform: unset;
```

- `capitalize`
    Is a keyword that converts the first _letter_ of each word to uppercase. Other characters remain unchanged (they retain their original case as written in the element's text). A letter is defined as a character that is part of Unicode's Letter or Number general categories; thus, any punctuation marks or symbols at the beginning of a word are ignored.

    > **Warning:**
    > In many languages, it is considered incorrect to capitalize every word in a sentence, even in titles and names. If you don't know the language of the text the style will be applied to, you should avoid using `capitalize`. Furthermore, `capitalize` does not create title casing, because it does not apply language-specific rules such as skipping articles in English.

    > **Note:**
    > The `capitalize` keyword was under-specified in CSS 1 and CSS 2.1. This resulted in differences between browsers in the way the first letter was calculated (Firefox considered `-` and `_` as letters, but other browsers did not. Both WebKit and Gecko incorrectly considered letter-based symbols like `ⓐ` to be real letters.) By precisely defining the correct behavior, CSS Text Level 3 cleans this mess up. The `capitalize` line in the browser compatibility table contains the version the different engines started to support this now precisely-defined behavior.

- `uppercase`
    Is a keyword that converts all characters to uppercase.
- `lowercase`
    Is a keyword that converts all characters to lowercase.
- `none`
    Is a keyword that prevents the case of all characters from being changed.
- `full-width`
    Is a keyword that forces the writing of a character — mainly ideograms and Latin scripts — inside a square, allowing them to be aligned in the usual East Asian scripts (like Chinese or Japanese).
- `full-size-kana`
    Generally used for `<ruby>` annotation text, the keyword converts all small Kana characters to the equivalent full-size Kana, to compensate for legibility issues at the small font sizes typically used in ruby.
- `math-auto`
    Used to automatically render text in math italic where appropriate. It transforms Latin and Greek letters, and a few other math-related symbols, to italic mathematical symbols but only if it's applied on a text node containing a single character. For example, "x" will become "𝑥" (U+1D465), but "exp" will stay as "exp".
    It is primarily used to specify the behavior of  elements in MathML. You should generally use MathML markup which automatically applies the right styling.

## Accessibility

Large sections of text set with a `text-transform` value of `uppercase` may be difficult for people with cognitive concerns such as Dyslexia to read.

- MDN Understanding WCAG, Guideline 1.4 explanations
- W3C Understanding WCAG 2.2

## Examples

### Example using "none"

```html
<p>
  Initial String
  <strong>Lorem ipsum dolor sit amet, consectetur adipisicing elit…</strong>
</p>
<p>
  text-transform: none
  <strong
    ><span
      >Lorem ipsum dolor sit amet, consectetur adipisicing elit…</span
    ></strong
  >
</p>
```

```css
span {
  text-transform: none;
}
strong {
  float: right;
}
```

This demonstrates no text transformation.

### Example using "capitalize" (general)

```html
<p>
  Initial String
  <strong>Lorem ipsum dolor sit amet, consectetur adipisicing elit…</strong>
</p>
<p>
  text-transform: capitalize
  <strong
    ><span
      >Lorem ipsum dolor sit amet, consectetur adipisicing elit…</span
    ></strong
  >
</p>
```

```css
span {
  text-transform: capitalize;
}
strong {
  float: right;
}
```

This demonstrates text capitalization.

### Example using "capitalize" (punctuation)

```html
<p>
  Initial String
  <strong
    >(this) "is" [a] –short– -test- «for» *the* _css_ ¿capitalize?
    ?¡transform!</strong
  >
</p>
<p>
  text-transform: capitalize
  <strong
    ><span
      >(this) "is" [a] –short– -test- «for» *the* _css_ ¿capitalize?
      ?¡transform!</span
    ></strong
  >
</p>
```

```css
span {
  text-transform: capitalize;
}
strong {
  float: right;
}
```

This demonstrates how initial punctuations of a word are ignored. The keyword target the first letter, that is the first Unicode character part of the Letter or Number general category.

### Example using "capitalize" (Symbols)

```html
<p>
  Initial String
  <strong>ⓐⓑⓒ (ⓓⓔⓕ) —ⓖⓗⓘ— ⓙkl</strong>
</p>
<p>
  text-transform: capitalize
  <strong><span>ⓐⓑⓒ (ⓓⓔⓕ) —ⓖⓗⓘ— ⓙkl</span></strong>
</p>
```

```css
span {
  text-transform: capitalize;
}
strong {
  float: right;
}
```

This demonstrates how initial symbols are ignored. The keyword target the first letter, that is the first Unicode character part of the Letter or Number general category.

### Example using "capitalize" (Dutch ij digraph)

```html
<p>
  Initial String
  <strong lang="nl">The Dutch word: "ijsland" starts with a digraph.</strong>
</p>
<p>
  text-transform: capitalize
  <strong
    ><span lang="nl"
      >The Dutch word: "ijsland" starts with a digraph.</span
    ></strong
  >
</p>
```

```css
span {
  text-transform: capitalize;
}
strong {
  float: right;
}
```

This demonstrates how the Dutch _ij_ digraph must be handled like one single letter.

### Example using "uppercase" (general)

```html
<p>
  Initial String
  <strong>Lorem ipsum dolor sit amet, consectetur adipisicing elit…</strong>
</p>
<p>
  text-transform: uppercase
  <strong
    ><span
      >Lorem ipsum dolor sit amet, consectetur adipisicing elit…</span
    ></strong
  >
</p>
```

```css
span {
  text-transform: uppercase;
}
strong {
  float: right;
}
```

This demonstrates transforming the text to uppercase.

### Example using "uppercase" (Greek vowels)

```html
<p>
  Initial String
  <strong>Θα πάμε στο "Θεϊκό φαΐ" ή στη "Νεράιδα"</strong>
</p>
<p>
  text-transform: uppercase
  <strong
    ><span lang="el">Θα πάμε στο "Θεϊκό φαΐ" ή στη "Νεράιδα"</span></strong
  >
</p>
```

```css
span {
  text-transform: uppercase;
}
strong {
  float: right;
}
```

This demonstrates how Greek vowels except disjunctive _eta_ should have no accent, and the accent on the first vowel of a vowel pair becomes a diaeresis on the second vowel.

### Example using "lowercase" (general)

```html
<p>
  Initial String
  <strong>Lorem ipsum dolor sit amet, consectetur adipisicing elit…</strong>
</p>
<p>
  text-transform: lowercase
  <strong
    ><span
      >Lorem ipsum dolor sit amet, consectetur adipisicing elit…</span
    ></strong
  >
</p>
```

```css
span {
  text-transform: lowercase;
}
strong {
  float: right;
}
```

This demonstrates transforming the text to lowercase.

### Example using "lowercase" (Greek Σ)

```html
<p>
  Initial String
  <strong>Σ IS A greek LETTER that appears SEVERAL TIMES IN ΟΔΥΣΣΕΥΣ.</strong>
</p>
<p>
  text-transform: lowercase
  <strong
    ><span
      >Σ IS A greek LETTER that appears SEVERAL TIMES IN ΟΔΥΣΣΕΥΣ.</span
    ></strong
  >
</p>
```

```css
span {
  text-transform: lowercase;
}
strong {
  float: right;
}
```

This demonstrates how the Greek character sigma (`Σ`) is transformed into the regular lowercase sigma (`σ`) or the word-final variant (`ς`), according the context.

### Example using "lowercase" (Lithuanian)

```html
<p>
  Initial String
  <strong>Ĩ is a Lithuanian LETTER as is J́</strong>
</p>
<p>
  text-transform: lowercase
  <strong><span lang="lt">Ĩ is a Lithuanian LETTER as is J́</span></strong>
</p>
```

```css
span {
  text-transform: lowercase;
}
strong {
  float: right;
}
```

This demonstrates how the Lithuanian letters `Ĩ` and `J́` retain their dot when transformed to lowercase.

### Example using "full-width" (general)

```html
<p>
  Initial String
  <strong
    >0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&()*+,-./:;&lt;=&gt;?@{|}~</strong
  >
</p>
<p>
  text-transform: full-width
  <strong
    ><span
      >0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&()*+,-./:;&lt;=&gt;?@{|}~</span
    ></strong
  >
</p>
```

```css
span {
  text-transform: full-width;
}
strong {
  width: 100%;
  float: right;
}
```

Some characters exist in two formats: normal width and a full-width, with different Unicode code points. The full-width version is used to mix them smoothly with Asian ideographic characters.

### Example using "full-width" (Japanese half-width katakana)

```html
<p>
  Initial String
  <strong>ｳｪﾌﾞﾌﾟﾛｸﾞﾗﾐﾝｸﾞの勉強</strong>
</p>
<p>
  text-transform: full-width
  <strong><span>ｳｪﾌﾞﾌﾟﾛｸﾞﾗﾐﾝｸﾞの勉強</span></strong>
</p>
```

```css
span {
  text-transform: full-width;
}
strong {
  width: 100%;
  float: right;
}
```

The Japanese half-width katakana was used to represent katakana in 8-bit character codes. Unlike regular (full-width) katakana characters, a letter with dakuten (voiced sound mark) is represented as two code points, the body of letter and dakuten. The `full-width` combines these into a single code point when converting these characters into full-width.

### Example using "full-size-kana"

```html
<p>ァィゥェ ォヵㇰヶ ㇱㇲッㇳ ㇴㇵㇶㇷ ㇸㇹㇺャ ュョㇻㇼ ㇽㇾㇿヮ</p>
<p>ァィゥェ ォヵㇰヶ ㇱㇲッㇳ ㇴㇵㇶㇷ ㇸㇹㇺャ ュョㇻㇼ ㇽㇾㇿヮ</p>
```

```css
p:nth-of-type(2) {
  text-transform: full-size-kana;
}
```

### Example using "math-auto"

In this example, we use pure HTML markup to create a math formula:

```html
<div>
  (<span class="math-id">sin</span>&#8198;<span class="math-id">x</span>)<sup
    >2</sup
  >
  + (<span class="math-id">cos</span>&#8198;<span class="math-id">x</span>)<sup
    >2</sup
  >
  = 1
</div>
```

We give every `.math-id` element `text-transform: math-auto`. However, note how only the `x` characters become italic, while the `sin` and `cos` remain unchanged.

```css
.math-id {
  text-transform: math-auto;
}
```

However, you are encouraged to use MathML for mathematical formulas, as it provides a more robust and accessible way to represent mathematical content. Here's the same formula using MathML:

```xml
<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
  <semantics>
    <mrow>
      <mo stretchy="false">(</mo>
      <mo lspace="0em" rspace="0em">sin</mo>
      <mspace width="0.16666666666666666em"></mspace>
      <mi>x</mi>
      <msup>
        <mo stretchy="false">)</mo>
        <mn>2</mn>
      </msup>
      <mo>+</mo>
      <mo stretchy="false">(</mo>
      <mo lspace="0em" rspace="0em">cos</mo>
      <mspace width="0.16666666666666666em"></mspace>
      <mi>x</mi>
      <msup>
        <mo stretchy="false">)</mo>
        <mn>2</mn>
      </msup>
      <mo>=</mo>
      <mn>1</mn>
    </mrow>
    <annotation encoding="TeX">(\sin\,x)^2+(\cos\,x)^2=1</annotation>
  </semantics>
</math>
```

## See also

- `font-variant`
