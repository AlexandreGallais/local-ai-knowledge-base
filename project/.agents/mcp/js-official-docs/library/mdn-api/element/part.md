---
title: "Element: part property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/part/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: part property

The read-only **`part`** property of the `Element` interface contains a `DOMTokenList` object representing the part identifier(s) of the element. It reflects the element's `part` content attribute. These can be used to style parts of a shadow DOM, via the `::part` pseudo-element.

## Value

A `DOMTokenList` object. If the `part` attribute is not set or empty, it returns an empty `DOMTokenList`, i.e., a `DOMTokenList` with the `length` property equal to `0`.

Although the `part` property itself is read-only in the sense that you can't replace the `DOMTokenList` object, you can still assign to the `part` property directly, which is equivalent to assigning to its `value` property. You can also modify the `DOMTokenList` object using the `add()`, `remove()`, `replace()`, and `toggle()` methods.

## Examples

The following excerpt is from our shadow-part
example. Here the `part` attribute is used to find the shadow parts, and the
`part` property is then used to change the part identifiers of each tab so
the correct styling is applied to the active tab when tabs are clicked.

```js
const tabs = [];
const children = this.shadowRoot.children;

for (const elem of children) {
  if (elem.getAttribute("part")) {
    tabs.push(elem);
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    tabs.forEach((tab) => {
      tab.part = "tab";
    });
    e.target.part = "tab active";
  });

  console.log(tab.part);
});
```

## See also

- `::part`
- part
