---
title: "HTMLMapElement: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmapelement/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMapElement: name property

The **`name`** property of the `HTMLMapElement` represents the unique name `<map>` element.
Its value can be used with the `useMap` attribute of the `` element to reference a `<map>` element.

If an `id` attribute is set on the `<map>` element, then this `name` property should be the same as this `id`.

## Value

A non-empty string without whitespaces.

## Example

```html
<map name="image-map">
  <area shape="circle" coords="15,15,5" />
</map>
```

```js
const mapElement = document.getElementsByName("image-map")[0];
console.log(mapElement.name); // output: "image-map"
```

## See also

- `HTMLImageElement.useMap` property
- `HTMLAreaElement` element
