---
title: "Intl.supportedValuesOf() (part 4 of 6)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/supportedvaluesof/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.supportedValuesOf() (part 4 of 6)

| Value                            | Description                                                                                                             | Notes                                                                                                                                                                                                                                                                                                               |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `big5han` (deprecated)  | Pinyin ordering for Latin, big5 charset ordering for CJK characters (used in Chinese)                                   | Deprecated.                                                                                                                                                                                                                                                                                                         |
| `direct` (deprecated)   | Binary code point order (used in Hindi)                                                                                 | Deprecated.                                                                                                                                                                                                                                                                                                         |
| `ducet`                          | The default Unicode collation element table order                                                                       | The `ducet` collation type is not available to the Web.                                                                                                                                                                                                                                                             |
| `gb2312` (deprecated)   | Pinyin ordering for Latin, gb2312han charset ordering for CJK characters (for Chinese). Also recognized as `gb2312han`. | Deprecated.                                                                                                                                                                                                                                                                                                         |
| `reformed` (deprecated) | Reformed ordering (such as Swedish)                                                                                     | Deprecated. This is the old name for the default ordering for Swedish whose collation naming used to differ from other languages. Since this was the default, request `sv` instead of requesting `sv-u-co-reformed`.                                         |
| `search`                         | Special collation type for string search                                                                                | Do not use as a collation type, since in `Intl.Collator`, this collation is activated via the `usage: "search"` option. There is currently no API for substring search, so this is currently only good for filtering a list of strings by trying a full-string match of the key <example-value> each list item. |
| `standard`                       | Default ordering for each language, except Chinese (and, previously, Swedish)                                           | Do not use explicitly. In general, it's unnecessary to specify this explicitly and specifying this for Swedish is problematic due to the different meaning for Swedish in the past.                                                                                                                                 |

References:

- CLDR Collation type keys
- UTS 35, Collation

#### Supported currency identifiers

Currency identifiers are three-letter uppercase codes defined in ISO 4217. These values can be used for the `currency` option when creating objects such as `Intl.NumberFormat`, as well as for `Intl.DisplayNames.prototype.of()`. There are over 300 identifiers in common use so we won't list them. For an exhaustive list of possible identifiers, see the Wikipedia article.

References:

- CLDR Currency type keys
- ISO 4217 Currency codes
- UTS 35, Currencies

#### Supported numbering system types

Below are all values that are commonly supported by browsers for the `numberingSystem` key. These values can be used for the `numberingSystem` option or the `nu` Unicode extension key when creating objects such as `Intl.NumberFormat`. For the rows with "digit characters", the runtime translates the digits one-by-one without extra actions. The others marked as "algorithmic" need additional algorithms to translate the digits. The higher the Unicode code point is, the newer the numbering system is and the more likely it is unsupported by all browsers.
