---
title: "Key values for keyboard events (part 4 of 8)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ui_events/keyboard_event_key_values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Key values for keyboard events (part 4 of 8)

### Dead keycodes for Linux

Linux generates accented characters using special **dead keys**. _Dead keys_ are keys which are pressed in combination with character keys to generate accented forms of those characters. You can identify which specific dead key was used (if more than one exists) by examining the `KeyboardEvent`'s associated `compositionupdate` event's `data` property.

You can find a table of the dead keys and the characters they can be used with to generate accented or otherwise special characters on Linux using GTK.

The value of `data` will be one of the following:

       |
        `CompositionEvent.data` value

       | Symbol
       | Comments

       |
        `GDK_KEY_dead_grave` (0xFE50)<code
          >Qt::Key_Dead_Grave</code
        >
        (0x01001250)

       | `
       |

       |
        `GDK_KEY_dead_acute` (0xFE51)<code
          >Qt::Key_Dead_Acute</code
        >
        (0x01001251)

       | ´
       |

       |
        `GDK_KEY_dead_circumflex` (0xFE52)<code
          >Qt::Key_Dead_Circumflex</code
        >
        (0x01001252)

       | ˆ
       |

       |
        `GDK_KEY_dead_tilde` (0xFE53)<code
          >Qt::Key_Dead_Tilde</code
        >
        (0x01001253)

       | ˜
       |

       | `GDK_KEY_dead_perispomeni` (0xFE53)
       |  ͂
       |

       |
        `GDK_KEY_dead_macron` (0xFE54)<code
          >Qt::Key_Dead_Macron</code
        >
        (0x01001254)

       | ¯
       |

       |
        `GDK_KEY_dead_breve` (0xFE55)<code
          >Qt::Key_Dead_Breve</code
        >
        (0x01001255)

       | ˘
       |

       |
        `GDK_KEY_dead_abovedot` (0xFE56)<code
          >Qt::Key_Dead_Abovedot</code
        >
        (0x01001256)

       | ˙
       |

       |
        `GDK_KEY_dead_diaeresis` (0xFE57)<code
          >Qt::Key_Dead_Diaeresis</code
        >
        (0x01001257)

       | ¨
       | Also called an umlaut.

       |
        `GDK_KEY_dead_abovering` (0xFE58)<code
          >Qt::Key_Dead_Abovering</code
        >
        (0x01001258)

       | ˚
       |

       |
        `GDK_KEY_dead_doubleacute` (0xFE59)<code
          >Qt::Key_Dead_Doubleacute</code
        >
        (0x01001259)

       | ˝
       |

       |
        `GDK_KEY_dead_caron` (0xFE5A)<code
          >Qt::Key_Dead_Caron</code
        >
        (0x0100125A)

       | ˇ
       | Also called a háček; used in Czech among other languages.

       |
        `GDK_KEY_dead_cedilla` (0xFE5B)<code
          >Qt::Key_Dead_Cedilla</code
        >
        (0x0100125B)

       | ¸
       |

       |
        `GDK_KEY_dead_ogonek` (0xFE5C)<code
          >Qt::Key_Dead_Ogonek</code
        >
        (0x0100125C)

       | ˛
       | Also called a nosinė; used in Polish and Old Irish.

       |
        `GDK_KEY_dead_iota` (0xFE5D)<code
          >Qt::Key_Dead_Iota</code
        >
        (0x0100125D)

       |  ͅ
       | Iota subscript.

       |
        `GDK_KEY_dead_voiced_sound` (0xFE5E)<code
          >Qt::Key_Dead_Voiced_Sound</code
        >
        (0x0100125E)

       | ゙
       |

       |
        `GDK_KEY_dead_semivoiced_sound` (0xFE5F)<code
          >Qt::Key_Dead_Semivoiced_Sound</code
        >
        (0x0100125F)

       | ゚
       |

       |
        `GDK_KEY_dead_belowdot` (0xFE60)<code
          >Qt::Key_Dead_Belowdot</code
        >
        (0x01001260)

       | ̣̣
       |

       |
        `GDK_KEY_dead_hook` (0xFE61)<code
          >Qt::Key_Dead_Hook</code
        >
        (0x01001261)

       |   ̡
       |

       |
        `GDK_KEY_dead_horn` (0xFE62)<code
          >Qt::Key_Dead_Horn</code
        >
        (0x01001262)

       |  ̛
       |

       | `GDK_KEY_dead_stroke` (0xFE63)
       |  ̶̶
       |

       | `GDK_KEY_dead_abovecomma` (0xFE64)
       |  ̓̓
       |

       | `GDK_KEY_dead_psili` (0xFE64)
       |  ᾿
       |

       | `GDK_KEY_dead_abovereversedcomma` (0xFE65)
       | ʽ
       |

       | `GDK_KEY_dead_dasia` (0xFE65)
       | ῾
       |

       | `GDK_KEY_dead_doublegrave` (0xFE66)
       |  ̏
       |

       | `GDK_KEY_dead_belowring` (0xFE67)
       | ˳
       |

       | `GDK_KEY_dead_belowmacron` (0xFE68)
       |  ̱
       |

       | `GDK_KEY_dead_belowcircumflex` (0xFE69)
       | ꞈ
       |

       | `GDK_KEY_dead_belowtilde` (0xFE6A)
       | ̰
       |

       | `GDK_KEY_dead_belowbreve` (0xFE6B)
       | ̮
       |

       | `GDK_KEY_dead_belowdiaeresis` (0xFE6C)
       |  ̤
       |

       | `GDK_KEY_dead_invertedbreve` (0xFE6D)
       | ̯
       |

       | `GDK_KEY_dead_belowcomma` (0xFE6E)
       | ̦
       |

       | `GDK_KEY_dead_currency` (0xFE6F)
       |
       |

       | `GDK_KEY_dead_a` (0xFE80)
       |
       |

       | `GDK_KEY_dead_A` (0xFE81)
       |
       |

       | `GDK_KEY_dead_e` (0xFE82)
       |
       |

       | `GDK_KEY_dead_E` (0xFE83)
       |
       |

       | `GDK_KEY_dead_i` (0xFE84)
       |
       |

       | `GDK_KEY_dead_I` (0xFE85)
       |
       |

       | `GDK_KEY_dead_o` (0xFE86)
       |
       |

       | `GDK_KEY_dead_O` (0xFE87)
       |
       |

       | `GDK_KEY_dead_u` (0xFE88)
       |
       |

       | `GDK_KEY_dead_U` (0xFE89)
       |
       |

       | `GDK_KEY_dead_small_schwa` (0xFE8A)
       | ə
       |

       | `GDK_KEY_dead_capital_schwa` (0xFE8B)
       | Ə
       |

       | `GDK_KEY_dead_greek` (0xFE8C)
       |
       |

## Function keys

While various platforms support different numbers of the general-purpose function keys, such as `F1`–`F12` (or `F1`–`F10`, or `F1`–`F15`, etc.), the first few are specifically defined as follows.

If more function keys are available, their names continue the pattern here by continuing to increment the numeric portion of each key's name, so that, for example, `"F24"` is a valid key value.

       | `KeyboardEvent.key` value
       | Description
       | Virtual Keycode

       | Windows
       | Mac
       | Linux
       | Android

       | `"F1"`
       | The first general-purpose function key, `F1`.
       | `VK_F1` (0x70)
       | `kVK_F1` (0x7A)
       |
        `GDK_KEY_F1` (0xFFBE)`GDK_KEY_KP_F1`
        (0xFF91)`Qt::Key_F1` (0x01000030)

       | `KEYCODE_F1` (131)

       | `"F2"`
       | The `F2` key.
       | `VK_F2` (0x71)
       | `kVK_F2` (0x78)
       |
        `GDK_KEY_F2` (0xFFBF)`GDK_KEY_KP_F2`
        (0xFF92)`Qt::Key_F2` (0x01000031)

       | `KEYCODE_F2` (132)

       | `"F3"`
       | The `F3` key.
       | `VK_F3` (0x72)
       | `kVK_F3` (0x63)
       |
        `GDK_KEY_F3` (0xFFC0)`GDK_KEY_KP_F3`
        (0xFF93)`Qt::Key_F3` (0x01000032)

       | `KEYCODE_F3` (133)

       | `"F4"`
       | The `F4` key.
       | `VK_F4` (0x73)
       | `kVK_F4` (0x76)
       |
        `GDK_KEY_F4` (0xFFC1)`GDK_KEY_KP_F4`
        (0xFF94)`Qt::Key_F4` (0x01000033)

       | `KEYCODE_F4` (134)

       | `"F5"`
       | The `F5` key.
       | `VK_F5` (0x74)
       | `kVK_F5` (0x60)
       |
        `GDK_KEY_F5` (0xFFC2)`Qt::Key_F5`
        (0x01000034)

       | `KEYCODE_F5` (135)

       | `"F6"`
       | The `F6` key.
       | `VK_F6` (0x75)
       | `kVK_F6` (0x61)
       |
        `GDK_KEY_F6` (0xFFC3)`Qt::Key_F6`
        (0x01000035)

       | `KEYCODE_F6` (136)

       | `"F7"`
       | The `F7` key.
       | `VK_F7` (0x76)
       | `kVK_F7` (0x62)
       |
        `GDK_KEY_F7` (0xFFC4)`Qt::Key_F7`
        (0x01000036)

       | `KEYCODE_F7` (137)

       | `"F8"`
       | The `F8` key.
       | `VK_F8` (0x77)
       | `kVK_F8` (0x64)
       |
        `GDK_KEY_F8` (0xFFC5)`Qt::Key_F8`
        (0x01000037)

       | `KEYCODE_F8` (138)

       | `"F9"`
       | The `F9` key.
       | `VK_F9` (0x78)
       | `kVK_F9` (0x65)
       |
        `GDK_KEY_F9` (0xFFC6)`Qt::Key_F9`
        (0x01000038)

       | `KEYCODE_F9` (139)

       | `"F10"`
       | The `F10` key.
       | `VK_F10` (0x79)
       | `kVK_F10` (0x6D)
       |
        `GDK_KEY_F10` (0xFFC7)`Qt::Key_F10`
        (0x01000039)

       | `KEYCODE_F10` (140)

       | `"F11"`
       | The `F11` key.
       | `VK_F11` (0x7A)
       | `kVK_F11` (0x67)
       |
        `GDK_KEY_F11` (0xFFC8)`Qt::Key_F11`
        (0x0100003A)

       | `KEYCODE_F11` (141)

       | `"F12"`
       | The `F12` key.
       | `VK_F12` (0x7B)
       | `kVK_F12` (0x6F)
       |
        `GDK_KEY_F12` (0xFFC9)`Qt::Key_F12`
        (0x0100003B)

       | `KEYCODE_F12` (142)

       | `"F13"`
       | The `F13` key.
       | `VK_F13` (0x7C)
       | `kVK_F13` (0x69)
       |
        `GDK_KEY_F13` (0xFFCA)`Qt::Key_F13`
        (0x0100003C)

       | `KEYCODE_F13`

       | `"F14"`
       | The `F14` key.
       | `VK_F14` (0x7D)
       | `kVK_F14` (0x6B)
       |
        `GDK_KEY_F14` (0xFFCB)`Qt::Key_F14`
        (0x0100003D)

       | `KEYCODE_F14`

       | `"F15"`
       | The `F15` key.
       | `VK_F15` (0x7E)
       | `kVK_F15` (0x71)
       |
        `GDK_KEY_F15` (0xFFCC)`Qt::Key_F15`
        (0x0100003E)

       | `KEYCODE_F15`

       | `"F16"`
       | The `F16` key.
       | `VK_F16` (0x7F)
       | `kVK_F16` (0x6A)
       |
        `GDK_KEY_F16` (0xFFCD)`Qt::Key_F16`
        (0x0100003F)

       | `KEYCODE_F16`

       | `"F17"`
       | The `F17` key.
       | `VK_F17` (0x80)
       | `kVK_F17` (0x40)
       |
        `GDK_KEY_F17` (0xFFCE)`Qt::Key_F17`
        (0x01000040)

       | `KEYCODE_F17`

       | `"F18"`
       | The `F18` key.
       | `VK_F18` (0x81)
       | `kVK_F18` (0x4F)
       |
        `GDK_KEY_F18` (0xFFCF)`Qt::Key_F18`
        (0x01000041)

       | `KEYCODE_F18`

       | `"F19"`
       | The `F19` key.
       | `VK_F19` (0x82)
       | `kVK_F19` (0x50)
       |
        `GDK_KEY_F19` (0xFFD0)`Qt::Key_F19`
        (0x01000042)

       | `KEYCODE_F19`

       | `"F20"`
       | The `F20` key.
       | `VK_F20` (0x83)
       | `kVK_F20` (0x5A)
       |
        `GDK_KEY_F20` (0xFFD1)`Qt::Key_F20`
        (0x01000043)

       | `KEYCODE_F20`

       | `"Soft1"`
       | The first general-purpose virtual function key.
       |
       |
       | `Qt::Key_Context1` (0x01100000)
       |

       | `"Soft2"`
       | The second general-purpose virtual function key.
       |
       |
       | `Qt::Key_Context2` (0x01100001)
       |

       | `"Soft3"`
       | The third general-purpose virtual function key.
       |
       |
       | `Qt::Key_Context3` (0x01100002)
       |

       | `"Soft4"`
       | The fourth general-purpose virtual function key.
       |
       |
       | `Qt::Key_Context4` (0x01100003)
       |

## Phone keys

These keys represent buttons which commonly exist on modern smartphones.

       | `KeyboardEvent.key` Value
       | Description
       | Virtual Keycode

       | Windows
       | Mac
       | Linux
       | Android

       | `"AppSwitch"`
       |
        Presents a list of recently-used applications which lets the user change
        apps quickly.

       |
       |
       |
       | `KEYCODE_APP_SWITCH` (187)

       | `"Call"`
       | The `Call` key. Dials the number which has been entered.
       |
       |
       | `Qt::Key_Call` (0x01100004)
       | `KEYCODE_CALL` (5)

       | `"Camera"`
       | The `Camera` key. Activates the camera.
       |
       |
       | `Qt::Key_Camera` (0x01100020)
       | `KEYCODE_CAMERA` (27)

       | `"CameraFocus"`
       | The `Focus` key. Focuses the camera.
       |
       |
       | `Qt::Key_CameraFocus` (0x01100021)
       | `KEYCODE_FOCUS` (80)

       | `"EndCall"`
       | The `End Call` or `Hang Up` button.
       |
       |
       | `Qt::Key_Hangup` (0x01100005)
       | `KEYCODE_ENDCALL` (6)

       | `"GoBack"`
       | The `Back` button.
       |
       |
       |
       | `KEYCODE_BACK` (4)

       | `"GoHome"` [1]
       |
        The `Home` button. Returns the user to the phone's main screen
        (usually an application launcher).

       |
       |
       |
       | `KEYCODE_HOME` (3)

       | `"HeadsetHook"`
       |
        The `Headset Hook` key. This is typically actually a button on
        the headset which is used to hang up calls and play or pause media.

       |
       |
       | `Qt::Key_ToggleCallHangup` (0x01100007)
       | `KEYCODE_HEADSETHOOK` (79)

       | `"LastNumberRedial"`
       | The `Redial` button. Redials the last-called number.
       |
       |
       | `Qt::Key_LastNumberRedial` (0x01100009)
       |

       | `"Notification"`
       | The `Notification` key.
       |
       |
       |
       | `KEYCODE_NOTIFICATION` (83)

       | `"MannerMode"`
       |
        A button which cycles among the notification modes: silent, vibrate,
        ring, and so forth.

       |
       |
       |
       | `KEYCODE_MANNER_MODE` (205)

       | `"VoiceDial"`
       | The `Voice Dial` key. Initiates voice dialing.
       |
       |
       | `Qt::Key_VoiceDial` (0x01100008)
       | `KEYCODE_VOICE_ASSIST` (231)

\[1] Prior to Firefox 37, the Home button generated a key code of `"Exit"`. Starting in Firefox 37, the button generates the key code `"MozHomeScreen"`.
