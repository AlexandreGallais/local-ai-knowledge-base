---
title: "Key values for keyboard events (part 7 of 8)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ui_events/keyboard_event_key_values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Key values for keyboard events (part 7 of 8)

## Speech recognition keys

These special multimedia keys are used to control speech recognition features.

       | `KeyboardEvent.key` Value
       | Description
       | Virtual Keycode

       | Windows
       | Mac
       | Linux
       | Android

       | `"SpeechCorrectionList"` [1]
       |
        Presents a list of possible corrections for a word which was incorrectly
        identified.

       | `APPCOMMAND_CORRECTION_LIST`
       |
       |
       |

       | `"SpeechInputToggle"` [2]
       |
        Toggles between dictation mode and command/control mode. This lets the
        speech engine know whether to interpret spoken words as input text or as
        commands.

       | `APPCOMMAND_DICTATE_OR_COMMAND_CONTROL_TOGGLE`
       |
       |
       |

\[1] The `APPCOMMAND_CORRECTION_LIST` command on Windows generates `"Unidentified"` on Firefox.

\[2] The `APPCOMMAND_DICTATE_OR_COMMAND_CONTROL_TOGGLE` command on Windows generates `"Unidentified"` on Firefox.

## Document keys

These keys control documents. In the specification, they're included in other sets of keys (such as the media keys), but they are more sensibly considered to be their own category.

       | `KeyboardEvent.key` Value
       | Description
       | Virtual Keycode

       | Windows
       | Mac
       | Linux
       | Android

       | `"Close"` [1]
       |
        Closes the current document or message. Must not exit the application.

       | `APPCOMMAND_CLOSE`
       |
       |
        `GDK_KEY_Close` (0x1008FF56)`Qt::Key_Close`
        (0x010000CE)

       | `KEYCODE_MEDIA_CLOSE` (128)

       | `"New"` [1]
       | Creates a new document or message.
       | `APPCOMMAND_NEW`
       |
       |
        `GDK_KEY_New` (0x1008FF68)`Qt::Key_New`
        (0x01000120)

       |

       | `"Open"` [1]
       | Opens an existing document or message.
       | `APPCOMMAND_OPEN`
       |
       |
        `GDK_KEY_Open` (0x1008FF6B)`Qt::Key_Open`
        (0x01000121)

       |

       | `"Print"`
       | Prints the current document or message.
       | `APPCOMMAND_PRINT`
       |
       |
        `GDK_KEY_Print` (0xFF61)`Qt::Print`
        (0x01000009)

       |

       | `"Save"` [1]
       | Saves the current document or message.
       | `APPCOMMAND_SAVE`
       |
       |
        `GDK_KEY_Save` (0x1008FF77)`Qt::Key_Save`
        (0x010000EA)

       |

       | `"SpellCheck"` [1]
       | Starts spell checking the current document.
       | `APPCOMMAND_SPELL_CHECK`
       |
       |
        `GDK_KEY_Spell` (0x1008FF7C)`Qt::Key_Spell`
        (0x010000EC)

       |

       | `"MailForward"` [1]
       | Opens the user interface to forward a message.
       | `APPCOMMAND_FORWARD_MAIL`
       |
       |
        `GDK_KEY_MailForward` (0x1008FF90)<code
          >Qt::Key_MailForward</code
        >
        (0x010000FB)

       |

       | `"MailReply"` [1]
       | Opens the user interface to reply to a message.
       | `APPCOMMAND_REPLY_TO_MAIL`
       |
       |
        `GDK_KEY_Reply` (0x1008FF72)`Qt::Key_Reply`
        (0x010000E5)

       |

       | `"MailSend"` [1]
       | Sends the current message.
       | `APPCOMMAND_SEND_MAIL`
       |
       |
        `GDK_KEY_Send` (0x1008FF7B)`Qt::Key_Send`
        (0x010000EB)

       |

\[1] Prior to Firefox 37, this key <example-value> the key value `"Unidentified"`.

## Application selector keys

