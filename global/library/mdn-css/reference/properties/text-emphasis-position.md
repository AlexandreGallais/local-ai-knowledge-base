---
title: "`text-emphasis-position` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/text-emphasis-position/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `text-emphasis-position` CSS property

The **`text-emphasis-position`** CSS property sets where emphasis marks are drawn. Similar to the text rendered by the `<ruby>` HTML element, if there isn't enough room for emphasis marks, the line height is increased.

```css
text-emphasis-position: auto;
```

```css
text-emphasis-position: over right;
```

```css
text-emphasis-position: under right;
```

```css
text-emphasis-position: auto;
writing-mode: vertical-rl;
```

```css
text-emphasis-position: over left;
writing-mode: vertical-rl;
```

```css
text-emphasis-position: over right;
writing-mode: vertical-rl;
```

```html
<section id="default-example">
  <p>
    I'd far rather be
    <span class="transition-all" id="example-element">happy than right</span>
    any day.
  </p>
</section>
```

```css
p {
  font: 1.5em sans-serif;
}

#example-element {
  text-emphasis: filled double-circle #ffb703;
}
```

## Syntax

```css
/* Initial value */
text-emphasis-position: auto;

/* Keyword values */
text-emphasis-position: over;
text-emphasis-position: under;

text-emphasis-position: over right;
text-emphasis-position: over left;
text-emphasis-position: under right;
text-emphasis-position: under left;

text-emphasis-position: left over;
text-emphasis-position: right over;
text-emphasis-position: right under;
text-emphasis-position: left under;

/* Global values */
text-emphasis-position: inherit;
text-emphasis-position: initial;
text-emphasis-position: revert;
text-emphasis-position: revert-layer;
text-emphasis-position: unset;
```

### Values

The property accepts one or two values:

- If only one value is provided, it can be `auto`, `over`, or `under`. When only `over` or `under` is used, `right` is assumed as the default position.
- If two values are provided, they must include one of `over` or `under` and one of `right` or `left`. Their order does not matter.

The values include:

- `auto`
    Draws marks over the text in horizontal writing mode and to the right of the text in vertical writing mode.
- `over`
    Draws marks over the text in horizontal writing mode.
- `under`
    Draws marks under the text in horizontal writing mode.
- `right`
    Draws marks to the right of the text in vertical writing mode.
- `left`
    Draws marks to the left of the text in vertical writing mode.

## Description

The preferred position of emphasis marks depends on the language. In Japanese for example, the preferred position is `over right`. In Chinese, on the other hand, the preferred position is `under right`. The informative table below summarizes the preferred emphasis mark positions for Chinese, Mongolian and Japanese:

    Preferred emphasis mark and ruby position

       | Language
       | Preferred position
       | Illustration

       | Horizontal
       | Vertical

       | Japanese
       | over
       | right
       |

       |

       | Korean

       | Mongolian

       | Chinese
       | under
       | right
       |

> **Note:**
> The `text-emphasis-position` cannot be set, and therefore are not reset either, using the `text-emphasis` shorthand property.

## Examples

### Adding emphasis mark positions

Use the dropdown menu to change the position of the emphasis marks. This will change the class on the `` element, which in turn, will update the position of the emphasis marks on the text.

#### HTML

```html
<p class="unsupported">
  The <code>auto</code> value is not supported in your browser.
</p>
<label for="position">Emphasis position:</label>
<select id="position">
  <option value="auto">auto</option>
  <option value="over-right">over right</option>
  <option value="over-left">over left</option>
  <option value="under-right">under right</option>
  <option value="under-left">under left</option>
  <option value="preferred">preferred</option>
</select>
```

```html
<section id="setting" class="auto">
  <p class="horizontal" lang="zh">你好世界</p>
  <!-- Hello World in Chinese -->
  <p class="vertical" lang="ja">世界、こんにちは。</p>
  <!-- Hello World in Japanese -->
</section>
```

#### CSS

```css
.unsupported {
  color: red;
}
@supports (text-emphasis-position: auto) {
  .unsupported {
    display: none;
  }
}
.horizontal {
  writing-mode: horizontal-tb;
}
.vertical {
  writing-mode: vertical-rl;
}
section {
  display: flex;
  justify-content: space-around;
}
```

```css
section p {
  text-emphasis: filled circle tomato;
  text-emphasis-position: auto;
}
.over-right p,
.preferred p [lang="ja"] {
  text-emphasis-position: over right;
}
.over-left p {
  text-emphasis-position: over left;
}
.under-right p,
.preferred p [lang="zh"] {
  text-emphasis-position: under right;
}
.under-left p {
  text-emphasis-position: under left;
}
.preferred p [lang="ja"] {
}
```

```js
const position = document.querySelector("#position");
const setting = document.querySelector("#setting");
const updateClass = () => {
  const currentClass = setting.classList;
  setting.classList.replace(currentClass, position.value);
};
position.addEventListener("change", updateClass);
```

#### Result

Use the "Emphasis position" dropdown to choose the location of the emphasis marks. The `preferred` option in the dropdown uses the preferred positions, as explained in the Description section.

### Preferring ruby over emphasis marks

Some editors prefer to hide emphasis marks when they conflict with ruby. In HTML, this can be done with the following style rule:

```css
ruby {
  text-emphasis: none;
}
```

### Preferring emphasis marks over ruby

Some other editors prefer to hide ruby when they conflict with emphasis marks. In HTML, this can be done with the following pattern:

```css
em {
  text-emphasis: dot; /* Set text-emphasis for <em> elements */
}

em rt {
  display: none; /* Hide ruby inside <em> elements */
}
```

## See also

- `text-underline-position`
- `text-emphasis-style`
- `text-emphasis-color`
- `text-emphasis` shorthand property
- `writing-mode`
