---
title: "HTMLAreaElement: target property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlareaelement/target/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAreaElement: target property

The **`target`** property of the `HTMLAreaElement` interface is a string that indicates where to display the linked resource.

It reflects the `target` attribute of the `<area>` element.

## Value

A string representing the target. Its value can be:

- The name of a `<frame>`.
- One of the keyword with specific values: `_blank`, `_self`, `_parent`, or `_top`.

## Example

```html
<map name="image-map">
  <area href="www.example.com" target="_top" alt="left" />
</map>
```

```js
const areaElement = document.getElementsByName("image-map")[0].areas[0];
console.log(areaElement.target); // Output: "_top"
```

## See also

- `HTMLBaseElement.target` property
- `HTMLFormElement.target` property
- `HTMLAnchorElement.target` property
