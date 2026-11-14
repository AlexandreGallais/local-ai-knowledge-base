---
title: "HTMLGeolocationElement: watch property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlgeolocationelement/watch/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLGeolocationElement: watch property

The **`watch`** property of the `HTMLGeolocationElement` interface gets and sets a boolean value indicating whether the browser should continuously update the user's location data whenever the position of their device changes, or only retrieve it once.

It reflects the value of the `<geolocation>` `watch` attribute.

## Value

A boolean value:

- If `true`, location data is requested continuously, as if the `Geolocation.watchPosition()` method was called.
- If `false`, location data is only requested once, as if the `Geolocation.getCurrentPosition()` method was called.

Defaults to `false`.

## Examples

### Basic usage

```html
<geolocation watch></geolocation>
```

```js
const geo = document.querySelector("geolocation");
console.log(geo.watch); // true
```

### Retrieving location data continuously

In this example, we retrieve location data continuously and print it to the page.

#### HTML

We include a `<geolocation>` element with a `watch` attribute set on it. When the user clicks on the resulting button and grants permission to use the `geolocation` feature, the browser will start to request location data continuously, whenever the position of the user's device changes. We also include a `` element to output location data and errors into.

```html
<geolocation watch></geolocation>
<p id="output"></p>
```

#### JavaScript

In our JavaScript, we start by grabbing references to the output paragraph and `<geolocation>` element, and test the `watch` value by accessing the `watch` property.

```js
const outputElem = document.querySelector("#output");
const geo = document.querySelector("geolocation");
console.log(geo.watch); // true
```

Next, we add a `location` event listener to the resulting `HTMLGeolocationElement` object, to detect when the location data request is returned. If the data is returned successfully, we access it via the `HTMLGeolocationElement.position` property, and print the latitude and longitude values to output paragraph. If the data request fails, we access the error via the `HTMLGeolocationElement.error` property and print the error message to the output paragraph.

```js
geo.addEventListener("location", () => {
  if (geo.position) {
    outputElem.textContent += `(${geo.position.coords.latitude},${geo.position.coords.longitude}), `;
  } else if (geo.error) {
    outputElem.textContent += `${geo.error.message}, `;
  }
});
```

#### Result

See this code running live (source code). The full code also includes a fallback for browsers that don't support the `<geolocation>` element.

Try viewing the demo in a supported browser and an unsupported browser if possible, and note the difference in permissions dialog flow when you choose to allow or deny permission to use `geolocation`.

Note also that, because the `<geolocation>` `watch` attribute is set to `true`, the location data will be requested and the `location` event will fire continuously, each time the user changes location.

## See also

- `<geolocation>` element
