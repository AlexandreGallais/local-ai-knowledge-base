---
title: "HighlightRegistry: size property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/highlightregistry/size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HighlightRegistry: size property

The **`size`** property returns the number of `Highlight` objects in the `HighlightRegistry`.

## Value

A read-only integer indicating how many `Highlight` objects the registry contains.

## Examples

### Using size

```js
const highlight1 = new Highlight();
const highlight2 = new Highlight();

CSS.highlights.set("highlight-1", highlight1);
CSS.highlights.set("highlight-2", highlight2);

console.log(CSS.highlights.size); // 2
```

## See also

- `The CSS Custom Highlight API`
- CSS Custom Highlight API: The Future of Highlighting Text Ranges on the Web
