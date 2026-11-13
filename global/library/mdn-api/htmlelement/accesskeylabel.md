---
title: "HTMLElement: accessKeyLabel property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/accesskeylabel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: accessKeyLabel property

The **`HTMLElement.accessKeyLabel`**
read-only property returns a string containing the element's
browser-assigned access key (if any); otherwise it returns an empty string.

## Example

### HTML

```html
<button accesskey="h" title="Caption" id="btn1">Hover me</button>
```

### JavaScript

```js
const btn = document.getElementById("btn1");
const shortcutLabel = btn.accessKeyLabel || btn.accessKey;
btn.title += ` [${shortcutLabel.toUpperCase()}]`;

btn.onclick = () => {
  const feedback = document.createElement("output");
  feedback.textContent = "Pressed!";
  btn.insertAdjacentElement("afterend", feedback);
};
```

## See also

- `HTMLElement.accessKey`
- The accesskey <example-value>
  attribute.
