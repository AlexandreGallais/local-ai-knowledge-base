---
title: "Lighting a WebXR setting (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webxr_device_api/lighting/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Lighting a WebXR setting (part 2 of 2)

## Lighting issues for mixed reality content

In addition to the usual issues that you need to contend with while lighting a scene, the VR or AR use case adds additional areas of concern when writing your shaders. In this section, we provide some basic mixed reality lighting guidelines to consider as you construct, render, and light your scene. While some of these are also useful in any other 3D setting, most are specific to virtual reality and, in some cases even more so, to augmented reality.

Since your scene is intended to represent a setting a person or their avatar can exist within, you should try to achieve some degree of consistency and realism in terms of the positioning and presentation of your light sources. Obviously, there are exceptions to this guideline, such as when your scene represents an otherworldly or alien setting, or when your goal is to create an unsettling visual effect.

### Realism in light source placement

When possible, you should try to make your virtual light sources correspond to objects that actually exists. If you have a virtual room that needs overhead lighting, have a model of a ceiling lamp at the location of your light source. There are exceptions, such as the ambient lighting that adds a baseline amount of lighting to your setting, and the sun, which is a directional light (that is, a light source where every light ray is parallel, coming from somewhere in the sky and ending somewhere within your scene).

Try to place light sources in realistic locations for the setting and the mood you're trying to create. A scene intended to feel like a naturally-lit, real-world setting doesn't have studio lighting. It has sunlight, possibly light reflected off of objects or water within the scene, and so forth, but not lamps directed at the faces of objects or people in the scene.

### Realism in player interactions with light

If your light source is located within the scene, you probably should try to ensure the viewer's avatar can't physically intersect with the light source. The results could be strange.

If the viewer's avatar is meant to have physical form, it should have a model, even if the viewer can never see it, so that light interacts with the avatar correctly. Minimally, this means the avatar should cast an appropriate shadow; however, depending on factors such as whether or not the avatar can be seen and the materials, texturing, and other attributes of the its model—including, especially, its reflectivity—the avatar may also need to reflect light, as well as potentially affect the coloration of the light reflected off of it.

### Realism in augmented reality

Augmented reality introduces an additional level of complexity to lighting your objects, since your virtual objects need to exist within a physical world that has its own light sources. As such, you should try to match your lighting to the real world's light sources as much as possible. This is done using a technique known as Lighting estimation.

Conversely, you should try to avoid having virtual objects that are themselves light sources, unless you're prepared to create code that can cast that lighting onto the real world setting. Casting light onto real-world objects is essentially the opposite of casting shadows. It can be done, but is not as widely implemented.

## Lighting estimation

**Lighting estimation** is a technique used by augmented reality platforms to attempt to match the lighting of the virtual objects in the scene to the lighting of the real world surrounding the viewer. This involves the collection of data that may come from various sensors (including the accelerometer and compass, if available), cameras, and potentially others. Other data is collected using the Geolocation API, and then all this data is put through algorithms and machine learning engines to generate the estimated lighting information.

At present, WebXR doesn't offer support for lighting estimation. However, a specification is currently being drafted under the auspices of the W3C. You can learn all about the proposed API and a fair amount about the concept of lighting estimation in the explainer document that's included in the specification's GitHub repository.

In essence, lighting estimation collects this information about the light sources and the shape and orientation of the objects in the scene, along with information about the materials they're made of, then returns data you can use to create virtual light source objects that approximately match the real world's lighting.

The specifics of how lighting estimation works, especially in the context of the proposed API, is out of scope for the moment. Once the API has stabilized, we'll update this documentation with the details.

## Security and privacy concerns

There are a number of potential security issues involved with collecting all of this data in order to generate and apply lighting to your virtual objects using real-world data.

Of course, many AR applications make it pretty clear where the user is located. If the user is running an app called _Touring the Louvre_, there's a very good chance the user is located in the Musée du Louvre in Paris, France. But browsers are required to take a number of steps to make it difficult to physically locate the user without their consent.

### Ambient Light Sensor API

The collection of light data using the Ambient Light Sensor API introduces various potential privacy issues.

- Lighting information can leak to the web information about the user's surroundings and device usage patterns. Such information can be used to enhance user profiling and behavior analysis data.
- If two or more devices access content that uses the same third-party script, that script can be used to correlate lighting information and how it changes over time to attempt to determine a spatial relationship between the devices; this could in theory indicate that the devices are in the same general area, for example.

### How browsers mitigate these issues

In order to help mitigate these risks, browsers are required by the WebXR Lighting Estimation API specification to report lighting information that is fudged somewhat from the true value. There are many ways this could be done.

#### Spherical harmonics precision

Browsers can mitigate the risk of fingerprinting by reducing the precision of spherical harmonics. When performing real-time rendering—as is the case with any virtual or augmented reality application—spherical harmonic lighting is used to simplify and accelerate the process of generating highly realistic shadows and shading. By altering the accuracy of these functions, the browser makes the data less consistent, and, importantly, makes the data generated by two computers differ, even in the same setting.

#### Decoupling orientation from lighting

In an AR application that uses geolocation to determine orientation and potentially position information, avoiding having that information directly correlate to the state of the lighting is another way browsers can protect users from fingerprinting attacks. By ensuring that the compass <example-value> and the light directionality aren't identical on every device that's near (or claims to be near) the user's location, the ability to find users based on the state of the lighting around them is removed.

When the browser provides details about a very bright, directional light source, that source probably represents the sun. The directionality of this bright light source combined with the time of day can be used to determine the user's geographic location without involving the Geolocation API. By ensuring that the coordinates of the AR scene don't align with compass <example-value>, and by reducing the precision of the sun's light angle, the location can no longer be accurately estimated using this technique.

#### Temporal and spatial filtering

Consider an attack that uses a building's automated lighting system to flash the lights on and off quickly in a known pattern. Without proper precautions, the lighting estimation data could be used to detect this pattern and thus determine that a user is in a particular location. This could be done remotely, or it could be performed by an attacker who's located in the same room but wants to determine if the other person is also in the same room.

Another scenario in which lighting estimation can be used to obtain information about the user without permission: if the light sensor is close enough to the user's display to detect lighting changes caused by the contents of the display, an algorithm could be used to determine whether or not the user is watching a particular video—or even to potentially identify which of a number of videos the user is watching.

The Lighting Estimation API specification mandates that all user agents perform temporal and spatial filtering to fuzz the data in a manner that reduces its usefulness for the purpose of locating the user or performing side-channel attacks.

## See also

- WebXR Lighting Estimation API explainer
- WebXR Lighting Estimation API Level 1 specification
- Using shaders to apply color in WebGL
- Using textures in WebGL
- Lighting in WebGL
- GLSL Shaders
