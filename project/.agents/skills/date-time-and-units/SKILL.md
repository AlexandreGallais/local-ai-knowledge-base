---
name: date-time-and-units
description: "Handles dates, times, time zones and unit conversions without classic bugs - UTC storage, ISO 8601, explicit zones, durations, unit suffixes. Use when parsing, storing, comparing or displaying dates and times, scheduling, computing durations, or converting units."
metadata:
  id: DEV-13
  stars: "2"
  nature: reference
  mode: A
  wave: V3
  load: auto
---

# Dates, times and units

**Core rule:** store and compute in UTC with explicit types, convert to local time only for display, and carry units in names or types.

## Procedure

1. Store instants in UTC, serialised as ISO 8601 with an offset (`2026-11-19T08:30:00Z`).
   - Check: no stored date string without a zone.
2. Use the language's date library, never manual string arithmetic.
   - Check: parsing and formatting go through the library.
3. Convert to a named time zone only for display (`Europe/Paris`), not with a fixed offset.
   - Check: a test around a daylight-saving change passes.
4. Use durations and monotonic clocks for elapsed time (`performance.now()`, `time.monotonic()`, `Instant`).
   - Check: no wall-clock difference used to measure durations.
5. Put units in names (`timeoutMs`, `lengthM`) or types, and convert at boundaries only (`units-and-dimensions` if present).
   - Check: no bare number crosses a module boundary without its unit.

## Stop and ask the human if

- Business rules depend on a calendar (working days, local midnight) not specified.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Add 24 hours for tomorrow." | Daylight-saving days have 23 or 25 hours. Add one calendar day. |
| "JavaScript months start at 1." | `Date` months start at 0. |

## Definition of done

- [ ] UTC storage, ISO 8601 with zone, display conversion with a named zone, units explicit; DST test passes.
