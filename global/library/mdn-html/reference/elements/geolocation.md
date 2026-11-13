---
title: "`<geolocation>` HTML geolocation element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/geolocation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<geolocation>` HTML geolocation element

The **`<geolocation>`** HTML element creates an interactive control for the user to share their location data with the page.

It provides:

- An intuitive browser-defined UI.
- A process for handling the necessary permissions for the `geolocation` feature.
- API features for accessing location data and responding to received location data and permission changes.

## Attributes

This element includes the global attributes.

- `autolocate` (experimental)
    A boolean attribute that, when set to `true`, specifies that the browser should immediately retrieve location data when the `<geolocation>` element is rendered, provided permission was previously granted. If set to `false`, location data is not retrieved until the user activates the control. Defaults to `false`.

    If permission was not previously granted, this attribute has no effect.

- `watch` (experimental)
    A boolean attribute that, when set to `true`, specifies that the browser should retrieve location data whenever the position of the user's device changes. If set to `false`, location data is only retrieved once. Defaults to `false`.

## Description

The `<geolocation>` element provides a declarative browser-defined control for sharing location data. In Chrome, for example, the button features a "map pin" icon and intuitive text ("Use location" in English content).

It also allows for intuitive management of user permissions.
For example, in Chrome, if the user previously denied permission to access location data, or dismissed the permission dialog without making a choice, they are free to press the button again to update their choice.
In cases where they previously denied permission, subsequent dialogs will inform them that they previously didn't allow location data to be shared, and ask them whether they want to continue not allowing it, or to allow it.

A key <example-value> of the `<geolocation>` element is that it reflects the user's conscious choice, and blocks possible usage that might trick the user into providing their location data unwittingly (see `<geolocation>` blocking for more information).

The element's DOM API interface, `HTMLGeolocationElement`, provides features to access returned position data, current permission status, and errors if the data retrieval was unsuccessful, reducing the amount of JavaScript logic that needs to be written. It also has events available to run code in response to location data being received, changes in permission status, and user interactions with the permission dialog.

> **Note:**
> For performance reasons, a maximum of three `<geolocation>` elements are allowed on any one page. If this quota is exceeded, all `<geolocation>` elements have their functionality disabled.

### Relationship with the Geolocation API

The Geolocation API provides an older alternative for handling location data. This API has some shortcomings that the `<geolocation>` element aims to solve, most notably that the UI and underlying logic for requesting the data needs to be implemented from scratch each time, and the handling of permissions can be unintuitive.

The `<geolocation>` element uses features of the Geolocation API in the background. By default, the browser requests location data once, as if the `Geolocation.getCurrentPosition()` method was called. However, if the `watch` attribute is set to `true`, the browser updates the data whenever the device position changes, as if `Geolocation.watchPosition()` was called.

If data is successfully retrieved, it is available in the `HTMLGeolocationElement.position` property, which contains a `GeolocationPosition` object. If data retrieval is unsuccessful, error information is available in the `HTMLGeolocationElement.error` property, which contains a `GeolocationPositionError` object.

### Setting the button language

The global `lang` attribute is used by the `<geolocation>` element to select a language for its rendered text. This means that you can set a `lang` attribute directly on the `<geolocation>` element or on one of its ancestors to tell the browser what language to use for the button label.

If no suitable `lang` attribute is set, the browser's preferred language setting is used.

### Including fallback content

You can include fallback content between the `<geolocation>` element's opening and closing tags that will be displayed if it isn't supported. For example, you might include a "Not supported" message:

```html
<geolocation>
  <p>Your browser doesn't support the Geolocation element.</p>
</geolocation>
```

However, a better real-world solution might be to include a regular `` element that uses the Geolocation API to retrieve location data:

```html
<geolocation>
  <button id="fallback">Use location</button>
</geolocation>
```

### `<geolocation>` blocking

One key idea behind the design of the `<geolocation>` element is that it should reflect a user's conscious choice to expose position information, and prevent bad actors from tricking users into activating it, for example via clickjacking. Because of this, the browser keeps a record of so-called **blocker reasons** for each rendered element.

