---
title: "EXT_frag_depth extension"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ext_frag_depth/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EXT_frag_depth extension

The **`EXT_frag_depth`** extension is part of the WebGL API and enables you to set a depth value of a fragment from within the fragment shader.

WebGL extensions are available using the `WebGLRenderingContext.getExtension()` method.
For more information, see Using WebGL extensions.

> **Note:**
> This extension is only available to `WebGL1` contexts. In `WebGL2`, the functionality of this extension is available on the WebGL2 context by default. It requires GLSL `#version 300 es`.

## Examples

Enable the extension:

```js
gl.getExtension("EXT_frag_depth");
```

Now the output variable `gl_FragDepthEXT` is available to set a depth value of a fragment from within the fragment shader:

```html
<script type="x-shader/x-fragment">
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
    gl_FragDepthEXT = 0.5;
  }
</script>
```

## See also

- `WebGLRenderingContext.getExtension()`
