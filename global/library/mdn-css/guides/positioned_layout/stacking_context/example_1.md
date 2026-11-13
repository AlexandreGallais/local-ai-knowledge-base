---
title: "Stacking context example 1"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/positioned_layout/stacking_context/example_1/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Stacking context example 1

## Description

Let's start with a basic example. In the root stacking context, there are two relatively positioned `` elements (DIV #1 and DIV #3) without `z-index` properties. Inside DIV #1, there is an absolutely positioned DIV #2, while in DIV #3, there is an absolutely positioned DIV #4, both without `z-index` properties.

The only stacking context is the root context. Without `z-index` values, elements are stacked in order of occurrence.

If DIV #2 is assigned a positive (non-zero and non-auto) z-index value, it is rendered above all the other DIVs.

Then if DIV #4 is also assigned a positive z-index greater than DIV #2's z-index, it is rendered above all the other DIVs including DIV #2.

In this last example you can see that DIV #2 and DIV #4 are not siblings, because they belong to different parents in the HTML elements' hierarchy. Even so, stacking of DIV #4 with respect of DIV #2 can be controlled through `z-index`. It happens that, since DIV #1 and DIV #3 are not assigned any `z-index` value, or any other features that create a stacking context, they do not create a stacking context. This means that all their content, including DIV #2 and DIV #4, belongs to the same root stacking context.

In terms of stacking contexts, DIV #1 and DIV #3 are assimilated into the root element, and the resulting hierarchy is the following:

- Root stacking context
  - DIV #2 (`z-index`: 1)
  - DIV #4 (`z-index`: 2)

> **Note:**
> DIV #1 and DIV #3 are not translucent. It is important to remember that assigning an opacity value of less than `1` to an element implicitly creates a stacking context, as does adding a `z-index` value to a positioned element. This example also shows what happens when a parent element doesn't create a stacking context.

## Example

### HTML

```html
<div id="div1">
  <br /><span class="bold">DIV #1</span> <br />position: relative;
  <div id="div2">
    <br /><span class="bold">DIV #2</span> <br />position: absolute;
    <br />z-index: 1;
  </div>
</div>

<br />

<div id="div3">
  <br /><span class="bold">DIV #3</span> <br />position: relative;
  <div id="div4">
    <br /><span class="bold">DIV #4</span> <br />position: absolute;
    <br />z-index: 2;
  </div>
</div>
```

### CSS

```css
.bold {
  font-family: "Arial";
  font-size: 12px;
  font-weight: bold;
}

#div1,
#div3 {
  height: 80px;
  position: relative;
  border: 1px dashed #669966;
  background-color: #ccffcc;
  padding-left: 5px;
}

#div2 {
  opacity: 0.8;
  z-index: 1;
  position: absolute;
  width: 150px;
  height: 200px;
  top: 20px;
  left: 170px;
  border: 1px dashed #990000;
  background-color: #ffdddd;
  text-align: center;
}

#div4 {
  opacity: 0.8;
  z-index: 2;
  position: absolute;
  width: 200px;
  height: 80px;
  top: 65px;
  left: 50px;
  border: 1px dashed #000099;
  background-color: #ddddff;
  text-align: left;
  padding-left: 10px;
}
```

## See also

- Example: 2-level HTML hierarchy, `z-index` on all levels
- Example: 3-level HTML hierarchy, `z-index` on the second level
- Stacking context
- CSS positioned layout module
