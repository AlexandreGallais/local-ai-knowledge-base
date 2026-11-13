---
title: "Code values for keyboard events (part 2 of 5)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ui_events/keyboard_event_code_values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Code values for keyboard events (part 2 of 5)

## Code values on Windows

This table shows the Windows scan codes representing keys and the `KeyboardEvent.code` values which correspond to those hardware keys. Only keys which generate scan codes on Windows are listed.

In the cells, "(❌ Missing)" means that this code value cannot be detected on this browser;
"(⚠️ Not the same on xyz)" means that this string represents a different code value on the browser xyz and that special care has to be done
when using it.

       |
       |
        `KeyboardEvent.code` value

       | Code
       | Firefox
       | Chrome

       | `0x0000`
       |
        `"Unidentified"`

       | `""`

       | `0x0001`
       | `"Escape"`
       | `"Escape"`

       | `0x0002`
       | `"Digit1"`
       | `"Digit1"`

       | `0x0003`
       | `"Digit2"`
       | `"Digit2"`

       | `0x0004`
       | `"Digit3"`
       | `"Digit3"`

       | `0x0005`
       | `"Digit4"`
       | `"Digit4"`

       | `0x0006`
       | `"Digit5"`
       | `"Digit5"`

       | `0x0007`
       | `"Digit6"`
       | `"Digit6"`

       | `0x0008`
       | `"Digit7"`
       | `"Digit7"`

       | `0x0009`
       | `"Digit8"`
       | `"Digit8"`

       | `0x000A`
       | `"Digit9"`
       | `"Digit9"`

       | `0x000B`
       | `"Digit0"`
       | `"Digit0"`

       | `0x000C`
       | `"Minus"`
       | `"Minus"`

       | `0x000D`
       | `"Equal"`
       | `"Equal"`

       | `0x000E`
       | `"Backspace"`
       | `"Backspace"`

       | `0x000F`
       | `"Tab"`
       | `"Tab"`

       | `0x0010`
       | `"KeyQ"`
       | `"KeyQ"`

       | `0x0011`
       | `"KeyW"`
       | `"KeyW"`

       | `0x0012`
       | `"KeyE"`
       | `"KeyE"`

       | `0x0013`
       | `"KeyR"`
       | `"KeyR"`

       | `0x0014`
       | `"KeyT"`
       | `"KeyT"`

       | `0x0015`
       | `"KeyY"`
       | `"KeyY"`

       | `0x0016`
       | `"KeyU"`
       | `"KeyU"`

       | `0x0017`
       | `"KeyI"`
       | `"KeyI"`

       | `0x0018`
       | `"KeyO"`
       | `"KeyO"`

       | `0x0019`
       | `"KeyP"`
       | `"KeyP"`

       | `0x001A`
       | `"BracketLeft"`
       | `"BracketLeft"`

       | `0x001B`
       | `"BracketRight"`
       | `"BracketRight"`

       | `0x001C`
       | `"Enter"`
       | `"Enter"`

       | `0x001D`
       | `"ControlLeft"`
       | `"ControlLeft"`

       | `0x001E`
       | `"KeyA"`
       | `"KeyA"`

       | `0x001F`
       | `"KeyS"`
       | `"KeyS"`

       | `0x0020`
       | `"KeyD"`
       | `"KeyD"`

       | `0x0021`
       | `"KeyF"`
       | `"KeyF"`

       | `0x0022`
       | `"KeyG"`
       | `"KeyG"`

       | `0x0023`
       | `"KeyH"`
       | `"KeyH"`

       | `0x0024`
       | `"KeyJ"`
       | `"KeyJ"`

       | `0x0025`
       | `"KeyK"`
       | `"KeyK"`

       | `0x0026`
       | `"KeyL"`
       | `"KeyL"`

       | `0x0027`
       | `"Semicolon"`
       | `"Semicolon"`

       | `0x0028`
       | `"Quote"`
       | `"Quote"`

       | `0x0029`
       | `"Backquote"`
       | `"Backquote"`

       | `0x002A`
       | `"ShiftLeft"`
       | `"ShiftLeft"`

       | `0x002B`
       | `"Backslash"`
       | `"Backslash"`

       | `0x002C`
       | `"KeyZ"`
       | `"KeyZ"`

       | `0x002D`
       | `"KeyX"`
       | `"KeyX"`

       | `0x002E`
       | `"KeyC"`
       | `"KeyC"`

       | `0x002F`
       | `"KeyV"`
       | `"KeyV"`

       | `0x0030`
       | `"KeyB"`
       | `"KeyB"`

       | `0x0031`
       | `"KeyN"`
       | `"KeyN"`

       | `0x0032`
       | `"KeyM"`
       | `"KeyM"`

       | `0x0033`
       | `"Comma"`
       | `"Comma"`

       | `0x0034`
       | `"Period"`
       | `"Period"`

       | `0x0035`
       | `"Slash"`
       | `"Slash"`

       | `0x0036`
       | `"ShiftRight"`
       | `"ShiftRight"`

       | `0x0037`
       | `"NumpadMultiply"`
       | `"NumpadMultiply"`

       | `0x0038`
       | `"AltLeft"`
       | `"AltLeft"`

       | `0x0039`
       | `"Space"`
       | `"Space"`

       | `0x003A`
       | `"CapsLock"`
       | `"CapsLock"`

       | `0x003B`
       | `"F1"`
       | `"F1"`

       | `0x003C`
       | `"F2"`
       | `"F2"`

       | `0x003D`
       | `"F3"`
       | `"F3"`

       | `0x003E`
       | `"F4"`
       | `"F4"`

       | `0x003F`
       | `"F5"`
       | `"F5"`

       | `0x0040`
       | `"F6"`
       | `"F6"`

       | `0x0041`
       | `"F7"`
       | `"F7"`

       | `0x0042`
       | `"F8"`
       | `"F8"`

       | `0x0043`
       | `"F9"`
       | `"F9"`

       | `0x0044`
       | `"F10"`
       | `"F10"`

       | `0x0045`
       | `"Pause"`
       | `"Pause"`

       | `0x0046`
       | `"ScrollLock"`
       | `"ScrollLock"`

       | `0x0047`
       | `"Numpad7"`
       | `"Numpad7"`

       | `0x0048`
       | `"Numpad8"`
       | `"Numpad8"`

       | `0x0049`
       | `"Numpad9"`
       | `"Numpad9"`

       | `0x004A`
       | `"NumpadSubtract"`
       | `"NumpadSubtract"`

       | `0x004B`
       | `"Numpad4"`
       | `"Numpad4"`

       | `0x004C`
       | `"Numpad5"`
       | `"Numpad5"`

       | `0x004D`
       | `"Numpad6"`
       | `"Numpad6"`

       | `0x004E`
       | `"NumpadAdd"`
       | `"NumpadAdd"`

       | `0x004F`
       | `"Numpad1"`
       | `"Numpad1"`

       | `0x0050`
       | `"Numpad2"`
       | `"Numpad2"`

       | `0x0051`
       | `"Numpad3"`
       | `"Numpad3"`

       | `0x0052`
       | `"Numpad0"`
       | `"Numpad0"`

       | `0x0053`
       | `"NumpadDecimal"`
       | `"NumpadDecimal"`

       |
        <code>0x0054 (`Alt` + `PrintScreen`)</code>

       | `"PrintScreen"` (⚠️ Not the same on Chrome)
       | `""` (❌ Missing)

       | `0x0055`
       | `"Unidentified"`
       | `""`

       | `0x0056`
       | `"IntlBackslash"`
       | `"IntlBackslash"`

       | `0x0057`
       | `"F11"`
       | `"F11"`

       | `0x0058`
       | `"F12"`
       | `"F12"`

       | `0x0059`
       | `"NumpadEqual"`
       | `"NumpadEqual"` (was `""` prior to Chrome 48)

       | `0x005A`
       | `"Unidentified"`
       | `""`

       | `0x005B`
       | `"Unidentified"`
       | `""` (was `"F13"` prior to Chrome 48)

       | `0x005C`
       | `"Unidentified"`
       | `""` (was `"F14"` prior to Chrome 48)

       | `0x005D`
       | `"Unidentified"`
       | `""` (was `"F15"` prior to Chrome 48)

       | `0x005E`
       | `"Unidentified"`
       | `""`

       | `0x005F`
       | `"Unidentified"`
       | `""`

       | `0x0060`
       | `"Unidentified"`
       | `""`

       | `0x0061`
       | `"Unidentified"`
       | `""`

       | `0x0062`
       | `"Unidentified"`
       | `""`

       | `0x0063`
       | `"Unidentified"`
       | `""` (was `"F16"` prior to Chrome 48)

       | `0x0064`
       | `"F13"`
       | `"F13"` (was `"F17"` prior to Chrome 48)

       | `0x0065`
       | `"F14"`
       | `"F14"` (was `"F18"` prior to Chrome 48)

       | `0x0066`
       | `"F15"`
       | `"F15"` (was `"F19"` prior to Chrome 48)

       | `0x0067`
       | `"F16"`
       | `"F16"` (was `"F20"` prior to Chrome 48)

       | `0x0068`
       | `"F17"`
       | `"F17"` (was `"F21"` prior to Chrome 48)

       | `0x0069`
       | `"F18"`
       | `"F18"` (was `"F22"` prior to Chrome 48)

       | `0x006A`
       | `"F19"`
       | `"F19"` (was `"F23"` prior to Chrome 48)

       | `0x006B`
       | `"F20"`
       | `"F20"` (was `"F24"` prior to Chrome 48)

       | `0x006C`
       | `"F21"`
       | `"F21"` (was `""` prior to Chrome 48)

       | `0x006D`
       | `"F22"`
       | `"F22"` (was `""` prior to Chrome 48)

       | `0x006E`
       | `"F23"`
       | `"F23"` (was `""` prior to Chrome 48)

       | `0x006F`
       | `"Unidentified"`
       | `""`

       | `0x0070`
       | `"KanaMode"`
       | `"KanaMode"` (was `""` prior to Chrome 48)

       |
        `0x0071` (`Hanja` key <example-value> Korean keyboard
        layout)

       | `"Lang2"`
       | `"Lang2"` (was `""` prior to Chrome 48)

       |
        `0x0072` (`Han/Yeong` key <example-value> Korean keyboard
        layout)

       | `"Lang1"`
       | `"Lang1"` (was `""` prior to Chrome 48)

       | `0x0073`
       | `"IntlRo"`
       | `"IntlRo"` (was `""` prior to Chrome 48)

       | `0x0074`, `0x0075`
       | `"Unidentified"`
       | `""`

       | `0x0076`
       | `"F24"`
       | `"F24"` (was `""` prior to Chrome 48)

       | `0x0077`
       | `"Unidentified"` (❌ Missing)
       | `"Lang4"` (was `""` prior to Chrome 48) (⚠️ Not the same on Firefox)

       | `0x0078`
       | `"Unidentified"` (❌ Missing)
       | `"Lang3"` (was `""` prior to Chrome 48) (⚠️ Not the same on Firefox)

       | `0x0079`
       | `"Convert"`
       | `"Convert"` (was `""` prior to Chrome 48)

       | `0x007A`
       | `"Unidentified"`
       | `""`

       | `0x007B`
       | `"NonConvert"`
       | `"NonConvert"` (was `""` prior to Chrome 48)

       | `0x007C`
       | `"Unidentified"`
       | `""`

       | `0x007D`
       | `"IntlYen"`
       | `"IntlYen"`

       | `0x007E`
       | `"NumpadComma"`
       | `"NumpadComma"` (was `""` prior to Chrome 48)

       | `0x007F`
       | `"Unidentified"`
       | `""`

       | `0xE000` ～ `0xE007`
       | `"Unidentified"`
       | `""`

       | `0xE008`
       | `"Unidentified"` (❌ Missing)
       | `"Undo"` (⚠️ Not the same on Firefox)

       | `0xE009`
       | `"Unidentified"`
       | `""`

       | `0xE00A`
       | `""` (❌ Missing)
       | `"Paste"` (⚠️ Not the same on Firefox)

       | `0xE00B` ～ `0xE00F`
       | ""
       | `""`

       | `0xE010`
       | `"MediaTrackPrevious"`
       | `"MediaTrackPrevious"`

       | `0xE011` ～ `0xE016`
       | `""`
       | `""`

       | `0xE017`
       | `"Unidentified"` (❌ Missing)
       | `"Cut"` (⚠️ Not the same on Firefox)

       | `0xE018`
       | `"Unidentified"` (❌ Missing)
       | `"Copy"` (⚠️ Not the same on Firefox)

       | `0xE019`
       | `"MediaTrackNext"`
       | `"MediaTrackNext"`

       | `0xE01A, 0xE01B`
       | `"Unidentified"`
       | `""`

       | `0xE01C`
       | `"NumpadEnter"`
       | `"NumpadEnter"`

       | `0xE01D`
       | `"ControlRight"`
       | `"ControlRight"`

       | `0xE01E`
       | `"Unidentified"`
       | `""` (was `"LaunchMail"` prior to Chrome 48)

       | `0xE01F`
       | `"Unidentified"`
       | `""`

       | `0xE020`
       | `"AudioVolumeMute"`
       | `"AudioVolumeMute"`

       | `0xE021`
       | `"LaunchApp2"`
       | `"LaunchApp2"` (was `""` prior to Chrome 48)

       | `0xE022`
       | `"MediaPlayPause"`
       | `"MediaPlayPause"`

       | `0xE023`
       | `"Unidentified"`
       | `""`

       | `0xE024`
       | `"MediaStop"`
       | `"MediaStop"`

       | `0xE025` ～ `0xE02B`
       | `"Unidentified"`
       | `""`

       | `0xE02C`
       | `"Unidentified"` (❌ Missing)
       | `"Eject"` (⚠️ Not the same on Firefox)

       | `0xE02D`
       | `"Unidentified"`
       | `""`

       | `0xE02E`
       | `"VolumeDown"` (⚠️ Not the same on Chrome)
       |
        `"AudioVolumeDown"` (was `"VolumeDown"` prior to
        Chrome 52) (⚠️ Not the same on Firefox)

       | `0xE02F`
       | `"Unidentified"`
       | `""`

       | `0xE030`
       | `"VolumeUp"` (⚠️ Not the same on Chrome)
       |
        `"AudioVolumeUp"` (was `"VolumeUp"` prior to Chrome
        52) (⚠️ Not the same on Firefox)

       | `0xE031`
       | `"Unidentified"`
       | `""`

       | `0xE032`
       | `"BrowserHome"`
       | `"BrowserHome"`

       | `0xE033`, `0xE034`
       | `"Unidentified"`
       | `""`

       | `0xE035`
       | `"NumpadDivide"`
       | `"NumpadDivide"`

       | `0xE036`
       | `"Unidentified"`
       | `""`

       | `0xE037`
       | `"PrintScreen"`
       | `"PrintScreen"`

       | `0xE038`
       | `"AltRight"`
       | `"AltRight"`

       | `0xE039`, `0xE03A`
       | `"Unidentified"`
       | `""`

       | `0xE03B`
       | `"Unidentified"` (❌ Missing)
       | `"Help"` (⚠️ Not the same on Firefox)

       | `0xE03C` ～ `0xE044`
       | `"Unidentified"`
       | `""`

       | `0xE045`
       | `"NumLock"`
       | `"NumLock"`

       |
        `0xE046` (`Ctrl` + `Pause`)

       | `"Pause"`
       | `"Pause"`

       | `0xE047`
       | `"Home"`
       | `"Home"`

       | `0xE048`
       | `"ArrowUp"`
       | `"ArrowUp"`

       | `0xE049`
       | `"PageUp"`
       | `"PageUp"`

       | `0xE04A`
       | `"Unidentified"`
       | `""`

       | `0xE04B`
       | `"ArrowLeft"`
       | `"ArrowLeft"`

       | `0xE04C`
       | `"Unidentified"`
       | `""`

       | `0xE04D`
       | `"ArrowRight"`
       | `"ArrowRight"`

       | `0xE04E`
       | `"Unidentified"`
       | `""`

       | `0xE04F`
       | `"End"`
       | `"End"`

       | `0xE050`
       | `"ArrowDown"`
       | `"ArrowDown"`

       | `0xE051`
       | `"PageDown"`
       | `"PageDown"`

       | `0xE052`
       | `"Insert"`
       | `"Insert"`

       | `0xE053`
       | `"Delete"`
       | `"Delete"`

       | `0xE054` ～ `0xE05A`
       | `"Unidentified"`
       | `""`

       | `0xE05B`
       | `"MetaLeft"` (was `"OSLeft"` prior to Firefox 118)
       | `"MetaLeft"` (was `"OSLeft"` prior to Chrome 52)

       | `0xE05C`
       | `"MetaRight"` (was `"OSRight"` prior to Firefox 118)
       | `"MetaRight"` (was `"OSRight"` prior to Chrome 52)

       | `0xE05D`
       | `"ContextMenu"`
       | `"ContextMenu"`

       | `0xE05E`
       | `"Power"`
       | `"Power"` (was `""` prior to Chrome 48)

       | `0xE05F`
       | `"Unidentified"` (❌ Missing)
       | `"Sleep"` (was `""` prior to Chrome 48) (⚠️ Not the same on Firefox)

       | `0xE060` ～ `0xE062`
       | `"Unidentified"`
       | `""`

       | `0xE063`
       | `"Unidentified"` (❌ Missing)
       | `"WakeUp"` (was `""` prior to Chrome 48) (⚠️ Not the same on Firefox)

       | `0xE064`
       | `"Unidentified"`
       | `""`

       | `0xE065`
       | `"BrowserSearch"`
       | `"BrowserSearch"`

       | `0xE066`
       | `"BrowserFavorites"`
       | `"BrowserFavorites"`

       | `0xE067`
       | `"BrowserRefresh"`
       | `"BrowserRefresh"`

       | `0xE068`
       | `"BrowserStop"`
       | `"BrowserStop"`

       | `0xE069`
       | `"BrowserForward"`
       | `"BrowserForward"`

       | `0xE06A`
       | `"BrowserBack"`
       | `"BrowserBack"`

       | `0xE06B`
       | `"LaunchApp1"`
       | `"LaunchApp1"` (was `""` prior to Chrome 48)

       | `0xE06C`
       | `"LaunchMail"`
       | `"LaunchMail"` (was `""` prior to Chrome 48)

       | `0xE06D`
       | `"MediaSelect"`
       | `"MediaSelect"` (was `""` prior to Chrome 48)

       | `0xE06E ～ 0xE0F0`
       | `"Unidentified"`
       | `""`

       |
        `0xE0F1` (`Hanja` key with Korean keyboard layout)

       | `"Lang2"` (⚠️ Not the same on Chrome)
       | `""` (❌ Missing)
