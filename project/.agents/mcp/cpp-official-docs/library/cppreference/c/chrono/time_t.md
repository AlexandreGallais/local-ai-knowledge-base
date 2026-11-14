# time_t

Defined in header `<time.h>`

`typedef /* unspecified */ time_t;`

Real arithmetic type capable of representing times.

Although not defined by the C standard, this is almost always an integral value holding the number of seconds (not counting leap seconds) since 00:00, Jan 1 1970 UTC, corresponding to POSIX time.

### Notes

The standard uses the term *calendar time* when referring to a value of type `time_t`.

### Example

Show the start of the epoch.

```c
#include <stdio.h>
#include <time.h>
#include <stdint.h>

int main(void)
{
    time_t epoch = 0;
    printf("%jd seconds since the epoch began\n", (intmax_t)epoch);
    printf("%s", asctime(gmtime(&epoch)));
}
```

Possible output:

```text
0 seconds since the epoch began
Thu Jan  1 00:00:00 1970
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.27.1/3 Components of time (p: 284)

- C11 standard (ISO/IEC 9899:2011):

- 7.27.1/3 Components of time (p: 388)

- C99 standard (ISO/IEC 9899:1999):

- 7.23.1/3 Components of time (p: 338)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.12.1 Components of time

### See also

|  |  |
| --- | --- |
| time | returns the current calendar time of the system as time since epoch (function) |
| localtime, localtime_r, localtime_s (C23), (C11) | converts time since epoch to calendar time expressed as local time (function) |
| gmtime, gmtime_r, gmtime_s (C23), (C11) | converts time since epoch to calendar time expressed as Coordinated Universal Time (UTC) (function) |
| C++ documentation for time_t |  |
