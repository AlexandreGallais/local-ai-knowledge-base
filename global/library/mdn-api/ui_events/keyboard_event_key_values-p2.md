---
title: "Key values for keyboard events (part 2 of 8)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ui_events/keyboard_event_key_values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Key values for keyboard events (part 2 of 8)

## UI keys

       | `KeyboardEvent.key` Value
       | Description
       | Virtual Keycode

       | Windows
       | Mac
       | Linux
       | Android

       | `"Accept"`
       |
        The `Accept`, `Commit`, or `OK` key or
        button. Accepts the currently selected option or input method sequence
        conversion.

       | `VK_ACCEPT` (0x1E)
       |
       |
       | `KEYCODE_DPAD_CENTER` (23)

       | `"Again"`
       | The `Again` key. Redoes or repeats a previous action.
       |
       |
       | `GDK_KEY_Redo` (0xFF66)
       |

       | `"Attn"` [4]
       | The `Attn` (Attention) key.
       | `VK_OEM_ATTN` (0xF0)
       |
       | `GDK_KEY_3270_Attn` (0xFD0E)
       |

       | `"Cancel"` [1]
       | The `Cancel` key.
       |
       |
       | `GDK_KEY_Cancel` (0xFF69)
       |

       | `"ContextMenu"` [3]
       |
        Shows the context menu. Typically found between the
        `Windows` (or `OS`) key and the `Control` key
        on the right side of the keyboard.

       | `VK_APPS` (0x5D)
       | `kVK_ContextualMenu` (0x6E)
       |
        `GDK_KEY_Menu` (0xFF67)`Qt::Key_Menu`
        (0x01000055)

       | `KEYCODE_MENU` (82)

       | `"Escape"` [2]
       |
        The `Esc` (Escape) key. Typically used as an exit, cancel, or
        "escape this operation" button. Historically, the Escape character was
        used to signal the start of a special control sequence of characters
        called an "escape sequence."

       | `VK_ESCAPE` (0x1B)
       | `kVK_Escape` (0x35)
       |
        `GDK_KEY_Escape` (0xFF1B)`Qt::Key_Escape`
        (0x01000000)

       | `KEYCODE_ESCAPE` (111)

       | `"Execute"`
       | The `Execute` key.
       | `VK_EXECUTE` (0x2B)
       |
       | `Qt::Key_Execute` (0x01020003)
       |

       | `"Find"`
       |
        The `Find` key. Opens an interface (typically a dialog box) for
        performing a find/search operation.

       | `APPCOMMAND_FIND`
       |
       | `GDK_KEY_Find` (0xFF68)
       |

       | `"Finish"` [5]
       | The `Finish` key.
       | `VK_OEM_FINISH` (0xF1)
       |
       |
       |

       | `"Help"`
       |
        The `Help` key. Opens or toggles the display of help
        information.

       | `VK_HELP` (0x2F)`APPCOMMAND_HELP`
       | `kVK_Help` (0x72)
       |
        `GDK_KEY_Help` (0xFF6A)`Qt::Key_Help`
        (0x01000058)

       | `KEYCODE_HELP` (259)

       | `"Pause"`
       |
        The `Pause` key. Pauses the current application or state, if
        applicable.

            Note: This shouldn't be confused with the
            `"MediaPause"` key value, which is used for media
            controllers, rather than to control applications and processes.

       | `VK_PAUSE` (0x13)
       |
       |
        `GDK_KEY_Pause` (0xFF13)`GDK_KEY_Break`
        (0xFF6B)`Qt::Key_Pause` (0x01000008)

       | `KEYCODE_BREAK` (121)

       | `"Play"`
       |
        The `Play` key. Resumes a previously paused application, if
        applicable.

            Note: This shouldn't be confused with the
            `"MediaPlay"` key value, which is used for media
            controllers, rather than to control applications and processes.

       | `VK_PLAY` (0xFA)
       |
       |
        `GDK_KEY_3270_Play` (0xFD16)`Qt::Key_Play`
        (0x01020005)

       |

       | `"Props"`
       | The `Props` (Properties) key.
       |
       |
       |
       |

       | `"Select"`
       | The `Select` key.
       | `VK_SELECT` (0x29)
       |
       | `GDK_KEY_Select` (0xFF60)
       | `KEYCODE_BUTTON_SELECT` (109)

       | `"ZoomIn"` [6]
       | The `ZoomIn` key.
       |
       |
       |
        `GDK_KEY_ZoomIn` (0x1008FF8B)<code
          >Qt::Key_ZoomIn</code
        >
        (0x010000F6)

       | `KEYCODE_ZOOM_IN` (168)

       | `"ZoomOut"` [6]
       | The `ZoomOut` key.
       |
       |
       |
        `GDK_KEY_ZoomOut` (0x1008FF8C)<code
          >Qt::Key_ZoomOut</code
        >
        (0x010000F7)

       | `KEYCODE_ZOOM_OUT` (169)

\[1] In Google Chrome 52, the `Cancel` key <example-value> returns the key code `"Pause"`. This is fixed in Chrome 53. (See Chrome bug 612749 for details.)

