---
title: "KeyboardEvent: keyCode property (part 3 of 8)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboardevent/keycode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# KeyboardEvent: keyCode property (part 3 of 8)

### Printable keys in standard position

The value of key <example-value> which are caused by pressing or releasing printable keys in standard position is not compatible between browsers.

IE just exposes the native virtual keycode value as `KeyboardEvent.keyCode`.

Google Chrome, Chromium and Safari must decide the value from the input character. If the inputting character can be inputted with the US keyboard layout, they use the `keyCode` value on the US keyboard layout.

Firefox gets `keyCode` values from ASCII characters inputtable by the key — even with shift modifiers or an ASCII capable keyboard layout. See the following rules for details:

1. If the system is Windows and the native keycode of the pressed key <example-value> that the key is a-z or 0-9, use a keycode for it.
2. If the system is Mac and the native keycode of the pressed key <example-value> that the key is 0-9, use a keycode for it.
3. If the pressed key <example-value> an ASCII alphabetic or numeric character with no modifier key, use a keycode for it.
4. If the pressed key <example-value> an ASCII alphabetic or numeric character with a Shift key <example-value>, use a keycode for it.
5. If the pressed key <example-value> a different ASCII character with no modifier key, use a keycode for it.
6. If the pressed key <example-value> a different ASCII character with a Shift key <example-value>, use a keycode for it.
7. Otherwise, i.e., pressed key <example-value> a unicode character:
   1. If the keyboard layout is ASCII-capable (i.e., can input ASCII alphabets), use 0 or compute with the following additional rules.
   2. Otherwise, i.e., the keyboard layout isn't ASCII capable, use the ASCII capable keyboard layout installed on the environment with the highest priority:
      1. If the pressed key on the alternative keyboard layout inputs an ASCII alphabetic or numeric character, use a keycode for it.
      2. Otherwise, use 0 or compute with the following additional rules.

Gecko sets `keyCode` values of punctuation keys as far as possible (when points 7.1 or 7.2 in the above list are reached) with the following rules:

> **Warning:**
> The purpose of these new additional rules is for making users whose keyboard layouts map unicode characters to punctuation keys in a US keyboard layout can use web applications which support Firefox only with ASCII-capable keyboard layouts or just with a US keyboard layout. Otherwise, the newly mapped `keyCode` values may be conflict with other keys. For example, if the active keyboard layout is Russian, the `keyCode` value of **both** the `"Period"` key and `"Slash"` key are `190` (`KeyEvent.DOM_VK_PERIOD`). If you need to distinguish those keys but you don't want to support all keyboard layouts in the world by yourself, you should probably use `KeyboardEvent.code`.

1. If running macOS or Linux:
   1. If the active keyboard layout is not ASCII-capable and an alternative ASCII-capable keyboard layout is available.
      1. If the alternative ASCII-capable keyboard layout produces an ASCII character via just the unmodified key, use a `keyCode` for the character.
      2. If the alternative ASCII-capable keyboard layout produces an ASCII character with a Shift key <example-value>, use a `keyCode` for the shifted character.
      3. Otherwise, use a `keyCode` for an ASCII character produced by the key when the US keyboard layout is active.

   2. Otherwise, use a `keyCode` for an ASCII character produced by the key when the US keyboard layout is active.

