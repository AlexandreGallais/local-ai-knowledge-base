---
title: "Screen: change event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screen/change_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Screen: change event

The **`change`** event of the `Screen` interface is fired on a specific screen when one or more of the following properties change on it:

- `width`
- `height`
- `availWidth`
- `availHeight`
- `colorDepth`
- `orientation`

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("change", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onchange = (event) => { }
```

## Event type

A generic `Event`.

## Examples

```js
const firstScreen = (await window.getScreenDetails()).screens[0];
firstScreen.addEventListener("change", (event) => {
  console.log("The first screen has changed.", event, firstScreen);
});
```

## See also

- Window Management API
