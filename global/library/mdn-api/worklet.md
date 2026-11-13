---
title: "Worklet"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/worklet/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Worklet

The **`Worklet`** interface is a lightweight version of Web Workers and gives developers access to low-level parts of the rendering pipeline.

With Worklets, you can run JavaScript and WebAssembly code to do graphics rendering or audio processing where high performance is required.

Worklets allow static import of ECMAScript modules, if supported, using `import`.
Dynamic import is disallowed by the specification — calling `import()` will throw.

## Worklet types

Worklets are restricted to specific use cases; they cannot be used for arbitrary computations like Web Workers. The `Worklet` interface abstracts properties and methods common to all kind of worklets, and cannot be created directly. Instead, you can use one of the following classes:

       | Name
       | Description
       | Location
       | Specification

       | `AudioWorklet`
       | For audio processing with custom AudioNodes.
       | Web Audio render thread
       |
        Web Audio API

       | `AnimationWorklet`
       |
        For creating scroll-linked and other high performance procedural
        animations.

       | Compositor thread
       |
        CSS Animation Worklet API

       | `LayoutWorklet`
       | For defining the positioning and dimensions of custom elements.
       |
       |
        CSS Layout API

       | `SharedStorageWorklet`
       | For running private operations on cross-site data, without risk of data leakage.
       | Main thread
       |
        Shared Storage API

> **Note:**
> Paint worklets, defined by the CSS Painting API, don't subclass `Worklet`. They are accessed through a regular `Worklet` object obtained using `CSS.paintWorklet`.

For 3D rendering with WebGL, you don't use worklets. Instead, you write vertex shaders and fragment shaders using GLSL code, and those shaders will then run on the graphics card.

## Instance properties

_The Worklet interface does not define any properties._

## Instance methods

- `Worklet.addModule()`
    Adds the script module at the given URL to the current worklet.

## See also

- Houdini: Demystifying CSS on Google Developers (2016)
- AudioWorklet :: What, Why, and How on YouTube (2017)
- Enter AudioWorklet on Google Developers (2017)
- Animation Worklet - HTTP203 Advent on YouTube (2017)
