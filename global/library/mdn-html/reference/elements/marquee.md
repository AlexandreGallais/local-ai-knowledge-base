---
title: "`<marquee>` HTML marquee element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/marquee/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<marquee>` HTML marquee element

The **`<marquee>`** HTML element is used to insert a scrolling area of text. You can control what happens when the text reaches the edges of its content area using its attributes.

The HTML `<marquee>` element is deprecated and its use is strongly discouraged. If you must create the effect of scrolling text or continuous elements, consider using CSS animations with CSS transforms instead of `<marquee>` elements to smoothly animate content. Additionally, include the `@media/prefers-reduced-motion` CSS `@media` query to stop the animation based on user preference, thereby improving user experience and accessibility.

## Attributes

- `behavior` (deprecated)
    Sets how the text is scrolled within the marquee. Possible values are `scroll`, `slide` and `alternate`. If no value is specified, the default value is `scroll`.
- `bgcolor` (deprecated)
    Sets the background color through color name or hexadecimal value.
- `direction` (deprecated)
    Sets the direction of the scrolling within the marquee. Possible values are `left`, `right`, `up` and `down`. If no value is specified, the default value is `left`.
- `height` (deprecated) (non-standard)
    Sets the height in pixels or percentage value.
- `hspace` (deprecated) (non-standard)
    Sets the horizontal margin
- `loop` (deprecated)
    Sets the number of times the marquee will scroll. If no value is specified, the default value is −1, which means the marquee will scroll continuously.
- `scrollamount` (deprecated) (non-standard)
    Sets the amount of scrolling at each interval in pixels. The default value is 6.
- `scrolldelay` (deprecated) (non-standard)
    Sets the interval between each scroll movement in milliseconds. The default value is 85. Note that any value smaller than 60 is ignored and the value 60 is used instead unless `truespeed` is specified.
- `truespeed` (deprecated)
    By default, `scrolldelay` values lower than 60 are ignored. If `truespeed` is present, those values are not ignored.
- `vspace` (deprecated) (non-standard)
    Sets the vertical margin in pixels or percentage value.
- `width` (deprecated) (non-standard)
    Sets the width in pixels or percentage value.

## Examples

```html
<marquee>This text will scroll from right to left</marquee>

<marquee direction="up">This text will scroll from bottom to top</marquee>

<marquee
  direction="down"
  width="250"
  height="200"
  behavior="alternate"
  class="outlined">
  <marquee behavior="alternate">This text will bounce</marquee>
</marquee>
```

```css
.outlined {
  border: solid;
}
```

## Technical summary

       | DOM interface
       | `HTMLMarqueeElement`

## See also

- CSS `transform` property
- CSS `translate` property
- CSS transforms module
- CSS animations module
- `HTMLMarqueeElement`
