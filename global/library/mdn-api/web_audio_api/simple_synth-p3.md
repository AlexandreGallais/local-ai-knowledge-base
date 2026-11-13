---
title: "Example and tutorial: Simple synth keyboard (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_audio_api/simple_synth/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Example and tutorial: Simple synth keyboard (part 3 of 3)

### Making music

#### Playing a tone

The `playTone()` function's job is to play a tone at the given frequency. This will be used by the handler for events triggering keys on the keyboard to start playing the appropriate notes.

```js
function playTone(freq) {
  const osc = audioContext.createOscillator();
  osc.connect(mainGainNode);

  const type = wavePicker.options[wavePicker.selectedIndex].value;

  if (type === "custom") {
    osc.setPeriodicWave(customWaveform);
  } else {
    osc.type = type;
  }

  osc.frequency.value = freq;
  osc.start();

  return osc;
}
```

`playTone()` begins by creating a new `OscillatorNode` by calling the `BaseAudioContext.createOscillator()` method. We then connect it to the main gain node by calling the new oscillator's `connect()` method;, which tells the oscillator where to send its output to. By doing this, changing the gain of the main gain node will affect the volume of all tones being generated.

Then we get the type of waveform to use by checking the value of the waveform picker control in the settings bar. If the user has it set to `"custom"`, we call `OscillatorNode.setPeriodicWave()` to configure the oscillator to use our custom waveform. Doing this automatically sets the oscillator's `type` to `custom`. If any other waveform type is selected in the wave picker, we set the oscillator's type to the value of the picker; that value will be one of `sine`, `square`, `triangle`, and `sawtooth`.

The oscillator's frequency is set to the value specified in the `freq` parameter by setting the value of the `OscillatorNode.frequency` `AudioParam` object. Then, at last, the oscillator is started up so that it begins to produce sound by calling the oscillator's inherited `AudioScheduledSourceNode.start()` method.

#### Playing a note

When the `mousedown` or `mouseover` event occurs on a key, we want to start playing the corresponding note. The `notePressed()` function is used as the event handler for these events.

```js
function notePressed(event) {
  if (event.buttons & 1) {
    const dataset = event.target.dataset;

    if (!dataset["pressed"] && dataset["octave"]) {
      const octave = Number(dataset["octave"]);
      oscList[octave][dataset["note"]] = playTone(dataset["frequency"]);
      dataset["pressed"] = "yes";
    }
  }
}
```

We start by checking whether the primary mouse button is pressed, for two reasons. First, we want to only allow the primary mouse button to trigger notes playing. Second, and more importantly, we are using this to handle `mouseover` for cases where the user is dragging from note to note, and we only want to start playing the note if the mouse is pressed when it enters the element.

If the mouse button is in fact down, we get the pressed key's `dataset` attribute; this makes it easy to access the custom data attributes on the element. We look for a `data-pressed` attribute; if there isn't one (which indicates that the note isn't already playing), we call `playTone()` to start playing the note, passing in the value of the element's `data-frequency` attribute. The returned oscillator is stored into `oscList` for future reference, and `data-pressed` is set to `yes` to indicate that the note is playing so we don't start it again next time this is called.

#### Stopping a tone

The `noteReleased()` function is the event handler called when the user releases the mouse button or moves the mouse out of the key that's currently playing.

```js
function noteReleased(event) {
  const dataset = event.target.dataset;

  if (dataset && dataset["pressed"]) {
    const octave = Number(dataset["octave"]);

    if (oscList[octave] && oscList[octave][dataset["note"]]) {
      oscList[octave][dataset["note"]].stop();
      delete oscList[octave][dataset["note"]];
      delete dataset["pressed"];
    }
  }
}
```

`noteReleased()` uses the `data-octave` and `data-note` custom attributes to look up the key's oscillator, then calls the oscillator's inherited `stop()` method to stop playing the note. Finally, the `oscList` entry for the note is cleared and the `data-pressed` attribute is removed from the key <example-value> (as identified by `event.target`), to indicate that the note is not currently playing.

#### Changing the main volume

The volume slider in the settings bar provides an interface to change the gain value on the main gain node, thereby changing the loudness of all playing notes. The `changeVolume()` method is the handler for the `change` event on the slider.

```js
function changeVolume(event) {
  mainGainNode.gain.value = volumeControl.value;
}
```

This sets the value of the main gain node's `gain` `AudioParam` to the slider's new value.

#### Keyboard support

The code below adds `keydown` and `keyup` event listeners to handle keyboard input. The `keydown` event handler calls `notePressed()` to start playing the note corresponding to the key that was pressed, and the `keyup` event handler calls `noteReleased()` to stop playing the note corresponding to the key that was released.

```js
const synthKeys = document.querySelectorAll(".key");
// prettier-ignore
const keyCodes = [
  "Space",
  "ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ShiftRight",
  "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter",
  "Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight",
  "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace",
  "Escape",
];
function keyNote(event) {
  const elKey = <example-value>[keyCodes.indexOf(event.code)];
  if (elKey) {
    if (event.type === "keydown") {
      elKey.tabIndex = -1;
      elKey.focus();
      elKey.classList.add("active");
      notePressed({ buttons: 1, target: elKey });
    } else {
      elKey.classList.remove("active");
      noteReleased({ buttons: 1, target: elKey });
    }
    event.preventDefault();
  }
}
addEventListener("keydown", keyNote);
addEventListener("keyup", keyNote);
```

### Result

Put all together, the result is a simple but working point-and-click musical keyboard:

## See also

- Web Audio API
- `OscillatorNode`
- `GainNode`
- `AudioContext`
