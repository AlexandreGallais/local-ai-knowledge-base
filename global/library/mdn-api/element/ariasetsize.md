---
title: "Element: ariaSetSize property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariasetsize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaSetSize property

The **`ariaSetSize`** property of the `Element` interface reflects the value of the `aria-setsize` attribute, which defines the number of items in the current set of listitems or treeitems.

## Value

A string containing an integer.

## Examples

In this example the `aria-setsize` attribute on the element with an ID of `tab-id` is set to "3", to inform a device that there are currently 3 tabs in the group. Using `ariaSetSize` we update the value to "4".

```html
<button
  role="tab"
  aria-selected="true"
  aria-setsize="3"
  aria-controls="tabpanel-id"
  id="tab-id">
  Tab label
</button>
```

```js
let el = document.getElementById("tab-id");
console.log(el.ariaSetSize); // 3
el.ariaSetSize = "4";
console.log(el.ariaSetSize); // 4
```

## See also

- ARIA: tab role
