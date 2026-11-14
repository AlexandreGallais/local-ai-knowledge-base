# difftime

Defined in header `<time.h>`

`double difftime( time_t time_end, time_t time_beg );`

Computes difference between two calendar times as `time_t` objects (`time_end - time_beg`) in seconds. If `time_end` refers to time point before `time_beg` then the result is negative.

### Parameters

time_beg, time_end - times to compare

### Return value

Difference between two times in seconds.

### Notes

On POSIX systems, `time_t` is measured in seconds, and `difftime` is equivalent to arithmetic subtraction, but C and C++ allow fractional units for `time_t`.

### Example

The following program computes the number of seconds that have passed since the beginning of the month.

```c
#include <stdio.h>
#include <time.h>

int main(void)
{
    time_t now = time(0);

    struct tm beg = *localtime(&now);

    // set beg to the beginning of the month
    beg.tm_hour = 0,
    beg.tm_min = 0,
    beg.tm_sec = 0,
    beg.tm_mday = 1;

    double seconds = difftime(now, mktime(&beg));

    printf("%.f seconds have passed since the beginning of the month.\n", seconds);

    return 0;
}
```

Output:

```text
1937968 seconds have passed since the beginning of the month.
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.27.2.2 The difftime function (p: 285)

- C11 standard (ISO/IEC 9899:2011):

- 7.27.2.2 The difftime function (p: 390)

- C99 standard (ISO/IEC 9899:1999):

- 7.23.2.2 The difftime function (p: 338)

- C89/C90 standard (ISO/IEC 9899:1990):

- 7.12.2.2 The difftime function (p: 171)

### See also

C++ documentation for difftime
