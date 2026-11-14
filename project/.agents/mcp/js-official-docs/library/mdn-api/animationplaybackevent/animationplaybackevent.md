---
title: "AnimationPlaybackEvent: AnimationPlaybackEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/animationplaybackevent/animationplaybackevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AnimationPlaybackEvent: AnimationPlaybackEvent() constructor

The **`AnimationPlaybackEvent()`** constructor of the Web Animations API returns a new `AnimationPlaybackEvent` object instance.

## Syntax

```js
new AnimationPlaybackEvent(type)
new AnimationPlaybackEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `cancel`, `finish`, or `remove`.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, has the following properties:
    - `detail` (optional)
        An event-dependent value associated with the event. Defaults to `null`.

### Return value

A new `AnimationPlaybackEvent` object.

## See also

- Web Animations API
- `AnimationPlayBackEvent`
- `Animation.playState`
- `CustomEvent()`
- `Event()`
