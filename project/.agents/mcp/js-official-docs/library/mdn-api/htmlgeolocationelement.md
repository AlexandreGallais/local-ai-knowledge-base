---
title: "HTMLGeolocationElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlgeolocationelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLGeolocationElement

The **`HTMLGeolocationElement`** interface of the HTML DOM API represents the `<geolocation>` element, and provides access to its properties and events.

This element is based on, and inherits properties and methods from, the `HTMLElement` interface.

> **Note:**
> The `<geolocation>` element and `HTMLGeolocationElement` interface allow the user to share their location data with the page in a more consistent and intuitive way than the older Geolocation API.

## Constructor

- `HTMLGeolocationElement()` (experimental)
    Creates a new `HTMLGeolocationElement` object instance. Note that this constructor is not called directly, but via a DOM method such as `Document.createElement()`.

## Instance properties

_Also inherits properties from its parent interface, `HTMLElement`._

- `autolocate` (experimental)
    A boolean value indicating whether the browser should immediately request location data when the `<geolocation>` element is rendered, provided permission is previously granted. Reflects the value of the `<geolocation>` `autolocate` attribute.
- `error` (read-only) (experimental)
    A `GeolocationPositionError` object representing error information, in the event of a failure to retrieve data.
- `initialPermissionStatus` (read-only) (experimental) (deprecated)
    An enumerated value representing the permission status for the `geolocation` feature when the page first loads.
- `invalidReason` (read-only) (experimental)
    An enumerated value representing the reason why the `<geolocation>` element is invalid (blocked), if that is the case.
- `isValid` (read-only) (experimental)
    A boolean value indicating whether the `<geolocation>` element is valid or invalid (blocked).
- `permissionStatus` (read-only) (experimental)
    A string representing the current permission status for the `geolocation` feature.
- `position` (read-only) (experimental)
    A `GeolocationPosition` object representing the user's position, in the event of successful location data retrieval.
- `watch` (experimental)
    A boolean value indicating whether the browser should continuously update the user's location data whenever the position of their device changes, or only retrieve it once. Reflects the value of the `<geolocation>` `watch` attribute.

## Instance methods

_Inherits properties from its parent interface, `HTMLElement`._

## Events

_Also inherits events from its parent interface, `HTMLElement`._

- `location` (experimental)
    Fired whenever the browser receives location data, or error information when the location data request was unsuccessful.
- `promptaction` (experimental)
    Fired whenever the user activates the `<geolocation>` element and selects an option from the resulting dialog, either to grant or deny `geolocation` permission.
- `promptdismiss` (experimental)
    Fired whenever the user activates the `<geolocation>` element and dismisses the resulting dialog, by pressing the "close" button or the `Esc` key.
- `validationstatuschange` (experimental)
    Fired whenever the `<geolocation>` element's `isValid` value changes.

## Description

The `HTMLGeolocationElement` interface represents the `<geolocation>` element, which creates an interactive control to allow the user to share their location data with the page.

When the user activates the control, they are presented with a dialog box that asks them for permission to share their location data. If they grant permission, the browser will attempt to retrieve the user's location data using the Geolocation API in the background.

By default, the browser requests location data once, as if the `Geolocation.getCurrentPosition()` method was called. However, if the `watch` attribute is set to `true`, the browser updates the data whenever the device position changes, as if `Geolocation.watchPosition()` was called.

When the data request returns, the `location` event fires, allowing you to respond appropriately, for example by grabbing the data and plotting the location on a map.

- If location data is successfully retrieved, it is available in the `HTMLGeolocationElement.position` property, which contains a `GeolocationPosition` object.
- If data retrieval is unsuccessful, error information is available in the `HTMLGeolocationElement.error` property, which contains a `GeolocationPositionError` object.

The `promptaction` and `promptdismiss` events allow you to respond to the user's interactions with the `<geolocation>` dialog box, for example to ask them to make a different choice if they denied permission to access the data.

When a blocker is active on a `<geolocation>` element, it is prevented from functioning (invalid), either temporarily or permanently, depending on the reason. You can check whether it is invalid by querying the `HTMLGeolocationElement.isValid` property. You can also return the reason why it is invalid via the `HTMLGeolocationElement.invalidReason` property — see that page for a full list of possible reasons.

## Examples

### Basic usage

For minimal examples that use the `<geolocation>` element and its associated `HTMLGeolocationElement` object to return location data, see our basic <example-value> (source code) and basic watch example (source code).

See the `<geolocation>` reference page for a walkthrough.

### Embedded map example

This example uses the `<geolocation>` element to retrieve your current location, which is plotted on a map rendered using Leaflet JS. The example also uses a regular `` fallback to retrieve the location data in non-supporting browsers.

#### HTML

