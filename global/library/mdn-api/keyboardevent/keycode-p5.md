---
title: "KeyboardEvent: keyCode property (part 5 of 8)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboardevent/keycode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# KeyboardEvent: keyCode property (part 5 of 8)

### Non-printable keys (function keys)

    keyCode values of each browser's keydown event caused by modifier keys:

       |
        `KeyboardEvent.code`

       | IE 11
       | Google Chrome 34
       | Chromium 34
       | Safari 7
       | Gecko 29

       | Windows
       | Windows
       | Mac (10.9)
       | Linux (Ubuntu 14.04)
       | Mac (10.9)
       | Windows
       | Mac (10.9)
       | Linux (Ubuntu 14.04)

       | `"AltLeft"`
       | `0x12 (18)`
       | `0x12 (18)`
       | `0x12 (18)`
       | `0x12 (18)`
       | `0x12 (18)`
       | `0x12 (18)`
       | `0x12 (18)`
       | `0x12 (18)`

       | `"AltRight"`
       | `0x12 (18)`
       | `0x12 (18)`
       | `0x12 (18)`
       | `0x12 (18)`
       | `0x12 (18)`
       | `0x12 (18)`
       | `0x12 (18)`
       | `0x12 (18)`

       |
        `"AltRight"` when it's `"AltGraph"` key

       | [1]
       | [1]
       | ❌N/A
       | `0xE1 (225)`⚠️
       | ❌ N/A
       | [1]
       | ❌ N/A
       | `0xE1 (225)`⚠️

       | `"CapsLock"`
       | `0x14 (20)` [2]
       | `0x14 (20)` [2]
       | `0x14 (20)`
       | `0x14 (20)`
       | `0x14 (20)`
       | `0x14 (20)` [2]
       | `0x14 (20)`
       | `0x14 (20)` [3]

       | `"ControlLeft"`
       | `0x11 (17)`
       | `0x11 (17)`
       | `0x11 (17)`
       | `0x11 (17)`
       | `0x11 (17)`
       | `0x11 (17)`
       | `0x11 (17)`
       | `0x11 (17)`

       | `"ControlRight"`
       | `0x11 (17)`
       | `0x11 (17)`
       | `0x11 (17)`
       | `0x11 (17)`
       | `0x11 (17)`
       | `0x11 (17)`
       | `0x11 (17)`
       | `0x11 (17)`

       | `"MetaLeft"`
       | `0x5B (91)`
       | `0x5B (91)`
       | `0x5B (91)`
       | `0x5B (91)`
       | `0x5B (91)`
       | `0x5B (91)`
       | `0xE0 (224)`⚠️
       | `0x5B (91)`

       | `"MetaRight"`
       | `0x5C (92)`
       | `0x5C (92)`
       | `0x5D (93)`⚠️
       | `0x5C (92)`
       | `0x5D (93)`⚠️
       | `0x5B (91)`⚠️
       | `0xE0 (224)`⚠️
       | `0x5B (91)`⚠️

       | `"ShiftLeft"`
       | `0x10 (16)`
       | `0x10 (16)`
       | `0x10 (16)`
       | `0x10 (16)`
       | `0x10 (16)`
       | `0x10 (16)`
       | `0x10 (16)`
       | `0x10 (16)`

       | `"ShiftRight"`
       | `0x10 (16)`
       | `0x10 (16)`
       | `0x10 (16)`
       | `0x10 (16)`
       | `0x10 (16)`
       | `0x10 (16)`
       | `0x10 (16)`
       | `0x10 (16)`

       |
        `KeyboardEvent.code`

       | Windows
       | Windows
       | Mac (10.9)
       | Linux (Ubuntu 14.04)
       | Mac (10.9)
       | Windows
       | Mac (10.9)
       | Linux (Ubuntu 14.04)

       | IE 11
       | Google Chrome 34
       | Chromium 34
       | Safari 7
       | Gecko 29

\[1] On Windows, pressing the `AltGraph` key <example-value> both the `"ControlLeft"` and the `"AltRight"` key events.

