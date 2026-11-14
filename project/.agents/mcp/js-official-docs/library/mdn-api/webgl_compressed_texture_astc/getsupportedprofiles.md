---
title: "WEBGL_compressed_texture_astc: getSupportedProfiles() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_compressed_texture_astc/getsupportedprofiles/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WEBGL_compressed_texture_astc: getSupportedProfiles() method

The **`WEBGL_compressed_texture_astc.getSupportedProfiles()`**
method returns an array of strings containing the names of the ASTC profiles supported
by the implementation.

## Syntax

```js
getSupportedProfiles()
```

### Parameters

None.

### Return value

An `Array` of string elements indicating which ASTC
profiles are supported by the implementation. Currently, this can be:

- "ldr": Low Dynamic Range.
- "hdr": High Dynamic Range.

Dynamic range refers to ratio between the brightest and darkest parts of the scene. Low
dynamic ranges are for example JPEG format images which won't exceed 255:1, or CRT
monitors which won't exceed 100:1. An HDR image stores pixel values that span the whole
tonal range of real-world scenes (100,000:1).

## Examples

```js
const ext = gl.getExtension("WEBGL_compressed_texture_astc");
ext.getSupportedProfiles(); // ["ldr"]
```

## See also

- `WEBGL_compressed_texture_astc`
