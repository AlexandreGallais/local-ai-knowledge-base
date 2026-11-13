---
title: "ScreenDetailed: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screendetailed/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ScreenDetailed: label property

The **`label`** read-only property of the
`ScreenDetailed` interface is a string providing a descriptive label for the screen, for example "Built-in Retina Display".

This is useful for constructing a list of options to display to the user if you want them to choose a screen to display content on.

## Value

A string.

## Examples

```js
const screenDetails = await window.getScreenDetails();

// Return the label of the first screen
const screen1Label = screenDetails.screens[0].label;
```

## See also

- Window Management API
