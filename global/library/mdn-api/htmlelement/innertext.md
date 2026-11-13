---
title: "HTMLElement: innerText property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/innertext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: innerText property

The **`innerText`** property of the `HTMLElement` interface represents the rendered text content of a node and its descendants.

As a getter, it approximates the text the user would get if they highlighted the contents of the element with the cursor and then copied it to the clipboard.
As a setter this will replace the element's children with the given value, converting any line breaks into `` elements.

> **Note:**
> `innerText` is easily confused with `Node.textContent`, but there are important differences between the two.
> Basically, `innerText` is aware of the rendered appearance of text, while `textContent` is not.

## Value

A string representing the rendered text content of an element.

If the element itself is not being rendered (for example, is detached from the document or is hidden from view), the returned value is the same as the `Node.textContent` property.

> **Warning:**
> Setting `innerText` on a node removes _all_ of the node's children and replaces them with a single text node with the given string value.

## Examples

This example compares `innerText` with `Node.textContent`.
Note how `innerText` is aware of things like `` elements, and ignores hidden elements.

### HTML

```html
<h3>Source element:</h3>
<p id="source">
  <style>
    #source {
      color: red;
    }
    #text {
      text-transform: uppercase;
    }
  </style>
  <span id="text">
    Take a look at<br />
    how this text<br />
    is interpreted below.
  </span>
  <span style="display:none">HIDDEN TEXT</span>
</p>
<h3>Result of textContent:</h3>
<textarea id="textContentOutput" rows="18" cols="40" readonly>…</textarea>
<h3>Result of innerText:</h3>
<textarea id="innerTextOutput" rows="6" cols="40" readonly>…</textarea>
```

### JavaScript

```js
const source = document.getElementById("source");
const textContentOutput = document.getElementById("textContentOutput");
const innerTextOutput = document.getElementById("innerTextOutput");

textContentOutput.value = source.textContent;
innerTextOutput.value = source.innerText;
```

## See also

- `HTMLScriptElement.innerText`
- `HTMLElement.outerText`
- `Element.innerHTML`
