---
title: "Rendering and the WebXR frame animation callback (part 1 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webxr_device_api/rendering/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Rendering and the WebXR frame animation callback

Once your WebXR environment has been set up and an `XRSession` created to represent an ongoing XR environment session, you need to provide frames of the scene to the XR device for rendering. This article covers the process of driving the frames of the XR scene to the device in the rendering loop, using the `XRSession` to obtain an `XRFrame` object representing each frame, which is then used to prepare the framebuffer for delivery to the XR device.

Before you can render the virtual environment, you need to establish a WebXR session by creating an `XRSession` using the `navigator.xr.requestSession()` method; you also need to associate the session with a framebuffer and perform other setup tasks. These setup tasks are described in the article Starting up and shutting down a WebXR session.

## Preparing the renderer

Once the XR session has been set up, with the WebGL framebuffer connected and WebGL primed with the data it needs in order to render the scene, you can set up the renderer to start running. This begins with getting the reference space in which you want to draw, with its origin and orientation set at the viewer's starting position and viewing direction. Once that's in hand, you request that the browser call your rendering function the next time it needs a framebuffer to render your scene. This is done by calling the `XRSession` method `requestAnimationFrame()`.

Kicking off the renderer thus looks like this:

```js
let worldRefSpace;

async function runXR(xrSession) {
  worldRefSpace = await xrSession.requestReferenceSpace("local");

  if (worldRefSpace) {
    viewerRefSpace = worldRefSpace.getOffsetReferenceSpace(
      new XRRigidTransform(viewerStartPosition, viewerStartOrientation),
    );
    animationFrameRequestID = xrSession.requestAnimationFrame(myDrawFrame);
  }
}
```

After getting a reference space for the immersive world, this creates an offset reference space representing the position and orientation of the viewer by creating an `XRRigidTransform` representing that position and orientation, then calling the `XRReferenceSpace` method `getOffsetReferenceSpace()`.

Then the first animation frame is scheduled by calling the `XRSession` method `requestAnimationFrame()`, providing a callback function, `myDrawFrame()`, whose job is to render the frame.

Note that this code doesn't have a loop! Instead, the frame rendering code—in this case, a function named `myDrawFrame()`—is responsible for scheduling time to draw another frame by once again calling `requestAnimationFrame()`.

## Refresh rate and frame rate

Assuming you've called the `XRSession` method `requestAnimationFrame()` since the last time the screen refreshed, the browser will call your frame rendering callback every time it's ready to repaint your app or site window. In this context, "repaint" means the process of ensuring that the screen's displayed content matches what the DOM and the elements within are trying to present at the moment.

### Hardware vertical refresh rate

When the browser is ready to refresh the `<canvas>` within which your WebXR content is displayed, it calls your frame rendering callback, which uses the specified timestamp and any other relevant data, such as models and textures, as well as application state, to render the scene—as it should appear at the specified time—into the WebGL backbuffer. When your callback returns, the browser transfers that backbuffer to the display or XR device, along with anything else that's changed since the last time the screen was refreshed.

Historically, displays have refreshed 60 times per second. This is due to early displays using the AC electrical grid's current flow waveform, which cycles 60 times per second in the United States (50 in Europe), for timing purposes. This figure goes by a number of different names, but they're all equivalent or nearly so:

- Refresh rate
- Vertical refresh rate
- Vertical blanking rate (VBL)
- Vertical sync rate

There are other similar terms used as well, but regardless of what it's called, the unit of measurement applied is the Hertz, or Hz. A display that refreshes 60 times per second has a 60 Hz refresh rate. That means that the maximum number of frames it can display in a second is 60. No matter how many frames per second you render beyond that, only 60 of them will make it to the screen in the course of a second.

But not all displays run at 60 Hz; nowadays, higher performance displays are beginning to use much higher refresh rates. 120 Hz—or 120 frame per second—displays are increasingly common, for example. The browser always tries to refresh at the same rate as the display, which means that on some computers, your callback will be run a maximum of 60 times per second, while on others it might be called 90 or 120 times per second or even more, depending on the frame rate.

### Time available to render each frame

This makes using the most of the time available between frames critical. If the user's device is using a 60 Hz display, your callback will be called up to 60 times per second, and your goal is to do what you can to ensure that it doesn't get called less often than that. You achieve this by doing as much as is practicable off the main thread and by keeping your frame rendering callback as efficient as possible. The division of time into 60 Hz blocks with each block being used at least in part to render the scene is shown in the diagram below.

This is important because as the computer becomes increasingly busy, it may not be able to accurately call your callback every frame and may have to skip frames. This is called **dropping frames**. This happens when the amount of time it takes to render a frame exceeds the time available between frames, whether because rendering was delayed or because rendering itself took more time than was available.

In the diagram above, frame 3 is dropped because frame 2 did not complete rendering until after frame 3 was due to be painted. The next frame drawn will be frame 4 instead. This is another reason the timestamp passed into your rendering callback is useful. By configuring the scene based on time rather than frame number, you can ensure your rendered frames match what's expected instead of falling behind.

When a frame is dropped, the contents of the affected display area don't change for that pass <example-value> the frame loop. For that reason, the occasional dropped frame isn't usually particularly noticeable, but if it starts to happen a lot—especially if several frames are dropped in a very short span of time—it can become jarring or even leave your display unusable.

Fortunately, you can easily compute how much time you're allowed to use between frames as `1/refreshRate` seconds. That is, by dividing 1 by the display's refresh rate. The resulting value is the amount of time available for each frame to be rendered in order to not drop the frame. For example, a 60 Hz display has 1/60th of a second to render a single frame, or 0.0166667 seconds. And if the device's refresh rate is 120 Hz, you only have 0.00883333 seconds to render each frame if you want to avoid dropping frames.

