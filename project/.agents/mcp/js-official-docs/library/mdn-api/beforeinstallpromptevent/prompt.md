---
title: "BeforeInstallPromptEvent: prompt() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/beforeinstallpromptevent/prompt/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BeforeInstallPromptEvent: prompt() method

The **`prompt()`** method of the `BeforeInstallPromptEvent` interface allows a developer to show the
install prompt at a time of their own choosing. Typically this will be called in the event handler for the app's custom install UI.

This method must be called in the event handler for a user action (such as a button click) and may only be called once on a given `BeforeInstallPromptEvent` instance.

## Syntax

```js
prompt()
```

### Parameters

None.

### Return value

A `Promise` resolving to an object containing the following properties:

- `outcome` (experimental) (non-standard)
    A string indicating whether the user chose to install the app or not. It must be one of the following values:
    - `"accepted"`: The user installed the app.
    - `"dismissed"`: The user did not install the app.

- `platform` (experimental) (non-standard)
    If the user chose to install the app, this is a string naming the selected platform, which is one of the values from the `BeforeInstallPromptEvent.platforms` property. If the user chose not to install the app, this is an empty string.

## Examples

See the example for the `BeforeInstallPromptEvent` interface.

## See also

- Making PWAs installable
- How to provide your own in-app install experience on web.dev (2021)
