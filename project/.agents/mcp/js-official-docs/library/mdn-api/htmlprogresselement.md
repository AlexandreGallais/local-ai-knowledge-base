---
title: "HTMLProgressElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlprogresselement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLProgressElement

The **`HTMLProgressElement`** interface provides special properties and methods (beyond the regular `HTMLElement` interface it also has available to it by inheritance) for manipulating the layout and presentation of `<progress>` elements.

## Instance properties

_Inherits properties from its parent, `HTMLElement`._

- `HTMLProgressElement.max`
    A `double` value reflecting the content attribute of the same name, limited to numbers greater than zero. Its default value is `1.0`.
- `HTMLProgressElement.position` (read-only)
    Returns a `double` value returning the result of dividing the current value (`value`) by the maximum value (`max`); if the progress bar is an indeterminate progress bar, it returns `-1`.
- `HTMLProgressElement.value`
    A `double` value that reflects the current value; if the progress bar is an indeterminate progress bar, it returns `0`.
- `HTMLProgressElement.labels` (read-only)
    Returns `NodeList` containing the list of `` elements that are labels for this element.

## Instance methods

_No specific method; inherits methods from its parent, `HTMLElement`._

## See also

- The HTML element implementing this interface: `<progress>`
