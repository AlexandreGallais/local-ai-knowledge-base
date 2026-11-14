---
title: "HTMLMediaElement: controlsList property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/controlslist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: controlsList property

The **`controlsList`** read-only property of the `HTMLMediaElement` interface returns a DOMTokenList that helps the user agent select what controls to show on the media element whenever the user agent shows its own set of controls. The DOMTokenList takes one or more of three possible values: `nodownload`, `nofullscreen`, and `noremoteplayback`.

## Value

A `DOMTokenList`.

The value of `controlsList` can be set by passing a string representing the `DOMTokenList`'s `value` property.

## Examples

### Getting the controlsList property

The `controlsList` property returns a `DOMTokenList` object containing the current set value.

```js
const video = document.createElement("video");
console.log(video.controlsList.value); // ""

video.controlsList.add("noremoteplayback");
console.log(video.controlsList.value); // "noremoteplayback"
```

### Setting the controlsList property

You can also modify `controlsList` by directly setting it to a string containing the new value.

```js
const audio = document.createElement("audio");
audio.controlsList = "nodownload";
```

## See also

- Chrome HTMLMediaElement controlsList Sample
