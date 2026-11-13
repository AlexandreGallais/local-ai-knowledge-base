---
title: "Web audio spatialization basics (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_audio_api/web_audio_spatialization_basics/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Web audio spatialization basics (part 2 of 2)

## Moving the boombox

Now we're going to move our boombox around our 'room'. We've got some controls set up to do this.
We can move it left and right, up and down, and back and forth; we can also rotate it.
The sound direction is coming from the boombox speaker at the front, so when we rotate it, we can alter the sound's direction — i.e., make it project to the back when the boombox is rotated 180 degrees and facing away from us.

We need to set up a few things for the interface.
First, we'll get references to the elements we want to move, then we'll store references to the values we'll change when we set up CSS transforms to actually do the movement.
Finally, we'll set some bounds so our boombox doesn't move too far in any direction:

```js
const moveControls = document
  .querySelector("#move-controls")
  .querySelectorAll("button");
const boombox = document.querySelector(".boombox-body");

// the values for our CSS transforms
const transform = {
  xAxis: 0,
  yAxis: 0,
  zAxis: 0.8,
  rotateX: 0,
  rotateY: 0,
};

// set our bounds
const topBound = -posY;
const bottomBound = posY;
const rightBound = posX;
const leftBound = -posX;
const innerBound = 0.1;
const outerBound = 1.5;
```

Let's create a function that takes the direction we want to move as a parameter, and both modifies the CSS transform and updates the position and orientation values of our panner node properties to change the sound as appropriate.

To start with let's take a look at our left, right, up and down values as these are pretty straightforward.
We'll move the boombox along these axes and update the appropriate position.

```js
function moveBoombox(direction) {
  switch (direction) {
    case "left":
      if (transform.xAxis > leftBound) {
        transform.xAxis -= 5;
        panner.positionX.value -= 0.1;
      }
      break;
    case "up":
      if (transform.yAxis > topBound) {
        transform.yAxis -= 5;
        panner.positionY.value -= 0.3;
      }
      break;
    case "right":
      if (transform.xAxis < rightBound) {
        transform.xAxis += 5;
        panner.positionX.value += 0.1;
      }
      break;
    case "down":
      if (transform.yAxis < bottomBound) {
        transform.yAxis += 5;
        panner.positionY.value += 0.3;
      }
      break;
  }
}
```

It's a similar story for our move in and out values too:

```js
switch (direction) {
  // …
  case "back":
    if (transform.zAxis > innerBound) {
      transform.zAxis -= 0.01;
      panner.positionZ.value += 40;
    }
    break;
  case "forward":
    if (transform.zAxis < outerBound) {
      transform.zAxis += 0.01;
      panner.positionZ.value -= 40;
    }
    break;
}
```

Our rotation values are a little more involved, however, as we need to move the sound _around_.
Not only do we have to update two axis values (e.g., if you rotate an object around the x-axis, you update the y and z coordinates for that object), but we also need to do some more math for this.
The rotation is a circle and we need `Math.sin` and `Math.cos` to help us draw that circle.

Let's set up a rotation rate, which we'll convert into a radian range value for use in `Math.sin` and `Math.cos` later, when we want to figure out the new coordinates when we're rotating our boombox:

```js
// Set up rotation constants
const rotationRate = 60; // Bigger number equals slower sound rotation

const q = Math.PI / rotationRate; // Rotation increment in radians
```

We can also use this to work out degrees rotated, which will help with the CSS transforms we will have to create (note we need both an x and y-axis for the CSS transforms):

```js
// Get degrees for CSS
const degreesX = (q * 180) / Math.PI;
const degreesY = (q * 180) / Math.PI;
```

Let's take a look at our left rotation as an example. We need to change the x orientation and the z orientation of the panner coordinates, to move around the y-axis for our left rotation:

```js
switch (direction) {
  // …
  case "rotate-left":
    transform.rotateY -= degreesY;

    // 'left' is rotation about y-axis with negative angle increment
    z =
      panner.orientationZ.value * Math.cos(q) -
      panner.orientationX.value * Math.sin(q);
    x =
      panner.orientationZ.value * Math.sin(q) +
      panner.orientationX.value * Math.cos(q);
    y = panner.orientationY.value;

    panner.orientationX.value = x;
    panner.orientationY.value = y;
    panner.orientationZ.value = z;
    break;
}
```

