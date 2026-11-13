---
title: "HTMLAnchorElement: search property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlanchorelement/search/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAnchorElement: search property

The **`search`** property of the `HTMLAnchorElement` interface is a search string, also called a _query string_, that is a string containing a `"?"` followed by the parameters of the `` element's `href`. If the URL does not have a search query, this property contains an empty string, `""`.

This property can be set to change the query string of the URL. When setting, a single `"?"` prefix is added to the provided value, if not already present. Setting it to `""` removes the query string.

The query is percent-encoded when setting but not percent-decoded when reading.

The `URL.searchParams` property is a `URLSearchParams` object that enables parsing the parameters from the query string. See also `URL.search`.

## Value

A string.

## Examples

### Getting the search string from an anchor link

```js
// An <a id="myAnchor" href="/en-US/docs/HTMLAnchorElement?q=123"> element is in the document
const anchor = document.getElementById("myAnchor");
anchor.search; // returns '?q=123'
```

### Advanced parsing using URLSearchParams

Alternatively, `URLSearchParams` can be used:

```js
let params = new URLSearchParams(queryString);
let q = parseInt(params.get("q"), 10); // returns the number 123
```

## See also

- The `HTMLAnchorElement` interface it belongs to.
