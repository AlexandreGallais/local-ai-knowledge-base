---
title: "Key values for keyboard events (part 6 of 8)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ui_events/keyboard_event_key_values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Key values for keyboard events (part 6 of 8)

## Media controller keys

Because modern remote controls for media devices often include buttons beyond the basic <example-value> covered elsewhere in this document, key <example-value> are defined for a broad array of these additional buttons.

The values below are derived in part from a number of consumer electronics technical specifications:

- DTV Application Software Environment (part of the ATSC specification)
- Open Cable Application Platform
- ANSI/CEA-2014-B: Web-based Protocol and Framework for Remote User Interface on UPnP™ Networks and the Internet
- Android KeyEvent key code values

> **Note:**
> Remote controls typically include keys whose values are already defined elsewhere, such as under Multimedia keys or Audio control keys. Those keys' values will match what's documented in those tables.

       | `KeyboardEvent.key` Value
       | Description
       | Virtual Keycode

       | Windows
       | Mac
       | Linux
       | Android

       | `"AVRInput"` [3]
       |
        Changes the input mode on an external audio/video receiver (AVR) unit.

       |
       |
       |
       | `KEYCODE_AVR_INPUT` (182)

       | `"AVRPower"` [3]
       | Toggles the power on an external AVR unit.
       |
       |
       |
       | `KEYCODE_AVR_POWER` (181)

       | `"ColorF0Red"` [3]
       |
        General-purpose media function key, color-coded red. This has index
        `0` among the colored keys.

       | `VK_COLORED_KEY_0`
       |
       |
       | `KEYCODE_PROG_RED` (183)

       | `"ColorF1Green"` [3]
       |
        General-purpose media function key, color-coded green. This has index
        `1` among the colored keys.

       | `VK_COLORED_KEY_1`
       |
       |
       | `KEYCODE_PROG_GREEN` (184)

       | `"ColorF2Yellow"` [3]
       |
        General-purpose media function key, color-coded yellow. This has index
        `2` among the colored keys.

       | `VK_COLORED_KEY_2`
       |
       |
       | `KEYCODE_PROG_YELLOW` (185)

       | `"ColorF3Blue"` [3]
       |
        General-purpose media function key, color-coded blue. This has index
        `3` among the colored keys.

       | `VK_COLORED_KEY_3`
       |
       |
       | `KEYCODE_PROG_BLUE` (186)

       | `"ColorF4Grey"`
       |
        General-purpose media function key, color-coded gray. This has index
        `4` among the colored keys.

       | `VK_COLORED_KEY_4`
       |
       |
       | `KEYCODE_PROG_GREY`

       | `"ColorF5Brown"`
       |
        General-purpose media function key, color-coded brown. This has index
        `5` among the colored keys.

       | `VK_COLORED_KEY_5`
       |
       |
       | `KEYCODE_PROG_BROWN`

       | `"ClosedCaptionToggle"`
       | Toggles closed captioning on and off.
       | `VK_CC`
       |
       |
       | `KEYCODE_CAPTIONS` (175)

       | `"Dimmer"`
       |
        Adjusts the brightness of the device by toggling between two brightness
        levels or by cycling among multiple brightness levels.

       | `VK_DIMMER`
       |
       | `GDK_KEY_BrightnessAdjust` (0x1008FF3B)
       |

       | `"DisplaySwap"`
       | Cycles among video sources.
       | `VK_DISPLAY_SWAP`
       |
       |
       |

       | `"DVR"`
       | Switches the input source to the Digital Video Recorder (DVR).
       |
       |
       |
       | `KEYCODE_DVR` (173)

       | `"Exit"`
       | The Exit button, which exits the current application or menu.
       | `VK_EXIT`
       |
       | `Qt::Key_Exit` (0x0102000a)
       |

       | `"FavoriteClear0"`
       |
        Clears the program or content stored in the first favorites list slot.

       | `VK_CLEAR_FAVORITE_0`
       |
       |
       |

       | `"FavoriteClear1"`
       |
        Clears the program or content stored in the second favorites list slot.

       | `VK_CLEAR_FAVORITE_1`
       |
       |
       |

       | `"FavoriteClear2"`
       |
        Clears the program or content stored in the third favorites list slot.

       | `VK_CLEAR_FAVORITE_2`
       |
       |
       |

       | `"FavoriteClear3"`
       |
        Clears the program or content stored in the fourth favorites list slot.

       | `VK_CLEAR_FAVORITE_3`
       |
       |
       |

       | `"FavoriteRecall0"`
       |
        Selects (recalls) the program or content stored in the first favorites
        list slot.

       | `VK_RECALL_FAVORITE_0`
       |
       |
       |

       | `"FavoriteRecall1"`
       |
        Selects (recalls) the program or content stored in the second favorites
        list slot.

       | `VK_RECALL_FAVORITE_1`
       |
       |
       |

       | `"FavoriteRecall2"`
       |
        Selects (recalls) the program or content stored in the third favorites
        list slot.

       | `VK_RECALL_FAVORITE_2`
       |
       |
       |

       | `"FavoriteRecall3"`
       |
        Selects (recalls) the program or content stored in the fourth favorites
        list slot.

       | `VK_RECALL_FAVORITE_3`
       |
       |
       |

       | `"FavoriteStore0"`
       |
        Stores the current program or content into the first favorites list
        slot.

       | `VK_STORE_FAVORITE_0`
       |
       |
       |

       | `"FavoriteStore1"`
       |
        Stores the current program or content into the second favorites list
        slot.

       | `VK_STORE_FAVORITE_1`
       |
       |
       |

       | `"FavoriteStore2"`
       |
        Stores the current program or content into the third favorites list
        slot.

       | `VK_STORE_FAVORITE_2`
       |
       |
       |

       | `"FavoriteStore3"`
       |
        Stores the current program or content into the fourth favorites list
        slot.

       | `VK_STORE_FAVORITE_3`
       |
       |
       |

       | `"Guide"`
       | Toggles the display of the program or content guide.
       | `VK_GUIDE`
       |
       | `Qt::Key_Guide` (0x0100011A)
       | `KEYCODE_GUIDE` (172)

       | `"GuideNextDay"`
       |
        If the guide is currently displayed, this button tells the guide to
        display the next day's content.

       | `VK_NEXT_DAY`
       |
       |
       |

       | `"GuidePreviousDay"`
       |
        If the guide is currently displayed, this button tells the guide to
        display the previous day's content.

       | `VK_PREV_DAY`
       |
       |
       |

       | `"Info"`
       |
        Toggles the display of information about the currently selected content,
        program, or media.

       | `VK_INFO`
       |
       | `Qt::Key_Info` (0x0100011B)
       | `KEYCODE_INFO` (165)

       | `"InstantReplay"`
       |
        Tells the device to perform an instant replay (typically some form of
        jumping back a short amount of time then playing it again, possibly but
        not usually in slow motion).

       | `VK_INSTANT_REPLAY`
       |
       |
       |

       | `"Link"`
       |
        Opens content linked to the current program, if available and possible.

       | `VK_LINK`
       |
       |
       |

       | `"ListProgram"`
       | Lists the current program.
       | `VK_LIST`
       |
       |
       |

       | `"LiveContent"`
       |
        Toggles a display listing currently available live content or programs.

       | `VK_LIVE`
       |
       |
       |

       | `"Lock"`
       | Locks or unlocks the currently selected content or program.
       | `VK_LOCK`
       |
       |
       |

       | `"MediaApps"`
       |
        Presents a list of media applications, such as photo viewers, audio and
        video players, and games. [1]

       | `VK_APPS`
       |
       |
       |

       | `"MediaAudioTrack"`
       | The Audio Track key.
       |
       |
       |
        GDK_KEY_AudioCycleTrack (0x1008FF9B)<code
          >Qt::Key_AudioCycleTrack</code
        >
        (0x01000106)

       | `KEYCODE_MEDIA_AUDIO_TRACK` (222)

       | `"MediaLast"`
       | Jumps back to the last-viewed content, program, or other media.
       | `VK_LAST`
       |
       | `Qt::Key_MediaLast` (0x0100FFFF)
       | `KEYCODE_LAST_CHANNEL` (229)

       | `"MediaSkipBackward"`
       | Skips backward to the previous content or program.
       |
       |
       |
       | `KEYCODE_MEDIA_SKIP_BACKWARD`

       | `"MediaSkipForward"`
       | Skips forward to the next content or program.
       | `VK_SKIP`
       |
       |
       | `KEYCODE_MEDIA_SKIP_FORWARD`

       | `"MediaStepBackward"`
       | Steps backward to the previous content or program.
       |
       |
       |
       | `KEYCODE_MEDIA_STEP_BACKWARD`

       | `"MediaStepForward"`
       | Steps forward to the next content or program.
       |
       |
       |
       | `KEYCODE_MEDIA_SKIP_FORWARD`

       | `"MediaTopMenu"`
       |
        Top Menu button. Opens the media's main menu (e.g., for a DVD or Blu-Ray
        disc).

       |
       |
       | `Qt::Key_TopMenu` (0x0100010A)
       | `KEYCODE_MEDIA_TOP_MENU`

       | `"NavigateIn"`
       | Navigates into a submenu or option.
       |
       |
       |
       | `KEYCODE_NAVIGATE_IN`

       | `"NavigateNext"`
       | Navigates to the next item.
       |
       |
       |
       | `KEYCODE_NAVIGATE_NEXT`

       | `"NavigateOut"`
       | Navigates out of the current screen or menu.
       |
       |
       |
       | `KEYCODE_NAVIGATE_OUT`

       | `"NavigatePrevious"`
       | Navigates to the previous item.
       |
       |
       |
       | `KEYCODE_NAVIGATE_PREVIOUS`

       | `"NextFavoriteChannel"`
       | Cycles to the next channel in the favorites list.
       | `VK_NEXT_FAVORITE_CHANNEL`
       |
       |
       |

       | `"NextUserProfile"`
       |
        Cycles to the next saved user profile, if this feature is supported and
        multiple profiles exist.

       | `VK_USER`
       |
       |
       |

       | `"OnDemand"`
       |
        Opens the user interface for selecting on demand content or programs to
        watch.

       | `VK_ON_DEMAND`
       |
       |
       |

       | `"Pairing"`
       |
        Starts the process of pairing the remote with a device to be controlled.

       |
       |
       |
       | `KEYCODE_PAIRING` (225)

       | `"PinPDown"`
       | A button to move the picture-in-picture view downward.
       | `VK_PINP_DOWN`
       |
       |
       |

       | `"PinPMove"`
       | A button to control moving the picture-in-picture view.
       | `VK_PINP_MOVE`
       |
       |
       |

       | `"PinPToggle"`
       | Toggles display of the picture-in-picture view on and off.
       | `VK_PINP_TOGGLE`
       |
       |
       |

       | `"PinPUp"`
       | A button to move the picture-in-picture view upward.
       | `VK_PINP_UP`
       |
       |
       |

       | `"PlaySpeedDown"`
       | Decreases the media playback rate.
       | `VK_PLAY_SPEED_DOWN`
       |
       |
       |

       | `"PlaySpeedReset"`
       | Returns the media playback rate to normal.
       | `VK_PLAY_SPEED_RESET`
       |
       |
       |

       | `"PlaySpeedUp"`
       | Increases the media playback rate.
       | `VK_PLAY_SPEED_UP`
       |
       |
       |

       | `"RandomToggle"`
       | Toggles random media (also known as "shuffle mode") on and off.
       | `VK_RANDOM_TOGGLE`
       |
       | `GDK_KEY_AudioRandomPlay` (0x1008FF99)
       |

       | `"RcLowBattery"`
       |
        A code sent when the remote control's battery is low. This doesn't
        actually correspond to a physical key at all.

       | `VK_RC_LOW_BATTERY`
       |
       |
       |

       | `"RecordSpeedNext"`
       | Cycles among the available media recording speeds.
       | `VK_RECORD_SPEED_NEXT`
       |
       |
       |

       | `"RfBypass"`
       |
        Toggles radio frequency (RF) input bypass mode on and off. RF bypass
        mode passes RF input directly to the RF output without any processing or
        filtering.

       | `VK_RF_BYPASS`
       |
       |
       |

       | `"ScanChannelsToggle"`
       |
        Toggles the channel scan mode on and off. This is a mode which flips
        through channels automatically until the user stops the scan.

       | `VK_SCAN_CHANNELS_TOGGLE`
       |
       |
       |

       | `"ScreenModeNext"`
       | Cycles through the available screen display modes.
       | `VK_SCREEN_MODE_NEXT`
       |
       |
       |

       | `"Settings"`
       | Toggles display of the device's settings screen on and off.
       | `VK_SETTINGS`
       |
       | `Qt::Key_Settings` (0x0100011C)
       | `KEYCODE_SETTINGS`

       | `"SplitScreenToggle"`
       | Toggles split screen display mode on and off.
       | `VK_SPLIT_SCREEN_TOGGLE`
       |
       |
        `GDK_KEY_SplitScreen` (0x1008FF7D)<code
          >Qt::Key_SplitScreen</code
        >
        (0x010000ED)

       |

       | `"STBInput"` [3]
       | Cycles among input modes on an external set-top box (STB).
       |
       |
       |
       | `KEYCODE_STB_INPUT` (180)

       | `"STBPower"` [3]
       | Toggles on and off an external STB.
       |
       |
       |
       | `KEYCODE_STB_POWER` (179)

       | `"Subtitle"`
       | Toggles the display of subtitles on and off if they're available.
       | `VK_SUBTITLE`
       |
       | `GDK_KEY_Subtitle` (0x1008FF9A)
       | `KEYCODE_CAPTIONS` (175)

       | `"Teletext"`
       |
        Toggles display of teletext,
        if available.

       | `VK_TELETEXT`
       |
       |
       | `KEYCODE_TV_TELETEXT` (233)

       | `"VideoModeNext"` [3]
       | Cycles through the available video modes.
       | `VK_VIDEO_MODE_NEXT`
       |
       | `GDK_KEY_Next_VMode` (0x1008FE22)
       |

       | `"Wink"`
       |
        Causes the device to identify itself in some fashion, such as by
        flashing a light, briefly changing the brightness of indicator lights,
        or emitting a tone.

       | `VK_WINK`
       |
       |
       |

       | `"ZoomToggle"` [2]
       |
        Toggles between fullscreen and scaled content display, or otherwise
        change the magnification level.

       | `VK_ZOOM` (0xFB)
       |
       | `Qt::Key_Zoom` (0x01020006)
       | `KEYCODE_TV_ZOOM_MODE` (255)

\[1] Don't confuse the media controller `VK_APPS` key with the Windows `VK_APPS` key, which is also known as `VK_CONTEXT_MENU`. That key is encoded as `"ContextMenu"`.

\[2] Firefox 36 and earlier identifies the zoom toggle button as `"Zoom"`. Firefox 37 corrects this to `"ZoomToggle"`.

\[3] These keys were `"Unidentified"` until Firefox 37.
