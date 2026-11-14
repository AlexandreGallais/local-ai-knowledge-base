---
title: "Intl.supportedValuesOf() (part 3 of 6)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/supportedvaluesof/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.supportedValuesOf() (part 3 of 6)

### Return value

A sorted array of unique string values indicating the values supported by the implementation for the given key. The values that could be returned are listed below.

#### Supported calendar types

Below are all values that are commonly supported by browsers for the `calendar` key. These values can be used for the `calendar` option or the `ca` Unicode extension key when creating objects such as `Intl.DateTimeFormat`, as well as for creating `Temporal` date objects. This list is explicitly sanctioned by the ECMA-402 specification, so all implementations should be consistent.

| Value              | Description                                                                                                                                                                                                                                                                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `buddhist`         | Thai Buddhist calendar, proleptic. Month numbers, month codes, and days are the same as in the ISO 8601 calendar, but the epoch year is different. There is one era.                                                                                                                                                                                                      |
| `chinese`          | Traditional Chinese calendar, proleptic. Lunisolar calendar used in China based on data published by the Purple Mountain Observatory between 1900 and 2100 (which compiles with GB/T 33661-2017 between 1912 and 2100), falling back to an implementation-defined approximation outside that range. The arithmetic year is identical to `gregory`, and there are no eras. |
| `coptic`           | Coptic calendar, proleptic. Similar solar algorithm to `ethioaa` and `ethiopic`, with one era and a different epoch year.                                                                                                                                                                                                                                                 |
| `dangi`            | Traditional Korean calendar, proleptic. Lunisolar calendar using months published by the Korea Astronomy and Space Science Institute (KASI) between 1900 and 2050, falling back to an implementation-defined approximation outside that range. The arithmetic year is identical to `gregory`, and there are no eras.                                                      |
| `ethioaa`          | Ethiopic calendar, Amete Alem, proleptic. Similar solar algorithm to `coptic` and `ethiopic`, with one era and a different epoch year.                                                                                                                                                                                                                                    |
| `ethiopic`         | Ethiopic calendar, Amete Mihret, proleptic. Similar solar algorithm to `coptic` and `ethioaa`, with two eras and a different epoch year.                                                                                                                                                                                                                                  |
| `gregory`          | Gregorian calendar, proleptic. Solar calendar almost identical to the ISO 8601 calendar, except that it does not define week numbering and it contains two eras, one before the epoch year.                                                                                                                                                                               |
| `hebrew`           | Hebrew calendar, proleptic. Civil calendar with Tishrei as the first month of the year. Lunisolar calendar with one leap month inserted after month 5. There is one era.                                                                                                                                                                                                  |
| `indian`           | Indian national (or Śaka) calendar, proleptic. Solar calendar with one era.                                                                                                                                                                                                                                                                                               |
| `islamic-civil`    | Hijri calendar, proleptic, tabular/rule-based with leap year rule II (leap years 2,5,7,10,13,16,18,21,24,26,29 in the 30-year cycle (1-based numbering)) and civil epoch (Friday July 16, 622 Julian / 0622-07-19 ISO)                                                                                                                                                    |
| `islamic-tbla`     | Hijri calendar, proleptic, tabular/rule-based with leap year rule II (leap years 2,5,7,10,13,16,18,21,24,26,29 in the 30-year cycle (1-based numbering)) and astronomical epoch (Thursday July 15, 622 Julian / 0622-07-18 ISO)                                                                                                                                           |
| `islamic-umalqura` | Hijri calendar, proleptic, Umm al-Qura. Lunar calendar using KACST-calculated months from the start of 1300 AH (1882-11-12 ISO) to the end of 1600 AH (2174-11-25 ISO), falling back to `islamic-civil` outside that range.                                                                                                                                               |
| `iso8601`          | ISO calendar (variant of the Gregorian calendar with week rules and formatting parameters made region-independent)                                                                                                                                                                                                                                                        |
| `japanese`         | Japanese Imperial calendar (this calendar adds an era for each new emperor, so the output year and era for a future date may not match the input year and era when your code runs on a future engine version. **Note:** See the remarks below this table about dates prior to 1868-10-23 ISO.)                                                                            |
| `persian`          | Persian (or Solar Hijri) calendar, proleptic. There is one era.                                                                                                                                                                                                                                                                                                           |
| `roc`              | Republic of China (or Minguo) calendar, proleptic. Month numbers, month codes, and days are the same as in the ISO 8601 calendar, but the epoch year is different. There are two eras, one before the epoch year and one after.                                                                                                                                           |