This _is_ a little confusing, but what we're doing is using sin and cos to help us work out the circular motion the coordinates need for the rotation of the boombox.

We can do this for all the axes. We just need to choose the right orientations to update and whether we want a positive or negative increment.

```js
switch (direction) {
  // …
  case "rotate-right":
    transform.rotateY += degreesY;
    // 'right' is rotation about y-axis with positive angle increment
    z =
      panner.orientationZ.value * Math.cos(-q) -
      panner.orientationX.value * Math.sin(-q);
    x =
      panner.orientationZ.value * Math.sin(-q) +
      panner.orientationX.value * Math.cos(-q);
    y = panner.orientationY.value;
    panner.orientationX.value = x;
    panner.orientationY.value = y;
    panner.orientationZ.value = z;
    break;
  case "rotate-up":
    transform.rotateX += degreesX;
    // 'up' is rotation about x-axis with negative angle increment
    z =
      panner.orientationZ.value * Math.cos(-q) -
      panner.orientationY.value * Math.sin(-q);
    y =
      panner.orientationZ.value * Math.sin(-q) +
      panner.orientationY.value * Math.cos(-q);
    x = panner.orientationX.value;
    panner.orientationX.value = x;
    panner.orientationY.value = y;
    panner.orientationZ.value = z;
    break;
  case "rotate-down":
    transform.rotateX -= degreesX;
    // 'down' is rotation about x-axis with positive angle increment
    z =
      panner.orientationZ.value * Math.cos(q) -
      panner.orientationY.value * Math.sin(q);
    y =
      panner.orientationZ.value * Math.sin(q) +
      panner.orientationY.value * Math.cos(q);
    x = panner.orientationX.value;
    panner.orientationX.value = x;
    panner.orientationY.value = y;
    panner.orientationZ.value = z;
    break;
}
```

One last thing — we need to update the CSS and keep a reference of the last move for the mouse event.
Here's the final `moveBoombox` function.

```js
function moveBoombox(direction, prevMove) {
  switch (direction) {
    case "left":
      if (transform.xAxis > leftBound) {
        transform.xAxis -= 5;
        panner.positionX.value -= 0.1;
      }
      break;
    case "up":
      if (transform.yAxis > topBound) {
        transform.yAxis -= 5;
        panner.positionY.value -= 0.3;
      }
      break;
    case "right":
      if (transform.xAxis < rightBound) {
        transform.xAxis += 5;
        panner.positionX.value += 0.1;
      }
      break;
    case "down":
      if (transform.yAxis < bottomBound) {
        transform.yAxis += 5;
        panner.positionY.value += 0.3;
      }
      break;
    case "back":
      if (transform.zAxis > innerBound) {
        transform.zAxis -= 0.01;
        panner.positionZ.value += 40;
      }
      break;
    case "forward":
      if (transform.zAxis < outerBound) {
        transform.zAxis += 0.01;
        panner.positionZ.value -= 40;
      }
      break;
    case "rotate-left":
      transform.rotateY -= degreesY;

      // 'left' is rotation about y-axis with negative angle increment
      z =
        panner.orientationZ.value * Math.cos(q) -
        panner.orientationX.value * Math.sin(q);
      x =
        panner.orientationZ.value * Math.sin(q) +
        panner.orientationX.value * Math.cos(q);
      y = panner.orientationY.value;

      panner.orientationX.value = x;
      panner.orientationY.value = y;
      panner.orientationZ.value = z;
      break;
    case "rotate-right":
      transform.rotateY += degreesY;
      // 'right' is rotation about y-axis with positive angle increment
      z =
        panner.orientationZ.value * Math.cos(-q) -
        panner.orientationX.value * Math.sin(-q);
      x =
        panner.orientationZ.value * Math.sin(-q) +
        panner.orientationX.value * Math.cos(-q);
      y = panner.orientationY.value;
      panner.orientationX.value = x;
      panner.orientationY.value = y;
      panner.orientationZ.value = z;
      break;
    case "rotate-up":
      transform.rotateX += degreesX;
      // 'up' is rotation about x-axis with negative angle increment
      z =
        panner.orientationZ.value * Math.cos(-q) -
        panner.orientationY.value * Math.sin(-q);
      y =
        panner.orientationZ.value * Math.sin(-q) +
        panner.orientationY.value * Math.cos(-q);
      x = panner.orientationX.value;
      panner.orientationX.value = x;
      panner.orientationY.value = y;
      panner.orientationZ.value = z;
      break;
    case "rotate-down":
      transform.rotateX -= degreesX;
      // 'down' is rotation about x-axis with positive angle increment
      z =
        panner.orientationZ.value * Math.cos(q) -
        panner.orientationY.value * Math.sin(q);
      y =
        panner.orientationZ.value * Math.sin(q) +
        panner.orientationY.value * Math.cos(q);
      x = panner.orientationX.value;
      panner.orientationX.value = x;
      panner.orientationY.value = y;
      panner.orientationZ.value = z;
      break;
  }

  boombox.style.transform =
    `translateX(${transform.xAxis}px) ` +
    `translateY(${transform.yAxis}px) ` +
    `scale(${transform.zAxis}) ` +
    `rotateY(${transform.rotateY}deg) ` +
    `rotateX(${transform.rotateX}deg)`;

  const move = prevMove || {};
  move.frameId = requestAnimationFrame(() => moveBoombox(direction, move));
  return move;
}
```

