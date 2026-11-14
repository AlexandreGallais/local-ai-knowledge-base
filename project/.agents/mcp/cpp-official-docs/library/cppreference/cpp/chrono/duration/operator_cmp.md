# operator==,!=,<,<=,>,>=,<=>(std::chrono::duration)

|  |  |  |
| --- | --- | --- |
| `template< class Rep1, class Period1, class Rep2, class Period2 > constexpr bool operator==( const std::chrono::duration<Rep1, Period1>& lhs, const std::chrono::duration<Rep2, Period2>& rhs );` | (1) | (since C++11) |
| `template< class Rep1, class Period1, class Rep2, class Period2 > constexpr bool operator!=( const std::chrono::duration<Rep1, Period1>& lhs, const std::chrono::duration<Rep2, Period2>& rhs );` | (2) | (since C++11) (until C++20) |
| `template< class Rep1, class Period1, class Rep2, class Period2 > constexpr bool operator<( const std::chrono::duration<Rep1, Period1>& lhs, const std::chrono::duration<Rep2, Period2>& rhs );` | (3) | (since C++11) |
| `template< class Rep1, class Period1, class Rep2, class Period2 > constexpr bool operator<=( const std::chrono::duration<Rep1, Period1>& lhs, const std::chrono::duration<Rep2, Period2>& rhs );` | (4) | (since C++11) |
| `template< class Rep1, class Period1, class Rep2, class Period2 > constexpr bool operator>( const std::chrono::duration<Rep1, Period1>& lhs, const std::chrono::duration<Rep2, Period2>& rhs );` | (5) | (since C++11) |
| `template< class Rep1, class Period1, class Rep2, class Period2 > constexpr bool operator>=( const std::chrono::duration<Rep1, Period1>& lhs, const std::chrono::duration<Rep2, Period2>& rhs );` | (6) | (since C++11) |
| `template< class Rep1, class Period1, class Rep2, class Period2 > requires std::three_way_comparable<std::common_type_t<Rep1, Rep2>> constexpr auto operator<=>( const std::chrono::duration<Rep1, Period1>& lhs, const std::chrono::duration<Rep2, Period2>& rhs );` | (7) | (since C++20) |

Compares two durations. Let `CT` be `std::common_type<std::chrono::duration<Rep1, Period1>, std::chrono::duration<Rep2, Period2>>::type`:

1,2) Checks if `lhs` and `rhs` are equal, i.e. the number of ticks for the type common to both durations are equal.

3-6) Compares `lhs` to `rhs`, i.e. compares the number of ticks for the type common to both durations.

7) Compares `lhs` to `rhs`, i.e. compares the number of ticks for the type common to both durations. The return type is deduced from `CT(lhs).count() <=> CT(rhs).count()`.

The `!=` operator is synthesized from `operator==`. (since C++20)

### Parameters

|  |  |  |
| --- | --- | --- |
| lhs | - | duration on the left-hand side of the operator |
| rhs | - | duration on the right-hand side of the operator |

### Return value

1) `CT(lhs).count() == CT(rhs).count()`

2) `!(lhs == rhs)`

3) `CT(lhs).count() < CT(rhs).count()`

4) `!(rhs < lhs)`

5) `rhs < lhs`

6) `!(lhs < rhs)`

7) `CT(lhs).count() <=> CT(rhs).count()`

### Example

```cpp
#include <chrono>
#include <iostream>

int main()
{
    constexpr auto t1 = std::chrono::seconds(2);
    constexpr auto t2 = std::chrono::milliseconds(2000);

    if constexpr (t1 == t2)
        std::cout << t1 << " == " << t2 << '\n';
    else
        std::cout << t1 << " != " << t2 << '\n';

    constexpr auto t3 = std::chrono::seconds(61);
    constexpr auto t4 = std::chrono::minutes(1);

    if constexpr (t3 > t4)
        std::cout << t3 << " > " << t4 << '\n';
    else
        std::cout << t3 << " <= " << t4 << '\n';

    using namespace std::chrono_literals;

    static_assert(1h == 60min);
    static_assert(1min == 60s);
    static_assert(1s == 1'000ms);
    static_assert(1ms == 1'000us);
    static_assert(1us == 1'000ns);
}
```

Output:

```text
2s == 2000ms
61s > 1min
```
