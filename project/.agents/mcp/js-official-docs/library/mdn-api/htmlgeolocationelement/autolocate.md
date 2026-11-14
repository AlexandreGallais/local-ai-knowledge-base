---
title: "HTMLGeolocationElement: autolocate property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlgeolocationelement/autolocate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLGeolocationElement: autolocate property

The **`autolocate`** property of the `HTMLGeolocationElement` interface gets and sets a boolean value indicating whether the browser should immediately request location data when the `<geolocation>` element is rendered, provided permission to use the `geolocation` feature is already granted.

It reflects the value of the `<geolocation>` `autolocate` attribute.

## Value

A boolean value:

- If `true`, location data is requested as soon as the `<geolocation>` element is rendered, provided permission to use the `geolocation` feature was previously granted.
- If `false`, location data is only requested when the user presses the `<geolocation>` button.

Defaults to `false`.

If permission to use the `geolocation` feature was not previously granted, the `autolocate` property is ignored.

## Examples

### Basic usage

```html
<geolocation autolocate></geolocation>
```

```js
const geo = document.querySelector("geolocation");
console.log(geo.autolocate); // true
```

See our Embedded map example walkthrough for a real-world example that includes `autolocate`.

## See also

- `<geolocation>` element
