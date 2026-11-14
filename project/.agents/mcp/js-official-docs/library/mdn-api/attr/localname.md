---
title: "Attr: localName property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/attr/localname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Attr: localName property

The read-only **`localName`** property of the `Attr` interface returns the _local part_ of the _qualified name_ of an attribute, that is the name of the attribute, stripped from any namespace in front of it. For example, if the qualified name is `xml:lang`, the returned local name is `lang`, if the element supports that namespace.

The local name is always in lower case, whatever case at the attribute creation.

> **Note:**
> HTML only supports a fixed set of namespaces on SVG and MathML elements. These are `xml` (for the `xml:lang` attribute), `xlink` (for the `xlink:href`, `xlink:show`, `xlink:target` and `xlink:title` attributes) and `xpath`.
>
> That means that the local name of an attribute of an HTML element is always be equal to its qualified name: Colons are treated as regular characters. In XML, like in SVG or MathML, the colon denotes the end of the prefix and what is before is the namespace; the local name may be different from the qualified name.

## Value

A string representing the local part of the attribute's qualified name.

## Example

The following example displays the local name of the first attribute of the two first elements, when we click on the appropriate button. The `` element is XML and supports namespaces leading to the local name (`lang`) to be different from the qualified name `xml:lang`. The `` element is HTML, that doesn't support namespaces, leading to a local name and the qualified name to be both `xml:lang`.

### HTML

```html
<svg xml:lang="en-US" class="struct" height="1" width="1">Click me</svg>
<label xml:lang="en-US" class="struct"></label>

<p>
  <button>Show value for &lt;svg&gt;</button>
  <button>Show value for &lt;label&gt;</button>
</p>

<p>
  Local part of the attribute <code>xml:lang</code>:
  <output id="result">None.</output>
</p>
```

### JavaScript

```js
const elements = document.querySelectorAll(".struct");
const buttons = document.querySelectorAll("button");
const outputEl = document.querySelector("#result");

let i = 0;
for (const button of buttons) {
  const element = elements[i];
  button.addEventListener("click", () => {
    const attribute = element.attributes[0];
    outputEl.value = attribute.localName;
  });
  i++;
}
```

## See also

- The properties `Attr.name`, returning the qualified name of the attribute, and `Attr.prefix`, the namespace prefix.
- The `Element.localName()` property, returning the local name of an `Element`.
