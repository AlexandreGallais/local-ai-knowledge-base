---
title: "HTMLElement: writingSuggestions property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/writingsuggestions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: writingSuggestions property

The **`writingSuggestions`** property of the `HTMLElement` interface is a string indicating if browser-provided writing suggestions should be enabled under the scope of the element or not.

It reflects the value of the `writingsuggestions` HTML global attribute.

## Value

An enumerated value; possible values are:

- `"true"`
    The browser automatically shows the virtual keyboard when the user taps or focuses the element.
- `"false"`
    The browser does not automatically show the virtual keyboard: showing/hiding the virtual keyboard is handled manually by the script.

## Examples

The following example shows how to disable writing suggestions offered by user agents via script:

```js
const element = document.querySelector("input");

// disable user agent writing suggestions
element.writingSuggestions = "false";
```

## See also

- `writingsuggestions` HTML global attribute