\[2] When the Japanese keyboard layout is active, pressing the `CapsLock` key <example-value> pressing `Shift` raises `0xF0 (240)`. The key works as the `Alphanumeric` key whose label is `"英数"`.

\[3] When the Japanese keyboard layout is active, pressing the `"CapsLock"` key <example-value> pressing `Shift` raises `0x00 (0)`. The key works as the `"Alphanumeric"` key whose label is `"英数"`.

    keyCode values of each browser's keydown event caused by non-printable keys:

       |
        `KeyboardEvent.code`

       | IE 11
       | Google Chrome 34
       | Chromium 34
       | Safari 7
       | Gecko 29

       | Windows
       | Windows
       | Mac (10.9)
       | Linux (Ubuntu 14.04)
       | Mac (10.9)
       | Windows
       | Mac (10.9)
       | Linux (Ubuntu 14.04)

       | `"ContextMenu"`
       | `0x5D (93)`
       | `0x5D (93)`
       | `0x00 (0)`⚠️ [1]
       | `0x5D (93)`
       | `0x00 (0)`⚠️ [1]
       | `0x5D (93)`
       | `0x5D (93)`
       | `0x5D (93)`

       | `"Enter"`
       | `0x0D (13)`
       | `0x0D (13)`
       | `0x0D (13)`
       | `0x0D (13)`
       | `0x0D (13)`
       | `0x0D (13)`
       | `0x0D (13)`
       | `0x0D (13)`

       | `"Space"`
       | `0x20 (32)`
       | `0x20 (32)`
       | `0x20 (32)`
       | `0x20 (32)`
       | `0x20 (32)`
       | `0x20 (32)`
       | `0x20 (32)`
       | `0x20 (32)`

       | `"Tab"`
       | `0x09 (9)`
       | `0x09 (9)`
       | `0x09 (9)`
       | `0x09 (9)`
       | `0x09 (9)`
       | `0x09 (9)`
       | `0x09 (9)`
       | `0x09 (9)`

       | `"Delete"`
       | `0x2E (46)`
       | `0x2E (46)`
       | `0x2E (46)`
       | `0x2E (46)`
       | `0x2E (46)`
       | `0x2E (46)`
       | `0x2E (46)`
       | `0x2E (46)`

       | `"End"`
       | `0x23 (35)`
       | `0x23 (35)`
       | `0x23 (35)`
       | `0x23 (35)`
       | `0x23 (35)`
       | `0x23 (35)`
       | `0x23 (35)`
       | `0x23 (35)`

       | `"Help"`
       | ❌ N/A
       | ❌ N/A
       | `0x2D (45)`⚠️ [2]
       | `0x2F (47)`⚠️ [3]
       | `0x2D (45)`⚠️ [2]
       | ❌ N/A
       | `0x2D (45)`⚠️ [2]
       | `0x06 (6)`⚠️ [3]

       | `"Home"`
       | `0x24 (36)`
       | `0x24 (36)`
       | `0x24 (36)`
       | `0x24 (36)`
       | `0x24 (36)`
       | `0x24 (36)`
       | `0x24 (36)`
       | `0x24 (36)`

       | `"Insert"`
       | `0x2D (45)`
       | `0x2D (45)`
       | `0x2D (45)`
       | `0x2D (45)`
       | `0x2D (45)`
       | `0x2D (45)`
       | `0x2D (45)`
       | `0x2D (45)`

       | `"PageDown"`
       | `0x22 (34)`
       | `0x22 (34)`
       | `0x22 (34)`
       | `0x22 (34)`
       | `0x22 (34)`
       | `0x22 (34)`
       | `0x22 (34)`
       | `0x22 (34)`

       | `"PageUp"`
       | `0x21 (33)`
       | `0x21 (33)`
       | `0x21 (33)`
       | `0x21 (33)`
       | `0x21 (33)`
       | `0x21 (33)`
       | `0x21 (33)`
       | `0x21 (33)`

       | `"ArrowDown"`
       | `0x28 (40)`
       | `0x28 (40)`
       | `0x28 (40)`
       | `0x28 (40)`
       | `0x28 (40)`
       | `0x28 (40)`
       | `0x28 (40)`
       | `0x28 (40)`

       | `"ArrowLeft"`
       | `0x25 (37)`
       | `0x25 (37)`
       | `0x25 (37)`
       | `0x25 (37)`
       | `0x25 (37)`
       | `0x25 (37)`
       | `0x25 (37)`
       | `0x25 (37)`

       | `"ArrowRight"`
       | `0x27 (39)`
       | `0x27 (39)`
       | `0x27 (39)`
       | `0x27 (39)`
       | `0x27 (39)`
       | `0x27 (39)`
       | `0x27 (39)`
       | `0x27 (39)`

       | `"ArrowUp"`
       | `0x26 (38)`
       | `0x26 (38)`
       | `0x26 (38)`
       | `0x26 (38)`
       | `0x26 (38)`
       | `0x26 (38)`
       | `0x26 (38)`
       | `0x26 (38)`

       | `"Escape"`
       | `0x1B (27)`
       | `0x1B (27)`
       | `0x1B (27)`
       | `0x1B (27)`
       | `0x1B (27)`
       | `0x1B (27)`
       | `0x1B (27)`
       | `0x1B (27)`

       | `"PrintScreen"`
       | `0x2C (44)` [4]
       | `0x2C (44)` [4]
       | `0x7C (124)`⚠️ [5]
       | `0x2A (42)`⚠️
       | `0x7C (124)`⚠️ [5]
       | `0x2C (44)` [4]
       | `0x2C (44)`
       | `0x2A (42)`⚠️

       | `"ScrollLock"`
       | `0x91 (145)`
       | `0x91 (145)`
       | `0x7D (125)`⚠️ [5]
       | `0x91 (145)`
       | `0x7D (125)`⚠️ [5]
       | `0x91 (145)`
       | `0x91 (145)`
       | `0x91 (145)`

       | `"Pause"`
       | `0x13 (19)` [6]
       | `0x13 (19)` [6]
       | `0x7E (126)`⚠️ [5]
       | `0x13 (19)`
       | `0x7E (126)`⚠️ [5]
       | `0x13 (19)` [6]
       | `0x13 (19)`
       | `0x13 (19)`

       |
        `KeyboardEvent.code`

       | Windows
       | Windows
       | Mac (10.9)
       | Linux (Ubuntu 14.04)
       | Mac (10.9)
       | Windows
       | Mac (10.9)
       | Linux (Ubuntu 14.04)

       | IE 11
       | Google Chrome 34
       | Chromium 34
       | Safari 7
       | Gecko 29

