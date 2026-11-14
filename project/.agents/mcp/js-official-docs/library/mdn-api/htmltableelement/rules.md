---
title: "HTMLTableElement: rules property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltableelement/rules/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableElement: rules property

The **`HTMLTableElement.rules`** property indicates which cell
borders to render in the table.

## Value

One of the following:

- `none`
    No rules
- `groups`
    Lines between groups only
- `rows`
    Lines between rows
- `cols`
    Lines between cols
- `all`
    Lines between all cells

## Examples

```js
// Turn on all the internal borders of a table
const t = document.getElementById("TableID");
t.rules = "all";
```