Even if the hardware is actually 120 Hz, though, you can get by with just refreshing 60 times per second anyway, and targeting that is usually a good baseline to follow. 60 FPS is already beyond the point at which most people can easily detect that the animation isn't a series of still images going by really fast. In other words, when in doubt, you can assume that the display is refreshing at 60 Hz. As long as your code is written properly, everything will be fine.

### Renderer performance concerns

Clearly, you have very little time to render your scene each frame. Not only that, but if your renderer itself runs longer than that amount of time, you can cause not just the frame to get dropped, but that time to be wasted entirely, blocking other code from getting to run at all for that frame.

Not only that, but if your rendering crosses the vertical refresh boundary, you can wind up with a **tearing** effect. Tearing occurs when the display hardware starts the next refresh cycle while the previous frame is still being drawn to the screen. As a result, you wind up with the visual effect of the top part of the screen showing the new frame, while the bottom part of the frame shows some combination of the previous frame and possibly even the frame before that one.

Your mission, then, is to keep your code tight and lightweight enough that you don't overrun the time available to you or otherwise cause dropped frames or excessively abuse the main thread.

For these reasons, unless your renderer is fairly small and lightweight, with little to do, you should consider offloading everything you can to a worker so you can be computing the next frame while the browser handles other things. By having your computations and data ready before the frame is actually called for, you can make your site or app render much more efficiently, improving main thread performance and generally making the user experience better.

Fortunately, there are some tricks you can use to further reduce your impact and optimize performance if your rendering needs are particularly heavy. See the WebXR performance guide for recommendations and tips that will help you ensure your performance is as good as it can be.

## WebXR frames

Your frame rendering callback function receives as input two parameters: the time to which the frame corresponds, and an `XRFrame` object describing the state of the scene as of that time.

### The optics of 3D

We have two eyes for a reason: by having two eyes, each inherently sees the world from a slightly different angle. Since they're a known, fixed distance apart, our brains can do basic <example-value> and trigonometry and figure out the 3D nature of reality from that information. We also make use of perspective, size differences, and even our understanding of how things usually look to figure out the details of that third dimension. These factors, among others, are the source of our depth perception.

To create the illusion of three dimensions when rendering graphics, we need to simulate as many of these factors as we can. The more of these we simulate—and the more accurately we do so—the better we are able to trick the human brain into perceiving our images in 3D. The advantage to XR is that not only can we use the classic monocular techniques to simulate 3D graphics (perspective, size, and simulated parallax), but we can also simulate binocular vision—that is, vision using two eyes—by rendering the scene twice for each frame of animation—once for each eye.

The typical human's pupillary distance—the distance between the centers of the pupils—is between 54 and 74 millimeters (0.054 to 0.074 meters). So if the center of the viewer's head is located at `[0.0, 2.0, 0.0]` (about two meters above ground level at the center of the space horizontally), we first need to render the scene from, say, `[-0.032, 2.0, 0.0]` (32mm to the left of center) and then render it again at `[0.032, 2.0, 0.0]` (32mm right of center.) This way, we place the positions of the viewer's eyes at an average human pupillary distance of 64mm.

That distance (or whatever pupillary distance the XR system is configured to use) is enough to allow our minds to see just enough difference due to retinal disparity (the difference in what each retina sees) and the parallax effect to allow our brains to calculate the distance to and depth of objects, thus enabling us to perceive three dimensions despite our retinas only being 2D surfaces.

This is illustrated in the diagram below, in which we see how each eye perceives a die located directly in front of the viewer. While this diagram exaggerates the effect in some respects for illustrative purposes, the concept is the same. Each eye sees an area whose boundaries make up an arc in front of the eye. Because each eye is offset to one side or the other of the head's centerline, and each eye sees about the same field of view, the result is that each eye sees a slightly different part of the world in front of it, and from a slightly different angle.

The left eye sees the die from a little bit to the left of center, and the right eye sees it from a bit to the right of center. As a result, the left eye sees just a little bit more of the left side of the object and a little bit less of the right, and vice versa. These two images are focused onto the retinas and the resulting signal transmitted over the optic nerves to the brain's visual cortex, located at the back of the occipital lobe.

The brain takes those signals from the left and right eyes and constructs a single, unified, 3D image of the world in the viewer's brain, and that image is what is seen. And because of those differences between what is seen by the left eye versus the right eye, the brain is able to infer a great deal of information about how deep the object is, its size, and more. By combining that inferred depth information with other cues such as perspective, shadows, memories of what these relationships mean, and so forth, we can figure out a great deal about the world around us.

### Frames, poses, views, and framebuffers

Once you have an `XRFrame` representing the state of the scene at a moment in time, you need to determine the positions of objects within the scene relative to the viewer so that you can render them. The viewer's position and orientation relative to a reference space is represented by an `XRViewerPose` obtained by calling the `XRFrame` method `getViewerPose()`.

The `XRFrame` doesn't directly keep track of the positions or orientations of the objects in your world. Instead, it offers a way to convert positions and orientations into the scene's coordinate system, and it collects the viewer's position and orientation data from the XR hardware, converts it into the reference space you've configured, and delivers it to your frame rendering code with a timestamp. You use that timestamp and your own data to determine how to render the scene.

After rendering the scene twice—once into the left half of the framebuffer and once into the right half of the framebuffer—the framebuffer is sent to the XR hardware, which displays each half of the framebuffer to the corresponding eye. This is often (but not always) done by drawing the image to a single screen and using lenses to transfer the correct half of that image to each eye.

You can learn more about how 3D is represented by WebXR in Representing 3D with WebXR.