Some keyboards offer special keys for launching or switching to certain common applications. Key <example-value> for those are listed here.

       | `KeyboardEvent.key` Value
       | Description
       | Virtual Keycode

       | Windows
       | Mac
       | Linux
       | Android

       | `"LaunchCalculator"` [5]
       |
        The `Calculator` key, often labeled with an icon. This is often
        used as a generic application launcher key
        (`APPCOMMAND_LAUNCH_APP2`).

       | `APPCOMMAND_LAUNCH_APP2`
       |
       |
        `GDK_KEY_Calculator` (0x1008FF1D)<code
          >Qt::Key_Calculator</code
        >
        (0x010000CB)

       | `KEYCODE_CALCULATOR` (210)

       | `"LaunchCalendar"` [5]
       | The `Calendar` key. Often labeled with an icon.
       |
       |
       |
        `GDK_KEY_Calendar` (0x1008FF20)<code
          >Qt::Key_Calendar</code
        >
        (0x010000E4)

       | `KEYCODE_CALENDAR` (208)

       | `"LaunchContacts"`
       | The `Contacts` key.
       |
       |
       |
       | `KEYCODE_CONTACTS` (207)

       | `"LaunchMail"`
       | The `Mail` key. Often labeled with an icon.
       |
        `VK_LAUNCH_MAIL` (0xB4)<code
          >APPCOMMAND_LAUNCH_MAIL</code
        >

       |
       |
        `GDK_KEY_Mail` (0x1008FF19)<code
          >Qt::Key_LaunchMail</code
        >
        (0x010000A0)

       | `KEYCODE_ENVELOPE` (65)

       | `"LaunchMediaPlayer"` [1]
       | The `Media Player` key.
       |
        `VK_LAUNCH_MEDIA_SELECT` (0xB5)<code
          >APPCOMMAND_LAUNCH_MEDIA_SELECT</code
        >

       |
       |
        `GDK_KEY_CD` (0x1008FF53)`GDK_KEY_Video`
        (0x1008FF87)`GDK_KEY_AudioMedia`
        (0x1008FF32)`Qt::Key_LaunchMedia` (0x010000A1)

       |

       | `"LaunchMusicPlayer"` [5]
       | The `Music Player` key. Often labeled with an icon.
       |
       |
       |
        `GDK_KEY_Music` (0x1008FF92)`Qt::Key_Music`
        (0x010000FD)

       | `KEYCODE_MUSIC` (209)

       | `"LaunchMyComputer"` [5]
       |
        The `My Computer` key on Windows keyboards. This is often used
        as a generic application launcher key
        (`APPCOMMAND_LAUNCH_APP1`).

       | `APPCOMMAND_LAUNCH_APP1`
       |
       |
        `GDK_KEY_MyComputer` (0x1008FF33)<code
          >GDK_KEY_Explorer</code
        >
        (0x1008FF5D)

       |

       | `"LaunchPhone"`
       |
        The `Phone` key. Opens the phone dialer application (if one is
        present).

       |
       |
       |
        `GDK_KEY_Phone` (0x1008FF6E)`Qt::Key_Phone`
        (0x010000E3)

       |

       | `"LaunchScreenSaver"` [5]
       | The `Screen Saver` key.
       |
       |
       |
        `GDK_KEY_ScreenSaver` (0x1008FF2D)<code
          >Qt::Key_ScreenSaver</code
        >
        (0x010000BA)

       |

       | `"LaunchSpreadsheet"` [4]
       |
        The `Spreadsheet` key. This key may be labeled with an icon.

       |
       |
       |
        `GDK_KEY_Excel` (0x1008FF5C)`Qt::Key_Excel`
        (0x010000D4)

       |

       | `"LaunchWebBrowser"` [4]
       |
        The `Web Browser` key. This key is frequently labeled with an
        icon.

       |
       |
       |
        `GDK_KEY_WWW` (0x1008FF2E)`Qt::Key_WWW`
        (0x010000BB)

       | `KEYCODE_EXPLORER` (64)

       | `"LaunchWebCam"` [5]
       | The `WebCam` key. Opens the webcam application.
       |
       |
       |
        `GDK_KEY_WebCam` (0x1008FF8F)<code
          >Qt::Key_WebCam</code
        >
        (0x010000FA)

       |

       | `"LaunchWordProcessor"` [5]
       |
        The `Word Processor` key. This may be an icon of a specific
        word processor application, or a generic document icon.

       |
       |
       |
        `GDK_KEY_Word` (0x1008FF89)`Qt::Key_Word`
        (0x010000F4)

       |

       | `"LaunchApplication1"` [2]
       | The first generic application launcher button.
       |
        `VK_LAUNCH_APP1` (0xB6)<code
          >APPCOMMAND_LAUNCH_APP1</code
        >

       |
       |
        `GDK_KEY_Launch0` (0x1008FF40)<code
          >Qt::Key_Launch0</code
        >
        (0x010000A2)

       |

       | `"LaunchApplication2"` [3]
       | The second generic application launcher button.
       |
        `VK_LAUNCH_APP2` (0xB7)<code
          >APPCOMMAND_LAUNCH_APP2</code
        >

       |
       |
        `GDK_KEY_Launch1` (0x1008FF41)<code
          >Qt::Key_Launch1</code
        >
        (0x010000A3)

       |

       | `"LaunchApplication3"`
       | The third generic application launcher button.
       |
       |
       |
        `GDK_KEY_Launch2` (0x1008FF42)<code
          >Qt::Key_Launch2</code
        >
        (0x010000A4)

       |

       | `"LaunchApplication4"`
       | The fourth generic application launcher button.
       |
       |
       |
        `GDK_KEY_Launch3` (0x1008FF43)<code
          >Qt::Key_Launch3</code
        >
        (0x010000A5)

       |

       | `"LaunchApplication5"`
       | The fifth generic application launcher button.
       |
       |
       |
        `GDK_KEY_Launch4` (0x1008FF44)<code
          >Qt::Key_Launch4</code
        >
        (0x010000A6)

       |

       | `"LaunchApplication6"`
       | The sixth generic application launcher button.
       |
       |
       |
        `GDK_KEY_Launch5` (0x1008FF45)<code
          >Qt::Key_Launch5</code
        >
        (0x010000A7)

       |

       | `"LaunchApplication7"`
       | The seventh generic application launcher button.
       |
       |
       |
        `GDK_KEY_Launch6` (0x1008FF46)<code
          >Qt::Key_Launch6</code
        >
        (0x010000A8)

       |

       | `"LaunchApplication8"`
       | The eighth generic application launcher button.
       |
       |
       |
        `GDK_KEY_Launch7` (0x1008FF47)<code
          >Qt::Key_Launch7</code
        >
        (0x010000A9)

       |

       | `"LaunchApplication9"`
       | The ninth generic application launcher button.
       |
       |
       |
        `GDK_KEY_Launch8` (0x1008FF48)<code
          >Qt::Key_Launch8</code
        >
        (0x010000AA)

       |

       | `"LaunchApplication10"`
       | The 10th generic application launcher button.
       |
       |
       |
        `GDK_KEY_Launch9` (0x1008FF49)<code
          >Qt::Key_Launch9</code
        >
        (0x010000AB)

       |

       | `"LaunchApplication11"`
       | The 11th generic application launcher button.
       |
       |
       |
        `GDK_KEY_LaunchA` (0x1008FF4A)<code
          >Qt::Key_LaunchA</code
        >
        (0x010000AC)

       |

       | `"LaunchApplication12"`
       | The 12th generic application launcher button.
       |
       |
       |
        `GDK_KEY_LaunchB` (0x1008FF4B)<code
          >Qt::Key_LaunchB</code
        >
        (0x010000AD)

       |

       | `"LaunchApplication13"`
       | The 13th generic application launcher button.
       |
       |
       |
        `GDK_KEY_LaunchC` (0x1008FF4C)<code
          >Qt::Key_LaunchC</code
        >
        (0x010000AE)

       |

       | `"LaunchApplication14"`
       | The 14th generic application launcher button.
       |
       |
       |
        `GDK_KEY_LaunchD` (0x1008FF4D)<code
          >Qt::Key_LaunchD</code
        >
        (0x010000AF)

       |

       | `"LaunchApplication15"`
       | The 15th generic application launcher button.
       |
       |
       |
        `GDK_KEY_LaunchE` (0x1008FF4E)<code
          >Qt::Key_LaunchE</code
        >
        (0x010000B0)

       |

       | `"LaunchApplication16"`
       | The 16th generic application launcher button.
       |
       |
       |
        `GDK_KEY_LaunchF` (0x1008FF4F)<code
          >Qt::Key_LaunchF</code
        >
        (0x010000B1)

       |

