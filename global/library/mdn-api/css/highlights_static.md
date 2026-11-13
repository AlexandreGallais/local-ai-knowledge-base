---
title: "CSS: highlights static property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/css/highlights_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS: highlights static property

The static, read-only **`highlights`** property of the `CSS` interface provides access to the `HighlightRegistry` used to style arbitrary text ranges using the `CSS Custom Highlight API`.

## Value

The `HighlightRegistry` object.

## Examples

The following example demonstrates creating multiple text ranges, then creating a `Highlight` object for them, registering this highlight in the `HighlightRegistry`, and finally styling the text ranges using the `::highlight()` pseudo-element.

```js
const parentNode = document.getElementById("foo");

const range1 = new Range();
range1.setStart(parentNode, 10);
range1.setEnd(parentNode, 20);

const range2 = new Range();
range2.setStart(parentNode, 40);
range2.setEnd(parentNode, 60);

const myCustomHighlight = new Highlight(range1, range2);

CSS.highlights.set("my-custom-highlight", myCustomHighlight);
```

```css
::highlight(my-custom-highlight) {
  background-color: yellow;
  color: black;
}
```

## See also

- `The CSS Custom Highlight API`
- CSS custom highlight API module
- CSS Custom Highlight API: The Future of Highlighting Text Ranges on the Web
