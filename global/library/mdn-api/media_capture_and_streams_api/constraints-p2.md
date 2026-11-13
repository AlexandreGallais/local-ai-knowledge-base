---
title: "Capabilities, constraints, and settings (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/media_capture_and_streams_api/constraints/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Capabilities, constraints, and settings (part 2 of 2)

## Example: Constraint exerciser

In this example, we create an exerciser which lets you experiment with media constraints by editing the source code describing the constraint sets for audio and video tracks. You can then apply those changes and see the result, including both what the stream looks like and what the actual media settings are set to after applying the new constraints.

The HTML and CSS for this example are pretty simple, and aren't shown here. You can look at the complete code by clicking "Play" to view it in the playground.

```html
<p>
  Experiment with media constraints! Edit the constraint sets for the video and
  audio tracks in the edit boxes on the left, then click the "Apply Constraints"
  button to try them out. The actual settings the browser selected and is using
  are shown in the boxes on the right. Below all of that, you'll see the video
  itself.
</p>
<p>Click the "Start" button to begin.</p>

<h3>Constrainable properties available:</h3>
<ul id="supportedConstraints"></ul>
<div id="startButton" class="button">Start</div>
<div class="wrapper">
  <div class="track-row">
    <div class="left-side">
      <h3>Requested video constraints:</h3>
      <textarea id="videoConstraintEditor" cols="32" rows="8"></textarea>
    </div>
    <div class="right-side">
      <h3>Actual video settings:</h3>
      <textarea id="videoSettingsText" cols="32" rows="8" disabled></textarea>
    </div>
  </div>
  <div class="track-row">
    <div class="left-side">
      <h3>Requested audio constraints:</h3>
      <textarea id="audioConstraintEditor" cols="32" rows="8"></textarea>
    </div>
    <div class="right-side">
      <h3>Actual audio settings:</h3>
      <textarea id="audioSettingsText" cols="32" rows="8" disabled></textarea>
    </div>
  </div>

  <div class="button" id="applyButton">Apply Constraints</div>
</div>
<video id="my-video" autoplay></video>

<div class="button" id="stopButton">Stop Video</div>

<div id="log"></div>
```

```css
body {
  font:
    14px "Open Sans",
    "Arial",
    sans-serif;
}

video {
  margin-top: 20px;
  border: 1px solid black;
}

.button {
  cursor: pointer;
  width: 150px;
  border: 1px solid black;
  font-size: 16px;
  text-align: center;
  padding-top: 2px;
  padding-bottom: 4px;
  color: white;
  background-color: darkgreen;
}

.wrapper {
  margin-bottom: 10px;
  width: 600px;
}

.track-row {
  height: 200px;
}

.left-side {
  float: left;
  width: calc(calc(100% / 2) - 10px);
}

.right-side {
  float: right;
  width: calc(calc(100% / 2) - 10px);
}

textarea {
  padding: 8px;
}

h3 {
  margin-bottom: 3px;
}

#supportedConstraints {
  column-count: 2;
}

#log {
  padding-top: 10px;
}
```

### Defaults and variables

First we have the default constraint sets, as strings. These strings are presented in editable `<textarea>`s, but this is the initial configuration of the stream.

```js
const videoDefaultConstraintString =
  '{\n  "width": 320,\n  "height": 240,\n  "frameRate": 30\n}';
const audioDefaultConstraintString =
  '{\n  "sampleSize": 16,\n  "channelCount": 2,\n  "echoCancellation": false\n}';
```

These defaults ask for a pretty common camera configuration, but don't insist on any property being of special importance. The browser should do its best to match these settings but will settle for anything it considers a close match.

Then we initialize the variables which will hold the `MediaTrackConstraints` objects for the video and audio tracks, as well as the variables which will hold references to the video and audio tracks themselves, to `null`.

```js
let videoConstraints = null;
let audioConstraints = null;

let audioTrack = null;
let videoTrack = null;
```

And we get references to all of the elements we'll need to access.

```js
const videoElement = document.getElementById("my-video");
const logElement = document.getElementById("log");
const supportedConstraintList = document.getElementById("supportedConstraints");
const videoConstraintEditor = document.getElementById("videoConstraintEditor");
const audioConstraintEditor = document.getElementById("audioConstraintEditor");
const videoSettingsText = document.getElementById("videoSettingsText");
const audioSettingsText = document.getElementById("audioSettingsText");
```

