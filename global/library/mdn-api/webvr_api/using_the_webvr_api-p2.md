---
title: "Using the WebVR API (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webvr_api/using_the_webvr_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the WebVR API (part 2 of 3)

## How does it work?

At this point, let's look at how the WebVR parts of the code work.

A typical (simple) WebVR app works like this:

1. `Navigator.getVRDisplays()` is used to get a reference to your VR display.
2. `VRDisplay.requestPresent()` is used to start presenting to the VR display.
3. WebVR's dedicated `VRDisplay.requestAnimationFrame()` method is used to run the app's rendering loop at the correct refresh rate for the display.
4. Inside the rendering loop, you grab the data required to display the current frame (`VRDisplay.getFrameData()`), draw the displayed scene twice — once for the view in each eye — then submit the rendered view to the display to show to the user via (`VRDisplay.submitFrame()`).

In the below sections we'll look at our raw-webgl-demo in detail, and see where exactly the above features are used.

### Starting with some variables

The first WebVR-related code you'll meet is this following block:

```js
// WebVR variables

const frameData = new VRFrameData();
let vrDisplay;
const btn = document.querySelector(".stop-start");
let normalSceneFrame;
let vrSceneFrame;

const poseStatsBtn = document.querySelector(".pose-stats");
const poseStatsSection = document.querySelector("section");
poseStatsSection.style.visibility = "hidden"; // hide it initially

const posStats = document.querySelector(".pos");
const orientStats = document.querySelector(".orient");
const linVelStats = document.querySelector(".lin-vel");
const linAccStats = document.querySelector(".lin-acc");
const angVelStats = document.querySelector(".ang-vel");
const angAccStats = document.querySelector(".ang-acc");
let poseStatsDisplayed = false;
```

Let's briefly explain these:

- `frameData` contains a `VRFrameData` object, created using the `VRFrameData()` constructor. This is initially empty, but will later contain the data required to render each frame to show in the VR display, updated constantly as the rendering loop runs.
- `vrDisplay` starts uninitialized, but will later on hold a reference to our VR headset (`VRDisplay` — the central control object of the API).
- `btn` and `poseStatsBtn` hold references to the two buttons we are using to control our app.
- `normalSceneFrame` and `vrSceneFrame` start uninitialized, but later on will hold references to `Window.requestAnimationFrame()` and `VRDisplay.requestAnimationFrame()` calls — these will initiate the running of a normal rendering loop, and a special WebVR rendering loop; we'll explain the difference between these two later on.
- The other variables store references to different parts of the VR pose data display box, which you can see in the bottom right-hand corner of the UI.

### Getting a reference to our VR display

To begin with, we retrieve a WebGL context to use to render 3D graphics into the `<canvas>` element in our HTML. We then check whether the `gl` context is available — if so, we run a number of functions to set up the scene for display.

```js
const canvas = document.getElementById("gl-canvas");

initWebGL(canvas); // Initialize the GL context

// WebGL setup code here
```

Next, we start the process of actually rendering the scene onto the canvas, by setting the canvas to fill the entire browser viewport, and running the rendering loop (`drawScene()`) for the first time. This is the non-WebVR — normal — rendering loop.

```js
// draw the scene normally, without WebVR - for those who don't have it and want to see the scene in their browser

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
drawScene();
```

Now onto our first WebVR-specific code. First of all, we check to see if `Navigator.getVRDisplays` exists — this is the entry point into the API, and therefore good basic <example-value> detection for WebVR. If this doesn't exist, we log a message to indicate that WebVR 1.1 isn't supported by the browser.

```js
// WebVR: Check to see if WebVR is supported
if (navigator.getVRDisplays) {
  console.log("WebVR 1.1 supported");
  // ...
} else {
  console.log("WebVR API not supported by this browser.");
}
```

The rest of the code goes inside the `if (navigator.getVRDisplays) { }` block, so that it only runs if WebVR is supported.

We first run the `Navigator.getVRDisplays()` function. This returns a promise, which is fulfilled with an array containing all the VR display devices connected to the computer. If none are connected, the array will be empty.

Inside the promise `then()` block, we check whether the array length is more than 0; if so, we set the value of our `vrDisplay` variable to the 0 index item inside the array. `vrDisplay` now contains a `VRDisplay` object representing our connected display!

```js
// Then get the displays attached to the computer
navigator.getVRDisplays().then((displays) => {
  // If a display is available, use it to present the scene
  if (displays.length > 0) {
    vrDisplay = displays[0];
    console.log("Display found");
    // ...
  }
});
```

The rest of the code goes inside the `if (displays.length > 0) { }` block, so that it only runs if there's at least one VR display available.

