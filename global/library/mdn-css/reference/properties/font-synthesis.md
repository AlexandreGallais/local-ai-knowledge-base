---
title: "`font-synthesis` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/font-synthesis/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `font-synthesis` CSS property

The **`font-synthesis`** CSS shorthand property lets you specify whether or not the browser may synthesize the bold, italic, small-caps, and/or subscript and superscript typefaces when they are missing in the specified font-family.

```css
font-synthesis: weight style small-caps;
```

```css
font-synthesis: none;
```

```css
font-synthesis: weight;
```

```css
font-synthesis: style;
```

```css
font-synthesis: small-caps;
```

```css
font-synthesis: position;
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">
    <p class="english">
      This font does not include <span class="bold">bold</span>,
      <span class="italic">italic</span>,
      <span class="small-caps">small-caps</span>, and
      <span class="sub">subscript</span> or
      <span class="sup">superscript</span> variants.
    </p>
    <p class="chinese">
      中文排版通常不用<span class="bold">粗体</span>或<span class="italic"
        >斜体</span
      >，也不会使用<span class="small-caps">小型大写字母</span>和<span
        class="sub"
        >下标</span
      ><span class="sup">上标</span>变体。
    </p>
  </div>
</section>
```

```css
@import "https://fonts.googleapis.com/css2?family=Oxygen&display=swap";
@import "https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap";

.english {
  font-size: 1.2em;
  font-family: "Oxygen", sans-serif;
}

.chinese {
  font-size: 1.2em;
  font-family: "Ma Shan Zheng", cursive;
}

.bold {
  font-weight: bold;
}

.italic {
  font-style: italic;
}

.small-caps {
  font-variant: small-caps;
}

.sub {
  font-variant: sub;
}

.sup {
  font-variant: super;
}
```

## Constituent properties

This property is a shorthand for the following CSS properties:

- font-synthesis-weight
- font-synthesis-style
- font-synthesis-small-caps
- font-synthesis-position

## Syntax

```css
/* none or one or more of the other keyword values */
font-synthesis: none;
font-synthesis: weight;
font-synthesis: style;
font-synthesis: position;
font-synthesis: small-caps style; /* property values can be in any order */
font-synthesis: style small-caps weight position; /* property values can be in any order */

/* Global values */
font-synthesis: inherit;
font-synthesis: initial;
font-synthesis: revert;
font-synthesis: revert-layer;
font-synthesis: unset;
```

### Values

This property is specified as one of the following keyword values:

- `none`
    Indicates that no bold, italic, or small-caps typeface may be synthesized by the browser.
- `weight`
    Indicates that the missing bold typeface may be synthesized by the browser if needed.
- `style`
    Indicates that the italic typeface may be synthesized by the browser if needed.
- `small-caps`
    Indicates that the small-caps typeface may be synthesized by the browser if needed.
- `position`
    Indicates that the subscript and superscript typeface may be synthesized by the browser, if needed, when using `font-variant-position`.

## Description

Most standard Western fonts include italic and bold variants, and some fonts include a small-caps and subscript/superscript variants. However, many fonts do not. Fonts used for Chinese, Japanese, Korean and other logographic scripts tend not to include these variants and synthesizing them might impede the legibility or change the meaning of the text. In these cases, it may be desirable to switch off the browser's default font-synthesis.

For example, using the :lang() pseudo-class, you can disable the browser from synthesizing bold and oblique characters for a language, in this case Arabic:

```css
*:lang(ar) {
  font-synthesis: none;
}
```

The table below shows how a value of the shorthand `font-synthesis` property maps to the constituent longhand properties.

| font-synthesis value               | font-synthesis-weight value | font-synthesis-style value | font-synthesis-small-caps value | font-synthesis-position value |
| :--------------------------------- | :-------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `none`                             | `none`                                                                                        | `none`                                                                                      | `none`                                                                                                | `none`                                                                                            |
| `weight`                           | `auto`                                                                                        | `none`                                                                                      | `none`                                                                                                | `none`                                                                                            |
| `style`                            | `none`                                                                                        | `auto`                                                                                      | `none`                                                                                                | `none`                                                                                            |
| `small-caps`                       | `none`                                                                                        | `none`                                                                                      | `auto`                                                                                                | `none`                                                                                            |
| `position`                         | `none`                                                                                        | `none`                                                                                      | `none`                                                                                                | `auto`                                                                                            |
| `weight style`                     | `auto`                                                                                        | `auto`                                                                                      | `none`                                                                                                | `none`                                                                                            |
| `weight small-caps`                | `auto`                                                                                        | `none`                                                                                      | `auto`                                                                                                | `none`                                                                                            |
| `weight position`                  | `auto`                                                                                        | `none`                                                                                      | `none`                                                                                                | `auto`                                                                                            |
| `style small-caps`                 | `none`                                                                                        | `auto`                                                                                      | `auto`                                                                                                | `none`                                                                                            |
| `style position`                   | `none`                                                                                        | `auto`                                                                                      | `none`                                                                                                | `auto`                                                                                            |
| `weight style small-caps`          | `auto`                                                                                        | `auto`                                                                                      | `auto`                                                                                                | `none`                                                                                            |
| `weight style position`            | `auto`                                                                                        | `auto`                                                                                      | `none`                                                                                                | `auto`                                                                                            |
| `weight small-caps position`       | `auto`                                                                                        | `none`                                                                                      | `auto`                                                                                                | `auto`                                                                                            |
| `style small-caps position`        | `none`                                                                                        | `auto`                                                                                      | `auto`                                                                                                | `auto`                                                                                            |
| `weight style small-caps position` | `auto`                                                                                        | `auto`                                                                                      | `auto`                                                                                                | `auto`                                                                                            |

## Examples

### Disabling font synthesis

This example shows the browser's default font-synthesis behavior and compares it with when the synthesis behavior is turned off. Notice that the example uses two imported fonts to demonstrate this behavior. You might not be able to replicate turning off of font-synthesis on fonts available on your operating system by default.

#### HTML

```html
<pre> DEFAULT </pre>
<p class="english">
  This font supports <strong>bold</strong> and <em>italic</em>.
</p>
<p class="chinese">这个字体支持<strong>加粗</strong>和<em>斜体</em></p>
<br />

<pre> SYNTHESIS IS DISABLED </pre>
<p class="english no-syn">
  This font supports <strong>bold</strong> and <em>italic.</em>
</p>
<p class="chinese no-syn">这个字体支持<strong>加粗</strong>和<em>斜体</em></p>
<br />

<pre> SYNTHESIS IS ENABLED </pre>
<p class="english">
  This font supports <strong>bold</strong> and <em>italic</em>.
</p>
<p class="chinese syn">这个字体支持<strong>加粗</strong>和<em>斜体</em></p>
```

#### CSS

```css
@import "https://fonts.googleapis.com/css2?family=Montserrat&display=swap";
@import "https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap";

.english {
  font-family: "Montserrat", sans-serif;
}
.chinese {
  font-family: "Ma Shan Zheng", cursive;
}
.no-syn {
  font-synthesis: none;
}
.syn {
  font-synthesis: style weight;
}
```

#### Result

## See also

- `font-style`
- `font-weight`
- `font-variant-caps`
- `font-variant-position`
