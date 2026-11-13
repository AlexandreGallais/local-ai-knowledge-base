---
title: "Element: elementTiming property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/elementtiming/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: elementTiming property

The **`elementTiming`** property of the `Element` interface identifies elements for observation in the `PerformanceElementTiming` API.

The `elementTiming` property reflects the value of the `elementtiming` attribute.

## Value

A string.

## Examples

### Logging the value of `elementTiming`

In this example, adding the `elementtiming` attribute to the `` element sets the image to be observed.

```html
<img
  src="image.jpg"
  alt="a nice image"
  elementtiming="big-image"
  id="myImage" />
```

You can get the string value of the `elementtiming` HTML attribute by calling `el.elementTiming`.

```js
const el = document.getElementById("myImage");
console.log(el.elementTiming); // "big-image"
```

For a more complete example on how to use the Element Timing API, see `PerformanceElementTiming`.

## See also

- `PerformanceElementTiming`
- `elementtiming` HTML attribute
