---
title: "Key values for keyboard events (part 3 of 8)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ui_events/keyboard_event_key_values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Key values for keyboard events (part 3 of 8)

## IME and composition keys

Keys used when using an Input Method Editor (IME) to input text which can't readily be entered by simple key <example-value>, such as text in languages such as those which have more graphemes than there are character entry keys on the keyboard. Common examples include Chinese, Japanese, Korean, and Hindi.

Some keys are common across multiple languages, while others exist only on keyboards targeting specific languages. In addition, not all keyboards have all of these keys.

### Common IME keys

       | `KeyboardEvent.key` Value
       | Description
       | Virtual Keycode

       | Windows
       | Mac
       | Linux
       | Android

       | `"AllCandidates"`
       |
        The `All Candidates` key, which starts multi-candidate mode, in
        which multiple candidates are displayed for the ongoing input.

       |
       |
       |
        `GDK_KEY_MultipleCandidate` (0xFF3D<code
          >Qt::Key_MultipleCandidate</code
        >
        (0x0100113D)

       |

       | `"Alphanumeric"`
       | The `Alphanumeric` key.
       | `VK_OEM_ATTN` (0xF0)
       |
       |
        `GDK_KEY_Eisu_Shift` (0xFF2F)<code
          >GDK_KEY_Eisu_toggle</code
        >
        (0xFF30)`Qt::Key_Eisu_Shift` (0x0100112f)<code
          >Qt::Key_Eisu_toggle</code
        >
        (0x01001130)

       |

       | `"CodeInput"`
       |
        The `Code Input` key, which enables code input mode, which lets
        the user enter characters by typing their code points (their Unicode
        character numbers, typically).

       |
       |
       |
        `GDK_KEY_Codeinput` (0xFF37)<code
          >Qt::Key_Codeinput</code
        >
        (0x01001137)

       |

       | `"Compose"`
       | The `Compose` key.
       |
       |
       |
        `GDK_KEY_Multi_key` (0xFF20) [1]<code
          >Qt::Key_Multi_key</code
        >
        (0x01001120)

       |

       | `"Convert"` [4]
       |
        The `Convert` key, which instructs the IME to convert the
        current input method sequence into the resulting character.

       | `VK_CONVERT` (0x1C)
       |
       |
        `GDK_KEY_Henkan` (0xFF23)`Qt::Key_Henkan`
        (0x01001123)

       | `KEYCODE_HENKAN` (214)

       | `"Dead"`
       |

          A dead "combining" key; that is, a key which is used in tandem with
          other keys to generate accented and other modified characters. If
          pressed by itself, it doesn't generate a character.

          If you wish to identify which specific dead key was pressed (in cases
          where more than one exists), you can do so by examining the
          `KeyboardEvent`'s associated
          `compositionupdate` event's
          `data` property.

       |
       |
       | See Dead keycodes for Linux below
       |

       | `"FinalMode"`
       |
        The `Final` (Final Mode) key is used on some Asian keyboards to
        enter final mode when using IMEs.

       | `VK_FINAL` (0x18)
       |
       |
       |

       | `"GroupFirst"`
       |
        Switches to the first character group on an
        ISO/IEC 9995 keyboard. Each key may have multiple groups of characters, each in its own
        column. Pressing this key <example-value> the device to interpret key <example-value>
        as coming from the first column on subsequent keystrokes.

       |
       |
       | `GDK_KEY_ISO_First_Group` (0xFE0C)
       |

       | `"GroupLast"`
       |
        Switches to the last character group on an
        ISO/IEC 9995 keyboard.

       |
       |
       | `GDK_KEY_ISO_Last_Group` (0xFE0E)
       |

       | `"GroupNext"` [4]
       |
        Switches to the next character group on an
        ISO/IEC 9995 keyboard.

       |
       |
       | `GDK_KEY_ISO_Next_Group` (0xFE08)
       | `KEYCODE_LANGUAGE_SWITCH` (204)

       | `"GroupPrevious"`
       |
        Switches to the previous character group on an
        ISO/IEC 9995 keyboard.

       |
       |
       | `GDK_KEY_ISO_Prev_Group` (0xFE0A)
       |

       | `"ModeChange"` [5]
       | The Mode Change key. Toggles or cycles among input modes of IMEs.
       | `VK_MODECHANGE` (0x1F)
       |
       |
        `GDK_KEY_Mode_switch` (0xFF7E)<code
          >GDK_KEY_script_switch</code
        >
        (0xFF7E)`Qt::Key_Mode_switch` (0x0100117E)

       | `KEYCODE_SWITCH_CHARSET` (95)

       | `"NextCandidate"`
       |
        The Next Candidate function key. Selects the next possible match for the
        ongoing input.

       |
       |
       |
       |

       | `"NonConvert"` [2]
       |
        The `NonConvert` ("Don't convert") key. This accepts the
        current input method sequence without running conversion when using an
        IME.

       | `VK_NONCONVERT` (0x1D)
       |
       |
        `GDK_KEY_Muhenkan` (0xFF22)<code
          >Qt::Key_Muhenkan</code
        >
        (0x01001122)

       | `KEYCODE_MUHENKAN` (213)

       | `"PreviousCandidate"`
       |
        The Previous Candidate key. Selects the previous possible match for the
        ongoing input.

       |
       |
       |
        `GDK_KEY_PreviousCandidate` (0xFF3E)<code
          >Qt::Key_PreviousCandidate</code
        >
        (0x0100113E)

       |

       | `"Process"` [3]
       |
        The `Process` key. Instructs the IME to process the conversion.

       | `VK_PROCESSKEY` (0xE5)
       |
       |
       |

       | `"SingleCandidate"` [4]
       |
        The Single Candidate key. Enables single candidate mode (as opposed to
        multi-candidate mode); in this mode, only one candidate is displayed at
        a time.

       |
       |
       |
        `GDK_KEY_SingleCandidate` (0xFF3C)<code
          >Qt::Key_SingleCandidate</code
        >
        (0x0100113C)

       |

\[1] On the _X Window System_, the `Compose` key is called the `Multi` key.

\[2] The `NonConvert` key is reported as `"Nonconvert"` instead of the correct `"NonConvert"` by Firefox versions 36 and earlier.

\[3] The `Process` key <example-value> returns `"Unidentified"` in Firefox. Google Chrome returns the value of the key as if IME were not in use.

\[4] Prior to Firefox 37, these keys were `"Unidentified"`.

\[5] Firefox generates the key value `"AltGraph"` instead of `"ModeChange"`.

### Korean keyboards only

These keys are only available on Korean keyboards. There are other keys defined by various platforms for Korean keyboards, but these are the most common and are the ones identified by the UI Events specification.

       | `KeyboardEvent.key` Value
       | Description
       | Virtual Keycode

       | Windows
       | Mac
       | Linux
       | Android

       | `"HangulMode"`
       |
        The `Hangul` (Korean character set) mode key, which toggles
        between Hangul and English entry modes.

       | `VK_HANGUL` (0x15) [1]
       |
       |
        `GDK_KEY_Hangul` (0xFF31)`Qt::Key_Hangul`
        (0x01001131)

       |

       | `"HanjaMode"`
       |
        Selects the Hanja mode, for converting Hangul characters to the more
        specific Hanja characters.

       | `VK_HANJA` (0x19) [1]
       |
       |
        `GDK_KEY_Hangul_Hanja` (0xFF34)<code
          >Qt::Key_Hangul_Hanja</code
        >
        (0x01001134)

       |

       | `"JunjaMode"`
       |
        Selects the Junja mode, in which Korean is represented using single-byte
        Latin characters.

       | `VK_JUNJA` (0x17)
       |
       |
        `GDK_KEY_Hangul_Jeonja` (0xFF38)<code
          >Qt::Key_Hangul_Jeonja</code
        >
        (0x01001138)

       |

\[1] `VK_HANGUL` and `VK_KANA` share the same numeric key value on Windows, as do `VK_HANJA` and `VK_KANJI`.

### Japanese keyboards only

These keys are only available on Japanese keyboards.

       | `KeyboardEvent.key` Value
       | Description
       | Virtual Keycode

       | Windows
       | Mac
       | Linux
       | Android

       | `"Eisu"` [1]
       |
        The `Eisu` key. This key's purpose is defined by the IME, but
        may be used to close the IME.

       |
       | `kVK_JIS_Eisu` (0x66)
       |
        `GDK_KEY_Eisu_toggle` (0xFF2F)<code
          >Qt::Key_Eisu_toggle</code
        >
        (0x01001130)

       | `KEYCODE_EISU` (212)

       | `"Hankaku"` [3]
       | The `Hankaku` (half-width characters) key.
       | `VK_OEM_AUTO` (0xF3)
       |
       |
        `GDK_KEY_Hankaku` (0xFF29)`Qt::Key_Hankaku`
        (0x01001129)

       |

       | `"Hiragana"`
       | The `Hiragana` key; selects Kana characters mode.
       | `VK_OEM_COPY` (0xF2)
       |
       |
        `GDK_KEY_Hiragana` (0xFF25)<code
          >Qt::Key_Hiragana</code
        >
        (0x01001125)

       |

       | `"HiraganaKatakana"` [6]
       | Toggles between the Hiragana and Katakana writing systems.
       |
       |
       |
        `GDK_KEY_Hiragana_Katakana` (0xFF27)<code
          >Qt::Key_Hiragana_Katakana</code
        >
        (0x01001127)

       | `KEYCODE_KATAKANA_HIRAGANA` (215)

       | `"KanaMode"`
       | The `Kana Mode` (Kana Lock) key.
       | `VK_KANA` (0x15) [2]`VK_ATTN` (0xF6)
       |
       |
        `GDK_KEY_Kana_Lock` (0xFF2D)<code
          >GDK_KEY_Kana_Shift</code
        >
        (0xFF2E)`Qt::Key_Kana_Lock` (0x0100112D)<code
          >Qt::Key_Kana_Shift</code
        >
        (0x0100112E)

       |

       | `"KanjiMode"`
       |
        The `Kanji Mode` key. Enables entering Japanese text using the
        ideographic characters of Chinese origin.

       | `VK_KANJI` [2]
       | `kVK_JIS_Kana` (0x68)
       |
        `GDK_KEY_Kanji` (0xFF21)`Qt::Key_Kanji`
        (0x01001121)

       | `KEYCODE_KANA` (218)

       | `"Katakana"`
       | The `Katakana` key.
       | `VK_OEM_FINISH` (0xF1)
       |
       |
        `GDK_KEY_Katakana` (0xFF26)<code
          >Qt::Key_Katakana</code
        >
        (0x01001126)

       |

       | `"Romaji"` [5]
       | The `Romaji` key; selects the Roman character set.
       | `VK_OEM_BACKTAB` (0xF5)
       |
       |
        `GDK_KEY_Romaji` (0xFF24)`Qt::Key_Romaji`
        (0x01001124)

       |

       | `"Zenkaku"` [4]
       | The `Zenkaku` (full width) characters key.
       | `VK_OEM_ENLW` (0xF4)
       |
       |
        `GDK_KEY_Zenkaku` (0xFF28)`Qt::Key_Zenkaku`
        (0x01001128)

       |

       | `"ZenkakuHankaku"` [6]
       |
        The `Zenkaku/Hankaku` (full width/half width) toggle key.

       |
       |
       |
        `GDK_KEY_Zenkaku_Hankaku` (0xFF2A)<code
          >Qt::Zenkaku_Hankaku</code
        >
        (0x0100112A)

       |
        `KEYCODE_ZENKAKU_HANKAKU` (211)

\[1] Prior to Firefox 37, the `Eisu` key was mapped to `"RomanCharacters"` by mistake.

\[2] `VK_HANGUL` and `VK_KANA` share the same numeric key value on Windows, as do `VK_HANJA` and `VK_KANJI`.

\[3] Prior to Firefox 37, the `Hankaku` (half-width) key <example-value> the key value `"HalfWidth"` on Firefox.

\[4] Firefox 36 and earlier identifies this key as `"FullWidth"` on Japanese keyboard layouts and `"Unidentified"` on all other keyboard layouts. Firefox 37 and later, and all versions of Google Chrome, correctly return `"Zenkaku"`.

\[5] Firefox 36 and earlier identifies the `Romaji` key as `"RomanCharacters"` on Japanese keyboards and `"Unidentified"` for other keyboards; this is corrected to return `"Romaji"` in Firefox 37 and later.

\[6] This key is reported as `"Unidentified"` prior to Firefox 37.
