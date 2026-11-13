---
title: "`list-style-type` CSS property (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/list-style-type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `list-style-type` CSS property

The **`list-style-type`** CSS property sets the marker (such as a disc, character, or custom counter style) of a list item element.

```css
list-style-type: space-counter;
```

```css
list-style-type: disc;
```

```css
list-style-type: circle;
```

```css
list-style-type: "\1F44D";
```

```html
<section class="default-example" id="default-example">
  <div>
    <p>NASA Notable Missions</p>
    <ul class="transition-all unhighlighted" id="example-element">
      <li>Apollo</li>
      <li>Hubble</li>
      <li>Chandra</li>
      <li>Cassini-Huygens</li>
    </ul>
  </div>
  <hr />
  <div class="note">
    <p>
      <code>space-counter</code> is defined with
      <a
        href="//developer.mozilla.org/docs/Web/CSS/Reference/At-rules/@counter-style"
        target="_parent"
        ><code>@counter-style</code></a
      >
    </p>
  </div>
</section>
```

```css
.default-example {
  font-size: 1.2rem;
}

#example-element {
  width: 100%;
  background: #be094b;
  color: white;
}

section {
  text-align: left;
  flex-direction: column;
}

hr {
  width: 50%;
  color: lightgray;
  margin: 0.5em;
}

.note {
  font-size: 0.8rem;
}

.note a {
  color: #009e5f;
}

@counter-style space-counter {
  symbols: "\1F680" "\1F6F8" "\1F6F0" "\1F52D";
  suffix: " ";
}
```

## Syntax

```css
/* Partial list of types */
list-style-type: disc;
list-style-type: circle;
list-style-type: square;
list-style-type: decimal;
list-style-type: georgian;
list-style-type: trad-chinese-informal;
list-style-type: kannada;

/* <string> value */
list-style-type: "-";

/* Identifier matching an @counter-style rule */
list-style-type: custom-counter-style;

/* Keyword value */
list-style-type: none;

/* Global values */
list-style-type: inherit;
list-style-type: initial;
list-style-type: revert;
list-style-type: revert-layer;
list-style-type: unset;
```

The `list-style-type` property may be defined as any one of:

- a `<custom-ident>` value,
- a `symbols()` value,
- a `<string>` value, or
- the keyword `none`.

Note that:

- Some types require a suitable font installed to display as expected.
- The `cjk-ideographic` is identical to `trad-chinese-informal`; it exists for legacy reasons.

### Values

- `<custom-ident>`
    An identifier matching the value of a `@counter-style` or one of the predefined styles:
- `symbols()`
    Defines an anonymous style of the list.
- `<string>`
    The specified string will be used as the item's marker.
- `none`
    No item marker is shown.
- `disc`
    A filled circle (default value).
- `circle`
    A hollow circle.
- `square`
    A filled square.
- `decimal`
    Decimal numbers, beginning with 1.
- `cjk-decimal`
    Han decimal numbers.
- `decimal-leading-zero`
    Decimal numbers, padded by initial zeros.
- `lower-roman`
    Lowercase roman numerals.
- `upper-roman`
    Uppercase roman numerals.
- `lower-greek`
    Lowercase classical Greek.
- `lower-alpha`, `lower-latin`
    Lowercase ASCII letters.
- `upper-alpha`, `upper-latin`
    Uppercase ASCII letters.
- `arabic-indic`, `-moz-arabic-indic`
    Arabic-Indic numbers.
- `armenian`
    Traditional Armenian numbering.
- `bengali`, `-moz-bengali`
    Bengali numbering.
- `cambodian`/`khmer`
    Cambodian/Khmer numbering.
- `cjk-earthly-branch`, `-moz-cjk-earthly-branch`
    Han "Earthly Branch" ordinals.
- `cjk-heavenly-stem`, `-moz-cjk-heavenly-stem`
    Han "Heavenly Stem" ordinals.
- `cjk-ideographic`
    Identical to `trad-chinese-informal`.
- `devanagari`, `-moz-devanagari`
    Devanagari numbering.
- `ethiopic-numeric`
    Ethiopic numbering.
- `georgian`
    Traditional Georgian numbering.
- `gujarati`, `-moz-gujarati`
    Gujarati numbering.
- `gurmukhi`, `-moz-gurmukhi`
    Gurmukhi numbering.
