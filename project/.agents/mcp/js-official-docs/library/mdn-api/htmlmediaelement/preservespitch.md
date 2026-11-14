---
title: "HTMLMediaElement: preservesPitch property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/preservespitch/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: preservesPitch property

The **`HTMLMediaElement.preservesPitch`** property determines whether or not the browser should adjust the pitch of the audio to compensate for changes to the playback rate made by setting `HTMLMediaElement.playbackRate`.

## Value

A boolean value defaulting to `true`.

## Examples

### Setting the preservesPitch property

In this example, we have an `<audio>` element, a range control that adjusts the playback rate, and a checkbox that sets `preservesPitch`.

Try playing the audio, then adjusting the playback rate, then enabling and disabling the checkbox.

```html
<audio
  controls
  src="https://mdn.github.io/webaudio-examples/audio-basics/outfoxing.mp3"></audio>

<div>
  <label for="rate">Adjust playback rate:</label>
  <input id="rate" type="range" min="0.25" max="3" step="0.05" value="1" />
</div>

<div>
  <label for="pitch">Preserve pitch:</label>
  <input type="checkbox" id="pitch" name="pitch" checked />
</div>
```

```css
div {
  margin: 0.5rem 0;
}
```

```js
const audio = document.querySelector("audio");
document.getElementById("rate").addEventListener("change", (e) => {
  audio.playbackRate = e.target.value;
});
document.getElementById("pitch").addEventListener("change", (e) => {
  audio.preservesPitch = e.target.checked;
});
```

## See also

- `HTMLMediaElement.playbackRate`
- Web Audio playbackRate explained
