---
title: "Lighting a WebXR setting (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webxr_device_api/lighting/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Lighting a WebXR setting

Because the WebXR Device API relies on other technologies—namely, WebGL and frameworks based upon it—to perform all rendering, texturing, and lighting of a scene, the same general lighting concepts apply to WebXR settings or scenes as to any other WebGL-generated display.

However, there are issues and details to keep in mind while creating your lighting code, especially for augmented reality (AR) applications. This guide discusses these topics. And while this article provides brief reminders as to how lighting works in general, it is not by any means a tutorial in lighting or a guide to how to create a properly-lit 3D scene.

## Flashback: Simulating lighting in 3D

Although this article isn't a comprehensive guide to lighting a 3D scene, it's useful to provide a brief reminder as to how lighting works in general. Fundamentally, simulating lighting in a virtual scene involves computing how much light from each light source is received by the eye after interacting with and reflecting off of each object in the scene.

### Reflection of light

**Figure: A diagram showing how the angle of reflection corresponds to the angle of incidence.**

Every object we see, we see because the object either emits or reflects light (or both). The incoming light ray—the **incident ray**—arrives at an angle known as the **angle of incidence**. The angle of incidence, Θᵢ, is the angle between the incident ray and the surface's normal vector.

For rough surfaces, light is reflected equally in every direction. However, glossy, mirror-like surfaces reflect most of the light in a direction whose **angle of reflection**, Θᵣ, is equal to the angle of incidence, except it's on the opposite side of the normal vector. The **reflected ray**, then, departs along at that angle off the normal. This is the **law of reflection**. This is the foundation for much of what's involved in shading a scene, and comes into play in terms of how different types of light source behave.

The reflected light ray's color may, of course, be altered in intensity and/or hue due to the light's interaction with the surface, but the angle is always the same.

### Components of a light source

A light source has three major components; each component is in essence a type of light

There are three kinds of light that can affect the color and brightness of objects and their pixels as displayed on the viewer's screen or headset.

#### Ambient light

**Ambient light** is light that doesn't come from a defined source, but is just present throughout the scene. This light reaches every surface in the scene at the same intensity from every direction, and is then reflected equally in every direction. As a result, the effect applied by ambient light is universally equal all through the scene.

**Figure: A sphere with only ambient lighting. Note the total lack of any shading to indicate the depth of the sphere.**

The effect of ambient light is computed by multiplying the intensity of the light source by the reflectance of the surface at the pixel's location. The color and intensity of every pixel in the scene is affected exactly the same way, regardless of where it is in the scene or the direction it's facing. Ambient light is commonly present to prevent shadowed areas from becoming too dark, although it affects the entire scene; however, the amount of ambient light in a scene should be very low.

Because the bouncing and scattering of light can be expensive to compute in real time, especially if multiple light sources are involved, it's common to use ambient lighting to simulate the scattered light caused by all the other light sources in the scene, instead of actually calculating the true effect of light scattering. Care needs to be taken to try to match the ambient light to what would really be the effect of the scene's lighting when doing this, however.

Ambient light can also be used to apply a color tint to a scene; for example, in a game in which the player has a special pair of yellow-tinted glasses, you can add a yellow ambient light.

#### Diffuse light

**Diffuse light** is light which is evenly and directionally emitted from or reflected off a surface. This is the majority of the light we usually see. Diffuse light comes from a particular position or direction and casts shadows. Due to its directionality, the faces of an object facing a diffuse light source will be brighter than the other faces.

**Figure: Saturn's fifth-largest moon, Tethys, bathed in sunlight, coming from the lower left.**