- `hebrew`
    Traditional Hebrew numbering.
- `hiragana`
    Dictionary-order hiragana lettering.
- `hiragana-iroha`
    Iroha-order hiragana lettering.
- `japanese-formal`
    Japanese formal numbering to be used in legal or financial documents. The kanjis are designed so that they can't be modified to look like another correct one.
- `japanese-informal`
    Japanese informal numbering.
- `kannada`, `-moz-kannada`
    Kannada numbering.
- `katakana`
    Dictionary-order katakana lettering.
- `katakana-iroha`
    Iroha-order katakana lettering.
- `korean-hangul-formal`
    Korean hangul numbering.
- `korean-hanja-formal`
    Formal Korean Han numbering.
- `korean-hanja-informal`
    Korean hanja numbering.
- `lao`, `-moz-lao`
    Laotian numbering.
- `lower-armenian`
    Lowercase Armenian numbering.
- `malayalam`, `-moz-malayalam`
    Malayalam numbering.
- `mongolian`
    Mongolian numbering.
- `myanmar`, `-moz-myanmar`
    Myanmar (Burmese) numbering.
- `oriya`, `-moz-oriya`
    Oriya numbering.
- `persian`, `-moz-persian`
    Persian numbering.
- `simp-chinese-formal`
    Simplified Chinese formal numbering.
- `simp-chinese-informal`
    Simplified Chinese informal numbering.
- `tamil`, `-moz-tamil`
    Tamil numbering.
- `telugu`, `-moz-telugu`
    Telugu numbering.
- `thai`, `-moz-thai`
    Thai numbering.
- `tibetan`
    Tibetan numbering.
- `trad-chinese-formal`
    Traditional Chinese formal numbering.
- `trad-chinese-informal`
    Traditional Chinese informal numbering.
- `upper-armenian`
    Traditional uppercase Armenian numbering.
- `disclosure-open`
    Symbol indicating that a disclosure widget such as `` is opened.
- `disclosure-closed`
    Symbol indicating that a disclosure widget, like `` is closed.

Refer to the All list style types example to see the above values in action. Details of all the available counter styles used by various cultures around the world can be found in Ready-made Counter Styles.

### Non-standard extensions

Mozilla (Firefox) supports a few predefined types with a `-moz-` prefix.

- `ethiopic-halehame`: `-moz-ethiopic-halehame`
- `ethiopic-halehame-am`: `-moz-ethiopic-halehame-am`
- `ethiopic-halehame-ti-er`: `-moz-ethiopic-halehame-ti-er`
- `ethiopic-halehame-ti-et`: `-moz-ethiopic-halehame-ti-et`
- `ethiopic-numeric`: `-moz-ethiopic-numeric`
- `hangul`: `-moz-hangul`
- `hangul-consonant`: `-moz-hangul-consonant`
- `urdu`: `-moz-urdu`

See the compatibility table to check which browsers support which extension.

## Description

The `list-style-type` property sets the marker (such as a disc, character, or custom counter style) of a list item element. The marker will be `currentColor`, the same as the computed color of the element it applies to.

Only a few elements (`` and `<summary>`) have a default value of `display: list-item`. However, the `list-style-type` property may be applied to any element whose `display` value is set to `list-item`.

### List style inheritance

Because `list-style-type` is inherited, it can be set on a parent element (commonly `` or ``) to make it apply to its list items. However, user-agent stylesheets set `list-style-type` on ``, ``, and `<menu>` elements, so nested lists use these default values instead of inheriting the ancestor list's value. To make nested lists inherit this value, set `list-style-type: inherit` on the nested list elements.

For example, in cases like this:

```html
<ul>
  <li>One</li>
  <li>Two</li>
  <li>
    Three
    <ul>
      <li>Four</li>
      <li>Five</li>
      <li>Six</li>
    </ul>
  </li>
</ul>
```

Where a custom style is set on the outer list:

```css
body > ul {
  list-style-type: square;
}
```

The inner list won't inherit the custom style unless you set it to inherit:

```css
ul ul {
  list-style-type: inherit;
}
```

## Accessibility

Safari will not recognize an ordered or unordered list as a list in the accessibility tree if it has a `list-style-type` value of `none`. This can be resolved by adding `role="list"` to the list's opening tag. To learn more about this and potential workarounds, see `list-style`.
