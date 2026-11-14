---
title: "CSS generated content"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/generated_content/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS generated content

The **CSS generated content** module defines how an element's content can be replaced and content can be added to a document with CSS.

Generated content can be used for content replacement, in which case the content of a DOM node is replaced with a CSS `<image>`. The CSS generated content also enables generating language-specific quotes, creating custom list item numbers and bullets, and visually adding content by generating content on select pseudo-elements as anonymous replaced elements.

## Generated content in action

```html
<div></div>
```

```css
body,
div {
  background-repeat: no-repeat;
}
body {
  background-image: linear-gradient(#3a67ab, #e8f6ff 100%);
}
div {
  position: relative;
  width: 400px;
  height: 400px;
  background-image:
    linear-gradient(
      115deg,
      transparent 48%,
      brown,
      #996600,
      brown,
      transparent 52%
    ),
    linear-gradient(
      60deg,
      transparent 48%,
      brown,
      #996600,
      brown,
      transparent 52%
    ),
    radial-gradient(
      circle 10px at 50% 50%,
      #333333 30%,
      #999999 50%,
      transparent 50%
    ),
    radial-gradient(
      circle 10px at 50% 50%,
      #333333 30%,
      #999999 50%,
      transparent 50%
    ),
    radial-gradient(circle at 50% 50%, white 30%, #eeeeee 50%, transparent 50%),
    radial-gradient(circle at 50% 50%, white 30%, #eeeeee 50%, transparent 50%),
    radial-gradient(circle at 50% 50%, white 30%, #eeeeee 50%, transparent 50%);
  background-size:
    100px 100px,
    100px 100px,
    15px 15px,
    15px 15px,
    200px 200px,
    300px 300px,
    400px 400px;
  background-position:
    95% 120px,
    5% 120px,
    46% 80px,
    54% 80px,
    50% 0,
    50% 90px,
    50% 220px;
}
div::after {
  content: "";
  border: transparent solid 4px;
  border-left: orange 30px solid;
  height: 1px;
  width: 1px;
  position: absolute;
  left: 50%;
  top: 100px;
}

div::before {
  content: "Only one <div>";
  font-size: min(6vh, 2rem);
  justify-content: center;
  display: flex;
  font-family: "Comic Sans", "Papyrus", sans-serif;
}
```

The HTML for this sample is a single, empty `` inside an otherwise empty `<body>`. The snowman was created with CSS images and CSS backgrounds and borders. The carrot nose was added using generated content: an empty box with a wide orange left border added to the `::before` pseudo-element. The text is also generated content: "only one <div>" was generated with the `content` property applied to the `::after` pseudo-element.

Click "Play" in the example above to see or edit the code in the MDN Playground.

## Reference

### Properties

- `content`
- `quotes`

The CSS generated content module also introduces four at-risk properties: `string-set`, `bookmark-label`, `bookmark-level`, and `bookmark-state`. Currently, no browsers support these features.

### Functions

The CSS generated content module introduces six yet-to-be implemented CSS functions including `content()`, `string()`, and `leader()`, and the three `<target>` functions `target-counter()`, `target-counters()`, and `target-text()`.

### Data types

- `<content-list>`
- `<content-replacement>` (see `image`)
- `image`
- `<counter>`
- `<quote>`
- `<target>`

## Guides

- "How to" guide for generated content
    Learn how to add text or image content to a document using the `content` property.

- Create fancy boxes with generated content
    Example of styling generated content for visual effects.

## Related concepts

- CSS pseudo-elements module
  - `::before` pseudo-element
  - `::after` pseudo-element
  - `::marker` pseudo-element

- CSS lists and counters module
  - `counter()` function
  - `counters()` function
  - `counter-increment` property
  - `counter-reset` property

- CSS overflow module
  - `::scroll-button()` pseudo-element
  - `::scroll-marker` pseudo-element
  - `:target-current` pseudo-class

- CSS values and units module
  - `attr()` function
  - `string` data type
  - `image` data type

## See also

- CSS pseudo-elements module
- CSS lists and counters module
- Replaced elements
