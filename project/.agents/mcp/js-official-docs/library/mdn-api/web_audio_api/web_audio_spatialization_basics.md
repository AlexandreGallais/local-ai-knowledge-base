---
title: "Web audio spatialization basics (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_audio_api/web_audio_spatialization_basics/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Web audio spatialization basics

As if its extensive variety of sound processing (and other) options wasn't enough, the Web Audio API also includes facilities to allow you to emulate the difference in sound as a listener moves around a sound source, for example panning as you move around a sound source inside a 3D game.
The official term for this is **spatialization**, and this article will cover the basics of how to implement such a system.

## Basics of spatialization

In Web Audio, complex 3D spatializations are created using the `PannerNode`, which in layman's terms is basically a whole lotta cool math to make audio appear in 3D space.
Think sounds flying over you, creeping up behind you, moving across in front of you.
That sort of thing.

It's really useful for WebXR and gaming.
In 3D spaces, it's the only way to achieve realistic audio. Libraries like three.js and A-frame harness its potential when dealing with sound.
It's worth noting that you don't _have_ to move sound within a full 3D space either — you could stick with just a 2D plane, so if you were planning a 2D game, this would still be the node you were looking for.

> **Note:**
> There's also a `StereoPannerNode` designed to deal with the common use case of creating simple left and right stereo panning effects.
> This is much simpler to use, but obviously nowhere near as versatile.
> If you just want a simple stereo panning effect, our StereoPannerNode example (see source code) should give you everything you need.

## 3D boombox demo

To demonstrate 3D spatialization we've created a modified version of the boombox demo we created in our basic Using the Web Audio API guide.
See the 3D spatialization demo live (and see the source code also).

The boombox sits inside a room (defined by the edges of the browser viewport), and in this demo, we can move and rotate it with the provided controls.
When we move the boombox, the sound it produces changes accordingly, panning as it moves to the left or right of the room, or becoming quieter as it is moved away from the user or is rotated so the speakers are facing away from them, etc.
This is done by setting the different properties of the `PannerNode` object instance in relation to that movement, to emulate spatialization.

> **Note:**
> The experience is much better if you use headphones, or have some kind of surround sound system to plug your computer into.

## Creating an audio listener

So let's begin! The `BaseAudioContext` (the interface the `AudioContext` is extended from) has a `listener` property that returns an `AudioListener` object.
This represents the listener of the scene, usually your user.
You can define where they are in space and in which direction they are facing.
They remain static. The `pannerNode` can then calculate its sound position relative to the position of the listener.

Let's create our context and listener and set the listener's position to emulate a person looking into our room:

```js
const audioCtx = new AudioContext();
const listener = audioCtx.listener;

const posX = window.innerWidth / 2;
const posY = window.innerHeight / 2;
const posZ = 300;

listener.positionX.value = posX;
listener.positionY.value = posY;
listener.positionZ.value = posZ - 5;
```

We could move the listener left or right using `positionX`, up or down using `positionY`, or in or out of the room using `positionZ`. Here we are setting the listener to be in the middle of the viewport and slightly in front of our boombox. We can also set the direction the listener is facing. The default values for these work well:

```js
listener.forwardX.value = 0;
listener.forwardY.value = 0;
listener.forwardZ.value = -1;
listener.upX.value = 0;
listener.upY.value = 1;
listener.upZ.value = 0;
```

The forward properties represent the 3D coordinate position of the listener's forward direction (e.g., the direction they are facing in), while the up properties represent the 3D coordinate position of the top of the listener's head.
These two together can nicely set the direction.

## Creating a panner node

Let's create our `PannerNode`. This has a whole bunch of properties associated with it. Let's take a look at each of them:

To start we can set the `panningModel`.
This is the spatialization algorithm that's used to position the audio in 3D space. We can set this to:

`equalpower` — The default and the general way panning is figured out

`HRTF` — This stands for 'Head-related transfer function' and looks to take into account the human head when figuring out where the sound is.

Pretty clever stuff. Let's use the `HRTF` model!

```js
const panningModel = "HRTF";
```

The `coneInnerAngle` and `coneOuterAngle` properties specify where the volume emanates from.
By default, both are 360 degrees.
Our boombox speakers will have smaller cones, which we can define.
The inner cone is where gain (volume) is always emulated at a maximum and the outer cone is where the gain starts to drop away.
The gain is reduced by the value of the `coneOuterGain`.
Let's create constants that store the values we'll use for these parameters later on:

```js
const innerCone = 60;
const outerCone = 90;
const outerGain = 0.3;
```

The next parameter is `distanceModel` — this can only be set to `linear`, `inverse`, or `exponential`. These are different algorithms, which are used to reduce the volume of the audio source as it moves away from the listener. We'll use `linear`, as it is simple:

```js
const distanceModel = "linear";
```

We can set a maximum distance (`maxDistance`) between the source and the listener — the volume will not be reduced anymore if the source moves further away from this point.
This can be useful, as you may find you want to emulate distance, but volume can drop out and that's actually not what you want.
By default, it's 10,000 (a unitless relative value). We can keep it as this:

```js
const maxDistance = 10000;
```

There's also a reference distance (`refDistance`), which is used by the distance models.
We can keep that at the default value of `1` as well:

```js
const refDistance = 1;
```

Then there's the roll-off factor (`rolloffFactor`) — how quickly does the volume reduce as the panner moves away from the listener.
The default value is 1; let's make that a bit bigger to exaggerate our movements.

```js
const rollOff = 10;
```

Now we can start setting our position and orientation of our boombox.
This is a lot like how we did it with our listener.
These are also the parameters we're going to change when the controls on our interface are used.

```js
const positionX = posX;
const positionY = posY;
const positionZ = posZ;

const orientationX = 0.0;
const orientationY = 0.0;
const orientationZ = -1.0;
```

Note the minus value on our z orientation — this sets the boombox to face us.
A positive value would set the sound source facing away from us.

Let's use the relevant constructor for creating our panner node and pass in all those parameters we set above:

```js
const panner = new PannerNode(audioCtx, {
  panningModel,
  distanceModel,
  positionX,
  positionY,
  positionZ,
  orientationX,
  orientationY,
  orientationZ,
  refDistance,
  maxDistance,
  rolloffFactor: rollOff,
  coneInnerAngle: innerCone,
  coneOuterAngle: outerCone,
  coneOuterGain: outerGain,
});
```
