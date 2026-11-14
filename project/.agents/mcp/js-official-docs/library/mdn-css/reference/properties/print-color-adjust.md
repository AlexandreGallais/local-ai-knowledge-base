---
title: "`print-color-adjust` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/print-color-adjust/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `print-color-adjust` CSS property

The **`print-color-adjust`** CSS property sets what, if anything, the user agent may do to optimize the appearance of the element on the output device.
By default, the browser is allowed to make any adjustments to the element's appearance it determines to be necessary and prudent given the type and capabilities of the output device.

## Syntax

```css
print-color-adjust: economy;
print-color-adjust: exact;

/* Global values */
print-color-adjust: inherit;
print-color-adjust: initial;
print-color-adjust: revert;
print-color-adjust: revert-layer;
print-color-adjust: unset;
```

### Values

This property is specified as one of the following keyword values:

- `economy`
    The user agent is allowed to make adjustments to the element as it deems appropriate and prudent in order to optimize the output for the device it's being rendered for.
    For example, when printing, a browser might opt to leave out all background images and to adjust text colors to be sure the contrast is optimized for reading on white paper.
    This is the default.
- `exact`
    The element's content has been specifically and carefully crafted to use colors, images, and styles in a thoughtful and/or important way, such that being altered by the browser might actually make things worse rather than better.
    The appearance of the content should not be changed except by the user's request.
    For example, a page might include a list of information with rows whose background colors alternate between white and a light gray.
    Removing the background color would decrease the legibility of the content.

## Usage notes

There are a number of reasons a browser might wish to deviate from the specified appearance, such as:

- The content uses text and background colors that will be too similar on the output device for legibility purposes.
- If the output device is a printer, and to save ink, dark or extremely dense background images might be removed.
- When printing a page, the browser might want to replace light-colored text on a dark background with dark text on a white background.

Any options the user agent offers the user to allow them to control the use of color and images will take priority over the value of `print-color-adjust`.
In other words, there isn't any guarantee that `print-color-adjust` will do anything.
Not only can the user override the behavior, but each user agent is allowed to decide for itself how to handle `print-color-adjust` in any given situation.

## Examples

### Preserving low contrast

In this example, a box is shown which uses a `background-image` and a translucent `linear-gradient()` function atop a black background color to have a dark blue gradient behind medium red text.
For whatever reason, this is the desired appearance in any rendering environment, including on paper, so we also use `print-color-adjust: exact` to tell the browser not to make color or style adjustments to the box when rendering it.

#### HTML

```html
<div class="my-box">
  <p>Need more contrast!</p>
</div>
```

#### CSS

```css
.my-box {
  background-color: black;
  background-image: linear-gradient(rgb(0 0 180 / 50%), rgb(70 140 220 / 50%));
  color: #990000;
  width: 15rem;
  height: 6rem;
  text-align: center;
  font:
    24px "Helvetica",
    sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  print-color-adjust: exact;
}
```

#### Result

## See also

- Other color-related properties: `color`, `background-color`, `border-color`, `outline-color`, `text-decoration-color`, `text-emphasis-color`, `text-shadow`, `caret-color`, and `column-rule-color`
- `background-image`
