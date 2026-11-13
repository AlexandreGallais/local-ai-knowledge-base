---
title: "Viewpoints and viewers: Simulating cameras in WebXR (part 1 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webxr_device_api/cameras/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Viewpoints and viewers: Simulating cameras in WebXR

The first and most important thing to understand when considering the code to manage point-of-view and cameras in your application is this: _WebXR does not have cameras_. There's no magic object provided by either the WebGL or the WebXR API that represents the viewer that you can rotate and move around to automatically change what's seen on the screen. In this guide we show how use WebGL to simulate camera movements without having a camera to move. These techniques can be used in any WebGL (or WebXR) project.

Animating 3D graphics is an area of software development that brings together multiple disciplines in computer science, mathematics, art, graphic design, kinematics, anatomy, physiology, physics, and cinematography. Since we don't have a real camera, we imagine one, reproducing the _effect_ of having a camera, without actually having the ability to move the user around the scene.

There are a few articles about the fundamental math, geometry, and other concepts behind WebGL and WebXR which may be useful to read before or while reading this one, including:

- Explaining basic 3D theory
- Matrix math for the web
- WebGL model view projection
- Geometry and reference spaces in WebXR

_Ed. note: Most diagrams used in this article to show how the camera moves while performing standard movements were taken from an article on the FilmmakerIQ website; namely, from this image which is found all over the web. We assume due to their frequent reuse that they're available under a permissive license, ownership is not certain. We hope that it's freely usable; if not, and you're the owner, please let us know and we'll find or produce new diagrams. Or, if you're happy to let us continue to use the images, please let us know so we can credit you properly!_

## Cameras and relative movement

When a classic live-action movie is filmed, the actors are on a set and move about the set as they perform, with one or more cameras watching their moves. The cameras may be fixed in place, but they may also be set up to move around as well, tracking the movement of the performers, dollying in and out to achieve emotional impact, and so forth.

### Virtual cameras

In WebGL (and by extension, in WebXR), there is no camera object we can move and rotate, so we have to find a way to fake these movements. Since there is no camera, we have to find a way to fake it. Fortunately, physicists like Galileo, Newton, Lorentz, and Einstein have given us the **principle of relativity**, which states that the laws of physics have the same form in every frame of reference. That is, no matter where you're standing, the laws of physics work in the same way.

By extension, if you and another person are standing in an empty field of solid stone with nothing else visible as far as the eye can see, if you move three meters toward the other person, the result _looks the same_ as if the other person had moved three meters toward you. There is no way for either of you to see the difference. A third party can tell the difference, but the two of you cannot. If you are a camera, you can achieve the same visual result both by moving the camera _or by moving everything around the camera_.

And that's our solution. Since we can't move the camera, we move the world around it. Our renderer needs to know where we imagine the camera to be, then alter the position of every visible object to simulate that position and orientation. Thus, instead of referring to an actual camera object, the term **camera** is used in WebGL and WebXR programming to refer to an object describing the position and viewing direction of a hypothetical viewer of the scene, whether there's an actual object present in 3D space or not.

### Points of view

Since the camera is a virtual object which, rather than necessarily representing a physical object in the virtual world, represents a viewer's position and viewing direction, it's useful to think about the kinds of situation that call for the use of a camera. Gaming-related situations are listed separately since they are often a special case specific to gaming, but any of these perspectives might apply to any 3D graphics scene.

#### Generalized cameras

In general, virtual cameras may or may not be incorporated into physical objects within the scene. Indeed, outside the scope of 3D gaming, the odds are far more likely that the camera will not correspond with an object that appears in the scene at all. Some examples of ways 3D cameras are used:

- When rendering animation—whether for filmmaking or for use within the context of a presentation or game—the virtual camera is used just like a real-world film camera. As much as possible, standard cinematographic techniques are used, since the viewer has likely grown up watching films using those techniques, and has subconscious expectations that a film or animation will follow those methods. Deviating from them can pull the viewer out of the moment.
- In business applications, the 3D camera is used to set the apparent size and perspective when rendering things such as graphs and charts.
- In mapping applications, the camera may either be placed directly over the scene, or might use various angles to show perspective. For 3D GPS solutions, the camera is positioned to show the area around the user, with the majority of the display showing the area ahead of the user's path of motion.
- When using WebGL to accelerate 2D graphics drawing, the camera is typically placed directly above the center of the scene with the distance and field of view set to allow the entire scene to be presented.
- When accelerating bitmapped graphics, the renderer would draw the 2D image into a WebGL texture's buffer, then redraw the texture to refresh the screen. This essentially uses the texture as a backbuffer for performing multiple buffering in your 2D graphics application.

#### Cameras in gaming

There are many kinds of games, and as such, there are several ways in which cameras might be used in games. Some common situations include:

- In a first-person game, the camera is located within the player's avatar's head, facing in the same direction as the avatar's eyes. This way, the view presented on the player's screen or headset is what their avatar would be seeing.
- In some third-person games, the camera is located a short distance behind the player's avatar or vehicle, showing them from behind as they move through the game world. This is used in a lot of multiplayer online role-playing games, certain shooter games, and so forth. Popular examples include _World of Warcraft_, _Tomb Raider_, and _Fortnite_. This category also includes games where the camera is placed just over the player's shoulder.
- Some 3D games offer the ability to change your point of view, such as to look out the various windows of an aircraft in a flight simulator, or to see the views from all the security cameras within the game level (a common feature of spy and stealth-based games). This ability is also used by games offering weapons with scopes, where the view isn't quite based on the head's position in the same way anymore.
- 3D games might also provide the ability for non-players to observe the action, either by positioning an invisible avatar of sorts or by choosing a fixed virtual camera to watch from.
- In advanced 3D games, a camera or camera-like object _could_ be used to determine what a non-player character can see, relying on the same rendering and physics engine used by player characters for non-player characters.
- In single-screen 2D games, the camera is not associated directly with the player or any other character in the game, but is instead either fixed above or next to the game play area, or follows the action as the action moves around a scrolling game world. For example, a classic arcade game such as _Pac-Man_ takes place on a fixed game map, so the camera remains fixed a set distance above the map, always pointed straight down at the game world.
- In a side-scrolling or top-scrolling game such as _Super Mario Bros._, the camera moves along left and right (or up and down, or both) to ensure that the action remains visible even though the game level is much larger than the viewport.

