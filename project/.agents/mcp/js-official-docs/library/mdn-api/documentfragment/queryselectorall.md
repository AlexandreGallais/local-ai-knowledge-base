---
title: "DocumentFragment: querySelectorAll() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/documentfragment/queryselectorall/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DocumentFragment: querySelectorAll() method

The **`DocumentFragment.querySelectorAll()`** method returns a
`NodeList` of elements within the `DocumentFragment` (using
depth-first pre-order traversal of the document's nodes) that matches the specified
group of selectors.

If the selectors specified in parameter are invalid a `DOMException` with
a `SYNTAX_ERR` value is raised.

## Syntax

```js
querySelectorAll(selectors)
```

### Parameters

- `selectors`
    A string containing one or more CSS selectors separated by
    commas.

### Return value

A non-live `NodeList` containing one `Element` object for
each element that matches at least one of the specified selectors or an empty
`NodeList` in case of no matches.

## Examples

This example returns a list of all `div` elements within the
`DocumentFragment` with a class of either `note` or
`alert`:

```js
const matches = documentFrag.querySelectorAll("div.note, div.alert");
```

## See also

- The `DocumentFragment` interface it belongs to.
