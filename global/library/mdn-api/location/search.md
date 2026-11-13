---
title: "Location: search property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/location/search/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Location: search property

The **`search`** property of the `Location` interface is a search string, also called a _query string_, that is a string containing a `"?"` followed by the parameters of the location's URL. If the URL does not have a search query, this property contains an empty string, `""`.

This property can be set to change the query string of the URL. When setting, a single `"?"` prefix is added to the provided value, if not already present. Setting it to `""` removes the query string.

The query is percent-encoded when setting but not percent-decoded when reading.

Modern browsers provide
`URLSearchParams`
and
`URL.searchParams`
to make it easy to parse out the parameters from the querystring.

See `URL.search` for more information.

## Value

A string.

## Examples

```js
// Let an <a id="myAnchor" href="/en-US/docs/Location.search?q=123"> element be in the document
const anchor = document.getElementById("myAnchor");
const queryString = anchor.search; // Returns:'?q=123'

// Further parsing:
const params = new URLSearchParams(queryString);
const q = parseInt(params.get("q"), 10); // is the number 123
```
