---
title: "Fundamentals of WebXR (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webxr_device_api/fundamentals/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Fundamentals of WebXR (part 2 of 2)

## Important health and safety reminders

Because the entire act of creating a virtual 3D world is, in essence, a trick which takes advantage of our understanding of how eyes collect light and how the brain interprets the collected data, it is important to keep in mind that as such, software designers and developers have a responsibility to be even more careful than usual to ensure that the results are correct.

### Virtual reality sickness

**Virtual reality sickness** is a condition in which a person experiencing virtual reality feels discomfort, disorientation, or even serious nausea during and sometimes for a short time after the experience.

There are a number of theories surrounding exactly what about virtual reality causes some people to feel uncomfortable or sick, most of which focusing on the idea that even subtle differences between what the brain thinks should be happening and what is being seen can cause these symptoms.

Defects, misalignments, or distortion can confuse the eyes and the brain, resulting in anything from aching eyes or headache to in some cases vertigo, dizziness, or potentially severe nausea. It's also important to be alert for anything you may display that may have the potential to trigger seizures, given the all-encompassing nature of a headset; the user may not be able to quickly look away from the imagery you're presenting if it's causing distress.

### Physical risks

Another potential issue with immersive virtual reality is the user colliding with physical obstacles if they're moving around their room while wearing a headset. Unless they're in a safe environment, it's important to provide cues to restrict their movement, such as by simulating a space that is known to be safe within their physical environment.

If the user's headset is tethered to a device, it's a good idea to try to ensure that the user isn't prompted or tempted to move in such a way that they pull or yank on the headset cord, which could not only cause injury, but could cause significant damage to the user's headset or device (whether it's a phone or a computer).

If you have any content that may be of risk to any users, you should provide a warning message. Likewise, it's worth reminding users to remain seated if possible, and to be cautious about moving around while wearing a headset if the experience is fully-immersive virtual reality. It's always better to be safe than sorry!

## The role of frameworks

Because 3D graphics—and mixed reality in particular—involve a lot of often intricate math, data management, and other complex tasks, it's unlikely that you'll directly use WebGL to render your scene in most cases. Instead, you'll probably do most of your work making use of one of the frameworks or libraries that are built atop WebGL to make it more convenient to use.

A particular benefit to using a framework rather than directly using the WebGL API is that libraries tend to implement virtual camera functionality. OpenGL (and thus WebGL by extension) does not directly offer a camera view, using a library that simulates one on your behalf can make your job much, much easier, especially when building code that allows free movement through your virtual world.

Since WebGL is used for rendering the 3D world into the WebXR session, you should first be familiar with WebGL's general usage, and with the basics of 3D graphics in general.

### General-purpose 3D frameworks

These frameworks are good for general-purpose programming as well as for game development when you want to do the logic yourself. They're designed for creating and animating 3D scenes regardless of context.

- A-Frame (specifically designed for creating WebXR-based apps)
- Babylon.js
- Three.js

### Game toolkits

The game toolkits are designed for game developers and often include gaming-specific features such as physics models, input control systems, asset management, 3D sound playback, and the like.

- PlayCanvas

## Next steps

With these basic facts in hand, you're ready to take those next steps into the world of mixed reality. The following articles can help.

- WebXR application life cycle
- Starting up and shutting down a WebXR session
- Movement, orientation, and motion: A WebXR example
