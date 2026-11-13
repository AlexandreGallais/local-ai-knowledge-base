---
title: "media"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/media/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# media

The **`media`** attribute specifies a media query that must be matched for a style sheet to apply.

You can use this attribute with the following SVG elements:

- `<style>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 240 220" xmlns="http://www.w3.org/2000/svg">
  <style>
    rect {
      fill: black;
    }
  </style>
  <style media="(width >= 600px)">
    rect {
      fill: seagreen;
    }
  </style>

  <text y="15">Resize the window to see the effect</text>
  <rect y="20" width="200" height="200" />
</svg>
```

## Usage notes

       | Value
       |
        <code
          >&#x3C;media-query-list></code
        >

       | Default value
       | `all`

       | Animatable
       | No

- `<media-query-list>`
    This value holds a media query that needs to match in order for the style sheet to be applied.

    If not specified, the style sheet is applied unconditionally.
