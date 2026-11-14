---
title: "CSSKeywordValue: CSSKeywordValue() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csskeywordvalue/csskeywordvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSKeywordValue: CSSKeywordValue() constructor

The **`CSSKeywordValue()`** constructor creates a new `CSSKeywordValue` object which represents a CSS keyword or other identifier.

## Syntax

```js
new CSSKeywordValue(value)
```

### Parameters

- `value`
    A `String` that will be used to set `CSSKeywordValue.value`.

### Exceptions

- `TypeError`
    Thrown if the `value` parameter is not specified, or if it is an empty string.

## Examples

### Basic usage

This example sets the CSS `display` property to `initial`, constructing a `CSSKeywordValue` for the keyword.

#### HTML

The HTML defines an element on which we'll set the value of the `display` keyword, an `` element, a button that will be used to set the value of the `display` keyword, and a "Reset" button to reset the example.

```html
<div id="myElement">
  Check the developer tools to see the log in the console and to inspect this
  div's style attributes.
</div>
<hr />
<button id="set-initial" type="button">Set initial</button>
<button id="reset" type="button">Reset</button>
```

#### CSS

The CSS initially sets the element to `flex`, which forces it to display full-width, and gives it a solid border with padding and margins.

```css
#myElement {
  display: flex;
  border: solid;
  padding: 10px;
  margin: 5px;
}
```

#### JavaScript

The code first gets a handle to the "Set initial" button and adds a listener to handle the click event when it is pressed.

The listener then gets the element's inline styles using `HTMLElement.attributeStyleMap`, and sets the `display` attribute with a newly constructed `CSSKeywordValue`.
It then logs the value of that keyword to the console.

```js
const setInitialButton = document.querySelector("#set-initial");

setInitialButton.addEventListener("click", () => {
  const myElementInlineStyles =
    document.getElementById("myElement").attributeStyleMap;
  myElementInlineStyles.set("display", new CSSKeywordValue("initial"));
  console.log(`display: ${myElementInlineStyles.get("display").value}`);
});
```

Note that we can't log the value of the inline styles before pressing the button, because there aren't any.

```js
const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", () => {
  window.location.reload(true);
});
```

#### Result

Right click on the element and open the developer tools inspector to inspect its styles.
You should see that `display: flex` is set on `#myElement`.
Press "Set initial" to make set the inline style of `display` to `"initial"`.
You should see the styles change in the inspector, and the element will also shrink slightly as the `flex` is disabled.
