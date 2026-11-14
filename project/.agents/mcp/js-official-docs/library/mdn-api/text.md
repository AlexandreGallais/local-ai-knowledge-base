---
title: "Text"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/text/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Text

The **`Text`** interface represents a text `node` in a DOM tree.

To understand what a text node is, consider the following document:

```html
<html lang="en" class="e">
  <head>
    <title>Aliens?</title>
  </head>
  <body>
    Why yes.
  </body>
</html>
```

In that document, there are five text nodes, with the following contents (all spaces are shown as `◦` and all newlines as `⏎`):

- `"⏎◦◦◦◦"` (after the `<head>` start tag, a newline followed by four spaces)
- `"Aliens?"` (the contents of the `<title>` element)
- `"⏎◦◦"` (after the `</title>` end tag, a newline followed by two spaces)
- `"⏎◦◦"` (after the `</head>` end tag, a newline followed by two spaces)
- `"⏎◦◦◦◦Why◦yes.⏎◦◦⏎"` (the contents of the `<body>` element)

Each of those text nodes is an object that has the properties and methods documented in this article.

## Constructor

- `Text()`
    Returns a new `Text` node with the parameter as its textual content.

## Instance properties

_Inherits properties from its parents, `CharacterData`, `Node`, and `EventTarget`._

- `Text.assignedSlot` (read-only)
    Returns a `HTMLSlotElement` representing the `<slot>` the node is inserted in.
- `Text.wholeText` (read-only)
    Returns a string containing the text of all `Text` nodes logically adjacent to this `Node`, concatenated in document order.

## Instance methods

_Inherits methods from its parent, `CharacterData`, `Node`, and `EventTarget`._

- `Text.splitText`
    Breaks the node into two nodes at a specified offset.

## See also

- The DOM API
