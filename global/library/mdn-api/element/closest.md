---
title: "Element: closest() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/closest/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: closest() method

The **`closest()`** method of the `Element` interface traverses the element and its parents (heading toward the document root) until it finds a node that matches the specified CSS selector.

## Syntax

```js
closest(selectors)
```

### Parameters

- `selectors`
    A string of valid CSS selectors to match the `Element` and its ancestors against.

### Return value

The closest ancestor `Element` or itself, which matches the `selectors`. If there is no such element, `null` is returned.

### Exceptions

- `SyntaxError` `DOMException`
    Thrown if the `selectors` is not a valid CSS selector.

## Examples

### HTML

```html
<article>
  <div id="div-01">
    Here is div-01
    <div id="div-02">
      Here is div-02
      <div id="div-03">Here is div-03</div>
    </div>
  </div>
</article>
```

### JavaScript

```js
const el = document.getElementById("div-03");

// the closest ancestor with the id of "div-02"
console.log(el.closest("#div-02")); // <div id="div-02">

// the closest ancestor which is a div in a div
console.log(el.closest("div div")); // <div id="div-03">

// the closest ancestor which is a div and has a parent article
console.log(el.closest("article > div")); // <div id="div-01">

// the closest ancestor which is not a div
console.log(el.closest(":not(div)")); // <article>
```

## Browser compatibility

### Compatibility notes

- In Edge 15-18 `document.createElement(tagName).closest(tagName)` will
  return `null` if the element is not first connected (directly or
  indirectly) to the context object, for example the `Document` object in
  the case of the normal DOM.

## See also

- CSS selectors module
- Other `Element` methods that take selectors: `Element.querySelector()`, `Element.querySelectorAll()`, and `Element.matches()`.