Because the intensity of diffuse light depends on the angle of incidence (the angle between the vector representing the direction from which the light reaches the surface and the surface's normal vector or the vector perpendicular to the surface), the intensity or brightness of the light reflected by an object varies depending on the surface's orientation relative to the light source.

#### Specular light

**Specular light** is the light that makes up the highlights on reflective objects, such as gems, eyes, shiny cups and plates, and the like. Specular lights tend to appear as bright spots or squares on a surface at the point where a light source strikes the surface most directly.

**Figure: A photo taken by NASA's Cassini spacecraft showing specular reflection of light from a lake of liquid methane on the surface of Saturn's moon Titan.**

Every light source is represented by some combination of ambient, diffuse, and/or specular light. The WebGL shader program takes the color, directionality, brightness, and other factors for each light source and computes the final color of each pixel.

### Types of light source

There are four fundamental types of light source. Each one involves a source of virtual light whose distance from the object being drawn and the directionality of the light waves cause the light source to take on specific characteristics. For the most part, any real-world light source can be simulated using one or more of these light source types.

#### Ambient light sources

An **ambient light source** is a light source describing the level and color of ambient light in a scene. While there may be more than one of these in a scene, you can probably slightly improve performance by combining them into one on your own, since each one will always affect every pixel evenly anyway.

Ambient light sources generally don't correspond to any object within the scene, and have no real-world analogues, either.

#### Directional light sources

A **directional light source** is a light source that comes from a specific direction, but not from a specific source, so its emitted light rays are parallel to one another. In addition, the intensity of the light doesn't change over distance. This means that shadows cast by directional lights are very sharp, with an essentially instant transition between lighted and shadowed.

**Figure: Earth and moon both half-lit by the sun's directional lighting.**

The most common example of a directional light is the sun. While the sun is in actuality a single (large) object, it's very far away, so the rays of light coming from it are essentially parallel. While sunlight does actually fall off in intensity with distance, the rate of change is very low and is only noticed over vast distances, so the rate of intensity change of sunlight doesn't typically matter for rendering a 3D scene.

#### Point light sources

A **point light source** is a light source located at a specific location, radiating outward equally in every direction. Light bulbs, candles, and the like are examples of point light sources. The closer an object is to a point light source, the brighter the light it casts onto that object. The rate at which the brightness of a point light falls off is called **attenuation**, and is a configurable feature of the light source in WebGL and other lighting systems.

Between the law of reflection and the fact that the brightness of the light rays decreases with distance, the light emitted by a point source and reflected back tends to be brightest at the closest point to the light source and dimmer the farther away it is. Even if the surface is flat, the closest point to the light source is the center, with rays becoming increasingly long as the angle away from the normal changes.

#### Spot light sources

A **spot light source** (or **spotlight**) is a light source which is located at a specific position, emitting a cone of light in the direction of its orientation vector. A tapering rate parameter defines how quickly the brightness of the light falls off at the edges of the cone of light, and, as with point lights, an attenuation parameter controls how the light fades over distance.

**Figure: Photo of a spotlight shining upon a stucco wall at night.**

At the edge of the light cone, the light ceases to affect the surface at all.

#### Computational costs of lighting

To be visible, a scene must include lighting of some sort, so all or nearly all scenes will have at least one light source and may have a great many of them. Each light source substantially increases the amount of calculation needed to determine the final color and brightness of each displayed pixel. Performing the shading for each of these light source types is more computationally demanding than the one before it; so ambient light is the least expensive to apply, followed by directional light sources, point lights, and finally spotlights.

Additionally, the more accurate the lighting is designed to be, the more computationally expensive it becomes. Increased shadow detail, volumetric light (that is, lighting that you can see in the air, such as sunbeams or the beams of spotlights in the sky), and other lighting effects can add realism and beauty to your scene, but caution needs to be taken to ensure the scene doesn't overwhelm the GPU.

### Computing the color of a lighted pixel

Although some graphics libraries include support for light source objects and automatically calculate and apply lighting effect for you, WebGL does not. Fortunately, lighting isn't overly difficult to apply in your own vertex and fragment shaders.

For each polygon in the scene, the **vertex shader** program determines the vertices' colors, and then the **fragment shader** generates each pixel in the polygon by combining the appropriate texel from the assigned texture, any color tint or effect, and other visual data. It is at this time that the scene's lighting is considered and applied as appropriate to the pixel before the pixel is stored into the framebuffer.

The color of each pixel in the final, rendered, scene is calculated using some intricate math that factors in things like:

- The color of the **texture element** (the pixel within the texture mapped onto the object; also known as a **texel**) corresponding to the screen pixel, given the object geometry, the viewer position and orientation relative to each polygon, and so forth.
- The viewer position and distance.
- The surface material and reflectivity.
- The concavity or convexity of the surface at the target location.
- The position, color, directionality, and brightness of each light source in the scene.
- The color and brightness of any ambient light in the scene; this is light which is applied equally throughout the scene, with no source and thus no shadows or variation in brightness.
- The effect of light reflected off of other surfaces within the scene; the color, directionality, and brightness of reflected light will affect the color of the pixels the light touches.

You can learn more about how to perform lighting in WebGL in the article Lighting in WebGL.