When a blocker is active on a `<geolocation>` element, it is prevented from functioning (blocked), either temporarily or permanently, depending on the reason. When a `<geolocation>` element is blocked, it is said to be invalid. You can check whether it is invalid by querying the `HTMLGeolocationElement.isValid` property. You can also return the reason why it is invalid via the `HTMLGeolocationElement.invalidReason` property — see that page for a full list of possible reasons.

### Styling restrictions

The `<geolocation>` element has several constraints on the CSS styles that can be applied to it. Some of these constraints are designed to enforce fundamental accessibility, and will result in the button being deactivated if they are not adhered to. Some enforce certain values or value ranges for various properties.

Any properties that are not listed in the following sub-sections, or logically equivalent to a physical property listed in the following sub-sections, are ignored when set on the `<geolocation>` element.

#### Accessibility restrictions

The rendered `<geolocation>` button is deactivated (meaning that pressing it will have no effect) if the following constraints are not adhered to:

- The color contrast ratio between `color` and `background-color` must be at least 3:1.
- The `font-size` must not be smaller than the `small` value (in the case of keyword values), or its computed value (in the case of other value types).

#### Value constraints

The following CSS property value constraints are applied to the `<geolocation>` element. If an attempt is made to set these properties to values outside the listed constraints on the `<geolocation>` element, the value is adjusted to equal the constraint (in the case of an exact value constraint) or to equal to nearest computed value upper or lower bound (in the case of a range constraint).

- `opacity`
    `1.0`
- `line-height`
    `normal`
- `white-space`
    `nowrap`
- `user-select`
    `none`
- `appearance`
    `auto`
- `box-sizing`
    `content-box`
- `vertical-align`
    `middle`
- `text-emphasis`
    `initial`
- `text-shadow`
    `initial`
- `outline-offset`
    `0` or greater.
- `font-weight`
    `200` or greater.
- `word-spacing`
    Between `0` and `0.5em`, inclusive.
- `letter-spacing`
    Between `-0.05em` and `0.2em`, inclusive.
- `letter-spacing`
    Between `-0.05em` and `0.2em`, inclusive.
- `min-height`
    `1em` or greater.
- `max-height`
    `3em` or less. `none` is an accepted value.
- `min-width`
    The computed value of `fit-content` or less.
- `border-width`
    `1em` or less.

#### Complex constraints

The following constraints are more complex than simple value constraints:

- Block direction padding
    If the `block-size` is set to `auto`, the `padding-block-start` and `padding-block-end` (and equivalent physical properties for the current writing mode) are constrained to a maximum of `1em` and must be equal.
- Inline direction padding
    If the `inline-size` is set to `auto`, the `padding-inline-start` and `padding-inline-end` (and equivalent physical properties for the current writing mode) are constrained to a maximum of `5em` and must be equal.

#### Properties that can be set normally

The following CSS properties can be used normally:

- `font-kerning`
- `font-optical-sizing`
- `font-stretch`
- `font-synthesis-weight`
- `font-synthesis-style`
- `font-synthesis-small-caps`
- `font-feature-settings`
- `forced-color-adjust`
- `text-rendering`
- `align-self`
- `anchor-name`
- `aspect-ratio`
- `border`, `border-top`, `border-right`, `border-bottom`, and `border-left`
- `clear`
- `color-scheme`
- `contain-intrinsic-width`
- `contain-intrinsic-height`
- `container-name`
- `container-type`
- `counter-reset`, `counter-increment`, and `counter-set`
- `flex`, `flex-grow`, `flex-shrink`, and `flex-basis`
- `float`
- `height`
- `isolation`
- `justify-self`
- `left`
- `order`
- `orphans`
- `outline`, `outline-color`, and `outline-style`
- `overflow-anchor`
- `overscroll-behavior`, `overscroll-behavior-inline`, `overscroll-behavior-block`, `overscroll-behavior-x`, and `overscroll-behavior-y`
- `page`
- `position`
- `position-anchor`
- `right`
- `scroll-margin`, `scroll-margin-top`, `scroll-margin-right`, `scroll-margin-bottom`, and `scroll-margin-left`
- `scroll-padding`, `scroll-padding-top`, `scroll-padding-right`, `scroll-padding-bottom`, `scroll-padding-left`, `scroll-padding-inline-start`, `scroll-padding-block-start`, `scroll-padding-block-start`, `scroll-padding-inline-end`, and `scroll-padding-block-end`
- `text-spacing-trim`
- `text-transform`
- `top`
- `visibility`
- `x`
- `y`
- `ruby-position`
- `user-select`
- `width`
- `will-change`
- `z-index`

