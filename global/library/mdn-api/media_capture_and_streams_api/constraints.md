---
title: "Capabilities, constraints, and settings (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/media_capture_and_streams_api/constraints/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Capabilities, constraints, and settings

This article discusses the twin concepts of **constraints** and **capabilities**, as well as media settings, and includes an example we call the Constraint Exerciser. The Constraint Exerciser lets you experiment with the results of different constraint sets being applied to the audio and video tracks coming from the computer's A/V input devices (such as its webcam and microphone).

Historically, writing scripts for the Web that work intimately with Web APIs has had a well-known challenge: often, your code needs to know whether or not an API exists and if so, what its limitations are on the user agent it's running on. Figuring this out has often been difficult, and has usually involved looking at some combination of which user agent (or browser) you're running on, which version it is, looking to see if certain objects exist, trying to see whether various things work or not and determining what errors occur, and so forth. The result has been a lot of very fragile code, or a reliance on libraries which figure this stuff out for you, then implement polyfills to patch the holes in the implementation on your behalf.

Capabilities and constraints let the browser and website or app exchange information about what **constrainable properties** the browser's implementation supports and what values it supports for each.

## Overview

The process works like this (using `MediaStreamTrack` as an example):

1. If needed, call `MediaDevices.getSupportedConstraints()` to get the list of **supported constraints**, which tells you what constrainable properties the browser knows about. This isn't always necessary, since any that aren't known will be ignored when you specify them—but if you have any that you can't get by without, you can start by checking to be sure they're on the list.
2. Once the script knows whether the property or properties it wishes to use are supported, it can then check the **capabilities** of the API and its implementation by examining the object returned by the track's `getCapabilities()` method; this object lists each supported constraint and the values or range of values which are supported.
3. Finally, the track's `applyConstraints()` method is called to configure the API as desired by specifying the values or ranges of values it wishes to use for any of the constrainable properties about which it has a preference.
4. The track's `getConstraints()` method returns the set of constraints passed into the most recent call to `applyConstraints()`. This may not represent the actual current state of the track, due to properties whose requested values had to be adjusted and because platform default values aren't represented. For a complete representation of the track's current configuration, use `getSettings()`.

In the Media Capture and Streams API, both `MediaStream` and `MediaStreamTrack` have constrainable properties.

## Determining if a constraint is supported

If you need to know whether or not a given constraint is supported by the user agent, you can find out by calling `navigator.mediaDevices.getSupportedConstraints()` to get a list of the constrainable properties which the browser knows, like this:

```js
const supported = navigator.mediaDevices.getSupportedConstraints();

document.getElementById("frameRateSlider").disabled = !supported["frameRate"];
```

In this example, the supported constraints are fetched, and a control that lets the user configure the frame rate is disabled if the `frameRate` constraint isn't supported.

## How constraints are defined

A single constraint is an object whose name matches the constrainable property whose desired value or range of values is being specified. This object contains zero or more individual constraints, as well as an optional sub-object named `advanced`, which contains another set of zero or more constraints which the user agent must satisfy if at all possible. The user agent attempts to satisfy constraints in the order specified in the constraint set.

The most important thing to understand is that most constraints aren't requirements; instead, they're requests. There are exceptions, and we'll get to those shortly.

### Requesting a specific value for a setting

Most, each constraint may be a specific value indicating a desired value for the setting. For example:

```js
const constraints = {
  width: 1920,
  height: 1080,
  aspectRatio: 1.777777778,
};

myTrack.applyConstraints(constraints);
```

In this case, the constraints indicate that any values are fine for nearly all properties, but that a standard high definition (HD) video size is desired, with the standard 16:9 aspect ratio. There's no guarantee that the resulting track will match any of these, but the user agent should do its best to match as many as possible.

The prioritization of the properties is simple: if two properties' requested values are mutually exclusive, then the one listed first in the constraint set will be used. As an example, if the browser running the code above couldn't provide a 1920x1080 track but could do 1920x900, then that's what would be provided.

Simple constraints like these, specifying a single value, are always treated as non-required. The user agent will try to provide what you request but will not guarantee that what you get will match. However, if you use simple values for properties when calling `MediaStreamTrack.applyConstraints()`, the request will always succeed, because these values will be considered a request, not a requirement.

### Specifying a range of values

Sometimes, any value within a range is acceptable for a property's value. You can specify ranges with either or both minimum and maximum values, and you can even specify an ideal value within the range, if you choose. If you provide an ideal value, the browser will try to get as close as possible to matching that value, given the other constraints specified.

```js
const supports = navigator.mediaDevices.getSupportedConstraints();

if (
  !supports["width"] ||
  !supports["height"] ||
  !supports["frameRate"] ||
  !supports["facingMode"]
) {
  // We're missing needed properties, so handle that error.
} else {
  const constraints = {
    width: { min: 640, ideal: 1920, max: 1920 },
    height: { min: 400, ideal: 1080 },
    aspectRatio: 1.777777778,
    frameRate: { max: 30 },
    facingMode: { exact: "user" },
  };

  myTrack
    .applyConstraints(constraints)
    .then(() => {
      /* do stuff if constraints applied successfully */
    })
    .catch((reason) => {
      /* failed to apply constraints; reason is why */
    });
}
```

