---
title: "HTMLMediaElement: networkState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/networkstate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: networkState property

The **`networkState`** read-only property of the `HTMLMediaElement` interface indicates the current state of the fetching of media over the network.

## Value

An `unsigned short`. Possible values are:

| Constant            | Value | Description                                                                           |
| ------------------- | ----- | ------------------------------------------------------------------------------------- |
| `NETWORK_EMPTY`     | 0     | There is no data yet. Also, `readyState` is `HAVE_NOTHING`.                           |
| `NETWORK_IDLE`      | 1     | HTMLMediaElement is active and has selected a resource, but is not using the network. |
| `NETWORK_LOADING`   | 2     | The browser is downloading HTMLMediaElement data.                                     |
| `NETWORK_NO_SOURCE` | 3     | No HTMLMediaElement src found.                                                        |

## Examples

This example will listen for the audio element to begin playing and then check if it is
still loading data.

```html
<audio id="example" preload="auto">
  <source src="sound.ogg" type="audio/ogg" />
</audio>
```

```js
const obj = document.getElementById("example");

obj.addEventListener("playing", () => {
  if (obj.networkState === 2) {
    // Still loading…
  }
});
```

## See also

- `HTMLMediaElement`: Interface used to define the `HTMLMediaElement.networkState` property
