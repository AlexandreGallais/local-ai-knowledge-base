---
title: "WebVR concepts (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webvr_api/concepts/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebVR concepts

> **Note:**
> WebVR API is replaced by WebXR API. WebVR was never ratified as a standard, was implemented and enabled by default in very few browsers and supported a small number of devices.

This article discusses some of the concepts and theory behind virtual reality (VR). If you are a newcomer to the area, it is worthwhile getting an understanding of these topics before you start diving into code.

## The history of VR

Virtual reality is nothing new — the concept goes way further back than the Oculus Rift Kickstarter campaign of 2012. People have been experimenting with it for decades.

In 1939 the View-Master device was created, allowing people to see 3D pictures. The device displayed images stored on cardboard disks containing stereoscopic 3D pairs of small color photographs. After years of development the military got interested in using such technology, and Project Headsight was born in 1961 — this involved a helmet incorporating a video screen with a head-tracking system.

There were various experiments conducted over the next few decades, but it wasn't restricted to science labs and battlefields anymore. Eventually pop culture took over with movie directors showing their visions of virtual reality. Movies like Tron (1982) and The Matrix (1999) were created, where people could transfer themselves into a whole new cyber world or were trapped in one without even knowing, accepting it as the real world.

The first VR gaming attempts were big and expensive — in 1991 Virtuality Group created a VR-ready arcade machine with goggles and ported popular titles like Pac-Man to virtual reality. Sega introduced their VR glasses at the Consumer Electronics Show in 1993. Companies were experimenting, but the market and consumers weren't convinced — we had to wait until 2012 to see a real example of a successful VR project.

### VR in recent times

So what's new? Virtual Reality hardware needs to deliver high-precision, low-latency data to deliver an acceptable user experience; computers running VR applications need to be powerful enough to handle all this information. It has not been until recently that such accuracy and power has been available at an affordable cost, if at all. Early VR prototypes cost tens of thousands of dollars, whereas more recent headsets such as the HTC VIVE and Meta Quest are available for hundreds of dollars, and cheaper solutions are available — mobile device-based solutions like Google Cardboard.

On the software side, Valve has created SteamVR software, which is compatible with the VIVE and other solutions, and serves to provide access to software, such as a usable VR UI.

The technology itself is here, and the more expensive headsets will only get cheaper over time so more people can experience virtual reality on their own in the future.

### Input devices

Handling input for virtual reality applications is an interesting topic — it's a totally new experience for which dedicated user interfaces have to be designed. There are various approaches right now from classic keyboard and mouse, to new ones like Leap Motion and the VIVE controllers. It's a matter of trial and error to see what works in given situations and what inputs fit best for your type of game.

## VR Hardware setup

There are two main types of setup, mobile or computer-connected. Their minimum hardware set ups are as follows:

- Mobile: A Head-mounted display (HMD) is created using a smartphone — which acts as the VR display — mounted in a VR mount such as Google Cardboard, which contains the required lenses to provide stereoscopic vision of what is projected on the mobile screen.
- Computer-connected: A VR setup is connected to your computer — this consists of a Head Mounted Display (HMD) containing a high resolution landscape-oriented screen onto which the visuals for both the left and right eye are displayed, which also includes a lens for each eye to promote separation of the left and right eye scene (stereoscopic vision.) The setup also includes a separate position sensor that works out the position/orientation/velocity/acceleration of your head and constantly passes that information the computer.

> **Note:**
> Computer-connected systems sometimes don't include a position sensor, but they usually do.

Other hardware that complements the VR experience includes:

- **A hand recognition sensor**: A sensor that tracks the position and movement of your hand, allowing it to become an interesting controller, and an object in VR gameworlds. The most advanced to date is the Leap Motion, which works with the computer (connected to the Oculus Rift) and can also work connected to a mobile device (the latter is in an experimental phase.)
- **A gamepad**: We can configure an XBox controller or similar to work as a keyboard in the browser — this offers further possibilities of interaction with a VR webpage. There are some gamepads that work with a mobile setup but these are connected via Bluetooth so don't work with WebVR.
- **An eye tracking sensor (experimental)**: The FOVE project is the first headset that reads subtle eye movements.
- **A facial expression tracker (experimental)**: Researchers at the University of Southern California and Facebook's Oculus division have been testing new ways of tracking facial expressions and transferring them to a virtual character.
- **A more complex positional sensor system**: As an example, the HTC VIVE features two position sensors that sit in opposite corners of a space, mapping it all out and allowing VR experiences to be enjoyed in spaces of up to 5m x 5m.

## Position and orientation, velocity and acceleration

As mentioned above, the position sensor detects information concerning the HMD and constantly outputs it, allowing you to continually update a scene according to head movement, rotation, etc. But what exactly is the information?

The output information falls into four categories:

1. Position — The position of the HMD along three axes in a 3D coordinate space. x is to the left and right, y is up and down, and z is towards and away from the position sensor. In WebVR, the x, y, and z coordinates are represented by the array contained in `VRPose.position`.
2. Orientation — The rotation of the HMD around three axes in a 3D coordinate space. Pitch is rotation around the x axis, yaw is rotation around the y axis, and roll is rotation around the z axis. In WebVR, the pitch, yaw, and roll are represented by the first three elements of the array contained in `VRPose.orientation`.
3. Velocity — There are two types of velocity to consider in VR:
   - Linear — The speed along any one of the axes that the HMD is traveling. This information can be accessed using `VRPose.linearVelocity`.
   - Angular — The speed at which the HMD is rotating around any one of the axes. This information can be accessed using `VRPose.angularVelocity`.

4. Acceleration — There are two types of acceleration to consider in VR:
   - Linear — The acceleration of travel along any one of the axes that the HMD is traveling. This information can be accessed using `VRPose.linearAcceleration`.
   - Angular — The acceleration of rotation of the HMD around any one of the axes. This information can be accessed using `VRPose.angularAcceleration`.

## Field of view

The field of view (FOV) is the area that each of the user's eyes can reasonably be expected to see. It roughly takes the form of a pyramid shape, laid down on one side, with the apex inside the user's head, and the rest of the pyramid emanating from the user's eye. Each eye has its own FOV, one slightly overlapping the other.

The FOV is defined by the following values:

- `VRFieldOfView.upDegrees`: The number of degrees upwards that the field of view extends in.
- `VRFieldOfView.rightDegrees`: The number of degrees to the right that the field of view extends in.
- `VRFieldOfView.downDegrees`: The number of degrees downwards that the field of view extends in.
- `VRFieldOfView.leftDegrees`: The number of degrees to the left that the field of view extends in.
- zNear, defined by `VRDisplay.depthNear`: The distance from the middle of the user's head to the start of the visible FOV.
- zFar, defined by `VRDisplay.depthFar`: The distance from the middle of the user's head to the end of the visible FOV.

The default values for these properties will differ slightly by VR hardware, although they tend to be around 53° up and down, and 47° left and right, with zNear and zFar coming in at around 0.1m and 10000m respectively.

> **Note:**
> The user can potentially see all the way around them, which is a brand new concept for apps and games. Try to give people a reason to look around and see what's behind them — make them reach out and find things that are not visible at the very beginning. Describe what's behind their backs.
