---
title: "WebGL best practices (part 1 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_api/webgl_best_practices/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGL best practices

WebGL is a complicated API, and it's often not obvious what the recommended ways to use it are. This page tackles recommendations across the spectrum of expertise, and not only highlights dos and don'ts, but also details _why_. You can rely on this document to guide your choice of approach, and ensure you're on the right track no matter what browser or hardware your users run.

## Address and eliminate WebGL errors

Your application should run without generating any WebGL errors (as returned by `getError`). Every WebGL error is reported in the Web Console as a JavaScript warning with a descriptive message. After too many errors (32 in Firefox), WebGL stops generating descriptive messages, which really hinders debugging.

The _only_ errors a well-formed page generates are `OUT_OF_MEMORY` and `CONTEXT_LOST_WEBGL`.

## Optimize memory

### Budget VRAM conservatively

WebGL doesn't offer APIs to query the maximum amount of video memory on the system because such queries are not portable. Still, applications must be conscious of VRAM usage and not just allocate as much as possible.

Some common practices:

- Estimate the current VRAM usage, such as how many buffers are allocated.
- Handle `webglcontextlost` events, which can be emitted when the GPU runs out of memory, among other reasons.
- Offer different graphics quality settings, so the user can opt into lower quality when resources are constrained.

### Delete objects eagerly

Don't wait for the garbage collector/cycle collector to realize objects are orphaned and destroy them. Implementations track the liveness of objects, so 'deleting' them at the API level only releases the handle that refers to the actual object. (conceptually releasing the handle's ref-pointer to the object) Only once the object is unused in the implementation is it actually freed. For example, if you never want to access your shader objects directly again, just delete their handles after attaching them to a program object.

### Lose contexts eagerly

Consider also eagerly losing WebGL contexts via the `WEBGL_lose_context` extension when you're definitely done with them and no longer need the target canvas's rendering results. Note that this is not necessary to do when navigating away from a page - don't add an unload event handler just for this purpose.

### Consider compressed texture formats

While JPG and PNG are generally smaller over-the-wire, GPU compressed texture formats are smaller in GPU memory, and are faster to sample from. (This reduces texture memory bandwidth, which is precious on mobile.) However, compressed texture formats have worse quality than JPG, and are generally only acceptable for colors (not e.g., normals or coordinates).

Unfortunately, there's no single universally supported format. Every system has at least one of the following though:

- `WEBGL_compressed_texture_s3tc` (desktop)
- `WEBGL_compressed_texture_etc1` (Android)
- `WEBGL_compressed_texture_pvrtc` (iOS)

WebGL 2 has universal support by combining:

- `WEBGL_compressed_texture_s3tc` (desktop)
- `WEBGL_compressed_texture_etc` (mobile)

The newer `WEBGL_compressed_texture_astc` has both higher quality and/or higher compression.

#### Basis Universal texture compression format/library

Basis Universal solves several of the issues mentioned above. It offers a way to support all common compressed texture formats with a single compressed texture file, through a JavaScript library that efficiently converts formats at load time. It also adds additional compression that makes Basis Universal compressed texture files much smaller than regular compressed textures over-the-wire, more comparable to JPEG.

### Memory usage of depth and stencil formats

Depth and stencil attachments and formats are actually inseparable on many devices. You may ask for `DEPTH_COMPONENT24` or `STENCIL_INDEX8`, but you're often getting D24X8 and X24S8 32bpp formats behind the scenes. Assume that the memory usage of depth and stencil formats is rounded up to the nearest four bytes.

This means that a smaller format doesn't necessarily save memory: for example, `DEPTH_COMPONENT16` may be stored as a 32-bit format, so it may use no less memory than `DEPTH_COMPONENT24`. Conversely, adding a stencil buffer may increase memory usage on some platforms, such as Apple GPUs, where a 24-bit depth format can be stored as 32-bit float depth and a depth-stencil format as 32-bit float depth plus 8-bit stencil. Only request a stencil buffer (with the `stencil: true` context attribute, or a depth-stencil attachment) if you use it.

### Use texStorage to create textures

The WebGL 2.0 `texImage*` API lets you define each mip level independently and at any size, even mismatching mip sizes that make the texture incomplete for sampling. The driver can allocate storage before the texture is drawn, but may defer some work until then.

Further, some drivers might unconditionally allocate the whole mip-chain (+33% memory for square textures!) even if you only want a single level.

Prefer `texStorage` in WebGL 2 to allocate the texture's format, dimensions, and mip levels up front, then upload its contents with `texSubImage`. This avoids redefining texture storage on subsequent uploads and lets you allocate only the mip levels you need. However, image and video uploads through `texSubImage` can be slower than `texImage`, so benchmark those uploads before switching.
