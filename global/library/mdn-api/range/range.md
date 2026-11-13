---
title: "Range: Range() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/range/range/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Range: Range() constructor

The **`Range()`** constructor returns a newly created
`Range` object whose start and end are offset 0 of the global `document`
object.

## Syntax

```js
new Range()
```

### Parameters

None.

## Examples

In this example we create a new range with the `Range()` constructor, and
set its beginning and end positions using the `Range.setStartBefore()` and
`Range.setEndAfter()` methods. We then select the range using
`window.getSelection()` and `Selection.addRange()`.

### HTML

```html
<p>First paragraph.</p>
<p>Second paragraph.</p>
<p>Third paragraph.</p>
<p>Fourth paragraph.</p>
```

### JavaScript

```js
const paragraphs = document.querySelectorAll("p");

// Create new range
const range = new Range();

// Start range at second paragraph
range.setStartBefore(paragraphs[1]);

// End range at third paragraph
range.setEndAfter(paragraphs[2]);

// Get window selection
const selection = window.getSelection();

// Add range to window selection
selection.addRange(range);
```

## See also

- The DOM interfaces index
- `Document.createRange()`
- CSS custom highlight API module
