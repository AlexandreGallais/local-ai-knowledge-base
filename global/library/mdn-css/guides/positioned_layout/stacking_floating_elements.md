---
title: "Stacking floating elements"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/positioned_layout/stacking_floating_elements/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Stacking floating elements

For floating elements, the stacking order is a bit different. Floating elements are placed between non-positioned elements and positioned elements:

1. The background and borders of the root element.
2. Descendant non-positioned elements, in order of appearance in the HTML.
3. _Floating elements_.
4. Descendant positioned elements, in order of appearance in the HTML.

See types of positioning for an explanation of positioned and non-positioned elements.

> **Note:**
> If an `opacity` value is applied to a non-positioned element (i.e., DIV #4 in the example below), something strange happens: the background and border of that block pop up above the floating blocks and the positioned blocks. This is due to a peculiar part of the specification: applying an `opacity` value creates a new stacking context (see What No One Told You About Z-Index).

## Example

You can see in this example that the background and border of the non-positioned element (DIV #4) is completely unaffected by floating elements, but the content is affected. This happens according to standard float behavior which can be shown with a rule added to the above list:

1. The background and borders of the root element.
2. Descendant non-positioned elements, in order of appearance in the HTML.
3. Floating elements.
4. _Descendant non-positioned inline elements_.
5. Descendant positioned elements, in order of appearance in the HTML.

### HTML

```html
<div id="abs1"><strong>DIV #1</strong><br />position: absolute;</div>

<div id="flo1"><strong>DIV #2</strong><br />float: left;</div>

<div id="flo2"><strong>DIV #3</strong><br />float: right;</div>

<br />

<div id="sta1"><strong>DIV #4</strong><br />no positioning</div>

<div id="abs2"><strong>DIV #5</strong><br />position: absolute;</div>

<div id="rel1"><strong>DIV #6</strong><br />position: relative;</div>
```

### CSS

```css
div {
  padding: 10px;
  text-align: center;
}

strong {
  font-family: sans-serif;
}

#abs1 {
  position: absolute;
  width: 150px;
  height: 200px;
  top: 10px;
  right: 140px;
  border: 1px dashed #990000;
  background-color: #ffdddd;
}

#sta1 {
  height: 100px;
  border: 1px dashed #999966;
  background-color: #ffffcc;
  margin: 0px 10px;
  text-align: left;
}

#flo1 {
  margin: 0px 10px 0px 20px;
  float: left;
  width: 150px;
  height: 200px;
  border: 1px dashed #009900;
  background-color: #ccffcc;
}

#flo2 {
  margin: 0px 20px 0px 10px;
  float: right;
  width: 150px;
  height: 200px;
  border: 1px dashed #009900;
  background-color: #ccffcc;
}

#abs2 {
  position: absolute;
  width: 150px;
  height: 100px;
  top: 80px;
  left: 100px;
  border: 1px dashed #999900;
  background-color: #ffdddd;
}

#rel1 {
  position: relative;
  border: 1px dashed #999966;
  background-color: #ccffff;
  margin: 0px 10px;
  text-align: left;
}
```

## See also

- Understanding z-index
- Stacking without the `z-index` property
- Using z-index
- Stacking context
- CSS positioned layout module
