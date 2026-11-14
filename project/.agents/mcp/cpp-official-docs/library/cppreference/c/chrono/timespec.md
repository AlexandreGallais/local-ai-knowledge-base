# timespec

| Defined in header `<time.h>` |  |
| --- | --- |
| `struct timespec;` | (since C11) |

Structure holding an interval broken down into seconds and nanoseconds.

### Member objects

| Member | Description |
| --- | --- |
| `time_t` `tv_sec` | whole seconds (valid values are >= `​0​`) |
| `/* see below */` `tv_nsec` | nanoseconds (valid values are `[``​0​``,``999999999``]`) |

|  |  |
| --- | --- |
| The type of `tv_nsec` is `long`. | (until C23) |
| The type of `tv_nsec` is an implementation-defined signed integer type that can represent integers in `[``​0​``,``999999999``]`. | (since C23) |

The declaration order of `tv_sec` and `tv_nsec` is unspecified. Implementation may add other members to `struct timespec`.

### Notes

The type of `tv_nsec` is `long long` on some platforms, which is conforming only since C23.

### Example

```c
#include <stdint.h>
#include <stdio.h>
#include <time.h>

int main(void)
{
    struct timespec ts;
    timespec_get(&ts, TIME_UTC);
    char buff[100];
    strftime(buff, sizeof buff, "%D %T", gmtime(&ts.tv_sec));
    printf("Current time: %s.%09ld UTC\n", buff, ts.tv_nsec);
    printf("Raw timespec.tv_sec: %jd\n", (intmax_t)ts.tv_sec);
    printf("Raw timespec.tv_nsec: %09ld\n", ts.tv_nsec);
}
```

Possible output:

```text
Current time: 04/04/24 14:45:17.885909786 UTC
Raw timespec.tv_sec: 1712241917
Raw timespec.tv_nsec: 885909786
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.27.1/3 Components of time (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.27.1/3 Components of time (p: 284)

- C11 standard (ISO/IEC 9899:2011):

- 7.27.1/3 Components of time (p: 388)

### See also

|  |  |
| --- | --- |
| timespec_get (C11) | returns the calendar time in seconds and nanoseconds based on a given time base (function) |
| tm | calendar time type (struct) |
| C++ documentation for timespec |  |
