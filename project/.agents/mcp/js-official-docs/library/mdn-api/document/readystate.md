---
title: "Document: readyState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/readystate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: readyState property

The **`readyState`** read-only property of the `Document` interface describes the loading state of the `document`.
When the value of this property changes, a `readystatechange` event fires on the `document` object.

## Value

The `readyState` of a document can be one of following:

- `loading`
    The `document` is still loading (that is, the HTML parser is still working).
- `interactive`
    The document has been parsed but sub-resources such as `deferred` and module scripts, images, stylesheets, and frames are still loading. Once in this state, and the deferred and module scripts have executed, the `DOMContentLoaded` event fires.
- `complete`
    The document and all sub-resources have finished loading. The state indicates that the `load` event is about to fire.

## Examples

### Different states of readiness

```js
switch (document.readyState) {
  case "loading":
    // The document is loading.
    break;
  case "interactive": {
    // The document has finished loading and we can access DOM elements.
    // Sub-resources such as scripts, images, stylesheets and frames are still loading.
    const span = document.createElement("span");
    span.textContent = "A <span> element.";
    document.body.appendChild(span);
    break;
  }
  case "complete":
    // The page is fully loaded.
    console.log(
      `The first CSS rule is: ${document.styleSheets[0].cssRules[0].cssText}`,
    );
    break;
}
```

### readystatechange as an alternative to DOMContentLoaded event

```js
// Alternative to DOMContentLoaded event
document.onreadystatechange = () => {
  if (document.readyState === "interactive") {
    initApplication();
  }
};
```

### readystatechange as an alternative to load event

```js
// Alternative to load event
document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    initApplication();
  }
};
```

### readystatechange as event listener to insert or modify the DOM before DOMContentLoaded

```js
document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "interactive") {
    initLoader();
  } else if (event.target.readyState === "complete") {
    initApp();
  }
});
```

## See also

- Related events:
  - `readystatechange`
  - `DOMContentLoaded`
  - `load`
