---
title: "Node: baseURI property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/node/baseuri/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Node: baseURI property

The read-only **`baseURI`** property of the `Node` interface
returns the absolute base URL of the document containing the node.

The base URL is used to resolve relative URLs when the browser needs to obtain an absolute URL, for example when processing the HTML `` element's `src` attribute or the `xlink:href` (deprecated) or `href` attributes in SVG.

Although this property is read-only, its value is determined by an algorithm each time
the property is accessed, and may change if the conditions changed.

The base URL is determined as follows:

1. By default, the base URL is the location of the document (as determined by `window.location`).
2. If it is an HTML Document and there is a `<Base>` element in the document,
   the `href` value of the _first_ `Base` element with such an attribute is used instead.

## Value

A string representing the base URL of the `Node`.

## Examples

### Without \<base>

```html
<output>Not calculated</output>
```

```js
const output = document.querySelector("output");
output.value = output.baseURI;
```

### With \<base>

```html
<base href="https://developer.mozilla.org/modified_base_uri/" />
<output>Not calculated</output>
```

```js
const output = document.querySelector("output");
output.value = output.baseURI;
```

## See also

- `<base>` element.
