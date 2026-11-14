---
title: "WebGL model view projection (part 1 of 8)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_api/webgl_model_view_projection/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL model view projection

This article explores how to take data within a WebGL project, and project it into the proper spaces to display it on the screen. It assumes a knowledge of basic <example-value> math using translation, scale, and rotation matrices. It explains the three core matrices that are typically used when composing a 3D scene: the model, view and projection matrices.

## The model, view, and projection matrices

Individual transformations of points and polygons in space in WebGL are handled by the basic <example-value> matrices like translation, scale, and rotation. These matrices can be composed together and grouped in special ways to make them useful for rendering complicated 3D scenes. These composed matrices ultimately move the original model data around into a special coordinate space called **clip space**. This is a 2 unit wide cube, centered at (0,0,0), and with corners that range from (-1,-1,-1) to (1,1,1). This clip space is compressed down into a 2D space and rasterized into an image.

The first matrix discussed below is the **model matrix**, which defines how you take your original model data and move it around in 3D world space. The **projection matrix** is used to convert world space coordinates into clip space coordinates. A commonly used projection matrix, the **perspective projection matrix**, is used to mimic the _effects_ of a typical camera serving as the stand-in for the viewer in the 3D virtual world. The **view matrix** is responsible for moving the objects in the scene to simulate the position of the camera being changed, altering what the viewer is currently able to see.

The sections below offer an in-depth look into the ideas behind and implementation of the model, view, and projection matrices. These matrices are core to moving data around on the screen, and are concepts that transcend individual frameworks and engines.
