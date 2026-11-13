---
title: "Element: ariaKeyShortcuts property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariakeyshortcuts/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaKeyShortcuts property

The **`ariaKeyShortcuts`** property of the `Element` interface reflects the value of the `aria-keyshortcuts` attribute, which indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.

## Value

A string.

## Examples

In this example the `aria-keyshortcuts` attribute on the element with an ID of `skip-link` is set to "Alt+Shift+A". Using `ariaKeyShortcuts` we update the value to "Alt+Shift+M".

```html
<a id="skip-link" href="#content" aria-keyshortcuts="Alt+Shift+A">
  Skip to content
</a>
```

```js
let el = document.getElementById("saveChanges");
console.log(el.ariaKeyShortcuts); // "Alt+Shift+A"
el.ariaKeyShortcuts = "Alt+Shift+M";
console.log(el.ariaKeyShortcuts); // "Alt+Shift+M"
```
