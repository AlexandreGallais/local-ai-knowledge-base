---
title: "HTMLGeolocationElement: position property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlgeolocationelement/position/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLGeolocationElement: position property

The **`position`** read-only property of the `HTMLGeolocationElement` interface returns a `GeolocationPosition` object representing the user's position, in the event of successful location data retrieval.

The retrieved position may or may not be up to date. The user's position will only be retrieved once when the `<geolocation>` element's button control is pressed, unless you set the `watch` attribute to `true`, in which case a new position will be retrieved each time the user's device moves. To read the user's current position, you should read the `position` property in response to the `location` event firing.

If location data retrieval fails, associated error information will be available in the `HTMLGeolocationElement.error` property.

## Value

A `GeolocationPosition` object, or `null` if location data retrieval failed or data has not yet been retrieved.

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

See our Embedded map example walkthrough for a real-world example that includes `position`.

## See also

- `<geolocation>` element