> **Note:**
> It is unlikely that you'll have multiple VR displays connected to your computer, and this is just a simple demo, so this will do for now.

### Starting and stopping the VR presentation

Now we have a `VRDisplay` object, we can use it do a number of things. The next thing we want to do is wire up functionality to start and stop presentation of the WebGL content to the display.

Continuing on with the previous code block, we now add an event listener to our start/stop button (`btn`) — when this button is clicked we want to check whether we are presenting to the display already (we do this in a fairly dumb fashion, by checking what the button `textContent` contains).

If the display is not already presenting, we use the `VRDisplay.requestPresent()` method to request that the browser start presenting content to the display. This takes as a parameter an array of the `VRLayerInit` objects representing the layers you want to present in the display.

Since the maximum number of layers you can display is currently 1, and the only required object member is the `VRLayerInit.source` property (which is a reference to the `<canvas>` you want to present in that layer; the other parameters are given sensible defaults — see `leftBounds` and `rightBounds`), the parameter is `[{ source: canvas }]`.

`requestPresent()` returns a promise that is fulfilled when the presentation begins successfully.

```js
// Starting the presentation when the button is clicked: It can only be called in response to a user gesture
btn.addEventListener("click", () => {
  if (btn.textContent === "Start VR display") {
    vrDisplay.requestPresent([{ source: canvas }]).then(() => {
      console.log("Presenting to WebVR display");
      // ...
    });
  } else {
    // ...
  }
});
```

With our presentation request successful, we now want to start setting up to render content to present to the VRDisplay. First of all we set the canvas to the same size as the VR display area. We do this by getting the `VREyeParameters` for both eyes using `VRDisplay.getEyeParameters()`.

We then do some simple math to calculate the total width of the VRDisplay rendering area based on the eye `VREyeParameters.renderWidth` and `VREyeParameters.renderHeight`.

```js
vrDisplay.requestPresent([{ source: canvas }]).then(() => {
  // ...
  // Set the canvas size to the size of the vrDisplay viewport

  const leftEye = vrDisplay.getEyeParameters("left");
  const rightEye = vrDisplay.getEyeParameters("right");

  canvas.width = Math.max(leftEye.renderWidth, rightEye.renderWidth) * 2;
  canvas.height = Math.max(leftEye.renderHeight, rightEye.renderHeight);
  // ...
});
```

Next, we cancel the animation loop previously set in motion by the `Window.requestAnimationFrame()` call inside the `drawScene()` function, and instead invoke `drawVRScene()`. This function renders the same scene as before, but with some special WebVR magic going on. The loop inside here is maintained by WebVR's special `VRDisplay.requestAnimationFrame` method.

```js
vrDisplay.requestPresent([{ source: canvas }]).then(() => {
  // ...
  // stop the normal presentation, and start the vr presentation
  window.cancelAnimationFrame(normalSceneFrame);
  drawVRScene();
  // ...
});
```

Finally, we update the button text so that the next time it is pressed, it will stop presentation to the VR display.

```js
vrDisplay.requestPresent([{ source: canvas }]).then(() => {
  // ...
  btn.textContent = "Exit VR display";
});
```

To stop the VR presentation when the button is subsequently pressed, we call `VRDisplay.exitPresent()`. We also reverse the button's text content, and swap over the `requestAnimationFrame` calls. You can see here that we are using `VRDisplay.cancelAnimationFrame` to stop the VR rendering loop, and starting the normal rendering loop off again by calling `drawScene()`.

```js
if (btn.textContent === "Start VR display") {
  // ...
} else {
  vrDisplay.exitPresent();
  console.log("Stopped presenting to WebVR display");

  btn.textContent = "Start VR display";

  // Stop the VR presentation, and start the normal presentation
  vrDisplay.cancelAnimationFrame(vrSceneFrame);
  drawScene();
}
```

Once the presentation starts, you'll be able to see the stereoscopic view displayed in the browser:

You'll learn below how the stereoscopic view is actually produced.

### Why does WebVR have its own requestAnimationFrame()?

This is a good question. The reason is that for smooth rendering inside the VR display, you need to render the content at the display's native refresh rate, not that of the computer. VR display refresh rates are greater than PC refresh rates, typically up to 90fps. The rate will be differ from the computer's core refresh rate.

Note that when the VR display is not presenting, `VRDisplay.requestAnimationFrame` runs identically to `Window.requestAnimationFrame`, so if you wanted, you could just use a single rendering loop, rather than the two we are using in our app. We have used two because we wanted to do slightly different things depending on whether the VR display is presenting or not, and keep things separated for ease of comprehension.
