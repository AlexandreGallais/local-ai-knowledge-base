---
title: "HTMLGeolocationElement: location event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlgeolocationelement/location_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLGeolocationElement: location event

The **`location`** event of the `HTMLGeolocationElement` interface is fired whenever the browser receives location data, or error information when a location data request was unsuccessful.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("location", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onlocation = (event) => { }
```

## Event type

An `Event`.

## Examples

### Using `location` to respond to location data and errors

In our Embedded map demo (source code), we use a `location` event handler to respond to location data and errors being received:

```js
geo.addEventListener("location", () => {
  if (geo.position) {
    console.log(
      `${geo.position.coords.latitude},${geo.position.coords.longitude}`,
    );
    drawMap(geo.position.coords.latitude, geo.position.coords.longitude, geo);
  } else if (geo.error) {
    console.log(geo.error.message);
  }
});
```

If location data is returned successfully, we access it via the `HTMLGeolocationElement.position` property, and retrieve the latitude and longitude values. We log those to the console, then plot them on a map by passing them into the `drawMap()` function along with a reference to the `HTMLGeolocationElement` object. If the data request fails, we access the error via the `HTMLGeolocationElement.error` property and log the error message to the console.

See the main `HTMLGeolocationElement` page for a full walkthrough of this example.

## See also

- `<geolocation>` element
