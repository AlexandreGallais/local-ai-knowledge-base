---
title: "CSSStyleSheet: CSSStyleSheet() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstylesheet/cssstylesheet/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleSheet: CSSStyleSheet() constructor

The **`CSSStyleSheet()`** constructor creates a new `CSSStyleSheet` object which represents a single Stylesheet.

After constructing a stylesheet the `CSSStyleSheet.replace()`, `CSSStyleSheet.replaceSync()`, `CSSStyleSheet.insertRule()`, and `CSSStyleSheet.deleteRule()` methods can be used to modify the rules of the new stylesheet.

A stylesheet created using this method is referred to as a "constructed stylesheet".
A constructed stylesheet can be shared between a document and its shadow DOM subtrees using `ShadowRoot.adoptedStyleSheets` and `Document.adoptedStyleSheets`.

## Syntax

```js
new CSSStyleSheet()
new CSSStyleSheet(options)
```

### Parameters

- `options` (optional)
    An object containing the following:
    - `baseURL` (optional)
        A string containing the `baseURL` used to resolve relative URLs in the stylesheet.
    - `media` (optional)
        A `MediaList` containing a list of media rules, or a string containing a single rule.
    - `disabled` (optional)
        A `Boolean` indicating whether the stylesheet is disabled. False by default.

## Examples

In the following example, a new `CSSStyleSheet` is constructed with a media rule of `"print"`.
Printing `StyleSheet.media` to the console returns a `MediaList` with a single entry for this print rule.

```js
let stylesheet = new CSSStyleSheet({ media: "print" });
console.log(stylesheet.media);
```

### Sharing stylesheets with a shadow DOM

The code below shows the sheet being constructed and then `CSSStyleSheet.replaceSync()` is called to add a rule to the sheet.

```js
// Create an empty "constructed" stylesheet
const sheet = new CSSStyleSheet();
// Apply a rule to the sheet
sheet.replaceSync("a { color: red; }");
```

We then create a `ShadowRoot` and pass the sheet object to the `ShadowRoot.adoptedStyleSheets` property inside an array.

```js
// Create an element in the document and then create a shadow root:
const node = document.createElement("div");
const shadow = node.attachShadow({ mode: "open" });

// Adopt the sheet into the shadow DOM
shadow.adoptedStyleSheets = [sheet];
```

We can modify the stylesheets after they have been added to the array.
Below we append a new rule to the same sheet using `CSSStyleSheet.insertRule()`.

```js
sheet.insertRule("* { background-color: blue; }");
// The document will now have blue background.
```

The same sheet can be shared with multiple shadow subtrees in the same document.
For more examples see `ShadowRoot.adoptedStyleSheets`.

## See also

- `Document.adoptedStyleSheets`
- Constructable Stylesheets (web.dev)
- Using the Shadow DOM
- construct-style-sheets-polyfill
