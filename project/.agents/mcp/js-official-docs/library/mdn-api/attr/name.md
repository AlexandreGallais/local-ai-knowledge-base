---
title: "Attr: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/attr/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Attr: name property

The read-only **`name`** property of the `Attr` interface returns the _qualified name_ of an attribute, that is the name of the attribute, with the namespace prefix, if any, in front of it. For example, if the local name is `lang` and the namespace prefix is `xml`, the returned qualified name is `xml:lang`.

The qualified name is always in lower case, whatever case at the attribute creation.

## Value

A string representing the attribute's qualified name.

## Example

The following example displays the qualified name of the first attribute of the two first elements, when we click on the appropriate button.

### HTML

```html
<svg xml:lang="en-US" class="struct" height="1" width="1">Click me</svg>
<label xml:lang="en-US" class="struct"></label>

<p>
  <button>Show value for &lt;svg&gt;</button>
  <button>Show value for &lt;label&gt;</button>
</p>

<p>
  Qualified name of the attribute <code>xml:lang</code>:
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
    outputEl.value = attribute.name;
  });
  i++;
}
```

## See also

- The properties `Attr.localName`, returning the local part of the qualified name of the attribute, and `Attr.prefix`, the namespace prefix.
- The `Element.tagName()` property, returning the qualified name of an `Element`.
