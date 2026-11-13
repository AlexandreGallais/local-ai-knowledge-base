---
title: "HTMLAreaElement: search property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlareaelement/search/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAreaElement: search property

The **`search`** property of the `HTMLAreaElement` interface is a search string, also called a _query string_, that is a string containing a `"?"` followed by the parameters of the `<area>` element's `href`. If the URL does not have a search query, this property contains an empty string, `""`.

This property can be set to change the query string of the URL. When setting, a single `"?"` prefix is added to the provided value, if not already present. Setting it to `""` removes the query string.

The query is percent-encoded when setting but not percent-decoded when reading.

Modern browsers provide
`URLSearchParams`
and
`URL.searchParams`
to make it easy to parse out the parameters from the query string.

See `URL.search` for more information.

## Value

A string.

## Examples

### Getting the search string from an area link

```js
// An <area id="myArea" href="/en-US/docs/HTMLAreaElement?q=123"> element is in the document
const area = document.getElementById("myArea");
area.search; // returns '?q=123'
```

### Advanced parsing using URLSearchParams

Alternatively, `URLSearchParams` can be used:

```js
let params = new URLSearchParams(queryString);
let q = parseInt(params.get("q"), 10); // returns the number 123
```

## See also

- The `HTMLAreaElement` interface it belongs to.
