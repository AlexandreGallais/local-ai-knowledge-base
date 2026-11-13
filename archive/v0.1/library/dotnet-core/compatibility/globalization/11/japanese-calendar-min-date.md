---
title: "Breaking change: Japanese Calendar minimum supported date corrected"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/globalization/11/japanese-calendar-min-date.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Japanese Calendar minimum supported date corrected

The start date of the Japanese Meiji era has been updated from `1868-09-08` to `1868-10-23` to reflect the latest Unicode Common Locale Data Repository (CLDR) data and improved historical accuracy. This date also serves as the minimum supported date in the Japanese calendar.

## Version introduced

.NET 11

## Previous behavior

Previously, `System.Globalization.JapaneseCalendar.MinSupportedDateTime` returned `1868-09-08`. `System.Globalization.JapaneseCalendar` accepted dates between `1868-09-08` and `1868-10-23` as valid.

## New behavior

Starting in .NET 11, `System.Globalization.JapaneseCalendar.MinSupportedDateTime` returns `1868-10-23` instead. `System.Globalization.JapaneseCalendar` now rejects dates between `1868-09-08` and `1868-10-23` as invalid.

## Type of breaking change

This change is a behavioral change.

## Reason for change

The change was made to reflect the latest Unicode CLDR data (CLDR-11375) and improved historical accuracy regarding the start of the Meiji era in Japan.

## Recommended action

Update any code that depends on the old value of `System.Globalization.JapaneseCalendar.MinSupportedDateTime`. Avoid using Gregorian dates before `1868-10-23` with the `System.Globalization.JapaneseCalendar`.

## Affected APIs

- `System.Globalization.JapaneseCalendar`
- `System.Globalization.JapaneseCalendar.MinSupportedDateTime`
