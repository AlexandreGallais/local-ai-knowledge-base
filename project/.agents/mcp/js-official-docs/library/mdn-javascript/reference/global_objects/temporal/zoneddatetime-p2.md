---
title: "Temporal.ZonedDateTime (part 2 of 4)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/temporal/zoneddatetime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Temporal.ZonedDateTime (part 2 of 4)

## Description

A `ZonedDateTime` functions as a bridge between an exact time and a wall-clock time: it simultaneously represents an instant in history (like a `Temporal.Instant`) and a local, wall-clock time (like a `Temporal.PlainDateTime`). It does so by storing the instant, the time zone, and the calendar system. The time zone is used to convert between the instant and the local time, and the calendar system is used to interpret the local time.

`ZonedDateTime` is the only `Temporal` class that is time zone-aware. The addition of a time zone makes `ZonedDateTime` objects have important behavior differences from `Temporal.PlainDateTime` objects. Namely, you can no longer assume that "the time 1 minute afterwards" is the same every day, or that a day has 24 hours. In the worst case, an entire day may be missing from the local calendar. Below, we offer a quick overview of time zones and offsets and how they affect conversion between UTC time and local time.

### Time zones and offsets

All times in JavaScript have one golden standard: the UTC time, which increments continuously and uniformly as physical time progresses. By contrast, users are more interested in their local time, which is the time they read on their calendars and clocks. The process of converting between UTC time and local time involves a time zone _offset_, which is calculated as:

```plain
local time = UTC time + offset
```

For example, if the UTC time is 1970-01-01T00:00:00, and the offset is "-05:00", then the local time is:

```plain
1970-01-01T00:00:00 + -05:00 = 1969-12-31T19:00:00
```

By suffixing this local time with the offset, thus expressing this time as "1969-12-31T19:00:00-05:00", it can now be unambiguously understood as an instant in history.

To know the offset, we need two pieces of information, the _time zone_, and the _instant_. The time zone is a region on Earth where the same offset is used at all times. Two clocks in the same time zone will always show the same time simultaneously, but the offset is not necessarily constant: that is, these clocks' times may change abruptly. This commonly happens during daylight saving time transitions, where the offset changes by an hour, which happens twice a year. Offsets can also change permanently due to political changes, e.g., a country switching time zones.

The time zones are stored in the IANA Time Zone Database. Each IANA time zone has:

- A _primary time zone identifier_ that uniquely identifies the time zone. It usually refers to a geographic area anchored by a city (e.g., `Europe/Paris` or `Africa/Kampala`), but can also denote single-offset time zones like `UTC` (a consistent `+00:00` offset) or `Etc/GMT+5` (which for historical reasons is a negative offset `-05:00`). For historical reasons, the primary name for the UTC time zone is `UTC`, though in IANA it is `Etc/UTC`.
- A _time zone definition_ in the form of a table that maps UTC date/time ranges (including future ranges) to specific offsets.
- Zero or more _non-primary time zone identifiers_ that are aliases to the primary time zone identifier. These are usually historical names that are no longer in use, but are kept for compatibility reasons. See below for more information.

As input, named identifiers are matched case-insensitively. Internally, they are stored in their preferred case, and non-primary identifiers will _not_ be converted to their primary identifier.

> **Note:**
> When setting the time zone name, you rarely want to set it to `"UTC"`. `ZonedDateTime` is intended to be displayed to users, but no human lives in the "UTC" time zone. If you don't know the time zone at construction time but know the wall-clock time, use a `Temporal.PlainDateTime`. If you know the exact instant, use a `Temporal.Instant`.

When a `Temporal` API accepts a _time zone identifier_, in addition to primary time zone identifiers and non-primary time zone identifiers, it also accepts an _offset time zone identifier_, which is in the same form as the offset, except subminute precision is not allowed. For example, `+05:30`, `-08`, `+0600` are all valid offsets identifiers. Internally, offset identifiers are stored in the `±HH:mm` form.

> **Note:**
> Avoid using offset identifiers if there is a named time zone you can use instead. Even if a region has always used a single offset, it is better to use the named identifier to guard against future political changes to the offset.
>
> If a region uses (or has used) multiple offsets, then using its named time zone is even more important. This is because `Temporal.ZonedDateTime` can use methods like `add` or `with` to create new instances at a different instant. If those derived instances correspond to an instant that uses a different offset (for example, after a Daylight Saving Time transition) then your calculations will have an incorrect local time. Using a named time zone ensures that local dates and times are always adjusted for the correct offset for that instant.

For convenience, when providing a time zone identifier to `Temporal` APIs such as `Temporal.ZonedDateTime.prototype.withTimeZone()` and the `timeZoneId` option of `Temporal.ZonedDateTime.from()`, you can provide it in a few other forms:

- As another `ZonedDateTime` instance, whose `timeZoneId` will be used.
- As an RFC 9557 string with a time zone annotation, whose time zone identifier will be used.
- As an ISO 8601 / RFC 3339 string containing an offset, whose offset will be used as an offset identifier; or, if using `Z`, then the `"UTC"` time zone is used. This usage is generally not recommended, because as discussed above, offset identifiers lack the ability to safely derive other `Temporal.ZonedDateTime` instances across an offset transition like when daylight saving time starts or ends. Instead, consider just using `Temporal.Instant` or fetching the user's actual named time zone.

The IANA time zone database changes from time to time, usually to add new time zones in response to political changes. However, on rare occasions, IANA time zone identifiers are renamed to match updated English translation of a city name or to update outdated naming conventions. For example, here are a few notable name changes:

