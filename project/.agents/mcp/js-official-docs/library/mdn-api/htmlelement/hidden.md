---
title: "HTMLElement: hidden property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/hidden/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: hidden property

The `HTMLElement` property **`hidden`** reflects the value of the element's `hidden` attribute.

## Value

This attribute may have one of three values:

- `true`
    The element is hidden.
- `false`
    The element is not hidden. This is the default value for the attribute.
- `"until-found"`
    The element is _hidden until found_, meaning that it is hidden but will be revealed if found through in page search or reached through fragment navigation.

For details on the usage of this attribute, see the page for the `hidden` HTML attribute that this property reflects.

## Examples

Here's an example where a hidden block is used to contain a 'thank you' message that is
displayed after a user agrees to an unusual request.

### HTML

The HTML contains two panels: a welcome panel, that asks users to agree to be awesome, and a follow-up panel, which is initially hidden.

```html
<div id="welcome" class="panel">
  <h1>Welcome to my website!</h1>
  <p>By clicking "OK" you agree to be awesome today!</p>
  <button class="button" id="okButton">OK</button>
</div>

<div id="awesome" class="panel" hidden>
  <h1>Thanks!</h1>
  <p>Thanks for agreeing to be awesome today!</p>
</div>
```

### CSS

The content is styled using the CSS below.

```css
.panel {
  font:
    16px "Open Sans",
    "Helvetica",
    "Arial",
    sans-serif;
  border: 1px solid #2222dd;
  padding: 12px;
  width: 500px;
  text-align: center;
}

.button {
  font:
    22px "Open Sans",
    "Helvetica",
    "Arial",
    sans-serif;
  padding: 5px 36px;
}

h1 {
  margin-top: 0;
  font-size: 175%;
}
```

### JavaScript

The JavaScript adds an event listener to the "OK" button, which hides the "welcome" panel and shows the "awesome" panel:

```js
document.getElementById("okButton").addEventListener("click", () => {
  document.getElementById("welcome").hidden = true;
  document.getElementById("awesome").hidden = false;
});
```

## See also

- hidden attribute
- `display`