Here, after ensuring that the constrainable properties for which matches must be found are supported (`width`, `height`, `frameRate`, and `facingMode`), we set up constraints which request a width no smaller than 640 and no larger than 1920 (but preferably 1920), a height no smaller than 400 (but ideally 1080), an aspect ratio of 16:9 (1.777777778), and a frame rate no greater than 30 frames per second. In addition, the only acceptable input device is a camera facing the user (a "selfie cam"). If the `width`, `height`, `frameRate`, or `facingMode` constraints can't be met, the promise returned by `applyConstraints()` will be rejected.

> **Note:**
> Constraints which are specified using any or all of `max`, `min`, or `exact` are always treated as mandatory. If any constraint which uses one or more of those can't be met when calling `applyConstraints()`, the promise will be rejected.

### Advanced constraints

So-called advanced constraints are created by adding an `advanced` property to the constraint set; this property's value is an array of additional constraint sets which are considered optional. There are few if any use cases for this feature, and there is some interest in removing it from the specification, so it will not be discussed here. If you wish to learn more, see section 11 of the Media Capture and Streams specification, past example 2.

## Checking capabilities

You can call `MediaStreamTrack.getCapabilities()` to get a list of all of the supported capabilities and the values or ranges of values which each one accepts on the current platform and user agent. This function returns an object which lists each constrainable property supported by the browser and a value or range of values which are supported for each one of those properties.

For example, the following snippet will result in the user being asked for permission to access their local camera and microphone. Once permission is granted, `MediaTrackCapabilities` objects will be logged to the console that detail the capabilities of each `MediaStreamTrack`:

```js
navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream) => {
    const tracks = stream.getTracks();
    tracks.map((t) => console.log(t.getCapabilities()));
  });
```

An example capabilities object looks like this:

```json
{
  "autoGainControl": [true, false],
  "channelCount": {
    "max": 1,
    "min": 1
  },
  "deviceId": "jjxEMqxIhGdryqbTjDrXPWrkjy55Vte70kWpMe3Lge8=",
  "echoCancellation": [true, false],
  "groupId": "o2tZiEj4MwOdG/LW3HwkjpLm1D8URat4C5kt742xrVQ=",
  "noiseSuppression": [true, false]
}
```

The exact contents of the object will depend on the browser and media hardware.

## Applying constraints

The first and most common way to use constraints is to specify them when you call `getUserMedia()`:

```js
navigator.mediaDevices
  .getUserMedia({
    video: {
      width: { min: 640, ideal: 1920 },
      height: { min: 400, ideal: 1080 },
      aspectRatio: { ideal: 1.7777777778 },
    },
    audio: {
      sampleSize: 16,
      channelCount: 2,
    },
  })
  .then((stream) => {
    videoElement.srcObject = stream;
  })
  .catch(handleError);
```

In this example, constraints are applied at `getUserMedia()` time, asking for an ideal set of options with fallbacks for the video.

> **Note:**
> You can specify one or more media input device IDs to establish restrictions on which input sources are allowed. To collect a list of the available devices, you can call `navigator.mediaDevices.enumerateDevices()`, then for each device which meets the desired criteria, add its `deviceId` to the `MediaConstraints` object that eventually gets passed into `getUserMedia()`.

You can also change the constraints of an existing `MediaStreamTrack` on the fly, by calling the track's `applyConstraints()` method, passing into it an object representing the constraints you wish to apply to the track:

```js
videoTrack.applyConstraints({
  width: 1920,
  height: 1080,
});
```

In this snippet, the video track referenced by `videoTrack` is updated so that its resolution as closely as possible matches 1920x1080 pixels (1080p high definition).

## Retrieving current constraints and settings

It's important to remember the difference between **constraints** and **settings**. Constraints are a way to specify what values you need, want, and are willing to accept for the various constrainable properties (as described in the documentation for `MediaTrackConstraints`), while settings are the actual values of each constrainable property at the current time.

### Getting the constraints in effect

If at any time you need to fetch the set of constraints that are currently applied to the media, you can get that information by calling `MediaStreamTrack.getConstraints()`, as shown in the example below.

```js
function switchCameras(track, camera) {
  const constraints = track.getConstraints();
  constraints.facingMode = camera;
  track.applyConstraints(constraints);
}
```

This function accepts a `MediaStreamTrack` and a string indicating the camera facing mode to use, fetches the current constraints, sets the value of the `MediaTrackConstraints.facingMode` to the specified value, then applies the updated constraint set.

### Getting the current settings for a track

Unless you only use exact constraints (which is pretty restrictive, so be sure you mean it!), there's no guarantee exactly what you're going to actually get after the constraints are applied. The values of the constrainable properties as they actually are in the resulting media are referred to as the settings. If you need to know the true format and other properties of the media, you can obtain those settings by calling `MediaStreamTrack.getSettings()`. For example:

```js
function whichCamera(track) {
  return track.getSettings().facingMode;
}
```

This function uses `getSettings()` to obtain the track's currently in-use values for the constrainable properties and returns the value of `facingMode`.