### Positioning the camera

Since there are no standard camera objects in WebGL or WebXR, we need to simulate the camera ourselves. Before we can do so, and before we can then simulate the movement of the camera, let's actually take a look at the virtual camera and how it _can_ move, at the most fundamental level. As in all things, the **position** of an object in space—even if that space if virtual—can be represented using three numbers that indicate its position relative to the origin, whose position is defined to be (0, 0, 0).

There's another aspect of the spatial relationship of an object to the origin in space left to be considered: **perspective**. Perspective, properly applied to the objects in a scene, can take a scene that would otherwise look as flat as a typical 2D screen and make it pop as if it were truly 3D. There are several kinds of perspective; those are defined and their mathematics explained in the article WebGL model view projection. Importantly, the effect of perspective on a vector can be represented by adding a fourth component to the vector: the perspective component, called `w`.

The value of `w` is applied by dividing each of the other three components by it to get the final position or vector; that is, for a coordinate given as (`x`, `y`, `z`, `w`), the point in the 3D space is actually (`x`/`w`, `y`/`w`, `z`/`w`, 1) or (`x`/`w`, `y`/`w`, `z`/`w`). If you're not using perspective, `w` is always 1. In that situation, the complete coordinates for an object located at (1, 0, 3) are (1, 0, 3, 1).

But the location isn't enough to describe an object in 3D space because an object's state in space isn't only about its location, but about its rotation or facing direction, otherwise known as its **orientation**. The orientation can be represented using a 3D vector, which is typically normalized so that its length is 1.0. For example, if the object is facing an object located at (3, 1, -2)—that is, three meters to the right, one meter up, and two meters away from the origin point—the result is:

<math display="block">
  <semantics><mrow><mo>[</mo><mtable rowspacing="0.5ex"><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mo>-</mo><mn>2</mn></mtd></mtr></mtable><mo>]</mo></mrow><annotation encoding="TeX">\left [ \begin{matrix} 3 \\ 1 \\ -2 \end{matrix} \right ]</annotation></semantics>
</math>

This can also be represented as an array:

```js
let directionVector = [3, 1, -2];
```

For the purposes of performing operations involving both the coordinates and the facing direction vector, the vector needs to include the `w` component. The value of `w` is always 0 for vectors, so the aforementioned vector can also be represented using `[3, 1, -2, 0]` or:

<math display="block">
  <semantics><mrow><mo>[</mo><mtable rowspacing="0.5ex"><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mo>-</mo><mn>2</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd></mtr></mtable><mo>]</mo></mrow><annotation encoding="TeX">\left [ \begin{matrix} 3 \\ 1 \\ -2 \\ 0 \end{matrix} \right ]</annotation></semantics>
</math>

WebXR automatically normalizes vectors to have a length of 1 meter; however, you may find that it makes sense to do it yourself for various reasons, such as to improve performance of calculations by not having to repeatedly perform normalization.

Once you've determined the matrix representing the combination of movements you wish the camera to make, you need to reverse it, because you're not moving the camera. Since you're actually moving everything _except_ the camera, take the inverse of the transform matrix to get an inverse transform matrix. This inverse matrix can then be applied to the objects in the world to alter their positions and orientations to simulate the desired camera position.

This is why the `XRRigidTransform` object used by WebXR to represent transforms includes an `inverse` property. The `inverse` property is another `XRRigidTransform` object which is the inverse of the parent transform. Since the `XRView` representing the view has a `transform` property which is an `XRRigidTransform` providing the camera view, you can get the model view matrix—the transform matrix needed to move the world to simulate the desired camera position—like this:

```js
let viewMatrix = view.transform.inverse.matrix;
```

If the library you're using accepts an `XRRigidTransform` object directly, you can instead get `view.transform.inverse`, rather than pulling out just the array representing the view matrix.

### Composing multiple transforms

If your camera needs to be performing multiple transforms simultaneously, such as zooming and panning at the same time, you can multiply the transform matrices together to compose them into a single matrix that applies both changes at once. See Multiplying two matrices in the article Matrix math for the web for a clear but readable function that does this or use your preferred matrix math library such as glMatrix to do the work.

It's crucial to remember that unlike typical arithmetic, where multiplication is commutative (that is, you get the same answer whether you multiply left to right or right to left), matrix multiplication _is not commutative!_ This is because each transform affects the position of the object and possibly the very coordinate system itself, which can dramatically change the results of the next operation performed. So you need to be careful about the order in which you apply your transforms when building your composite transform (or directly applying transforms in sequence).

### Applying the transform

To apply the transform, you multiply the point or vector by the transform or composition of transforms.

This has been a very quick overview of the concepts of position in terms of physical location, orientation or facing direction, and perspective. For more detail on the subject, see the articles Geometry and reference spaces, WebGL model view projection, and Matrix math for the web.
