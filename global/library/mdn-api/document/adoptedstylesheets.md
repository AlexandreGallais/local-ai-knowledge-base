---
title: "Document: adoptedStyleSheets property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/adoptedstylesheets/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: adoptedStyleSheets property

The **`adoptedStyleSheets`** property of the `Document` interface is used for setting an array of constructed stylesheets to be used by the document.

> **Note:**
> A constructed stylesheet is a stylesheet created programmatically using the `CSSStyleSheet()` constructor (as compared to one created by a user-agent when importing a stylesheet from a script, imported using `<style>` and `@import`, or linked to via `<link>`).

The same constructed stylesheets can also be shared with one or more `ShadowRoot` instances using the `ShadowRoot.adoptedStyleSheets` property.
Changing an adopted stylesheet will affect all the objects that adopt it.

Stylesheets in the property are evaluated along with the document's other stylesheets using the CSS cascade algorithm.
Where the resolution of rules considers stylesheet order, `adoptedStyleSheets` are assumed to be ordered after those in `Document.styleSheets`.

Only _constructed stylesheets_ within the context of the current `Document` may be adopted. You may create constructed stylesheets using the `CSSStyleSheet()` constructor or by importing CSS modules.

## Value

The value is an array of `CSSStyleSheet` instances that must have been created using the `CSSStyleSheet()` constructor within the context of the same `Document`.

If the array needs to be modified, use in-place mutations like `push()`. The `CSSStyleSheet` instances themselves can also be modified, and these changes will apply wherever the stylesheet is adopted.

In an earlier version of the specification, the array was not modifiable, so the only way to add new stylesheets was to assign a new array to `adoptedStyleSheets`.

### Exceptions

- `NotAllowedError` `DOMException`
    One of the `CSSStyleSheet` instances in the array was not created using the `CSSStyleSheet()` constructor or was constructed in a different document than the current document, such as one in a frame.

## Examples

### Adopting a stylesheet

The code below shows a stylesheet being constructed, and then `CSSStyleSheet.replaceSync()` is called to add a rule to the sheet.
The stylesheet is then added to an array and assigned to the `adoptedStyleSheets` property.

```js
// Create an empty "constructed" stylesheet
const sheet = new CSSStyleSheet();
// Apply a rule to the sheet
sheet.replaceSync("a { color: red; }");

// Apply the stylesheet to a document
document.adoptedStyleSheets.push(sheet);
```

We can append a new rule to the stylesheet using `CSSStyleSheet.insertRule()`.

```js
sheet.insertRule("* { background-color: blue; }");
// The document will now have blue background.
```

## Sharing a stylesheet with a shadow DOM

We can share a stylesheet to a shadow root in a similar way.

```js
// Create an element in the document and then create a shadow root:
const node = document.createElement("div");
const shadow = node.attachShadow({ mode: "open" });

// Adopt the same sheet into the shadow DOM
shadow.adoptedStyleSheets = [sheet];
```

## See also

- Constructable Stylesheets (web.dev)
- Using the Shadow DOM
- `CSSStyleSheet()` constructor
- `CSSStyleSheet.replaceSync()`
- `CSSStyleSheet.replace()`
- `CSSStyleSheet.insertRule()`
- `CSSStyleSheet.deleteRule()`
