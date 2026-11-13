---
title: "Using the Permissions API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/permissions_api/using_the_permissions_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the Permissions API

This article provides a basic guide to using the Permissions API, which provides a programmatic way to query the status of API permissions attributed to the current context.

## The trouble with asking for permission…

Permissions on the Web are a necessary evil, but they are not much fun to deal with as developers.

Historically, different APIs handle their own permissions inconsistently — for example the Notifications API had its own methods for checking the permission status and requesting permission, whereas the Geolocation API did not.

The Permissions API provides a consistent approach for developers, and allows them to implement a better user experience as far as permissions are concerned.
Specifically, developers can use `Permissions.query()` to check whether permission to use a particular API in the current context is granted, denied, or requires specific user permission via a prompt.
Querying permissions in the main thread is broadly supported, and also in Workers (with a notable exception).

Many APIs now enable permission querying, such as the Clipboard API, Notifications API, Push API, and Web MIDI API. A list of many permission enabled APIs is provided in the API Overview, and you can get a sense of browser support in the compatibility table here.

`Permissions` has other methods to specifically request permission to use an API, and to revoke permission, but these are deprecated (non-standard, and/or not broadly supported).

## A simple example

For this article, we have put together a simple demo called Location Finder. It uses Geolocation to query the user's current location and plot it out on a Google Map:

You can run the example live, or view the source code on GitHub. Most of the code is simple and unremarkable — below we'll just be walking through the Permissions API-related code, so check the code yourself if you want to study any of the other parts.

### Accessing the Permissions API

The `Navigator.permissions` property has been added to the browser to allow access to the global `Permissions` object. This object will eventually include methods for querying, requesting, and revoking permissions, although currently it only contains `Permissions.query()`; see below.

### Querying permission state

In our example, the Permissions functionality is handled by one function — `handlePermission()`. This starts off by querying the permission status using `Permissions.query()`. Depending on the value of the `state` property of the `PermissionStatus` object returned when the promise resolves, it reacts differently:

- `"granted"`
    The "Enable Geolocation" button is hidden, as it isn't needed if Geolocation is already active.
- `"prompt"`
    The "Enable Geolocation" button is hidden, as it isn't needed if the user will be prompted to grant permission for Geolocation. The `Geolocation.getCurrentPosition()` function is then run, which prompts the user for permission; it runs the `revealPosition()` function if permission is granted (which shows the map), or the `positionDenied()` function if permission is denied (which makes the "Enable Geolocation" button appear).
- `"denied"`
    The "Enable Geolocation" button is revealed (this code needs to be here too, in case the permission state is already set to denied for this origin when the page is first loaded).

```js
function handlePermission() {
  navigator.permissions.query({ name: "geolocation" }).then((result) => {
    if (result.state === "granted") {
      report(result.state);
      geoBtn.style.display = "none";
    } else if (result.state === "prompt") {
      report(result.state);
      geoBtn.style.display = "none";
      navigator.geolocation.getCurrentPosition(
        revealPosition,
        positionDenied,
        geoSettings,
      );
    } else if (result.state === "denied") {
      report(result.state);
      geoBtn.style.display = "inline";
    }
    result.addEventListener("change", () => {
      report(result.state);
    });
  });
}

function report(state) {
  console.log(`Permission ${state}`);
}

handlePermission();
```

### Permission descriptors

The `Permissions.query()` method takes a `PermissionDescriptor` dictionary as a parameter — this contains the name of the API you are interested in. Some APIs have more complex `PermissionDescriptor`s containing additional information, which inherit from the default `PermissionDescriptor`. For example, the `PushPermissionDescriptor` should also contain a Boolean that specifies if `userVisibleOnly` is `true` or `false`.

### Responding to permission state changes

You'll notice that we're listening to the `change` event in the code above, attached to the `PermissionStatus` object — this allows us to respond to any changes in the permission status for the API we are interested in. At the moment we are just reporting the change in state.
