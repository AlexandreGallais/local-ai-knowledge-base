---
title: "`itemref` HTML global attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/global_attributes/itemref/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `itemref` HTML global attribute

Properties that are not descendants of an element with the `itemscope` attribute can be associated with an item using the global attribute **`itemref`**.

`itemref` provides a list of element IDs (not `itemid`s) elsewhere in the document, with additional properties

The `itemref` attribute can only be specified on elements that have an `itemscope` attribute specified.

> **Note:**
> The `itemref` attribute is not part of the microdata data model. It is merely a syntactic construct to aid authors in adding annotations to pages where the data to be annotated does not follow a convenient tree structure. For example, it allows authors to mark up data in a table so that each column defines a separate item while keeping the properties in the cells.

## Examples

### Representing structured data for a band

This example uses microdata attributes to represent the following structured data (in JSON-LD format):

```json
{
  "@id": "amanda",
  "name": "Amanda",
  "band": {
    "@id": "b",
    "name": "Jazz Band",
    "size": 12
  }
}
```

#### HTML

```html
<div itemscope id="amanda" itemref="a b"></div>
<p id="a">Name: <span itemprop="name">Amanda</span></p>
<div id="b" itemprop="band" itemscope itemref="c"></div>
<div id="c">
  <p>Band: <span itemprop="name">Jazz Band</span></p>
  <p>Size: <span itemprop="size">12</span> players</p>
</div>
```

#### Result

## See also

- Other different global attributes
- Other microdata related global attributes:
  - `itemid`
  - `itemprop`
  - `itemscope`
  - `itemtype`
