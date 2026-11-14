---
title: "Highlight: Highlight() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/highlight/highlight/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Highlight: Highlight() constructor

The **`Highlight()`** constructor returns a newly created
`Highlight` object which can hold a collection of `AbstractRange` objects to be styled using the `CSS Custom Highlight API`.

## Syntax

```js
new Highlight()
new Highlight(range)
new Highlight(range1, range2, /* …, */ rangeN)
```

### Parameters

- `range1`, …, `rangeN` (optional)
    One or more initial `AbstractRange` objects to add in the new highlight.

### Return value

A new `Highlight` object.

## Examples

The example code below demonstrates how to create an empty highlight object, and then add ranges to it:

```js
const highlight = new Highlight();
highlight.add(range1);
highlight.add(range2);
```

The example code below demonstrates how to create a new highlight object and add ranges to it during instantiation:

```js
const highlight = new Highlight(range1, range2);
```

## See also

- `The CSS Custom Highlight API`
- CSS custom highlight API module
- CSS Custom Highlight API: The Future of Highlighting Text Ranges on the Web
