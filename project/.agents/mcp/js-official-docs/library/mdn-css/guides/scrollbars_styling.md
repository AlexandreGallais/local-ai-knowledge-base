---
title: "CSS scrollbars styling"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/scrollbars_styling/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS scrollbars styling

The **CSS scrollbars styling** module defines properties that you can use for visual styling of scrollbars. You can customize the scrollbar width as needed. You can also customize the scrollbar _track_ color (the background) and the scrollbar _thumb_ color (the draggable handle).

## Scrollbar styling in action

This example defines a thin scrollbar with a teal thumb and lighter teal track. To see the thumb, scroll the text. After the scrollbar is visible, hover over it to see the track.

```css
.poem {
  width: 300px;
  height: 100px;
  border: 1px solid;
}
```

```css
.poem {
  overflow: scroll;
  scrollbar-color: #0b4f4a #5f9e98;
  scrollbar-width: thin;
}
```

```html
<blockquote class="poem">
  <h3>A Small Needful Fact</h3>
  <pre>
Is that Eric Garner worked
for some time for the Parks and Rec.
Horticultural Department, which means,
perhaps, that with his very large hands,
perhaps, in all likelihood,
he put gently into the earth
some plants which, most likely,
some of them, in all likelihood,
continue to grow, continue
to do what such plants do, like house
and feed small and necessary creatures,
like being pleasant to touch and smell,
like converting sunlight
into food, like making it easier
for us to breathe.
</pre>
  <p>
    - <a href="https://onbeing.org/poetry/a-small-needful-fact/">Ross Gay</a>
  </p>
</blockquote>
```

> **Note:**
> When customizing scrollbars, ensure that the thumb and track have enough contrast with the surrounding background. Also ensure that the scrollbar hit area is large enough for people who use touch input.

## Reference

### CSS properties

- `scrollbar-width`
- `scrollbar-color`

## Related concepts

- `overflow-block` CSS property
- `overflow-inline` CSS property
- `overflow-x` CSS property
- `overflow-y` CSS property
- `overflow` CSS shorthand property
- `overflow-clip-margin` CSS property
- `scrollbar-gutter` CSS property
- `scroll-behavior` CSS property
- `scroll-margin` CSS shorthand property
- `scroll-padding` CSS shorthand property
- `scroll-snap-align` CSS property
- `scroll-snap-stop` CSS property
- `scroll-snap-type` CSS property
- `::-webkit-scrollbar` pseudo-element
- scroll container glossary term
- `scrollbar` ARIA role

## See also

- `scroll-timeline`, `scroll-timeline-axis`, `scroll-timeline-name`
- CSS overflow module
- CSS scroll snap module
