---
title: "Key values for keyboard events (part 1 of 8)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ui_events/keyboard_event_key_values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Key values for keyboard events

The tables below list the standard values for the `KeyboardEvent.key` property, with an explanation of what the key is typically used for. Corresponding virtual keycodes for common platforms are included where available.

## Special values

Values of `key` which have special meanings other than identifying a specific key or character.

       | `KeyboardEvent.key` Value
       | Description
       | Virtual Keycode

       | Windows
       | Mac
       | Linux
       | Android

       | `"Unidentified"`
       |

          The user agent wasn't able to map the event's virtual keycode to a
          specific key value.

          This can happen due to hardware or software constraints, or because of
          constraints around the platform on which the user agent is running.

       | varies
       | varies
       | varies
       | varies

## Modifier keys

_Modifiers_ are special keys which are used to generate special characters or cause special actions when used in combination with other keys. Examples include the `Shift` and `Control` keys, and lock keys such as `Caps Lock` and `NumLock`.

       | `KeyboardEvent.key` Value
       | Description
       | Virtual Keycode

       | Windows
       | Mac
       | Linux
       | Android

       | `"Alt"` [4]
       | The `Alt` (Alternative) key.
       |
        `VK_MENU` (0x12)`VK_LMENU` (0xA4)<code
          >VK_RMENU</code
        >
        (0xA5)

       |
        `kVK_Option` (0x3A)`kVK_RightOption` (0x3D)

       |
        `GDK_KEY_Alt_L` (0xFFE9)`GDK_KEY_Alt_R`
        (0xFFEA)`Qt::Key_Alt` (0x01000023)

       |
        `KEYCODE_ALT_LEFT` (57)`KEYCODE_ALT_RIGHT`
        (58)

       | `"AltGraph"` [4]
       |
        The `AltGr` or `AltGraph` (Alternate Graphics) key.
        Enables the ISO Level 3 shift modifier (where `Shift` is the
        level 2 modifier).

       |
       |
       |
        `GDK_KEY_Mode_switch` (0xFF7E)<code
          >GDK_KEY_ISO_Level3_Shift</code
        >
        (0xFE03)`GDK_KEY_ISO_Level3_Latch` (0xFE04)<code
          >GDK_KEY_ISO_Level3_Lock</code
        >
        (0xFE05)`GDK_KEY_ISO_Level5_Shift` (0xFE11)<code
          >GDK_KEY_ISO_Level5_Latch</code
        >
        (0xFE12)`GDK_KEY_ISO_Level5_Lock` (0xFE13)<code
          >Qt::Key_AltGr</code
        >
        (0x01001103`Qt::Key_Mode_switch` (0x0100117E)

       |

       | `"CapsLock"`
       |
        The `Caps Lock` key. Toggles the capital character lock on and
        off for subsequent input.

       | `VK_CAPITAL` (0x14)
       | `kVK_CapsLock` (0x39)
       |
        `GDK_KEY_Caps_Lock` (0xFFE5)<code
          >Qt::Key_CapsLock</code
        >
        (0x01000024)

       | `KEYCODE_CAPS_LOCK` (115)

       | `"Control"`
       |
        The `Control`, `Ctrl`, or `Ctl` key. Allows
        typing control characters.

       |
        `VK_CONTROL` (0x11)`VK_LCONTROL`
        (0xA2)`VK_RCONTROL` (0xA3)

       |
        `kVK_Control` (0x3B)`kVK_RightControl`
        (0x3E)

       |
        `GDK_KEY_Control_L` (0xFFE3)<code
          >GDK_KEY_Control_R</code
        >
        (0xFFE4)`Qt::Key_Control` (0x01000021)

       |
        `KEYCODE_CTRL_LEFT` (113)<code
          >KEYCODE_CTRL_RIGHT</code
        >
        (114)

       | `"Fn"`
       |
        The `Fn` (Function modifier) key. Used to allow generating
        function key (`F1`–`F15`, for instance) characters on
        keyboards without a dedicated function key area. Often handled in
        hardware so that events aren't generated for this key.

       |
       | `kVK_Function` (0x3F)
       |
       | `KEYCODE_FUNCTION` (119)

       | `"FnLock"`
       |
        The `FnLock` or `F-Lock` (Function Lock) key. Toggles
        the function key mode described by `"Fn"` on and off. Often
        handled in hardware so that events aren't generated for this key.

       |
       |
       |
       |

       | `"Hyper"` [3]
       | The `Hyper` key.
       |
       |
       |
        `GDK_KEY_Hyper_L` (0xFFED)`GDK_KEY_Hyper_R`
        (0xFFEE)`Qt::Key_Hyper_L` (0x01000056)<code
          >Qt::Key_Hyper_R</code
        >
        (0x01000057)

       |

       | `"Meta"` [1]
       |
        The `Meta` key. Allows issuing special command inputs.
        This is the `Windows` logo key, or the `Command` or `⌘` key on Mac keyboards.

       | `VK_LWIN` (0x5B)`VK_RWIN` (0x5C)
       |
        `kVK_Command` (0x37)`kVK_RightCommand` (0x36)

       |
        `GDK_KEY_Meta_L` (0xFFE7)`GDK_KEY_Meta_R` (0xFFE8)`Qt::Key_Meta` (0x01000022)

       |
        `KEYCODE_META_LEFT` (117)`KEYCODE_META_RIGHT` (118)

       | `"NumLock"`
       |
        The `NumLock` (Number Lock) key. Toggles the numeric keypad
        between number entry some other mode (often directional arrows).

       | `VK_NUMLOCK` (0x90)
       |
       |
        `GDK_KEY_Num_Lock` (0xFF7F)`Qt::Key_NumLock`
        (0x01000025)

       | `KEYCODE_NUM_LOCK` (143)

       | `"ScrollLock"` [2]
       |
        The `Scroll Lock` key. Toggles between scrolling and cursor
        movement modes.

       | `VK_SCROLL` (0x91)
       |
       |
        `GDK_KEY_Scroll_Lock` (0xFF14)<code
          >Qt::Key_ScrollLock</code
        >
        (0x01000026)

       | `KEYCODE_SCROLL_LOCK` (116)

       | `"Shift"`
       |
        The `Shift` key. Modifies keystrokes to allow typing upper (or
        other) case letters, and to support typing punctuation and other special
        characters.

       |
        `VK_SHIFT` (0x10)`VK_LSHIFT`
        (0xA0)`VK_RSHIFT` (0xA1)

       |
        `kVK_Shift` (0x38)`kVK_RightShift` (0x3C)

       |
        `GDK_KEY_Shift_L` (0xFFE1)`GDK_KEY_Shift_R`
        (0xFFE2)`Qt::Key_Shift` (0x01000020)

       |
        `KEYCODE_SHIFT_LEFT` (59)<code
          >KEYCODE_SHIFT_RIGHT</code
        >
        (60)

       | `"Super"` [3]
       | The `Super` key.
       |
       |
       |
        `GDK_KEY_Super_L` (0xFFEB)`GDK_KEY_Super_R`
        (0xFFEC)`Qt::Key_Super_L` (0x01000053)<code
          >Qt::Key_Super_R</code
        >
        (0x01000054)

       |

       | `"Symbol"`
       |
        The `Symbol` modifier key (found on certain virtual keyboards).

       |
       |
       |
       | `KEYCODE_SYM` (63) [2]

       | `"SymbolLock"`
       | The `Symbol Lock` key.
       |
       |
       |
       |

\[1] Firefox 118 and later correctly report the `Windows` key as `"Meta"` (earlier versions reported the key as `"OS"`).

\[2] Firefox did not add support for the `Symbol` key until Firefox 37.

\[3] Firefox generates the key value `"OS"` for the `Super` and `Hyper` keys, instead of `"Super"` and `"Hyper"`.

\[4] Chrome 67 and Firefox 63 now correctly interpret the right `Alt` key for keyboard layouts which map that key to `AltGr`. See Firefox bug Firefox bug 900750 and Chrome bug 25503 for further details.

## Whitespace keys

       | `KeyboardEvent.key` Value
       | Description
       | Virtual Keycode

       | Windows
       | Mac
       | Linux
       | Android

       | `"Enter"`
       |
        The `Enter` or `↵` key (sometimes labeled
        `Return`).

       | `VK_RETURN` (0x0D)
       |
        `kVK_Return` (0x24)`kVK_ANSI_KeypadEnter`
        (0x4C)`kVK_Powerbook_KeypadEnter` (0x34)

       |
        `GDK_KEY_Return` (0xFF0D)`GDK_KEY_KP_Enter`
        (0xFF8D)`GDK_KEY_ISO_Enter` (0xFE34)<code
          >GDK_KEY_3270_Enter</code
        >
        (0xFD1E)`Qt::Key_Return` (0x01000004)<code
          >Qt::Key_Enter</code
        >
        (0x01000005)

       |
        `KEYCODE_ENTER` (66)`KEYCODE_NUMPAD_ENTER`
        (160)`KEYCODE_DPAD_CENTER` (23)

       | `"Tab"`
       | The Horizontal Tab key, `Tab`.
       | `VK_TAB` (0x09)
       | `kVK_Tab` (0x30)
       |
        `GDK_KEY_Tab` (0xFF09)`GDK_KEY_KP_Tab`
        (0xFF89)`GDK_KEY_ISO_Left_Tab` (0xFE20)<code
          >Qt::Key_Tab</code
        >
        (0x01000001)

       | `KEYCODE_TAB` (61)

       | `" "` [1]
       | The space key, `Space Bar`.
       | `VK_SPACE` (0x20)
       | `kVK_Space` (0x31)
       |

          `GDK_KEY_space` (0x20)`GDK_KEY_KP_Space`
          (0xFF80)`Qt::Key_Space` (0x20)

       | `KEYCODE_SPACE` (62)

\[1] Older browsers may return `"Spacebar"` instead of `" "` for the `Space Bar` key. Firefox did so until version 37.

## Navigation keys

       | `KeyboardEvent.key` Value
       | Description
       | Virtual Keycode

       | Windows
       | Mac
       | Linux
       | Android

       | `"ArrowDown"` [1]
       | The down arrow key.
       | `VK_DOWN` (0x28)
       | `kVK_DownArrow` (0x7D)
       |
        `GDK_KEY_Down` (0xFF54)`GDK_KEY_KP_Down`
        (0xFF99)`Qt::Key_Down` (0x01000015)

       | `KEYCODE_DPAD_DOWN` (20)

       | `"ArrowLeft"` [1]
       | The left arrow key.
       | `VK_LEFT` (0x25)
       | `kVK_LeftArrow` (0x7B)
       |
        `GDK_KEY_Left` (0xFF51)`GDK_KEY_KP_Left`
        (0xFF96)`Qt::Key_Left` (0x01000012)

       | `KEYCODE_DPAD_LEFT` (21)

       | `"ArrowRight"` [1]
       | The right arrow key.
       | `VK_RIGHT` (0x27)
       | `kVK_RightArrow` (0x7C)
       |
        `GDK_KEY_Right` (0xFF53)`GDK_KEY_KP_Right`
        (0xFF98)`Qt::Key_Right` (0x01000014)

       | `KEYCODE_DPAD_RIGHT` (22)

       | `"ArrowUp"` [1]
       | The up arrow key.
       | `VK_UP` (0x26)
       | `kVK_UpArrow` (0x7E)
       |
        `GDK_KEY_Up` (0xFF52)`GDK_KEY_KP_Up`
        (0xFF97)`Qt::Key_Up` (0x01000013)

       | `KEYCODE_DPAD_UP` (19)

       | `"End"`
       | The `End` key. Moves to the end of content.
       | `VK_END` (0x23)
       | `kVK_End` (0x77)
       |
        `GDK_KEY_End` (0xFF57)`GDK_KEY_KP_End`
        (0xFF9C)`Qt::Key_End` (0x01000011)

       | `KEYCODE_MOVE_END` (123)

       | `"Home"`
       | The `Home` key. Moves to the start of content.
       | `VK_HOME` (0x24)
       | `kVK_Home` (0x73)
       |
        `GDK_KEY_Home` (0xFF50)`GDK_KEY_KP_Home`
        (0xFF95)`Qt::Key_Home` (0x01000010)

       | `KEYCODE_MOVE_HOME` (122)

       | `"PageDown"`
       |
        The `Page Down` (or `PgDn`) key. Scrolls down or
        displays the next page of content.

       | `VK_NEXT` (0x22)
       | `kVK_PageDown` (0x79)
       |
        `GDK_KEY_Page_Down` (0xFF56)<code
          >GDK_KEY_KP_Page_Down</code
        >
        (0xFF9B)`Qt::Key_PageDown` (0x01000017)

       | `KEYCODE_PAGE_DOWN` (93)

       | `"PageUp"`
       |
        The `Page Up` (or `PgUp`) key. Scrolls up or displays
        the previous page of content.

       | `VK_PRIOR` (0x21)
       | `kVK_PageUp` (0x74)
       |
        `GDK_KEY_Page_Up` (0xFF55)<code
          >GDK_KEY_KP_Page_Up</code
        >
        (0xFF9A)`Qt::Key_PageUp` (0x01000016)

       | `KEYCODE_PAGE_UP` (92)

\[1] Edge (16 and earlier) and Firefox (36 and earlier) use `"Left"`, `"Right"`, `"Up"`, and `"Down"` instead of `"ArrowLeft"`, `"ArrowRight"`, `"ArrowUp"`, and `"ArrowDown"`.

## Editing keys

       | `KeyboardEvent.key` Value
       | Description
       | Virtual Keycode

       | Windows
       | Mac
       | Linux
       | Android

       | `"Backspace"`
       |
        The `Backspace` key. This key is labeled `Delete` on
        Mac keyboards.

       | `VK_BACK` (0x08)
       | `kVK_Delete` (0x33)
       |
        `GDK_KEY_BackSpace` (0xFF08)<code
          >Qt::Key_Backspace</code
        >
        (0x01000003)

       | `KEYCODE_DEL` (67)

       | `"Clear"`
       | The `Clear` key. Removes the currently selected input.
       |
        `VK_CLEAR` (0x0C)`VK_OEM_CLEAR` (0xFE)

       | `kVK_ANSI_KeypadClear` (0x47)
       |
        `GDK_KEY_Clear` (0xFF0B)`Qt::Key_Clear`
        (0x0100000B)

       | `KEYCODE_CLEAR` (28)

       | `"Copy"`
       | The `Copy` key (on certain extended keyboards).
       | `APPCOMMAND_COPY`
       |
       |
        `GDK_KEY_Copy` (0x1008FF57)`Qt::Key_Copy`
        (0x010000CF)

       |

       | `"CrSel"` [3]
       | The Cursor Select key, `CrSel`.
       | `VK_CRSEL` (0xF7)
       |
       | `GDK_KEY_3270_CursorSelect` (0xFD1C)
       |

       | `"Cut"`
       | The `Cut` key (on certain extended keyboards).
       | `APPCOMMAND_CUT`
       |
       |
        `GDK_KEY_Cut` (0x1008FF58)`Qt::Key_Cut`
        (0x010000D0)

       |

       | `"Delete"` [2]
       | The Delete key, `Del`.
       | `VK_DELETE` (0x2E)
       | `kVK_ForwardDelete` (0x75) [1]
       |
        `GDK_KEY_Delete` (0xFFFF)`GDK_KEY_KP_Delete`
        (0xFF9F)`Qt::Key_Delete` (0x01000007)

       | `KEYCODE_FORWARD_DEL` (112)

       | `"EraseEof"`
       |
        Erase to End of Field. Deletes all characters from the current cursor
        position to the end of the current field.

       | `VK_EREOF` (0xF9)
       |
       | `GDK_KEY_3270_ExSelect` (0xFD1B)
       |

       | `"ExSel"` [4]
       | The `ExSel` (Extend Selection) key.
       | `VK_EXSEL` (0xF8)
       |
       | `GDK_KEY_3270_ExSelect` (0xFD1B)
       |

       | `"Insert"`
       |
        The Insert key, `Ins`. Toggles between inserting and
        overwriting text.

       | `VK_INSERT` (0x2D)
       |
       |
        `GDK_KEY_Insert` (0xFF63)`GDK_KEY_KP_Insert`
        (0xFF9E)`Qt::Key_Insert` (0x01000006)

       | `KEYCODE_INSERT` (124)

       | `"Paste"`
       | Paste from the clipboard.
       | `APPCOMMAND_PASTE`
       |
       |
        `GDK_KEY_Paste` (0x1008FF6D)`Qt::Key_Paste`
        (0x010000E2)

       |

       | `"Redo"`
       | Redo the last action.
       | `APPCOMMAND_REDO`
       |
       | `GDK_KEY_Redo` (0xFF66)
       |

       | `"Undo"`
       | Undo the last action.
       | `APPCOMMAND_UNDO`
       |
       | `GDK_KEY_Undo` (0xFF65)
       |

\[1] On keyboards without a dedicated `Del` key, the Mac generates the `"Delete"` value when `Fn` is pressed in tandem with `Delete` (which is `Backspace` on other platforms).

\[2] Firefox 36 and earlier uses `"Del"` instead of `"Delete"` for the `Del` key.

\[3] Firefox 36 and earlier generates the value `"Crsel"` instead of `"CrSel"` when the `CrSel` key is pressed.

\[4] Firefox 36 and earlier generates the value `"Exsel"` instead of `"ExSel"` when the `ExSel` key is pressed.
