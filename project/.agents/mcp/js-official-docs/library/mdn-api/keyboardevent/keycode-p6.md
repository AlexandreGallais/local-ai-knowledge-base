---
title: "KeyboardEvent: keyCode property (part 6 of 8)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboardevent/keycode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# KeyboardEvent: keyCode property (part 6 of 8)

### Numpad keys

    keyCode values of each browser's keydown event caused by keys in numpad in
    NumLock state

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

       | `"NumLock"`
       | `0x90 (144)`
       | `0x90 (144)`
       | `0x0C (12)`⚠️ [1]
       | `0x90 (144)`
       | `0x0C (12)`⚠️ [1]
       | `0x90 (144)`
       | `0x0C (12)`⚠️ [1]
       | `0x90 (144)`

       | `"Numpad0"`
       | `0x60 (96)`
       | `0x60 (96)`
       | `0x60 (96)`
       | `0x60 (96)`
       | `0x60 (96)`
       | `0x60 (96)`
       | `0x60 (96)`
       | `0x60 (96)`

       | `"Numpad1"`
       | `0x61 (97)`
       | `0x61 (97)`
       | `0x61 (97)`
       | `0x61 (97)`
       | `0x61 (97)`
       | `0x61 (97)`
       | `0x61 (97)`
       | `0x61 (97)`

       | `"Numpad2"`
       | `0x62 (98)`
       | `0x62 (98)`
       | `0x62 (98)`
       | `0x62 (98)`
       | `0x62 (98)`
       | `0x62 (98)`
       | `0x62 (98)`
       | `0x62 (98)`

       | `"Numpad3"`
       | `0x63 (99)`
       | `0x63 (99)`
       | `0x63 (99)`
       | `0x63 (99)`
       | `0x63 (99)`
       | `0x63 (99)`
       | `0x63 (99)`
       | `0x63 (99)`

       | `"Numpad4"`
       | `0x64 (100)`
       | `0x64 (100)`
       | `0x64 (100)`
       | `0x64 (100)`
       | `0x64 (100)`
       | `0x64 (100)`
       | `0x64 (100)`
       | `0x64 (100)`

       | `"Numpad5"`
       | `0x65 (101)`
       | `0x65 (101)`
       | `0x65 (101)`
       | `0x65 (101)`
       | `0x65 (101)`
       | `0x65 (101)`
       | `0x65 (101)`
       | `0x65 (101)`

       | `"Numpad6"`
       | `0x66 (102)`
       | `0x66 (102)`
       | `0x66 (102)`
       | `0x66 (102)`
       | `0x66 (102)`
       | `0x66 (102)`
       | `0x66 (102)`
       | `0x66 (102)`

       | `"Numpad7"`
       | `0x67 (103)`
       | `0x67 (103)`
       | `0x67 (103)`
       | `0x67 (103)`
       | `0x67 (103)`
       | `0x67 (103)`
       | `0x67 (103)`
       | `0x67 (103)`

       | `"Numpad8"`
       | `0x68 (104)`
       | `0x68 (104)`
       | `0x68 (104)`
       | `0x68 (104)`
       | `0x68 (104)`
       | `0x68 (104)`
       | `0x68 (104)`
       | `0x68 (104)`

       | `"Numpad9"`
       | `0x69 (105)`
       | `0x69 (105)`
       | `0x69 (105)`
       | `0x69 (105)`
       | `0x69 (105)`
       | `0x69 (105)`
       | `0x69 (105)`
       | `0x69 (105)`

       | `"NumpadAdd"`
       | `0x6B (107)`
       | `0x6B (107)`
       | `0x6B (107)`
       | `0x6B (107)`
       | `0x6B (107)`
       | `0x6B (107)`
       | `0x6B (107)`
       | `0x6B (107)`

       | `"NumpadComma"` inputting `","`
       | `0xC2 (194)`
       | `0xC2 (194)`
       | `0xBC (188)`⚠️
       | ❌ Always inputs `"."`
       | `0xBC (188)`⚠️
       | `0xC2 (194)`
       | `0x6C (108)`⚠️
       | ❌ Always inputs `"."`

       |
        `"NumpadComma"` inputting `"."` or empty string

       | `0xC2 (194)`
       | `0xC2 (194)`
       | `0xBE (190)`⚠️
       | `0x6E (110)`⚠️
       | `0xBE (190)`⚠️
       | `0xC2 (194)`
       | `0x6C (108)`⚠️
       | `0x6E (110)`⚠️

       |
        `"NumpadDecimal"` inputting `"."`

       | `0x6E (110)`
       | `0x6E (110)`
       | `0x6E (110)`
       | `0x6E (110)`
       | `0x6E (110)`
       | `0x6E (110)`
       | `0x6E (110)`
       | `0x6E (110)`

       |
        `"NumpadDecimal"` inputting `","`

       | `0x6E (110)`
       | `0x6E (110)`
       | `0x6E (110)`
       | `0x6C (108)`⚠️
       | `0x6E (110)`
       | `0x6E (110)`
       | `0x6E (110)`
       | `0x6C (108)`⚠️

       | `"NumpadDivide"`
       | `0x6F (111)`
       | `0x6F (111)`
       | `0x6F (111)`
       | `0x6F (111)`
       | `0x6F (111)`
       | `0x6F (111)`
       | `0x6F (111)`
       | `0x6F (111)`

       | `"NumpadEnter"`
       | `0x0D (13)`
       | `0x0D (13)`
       | `0x0D (13)`
       | `0x0D (13)`
       | `0x0D (13)`
       | `0x0D (13)`
       | `0x0D (13)`
       | `0x0D (13)`

       | `"NumpadEqual"`
       | `0x0C (12)`
       | `0x0C (12)`
       | `0xBB (187)`⚠️
       | `0xBB (187)`⚠️
       | `0xBB (187)`⚠️
       | `0x0C (12)`
       | `0x3D (61)`⚠️
       | `0x3D (61)`⚠️

       | `"NumpadMultiply"`
       | `0x6A (106)`
       | `0x6A (106)`
       | `0x6A (106)`
       | `0x6A (106)`
       | `0x6A (106)`
       | `0x6A (106)`
       | `0x6A (106)`
       | `0x6A (106)`

       | `"NumpadSubtract"`
       | `0x6D (109)`
       | `0x6D (109)`
       | `0x6D (109)`
       | `0x6D (109)`
       | `0x6D (109)`
       | `0x6D (109)`
       | `0x6D (109)`
       | `0x6D (109)`

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

