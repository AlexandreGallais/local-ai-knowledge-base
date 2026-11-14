---
title: "StylePropertyMapReadOnly"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stylepropertymapreadonly/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StylePropertyMapReadOnly

The **`StylePropertyMapReadOnly`** interface of the CSS Typed Object Model API provides a read-only representation of a CSS declaration block that is an alternative to `CSSStyleDeclaration`.
Retrieve an instance of this interface using `Element.computedStyleMap()`.

## Instance properties

- `StylePropertyMapReadOnly.size` (read-only)
    Returns an unsigned integer containing the size of the `StylePropertyMapReadOnly` object.

## Instance methods

- `StylePropertyMapReadOnly.entries()`
    Returns an array of a given object's own enumerable property `[key, value]` pairs, in the same order as that provided by a `for...in` loop (the difference being that a for-in loop enumerates properties in the prototype chain as well).
- `StylePropertyMapReadOnly.forEach()`
    Executes a provided function once for each element of `StylePropertyMapReadOnly`.
- `StylePropertyMapReadOnly.get()`
    Returns the value of the specified property.
- `StylePropertyMapReadOnly.getAll()`
    Returns an array of `CSSStyleValue` objects containing the values for the provided property.
- `StylePropertyMapReadOnly.has()`
    Indicates whether the specified property is in the `StylePropertyMapReadOnly` object.
- `StylePropertyMapReadOnly.keys()`
    Returns a new _array iterator_ containing the keys for each item in `StylePropertyMapReadOnly`.
- `StylePropertyMapReadOnly.values()`
    Returns a new _array iterator_ containing the values for each index in the `StylePropertyMapReadOnly` object.

## Examples

### Basic usage

We have to have an element to observe:

```html
<p>
  This is a paragraph with some text. We can add some CSS, or not. The style map
  will include all the default and inherited CSS property values.
</p>
<dl id="output"></dl>
```

We add a touch of CSS with a custom property to better demonstrate the output:

```css
p {
  --some-variable: 1.6em;
  --some-other-variable: translateX(33vw);
  --another-variable: 42;
  line-height: var(--some-variable);
}
```

We add JavaScript to grab our paragraph and return a definition list of all the default CSS property values using `Element.computedStyleMap()`.

```js
// get the element
const myElement = document.querySelector("p");

// get the <dl> we'll be populating
const stylesList = document.querySelector("#output");

// Retrieve all computed styles with computedStyleMap()
const stylePropertyMap = myElement.computedStyleMap();

// iterate through the map of all the properties and values, adding a <dt> and <dd> for each
for (const [prop, val] of stylePropertyMap) {
  // properties
  const cssProperty = document.createElement("dt");
  cssProperty.innerText = prop;
  stylesList.appendChild(cssProperty);

  // values
  const cssValue = document.createElement("dd");
  cssValue.innerText = val;
  stylesList.appendChild(cssValue);
}
```
