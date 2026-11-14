---
title: "Document: getElementsByClassName() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/getelementsbyclassname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: getElementsByClassName() method

The **`getElementsByClassName`** method of
`Document` interface returns an array-like object
of all child elements which have all of the given class name(s).

When called on
the `document` object, the complete document is searched, including the
root node. You may also call `getElementsByClassName()` on any element; it will return only elements which are descendants of the specified root element with the given class name(s).

> **Warning:**
> This is a live `HTMLCollection`. Changes in the DOM will
> reflect in the array as the changes occur. If an element selected by this array no
> longer qualifies for the selector, it will automatically be removed. Be aware of this
> for iteration purposes.

## Syntax

```js
getElementsByClassName(names)
```

### Parameters

- `names`
    A string representing the class name(s) to match; multiple class names are separated by whitespace.

### Return value

A live `HTMLCollection` of found elements.

## Examples

Get all elements that have a class of 'test':

```js
document.getElementsByClassName("test");
```

Get all elements that have both the 'red' and 'test' classes:

```js
document.getElementsByClassName("red test");
```

Get all elements that have a class of 'test', inside of an element that has the ID of
'main':

```js
document.getElementById("main").getElementsByClassName("test");
```

Get the first element with a class of 'test', or `undefined` if there is no
matching element:

```js
document.getElementsByClassName("test")[0];
```

We can also use methods of Array.prototype on any `HTMLCollection` by
passing the `HTMLCollection` as the method's _this_ value. Here
we'll find all div elements that have a class of 'test':

```js
const testElements = document.getElementsByClassName("test");
const testDivs = Array.prototype.filter.call(
  testElements,
  (testElement) => testElement.nodeName === "DIV",
);
```

### Get the first element whose class is 'test'

This is the most commonly used method of operation.

```html
<div id="parent-id">
  <p>hello world 1</p>
  <p class="test">hello world 2</p>
  <p>hello world 3</p>
  <p>hello world 4</p>
</div>
```

```js
const parentDOM = document.getElementById("parent-id");

const test = parentDOM.getElementsByClassName("test"); // a list of matching elements, *not* the element itself
console.log(test); // HTMLCollection[1]

const testTarget = parentDOM.getElementsByClassName("test")[0]; // the first element, as we wanted
console.log(testTarget); // <p class="test">hello world 2</p>
```

### Multiple Classes Example

`document.getElementsByClassName` works very similarly to
`document.querySelector` and `document.querySelectorAll`. Only
elements with ALL of the classNames specified are selected.

#### HTML

```html
<span class="orange fruit">Orange Fruit</span>
<span class="orange juice">Orange Juice</span>
<span class="apple juice">Apple Juice</span>
<span class="foo bar">Something Random</span>
<textarea id="resultArea"></textarea>
```

```css
#resultArea {
  width: 98%;
  height: 7em;
}
```

#### JavaScript

```js
// getElementsByClassName only selects elements that have both given classes
const allOrangeJuiceByClass = document.getElementsByClassName("orange juice");
let result = "document.getElementsByClassName('orange juice')";
for (const el of allOrangeJuiceByClass) {
  result += `\n  ${el.textContent}`;
}

// querySelector only selects full complete matches
const allOrangeJuiceQuery = document.querySelectorAll(".orange.juice");
result += "\n\ndocument.querySelectorAll('.orange.juice')";
for (const el of allOrangeJuiceQuery) {
  result += `\n  ${el.textContent}`;
}

document.getElementById("resultArea").value = result;
```

#### Result