\[1] `"NumLock"` key works as `"Clear"` key on Mac.

    keyCode values of each browser's keydown event caused by keys in numpad
    without NumLock state

       |
        `KeyboardEvent.code`

       | IE 11
       | Google Chrome 34
       | Chromium 34
       | Gecko 29

       | Windows
       | Windows
       | Linux (Ubuntu 14.04)
       | Windows
       | Linux (Ubuntu 14.04)

       | `"Numpad0"` (`"Insert"`)
       | `0x2D (45)`
       | `0x2D (45)`
       | `0x2D (45)`
       | `0x2D (45)`
       | `0x2D (45)`

       | `"Numpad1"` (`"End"`)
       | `0x23 (35)`
       | `0x23 (35)`
       | `0x23 (35)`
       | `0x23 (35)`
       | `0x23 (35)`

       | `"Numpad2"` (`"ArrowDown"`)
       | `0x28 (40)`
       | `0x28 (40)`
       | `0x28 (40)`
       | `0x28 (40)`
       | `0x28 (40)`

       | `"Numpad3"` (`"PageDown"`)
       | `0x22 (34)`
       | `0x22 (34)`
       | `0x22 (34)`
       | `0x22 (34)`
       | `0x22 (34)`

       | `"Numpad4"` (`"ArrowLeft"`)
       | `0x25 (37)`
       | `0x25 (37)`
       | `0x25 (37)`
       | `0x25 (37)`
       | `0x25 (37)`

       | `"Numpad5"`
       | `0x0C (12)`
       | `0x0C (12)`
       | `0x0C (12)`
       | `0x0C (12)`
       | `0x0C (12)`

       | `"Numpad6"` (`"ArrowRight"`)
       | `0x27 (39)`
       | `0x27 (39)`
       | `0x27 (39)`
       | `0x27 (39)`
       | `0x27 (39)`

       | `"Numpad7"` (`"Home"`)
       | `0x24 (36)`
       | `0x24 (36)`
       | `0x24 (36)`
       | `0x24 (36)`
       | `0x24 (36)`

       | `"Numpad8"` (`"ArrowUp"`)
       | `0x26 (38)`
       | `0x26 (38)`
       | `0x26 (38)`
       | `0x26 (38)`
       | `0x26 (38)`

       | `"Numpad9"` (`"PageUp"`)
       | `0x21 (33)`
       | `0x21 (33)`
       | `0x21 (33)`
       | `0x21 (33)`
       | `0x21 (33)`

       | `"NumpadDecimal"` (`"Delete"`)
       | `0x2E (46)`
       | `0x2E (46)`
       | `0x2E (46)`
       | `0x2E (46)`
       | `0x2E (46)`

       |
        `KeyboardEvent.code`

       | Windows
       | Windows
       | Linux (Ubuntu 14.04)
       | Windows
       | Linux (Ubuntu 14.04)

       | IE 11
       | Google Chrome 34
       | Chromium 34
       | Gecko 29

> **Note:**
> Recent Mac doesn't have a `NumLock` key, and therefore state. That's why the unlocked state is not available.
