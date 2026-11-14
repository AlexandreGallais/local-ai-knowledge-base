---
title: "HTMLGeolocationElement: error property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlgeolocationelement/error/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLGeolocationElement: error property

The **`error`** read-only property of the `HTMLGeolocationElement` interface returns a `GeolocationPositionError` object representing error information, in the event of a failure to retrieve location data.

If location data retrieval is successful, the data is available in the `HTMLGeolocationElement.position` property.

## Value

A `GeolocationPositionError` object, or `null` if location data was successfully retrieved.

## Examples

### Basic usage

```html
<geolocation autolocate></geolocation>
```

```js
const geo = document.querySelector("geolocation");
geo.addEventListener("location", () => {
  if (geo.position) {
    console.log(
      `(${geo.position.coords.latitude},${geo.position.coords.longitude})`,
    );
  } else if (geo.error) {
    console.log(geo.error.message);
  }
});
```

See our Embedded map example walkthrough for a real-world example that includes `error`.

## See also

- `<geolocation>` element