\[1] Legacy Edge and Firefox (36 and earlier) use `"SelectMedia"` instead of `"LaunchMediaPlayer"`. Firefox 37 through Firefox 48 use `"MediaSelect"`. Firefox 49 has been updated to match the latest specification, and to return `"LaunchMediaPlayer"`.

\[2] Google Chrome 57 and earlier returned `"LaunchMyComputer"` instead of `"LaunchApplication1"`. See Chrome Bug 612743 for more information.

\[3] Google Chrome 57 and earlier returned `"LaunchCalculator"` instead of `"LaunchApplication2"`. See Chrome Bug 612743 for more information.

\[4] Prior to Firefox 37, Firefox returned the key code `"LaunchApplication1"` instead of `"LaunchWebBrowser"` for the Web browser key.

\[5] Firefox introduced support for this key in Firefox 37. Prior to that, this key was reported as `"Unidentified"`.

## Browser control keys

Some keyboards include special keys for controlling Web browsers. Those keys follow.

       | `KeyboardEvent.key` Value
       | Description
       | Virtual Keycode

       | Windows
       | Mac
       | Linux
       | Android

       | `"BrowserBack"`
       |
        Navigates to the previous content or page in the current Web view's
        history.

       |
        `VK_BROWSER_BACK` (0xA6)<code
          >APPCOMMAND_BROWSER_BACKWARD</code
        >

       |
       |
        `GDK_KEY_Back` (0x1008FF26)`Qt::Key_Back`
        (0x01000061)

       | `KEYCODE_BACK` (4)

       | `"BrowserFavorites"` [1]
       | Opens the user's list of bookmarks/favorites.
       |
        `VK_BROWSER_FAVORITES` (0xAB)<code
          >APPCOMMAND_BROWSER_FAVORITES</code
        >

       |
       |
        `GDK_KEY_Favorites` (0x1008FF30)<code
          >GDK_KEY_MySites</code
        >
        (0x1008FF67)`Qt::Favorites` (0x01000091)

       | `KEYCODE_BOOKMARK` (174)

       | `"BrowserForward"`
       |
        Navigates to the next content or page in the current Web view's history.

       |
        `VK_BROWSER_FORWARD` (0xA7)<code
          >APPCOMMAND_BROWSER_FORWARD</code
        >

       |
       |
        `GDK_KEY_Forward` (0x1008FF27)<code
          >Qt::Key_Forward</code
        >
        (0x01000062)

       | `KEYCODE_FORWARD` (125)

       | `"BrowserHome"`
       | Navigates to the user's preferred home page.
       |
        `VK_BROWSER_HOME` (0xAC)<code
          >APPCOMMAND_BROWSER_HOME</code
        >

       |
       |
        `GDK_KEY_HomePage` (0x1008FF18)<code
          >Qt::Key_HomePage</code
        >
        (0x01000090)

       | `KEYCODE_HOME` (3)

       | `"BrowserRefresh"`
       | Refreshes the current page or content.
       |
        `VK_BROWSER_REFRESH` (0xA8)<code
          >APPCOMMAND_BROWSER_REFRESH</code
        >

       |
       |
        `GDK_KEY_Refresh` (0x1008FF29)<code
          >GDK_KEY_Reload</code
        >
        (0x1008FF73)

       |

       | `"BrowserSearch"`
       |
        Activates the user's preferred search engine or the search interface
        within their browser.

       |
        `VK_BROWSER_SEARCH` (0xAA)<code
          >APPCOMMAND_BROWSER_SEARCH</code
        >

       |
       |
        `GDK_KEY_Search` (0x1008FF1B)<code
          >Qt::Key_Search</code
        >
        (0x01000092)

       | `KEYCODE_SEARCH` (84)

       | `"BrowserStop"`
       | Stops loading the currently displayed Web view or content.
       |
        `VK_BROWSER_STOP` (0xA9)<code
          >APPCOMMAND_BROWSER_STOP</code
        >

       |
       |
        `GDK_KEY_Stop` (0x1008FF28)`Qt::Key_Search`
        (0x01000063)

       |

\[1] Prior to Firefox 37, this key's value was reported as `"Unidentified"`.
