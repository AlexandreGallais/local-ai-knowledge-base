---
title: "Highlight: size property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/highlight/size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Highlight: size property

The **`size`** property returns the number of `AbstractRange` objects in a
`Highlight` object.

## Value

The value of `size` is a read-only integer representing how many entries the highlight object has.

## Examples

### Using size

```js
const highlight = new Highlight();
highlight.add(range1);
highlight.add(range2);
highlight.add(range3);

console.log(highlight.size); // 3
```

## See also

- `The CSS Custom Highlight API`
- CSS Custom Highlight API: The Future of Highlighting Text Ranges on the Web