These elements are:

- `videoElement`
    The `` element that will show the stream.
- `logElement`
    A `` into which any error messages or other log-type output will be written.
- `supportedConstraintList`
    A `` (unordered list) into which we programmatically add the names of each of the constrainable properties supported by the user's browser.
- `videoConstraintEditor`
    A `<textarea>` element that lets the user edit the code for the video track's constraint set.
- `audioConstraintEditor`
    A `<textarea>` element that lets the user edit the code for the audio track's constraint set.
- `videoSettingsText`
    A `<textarea>` (which is always disabled) that displays the current settings for the video track's constrainable properties.
- `audioSettingsText`
    A `<textarea>` (which is always disabled) that displays the current settings for the audio track's constrainable properties.

Finally, we set the current contents of the two constraint set editor elements to the defaults.

```js
videoConstraintEditor.value = videoDefaultConstraintString;
audioConstraintEditor.value = audioDefaultConstraintString;
```

### Updating the settings display

To the right of each of the constraint set editors is a second text box which we use to display the current configuration of the track's configurable properties. This display is updated by the function `getCurrentSettings()`, which gets the current settings for the audio and video tracks and inserts the corresponding code into the tracks' settings display boxes by setting their `value`.

```js
function getCurrentSettings() {
  if (videoTrack) {
    videoSettingsText.value = JSON.stringify(videoTrack.getSettings(), null, 2);
  }

  if (audioTrack) {
    audioSettingsText.value = JSON.stringify(audioTrack.getSettings(), null, 2);
  }
}
```

This gets called after the stream first starts up, as well as any time we've applied updated constraints, as you'll see below.

### Building the track constraint set objects

The `buildConstraints()` function builds the `MediaTrackConstraints` objects for the audio and video tracks using the code in the two tracks' constraint set edit boxes.

```js
function buildConstraints() {
  try {
    videoConstraints = JSON.parse(videoConstraintEditor.value);
    audioConstraints = JSON.parse(audioConstraintEditor.value);
  } catch (error) {
    handleError(error);
  }
}
```

This uses `JSON.parse()` to parse the code in each editor into an object. If either call to JSON.parse() throws an exception, `handleError()` is called to output the error message to the log.

### Configuring and starting the stream

The `startVideo()` method handles setting up and starting the video stream.

```js
function startVideo() {
  buildConstraints();

  navigator.mediaDevices
    .getUserMedia({
      video: videoConstraints,
      audio: audioConstraints,
    })
    .then((stream) => {
      const audioTracks = stream.getAudioTracks();
      const videoTracks = stream.getVideoTracks();

      videoElement.srcObject = stream;

      if (audioTracks.length > 0) {
        audioTrack = audioTracks[0];
      }

      if (videoTracks.length > 0) {
        videoTrack = videoTracks[0];
      }
    })
    .then(
      () =>
        new Promise((resolve) => {
          videoElement.onloadedmetadata = resolve;
        }),
    )
    .then(() => {
      getCurrentSettings();
    })
    .catch(handleError);
}
```

There are several steps here:

1. It calls `buildConstraints()` to create the `MediaTrackConstraints` objects for the two tracks from the code in the edit boxes.
2. It calls `navigator.mediaDevices.getUserMedia()`, passing in the constraints objects for the video and audio tracks. This returns a `MediaStream` with the audio and video from a source matching the inputs (typically a webcam, although if you provide the right constraints you can get media from other sources).
3. When the stream is obtained, it's attached to the `` element so that it's visible on screen, and we grab the audio track and video track into the variables `audioTrack` and `videoTrack`.
4. Then we set up a promise which resolves when the `loadedmetadata` event occurs on the video element.
5. When that happens, we know the video has started playing, so we call our `getCurrentSettings()` function (described above) to display the actual settings that the browser decided upon after considering our constraints and the capabilities of the hardware.
6. If an error occurs, we log it using the `handleError()` method that we'll look at farther down in this article.

We also need to set up an event listener to watch for the "Start Video" button to be clicked:

```js
document.getElementById("startButton").addEventListener("click", () => {
  startVideo();
});
```

### Applying constraint set updates

