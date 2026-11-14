---
title: "Starting up and shutting down a WebXR session (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webxr_device_api/startup_and_shutdown/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Starting up and shutting down a WebXR session

Assuming you're already familiar with 3D graphics in general and WebGL in particular, taking that next bold step into mixed reality—the idea of presenting artificial scenery or objects in addition to or in place of the real world—is not overly complicated. Before you can begin to render your augmented or virtual reality scenario, you need to create and set up the WebXR session, and you should know how to shut it down properly as well. You will learn how to do these things in this article.

## Accessing the WebXR API

Your app's access to the WebXR API begins with the `XRSystem` object. This object represents the overall WebXR device suite available to you through the hardware and drivers available on the user's equipment. There is a global `XRSystem` object available for use by your document through the `Navigator` property `xr`, which returns the `XRSystem` object if suitable XR hardware is available for your use given the hardware available and your document's environment.

Thus the simplest code that fetches the `XRSystem` object is:

```js
const xr = navigator.xr;
```

The value of `xr` will be `null` or `undefined` if WebXR isn't available.

### WebXR availability

As a new and still in development API, WebXR support is limited to specific devices and browsers; and even on those, it may not be enabled by default. There may be options available to allow you to experiment with WebXR even if you don't have a compatible system, however.

#### WebXR polyfill

The team designing the WebXR specification has published a WebXR polyfill which you can use to simulate WebXR on browsers which don't have support for the WebXR APIs. If the browser supports the older WebVR API, that is used. Otherwise, the polyfill falls back to an implementation which uses Google's Cardboard VR API.

The polyfill is maintained alongside the specification, and is kept up to date with the specification. Additionally, it is updated to maintain compatibility with browsers as their support for WebXR and other technologies related to it and to the implementation of the polyfill change over time.

Be sure to read the readme carefully; the polyfill comes in several versions depending on what degree of compatibility with newer JavaScript features your target browsers include.

##### Emulator usage

While somewhat awkward compared to using an actual headset, this makes it possible to experiment with and developer WebXR code on a desktop computer, where WebXR isn't normally available. It also lets you perform some basic <example-value> before taking your code to a real device. Be aware, however, that the emulator does not yet completely emulate all of the WebXR API, so you may run into problems you're not expecting. Again, carefully read the readme file and make sure you're aware of the limitations before you begin.

**Important:** You should _always_ test your code on actual AR and/or VR hardware before releasing or shipping a product! Emulated, simulated, or polyfilled environments are _not_ an adequate substitute for actual testing on physical devices.

##### Getting the extension

Download the WebXR API Emulator for your supported browser below:

- Mozilla Firefox

The source code for the extension is also available on GitHub.

##### Emulator issues and notes

While this isn't the place for a full article about the extension, there are some specific things worth mentioning.

Version 0.4.0 of the extension was announced on March 26, 2020. It introduced support for augmented reality (AR) through the WebXR AR Module, which has is approaching a stable state. Documentation for AR is forthcoming shortly here on MDN.

Other improvements include updating the emulator to rename the `XR` interface to `XRSystem`, introduce support for squeeze (grip) input sources, and add support for the `XRInputSource` property `profiles`.

### Context requirements

A WebXR compatible environment starts with a securely-loaded document. Your document needs to either have been loaded from the local drive (such as by using a URL such as `http://localhost/…`), or using HTTPS when loading the page. The JavaScript code must, likewise, have been loaded securely.

If the document wasn't loaded securely, you won't get very far. The `navigator.xr` property doesn't even exist if the document wasn't loaded securely. This may also be the case if there is no compatible XR hardware available. Either way, you need to be prepared for the lack of an `xr` property and either gracefully handle the error or provide some form of fallback.

### Falling back to the WebXR polyfill

One fallback option is the WebXR polyfill, provided by the Immersive Web Working Group that's in charge of the WebXR standardization process. The polyfill brings support for WebXR to browsers that don't have native WebXR support, and smooths out the inconsistencies among implementations in the browsers that do have it, so it can sometimes also be useful even if WebXR is natively available.

Here we define a `getXR()` function, which returns the `XRSystem` object after optionally installing the polyfill, assuming that the polyfill has been included or loaded using a prior `<script>` tag.

```js
let webxrPolyfill = null;

function getXR(usePolyfill) {
  let tempXR;

  switch (usePolyfill) {
    case "if-needed":
      tempXR = navigator.xr;
      if (!tempXR) {
        webxrPolyfill = new WebXRPolyfill();
        tempXR = webxrPolyfill;
      }
      break;
    case "yes":
      webxrPolyfill = new WebXRPolyfill();
      tempXR = webxrPolyfill;
      break;
    case "no":
    default:
      tempXR = navigator.xr;
      break;
  }

  return tempXR;
}

const nativeXr = getXR("no"); // Get the native XRSystem object
const polyfilledXr = getXR("yes"); // Always returns an XRSystem from the polyfill
const xr = getXR("if-needed"); // Use the polyfill only if navigator.xr missing
```

The returned `XRSystem` object can then be used according to the documentation provided here on MDN. The global variable `webxrPolyfill` is used only to retain a reference to the polyfill in order to ensure that it remains available until you no longer need it. Setting it to `null` signals that the polyfill can be garbage collected when no objects depending on it are using it anymore.

Of course, you can simplify this depending on your needs; since your app is probably not going to go back and forth much on whether or not to use the polyfill, you can simplify this to just the specific case you need.

### Permissions and security

There are a number of security measures in place revolving around WebXR. First among these is that use of `immersive-vr` mode—which entirely replaces the user's view of the world—requires that the `xr-spatial-tracking` permission policy be in place. On top of that, the document needs to be secure and currently focused. Finally, you must call `requestSession()` from a user event handler, such as the handler for the `click` event.

For more specifics about securing WebXR activities and usage, see the article Permissions and security for WebXR.

### Confirming the session type you need is available

Before trying to create a new WebXR session, it's often wise to first check to see if the user's hardware and software support the presentation mode you wish to use. This can also be used to determine whether to use an immersive or an inline presentation, for example.

To find out if a given mode is supported, call the `XRSystem` method `isSessionSupported()`. This returns a promise which resolves to `true` if the given type of session is available for use or `false` otherwise.

```js
const immersiveOK = await navigator.xr.isSessionSupported("immersive-vr");
if (immersiveOK) {
  // Create and use an immersive VR session
} else {
  // Create an inline session instead, or tell the user about the
  // incompatibility if inline is required
}
```
