---
title: "Screen: orientation property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screen/orientation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Screen: orientation property

The **`orientation`** read-only property of the
`Screen` interface returns the current orientation of the screen.

## Value

An instance of `ScreenOrientation` representing the orientation of the
screen.

Note that older, prefixed versions returned a string equivalent to
`ScreenOrientation.type`.

## Examples

```js
switch (screen.orientation.type) {
  case "landscape-primary":
    console.log("That looks good.");
    break;
  case "landscape-secondary":
    console.log("Mmm… the screen is upside down!");
    break;
  case "portrait-secondary":
  case "portrait-primary":
    console.log("Mmm… you should rotate your device to landscape");
    break;
  default:
    console.log("The orientation API isn't supported in this browser :(");
}
```

## See also

- `ScreenOrientation`
- `orientationchange` event
- Managing screen orientation
