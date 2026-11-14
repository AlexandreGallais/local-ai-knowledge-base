# timespec_get

| Defined in header `<time.h>` |  |  |
| --- | --- | --- |
| `int timespec_get( struct timespec *ts, int base );` | (1) | (since C11) |
| `#define TIME_UTC /* implementation-defined */` | (2) | (since C11) |

1) Modifies the `timespec` object pointed to by `ts` to hold the current calendar time in the time base `base`.

2) Expands to a value suitable for use as the `base` argument of `timespec_get`

Other macro constants beginning with `TIME_` may be provided by the implementation to indicate additional time bases

If `base` is `TIME_UTC`, then

- `ts->tv_sec` is set to the number of seconds since an implementation defined epoch, truncated to a whole value
- `ts->tv_nsec` member is set to the integral number of nanoseconds, rounded to the resolution of the system clock

### Parameters

|  |  |  |
| --- | --- | --- |
| ts | - | pointer to an object of type `struct timespec` |
| base | - | `TIME_UTC` or another nonzero integer value indicating the time base |

### Return value

The value of `base` if successful, zero otherwise.

### Notes

The POSIX function `clock_gettime(CLOCK_REALTIME, ts)` may also be used to populate a `timespec` with the time since the Epoch.

### Example

```c
#include <stdio.h>
#include <time.h>

int main(void)
{
    struct timespec ts;
    timespec_get(&ts, TIME_UTC);
    char buff[100];
    strftime(buff, sizeof buff, "%D %T", gmtime(&ts.tv_sec));
    printf("Current time: %s.%09ld UTC\n", buff, ts.tv_nsec);
}
```

Possible output:

```text
Current time: 02/18/15 14:34:03.048508855 UTC
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.27.2.5 The timespec_get function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.27.2.5 The timespec_get function (p: 286)

- C11 standard (ISO/IEC 9899:2011):

- 7.27.2.5 The timespec_get function (p: 390)

### See also

|  |  |
| --- | --- |
| timespec (C11) | time in seconds and nanoseconds (struct) |
| timespec_getres (C23) | returns the resolution of calendar time based on a given time base (function) |
| time | returns the current calendar time of the system as time since epoch (function) |
| C++ documentation for timespec_get |  |
