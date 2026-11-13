---
title: "WebGL by example"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_api/by_example/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL by example

_WebGL by example_ is a series of live samples with short explanations that showcase WebGL concepts and capabilities.

The examples are sorted according to topic and level of difficulty, covering the WebGL rendering context, shader programming, textures, geometry, user interaction, and more.

## Examples by topic

The examples are sorted in order of increasing difficulty. But rather than just presenting them in a single long list, they are additionally divided into topics. Sometimes we revisit a topic several times, such as when needing to discuss it initially at a basic level, and later at intermediate and advanced levels.

Instead of trying to juggle shaders, geometry, and working with GPU memory, already in the first program, the examples here explore WebGL in an incremental way. We believe that it leads to a more effective learning experience and ultimately a deeper understanding of the underlying concepts.

Explanations about the examples are found in both the main text and in comments within the code. You should read all comments, because more advanced examples could not repeat comments about parts of the code that were previously explained.

### Getting to know the rendering context

- Detect WebGL
    This example demonstrates how to detect a WebGL rendering context and reports the result to the user.
- Clearing with colors
    How to clear the rendering context with a solid color.
- Clearing by clicking
    How to combine user interaction with graphics operations. Clearing the rendering context with a random color when the user clicks.
- Simple color animation
    A very basic color animation, done by clearing the WebGL drawing buffer with a different random color every second.
- Color masking
    Modifying random colors by applying color masking and thus limiting the range of displayed colors to specific shades.
- Basic <example-value>
    How to draw rectangles and squares with scissoring operations.
- Canvas size and WebGL
    The example explores the effect of setting (or not setting) the canvas size to its element size in CSS pixels, as it appears in the browser window.
- Boilerplate 1
    The example describes repeated pieces of code that will be hidden from now on, as well as defining a JavaScript utility function to make WebGL initialization easier.
- Scissor animation
    Some animation fun with scissoring and clearing operations.
- Raining rectangles
    A game that demonstrates clearing with solid colors, scissoring, animation, and user interaction.

### Shader programming basics

- Hello GLSL
    A very basic <example-value> program that draws a solid color square.
- Hello vertex attributes
    Combining shader programming and user interaction through vertex attributes.
- Textures from code
    A demonstration of procedural texturing with fragment shaders.

### Miscellaneous advanced examples

- Video textures
    This example demonstrates how to use video files as textures.
