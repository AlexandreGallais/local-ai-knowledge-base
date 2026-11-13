---
title: "ShadowRoot: adoptedStyleSheets property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/shadowroot/adoptedstylesheets/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ShadowRoot: adoptedStyleSheets property

The **`adoptedStyleSheets`** property of the `ShadowRoot` interface sets an array of constructed stylesheets to be used by the shadow DOM subtree.

> **Note:**
> A constructed stylesheet is a stylesheet created programmatically using the `CSSStyleSheet()` constructor (as compared to one created by a user-agent when importing a stylesheet from a script, imported using `<style>` and `@import`, or linked to via `<link>`).

The same constructed stylesheet can be adopted by multiple `ShadowRoot` instances, and by the parent document (using the `Document.adoptedStyleSheets` property).
Changing an adopted stylesheet will affect all the adopting objects.

Stylesheets in the `adoptedStyleSheets` property are considered along with the shadow DOM's other stylesheets.
For the purpose of determining the final computed CSS of any element, they are considered to have been added _after_ the other stylesheets in the shadow DOM (`ShadowRoot.styleSheets`).

Only stylesheets created using the `CSSStyleSheet()` constructor, and from within the same parent `Document` as the shadow root, may be adopted.

## Value

The value is an array of `CSSStyleSheet` instances that must have been created using the `CSSStyleSheet()` constructor within the context of the shadow root's parent `Document`.

If the array needs to be modified, use in-place mutations like `push()`. The `CSSStyleSheet` instances themselves can also be modified, and these changes will apply wherever the stylesheet is adopted.

In an earlier version of the specification, the array was not modifiable, so the only way to add new stylesheets was to assign a new array to `adoptedStyleSheets`.

## Examples

### Adopting a stylesheet

The code below first shows a stylesheet being constructed, and then `CSSStyleSheet.replaceSync()` is called to add a rule to the sheet.

```js
// Create an empty "constructed" stylesheet
const sheet = new CSSStyleSheet();
// Apply a rule to the sheet
sheet.replaceSync("a { color: red; }");
```

We then create a `ShadowRoot` and pass the sheet object to `adoptedStyleSheets` inside an array.

```js
// Create an element in the document and then create a shadow root:
const node = document.createElement("div");
const shadow = node.attachShadow({ mode: "open" });

// Adopt the sheet into the shadow DOM
shadow.adoptedStyleSheets = [sheet];
```

We can still modify the stylesheets after they have been added to the array.
Below we append a new rule to the same sheet using `CSSStyleSheet.insertRule()`.

```js
sheet.insertRule("* { background-color: blue; }");
// The document will now have blue background.
```

### Append a new stylesheet

New stylesheets can be _appended_ to the document or shadow root by using `adoptedStyleSheets.push()`:

```js
const extraSheet = new CSSStyleSheet();
extraSheet.replaceSync("p { color: green; }");

// Concat the new sheet.
shadow.adoptedStyleSheets.push(extraSheet);
```

## See also

- Constructable Stylesheets (web.dev)
- Using the Shadow DOM
- `CSSStyleSheet()` constructor
- `CSSStyleSheet.replaceSync()`
- `CSSStyleSheet.replace()`
- `CSSStyleSheet.insertRule()`
- `CSSStyleSheet.deleteRule()`
