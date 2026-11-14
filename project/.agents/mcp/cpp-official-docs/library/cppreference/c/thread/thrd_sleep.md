# thrd_sleep

| Defined in header `<threads.h>` |  |
| --- | --- |
| `int thrd_sleep( const struct timespec* duration, struct timespec* remaining );` | (since C11) |

Blocks the execution of the current thread for *at least* until the `TIME_UTC` based duration pointed to by `duration` has elapsed.

The sleep may resume earlier if a `signal` that is not ignored is received. In such case, if `remaining` is not `NULL`, the remaining time duration is stored into the object pointed to by `remaining`.

### Parameters

|  |  |  |
| --- | --- | --- |
| duration | - | pointer to the duration to sleep for |
| remaining | - | pointer to the object to put the remaining time on interruption. May be `NULL`, in which case it is ignored |

### Return value

`​0​` on successful sleep, `-1` if a signal occurred, other negative value if an error occurred.

### Notes

`duration` and `remaining` may point at the same object, which simplifies re-running the function after a signal.

The actual sleep time may be longer than requested because it is rounded up to the timer granularity and because of scheduling and context switching overhead.

The POSIX equivalent of this function is `nanosleep`.

### Example

```c
#include <threads.h>
#include <time.h>
#include <stdio.h>

int main(void)
{
    printf("Time: %s", ctime(&(time_t){time(NULL)}));
    thrd_sleep(&(struct timespec){.tv_sec=1}, NULL); // sleep 1 sec
    printf("Time: %s", ctime(&(time_t){time(NULL)}));
}
```

Output:

```text
Time: Mon Feb  2 16:18:41 2015
Time: Mon Feb  2 16:18:42 2015
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.26.5.7 The thrd_sleep function (p: 281)

- C11 standard (ISO/IEC 9899:2011):

- 7.26.5.7 The thrd_sleep function (p: 385)

### See also

|  |  |
| --- | --- |
| thrd_yield (C11) | yields the current time slice (function) |
| C++ documentation for sleep_for |  |
