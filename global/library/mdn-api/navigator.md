---
title: "Navigator"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator

The **`Navigator`** interface represents the state and the identity of the user agent. It allows scripts to query it and to register themselves to carry on some activities.

A `Navigator` object can be retrieved using the read-only `window.navigator` property.

## Instance properties

_Doesn't inherit any properties._

### Standard properties

- `Navigator.audioSession` (read-only) (experimental)
    Returns an `AudioSession` object that can be used to control how audio from the web application interacts with other audio playing on the device.
- `Navigator.bluetooth` (read-only) (experimental) (secure context)
    Returns a `Bluetooth` object for the current document, providing access to Web Bluetooth API functionality.
- `Navigator.clipboard` (read-only) (secure context)
    Returns a `Clipboard` object that provides read and write access to the system clipboard.
- `Navigator.connection` (read-only)
    Returns a `NetworkInformation` object containing information about the network connection of a device.
- `Navigator.contacts` (read-only) (experimental) (secure context)
    Returns a `ContactsManager` interface which allows users to select entries from their contact list and share limited details of the selected entries with a website or application.
- `Navigator.cookieEnabled` (read-only)
    Returns false if setting a cookie will be ignored and true otherwise.
- `Navigator.credentials` (read-only) (secure context)
    Returns the `CredentialsContainer` interface which exposes methods to request credentials and notify the user agent when interesting events occur such as successful sign in or sign out.
- `Navigator.deviceMemory` (read-only) (secure context) (non-standard)
    Returns the amount of device memory in gigabytes. This value is an approximation given by rounding to the nearest power of 2 and dividing that number by 1024.
- `Navigator.devicePosture` (read-only) (experimental)
    Returns the browser's `DevicePosture` object, which allows developers to query the device's current posture (that is, whether the viewport is in a flat or folded state) and run code in response to posture changes.
- `Navigator.geolocation` (read-only)
    Returns a `Geolocation` object allowing accessing the location of the device.
- `Navigator.gpu` (read-only) (secure context)
    Returns the `GPU` object for the current browsing context. The entry point for the `WebGPU API`.
- `Navigator.hardwareConcurrency` (read-only)
    Returns the number of logical processor cores available.
- `Navigator.hid` (read-only) (experimental) (secure context)
    Returns an `HID` object providing methods for connecting to HID devices, listing attached HID devices, and event handlers for connected HID devices.
- `Navigator.ink` (read-only) (experimental)
    Returns an `Ink` object for the current document, providing access to Ink API functionality.
- `Navigator.keyboard` (read-only) (experimental) (secure context)
    Returns a `Keyboard` object which provides access to functions that retrieve keyboard layout maps and toggle capturing of key <example-value> from the physical keyboard.
- `Navigator.language` (read-only)
    Returns a string representing the preferred language of the user, usually the language of the browser UI. The `null` value is returned when this is unknown.
- `Navigator.languages` (read-only)
    Returns an array of strings representing the languages known to the user, by order of preference.
- `Navigator.locks` (read-only) (secure context)
    Returns a `LockManager` object that provides methods for requesting a new `Lock` object and querying for an existing `Lock` object.
- `Navigator.login` (read-only) (secure context)
    Provides access to the browser's `NavigatorLogin` object, which a federated identity provider (IdP) can use to set a user's login status when they sign into or out of the IdP. See Federated Credential <example-value> (FedCM) API for more details.
- `Navigator.maxTouchPoints` (read-only)
    Returns the maximum number of simultaneous touch contact points are supported by the current device.
- `Navigator.mediaCapabilities` (read-only)
    Returns a `MediaCapabilities` object that can expose information about the decoding and encoding capabilities for a given format and output capabilities.
- `Navigator.mediaDevices` (read-only) (secure context)
    Returns a reference to a `MediaDevices` object which can then be used to get information about available media devices (`MediaDevices.enumerateDevices()`), find out what constrainable properties are supported for media on the user's computer and user agent (`MediaDevices.getSupportedConstraints()`), and to request access to media using `MediaDevices.getUserMedia()`.
