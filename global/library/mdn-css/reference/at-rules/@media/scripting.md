---
title: "`scripting` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/scripting/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `scripting` CSS media feature

The **`scripting`** CSS media feature can be used to test whether scripting (such as JavaScript) is available.

> **Note:**
> The detection is done by the browsers based on the user settings. Some browser extensions can implement script blocking using different techniques. In such cases the `scripting` media feature may not work as expected.

## Syntax

The `scripting` feature is specified as a keyword value chosen from the list below.

- `none`
    Scripting is completely unavailable on the current document.
- `initial-only`
    Scripting is enabled during the initial page load, but not afterwards.
- `enabled`
    Scripting is supported and active on the current document.

## Examples

### HTML

```html
<p class="script-none">You do not have scripting available. :-(</p>
<p class="script-initial-only">
  Your scripting is only enabled during the initial page load. Weird.
</p>
<p class="script-enabled">You have scripting enabled! :-)</p>
```

### CSS

```css
p {
  color: lightgray;
}

@media (scripting: none) {
  .script-none {
    color: red;
  }
}

@media (scripting: initial-only) {
  .script-initial-only {
    color: red;
  }
}

@media (scripting: enabled) {
  .script-enabled {
    color: red;
  }
}
```

## See also

- @media
- Using media queries
