---
title: "BeforeInstallPromptEvent: BeforeInstallPromptEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/beforeinstallpromptevent/beforeinstallpromptevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BeforeInstallPromptEvent: BeforeInstallPromptEvent() constructor

The **`BeforeInstallPromptEvent()`** constructor creates a new `BeforeInstallPromptEvent` object.

## Syntax

```js
new BeforeInstallPromptEvent(type)
new BeforeInstallPromptEvent(type, eventInitDict)
```

### Parameters

- `type`
    A string with the name of the event, set to `beforeinstallprompt`.
- `eventInitDict` (optional)
    An object with a single optional property `platforms`, which is an array of strings, listing the platforms on which the event will be dispatched.

## See also

- Making PWAs installable
- How to provide your own in-app install experience on web.dev (2021)
