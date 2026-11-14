---
title: "codecs --- Codec registry and base classes (part 6 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/codecs.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# codecs --- Codec registry and base classes (part 6 of 8)

```text
|                 |                                | .. versionadded:: 3.5          |
+-----------------+--------------------------------+--------------------------------+
| koi8_u          |                                | Ukrainian                      |
+-----------------+--------------------------------+--------------------------------+
| kz1048          | kz_1048, strk1048_2002, rk1048 | Kazakh                         |
|                 |                                |                                |
|                 |                                | .. versionadded:: 3.5          |
+-----------------+--------------------------------+--------------------------------+
| mac_cyrillic    | maccyrillic                    | Belarusian, Bulgarian,         |
|                 |                                | Macedonian, Russian, Serbian   |
+-----------------+--------------------------------+--------------------------------+
| mac_greek       | macgreek                       | Greek                          |
+-----------------+--------------------------------+--------------------------------+
| mac_iceland     | maciceland                     | Icelandic                      |
+-----------------+--------------------------------+--------------------------------+
| mac_latin2      | maclatin2, maccentraleurope,   | Central and Eastern Europe     |
|                 | mac_centeuro                   |                                |
+-----------------+--------------------------------+--------------------------------+
| mac_roman       | macroman, macintosh            | Western Europe                 |
+-----------------+--------------------------------+--------------------------------+
| mac_turkish     | macturkish                     | Turkish                        |
+-----------------+--------------------------------+--------------------------------+
| ptcp154         | csptcp154, pt154, cp154,       | Kazakh                         |
|                 | cyrillic-asian                 |                                |
+-----------------+--------------------------------+--------------------------------+
| shift_jis       | csshiftjis, shiftjis, sjis,    | Japanese                       |
|                 | s_jis                          |                                |
+-----------------+--------------------------------+--------------------------------+
| shift_jis_2004  | shiftjis2004, sjis_2004,       | Japanese                       |
|                 | sjis2004                       |                                |
+-----------------+--------------------------------+--------------------------------+
| shift_jisx0213  | shiftjisx0213, sjisx0213,      | Japanese                       |
|                 | s_jisx0213                     |                                |
+-----------------+--------------------------------+--------------------------------+
| utf_32          | U32, utf32                     | all languages                  |
+-----------------+--------------------------------+--------------------------------+
| utf_32_be       | UTF-32BE                       | all languages                  |
+-----------------+--------------------------------+--------------------------------+
| utf_32_le       | UTF-32LE                       | all languages                  |
+-----------------+--------------------------------+--------------------------------+
| utf_16          | U16, utf16                     | all languages                  |
+-----------------+--------------------------------+--------------------------------+
| utf_16_be       | UTF-16BE                       | all languages                  |
+-----------------+--------------------------------+--------------------------------+
| utf_16_le       | UTF-16LE                       | all languages                  |
+-----------------+--------------------------------+--------------------------------+
| utf_7           | U7, unicode-1-1-utf-7          | all languages                  |
+-----------------+--------------------------------+--------------------------------+
| utf_8           | U8, UTF, utf8, cp65001         | all languages                  |
+-----------------+--------------------------------+--------------------------------+
| utf_8_sig       | utf8-sig                       | all languages                  |
+-----------------+--------------------------------+--------------------------------+
```

> *Changed in version 3.4.*
> The utf-16* and utf-32* encoders no longer allow surrogate code points
> (`U+D800`--`U+DFFF`) to be encoded.
> The utf-32* decoders no longer decode
> byte sequences that correspond to surrogate code points.

> *Changed in version 3.8.*
> `cp65001` is now an alias to `utf_8`.

> *Changed in version 3.14.*
> On Windows, `cpXXX` codecs are now available for all code pages.