## Wiring up our controls

Wiring up our control buttons is comparatively simple — now we can listen for a mouse event on our controls and run this function, as well as stop it when the mouse is released:

```js
// for each of our controls, move the boombox and change the position values
moveControls.forEach((el) => {
  let moving;
  el.addEventListener("mousedown", () => {
    const direction = this.dataset.control;
    if (moving && moving.frameId) {
      cancelAnimationFrame(moving.frameId);
    }
    moving = moveBoombox(direction);
  });

  window.addEventListener("mouseup", () => {
    if (moving && moving.frameId) {
      cancelAnimationFrame(moving.frameId);
    }
  });
});
```

## Connecting our graph

Our HTML contains the audio element we want to be affected by the panner node.

```html
<audio src="myCoolTrack.mp3"></audio>
```

We need to grab the source from that element and pipe it into the Web Audio API using the `AudioContext.createMediaElementSource`.

```js
// get the audio element
const audioElement = document.querySelector("audio");

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);
```

Next we have to connect our audio graph. We connect our input (the track) to our modification node (the panner) to our destination (in this case the speakers).

```js
track.connect(panner).connect(audioCtx.destination);
```

Let's create a play button, that when clicked will play or pause the audio depending on the current state.

```html
<button data-playing="false" role="switch">Play/Pause</button>
```

```js
// Select our play button
const playButton = document.querySelector("button");

playButton.addEventListener("click", () => {
  // Check if context is in suspended state (autoplay policy)
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  // Play or pause track depending on state
  if (playButton.dataset.playing === "false") {
    audioElement.play();
    playButton.dataset.playing = "true";
  } else if (playButton.dataset.playing === "true") {
    audioElement.pause();
    playButton.dataset.playing = "false";
  }
});
```

For a more in depth look at playing/controlling audio and audio graphs check out Using The Web Audio API.

## Summary

Hopefully, this article has given you an insight into how Web Audio spatialization works, and what each of the `PannerNode` properties do (there are quite a few of them).
The values can be hard to manipulate sometimes and depending on your use case it can take some time to get them right.

> **Note:**
> There are slight differences in the way the audio spatialization sounds across different browsers.
> The panner node does some very involved math under the hood;
> there are a number of tests here so you can keep track of the status of the inner workings of this node across different platforms.

Again, you can check out the final demo here, and the final source code is here.

If you are working with 3D games and/or WebXR it's a good idea to harness a 3D library to create such functionality, rather than trying to do this all yourself from first principles.
We rolled our own in this article to give you an idea of how it works, but you'll save a lot of time by taking advantage of work others have done before you.
