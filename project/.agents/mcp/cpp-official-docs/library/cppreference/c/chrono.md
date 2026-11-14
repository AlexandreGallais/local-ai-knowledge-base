# Date and time utilities

### Functions

|  |  |
| --- | --- |
| Time manipulation |  |
| Defined in header `<time.h>` |  |
| difftime | computes the difference between times (function) |
| time | returns the current calendar time of the system as time since epoch (function) |
| clock | returns raw processor clock time since the program is started (function) |
| timespec_get (C11) | returns the calendar time in seconds and nanoseconds based on a given time base (function) |
| timespec_getres (C23) | returns the resolution of calendar time based on a given time base (function) |
| Format conversions |  |
| Defined in header `<time.h>` |  |
| asctime, asctime_s (deprecated in C23), (C11) | converts a `tm` object to a textual representation (function) |
| ctime, ctime_s (deprecated in C23), (C11) | converts a `time_t` object to a textual representation (function) |
| strftime | converts a `tm` object to custom textual representation (function) |
| Defined in header `<wchar.h>` |  |
| wcsftime (C95) | converts a `tm` object to custom wide string textual representation (function) |
| Defined in header `<time.h>` |  |
| gmtime, gmtime_r, gmtime_s (C23), (C11) | converts time since epoch to calendar time expressed as Coordinated Universal Time (UTC) (function) |
| localtime, localtime_r, localtime_s (C23), (C11) | converts time since epoch to calendar time expressed as local time (function) |
| mktime | converts calendar time to time since epoch (function) |

### Constants

| Defined in header `<time.h>` |  |
| --- | --- |
| CLOCKS_PER_SEC | number of processor clock ticks per second (macro constant) |

### Types

| Defined in header `<time.h>` |  |
| --- | --- |
| tm | calendar time type (struct) |
| time_t | calendar time since epoch type (typedef) |
| clock_t | processor time since era type (typedef) |
| timespec (C11) | time in seconds and nanoseconds (struct) |

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.27 Date and time <time.h> (p: 284-291)

- 7.29.5.1 The wcsftime function (p: 320-321)

- 7.31.14 Date and time <time.h> (p: 333)

- C11 standard (ISO/IEC 9899:2011):

- 7.27 Date and time <time.h> (p: 388-397)

- 7.29.5.1 The wcsftime function (p: 439-440)

- 7.31.14 Date and time <time.h> (p: 456)

- C99 standard (ISO/IEC 9899:1999):

- 7.23 Date and time <time.h> (p: 338-347)

- 7.24.5.1 The wcsftime function (p: 385-386)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.12 DATE AND TIME <time.h>

### See also

C++ documentation for C Date and time utilities