Next, we set up an event listener for the "Apply Constraints" button. If it's clicked and there's not already media in use, we call `startVideo()`, and let that function handle starting the stream with the specified settings in place. Otherwise, we follow these steps to apply the updated constraints to the already-active stream:

1. `buildConstraints()` is called to construct updated `MediaTrackConstraints` objects for the audio track (`audioConstraints`) and the video track (`videoConstraints`).
2. `MediaStreamTrack.applyConstraints()` is called on the video track (if there is one) to apply the new `videoConstraints`. If this succeeds, the contents of the video track's current settings box are updated based on the result of calling its `getSettings()` method.
3. Once that's done, `applyConstraints()` is called on the audio track (if there is one) to apply the new audio constraints. If this succeeds, the contents of the audio track's current settings box are updated based on the result of calling its `getSettings()` method.
4. If an error occurs applying either set of constraints, `handleError()` is used to output a message into the log.

```js
document.getElementById("applyButton").addEventListener("click", () => {
  if (!videoTrack && !audioTrack) {
    startVideo();
  } else {
    buildConstraints();

    const prettyJson = (obj) => JSON.stringify(obj, null, 2);

    if (videoTrack) {
      videoTrack
        .applyConstraints(videoConstraints)
        .then(() => {
          videoSettingsText.value = prettyJson(videoTrack.getSettings());
        })
        .catch(handleError);
    }

    if (audioTrack) {
      audioTrack
        .applyConstraints(audioConstraints)
        .then(() => {
          audioSettingsText.value = prettyJson(audioTrack.getSettings());
        })
        .catch(handleError);
    }
  }
});
```

### Handling the stop button

Then we set up the handler for the stop button.

```js
document.getElementById("stopButton").addEventListener("click", () => {
  if (videoTrack) {
    videoTrack.stop();
  }

  if (audioTrack) {
    audioTrack.stop();
  }

  videoTrack = audioTrack = null;
  videoElement.srcObject = null;
});
```

This stops the active tracks, sets the `videoTrack` and `audioTrack` variables to `null` so we know they're gone, and removes the stream from the `` element by setting `HTMLMediaElement.srcObject` to `null`.

### Simple tab support in the editor

This code adds simple support for tabs to the `<textarea>` elements by making the tab key <example-value> two space characters when either constraint edit box is focused.

```js
function keyDownHandler(event) {
  if (event.key === "Tab") {
    const elem = event.target;
    const str = elem.value;

    const position = elem.selectionStart;
    const beforeTab = str.substring(0, position);
    const afterTab = str.substring(position, str.length);
    const newStr = `${beforeTab}  ${afterTab}`;
    elem.value = newStr;
    elem.selectionStart = elem.selectionEnd = position + 2;
    event.preventDefault();
  }
}

videoConstraintEditor.addEventListener("keydown", keyDownHandler);
audioConstraintEditor.addEventListener("keydown", keyDownHandler);
```

### Show constrainable properties the browser supports

The last significant piece of the puzzle: code that displays, for the user's reference, a list of the constrainable properties which their browser supports. Each property is a link to its documentation on MDN for the user's convenience. See the `MediaDevices.getSupportedConstraints()` examples for details on how this code works.

> **Note:**
> Of course, there may be non-standard properties in this list, in which case you probably will find that the documentation link doesn't help much.

```js
const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
for (const constraint in supportedConstraints) {
  if (Object.hasOwn(supportedConstraints, constraint)) {
    const elem = document.createElement("li");

    elem.innerHTML = `<code><a href='https://developer.mozilla.org/docs/Web/API/MediaDevices/getSupportedConstraints#${constraint.toLowerCase()}' target='_blank'>${constraint}</a></code>`;
    supportedConstraintList.appendChild(elem);
  }
}
```

### Error handling

We also have some simple error handling code; `handleError()` is called to handle promises which fail, and the `log()` function appends the error message to a special logging `` box under the video.

```js
function log(msg) {
  logElement.innerHTML += `${msg}<br>`;
}

function handleError(reason) {
  log(
    `Error <code>${reason.name}</code> in constraint <code>${reason.constraint}</code>: ${reason.message}`,
  );
}
```

### Result

Here you can see the complete example in action.

## See also

- Media Capture and Streams API
- `MediaTrackConstraints`
- `MediaDevices.getSupportedConstraints()`
- `MediaStreamTrack.applyConstraints()`
- `MediaStreamTrack.getSettings()`
