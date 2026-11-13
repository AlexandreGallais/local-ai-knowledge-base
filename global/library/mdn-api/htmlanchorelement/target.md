---
title: "HTMLAnchorElement: target property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlanchorelement/target/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAnchorElement: target property

The **`target`** property of the `HTMLAnchorElement` interface is a string that indicates where to display the linked resource.

It reflects the `target` attribute of the `` element.

## Value

A string representing the target. Its value can be one of the keywords `_blank`, `_self`, `_parent`, or `_top`.

## Example

```html
<a href="www.example1.com" class="link1" target="_blank">example1</a>
```

```js
const link = document.querySelector(".link1");
console.log(link.target); // output: "_blank"
```

## See also

- `HTMLBaseElement.target` property
- `HTMLFormElement.target` property
- `HTMLAreaElement.target` property
