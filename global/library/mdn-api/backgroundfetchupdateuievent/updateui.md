---
title: "BackgroundFetchUpdateUIEvent: updateUI() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/backgroundfetchupdateuievent/updateui/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BackgroundFetchUpdateUIEvent: updateUI() method

The **`updateUI()`** method of the `BackgroundFetchUpdateUIEvent` interface updates the title and icon in the user interface to show the status of a background fetch.

This method may only be run once, to notify the user on a failed or a successful fetch.

## Syntax

```js
updateUI()
updateUI(options)
```

### Parameters

- `options` (optional)
    An object containing any of the following:
    - `icons` (optional)
        A list of one or more image resources, containing icons for use in the user interface. An image resource is an object containing:
        - `src`
            A string which is a URL of an image.
        - `sizes` (optional)
            A string which is equivalent to the `sizes` attribute of the `<link>` element.
        - `type` (optional)
            A string containing an image MIME type.
        - `label` (optional)
            A string providing a name for the associated image.

    - `title` (optional)
        A string containing the new title of the user interface.

### Return value

A `Promise`.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if any of the following are true:
    - The `isTrusted` property is `false`.
    - The `BackgroundFetchUpdateUIEvent` UI updated flag is already set, indicating that the `updateUI()` method has already been called.
    - The `BackgroundFetchUpdateUIEvent` is not active.

## Examples

The following example demonstrates updating the UI with a title and image icon on a successful fetch.

```js
addEventListener("backgroundfetchsuccess", (event) => {
  event.updateUI({
    title: "Episode 5 ready to listen!",
    icon: {
      src: "path/to/success.ico",
      sizes: "16x16 32x32 64x64",
    },
  });
});
```
