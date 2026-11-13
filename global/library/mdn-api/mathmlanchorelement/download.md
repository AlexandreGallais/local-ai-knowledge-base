---
title: "MathMLAnchorElement: download property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mathmlanchorelement/download/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MathMLAnchorElement: download property

The **`download`** property of the `MathMLAnchorElement` interface is a string indicating that the linked resource is intended to be downloaded rather than displayed in the browser. The value, if any, represents the proposed name of the file.

It reflects the `download` attribute of the `` element.

## Value

A string.

## Examples

### Basic usage

Given this MathML:

```html
<math>
  <a id="myAnchor" href="/download?file=67530dc" download="booklet.pdf">...</a>
</math>
```

you can get the `download` value of the anchor like this:

```js
const mathAnchor = document.getElementById("myAnchor");
mathAnchor.download; // "booklet.pdf"
```

## See also

- The MathML `` element