We include a `<geolocation>` element with an `autolocate` attribute so that the browser will attempt to retrieve location data automatically, provided `geolocation` permission was previously granted. Inside the `<geolocation>` element we nest a `` fallback, which will be rendered in browsers that do not support `<geolocation>` to enable location data to be requested.

```html
<geolocation autolocate>
  <button id="fallback">Use location</button>
</geolocation>
```

Next, we include a `` element to print status messages and errors into.

```html
<p id="status">Status:</p>
```

Finally, we include a `` element to render the map into.

```html
<div id="map"></div>
```

#### JavaScript

In our script, we start off by grabbing a reference to the status `` element:

```js
const statusElem = document.querySelector("#status");
```

Next, we detect whether the `<geolocation>` element is supported by testing `typeof HTMLGeolocationElement === "function"`:

```js
if (typeof HTMLGeolocationElement === "function") {
  // <geolocation> is supported
} else {
  // <geolocation> is not supported; use fallback button
}
```

If `<geolocation>` is supported, the `if` block executes. It starts by grabbing a reference to the `<geolocation>` element:

```js
const geo = document.querySelector("geolocation");
```

Next, we add a `location` event listener to the resulting `HTMLGeolocationElement` object, to detect when the location data request is returned. If the data is returned successfully, we access it via the `HTMLGeolocationElement.position` property, and retrieve the latitude and longitude values. We log those to the console, then plot them on a map by passing them into the `drawMap()` function (which we will define later) along with a reference to the `HTMLGeolocationElement` object. If the data request fails, we access the error via the `HTMLGeolocationElement.error` property and log the error message to the console.

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

Next up, we add `promptdismiss` and `promptaction` event listeners to the resulting `HTMLGeolocationElement` object. These allow us to run functions in response to the user dismissing the `<geolocation>` prompt, or choosing an option from the prompt, respectively.

```js
geo.addEventListener("promptdismiss", notifyUserRetrySelection);
geo.addEventListener("promptaction", notifyUserGrantPermission);
```

Finally for the `if` block, we define the `notifyUserRetrySelection()` and `notifyUserGrantPermission()` functions referenced in the previous two event listeners. The former prints a message to the status paragraph telling the user to press the button again and allow location, as in this case, we will always want them to retry. The latter uses the `HTMLGeolocationElement.permissionStatus` property to check whether the permission status is `denied` or `prompt` and if so, we ask them to press the button again and allow location. We don't need to ask this if they already granted permission.

```js
function notifyUserRetrySelection() {
  statusElem.textContent =
    'Please press the "Use location" button again and allow location for this site.';
}

function notifyUserGrantPermission() {
  if (geo.permissionStatus === "denied" || geo.permissionStatus === "prompt") {
    statusElem.textContent =
      'Please press the "Use location" button again and allow location for this site.';
  }
}
```

If `<geolocation>` is not supported, the `else` block executes. This starts by grabbing a reference to the fallback `` element:

```js
const fallback = document.querySelector("#fallback");
```

Next, we add a `click` event handler to the resulting `HTMLButtonElement` object. Inside, we use a `Geolocation.getCurrentPosition()` call to emulate the success and failure cases in the `HTMLGeolocationElement` code path. The result is the same — we either plot the location data on a map by passing it into the `drawMap()` function (along with a reference to the `HTMLButtonElement` object), or print the error message to the status paragraph.

```js
fallback.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      drawMap(position.coords.latitude, position.coords.longitude, fallback);
    },
    (error) => {
      statusElem.textContent += `${error.message}, `;
    },
  );
});
```

The final step is to define the `drawMap()` function, which takes the latitude and longitude data as arguments, along with a reference to the button that triggered the command. The function body uses Leaflet JS code (see the Leaflet Quick Start Guide for an explanation) to plot the user's location on a map, prints a success message to the status paragraph, and hides the button. The last step is a simplification to stop the code erroring if the user presses the button again after success.

```js
function drawMap(lat, long, btn) {
  const map = L.map("map").setView([lat, long], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  const marker = L.marker([lat, long]).addTo(map);

  statusElem.textContent = "Map drawn successfully.";
  btn.style.display = "none";
}
```

#### Result

See this code running live (source code). Try viewing the demos in a supported browser and an unsupported browser if possible, and note the difference in permissions dialog flow when you allow permission to use `geolocation`.

Also try the following:

- After you've allowed `geolocation` permission and seen the map render, try revoking that permission using the available browser controls and then refresh the page to rest the example.
- Now try denying permission to use `geolocation` or dismissing the permission dialog and note how the `promptdismiss` and `promptaction` event listeners we set up earlier cause a message to be printed to the status paragraph to help the user use the page.

## See also

- `<geolocation>` element
- The `geolocation` Permissions Policy
- Geolocation API
- Permissions API
- Introducing the `<geolocation>` HTML element on developer.chrome.com (2026)
