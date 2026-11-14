---
title: "Using the CSS Typed Object Model (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/css_typed_om_api/guide/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the CSS Typed Object Model

The **CSS Typed Object Model API** exposes CSS values as typed JavaScript objects to allow their performant manipulation.

Converting CSS Object Model value strings into meaningfully-typed JavaScript representations and back (via `HTMLElement.style`) can incur a significant performance overhead.

The CSS Typed OM makes CSS manipulation more logical and performant by providing object features (rather than CSSOM string manipulation), providing access to types, methods, and an object model for CSS values.

This article provides an introduction to all of its main features.

## computedStyleMap()

With the CSS Typed OM API, we can access all the CSS properties and values — including custom properties — that are impacting an element. Let's see how this works by creating our first example, which explores `computedStyleMap()`.

### Getting all the properties and values

#### HTML

We start with some HTML: a paragraph with a link, as well as a definition list to which we will add all the CSS Property / Value pairs.

```html
<p>
  <a href="https://example.com">Link</a>
</p>
<dl id="regurgitation"></dl>
```

#### JavaScript

We add JavaScript to grab our unstyled link and return a definition list of all the default CSS property values impacting the link using `computedStyleMap()`.

```js
// Get the element
const myElement = document.querySelector("a");

// Get the <dl> we'll be populating
const stylesList = document.querySelector("#regurgitation");

// Retrieve all computed styles with computedStyleMap()
const defaultComputedStyles = myElement.computedStyleMap();

// Iterate through the map of all the properties and values, adding a <dt> and <dd> for each
for (const [prop, val] of defaultComputedStyles) {
  // properties
  const cssProperty = document.createElement("dt");
  cssProperty.appendChild(document.createTextNode(prop));
  stylesList.appendChild(cssProperty);

  // values
  const cssValue = document.createElement("dd");
  cssValue.appendChild(document.createTextNode(val));
  stylesList.appendChild(cssValue);
}
```

The `computedStyleMap()` method returns a `StylePropertyMapReadOnly` object containing the `size` property, which indicates how many properties are in the map. We iterate through the style map, creating a `` and `` for each property and value respectively.

#### Result

In browsers that support `computedStyleMap()`, you'll see a list of all the CSS properties and values. In other browsers, you'll just see a link.

Did you realize how many default CSS properties a link had? Update the first `document.querySelector` call to select the `` rather than the ``. You'll notice a difference in the `margin-top` and `margin-bottom` default computed values.

### .get() method / custom properties

Let's update our example to only retrieve a few properties and values. Let's start by adding some CSS to our example, including a custom property and an inheritable property:

```css
p {
  font-weight: bold;
}

a {
  --color: red;
  color: var(--color);
}
```

Instead of getting _all_ the properties, we create an array of properties of interest and use the `StylePropertyMapReadOnly.get()` method to get each of their values:

```html
<p>
  <a href="https://example.com">Link</a>
</p>
<dl id="regurgitation"></dl>
```

```js
// Get the element
const myElement = document.querySelector("a");

// Get the <dl> we'll be populating
const stylesList = document.querySelector("#regurgitation");

// Retrieve all computed styles with computedStyleMap()
const allComputedStyles = myElement.computedStyleMap();

// Array of properties we're interested in
const ofInterest = ["font-weight", "border-left-color", "color", "--color"];

// iterate through our properties of interest
for (const value of ofInterest) {
  // Properties
  const cssProperty = document.createElement("dt");
  cssProperty.appendChild(document.createTextNode(value));
  stylesList.appendChild(cssProperty);

  // Values
  const cssValue = document.createElement("dd");
  cssValue.appendChild(document.createTextNode(allComputedStyles.get(value)));
  stylesList.appendChild(cssValue);
}
```

We included `border-left-color` to demonstrate that, had we included all the properties, every value that defaults to `currentColor` (including `caret-color`, `outline-color`, `text-decoration-color`, `column-rule-color`, etc.) would return `rgb(255 0 0)`. The link has inherited `font-weight: bold;` from the paragraph's styles, listing it as `font-weight: 700`. Custom properties, like our `--color: red`, are properties. As such, they are accessible via `get()`.

You'll note that custom properties retain the value as written in the stylesheet, whereas computed styles will be listed as the computed value — `color` was listed as an `rgb()` value and the `font-weight` returned was `700` even though we use a named color and the `bold` keyword.

