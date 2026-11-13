---
title: "MathMLAnchorElement: referrerPolicy property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mathmlanchorelement/referrerpolicy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MathMLAnchorElement: referrerPolicy property

The **`referrerPolicy`** property of the `MathMLAnchorElement` interface is a string defining how much of the referrer to send when following the link, and under what circumstances.

It reflects the `referrerpolicy` attribute of the `` element.

## Value

A string; see the `` element `referrerpolicy` attribute for the possible values.

## Examples

### Basic usage

Given this MathML:

```html
<math>
  <a id="myAnchor" href="https://example.com" referrerpolicy="no-referrer"
    >...</a
  >
</math>
```

you can get the `referrerPolicy` value of the anchor like this:

```js
const mathAnchor = document.getElementById("myAnchor");
mathAnchor.referrerPolicy; // "no-referrer"
```

## See also

- The MathML `` element
