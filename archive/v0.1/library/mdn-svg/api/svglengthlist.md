---
title: "SVGLengthList"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svglengthlist/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGLengthList

The **`SVGLengthList`** interface defines a list of `SVGLength` objects. It is used for the `baseVal` and `animVal` properties of `SVGAnimatedLengthList`.

An `SVGLengthList` object can be designated as read only, which means that attempts to modify the object will result in an exception being thrown.

An `SVGLengthList` object is indexable and can be accessed like an array using bracket notation. Reading an index is equivalent to calling `getItem()`. Assigning to an index is equivalent to calling `replaceItem()`, including the exceptions it throws.

## Instance properties

- `length` (read-only)
    The number of items in the list.
- `numberOfItems` (read-only)
    The number of items in the list.

## Instance methods

- `appendItem()`
    Inserts a new item at the end of the list.
- `clear()`
    Clears all existing items from the list, with the result being an empty list.
- `initialize()`
    Clears all existing items from the list and re-initializes the list to hold the single item specified by the parameter.
- `getItem()`
    Returns the specified item from the list.
- `insertItemBefore()`
    Inserts a new item into the list at the specified position.
- `removeItem()`
    Removes an existing item from the list.
- `replaceItem()`
    Replaces an existing item in the list with a new item.

## Examples

### Using SVGLengthList

An `SVGLengthList` object can be retrieved from an `SVGAnimatedLengthList` object, which itself is retrievable from many animatable length attributes, such as `SVGTextPositioningElement.x`.

#### HTML

```html
<svg
  viewBox="0 0 200 100"
  xmlns="http://www.w3.org/2000/svg"
  width="200"
  height="100">
  <text id="text1" x="10" y="50">Hello</text>
</svg>
<button id="equally-distribute">Equally distribute letters</button>
<button id="reset-spacing">Reset spacing</button>
<div>
  <b>Current <code>SVGLengthList</code></b>
  <pre><output id="output"></output></pre>
</div>
```

#### JavaScript

```js
const text = document.getElementById("text1");
const output = document.getElementById("output");
const list = text.x.baseVal;
function equallyDistribute() {
  list.clear();
  for (let i = 0; i < text.textContent.length; i++) {
    const length = text.ownerSVGElement.createSVGLength();
    length.value = i * 20 + 10;
    list.appendItem(length);
  }
  printList();
}
function resetSpacing() {
  const length = text.ownerSVGElement.createSVGLength();
  length.value = 10;
  list.initialize(length);
  printList();
}
function printList() {
  output.textContent = "";
  for (let i = 0; i < list.length; i++) {
    output.innerText += `${list.getItem(i).value}\n`;
  }
}
printList();

document
  .getElementById("equally-distribute")
  .addEventListener("click", equallyDistribute);
document
  .getElementById("reset-spacing")
  .addEventListener("click", resetSpacing);
```

#### Result

## See also

- `SVGNumberList`
- `SVGPointList`
- `SVGStringList`
- `SVGTransformList`
