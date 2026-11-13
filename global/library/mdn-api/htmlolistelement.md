---
title: "HTMLOListElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlolistelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLOListElement

The **`HTMLOListElement`** interface provides special properties (beyond those defined on the regular `HTMLElement` interface it also has available to it by inheritance) for manipulating ordered list elements.

## Instance properties

_Inherits properties from its parent, `HTMLElement`._

- `HTMLOListElement.reversed`
    A boolean value reflecting the `reversed` and defining if the numbering is descending, that is its value is `true`, or ascending (`false`).
- `HTMLOListElement.start`
    A `long` value reflecting the `start` and defining the value of the first number of the first element of the list.
- `HTMLOListElement.type`
    A string value reflecting the `type` and defining the kind of marker to be used to display. It can have the following values:
    - `'1'` meaning that decimal numbers are used: `1`, `2`, `3`, `4`, `5`, …
    - `'a'` meaning that the lowercase latin alphabet is used: `a`, `b`, `c`, `d`, `e`, …
    - `'A'` meaning that the uppercase latin alphabet is used: `A`, `B`, `C`, `D`, `E`, …
    - `'i'` meaning that the lowercase latin numerals are used: `i`, `ii`, `iii`, `iv`, `v`, …
    - `'I'` meaning that the uppercase latin numerals are used: `I`, `II`, `III`, `IV`, `V`, …

- `HTMLOListElement.compact` (deprecated)
    A boolean value indicating that spacing between list items should be reduced. This property reflects the `compact` attribute only, it doesn't consider the `line-height` CSS property used for that behavior in modern pages.

## Instance methods

_No specific method; inherits methods from its parent, `HTMLElement`._

## See also

- The HTML element implementing this interface: ``.
