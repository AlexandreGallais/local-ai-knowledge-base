---
title: "Element: ariaRelevant property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariarelevant/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaRelevant property

The **`ariaRelevant`** property of the `Element` interface reflects the value of the `aria-relevant` attribute, which indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. This is used to describe what changes in an `aria-live` region are relevant and should be announced.

## Value

A string containing one or more of the following values, space separated:

- `"additions"`
    Additions of Element Nodes within the live region should be considered relevant.
- `"removals"`
    Deletion of Nodes from the live region should be considered relevant.
- `"text"`
    Changes to the textual content of existing nodes should be considered relevant.
- `"all"`
    Equivalent to `"additions removals text"`.

## Examples

In this example the `aria-relevant` attribute on the element with an ID of `text` is set to "all". Using `ariaRelevant` we update the value to "text".

```html
<div
  id="clock"
  role="timer"
  aria-live="polite"
  aria-atomic="true"
  aria-relevant="all"></div>
```

```js
let el = document.getElementById("clock");
console.log(el.ariaRelevant); // all
el.ariaRelevant = "text";
console.log(el.ariaRelevant); // text
```
