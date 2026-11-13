---
title: "WebGL tutorial"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_api/tutorial/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL tutorial

This tutorial describes how to use the `<canvas>` element to draw WebGL graphics, starting with the basics. The examples provided should give you some clear ideas of what you can do with WebGL and will provide code snippets that may get you started in building your own content.

WebGL enables web content to use an API based on OpenGL ES 2.0 to perform 3D rendering in an HTML `<canvas>` in browsers that support it without the use of plug-ins. WebGL programs consist of control code written in JavaScript and special effects code (shader code) that is executed on a computer's Graphics Processing Unit (GPU). WebGL elements can be mixed with other HTML elements and composited with other parts of the page or page background.

## Before you start

Using the `<canvas>` element is not very difficult, but you do need a basic <example-value> of HTML and JavaScript. The `<canvas>` element and WebGL are not supported in some older browsers, but are supported in recent versions of all major browsers. In order to draw graphics on the canvas we use a JavaScript context object, which creates graphics on the fly.

## In this tutorial

- Getting started with WebGL
    How to set up a WebGL context.
- Adding 2D content to a WebGL context
    How to render simple flat shapes using WebGL.
- Using shaders to apply color in WebGL
    Demonstrates how to add color to shapes using shaders.
- Animating objects with WebGL
    Shows how to rotate and translate objects to create simple animations.
- Creating 3D objects using WebGL
    Shows how to create and animate a 3D object (in this case, a cube).
- Using textures in WebGL
    Demonstrates how to map textures onto the faces of an object.
- Lighting in WebGL
    How to simulate lighting effects in your WebGL context.
- Animating textures in WebGL
    Shows how to animate textures; in this case, by mapping an Ogg video onto the faces of a rotating cube.
