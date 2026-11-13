---
title: "Using the Screen Capture API (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screen_capture_api/using_screen_capture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the Screen Capture API (part 2 of 2)

## Examples

### Streaming screen capture

In this example, the contents of the captured screen area are streamed into a `` element on the same page.

#### HTML

The HTML starts with an introductory paragraph, then gets into the meat of things.

```html
<p>
  This example shows you the contents of the selected part of your display.
  Click the Start Capture button to begin.
</p>

<p>
  <button id="start">Start Capture</button>&nbsp;<button id="stop">
    Stop Capture
  </button>
</p>

<video id="video" autoplay></video>
<br />

<strong>Log:</strong>
<br />
<pre id="log"></pre>
```

The key parts of the HTML are:

1. A `` labeled "Start Capture" which, when clicked, calls the `startCapture()` function to request access to, and begin capturing, screen contents.
2. A second button, "Stop Capture", which upon being clicked calls `stopCapture()` to terminate capture of screen contents.
3. A `` into which the captured screen contents are streamed.
4. A `<pre>` block into which logged text is placed by the intercepted `console` method.

#### CSS

The CSS is entirely cosmetic in this example. The video is given a border, and its width is set to occupy nearly the entire available horizontal space (`width: 98%`). `max-width` is set to `860px` to set an absolute upper limit on the video's size,

```css
#video {
  border: 1px solid #999999;
  width: 98%;
  max-width: 860px;
}

#log {
  width: 25rem;
  height: 15rem;
  border: 1px solid black;
  padding: 0.5rem;
  overflow: scroll;
}
```

#### JavaScript

There isn't all that much code needed in order to make this work, and if you're familiar with using `getUserMedia()` to capture video from a camera, you'll find `getDisplayMedia()` to be very familiar.

##### Setup

First, some constants are set up to reference the elements on the page to which we'll need access: the `` into which the captured screen contents will be streamed, a box into which logged output will be drawn, and the start and stop buttons that will turn on and off capture of screen imagery.

The object `displayMediaOptions` contains the options to pass into `getDisplayMedia()`; here, the `displaySurface` property is set to `window`, indicating that the whole window should be captured.

Finally, event listeners are established to detect user clicks on the start and stop buttons.

```js
const videoElem = document.getElementById("video");
const logElem = document.getElementById("log");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");

// Options for getDisplayMedia()

const displayMediaOptions = {
  video: {
    displaySurface: "window",
  },
  audio: false,
};

// Set event listeners for the start and stop buttons
startElem.addEventListener("click", (evt) => {
  startCapture();
});

stopElem.addEventListener("click", (evt) => {
  stopCapture();
});
```

##### Logging content

This example overrides certain `console` methods to output their messages to the `<pre>` block whose ID is `log`.

```js
console.log = (msg) => (logElem.textContent = `${logElem.textContent}\n${msg}`);
console.error = (msg) =>
  (logElem.textContent = `${logElem.textContent}\nError: ${msg}`);
```

This allows us to use `console.log()` and `console.error()` to log information to the log box in the document.

##### Starting display capture

The `startCapture()` method, below, starts the capture of a `MediaStream` whose contents are taken from a user-selected area of the screen. `startCapture()` is called when the "Start Capture" button is clicked.

```js
async function startCapture() {
  logElem.textContent = "";

  try {
    videoElem.srcObject =
      await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    dumpOptionsInfo();
  } catch (err) {
    console.error(err);
  }
}
```

After clearing the contents of the log in order to get rid of any leftover text from the previous attempt to connect, `startCapture()` calls `getDisplayMedia()`, passing into it the constraints object defined by `displayMediaOptions`. Using `await`, the following line of code does not get executed until after the `Promise` returned by `getDisplayMedia()` resolves. Upon resolution, the promise returns a `MediaStream`, which will stream the contents of the screen, window, or other region selected by the user.

The stream is connected to the `` element by storing the returned `MediaStream` into the element's `srcObject`.

The `dumpOptionsInfo()` function—which we will look at in a moment—dumps information about the stream to the log box for educational purposes.

If any of that fails, the `catch()` clause outputs an error message to the log box.

##### Stopping display capture

The `stopCapture()` method is called when the "Stop Capture" button is clicked. It stops the stream by getting its track list using `MediaStream.getTracks()`, then calling each track's `stop()` method. Once that's done, `srcObject` is set to `null` to make sure it's understood by anyone interested that there's no stream connected.

```js
function stopCapture(evt) {
  let tracks = videoElem.srcObject.getTracks();

  tracks.forEach((track) => track.stop());
  videoElem.srcObject = null;
}
```

##### Dumping configuration information

For informational purposes, the `startCapture()` method shown above calls a method named `dumpOptions()`, which outputs the current track settings as well as the constraints that were placed upon the stream when it was created.

```js
function dumpOptionsInfo() {
  const videoTrack = videoElem.srcObject.getVideoTracks()[0];

  console.log("Track settings:");
  console.log(JSON.stringify(videoTrack.getSettings(), null, 2));
  console.log("Track constraints:");
  console.log(JSON.stringify(videoTrack.getConstraints(), null, 2));
}
```

The track list is obtained by calling `getVideoTracks()` on the captured screen's `MediaStream`. The settings currently in effect are obtained using `getSettings()` and the established constraints are gotten with `getConstraints()`

#### Result

The final product looks like this. If your browser supports Screen Capture API, clicking "Start Capture" will present the user agent's interface for selecting a screen, window, or tab to share.

## Security

In order to function when Permissions Policy is enabled, you will need the `display-capture` permission. This can be done using the `Permissions-Policy` HTTP header or—if you're using the Screen Capture API in an ``, the `` element's `allow` attribute.

For example, this line in the HTTP headers will enable Screen Capture API for the document and any embedded `` elements that are loaded from the same origin:

```http
Permissions-Policy: display-capture=(self)
```

If you're performing screen capture within an ``, you can request permission just for that frame, which is clearly more secure than requesting permission more generally:

```html
<iframe src="https://mycode.example.net/etc" allow="display-capture"> </iframe>
```

## See also

- Screen Capture API
- Media Capture and Streams API
- Taking still photos with WebRTC
- `HTMLCanvasElement.captureStream()` to obtain a `MediaStream` with the live contents of a `<canvas>`