As of October 2025, in the `japanese` calendar, dates prior to 1868-10-23 ISO (the start date of the year 1 Meiji) don't work as expected in browsers in two ways. First, CLDR had the wrong start date for the Meiji era, which causes calendar implementations to extend the Meiji era further to the past than it actually did. Second, the upcoming Intl era and monthCode Proposal specifies that dates prior to 1873-01-01 ISO should use Gregorian eras, but browsers have traditionally used approximations of prior Japanese eras instead. The `japanese` calendar was taken into use on January 1, 6 Meiji / 1873-01-01 ISO, so these problems only affect proleptic dates.

The types below are specified in CLDR but do not have implementations distinct from the above calendars in browsers.

| Value                            | Description                               | Notes                                                                                                                                                                                                                                                                                                                                        |
| -------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ethiopic-amete-alem`            | Ethiopic calendar, Amete Alem, proleptic. | This is an alias for `ethioaa` and therefore is not returned by `supportedValuesOf()`. Use `ethioaa` instead.                                                                                                                                                                                                                                |
| `islamic`                        | Hijri calendar, unspecified algorithm.    | As of April 2025, this is an astronomical simulation whose parameters are undocumented and that is not known to match a specific Hijri calendar variant from non-software contexts. It is specified to be canonicalized to a different calendar, usually one of `islamic-umalqura`, `islamic-tbla`, or `islamic-civil`, and raise a warning. |
| `islamicc` (deprecated) | Civil (algorithmic) Arabic calendar.      | This is an alias for `islamic-civil` and therefore is not returned by `supportedValuesOf()`. Use `islamic-civil` instead.                                                                                                                                                                                                                    |

The `Temporal.PlainDate.prototype.era` and `Temporal.PlainDate.prototype.monthCode` docs provide more information about different calendars.

References:

- CLDR Calendar type keys
- UTS 35, Dates
- Islamic calendar types (CLDR design proposal)

#### Supported collation types

Below are all values that are commonly supported by browsers for the `collation` key. These values can be used for the `collation` option or the `co` Unicode extension key when creating objects such as `Intl.Collator`.

| Value      | Description                                                                                                                                                                                        |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compat`   | A previous version of the ordering, for compatibility (for Arabic)                                                                                                                                 |
| `dict`     | Dictionary style ordering (for Sinhala). Also recognized as `dictionary`.                                                                                                                          |
| `emoji`    | Recommended ordering for emoji characters. The requested language has no effect, so combining this with a language that requires language-specific rules breaks sorting for text in that language! |
| `eor`      | European ordering rules (ENV 13710). This order is designed not to be language-specific. While the API requires attaching this to a language, the requested language has no effect on the order.   |
| `phonebk`  | Phonebook style ordering (for German). Also recognized as `phonebook`.                                                                                                                             |
| `phonetic` | Phonetic ordering (sorting based on pronunciation; for Lingala)                                                                                                                                    |
| `pinyin`   | Pinyin ordering for Latin and for Han characters (for Chinese)                                                                                                                                     |
| `searchjl` | Special collation type for Korean initial consonant search. **Warning:** This collation is not for sorting, even though you can only use it with `Intl.Collator` of `usage: "sort"`.   |
| `stroke`   | Pinyin ordering for Latin, stroke order for Han characters (for Chinese)                                                                                                                           |
| `trad`     | Traditional style ordering (such as in Spanish). Also recognized as `traditional`.                                                                                                                 |
| `unihan`   | Unihan radical-stroke ordering for Han characters (for Chinese, Japanese, and Korean), Pinyin ordering for Latin for Chinese and Japanese standard kana ordering for Japanese                      |
| `zhuyin`   | Pinyin ordering for Latin, zhuyin order for Bopomofo and Han characters (for Chinese)                                                                                                              |

The types below are specified in CLDR data, but are deprecated, are discouraged from explicit usage, and/or may not be indicated by browsers as supported for various reasons. Avoid using them:
