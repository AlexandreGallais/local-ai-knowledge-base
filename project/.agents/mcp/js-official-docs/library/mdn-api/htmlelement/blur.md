---
title: "HTMLElement: blur() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/blur/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: blur() method

The **`HTMLElement.blur()`** method removes keyboard focus from the current element.

## Syntax

```js
blur()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Remove focus from a text input

#### HTML

```html
<input type="text" id="sampleText" value="Sample Text" /><br /><br />
<button type="button">Click me to gain focus</button>
```

#### JavaScript

```js
const textField = document.getElementById("sampleText");
const button = document.querySelector("button");

function focusInput() {
  textField.focus();

  // The input will lose focus after 3 seconds
  setTimeout(() => {
    textField.blur();
  }, 3000);
}

button.addEventListener("click", focusInput);
```

#### Result

## See also

- `HTMLElement.focus`
