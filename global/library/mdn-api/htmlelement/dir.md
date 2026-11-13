---
title: "HTMLElement: dir property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/dir/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: dir property

The **`HTMLElement.dir`** property indicates the text writing directionality of the content of the current element. It reflects the element's `dir` attribute.

Note that if the `dir` attribute is unspecified, the element itself may still inherit directionality from its parent. However, that inherited directionality is not reflected by this property's value.

The text writing directionality of an element is which direction that text goes (for support of different language systems). Arabic languages and Hebrew are typical languages using the RTL directionality.

## Value

One of the following:

- `"ltr"`
    Left-to-right writing direction.
- `"rtl"`
    Right-to-left writing direction.
- `"auto"`
    The direction of the element must be determined based on the contents of the element.
- `""`
    The default value; the directionality is inherited from the parent element.

## Examples

```js
const para = document.getElementById("para1");
para.dir = "rtl";
// change the text direction on a paragraph identified as "para1"
```

## See also

- `document.dir`
- HTML `dir`
  global attribute
- CSS `direction` property
- CSS `:dir` pseudo-class