- `Navigator.mediaSession` (read-only)
    Returns `MediaSession` object which can be used to provide metadata that can be used by the browser to present information about the currently-playing media to the user, such as in a global media controls UI.
- `Navigator.onLine` (read-only)
    Returns a boolean value indicating whether the browser is working online.
- `Navigator.pdfViewerEnabled` (read-only)
    Returns `true` if the browser can display PDF files inline when navigating to them, and `false` otherwise.
- `Navigator.permissions` (read-only)
    Returns a `Permissions` object that can be used to query and update permission status of APIs covered by the Permissions API.
- `Navigator.preferences` (read-only) (experimental) (secure context)
    Returns the document's current `PreferenceManager` object, which provides access to user preference information.
- `Navigator.presentation` (read-only) (secure context)
    Returns a reference to the `Presentation` API.
- `Navigator.scheduling` (read-only) (experimental)
    Returns a `Scheduling` object for the current document.
- `Navigator.serial` (read-only) (secure context)
    Returns a `Serial` object, which represents the entry point into the Web Serial API to enable the control of serial ports.
- `Navigator.serviceWorker` (read-only) (secure context)
    Returns a `ServiceWorkerContainer` object, which provides access to registration, removal, upgrade, and communication with the `ServiceWorker` objects for the associated document.
- `Navigator.storage` (read-only) (secure context)
    Returns the singleton `StorageManager` object used for managing persistence permissions and estimating available storage on a site-by-site/app-by-app basis.
- `Navigator.usb` (read-only) (secure context)
    Returns a `USB` object for the current document, providing access to WebUSB API functionality.
- `Navigator.userActivation` (read-only)
    Returns a `UserActivation` object containing information about the current window's user activation state.
- `Navigator.userAgent` (read-only)
    Returns the user agent string for the current browser.
- `Navigator.userAgentData` (read-only) (experimental) (secure context)
    Returns a `NavigatorUAData` object, which gives access to information about the browser and operating system of the user.
- `Navigator.virtualKeyboard` (read-only) (experimental) (secure context)
    Returns a reference to the `VirtualKeyboard` API, to take control of the on-screen virtual keyboard.
- `Navigator.wakeLock` (read-only) (secure context)
    Returns a `WakeLock` interface you can use to request screen wake locks and prevent screen from dimming, turning off, or showing a screen saver.
- `Navigator.webdriver` (read-only)
    Indicates whether the user agent is controlled by automation.
- `Navigator.windowControlsOverlay` (read-only) (secure context)
    Returns the `WindowControlsOverlay` interface which exposes information about the geometry of the title bar in desktop Progressive Web Apps, and an event to know whenever it changes.
- `Navigator.xr` (read-only) (experimental) (secure context)
    Returns `XRSystem` object, which represents the entry point into the WebXR API.

### Deprecated properties

- `Navigator.activeVRDisplays` (read-only) (deprecated) (non-standard)
    Returns an array containing every `VRDisplay` object that is currently presenting (`VRDisplay.isPresenting` is `true`).
- `Navigator.appCodeName` (read-only)
    Always returns `'Mozilla'`, in any browser.
- `Navigator.appName` (read-only)
    Always returns `'Netscape'`, in any browser.
- `Navigator.appVersion` (read-only)
    Returns the version of the browser as a string. Do not rely on this property to return the correct value.
- `Navigator.doNotTrack` (read-only) (deprecated) (non-standard)
    Reports the value of the user's do-not-track preference. When this value is "1", your website or application should not track the user.
- `Navigator.mimeTypes` (read-only)
    Returns a `MimeTypeArray` listing the MIME types supported by the browser.
- `Navigator.oscpu` (read-only)
    Returns a string that represents the current operating system.
- `Navigator.platform` (read-only)
    Returns a string representing the platform of the browser. Do not rely on this function to return a significant value.