\[1] A `keypress` event is fired and its `keyCode` and `charCode` are `0x10 (16)` but the text isn't actually entered into the editor.

\[2] On Mac, the `Help` key is mapped to the `Insert` key of PC keyboards. These `keyCode` values are the same as the `Insert` key's `keyCode` values.

\[3] Tested on Fedora 20.

\[4] Only a `keyup` event is fired.

\[5] PC's `PrintScreen`, `ScrollLock` and `Pause` are mapped to Mac's `F13`, `F14` and `F15`, respectively. Chrome and Safari map them to the same `keyCode` values as Mac's keys.

\[6] `Pause` key with `Control` generates `0x03 (3)`.

    keyCode values of each browser's keydown event caused by function keys:

       |
        `KeyboardEvent.code`

       | IE 11
       | Google Chrome 34
       | Chromium 34
       | Safari 7
       | Gecko 29

       | Windows
       | Windows
       | Mac (10.9)
       | Linux (Ubuntu 14.04)
       | Mac (10.9)
       | Windows
       | Mac (10.9)
       | Linux (Ubuntu 14.04)

       | `"F1"`
       | `0x70 (112)`
       | `0x70 (112)`
       | `0x70 (112)`
       | `0x70 (112)`
       | `0x70 (112)`
       | `0x70 (112)`
       | `0x70 (112)`
       | `0x70 (112)`

       | `"F2"`
       | `0x71 (113)`
       | `0x71 (113)`
       | `0x71 (113)`
       | `0x71 (113)`
       | `0x71 (113)`
       | `0x71 (113)`
       | `0x71 (113)`
       | `0x71 (113)`

       | `"F3"`
       | `0x72 (114)`
       | `0x72 (114)`
       | `0x72 (114)`
       | `0x72 (114)`
       | `0x72 (114)`
       | `0x72 (114)`
       | `0x72 (114)`
       | `0x72 (114)`

       | `"F4"`
       | `0x73 (115)`
       | `0x73 (115)`
       | `0x73 (115)`
       | `0x73 (115)`
       | `0x73 (115)`
       | `0x73 (115)`
       | `0x73 (115)`
       | `0x73 (115)`

       | `"F5"`
       | `0x74 (116)`
       | `0x74 (116)`
       | `0x74 (116)`
       | `0x74 (116)`
       | `0x74 (116)`
       | `0x74 (116)`
       | `0x74 (116)`
       | `0x74 (116)`

       | `"F6"`
       | `0x75 (117)`
       | `0x75 (117)`
       | `0x75 (117)`
       | `0x75 (117)`
       | `0x75 (117)`
       | `0x75 (117)`
       | `0x75 (117)`
       | `0x75 (117)`

       | `"F7"`
       | `0x76 (118)`
       | `0x76 (118)`
       | `0x76 (118)`
       | `0x76 (118)`
       | `0x76 (118)`
       | `0x76 (118)`
       | `0x76 (118)`
       | `0x76 (118)`

       | `"F8"`
       | `0x77 (119)`
       | `0x77 (119)`
       | `0x77 (119)`
       | `0x77 (119)`
       | `0x77 (119)`
       | `0x77 (119)`
       | `0x77 (119)`
       | `0x77 (119)`

       | `"F9"`
       | `0x78 (120)`
       | `0x78 (120)`
       | `0x78 (120)`
       | `0x78 (120)`
       | `0x78 (120)`
       | `0x78 (120)`
       | `0x78 (120)`
       | `0x78 (120)`

       | `"F10"`
       | `0x79 (121)`
       | `0x79 (121)`
       | `0x79 (121)`
       | `0x79 (121)`
       | `0x79 (121)`
       | `0x79 (121)`
       | `0x79 (121)`
       | `0x79 (121)`

       | `"F11"`
       | `0x7A (122)`
       | `0x7A (122)`
       | `0x7A (122)`
       | `0x7A (122)`
       | `0x7A (122)`
       | `0x7A (122)`
       | `0x7A (122)`
       | `0x7A (122)`

       | `"F12"`
       | `0x7B (123)`
       | `0x7B (123)`
       | `0x7B (123)`
       | `0x7B (123)`
       | `0x7B (123)`
       | `0x7B (123)`
       | `0x7B (123)`
       | `0x7B (123)`

       | `"F13"`
       | `0x7C (124)`
       | `0x7C (124)`
       | `0x7C (124)`
       | `0x7C (124)` [1]
       | `0x7C (124)`
       | `0x7C (124)`
       | `0x2C (44)` ⚠️ [2]
       | `0x00 (0)`⚠️ [3]

       | `"F14"`
       | `0x7D (125)`
       | `0x7D (125)`
       | `0x7D (125)`
       | `0x7D (125)` [1]
       | `0x7D (125)`
       | `0x7D (125)`
       | `0x91 (145)` ⚠️ [2]
       | `0x00 (0)`⚠️ [3]

       | `"F15"`
       | `0x7E (126)`
       | `0x7E (126)`
       | `0x7E (126)`
       | `0x7E (126)` [1]
       | `0x7E (126)`
       | `0x7E (126)`
       | `0x13 (19)` ⚠️ [2]
       | `0x00 (0)`⚠️ [3]

       | `"F16"`
       | `0x7F (127)`
       | `0x7F (127)`
       | `0x7F (127)`
       | `0x7F (127)` [1]
       | `0x7F (127)`
       | `0x7F (127)`
       | `0x7F (127)`
       | `0x00 (0)`⚠️ [3]

       | `"F17"`
       | `0x80 (128)`
       | `0x80 (128)`
       | `0x80 (128)`
       | `0x80 (128)` [1]
       | `0x80 (128)`
       | `0x80 (128)`
       | `0x80 (128)`
       | `0x00 (0)`⚠️ [3]

       | `"F18"`
       | `0x81 (129)`
       | `0x81 (129)`
       | `0x81 (129)`
       | `0x81 (129)` [1]
       | `0x81 (129)`
       | `0x81 (129)`
       | `0x81 (129)`
       | `0x00 (0)`⚠️ [3]

       | `"F19"`
       | `0x82 (130)`
       | `0x82 (130)`
       | `0x82 (130)`
       | ❌ `N/A` [4]
       | `0x82 (130)`
       | `0x82 (130)`
       | `0x82 (130)`
       | `0x00 (0)`⚠️ [3]

       | `"F20"`
       | `0x83 (131)`
       | `0x83 (131)`
       | `0x83 (131)`
       | ❌ `N/A` [4]
       | `0xE5 (229)`⚠️ [5]
       | `0x83 (131)`
       | `0x00 (0)`⚠️
       | ❌ `N/A` [6]

       | `"F21"`
       | `0x84 (132)`
       | `0x84 (132)`
       | `0x00 (0)`⚠️ [7]
       | ❌ `N/A` [4]
       | `0x00 (0)`⚠️ [7]
       | `0x84 (132)`
       | ❌ `N/A` [8]
       | ❌ `N/A` [6]

       | `"F22"`
       | `0x85 (133)`
       | `0x85 (133)`
       | `0x00 (0)`⚠️ [7]
       | ❌ `N/A` [4]
       | `0x00 (0)`⚠️ [7]
       | `0x85 (133)`
       | ❌ `N/A` [8]
       | ❌ `N/A` [6]

       | `"F23"`
       | `0x86 (134)`
       | `0x86 (134)`
       | `0x00 (0)`⚠️ [7]
       | ❌ `N/A` [4]
       | `0x00 (0)`⚠️ [7]
       | `0x86 (134)`
       | ❌ `N/A` [8]
       | ❌ `N/A` [6]

       | `"F24"`
       | `0x87 (135)`
       | `0x87 (135)`
       | `0x00 (0)`⚠️ [7]
       | ❌ `N/A` [4]
       | `0x00 (0)`⚠️ [7]
       | `0x87 (135)`
       | ❌ `N/A` [8]
       | `0x00 (0)`⚠️ [3]

       |
        `KeyboardEvent.code`

       | Windows
       | Windows
       | Mac (10.9)
       | Linux (Ubuntu 14.04)
       | Mac (10.9)
       | Windows
       | Mac (10.9)
       | Linux (Ubuntu 14.04)

       | IE 11
       | Google Chrome 34
       | Chromium 34
       | Safari 7
       | Gecko 29

\[1] Tested on Fedora 20.

\[2] On PCs, `PrintScreen`, `ScrollLock` and `Pause` are mapped to the Mac's `F13`, `F14` and `F15`, respectively. Firefox sets for them the same `keyCode` values as the PC's keys.

\[3] Tested on Fedora 20. The keys don't cause `GDK_Fxx` keysyms. If the keys cause proper keysyms, these values must be same as IE.

\[4] Tested on Fedora 20. The keys don't cause DOM key <example-value> on Chromium.

\[5] The `keyCode` value of a `keyUp` event is `0x83 (131)`.

\[6] Tested on Fedora 20. The keys don't cause DOM key <example-value> on Firefox.

\[7] Only the `keydown` event is fired.

\[8] No DOM key <example-value> are fired on Firefox.
