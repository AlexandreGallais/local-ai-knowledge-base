# std::chrono::duration<Rep,Period>::duration

|  |  |  |
| --- | --- | --- |
| `constexpr duration() = default;` | (1) | (since C++11) |
| `duration( const duration& ) = default;` | (2) | (since C++11) |
| `template< class Rep2 > constexpr explicit duration( const Rep2& r );` | (3) | (since C++11) |
| `template< class Rep2, class Period2 > constexpr duration( const duration<Rep2, Period2>& d );` | (4) | (since C++11) |

Constructs a new `duration` from one of several optional data sources.

1) The default constructor.

2) The copy constructor.

3) Constructs a duration with `r` ticks.

This overload participates in overload resolution only if all following conditions are satisfied:

- `is_convertible<const Rep2&, Rep>::value` is `true`.
- Any of the following conditions is satisfied:[1]

- `std::chrono::treat_as_floating_point<Rep>::value` is `true`.
- `std::chrono::treat_as_floating_point<Rep2>::value` is `false`.

4) Constructs a duration by converting `d` to an appropriate period and tick count, as if by `std::chrono::duration_cast<duration>(d).count()`.

This overload participates in overload resolution only if no overflow is induced in the conversion, and any of the following conditions is satisfied:[2]

- `std::chrono::treat_as_floating_point<Rep>::value` is `true`.
- All following conditions are satisfied:

- `std::ratio_divide<Period2, Period>::den` is `1`.
- `std::chrono::treat_as_floating_point<Rep2>::value` is `false`.

1. ↑ That is, a duration with an integer tick count cannot be constructed from a floating-point value, but a duration with a floating-point tick count can be constructed from an integer value.
2. ↑ That is, either the duration uses floating-point ticks, or `Period2` is exactly divisible by `Period`.

### Parameters

|  |  |  |
| --- | --- | --- |
| r | - | a tick count |
| d | - | a duration to copy from |

### Example

The following code shows several examples (both valid and invalid) of how to construct durations:

```cpp
#include <chrono>

int main()
{
    std::chrono::hours h(1); // one hour
    std::chrono::milliseconds ms{3}; // 3 milliseconds
    std::chrono::duration<int, std::kilo> ks(3); // 3000 seconds

    // error: treat_as_floating_point<int>::value == false,
    // This duration allows whole tick counts only
//  std::chrono::duration<int, std::kilo> d3(3.5);

    // 30Hz clock using fractional ticks
    std::chrono::duration<double, std::ratio<1, 30>> hz30(3.5);

    // 3000 microseconds constructed from 3 milliseconds
    std::chrono::microseconds us = ms;
    // error: 1/1000000 is not divisible by 1/1000
//  std::chrono::milliseconds ms2 = us
    std::chrono::duration<double, std::milli> ms2 = us; // 3.0 milliseconds
}
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2094 | C++11 | for overload (4), `std::ratio_divide<Period2, period>::num` might overflow when evaluating `std::ratio_divide<Period2, period>::den` | overload (4) does not participate in overload resolution in this case |
| LWG 3050 | C++11 | convertibility constraint used non-const xvalue | use const lvalues instead |

### See also

operator= assigns the contents (public member function)
