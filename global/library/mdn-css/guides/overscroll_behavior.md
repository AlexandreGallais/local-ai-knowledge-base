---
title: "CSS overscroll behavior"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/overscroll_behavior/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS overscroll behavior

The **CSS overscroll behavior** module provides properties to control the behavior of a scroll container when its scroll position reaches the scroll boundary. Controlling this aspect is particularly useful in scenarios where embedded scrollable areas should not trigger scrolling of the parent container.

When commenting on a blog, you might notice that if your comment exceeds the length of the provided `<textarea>`, scrolling beyond the end of the text area causes the entire blog to scroll. This is because reaching the end of a scrollable area, known as the scroll boundary, can lead to scrolling other content or the entire page. This continuous scrolling experience is called scroll chaining.

In situations where the contents of an element are larger than its container and `overflow` allows or defaults to scrolling (like in `<textarea>`), continued scrolling past the element's scrollable area will initiate scrolling in the parent element or the underlying page.

Conversely, scrolling through a website's terms and conditions and reaching the end of the content to enable a checkbox, may not force the page to scroll or bounce (as on a phone). This example shows that you can control overscroll behavior and prevent scroll chaining.

This module defines the overscroll behavior, enabling you to specify the actions when a user scrolls beyond the boundaries of a scrollable element.

## Reference

### CSS properties

- `overscroll-behavior` shorthand
- `overscroll-behavior-block`
- `overscroll-behavior-inline`
- `overscroll-behavior-x`
- `overscroll-behavior-y`

### Glossary terms

- Scroll boundary
- Scroll chaining

## Guides

- Learn: Overflowing content
    Learn what overflow is and how to manage it.

## Related concepts

- `scrollbar` ARIA role
- Containing block concept
- CSS overflow module:
  - `overflow` shorthand property
    - `overflow-x`
    - `overflow-y`
    - `overflow-block`
    - `overflow-inline`
  - `overflow-clip-margin` property
  - `scroll-behavior` property
  - `text-overflow` property
- Scroll container and scrollport glossary terms

- CSS scroll snap module:
  - `scroll-padding` shorthand property
  - `scroll-snap-type` property
  - `scroll-margin` shorthand property
  - `scroll-snap-stop` property
  - `scroll-snap-align` property

- CSSOM view module:
  - `Element.getBoundingClientRect()` method
  - `Element.scroll()` method
  - `Element.scrollBy()` method
  - `Element.scrollIntoView()` method
  - `Element.scrollTo()` method
  - `scroll` Document event

## See also

- CSS scroll anchoring module
- CSS scroll snap module
- CSS box model module
- CSS logical properties and values module