## Accessibility

The `<geolocation>` element has an accessible name written in the language it is set to. It also has a `role` of `button` so that it is recognized as a button by screen readers.

In addition, the `<geolocation>` element has a default `tabindex` value of `0`, so it behaves like a real `` with respect to keyboard focus.

Finally, refer back to the Accessibility restrictions section for information on styling constraints applied to the `<geolocation>` element to enforce fundamental accessibility requirements.

## Examples

### Basic usage example

This example uses the `<geolocation>` element to retrieve your current location, which is printed out below the button in a `` element. The example also uses a regular `` fallback to retrieve the location data in non-supporting browsers.

#### HTML

We include a `<geolocation>` element with a `` fallback nested inside it, which will be rendered in browsers that do not support `<geolocation>`. We also include a `` to output location data and errors into.

```html
<geolocation>
  <button id="fallback">Use location</button>
</geolocation>
<p id="output"></p>
```

#### JavaScript

In our script, we start off by grabbing a reference to the output `` element. We then detect whether the `<geolocation>` element is supported by testing `typeof HTMLGeolocationElement === "function"`:

- If it is supported, we first grab a reference to the `<geolocation>` element and then add a `location` event listener.
  When the button is pressed and the data is retrieved, the listener prints the (lat, long) coordinates to the output `` (retrieved via the `position` property), or an error message if the data retrieval was unsuccessful (retrieved via the `error` property).
- If it isn't supported, we grab a reference to the fallback `` element and retrieve and print the same data, except that this time we are using a `click` event listener on the button, and a `Geolocation.getCurrentPosition()` call to retrieve the data.

```js
const outputElem = document.querySelector("#output");

if (typeof HTMLGeolocationElement === "function") {
  const geo = document.querySelector("geolocation");
  geo.addEventListener("location", () => {
    if (geo.position) {
      outputElem.textContent += `(${geo.position.coords.latitude},${geo.position.coords.longitude}), `;
    } else if (geo.error) {
      outputElem.textContent += `${geo.error.message}, `;
    }
  });
} else {
  const fallback = document.querySelector("#fallback");
  fallback.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        outputElem.textContent += `(${position.coords.latitude}, ${position.coords.longitude}), `;
      },
      (error) => {
        outputElem.textContent += `${error.message}, `;
      },
    );
  });
}
```

#### Result

See this code running live (source code). You can also find a version of this example that includes the `watch` attribute on the `<geolocation>` element and therefore fetches location data each time the user's device position changes (see it running live, and the source code).

Try viewing the demos in a supported browser and an unsupported browser if possible, and note the difference in permissions dialog flow when you choose to allow or deny permission to use `geolocation`.

For a walkthrough of a more complete example that uses location data to create a map of your local area, see the `HTMLGeolocationElement` reference page.

## Technical summary

       |
        Content categories

       |
        Flow content,
        phrasing content, interactive content, palpable content.

       | Permitted content
       | Any suitable transparent fallback content.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       | Any element that accepts phrasing content.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       |
        `button`

       | DOM interface
       | `HTMLGeolocationElement`

## See also

- `HTMLGeolocationElement`
- The `geolocation` Permissions Policy
- Geolocation API
- Permissions API
- Introducing the `<geolocation>` HTML element on developer.chrome.com (2026)
