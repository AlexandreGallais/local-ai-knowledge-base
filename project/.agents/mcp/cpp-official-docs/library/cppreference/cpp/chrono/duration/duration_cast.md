# std::chrono::duration_cast

| Defined in header `<chrono>` |  |
| --- | --- |
| `template< class ToDuration, class Rep, class Period > constexpr ToDuration duration_cast( const std::chrono::duration<Rep, Period>& d );` | (since C++11) |

Converts a `std::chrono::duration` to a duration of different type `ToDuration`.

The function only participate in overload resolution if `ToDuration` is a specialization of `std::chrono::duration`.

Let

- `ToRep` be `typename ToDuration::rep`,
- `ToPeriod` be `typename ToDuration::period`,
- `CF` be `std::ratio_divide<Period, ToPeriod>`,
- `CR` be `std::common_type<Rep, ToRep, std::intmax_t>::type`,
- `cr_count` be `static_cast<CR>(d.count())`,
- `cr_num` be `static_cast<CR>(CF::num)`, and
- `cr_den` be `static_cast<CR>(CF::den)`,

the result is:

|  |  | `CF::num` |  |
| --- | --- | --- | --- |
| `1` | not `1` |  |  |
| `CF::den` | `1` | `ToDuration(static_cast<ToRep> (d.count()))` | `ToDuration(static_cast<ToRep> (cr_count * cr_num))` |
| not `1` | `ToDuration(static_cast<ToRep> (cr_count / cr_den))` | `ToDuration(static_cast<ToRep> (cr_count * cr_num / cr_den))` |  |

### Parameters

d - duration to convert

### Return value

`d` converted to a duration of type `ToDuration`.

### Notes

No implicit conversions are used. Multiplications and divisions are avoided where possible, if it is known at compile time that one or more parameters are `1`. Computations are done in the widest type available and converted, as if by `static_cast`, to the result type only when finished.

Casting between integer durations where the source period is exactly divisible by the target period (e.g. hours to minutes) or between floating-point durations can be performed with ordinary casts or implicitly via `std::chrono::duration` constructors, no `duration_cast` is needed.

Casting from a floating-point duration to an integer duration is subject to undefined behavior when the floating-point value is NaN, infinity, or too large to be representable by the target's integer type. Otherwise, casting to an integer duration is subject to truncation as with any `static_cast` to an integer type.

### Example

This example measures the execution time of a function.

```cpp
#include <chrono>
#include <iostream>
#include <ratio>
#include <thread>

void f()
{
    std::this_thread::sleep_for(std::chrono::seconds(1));
}

int main()
{
    const auto t1 = std::chrono::high_resolution_clock::now();
    f();
    const auto t2 = std::chrono::high_resolution_clock::now();

    // floating-point duration: no duration_cast needed
    const std::chrono::duration<double, std::milli> fp_ms = t2 - t1;

    // integral duration: requires duration_cast
    const auto int_ms = std::chrono::duration_cast<std::chrono::milliseconds>(t2 - t1);

    // converting integral duration to integral duration of
    // shorter divisible time unit: no duration_cast needed
    const std::chrono::duration<long, std::micro> int_usec = int_ms;

    std::cout << "f() took " << fp_ms << ", or "
              << int_ms << " (whole milliseconds), or "
              << int_usec << " (whole microseconds)\n";
}
```

Possible output:

```text
f() took 1000.14ms, or 1000ms (whole milliseconds), or 1000000us (whole microseconds)
```

### See also

|  |  |
| --- | --- |
| duration (C++11) | a time interval (class template) |
| time_point_cast (C++11) | converts a time point to another time point on the same clock, with a different duration (function template) |
| floor(std::chrono::duration) (C++17) | converts a duration to another, rounding down (function template) |
| ceil(std::chrono::duration) (C++17) | converts a duration to another, rounding up (function template) |
| round(std::chrono::duration) (C++17) | converts a duration to another, rounding to nearest, ties to even (function template) |
