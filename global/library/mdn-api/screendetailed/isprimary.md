---
title: "ScreenDetailed: isPrimary property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screendetailed/isprimary/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ScreenDetailed: isPrimary property

The **`isPrimary`** read-only property of the
`ScreenDetailed` interface is a boolean indicating whether the screen is set as the operating system (OS) primary screen or not.

The OS hosting the browser will have one primary screen, and one or more secondary screens. The primary screen can usually be specified by the user via OS settings, and generally contains OS UI features such as the taskbar/icon dock. The primary screen may change for a number of reasons, such as a screen being unplugged.

## Value

A boolean value — `true` if the screen is primary, and `false` if it is secondary.

## Examples

```js
const screenDetails = await window.getScreenDetails();

// Is the first screen primary?
const screen1Primary = screenDetails.screens[0].isPrimary;
```

## See also

- Window Management API
