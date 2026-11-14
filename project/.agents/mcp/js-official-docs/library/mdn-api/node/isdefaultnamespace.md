---
title: "Node: isDefaultNamespace() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/node/isdefaultnamespace/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Node: isDefaultNamespace() method

The **`isDefaultNamespace()`** method of the `Node` interface accepts a namespace URI as an argument.
It returns a boolean value that is `true` if the namespace is the default namespace on the given node and `false` if not. The default namespace can be retrieved with `Node.lookupNamespaceURI()` by passing `null` as the argument.

## Syntax

```js
isDefaultNamespace(namespaceURI)
```

### Parameters

- `namespaceURI`
    A string representing the namespace against which the element will be checked. The empty string is equivalent to `null`.
    > **Note:**
    > `namespaceURI` is not an optional parameter, but can be `null`.

### Return value

A boolean value that holds the return value `true` or `false`, indicating if the parameter is the default namespace, or not. It is equivalent to `node.lookupNamespaceURI(null) === namespaceURI`.

## Example

> **Note:**
> This example runs in an HTML document, where `xmlns:` attributes are ignored (except `xmlns:xlink`). Firefox sets all elements' namespace URI to `null`, while Chrome and Safari appropriately set HTML, SVG, and MathML elements' default namespace URIs. If you want to conduct more meaningful tests, you can open a standalone SVG document and execute scripts in its context.

```html
<div class="hidden">
  <div>Test HTML element</div>
  <svg>
    <text>Test SVG element</text>
  </svg>
  <svg xmlns:xlink="http://www.w3.org/1999/xlink" id="with-xlink">
    <text>Test SVG element with xlink</text>
  </svg>
  <math>Test MathML element</math>
</div>

<table>
  <thead>
    <tr>
      <th><code>namespaceURI</code></th>
      <th><code>&lt;div&gt;</code></th>
      <th><code>&lt;svg&gt;</code></th>
      <th><code>&lt;svg xmlns:xlink&gt;</code></th>
      <th><code>&lt;math&gt;</code></th>
    </tr>
  </thead>
  <tbody></tbody>
</table>
```

```css
.hidden {
  display: none;
}
```

```js
const htmlElt = document.querySelector("div");
const svgElt = document.querySelector("svg");
const svgEltXLink = document.querySelector("#with-xlink");
const mathElt = document.querySelector("math");

const tbody = document.querySelector("tbody");

for (const uri of [
  "http://www.w3.org/2000/xmlns/",
  "http://www.w3.org/XML/1998/namespace",
  "http://www.w3.org/1999/xhtml",
  "http://www.w3.org/2000/svg",
  "http://www.w3.org/1999/xlink",
  "http://www.w3.org/1998/Math/MathML",
  "",
  null,
]) {
  const row = document.createElement("tr");
  tbody.appendChild(row);
  row.appendChild(document.createElement("td")).textContent =
    JSON.stringify(uri);
  for (const el of [htmlElt, svgElt, svgEltXLink, mathElt]) {
    console.log(el, uri, el.isDefaultNamespace(uri));
    row.appendChild(document.createElement("td")).textContent = String(
      el.isDefaultNamespace(uri),
    );
  }
}
```

## See also

- `Node.lookupNamespaceURI`
- `Node.lookupPrefix`