- `Navigator.plugins` (read-only)
    Returns a `PluginArray` listing the plugins installed in the browser.
- `Navigator.product` (read-only)
    Always returns `'Gecko'`, in any browser.
- `Navigator.productSub` (read-only)
    Returns either the string `'20030107'`, or `'"20100101'`.
- `Navigator.vendor` (read-only)
    Returns either the empty string, `'Apple Computer Inc.'`, or `'Google Inc.'`.
- `Navigator.vendorSub` (read-only)
    Always returns the empty string.

### Non-standard properties

- `Navigator.buildID` (read-only) (non-standard)
    Returns the build identifier of the browser. In modern browsers this property now returns a fixed timestamp as a privacy measure, e.g., `20181001000000` in Firefox 64 onwards.
- `Navigator.globalPrivacyControl` (read-only) (experimental)
    Returns a boolean indicating a user's consent to their information being shared or sold.
- `Navigator.standalone` (read-only) (non-standard)
    Returns a boolean indicating whether the browser is running in standalone mode. Available on Apple's iOS Safari only.

## Instance methods

_Doesn't inherit any method._

- `Navigator.canShare()` (secure context)
    Returns `true` if a call to `Navigator.share()` would succeed.
- `Navigator.clearAppBadge()` (secure context)
    Clears a badge on the current app's icon and returns a `Promise` that resolves with `undefined`.
- `Navigator.deprecatedReplaceInURN()` (experimental)
    Substitutes specified strings inside the mapped URL corresponding to a given opaque URN or `FencedFrameConfig`'s internal `url` property. This method has been made available as a temporary measure (hence "deprecated") to enable that substitution for fenced frame URLs, helping ad tech providers to migrate existing implementations across to privacy sandbox APIs.
- `Navigator.getAutoplayPolicy()` (experimental)
    Returns a value indicating whether the specified media element, audio context, or media feature "type" is allowed to autoplay.
- `Navigator.getBattery()` (secure context)
    Returns a promise that resolves with a `BatteryManager` object that returns information about the battery charging status.
- `Navigator.getGamepads()`
    Returns an array of `Gamepad` objects, one for each gamepad connected to the device.
- `Navigator.getInstalledRelatedApps()` (experimental) (secure context)
    Returns a promise that resolves with an array of objects representing any related native or Progressive Web Applications that the user has installed.
- `Navigator.registerProtocolHandler()` (secure context)
    Allows websites to register themselves as a possible handler for a given protocol.
- `Navigator.requestMediaKeySystemAccess()` (secure context)
    Returns a `Promise` for a MediaKeySystemAccess object.
- `Navigator.requestMIDIAccess()` (secure context)
    Returns a `Promise` representing a request for access to MIDI devices on the user's system.
- `Navigator.sendBeacon()`
    Used to asynchronously transfer a small amount of data using HTTP from the User Agent to a web server.
- `Navigator.setAppBadge()` (secure context)
    Sets a badge on the icon associated with this app and returns a `Promise` that resolves with `undefined`.
- `Navigator.share()` (secure context)
    Invokes the native sharing mechanism of the current platform.
- `Navigator.vibrate()`
    Causes vibration on devices with support for it. Does nothing if vibration support isn't available.
- `Navigator.unregisterProtocolHandler()` (secure context)
    Unregister a website that is a handler for a given protocol.

### Deprecated methods

- `Navigator.getUserMedia()` (deprecated) (secure context)
    After having prompted the user for permission, returns the audio or video stream associated to a camera or microphone on the local computer.
- `Navigator.getVRDisplays()` (deprecated) (non-standard)
    Returns a promise that resolves to an array of `VRDisplay` objects representing any available VR devices connected to the computer.
- `Navigator.javaEnabled()`
    Always returns false.
- `Navigator.taintEnabled()`
    Returns `false`. JavaScript taint/untaint functions removed in JavaScript 1.2.