\[2] In Firefox 36 and earlier, the `Esc` key <example-value> `"Esc"` instead of `"Escape"`.

\[3] Firefox 36 and earlier reports `"Apps"` instead of `"ContextMenu"` for the context menu key.

\[4] The `Attn` key <example-value> the key code `"Unidentified"` on Firefox and Google Chrome, unless the Japanese keyboard layout is in effect, in which case it generates `"KanaMode"` instead.

\[5] The `Finish` key <example-value> the key code `"Unidentified"` on Firefox, unless the Japanese keyboard layout is in effect, in which case it generates `"Katakana"` instead.

\[6] Firefox didn't support the `"ZoomIn"` and `"ZoomOut"` keys until Firefox 37.

## Device keys

       | `KeyboardEvent.key` Value
       | Description
       | Virtual Keycode

       | Windows
       | Mac
       | Linux
       | Android

       | `"BrightnessDown"`
       |
        The Brightness Down key. Typically used to reduce the brightness of the
        display.

       |
       |
       |
        `GDK_KEY_MonBrightnessDown` (0x1008FF03)<code
          >Qt::Key_MonBrightnessDown</code
        >
        (0x010000B3)

       | `KEYCODE_BRIGHTNESS_DOWN` (220)

       | `"BrightnessUp"`
       |
        The Brightness Up key. Typically increases the brightness of the
        display.

       |
       |
       |
        `GDK_KEY_MonBrightnessUp` (0x1008FF02)<code
          >Qt::Key_MonBrightnessUp</code
        >
        (0x010000B2)

       | `KEYCODE_BRIGHTNESS_UP` (221)

       | `"Eject"`
       |
        The `Eject` key. Ejects removable media (or toggles an optical
        storage device tray open and closed).

       |
       |
       |
        `GDK_KEY_Eject` (0x1008FF2C)`Qt::Key_Eject`
        (0x010000B9)

       | `KEYCODE_MEDIA_EJECT` (129)

       | `"LogOff"` [2]
       | The `LogOff` key.
       |
       |
       |
        `GDK_KEY_LogOff` (0x1008FF61)<code
          >Qt::Key_LogOff</code
        >
        (0x010000D9)

       |

       | `"Power"`
       |
        The `Power` button or key, to toggle power on and off.

            Note: Not all systems pass this key <example-value> to the
            user agent.

       |
       |
       |
       | `KEYCODE_POWER` (26)

       | `"PowerOff"`
       |
        The `PowerOff` or `PowerDown` key. Shuts off the
        system.

       |
       |
       |
        `GDK_KEY_PowerDown` (0x1008FF21)<code
          >GDK_KEY_PowerOff</code
        >
        (0x1008FF2A)`Qt::Key_PowerDown` (0x0100010B)<code
          >Qt::Key_PowerOff</code
        >
        (0x010000B7)

       |

       | `"PrintScreen"`
       |
        The `PrintScreen` or `PrtScr` key. Sometimes
        `SnapShot`. Captures the screen and prints it or saves it to
        disk.

       | `VK_SNAPSHOT` (0x2C)
       |
       |
        `GDK_KEY_3270_PrintScreen` (0xFD1D)<code
          >GDK_KEY_Print</code
        >
        (0xFF61)`GDK_KEY_Sys_Req` (0xFF15)<code
          >Qt::Key_Print</code
        >
        (0x01000009)`Qt::Key_SysReq` (0x0100000A)

       | `KEYCODE_SYSRQ` (120)

       | `"Hibernate"` [2]
       |
        The `Hibernate` key. This saves the state of the computer to
        disk and then shuts down; the computer can be returned to its previous
        state by restoring the saved state information.

       |
       |
       |
        `GDK_KEY_Hibernate` (0x1008FFA8)<code
          >Qt::Key_Hibernate</code
        >
        (0x01000108)

       |

       | `"Standby"` [1]
       |
        The `Standby` key. (Also known as `Suspend` or
        `Sleep`.) This turns off the display and puts the computer in a
        low power consumption mode, without completely powering off.

       | `VK_SLEEP` (0x5F)
       |
       |
        `GDK_KEY_Standby` (0x1008FF10)<code
          >GDK_KEY_Suspend</code
        >
        (0x1008FFA7)`GDK_KEY_Sleep` (0x1008FF2F)<code
          >Qt::Key_Standby</code
        >
        (0x01000093)`Qt::Key_Suspend` (0x0100010C)<code
          >Qt::Key_Sleep</code
        >
        (0x01020004)

       | `KEYCODE_SLEEP` (223)

       | `"WakeUp"` [2]
       |
        The `WakeUp` key. Used to wake the computer from the
        hibernation or standby modes.

       |
       |
       |
        `GDK_KEY_WakeUp` (0x1008FF2B)<code
          >Qt::Key_WakeUp</code
        >
        (0x010000B8)

       | `KEYCODE_WAKEUP` (224)

\[1] The `Standby` key is not supported by Firefox 36 and earlier, so it is reported as `"Unidentified"`.

\[2] Prior to Firefox 37, this key <example-value> the value `"Unidentified"`.