### CSSUnitValue and CSSKeywordValue

The power of the CSS Typed OM is that values are separate from units; parsing and concatenating string values may become a thing of the past. Every CSS property in a style map has a value. If the value is a keyword, the object returned is a `CSSKeywordValue`. If the value is numeric, a `CSSUnitValue` is returned.

`CSSKeywordValue` is a class that defines keywords like `inherit`, `initial`, `unset`, and other strings you don't quote, such as `auto` and `grid`. This subclass gives you a `value` property via `cssKeywordValue.value`.

`CSSUnitValue` is returned if the value is a unit type. It is a class that defines numbers with units of measurement like `20px`, `40%`, `200ms`, or `7`. It is returned with two properties: a `value` and a `unit`. With this type we can access the numeric value — `cssUnitValue.value` — and its unit — `cssUnitValue.unit`.

Let's write a plain paragraph, apply no styles, and inspect a few of its CSS properties by returning a table with the unit and value:

```html
<p>
  This is a paragraph with some content. Open up this example in the playground,
  and change some features. Try adding some CSS, such as a width for this
  paragraph, or adding a CSS property to the ofInterest array.
</p>
<table id="regurgitation">
  <thead>
    <tr>
      <th>Property</th>
      <th>Value</th>
      <th>Unit</th>
    </tr>
  </thead>
</table>
```

For each property of interest, we list the name of the property, use `.get(propertyName).value` to return the value, and, if the object returned by the `get()` is a `CSSUnitValue`, list the unit type we retrieve with `.get(propertyName).unit`.

```js
// Get the element we're inspecting
const myElement = document.querySelector("p");

// Get the table we'll be populating
const stylesTable = document.querySelector("#regurgitation");

// Retrieve all computed styles with computedStyleMap()
const allComputedStyles = myElement.computedStyleMap();

// Array of properties we're interested in
const ofInterest = [
  "padding-top",
  "margin-bottom",
  "font-size",
  "font-stretch",
  "transition-duration",
  "animation-iteration-count",
  "width",
  "height",
];

// Iterate through our properties of interest
for (const value of ofInterest) {
  // Create a row
  const row = document.createElement("tr");

  // Add the name of the property
  const cssProperty = document.createElement("td");
  cssProperty.appendChild(document.createTextNode(value));
  row.appendChild(cssProperty);

  // Add the unitless value
  const cssValue = document.createElement("td");

  // Shrink long floats to 1 decimal point
  let propVal = allComputedStyles.get(value).value;
  propVal = propVal % 1 ? propVal.toFixed(1) : propVal;
  cssValue.appendChild(document.createTextNode(propVal));
  row.appendChild(cssValue);

  // Add the type of unit
  const cssUnit = document.createElement("td");
  cssUnit.appendChild(
    document.createTextNode(allComputedStyles.get(value).unit),
  );
  row.appendChild(cssUnit);

  // Add the row to the table
  stylesTable.appendChild(row);
}
```

For those of you using a non-supporting browser, the above output should look something like this:

| Property                                 | Value | Unit        |
| ---------------------------------------- | ----- | ----------- |
| `padding-top`               | 0     | `px`        |
| `margin-bottom`             | 16    | `px`        |
| `font-size`                 | 16    | `px`        |
| `font-stretch`              | 100   | `percent`   |
| `transition-duration`       | 0     | `s`         |
| `animation-iteration-count` | 1     | _number_    |
| `width`                     | auto  | _undefined_ |
| `height`                    | auto  | _undefined_ |

You'll note the `<length>` unit returned is `px`, the `<percentage>` unit returned is `percent`, the `<time>` unit is `s` for 'seconds', and the unitless `<number>` unit is `number`.

We didn't declare a `width` or a `height` for the paragraph, both of which default to `auto` and therefore return a `CSSKeywordValue` instead of a `CSSUnitValue`. `CSSKeywordValue`s do not have a unit property, so in these cases our `get().unit` returns `undefined`.

Had the `width` or `height` been defined in a `<length>` or `<percent>`, the `CSSUnitValue` unit would have been `px` or `percent` respectively.

There are other types available:

- An `image` will return a `CSSImageValue`.
- A `<color>` would return a `CSSStyleValue`.
- A `transform` returns a `CSSTransformValue`.
- A custom property returns a `CSSUnparsedValue`.

You can use a `CSSUnitValue` or `CSSKeywordValue` to create other objects.
