---
title: "HTMLElement: click() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/click/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: click() method

The **`HTMLElement.click()`** method simulates a mouse click on an element. When called on an element, the element's `click` event is fired (unless its `disabled` attribute is set).

## Syntax

```js
click()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

Simulate a mouse-click when moving the mouse pointer over a checkbox:

### HTML

```html
<form>
  <input type="checkbox" id="myCheck" />
</form>
```

### JavaScript

```js
const checkbox = document.getElementById("myCheck");

// On mouse-over, execute myFunction
checkbox.addEventListener("mouseover", () => {
  // Simulate a mouse click
  checkbox.click();
});

checkbox.addEventListener("click", () => {
  console.log("click event occurred");
});
```

## See also

- Related event handlers
  - `Element.onclick`
  - `Element.ondblclick`
  - `Element.onauxclick`
