---
title: "Element: ariaBrailleLabel property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariabraillelabel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaBrailleLabel property

The **`ariaBrailleLabel`** property of the `Element` interface reflects the value of the `aria-braillelabel` attribute, which defines the ARIA braille label of the element.

This element label may be used by assistive technologies that can present content in braille, but should only be set if a braille-specific label would improve the user experience.
The `aria-braillelabel` contains additional information about when the property should be set.

## Value

- `<string>`
    The value is a string, an unconstrained value type, that is intended to be converted into braille.

## Examples

### Getting and setting ariaBrailleLabel

This example shows how to get and set the `ariaBrailleLabel` property.

#### HTML

First we define a button with label text "3 out of 5 stars" and an `aria-braillelabel` attribute with a value of `"***"`.
This allows a braille display to show "btn \*\*\*" in braille rather than the more verbose "btn gra 3 out of 5 stars".

```html
<button id="button" aria-braillelabel="***">3 out of 5 stars</button>
```

```html
<pre id="log"></pre>
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

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
```

The code then uses the button's `ariaBrailleLabel` property to first get and log the braille label.
It then sets the braille label to "3\*" and logs the value again.

```js
const button = document.getElementById("button");
log(button.ariaBrailleLabel);
button.ariaBrailleLabel = "3*";
log(button.ariaBrailleLabel);
```

#### Result
