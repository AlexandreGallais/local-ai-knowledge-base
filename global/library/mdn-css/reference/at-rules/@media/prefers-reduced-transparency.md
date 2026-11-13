---
title: "`prefers-reduced-transparency` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/prefers-reduced-transparency/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `prefers-reduced-transparency` CSS media feature

The **`prefers-reduced-transparency`** CSS media feature is used to detect if a user has enabled a setting on their device to reduce the transparent or translucent layer effects used on the device. Switching on such a setting can help improve contrast and readability for some users.

## Syntax

- `no-preference`
    Indicates that a user has made no preference known on the device. This keyword value evaluates as false in the boolean context.
- `reduce`
    Indicates that a user has enabled the setting on their device to minimize the amount of transparent or translucent layer effects.

## User preferences

Various operating systems provide a preference for reducing transparency, and user agents are likely to rely on these system settings.
They may also rely on less explicit signals on platforms which don't offer a specific setting.

- In Windows 10/11: Settings > Personalization > Colors > Transparency effects.
- In macOS: System Settings > Accessibility > Display > Reduce transparency.
- In iOS: Settings > Accessibility > Display & Text Size > Reduce Transparency.

## Examples

This example has a translucent box by default. If the setting to reduce transparency is enabled in the accessibility preferences on your device, the translucent box becomes more opaque.

### HTML

```html
<div class="translucent">translucent box</div>
```

### CSS

```css
.translucent {
  opacity: 0.4;
}

@media (prefers-reduced-transparency) {
  .translucent {
    opacity: 0.8;
  }
}
```

## See also

- CSS prefers-reduced-motion media query
- Using media queries
