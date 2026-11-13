---
title: "XRInputSourceArray: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrinputsourcearray/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRInputSourceArray: length property

The read-only **`length`** property returns an integer value
indicating the number of items in the input source list represented by
the `XRInputSourceArray` object.

## Value

An integer value indicating the number of `XRInputSource` objects
representing WebXR input sources are included in the array.

## Examples

In this example, a game that requires at least one input source
uses `length` to check this before proceeding to allow the user to play the
game.

```js
let sources = xrSession.inputSources;

if (sources.length === 0) {
  showAlertDialog(
    "You need to have at least one controller to play Super Duper Shark Jump Fest 9000.",
    [
      { label: "Shop Now", url: "https://www.example.com/shop/controllers" },
      { label: "Quit", handler: quitGame },
    ],
  );
}
```

Here, if `length` is 0, a
hypothetical `showAlertDialog()` function is called with a prompt string
explaining the need for a controller, and an array of objects, each describing a button
and what should happen when it's clicked. The first takes the user to an Amazon.com
search for VR controllers, and the second calls a `quitGame()` function to
start shutting the game program down.
