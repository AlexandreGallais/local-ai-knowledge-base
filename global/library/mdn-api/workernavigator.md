---
title: "WorkerNavigator"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workernavigator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerNavigator

The **`WorkerNavigator`** interface represents a subset of the `Navigator` interface allowed to be accessed from a `Worker`. Such an object is initialized for each worker and is available via the `self.navigator` property.

## Instance properties

_The `WorkerNavigator` interface doesn't inherit any property._

- `WorkerNavigator.appCodeName` (read-only)
    Always returns `'Mozilla'`, in any browser. This property is kept only for compatibility purposes.
- `WorkerNavigator.appName` (read-only)
    Returns the official name of the browser. Do not rely on this property to return the correct value.
- `WorkerNavigator.appVersion` (read-only)
    Returns the version of the browser as a string. Do not rely on this property to return the correct value.
- `WorkerNavigator.connection` (read-only)
    Provides a `NetworkInformation` object containing information about the network connection of a device.
- `WorkerNavigator.deviceMemory` (read-only) (secure context) (non-standard)
    Returns the amount of device memory in gigabytes. This value is an approximation given by rounding to the nearest power of 2 and dividing that number by 1024.
- `WorkerNavigator.globalPrivacyControl` (read-only)
    Returns a boolean indicating a user's consent to their information being shared or sold.
- `WorkerNavigator.gpu` (read-only) (secure context)
    Returns the `GPU` object for the current worker context. The entry point for the `WebGPU API`.
- `WorkerNavigator.hardwareConcurrency` (read-only)
    Returns the number of logical processor cores available.
- `WorkerNavigator.hid` (read-only) (experimental) (secure context)
    Returns an `HID` object providing methods for connecting to HID devices already granted permission by the user and listing attached HID devices, and event handlers for responding to HID devices connecting and disconnecting.
- `WorkerNavigator.language` (read-only)
    Returns a string representing the preferred language of the user, usually the language of the browser UI. The `null` value is returned when this is unknown.
- `WorkerNavigator.languages` (read-only)
    Returns an array of strings representing the languages known to the user, by order of preference.
- `WorkerNavigator.locks` (read-only) (secure context)
    Returns a `LockManager` object which provides methods for requesting a new `Lock` object and querying for an existing `Lock` object.
- `WorkerNavigator.mediaCapabilities` (read-only)
    Returns a `MediaCapabilities` object that can expose information about the decoding and encoding capabilities for a given format and output capabilities.
- `WorkerNavigator.onLine` (read-only)
    Returns a boolean value indicating whether the browser is online.
- `WorkerNavigator.permissions` (read-only)
    Returns a `Permissions` object that can be used to query and update permission status of APIs covered by the Permissions API.
- `WorkerNavigator.platform` (read-only)
    Returns a string representing the platform of the browser. Do not rely on this property to return the correct value.
- `WorkerNavigator.product` (read-only)
    Always returns `'Gecko'`, on any browser. This property is kept only for compatibility purposes.
- `WorkerNavigator.serial` (read-only) (secure context)
    Returns a `Serial` object, which represents the entry point into the Web Serial API, to enable the control of serial ports.
- `WorkerNavigator.serviceWorker` (read-only) (secure context)
    Returns a `ServiceWorkerContainer` object, which provides access to registration, removal, upgrade, and communication with the `ServiceWorker` objects for the associated document.
- `WorkerNavigator.storage` (read-only) (secure context)
    Returns a `StorageManager` interface for managing persistence permissions and estimating available storage.
- `WorkerNavigator.usb` (read-only) (secure context)
    Returns a `USB` object for the current document, providing access to WebUSB API functionality.
- `WorkerNavigator.userAgent` (read-only)
    Returns the user agent string for the current browser.
- `WorkerNavigator.userAgentData` (read-only) (experimental) (secure context)
    Returns a `NavigatorUAData` object, which gives access to information about the browser and operating system of the user.

## Instance methods

_The `WorkerNavigator` interface doesn't inherit any method._

- `WorkerNavigator.clearAppBadge()` (secure context)
    Clears a badge on the current app's icon and returns a `Promise` that resolves with `undefined`.
- `WorkerNavigator.setAppBadge()` (secure context)
    Sets a badge on the icon associated with this app and returns a `Promise` that resolves with `undefined`.

## See also

- Other Worker-related interfaces: `Worker`, `WorkerLocation`, and `WorkerGlobalScope`
- Using web workers
