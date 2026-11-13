---
title: "KeyboardEvent: keyCode property (part 8 of 8)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboardevent/keycode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# KeyboardEvent: keyCode property (part 8 of 8)

| `DOM_VK_WIN_OEM_FINISH`
       | 0xF1 (241)
       |
        An
        OEM specific key on Windows.
        This was used for Nokia/Ericsson's device.

       | `DOM_VK_WIN_OEM_COPY`
       | 0xF2 (242)
       |
        An
        OEM specific key on Windows.
        This was used for Nokia/Ericsson's device.

       | `DOM_VK_WIN_OEM_AUTO`
       | 0xF3 (243)
       |
        An
        OEM specific key on Windows.
        This was used for Nokia/Ericsson's device.

       | `DOM_VK_WIN_OEM_ENLW`
       | 0xF4 (244)
       |
        An
        OEM specific key on Windows.
        This was used for Nokia/Ericsson's device.

       | `DOM_VK_WIN_OEM_BACKTAB`
       | 0xF5 (245)
       |
        An
        OEM specific key on Windows.
        This was used for Nokia/Ericsson's device.

       | `DOM_VK_ATTN`
       | 0xF6 (246)
       | Attn (Attention) key of IBM midrange computers, e.g., AS/400.

       | `DOM_VK_CRSEL`
       | 0xF7 (247)
       | CrSel (Cursor Selection) key of IBM 3270 keyboard layout.

       | `DOM_VK_EXSEL`
       | 0xF8 (248)
       | ExSel (Extend Selection) key of IBM 3270 keyboard layout.

       | `DOM_VK_EREOF`
       | 0xF9 (249)
       | Erase EOF key of IBM 3270 keyboard layout.

       | `DOM_VK_PLAY`
       | 0xFA (250)
       | Play key of IBM 3270 keyboard layout.

       | `DOM_VK_ZOOM`
       | 0xFB (251)
       | Zoom key.

       | `DOM_VK_PA1`
       | 0xFD (253)
       | PA1 key of IBM 3270 keyboard layout.

       | `DOM_VK_WIN_OEM_CLEAR`
       | 0xFE (254)
       |
        Clear key, but we're not sure the meaning difference from
        `DOM_VK_CLEAR`.

## Examples

```js
window.addEventListener("keydown", (event) => {
  if (event.defaultPrevented) {
    return; // Should do nothing if the default action has been canceled
  }

  let handled = false;
  if (event.key !== undefined) {
    // Handle the event with KeyboardEvent.key
    handled = true;
  } else if (event.keyCode !== undefined) {
    // Handle the event with KeyboardEvent.keyCode
    handled = true;
  }

  if (handled) {
    // Suppress "double action" if event handled
    event.preventDefault();
  }
});
```

## Browser compatibility

### OEM specific keys on Windows

On Windows, some values of virtual keycode are defined (reserved) for OEM specific key. They are available for special keys on non-standard keyboard. In other words, some values are used for different meaning by two or more vendors (or hardware).

Starting Gecko 21 (and older than 15), OEM specific key <example-value> are available on the keyCode attribute only on Windows. So they are not useful for usual web applications. They are useful only for intranet applications or in similar situations.

See "Manufacturer-specific Virtual-Key Codes (Windows CE 5.0)" in MSDN for the detail.
