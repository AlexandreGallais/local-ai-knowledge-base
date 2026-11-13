---
title: "Element: ariaBrailleRoleDescription property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariabrailleroledescription/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaBrailleRoleDescription property

The **`ariaBrailleRoleDescription`** property of the `Element` interface reflects the value of the `aria-brailleroledescription` attribute, which defines the ARIA braille role description of the element.

This property may be used to provide an abbreviated version of the `aria-roledescription` value.
It should only be used if `aria-roledescription` is present and in the rare case where it is too verbose for braille.
The `aria-brailleroledescription` contains additional information about when the property should be set.

## Value

- `<string>`
    The value is a string, an unconstrained value type, that is intended to be converted into braille.

## Examples

### Getting and setting ariaBrailleRoleDescription

This example shows how you can get and set the `ariaBrailleRoleDescription` property.

#### HTML

First we define an `` element that would be use as a slide in a slideshow.
We set the `aria-roledescription` attribute to "slide", and its braille contraction in `aria-brailleroledescription` to "sld".

```html
<article
  id="article"
  aria-roledescription="slide"
  aria-brailleroledescription="sld"
  aria-labelledby="slide1heading">
  <h1 id="slide1heading">Welcome to my talk</h1>
</article>
```

```html
<pre id="log"></pre>
```

```css
#log {
  height: 70px;
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

To get the element's role description we use the `ariaBrailleRoleDescription` property.
The code below first gets and then logs the value.
It then sets the braille role description to "sd" and logs the value again (for illustration only — in production code you would not set this value).

```js
const article = document.getElementById("article");
log(article.ariaBrailleRoleDescription);
article.ariaBrailleRoleDescription = "sd";
log(article.ariaBrailleRoleDescription);
```

#### Result
