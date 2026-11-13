---
title: "Determining the dimensions of elements"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/css_object_model/determining_the_dimensions_of_elements/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Determining the dimensions of elements

There are several properties you can look at in order to determine the width and height of elements, and it can be tricky to determine which is the right one for your needs. This article is designed to help you make that decision. Note that all these properties are read-only. If you want to set the width and height of an element, use `width` and `height` or the overriding `min-width` and `max-width`, and `min-height` and `max-height` properties.

## How much room does it use up?

If you need to know the total amount of space an element occupies, including the width of the visible content, scrollbars (if any), padding, and border, you want to use the `HTMLElement.offsetWidth` and `HTMLElement.offsetHeight` properties. Most of the time these are the same as width and height of `Element.getBoundingClientRect()`, when there aren't any transforms applied to the element. In case of transforms, the `offsetWidth` and `offsetHeight` returns the element's layout width and height, while `getBoundingClientRect()` returns the rendering width and height. As an example, if the element has `width: 100px;` and `transform: scale(0.5);` the `getBoundingClientRect()` will return 50 as the width, while `offsetWidth` will return 100. Another difference is that `offsetWidth` and `offsetHeight` round the values to integers, while `getBoundingClientRect()` provides more precise decimal point values.

## What's the size of the displayed content?

If you need to know how much space the actual displayed content takes up, including padding but not including the border, margins, or scrollbars, you want to use the `Element.clientWidth` and `Element.clientHeight` properties:

## How big is the content?

If you need to know the actual size of the content, regardless of how much of it is currently visible, you need to use the `Element.scrollWidth` and `Element.scrollHeight` properties. These return the width and height of the entire content of an element, even if only part of it is presently visible due to the use of scroll bars.

For example, if a 600x400 pixel element is being displayed inside a 300x300 pixel scroll container, `scrollWidth` will return 600 while `scrollHeight` will return 400.

## See also

- The CSSOM View Module specification
- MSDN: Measuring Element Dimension and Location
