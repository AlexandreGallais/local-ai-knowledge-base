---
title: "KeyboardEvent: keyCode property (part 7 of 8)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboardevent/keycode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# KeyboardEvent: keyCode property (part 7 of 8)

## Constants for keyCode value

Gecko defines a lot of `keyCode` values in `KeyboardEvent` for making the mapping table explicitly. These values are useful for add-on developers of Firefox, but not so useful in public web pages.

       | Constant
       | Value
       | Description

       | `DOM_VK_CANCEL`
       | 0x03 (3)
       | Cancel key.

       | `DOM_VK_HELP`
       | 0x06 (6)
       | Help key.

       | `DOM_VK_BACK_SPACE`
       | 0x08 (8)
       | Backspace key.

       | `DOM_VK_TAB`
       | 0x09 (9)
       | Tab key.

       | `DOM_VK_CLEAR`
       | 0x0C (12)
       |
        "5" key on Numpad when NumLock is unlocked. Or on Mac, clear key which
        is positioned at NumLock key.

       | `DOM_VK_RETURN`
       | 0x0D (13)
       | Return/enter key on the main keyboard.

       | `DOM_VK_ENTER`
       | 0x0E (14)
       |
        Reserved, but not used. (deprecated) (Dropped, see
        Firefox bug 969247.)

       | `DOM_VK_SHIFT`
       | 0x10 (16)
       | Shift key.

       | `DOM_VK_CONTROL`
       | 0x11 (17)
       | Control key.

       | `DOM_VK_ALT`
       | 0x12 (18)
       | Alt (Option on Mac) key.

       | `DOM_VK_PAUSE`
       | 0x13 (19)
       | Pause key.

       | `DOM_VK_CAPS_LOCK`
       | 0x14 (20)
       | Caps lock.

       | `DOM_VK_KANA`
       | 0x15 (21)
       | Linux support for this keycode was added in Gecko 4.0.

       | `DOM_VK_HANGUL`
       | 0x15 (21)
       | Linux support for this keycode was added in Gecko 4.0.

       | `DOM_VK_EISU`
       | 0x 16 (22)
       | "英数" key on Japanese Mac keyboard.

       | `DOM_VK_JUNJA`
       | 0x17 (23)
       | Linux support for this keycode was added in Gecko 4.0.

       | `DOM_VK_FINAL`
       | 0x18 (24)
       | Linux support for this keycode was added in Gecko 4.0.

       | `DOM_VK_HANJA`
       | 0x19 (25)
       | Linux support for this keycode was added in Gecko 4.0.

       | `DOM_VK_KANJI`
       | 0x19 (25)
       | Linux support for this keycode was added in Gecko 4.0.

       | `DOM_VK_ESCAPE`
       | 0x1B (27)
       | Escape key.

       | `DOM_VK_CONVERT`
       | 0x1C (28)
       | Linux support for this keycode was added in Gecko 4.0.

       | `DOM_VK_NONCONVERT`
       | 0x1D (29)
       | Linux support for this keycode was added in Gecko 4.0.

       | `DOM_VK_ACCEPT`
       | 0x1E (30)
       | Linux support for this keycode was added in Gecko 4.0.

       | `DOM_VK_MODECHANGE`
       | 0x1F (31)
       | Linux support for this keycode was added in Gecko 4.0.

       | `DOM_VK_SPACE`
       | 0x20 (32)
       | Space bar.

       | `DOM_VK_PAGE_UP`
       | 0x21 (33)
       | Page Up key.

       | `DOM_VK_PAGE_DOWN`
       | 0x22 (34)
       | Page Down key.

       | `DOM_VK_END`
       | 0x23 (35)
       | End key.

       | `DOM_VK_HOME`
       | 0x24 (36)
       | Home key.

       | `DOM_VK_LEFT`
       | 0x25 (37)
       | Left arrow.

       | `DOM_VK_UP`
       | 0x26 (38)
       | Up arrow.

       | `DOM_VK_RIGHT`
       | 0x27 (39)
       | Right arrow.

       | `DOM_VK_DOWN`
       | 0x28 (40)
       | Down arrow.

       | `DOM_VK_SELECT`
       | 0x29 (41)
       | Linux support for this keycode was added in Gecko 4.0.

       | `DOM_VK_PRINT`
       | 0x2A (42)
       | Linux support for this keycode was added in Gecko 4.0.

       | `DOM_VK_EXECUTE`
       | 0x2B (43)
       | Linux support for this keycode was added in Gecko 4.0.

       | `DOM_VK_PRINTSCREEN`
       | 0x2C (44)
       | Print Screen key.

       | `DOM_VK_INSERT`
       | 0x2D (45)
       | Ins(ert) key.

       | `DOM_VK_DELETE`
       | 0x2E (46)
       | Del(ete) key.

       | `DOM_VK_0`
       | 0x30 (48)
       | "0" key in standard key location.

       | `DOM_VK_1`
       | 0x31 (49)
       | "1" key in standard key location.

       | `DOM_VK_2`
       | 0x32 (50)
       | "2" key in standard key location.

       | `DOM_VK_3`
       | 0x33 (51)
       | "3" key in standard key location.

       | `DOM_VK_4`
       | 0x34 (52)
       | "4" key in standard key location.

       | `DOM_VK_5`
       | 0x35 (53)
       | "5" key in standard key location.

       | `DOM_VK_6`
       | 0x36 (54)
       | "6" key in standard key location.

       | `DOM_VK_7`
       | 0x37 (55)
       | "7" key in standard key location.

       | `DOM_VK_8`
       | 0x38 (56)
       | "8" key in standard key location.

       | `DOM_VK_9`
       | 0x39 (57)
       | "9" key in standard key location.

       | `DOM_VK_COLON`
       | 0x3A (58)
       | Colon (":") key.

       | `DOM_VK_SEMICOLON`
       | 0x3B (59)
       | Semicolon (";") key.

       | `DOM_VK_LESS_THAN`
       | 0x3C (60)
       | Less-than ("&#x3C;") key.

       | `DOM_VK_EQUALS`
       | 0x3D (61)
       | Equals ("=") key.

       | `DOM_VK_GREATER_THAN`
       | 0x3E (62)
       | Greater-than (">") key.

       | `DOM_VK_QUESTION_MARK`
       | 0x3F (63)
       | Question mark ("?") key.

       | `DOM_VK_AT`
       | 0x40 (64)
       | At sign ("@") key.

       | `DOM_VK_A`
       | 0x41 (65)
       | "A" key.

       | `DOM_VK_B`
       | 0x42 (66)
       | "B" key.

       | `DOM_VK_C`
       | 0x43 (67)
       | "C" key.

       | `DOM_VK_D`
       | 0x44 (68)
       | "D" key.

       | `DOM_VK_E`
       | 0x45 (69)
       | "E" key.

       | `DOM_VK_F`
       | 0x46 (70)
       | "F" key.

       | `DOM_VK_G`
       | 0x47 (71)
       | "G" key.

       | `DOM_VK_H`
       | 0x48 (72)
       | "H" key.

       | `DOM_VK_I`
       | 0x49 (73)
       | "I" key.

       | `DOM_VK_J`
       | 0x4A (74)
       | "J" key.

       | `DOM_VK_K`
       | 0x4B (75)
       | "K" key.

       | `DOM_VK_L`
       | 0x4C (76)
       | "L" key.

       | `DOM_VK_M`
       | 0x4D (77)
       | "M" key.

       | `DOM_VK_N`
       | 0x4E (78)
       | "N" key.

       | `DOM_VK_O`
       | 0x4F (79)
       | "O" key.

       | `DOM_VK_P`
       | 0x50 (80)
       | "P" key.

       | `DOM_VK_Q`
       | 0x51 (81)
       | "Q" key.

       | `DOM_VK_R`
       | 0x52 (82)
       | "R" key.

       | `DOM_VK_S`
       | 0x53 (83)
       | "S" key.

       | `DOM_VK_T`
       | 0x54 (84)
       | "T" key.

       | `DOM_VK_U`
       | 0x55 (85)
       | "U" key.

       | `DOM_VK_V`
       | 0x56 (86)
       | "V" key.

       | `DOM_VK_W`
       | 0x57 (87)
       | "W" key.

       | `DOM_VK_X`
       | 0x58 (88)
       | "X" key.

       | `DOM_VK_Y`
       | 0x59 (89)
       | "Y" key.

       | `DOM_VK_Z`
       | 0x5A (90)
       | "Z" key.

       | `DOM_VK_WIN`
       | 0x5B (91)
       | Windows logo key on Windows. Or Super or Hyper key on Linux.

       | `DOM_VK_CONTEXT_MENU`
       | 0x5D (93)
       | Opening context menu key.

       | `DOM_VK_SLEEP`
       | 0x5F (95)
       | Linux support for this keycode was added in Gecko 4.0.

       | `DOM_VK_NUMPAD0`
       | 0x60 (96)
       | "0" on the numeric keypad.

       | `DOM_VK_NUMPAD1`
       | 0x61 (97)
       | "1" on the numeric keypad.

       | `DOM_VK_NUMPAD2`
       | 0x62 (98)
       | "2" on the numeric keypad.

       | `DOM_VK_NUMPAD3`
       | 0x63 (99)
       | "3" on the numeric keypad.

       | `DOM_VK_NUMPAD4`
       | 0x64 (100)
       | "4" on the numeric keypad.

       | `DOM_VK_NUMPAD5`
       | 0x65 (101)
       | "5" on the numeric keypad.

       | `DOM_VK_NUMPAD6`
       | 0x66 (102)
       | "6" on the numeric keypad.

       | `DOM_VK_NUMPAD7`
       | 0x67 (103)
       | "7" on the numeric keypad.

       | `DOM_VK_NUMPAD8`
       | 0x68 (104)
       | "8" on the numeric keypad.

       | `DOM_VK_NUMPAD9`
       | 0x69 (105)
       | "9" on the numeric keypad.

       | `DOM_VK_MULTIPLY`
       | 0x6A (106)
       | "*" on the numeric keypad.

       | `DOM_VK_ADD`
       | 0x6B (107)
       | "+" on the numeric keypad.

       | `DOM_VK_SEPARATOR`
       | 0x6C (108)
       |

       | `DOM_VK_SUBTRACT`
       | 0x6D (109)
       | "-" on the numeric keypad.

       | `DOM_VK_DECIMAL`
       | 0x6E (110)
       | Decimal point on the numeric keypad.

       | `DOM_VK_DIVIDE`
       | 0x6F (111)
       | "/" on the numeric keypad.

       | `DOM_VK_F1`
       | 0x70 (112)
       | F1 key.

       | `DOM_VK_F2`
       | 0x71 (113)
       | F2 key.

       | `DOM_VK_F3`
       | 0x72 (114)
       | F3 key.

       | `DOM_VK_F4`
       | 0x73 (115)
       | F4 key.

       | `DOM_VK_F5`
       | 0x74 (116)
       | F5 key.

       | `DOM_VK_F6`
       | 0x75 (117)
       | F6 key.

       | `DOM_VK_F7`
       | 0x76 (118)
       | F7 key.

       | `DOM_VK_F8`
       | 0x77 (119)
       | F8 key.

       | `DOM_VK_F9`
       | 0x78 (120)
       | F9 key.

       | `DOM_VK_F10`
       | 0x79 (121)
       | F10 key.

       | `DOM_VK_F11`
       | 0x7A (122)
       | F11 key.

       | `DOM_VK_F12`
       | 0x7B (123)
       | F12 key.

       | `DOM_VK_F13`
       | 0x7C (124)
       | F13 key.

       | `DOM_VK_F14`
       | 0x7D (125)
       | F14 key.

       | `DOM_VK_F15`
       | 0x7E (126)
       | F15 key.

       | `DOM_VK_F16`
       | 0x7F (127)
       | F16 key.

       | `DOM_VK_F17`
       | 0x80 (128)
       | F17 key.

       | `DOM_VK_F18`
       | 0x81 (129)
       | F18 key.

       | `DOM_VK_F19`
       | 0x82 (130)
       | F19 key.

       | `DOM_VK_F20`
       | 0x83 (131)
       | F20 key.

       | `DOM_VK_F21`
       | 0x84 (132)
       | F21 key.

       | `DOM_VK_F22`
       | 0x85 (133)
       | F22 key.

       | `DOM_VK_F23`
       | 0x86 (134)
       | F23 key.

       | `DOM_VK_F24`
       | 0x87 (135)
       | F24 key.

       | `DOM_VK_NUM_LOCK`
       | 0x90 (144)
       | Num Lock key.

       | `DOM_VK_SCROLL_LOCK`
       | 0x91 (145)
       | Scroll Lock key.

       | `DOM_VK_WIN_OEM_FJ_JISHO`
       | 0x92 (146)
       |
        An
        OEM specific key on Windows.
        This was used for "Dictionary" key on Fujitsu OASYS.

       | `DOM_VK_WIN_OEM_FJ_MASSHOU`
       | 0x93 (147)
       |
        An
        OEM specific key on Windows.
        This was used for "Unregister word" key on Fujitsu OASYS.

       | `DOM_VK_WIN_OEM_FJ_TOUROKU`
       | 0x94 (148)
       |
        An
        OEM specific key on Windows.
        This was used for "Register word" key on Fujitsu OASYS.

       | `DOM_VK_WIN_OEM_FJ_LOYA`
       | 0x95 (149)
       |
        An
        OEM specific key on Windows.
        This was used for "Left OYAYUBI" key on Fujitsu OASYS.

       | `DOM_VK_WIN_OEM_FJ_ROYA`
       | 0x96 (150)
       |
        An
        OEM specific key on Windows.
        This was used for "Right OYAYUBI" key on Fujitsu OASYS.

       | `DOM_VK_CIRCUMFLEX`
       | 0xA0 (160)
       | Circumflex ("^") key.

       | `DOM_VK_EXCLAMATION`
       | 0xA1 (161)
       | Exclamation ("!") key.

       | `DOM_VK_DOUBLE_QUOTE`
       | 0xA2 (162)
       | Double quote (""") key.

       | `DOM_VK_HASH`
       | 0xA3 (163)
       | Hash ("#") key.

       | `DOM_VK_DOLLAR`
       | 0xA4 (164)
       | Dollar sign ("$") key.

       | `DOM_VK_PERCENT`
       | 0xA5 (165)
       | Percent ("%") key.

       | `DOM_VK_AMPERSAND`
       | 0xA6 (166)
       | Ampersand ("&#x26;") key.

       | `DOM_VK_UNDERSCORE`
       | 0xA7 (167)
       | Underscore ("_") key.

       | `DOM_VK_OPEN_PAREN`
       | 0xA8 (168)
       | Open parenthesis ("(") key.

       | `DOM_VK_CLOSE_PAREN`
       | 0xA9 (169)
       | Close parenthesis (")") key.

       | `DOM_VK_ASTERISK`
       | 0xAA (170)
       | Asterisk ("*") key.

       | `DOM_VK_PLUS`
       | 0xAB (171)
       | Plus ("+") key.

       | `DOM_VK_PIPE`
       | 0xAC (172)
       | Pipe ("|") key.

       | `DOM_VK_HYPHEN_MINUS`
       | 0xAD (173)
       | Hyphen-US/docs/Minus ("-") key.

       | `DOM_VK_OPEN_CURLY_BRACKET`
       | 0xAE (174)
       | Open curly bracket ("{") key.

       | `DOM_VK_CLOSE_CURLY_BRACKET`
       | 0xAF (175)
       | Close curly bracket ("}") key.

       | `DOM_VK_TILDE`
       | 0xB0 (176)
       | Tilde ("~") key.

       | `DOM_VK_VOLUME_MUTE`
       | 0xB5 (181)
       | Audio mute key.

       | `DOM_VK_VOLUME_DOWN`
       | 0xB6 (182)
       | Audio volume down key

       | `DOM_VK_VOLUME_UP`
       | 0xB7 (183)
       | Audio volume up key

       | `DOM_VK_COMMA`
       | 0xBC (188)
       | Comma (",") key.

       | `DOM_VK_PERIOD`
       | 0xBE (190)
       | Period (".") key.

       | `DOM_VK_SLASH`
       | 0xBF (191)
       | Slash ("/") key.

       | `DOM_VK_BACK_QUOTE`
       | 0xC0 (192)
       | Back tick ("`") key.

       | `DOM_VK_OPEN_BRACKET`
       | 0xDB (219)
       | Open square bracket ("[") key.

       | `DOM_VK_BACK_SLASH`
       | 0xDC (220)
       | Back slash ("\") key.

       | `DOM_VK_CLOSE_BRACKET`
       | 0xDD (221)
       | Close square bracket ("]") key.

       | `DOM_VK_QUOTE`
       | 0xDE (222)
       | Quote (''') key.

       | `DOM_VK_META`
       | 0xE0 (224)
       | Meta key on Linux, Command key on Mac.

       | `DOM_VK_ALTGR`
       | 0xE1 (225)
       | AltGr key (Level 3 Shift key or Level 5 Shift key) on Linux.

       | `DOM_VK_WIN_ICO_HELP`
       | 0xE3 (227)
       |
        An
        OEM specific key on Windows.
        This is (was?) used for Olivetti ICO keyboard.

       | `DOM_VK_WIN_ICO_00`
       | 0xE4 (228)
       |
        An
        OEM specific key on Windows.
        This is (was?) used for Olivetti ICO keyboard.

       | `DOM_VK_WIN_ICO_CLEAR`
       | 0xE6 (230)
       |
        An
        OEM specific key on Windows.
        This is (was?) used for Olivetti ICO keyboard.

       | `DOM_VK_WIN_OEM_RESET`
       | 0xE9 (233)
       |
        An
        OEM specific key on Windows.
        This was used for Nokia/Ericsson's device.

       | `DOM_VK_WIN_OEM_JUMP`
       | 0xEA (234)
       |
        An
        OEM specific key on Windows.
        This was used for Nokia/Ericsson's device.

       | `DOM_VK_WIN_OEM_PA1`
       | 0xEB (235)
       |
        An
        OEM specific key on Windows.
        This was used for Nokia/Ericsson's device.

       | `DOM_VK_WIN_OEM_PA2`
       | 0xEC (236)
       |
        An
        OEM specific key on Windows.
        This was used for Nokia/Ericsson's device.

       | `DOM_VK_WIN_OEM_PA3`
       | 0xED (237)
       |
        An
        OEM specific key on Windows.
        This was used for Nokia/Ericsson's device.

       | `DOM_VK_WIN_OEM_WSCTRL`
       | 0xEE (238)
       |
        An
        OEM specific key on Windows.
        This was used for Nokia/Ericsson's device.

       | `DOM_VK_WIN_OEM_CUSEL`
       | 0xEF (239)
       |
        An
        OEM specific key on Windows.
        This was used for Nokia/Ericsson's device.

       | `DOM_VK_WIN_OEM_ATTN`
       | 0xF0 (240)
       |
        An
        OEM specific key on Windows.
        This was used for Nokia/Ericsson's device.
