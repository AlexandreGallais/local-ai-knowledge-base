---
title: "HTMLElement: isContentEditable property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/iscontenteditable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: isContentEditable property

The **`HTMLElement.isContentEditable`** read-only property
returns a boolean value that is `true` if the contents of the element
are editable; otherwise it returns `false`.

## Value

A boolean value.

## Examples

### HTML

```html
<p id="firstParagraph">Uneditable Paragraph</p>
<p id="secondParagraph" contenteditable="true">Editable Paragraph</p>

<p id="infoText1">Is the first paragraph editable?</p>
<p id="infoText2">Is the second paragraph editable?</p>
```

### JavaScript

```js
const firstParagraph = document.getElementById("firstParagraph");
const secondParagraph = document.getElementById("secondParagraph");

const infoText1 = document.getElementById("infoText1");
const infoText2 = document.getElementById("infoText2");

infoText1.textContent += ` ${firstParagraph.isContentEditable}`;
infoText2.textContent += ` ${secondParagraph.isContentEditable}`;
```

## See also

- `HTMLElement/contentEditable`
- The `contenteditable` global attribute.
