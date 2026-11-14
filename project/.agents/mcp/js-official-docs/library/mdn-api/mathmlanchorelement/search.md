---
title: "MathMLAnchorElement: search property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mathmlanchorelement/search/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MathMLAnchorElement: search property

The **`search`** property of the `MathMLAnchorElement` interface is a search string, also called a _query string_, that is a string containing a `"?"` followed by the parameters of the `` element's `href`. If the URL does not have a search query, this property contains an empty string, `""`.

This property can be set to change the query string of the URL. When setting, a single `"?"` prefix is added to the provided value, if not already present. Setting it to `""` removes the query string.

The query is percent-encoded when setting but not percent-decoded when reading.

The `URL.searchParams` property is a `URLSearchParams` object that enables parsing the parameters from the query string. See also `URL.search`.

## Value

A string.

## Examples

### Basic usage

Given this MathML:

```html
<math>
  <a id="myAnchor" href="https://example.com/subsection?q=123"> ... </a>
</math>
```

you can get the `search` string of the anchor like this:

```js
const mathAnchor = document.getElementById("myAnchor");
mathAnchor.search; // returns '?q=123'
```

## See also

- The MathML `` element
