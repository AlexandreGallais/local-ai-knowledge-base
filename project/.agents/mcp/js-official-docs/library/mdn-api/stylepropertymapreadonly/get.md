---
title: "StylePropertyMapReadOnly: get() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stylepropertymapreadonly/get/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StylePropertyMapReadOnly: get() method

The **`get()`** method of the `StylePropertyMapReadOnly` interface returns a `CSSStyleValue`-derived object for the first value of the specified property.

Use `getAll()` to get all the values of a CSS property that can have multiple values, such as `background-image` or `transition`.

## Syntax

```js
get(property)
```

### Parameters

- `property`
    The name of the property.
    Custom property names (starting with `--`) are matched case-sensitively; standard property names are not.

### Return value

A `CSSStyleValue`-derived object, or `undefined` if `property` has no value in the map.

The concrete type of the returned object depends on the property and its value.
For example, a property assigned a keyword might return a `CSSKeywordValue`, while a property assigned the result of a mathematical operation might return a `CSSMathSum`.

### Exceptions

- `TypeError`
    Thrown if `property` is not a valid CSS property name.

## Examples

### Basic usage

This example shows how to get a few properties and their values.

#### HTML

First we create a link inside a paragraph:

```html
<p>
  <a href="https://example.com">Link</a>
</p>
```

```html
<pre id="log"></pre>
```

#### CSS

The CSS styles the `font-weight` of the paragraph, and defines and uses a custom property for the color of the link:

```css
p {
  font-weight: bold;
}
a {
  --color: red;
  color: var(--color);
}
```

```css
#log {
  height: 100px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}
```

#### JavaScript

First we call `computedStyleMap()` on the element to get its style map: a `StylePropertyMapReadOnly` object.
We create an array of properties of interest and use the `get()` method of `StylePropertyMapReadOnly` to log only those values.

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText += `${text}\n`;
}
```

```js
// get the element and its style map
const myElement = document.querySelector("a");
const styleMap = myElement.computedStyleMap();

// array of properties we're interested in
const properties = ["font-weight", "border-left-color", "color", "--color"];

// log the value of each property of interest
for (const property of properties) {
  log(`${property}: ${styleMap.get(property)}`);
}
```

#### Result

### Getting different value types

This example demonstrates that `get()` can return objects of different types, depending on the property and its value.

First it applies a number of different properties to an element using CSS.
It then reads them back via JavaScript and logs the constructor name and value of each property.
The logging code itself isn't part of the demonstration, so it's hidden here.

#### HTML

First we define a `` with id `demoBox` to which we'll add styles.

```html
<div id="demoBox">Text</div>
```

```html
<pre id="log"></pre>
```

#### CSS

```css
#demoBox {
  --my-custom-property: "some text";
  opacity: 0.5;
  width: calc(30% - 20px);
  display: block;
  transform: translate(10px, 10px);
}
```

```css
#log {
  height: 330px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}
```

#### JavaScript

Next we use `computedStyleMap()` to get the `StylePropertyMapReadOnly` object for the demo box, and iterate through each of the properties we added, logging their constructor name and value.

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText += `${text}\n`;
}
```

```js
const styleMap = document.querySelector("#demoBox").computedStyleMap();
const properties = [
  "opacity",
  "display",
  "width",
  "transform",
  "--my-custom-property",
];

for (const property of properties) {
  const value = styleMap.get(property);
  log(property);
  log(`  type: ${value.constructor.name}`);
  log(`  value: ${value}\n`);
}
```

#### Result

## See also

- `getAll()`
- `has()`
- CSS Typed Object Model API
- Learning Houdini: the CSS Typed Object Model
