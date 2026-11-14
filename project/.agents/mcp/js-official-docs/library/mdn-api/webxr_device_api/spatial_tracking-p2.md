---
title: "Spaces and reference spaces: Spatial tracking in WebXR (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webxr_device_api/spatial_tracking/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Spaces and reference spaces: Spatial tracking in WebXR (part 2 of 2)

## Continuity and recovery after tracking loss

Sometimes, while the user is actively using their XR hardware with your app, the flow of data containing updates as to the user's position and orientation might be lost for a period of time. Not only does your app need to determine what to show the user during these periods, but it needs to cleanly recover when tracking resumes.

Once the XR hardware begins providing tracking information, it will continue to do so until the XR session is closed. This data is obtained during each frame by calling the `XRFrame` method `getViewerPose()` to get the position and facing direction of the viewer (defining what the user should see), and `getPose()` to get any other poses, such as the positions of the hand controllers and any other parts of the XR system.

### Detecting and functioning after tracking loss

If tracking fails, such as due to a temporary loss of connectivity between the headset and the user's device, the XR layer will continue to return poses, but those poses' `emulatedPosition` property will be `true`, indicating that the computation of the pose is based on a guess of the current position of the user.

Some XR hardware uses algorithms to compute the estimated position of the user based on the movement currently ongoing, while other hardware will report no movement at all, but with `emulatedPosition` set to `true`. In either case, you may wish to adjust your rendering to compensate for the loss, depending on your specific needs.

### When tracking resumes

You can detect when tracking has resumed after being lost when the user position jumps while at the same time the value of `emulatedPosition` changes from `true` to `false`. How you handle this depends on your application. If your app provides a way for the user to move through the virtual world without physically moving in the real world (a so-called **teleportation** mechanic), you can accept the new position and continue, allowing the jump from your previously-assumed position to be immediately corrected with the new position.

On the other hand, if your app involves the user physically moving in real space to move around through your virtual world, adopting the new tracking position and jumping there can be unsettling to the user, and should be avoided if possible. Instead, use the difference between the current position and the new tracking position to compute the new teleportation offset; that is, a transform applied to everything to adapt the position and orientation data from WebXR to your needs.

You can do this by creating a new reference space that incorporates into its effective origin the distance the viewer's position jumped since the previous frame, using the `XRReferenceSpace` method `getOffsetReferenceSpace()`.

### The reset event

When a discontinuity or break in the native or effective origin of a reference space occurs, the user agent will send the `XRReferenceSpace` a `reset` event. This event indicates that a significant change to the origin's position has taken place relative to the user's environment.

A `reset` may occur because the XR hardware lost connectivity for a time, resulting in the user's movements not being properly tracked for a while. Upon recovery of tracking, a `reset` means tracking has been restored and the new position information represents the actual position information provided by the XR hardware, rather than cached or "best-guess" data.

Another reason `reset` may be sent is because the user has exited the bounds of a reference space and entered another reference space, or because the user has been transitioned programmatically from one reference space to another. Any time the bounds geometry of the user's space changes, a `reset` is sent.

`reset` is only used for significant jumps or transitions; minor things will just be absorbed automatically. The event is always sent to every affected reference space, including those created using `getOffsetReferenceSpace()`, so if you listen for `reset` events, you need to be sure you retain a strong reference to any spaces you're still using.

## See also

- Matrix math for the web
- Geometry and reference spaces in WebXR
- Rendering and the WebXR frame animation callback
- Viewpoints and viewers: Simulating cameras in WebXR
- Movement, orientation, and motion: A WebXR example
- Using bounded reference spaces
