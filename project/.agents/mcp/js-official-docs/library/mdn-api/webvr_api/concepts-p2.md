---
title: "WebVR concepts (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webvr_api/concepts/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebVR concepts (part 2 of 2)

## Concepts for VR apps

This section discusses concepts to be aware of when developing VR apps that you've probably not had to consider before when developing regular apps for mobile or desktop.

### Stereoscopic vision

Stereoscopic vision is the normal vision humans and (most) animals have — the perception of two slightly differing images (one from each eye) as a single image. This results in depth perception, helping us to see the world in glorious 3D. To recreate this in VR apps, you need to render two very slightly different views side by side, which will be taken in by the left and right eyes when the user is using the HMD.

### Head tracking

The primary technology used to make you feel present in a 360º scene, thanks to the gyroscope, accelerometer, and magnetometer (compass) included in the HMD.
It has primary relevance because it makes our eyes believe we are in front of a spherical screen, giving users realistic immersion inside the app canvas.

### Eye strain

A term commonly used in VR because it is a major handicap of using an HMD — we are constantly fooling the eye with what we are showing in the app canvas, and this leads to the eyes doing a lot more work than they normally would, so using VR apps for any extended period of time can lead to eye strain.

To minimize this unwanted effect, we need to:

- Avoid focusing on different depths (e.g., avoid using a lot of particles with different depths.)
- Avoid eye convergence (e.g., if you have an object that comes towards the camera your eyes will follow and converge on it.)
- Use darker backgrounds with more subdued colors where possible; a bright screen will make the eyes more tired.
- Avoid rapid brightness changes.
- Avoid presenting the user with large amounts of text to read. You should also be careful with the distance between the eyes/camera and the text to read. 0.5m is uncomfortable, whereas at more than 2m the stereo effect starts to break down, so somewhere in between is advisable.
- Be careful with the distance between objects and the camera in general. Oculus recommends 0.75m as a minimum distance of focus.
- Use a pointer if the user needs to interact with an object in the scene — this will help them point to it correctly with less effort.

In general, the path of least visual effort will give the user a less tiring experience.

### Motion sickness

If developers do not take utmost care, VR apps can actually cause their users to feel sick. This effect is produced when the stimuli their eyes are receiving is not what the body expects to receive.

To avoid bringing on motion sickness in our users (or at least minimize the effects), we need to:

- Always maintain head tracking (this is the most important of all, especially if it occurs in middle of the experience.)
- Use constant velocity; avoid acceleration or deceleration camera movements (use linear acceleration, and avoid easing if you can.)
- Keep the frame rate up (less than 30fps is uncomfortable.)
- Avoid sharp and/or unexpected camera rotations.
- Add fixed points of reference for fixed objects (otherwise the user will believe they are on the move.)
- Do not use Depth of Field or Motion Blur post processing because you do not know where the eyes will focus.
- Avoid brightness changes (use low frequency textures or fog effects to create smooth lighting transitions).

Overall your eyes should not send signals to the brain that cause reflex actions in other parts of the body.

### Latency

Latency is the time between the physical head movement and the visual display reaching the user's eyes from the screen of an HMD being updated. This is one of the most critical factors in providing a realistic experience. Humans can detect very small delays — we need to keep the latency below 20 milliseconds if they are to be imperceptible (for example a 60Hz monitor has a 16 ms response.)

The Oculus Rift headset has a latency of 20 ms or less, but with mobile device-based setups it will depend heavily on the smartphone CPU power and other capabilities.

### Frame rate (Frames per second / FPS)

Based on the Wikipedia definition, frame rate is the frequency at which an imaging device produces unique consecutive images, called frames. A rate of 60fps is an acceptable rate for a smooth user experience, but depending on the performance of the machine the app is running on, or the complexity of the content you want to show, it can drastically lower. Less than 30fps is generally considered jittery, and annoying to the user.

One of the most difficult tasks is to maintain a constant and high frame rate value, so we must optimize our code to make it as efficient as possible. It is preferable to have a decent frame rate that doesn't constantly or suddenly change; for this you need to as few necessary objects moving into the scene as possible and (in the case of WebGL) try to reduce draw calls.

### Interpupillary distance (IPD)

Based on the Wikipedia definition, IPD is the distance between the centers of the pupils of the two eyes. IPD is critical for the design of binocular viewing systems, where both eye pupils need to be positioned within the exit pupils of the viewing system.

Interpupillary distance (IPD) can be calculated using `VREyeParameters.offset` in WebVR, which is equal to half the IPD.

This value is returned by the HMD and its value may be around 60 to 70 mm; in the case of some HMDs like Oculus Rift's, you can set your own IPD. Normally we don't change this value but you can play with it to change the scale of the entire scene. For example, if your IPD is set to 6000 mm, the user would view the scene like a giant looking at a Lilliputian world.

### Degrees of Freedom (DoF)

DoF refers to the movement of a rigid body inside space. There is no uniformity in creating acronyms for this term — we can find references to 3DoF in the context of sensors that detect only rotational head tracking, and 6DoF when an input allows us to control position and orientation simultaneously. We even sometimes find 9DoF references when the hardware contains three sensors like gyroscope, accelerometer and magnetometer, but the results of the 3 x 3DoF values will actually return a 6 degrees of freedom tracking.

DoF is directly related to the tracking of the user's head movement.

### Cone of focus

Although our field of view is much larger (approximately 180º), we need to be aware that only in a small portion of that field can you perceive symbols (the center 60º) or read text (the center 10º). If you do not have an eye tracking sensor we assume that the center of the screen is where the user is focusing their eyes.

This limitation is important to consider when deciding where to place visuals on the app canvas — too far toward the edge of the cone of focus can lead to eye strain much more quickly.

### 3D Positional Audio

3D positional audio refers to a group of effects that manipulate audio to simulate how it would sound in a three dimensional space.

This directly related to the Web Audio API, which allows us to place sounds on objects we have in the canvas or launch audio depending on the part of the scene the user is traveling towards or looking at.