| Current IANA primary identifier  | Old, now non-primary identifier |
| -------------------------------- | ------------------------------- |
| `America/Argentina/Buenos_Aires` | `America/Buenos_Aires`          |
| `Asia/Kolkata`                   | `Asia/Calcutta`                 |
| `Asia/Ho_Chi_Minh`               | `Asia/Saigon`                   |
| `Europe/Kyiv`                    | `Europe/Kiev`                   |

Historically, these renames caused problems for programmers because the Unicode CLDR database (a library used by browsers to supply time zone identifiers and data) did not follow IANA's renaming for stability reasons. As a result, some browsers like Chrome and Safari reported CLDR's outdated identifiers, while other browsers like Firefox overrode CLDR's defaults and reported the up-to-date primary identifiers.

With the introduction of Temporal, this behavior is now more standardized:

- CLDR data now includes an `"_iana"` attribute that indicates the most up-to-date identifier if the older, stable identifier has been renamed. Browsers can use this new attribute to provide up-to-date identifiers to callers.
- Time zone identifiers provided by the programmer will never be replaced with an alias. For example, if the caller provides `Asia/Calcutta` or `Asia/Kolkata` as the identifier input to `Temporal.ZonedDateTime.from()`, then the same identifier is returned in the resulting instance's `timeZoneId`. Note that the letter case of outputs are normalized to match IANA, so that `ASIA/calCuTTa` as input generates a `timeZoneId` of `Asia/Calcutta` as output.
- When a time zone identifier is not provided by a caller but is instead sourced from the system itself (for example, when using `Temporal.Now.timeZoneId()`), modern identifiers are returned in all browsers. For city renames, there is a two-year lag before these system-provided-identifier APIs expose the new name, thereby giving other components (like a Node server) time to update their copies of the IANA database to recognize the new name.

Note that the attribution of primary identifiers preserves the country code: for example, the IANA database records `Atlantic/Reykjavik` as an alias for `Africa/Abidjan`, but because they correspond to different countries (Iceland and Côte d'Ivoire, respectively), they are treated as distinct primary identifiers.

This standardization applies outside of `Temporal` as well. For example, the `timeZone` option returned by `Intl.DateTimeFormat.prototype.resolvedOptions()` is also never replaced with an alias, though browsers have traditionally canonicalized these identifiers prior to standardization by Temporal. On the other hand, `Intl.Locale.prototype.getTimeZones()` and `Intl.supportedValuesOf()` (`timeZone` option) will return the most up-to-date identifier, while some browsers used to return the old, non-primary identifier.

### RFC 9557 format

`ZonedDateTime` objects can be serialized and parsed using the RFC 9557 format, an extension to the ISO 8601 / RFC 3339 format. The string has the following form (spaces are only for readability and should not be present in the actual string):

```plain
YYYY-MM-DD T HH:mm:ss.sssssssss Z/±HH:mm [time_zone_id] [u-ca=calendar_id]
```

- `YYYY`
    Either a four-digit number, or a six-digit number with a `+` or `-` sign.
- `MM`
    A two-digit number from `01` to `12`.
- `DD`
    A two-digit number from `01` to `31`. The `YYYY`, `MM`, and `DD` components can be separated by `-` or nothing.
- `T` (optional)
    The date-time separator, which can be `T`, `t`, or a space. Present if and only if `HH` is present.
- `HH` (optional)
    A two-digit number from `00` to `23`. Defaults to `00`.
- `mm` (optional)
    A two-digit number from `00` to `59`. Defaults to `00`.
- `ss.sssssssss` (optional)
    A two-digit number from `00` to `59`. May optionally be followed by a `.` or `,` and one to nine digits. Defaults to `00`. The `HH`, `mm`, and `ss` components can be separated by `:` or nothing. You can omit either just `ss` or both `ss` and `mm`, so the time can be one of three forms: `HH`, `HH:mm`, or `HH:mm:ss.sssssssss`.
- `Z/±HH:mm` (optional)
    Either the UTC designator `Z` or `z`, or an offset from UTC in the form `+` or `-` followed by the same format as the time component. Note that subminute precision (`:ss.sssssssss`) may be unsupported by other systems, and is accepted but never output. If omitted, the offset is derived from the time zone identifier. If present, then the time must be provided too. `Z` is not the same as `+00:00`: the former means that the time is given in UTC form regardless of the time zone identifier, while the latter means that the time is given in local time which happens to be UTC+0, and will be validated against the time zone identifier via the `offset` option.
- `[time_zone_id]`
    Replace `time_zone_id` with the time zone identifier (named or offset) as described above. May have a _critical flag_ by prefixing the identifier with `!`: e.g., `[!America/New_York]`. This flag generally tells other systems that it cannot be ignored if they don't support it. Note that it is required for `Temporal.ZonedDateTime.from()`: omitting it causes a `RangeError`. If you want to parse ISO 8601 / RFC 3339 strings without time zone identifier annotations, use `Temporal.Instant.from()` instead.
- `[u-ca=calendar_id]` (optional)
    Replace `calendar_id` with the calendar to use. See `Intl.supportedValuesOf()` for a list of commonly supported calendar types. Defaults to `[u-ca=iso8601]`. May have a _critical flag_ by prefixing the key with `!`: e.g., `[!u-ca=iso8601]`. This flag generally tells other systems that it cannot be ignored if they don't support it. The `Temporal` parser will throw an error if the annotations contain two or more calendar annotations and one of them is critical. Note that the `YYYY-MM-DD` is always interpreted as an ISO 8601 calendar date and then converted to the specified calendar.

As an input, other annotations in the `[key=value]` format are ignored, and they must not have the critical flag.

When serializing, you can configure the fractional second digits, whether to display the offset/time zone ID/calendar ID, and whether to add a critical flag for the annotations.
