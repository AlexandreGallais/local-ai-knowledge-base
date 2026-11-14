---
title: "BeforeInstallPromptEvent: userChoice property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/beforeinstallpromptevent/userchoice/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BeforeInstallPromptEvent: userChoice property

The **`userChoice`** property of the `BeforeInstallPromptEvent` interface represents the installation choice that the user made, when they were prompted to install the app.

## Value

A `Promise` which resolves to an object containing two properties:

- `outcome` (experimental) (non-standard)
    A string indicating whether the user chose to install the app or not. It must be one of the following values:
    - `"accepted"`: The user installed the app.
    - `"dismissed"`: The user did not install the app.

- `platform` (experimental) (non-standard)
    If the user chose to install the app, this is a string naming the selected platform, which is one of the values from the `BeforeInstallPromptEvent.platforms` property. If the user chose not to install the app, this is an empty string.

## See also

- Making PWAs installable
- How to provide your own in-app install experience on web.dev (2021)