2. If running on Windows:
   1. Use a `keyCode` value for an ASCII character produced by a key which is mapped to the same virtual keycode of Windows when the US keyboard layout is active.

    keyCode values of each browser's keydown event caused by printable keys in
    standard position

       | `KeyboardEvent.code`
       | IE 11
       | Google Chrome 34
       | Chromium 34
       | Safari 7
       | Gecko 29

       |
       | Windows
       | Windows
       | Mac (10.9)
       | Linux (Ubuntu 14.04)
       | Mac (10.9)
       | Windows
       | Mac (10.9)
       | Linux (Ubuntu 14.04)

       |
       | US
       | Japanese
       | Greek
       | US
       | Japanese
       | Greek
       | US
       | Japanese
       | Greek
       | US
       | Japanese
       | Greek
       | US
       | Japanese
       | Greek
       | US
       | Japanese
       | Greek
       | US
       | Japanese
       | Greek
       | US
       | Japanese
       | Greek

       | `"Digit1"`
       | `0x31 (49)`
       | `0x31 (49)`
       | `0x31 (49)`
       | `0x31 (49)`
       | `0x31 (49)`
       | `0x31 (49)`
       | `0x31 (49)`
       | `0x31 (49)`

       | `"Digit2"`
       | `0x32 (50)`
       | `0x32 (50)`
       | `0x32 (50)`
       | `0x32 (50)`
       | `0x32 (50)`
       | `0x32 (50)`
       | `0x32 (50)`
       | `0x32 (50)`

       | `"Digit3"`
       | `0x33 (51)`
       | `0x33 (51)`
       | `0x33 (51)`
       | `0x33 (51)`
       | `0x33 (51)`
       | `0x33 (51)`
       | `0x33 (51)`
       | `0x33 (51)`

       | `"Digit4"`
       | `0x34 (52)`
       | `0x34 (52)`
       | `0x34 (52)`
       | `0x34 (52)`
       | `0x34 (52)`
       | `0x34 (52)`
       | `0x34 (52)`
       | `0x34 (52)`

       | `"Digit5"`
       | `0x35 (53)`
       | `0x35 (53)`
       | `0x35 (53)`
       | `0x35 (53)`
       | `0x35 (53)`
       | `0x35 (53)`
       | `0x35 (53)`
       | `0x35 (53)`

       | `"Digit6"`
       | `0x36 (54)`
       | `0x36 (54)`
       | `0x36 (54)`
       | `0x36 (54)`
       | `0x36 (54)`
       | `0x36 (54)`
       | `0x36 (54)`
       | `0x36 (54)`

       | `"Digit7"`
       | `0x37 (55)`
       | `0x37 (55)`
       | `0x37 (55)`
       | `0x37 (55)`
       | `0x37 (55)`
       | `0x37 (55)`
       | `0x37 (55)`
       | `0x37 (55)`

       | `"Digit8"`
       | `0x38 (56)`
       | `0x38 (56)`
       | `0x38 (56)`
       | `0x38 (56)`
       | `0x38 (56)`
       | `0x38 (56)`
       | `0x38 (56)`
       | `0x38 (56)`

       | `"Digit9"`
       | `0x39 (57)`
       | `0x39 (57)`
       | `0x39 (57)`
       | `0x39 (57)`
       | `0x39 (57)`
       | `0x39 (57)`
       | `0x39 (57)`
       | `0x39 (57)`

       | `"Digit0"`
       | `0x30 (48)`
       | `0x30 (48)`
       | `0x30 (48)`
       | `0x30 (48)`
       | `0x30 (48)`
       | `0x30 (48)`
       | `0x30 (48)`
       | `0x30 (48)`

       | `"KeyA"`
       | `0x41 (65)`
       | `0x41 (65)`
       | `0x41 (65)`
       | `0x41 (65)`
       | `0x41 (65)`
       | `0x41 (65)`
       | `0x41 (65)`
       | `0x41 (65)`

       | `"KeyB"`
       | `0x42 (66)`
       | `0x42 (66)`
       | `0x42 (66)`
       | `0x42 (66)`
       | `0x42 (66)`
       | `0x42 (66)`
       | `0x42 (66)`
       | `0x42 (66)`

       | `"KeyC"`
       | `0x43 (67)`
       | `0x43 (67)`
       | `0x43 (67)`
       | `0x43 (67)`
       | `0x43 (67)`
       | `0x43 (67)`
       | `0x43 (67)`
       | `0x43 (67)`

       | `"KeyD"`
       | `0x44 (68)`
       | `0x44 (68)`
       | `0x44 (68)`
       | `0x44 (68)`
       | `0x44 (68)`
       | `0x44 (68)`
       | `0x44 (68)`
       | `0x44 (68)`

       | `"KeyE"`
       | `0x45 (69)`
       | `0x45 (69)`
       | `0x45 (69)`
       | `0x45 (69)`
       | `0x45 (69)`
       | `0x45 (69)`
       | `0x45 (69)`
       | `0x45 (69)`

       | `"KeyF"`
       | `0x46 (70)`
       | `0x46 (70)`
       | `0x46 (70)`
       | `0x46 (70)`
       | `0x46 (70)`
       | `0x46 (70)`
       | `0x46 (70)`
       | `0x46 (70)`

       | `"KeyG"`
       | `0x47 (71)`
       | `0x47 (71)`
       | `0x47 (71)`
       | `0x47 (71)`
       | `0x47 (71)`
       | `0x47 (71)`
       | `0x47 (71)`
       | `0x47 (71)`

       | `"KeyH"`
       | `0x48 (72)`
       | `0x48 (72)`
       | `0x48 (72)`
       | `0x48 (72)`
       | `0x48 (72)`
       | `0x48 (72)`
       | `0x48 (72)`
       | `0x48 (72)`

       | `"KeyI"`
       | `0x49 (73)`
       | `0x49 (73)`
       | `0x49 (73)`
       | `0x49 (73)`
       | `0x49 (73)`
       | `0x49 (73)`
       | `0x49 (73)`
       | `0x49 (73)`

       | `"KeyJ"`
       | `0x4A (74)`
       | `0x4A (74)`
       | `0x4A (74)`
       | `0x4A (74)`
       | `0x4A (74)`
       | `0x4A (74)`
       | `0x4A (74)`
       | `0x4A (74)`

       | `"KeyK"`
       | `0x4B (75)`
       | `0x4B (75)`
       | `0x4B (75)`
       | `0x4B (75)`
       | `0x4B (75)`
       | `0x4B (75)`
       | `0x4B (75)`
       | `0x4B (75)`

       | `"KeyL"`
       | `0x4C (76)`
       | `0x4C (76)`
       | `0x4C (76)`
       | `0x4C (76)`
       | `0x4C (76)`
       | `0x4C (76)`
       | `0x4C (76)`
       | `0x4C (76)`

       | `"KeyM"`
       | `0x4D (77)`
       | `0x4D (77)`
       | `0x4D (77)`
       | `0x4D (77)`
       | `0x4D (77)`
       | `0x4D (77)`
       | `0x4D (77)`
       | `0x4D (77)`

       | `"KeyN"`
       | `0x4E (78)`
       | `0x4E (78)`
       | `0x4E (78)`
       | `0x4E (78)`
       | `0x4E (78)`
       | `0x4E (78)`
       | `0x4E (78)`
       | `0x4E (78)`

       | `"KeyO"`
       | `0x4F (79)`
       | `0x4F (79)`
       | `0x4F (79)`
       | `0x4F (79)`
       | `0x4F (79)`
       | `0x4F (79)`
       | `0x4F (79)`
       | `0x4F (79)`

       | `"KeyP"`
       | `0x50 (80)`
       | `0x50 (80)`
       | `0x50 (80)`
       | `0x50 (80)`
       | `0x50 (80)`
       | `0x50 (80)`
       | `0x50 (80)`
       | `0x50 (80)`

       | `"KeyQ"`
       | `0x51 (81)`
       | `0x51 (81)`
       | `0x51 (81)`
       | `0x51 (81)`
       | `0xBA (186)⚠️`
       | `0x51 (81)`
       | `0x51 (81)`
       | `0xBA (186)⚠️`
       | `0x51 (81)`
       | `0x51 (81)`
       | `0xBA (186)⚠️`
       | `0x51 (81)`
       | `0x51 (81)`
       | `0x51 (81)`
       | `0xBA (186)⚠️`
       | `0x51 (81)`

       | `"KeyR"`
       | `0x52 (82)`
       | `0x52 (82)`
       | `0x52 (82)`
       | `0x52 (82)`
       | `0x52 (82)`
       | `0x52 (82)`
       | `0x52 (82)`
       | `0x52 (82)`

       | `"KeyS"`
       | `0x53 (83)`
       | `0x53 (83)`
       | `0x53 (83)`
       | `0x53 (83)`
       | `0x53 (83)`
       | `0x53 (83)`
       | `0x53 (83)`
       | `0x53 (83)`

       | `"KeyT"`
       | `0x54 (84)`
       | `0x54 (84)`
       | `0x54 (84)`
       | `0x54 (84)`
       | `0x54 (84)`
       | `0x54 (84)`
       | `0x54 (84)`
       | `0x54 (84)`

       | `"KeyU"`
       | `0x55 (85)`
       | `0x55 (85)`
       | `0x55 (85)`
       | `0x55 (85)`
       | `0x55 (85)`
       | `0x55 (85)`
       | `0x55 (85)`
       | `0x55 (85)`

       | `"KeyV"`
       | `0x56 (86)`
       | `0x56 (86)`
       | `0x56 (86)`
       | `0x56 (86)`
       | `0x56 (86)`
       | `0x56 (86)`
       | `0x56 (86)`
       | `0x56 (86)`

       | `"KeyW"`
       | `0x57 (87)`
       | `0x57 (87)`
       | `0x57 (87)`
       | `0x57 (87)`
       | `0x57 (87)`
       | `0x57 (87)`
       | `0x57 (87)`
       | `0x57 (87)`

       | `"KeyX"`
       | `0x58 (88)`
       | `0x58 (88)`
       | `0x58 (88)`
       | `0x58 (88)`
       | `0x58 (88)`
       | `0x58 (88)`
       | `0x58 (88)`
       | `0x58 (88)`

       | `"KeyY"`
       | `0x59 (89)`
       | `0x59 (89)`
       | `0x59 (89)`
       | `0x59 (89)`
       | `0x59 (89)`
       | `0x59 (89)`
       | `0x59 (89)`
       | `0x59 (89)`

       | `"KeyZ"`
       | `0x5A (90)`
       | `0x5A (90)`
       | `0x5A (90)`
       | `0x5A (90)`
       | `0x5A (90)`
       | `0x5A (90)`
       | `0x5A (90)`
       | `0x5A (90)`

       |
        `KeyboardEvent.code`

       | US
       | Japanese
       | Greek
       | US
       | Japanese
       | Greek
       | US
       | Japanese
       | Greek
       | US
       | Japanese
       | Greek
       | US
       | Japanese
       | Greek
       | US
       | Japanese
       | Greek
       | US
       | Japanese
       | Greek
       | US
       | Japanese
       | Greek

       | Windows
       | Windows
       | Mac (10.9)
       | Linux (Ubuntu 14.04)
       | Mac (10.9)
       | Windows
       | Mac (10.9)
       | Linux (Ubuntu 14.04)

       | Internet Explorer 11
       | Google Chrome 34
       | Chromium 34
       | Safari 7
       | Gecko 29

    keyCode values of each browser's keydown event caused by printable keys in
    standard position (punctuations in US layout):

       | `KeyboardEvent.code`
       | IE 11
       | Google Chrome 34
       | Chromium 34
       | Safari 7
       | Gecko 29

       |
       | Windows
       | Windows
       | Mac (10.9)
       | Linux (Ubuntu 14.04)
       | Mac (10.9)
       | Windows (10.9)
       | Mac (10.9)
       | Linux (Ubuntu 14.04)

       |
       | US
       | Japanese
       | Greek
       | US
       | Japanese
       | Greek
       | US
       | Japanese
       | Greek
       | US
       | Japanese
       | Greek
       | US
       | Japanese
       | Greek
       | US
       | Japanese
       | Greek
       | US
       | Japanese
       | Greek
       | US
       | Japanese
       | Greek

       | `"Comma"`
       | `0xBC (188)`
       | `0xBC (188)`
       | `0xBC (188)`
       | `0xBC (188)`
       | `0xBC (188)`
       | `0xBC (188)`
       | `0xBC (188)`
       | `0xBC (188)`

       | `"Comma"` with `Shift`

       | `"Period"`
       | `0xBE (190)`
       | `0xBE (190)`
       | `0xBE (190)`
       | `0xBE (190)`
       | `0xBE (190)`
       | `0xBE (190)`
       | `0xBE (190)`
       | `0xBE (190)`

       | `"Period"` with `Shift`

       | `"Semicolon"`
       | `0xBA (186)`
       | `0xBB (187)`⚠️
       | `0xBA (186)`
       | `0xBA (186)`
       | `0xBB (187)`⚠️
       | `0xBA (186)`
       | `0xBA (186)`
       | `0xBA (186)` [1]
       | `0xE5 (229)`⚠️ [2]
       | `0xBA (186)`
       | `0xBA (186)`
       | `0xE5 (229)`⚠️ [3]
       | `0xBA (186)`
       | `0xBA (186)` [1]
       | `0xE5 (229)`⚠️ [2]
       | `0x3B (59)`
       | `0x3B (59)`
       | `0x00 (0)`⚠️
       | `0x3B (59)`
       | `0x3B (59)` [1]
       | `0x00 (0)`⚠️
       | `0x3B (59)`
       | `0x3B (59)`
       | `0x00 (0)`⚠️

       | `"Semicolon"` with `Shift`
       | `0xBB (187)`⚠️ [1]
       | `0xBB (187)`⚠️
       | `0xBB (187)`⚠️ [1]

       | `"Quote"`
       | `0xDE (222)`
       | `0xBA (186)`⚠️
       | `0xDE (222)`
       | `0xDE (222)`
       | `0xBA (186)`⚠️
       | `0xDE (222)`
       | `0xDE (222)`
       | `0xBA (186)`⚠️ [1]
       | `0xDE (222)`
       | `0xDE (222)`
       | `0xBA (186)`⚠️
       | `0xDE (222)`
       | `0xDE (222)`
       | `0xBA (186)`⚠️ [1]
       | `0xDE (222)`
       | `0xDE (222)`
       | `0x3A (58)`⚠️
       | `0xDE (222)`
       | `0xDE (222)`
       | `0x3A (58)`⚠️ [1]
       | `0xDE (222)`
       | `0xDE (222)`
       | `0x3A (58)`⚠️
       | `0xDE (222)`

       | `"Quote"` with Shift
       | `0xDE (222)`⚠️ [1]
       | `0x38 (56)`⚠️
       | `0xDE (222)`⚠️ [1]
