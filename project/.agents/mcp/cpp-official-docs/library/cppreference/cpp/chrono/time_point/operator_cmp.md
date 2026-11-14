# operator==,!=,<,<=,>,>=,<=>(std::chrono::time_point)

| Defined in header `<chrono>` |  |  |
| --- | --- | --- |
|  | (1) |  |
| `template< class Clock, class Dur1, class Dur2 > bool operator==( const std::chrono::time_point<Clock,Dur1>& lhs, const std::chrono::time_point<Clock,Dur2>& rhs );` |  | (since C++11) (until C++14) |
| `template< class Clock, class Dur1, class Dur2 > constexpr bool operator==( const std::chrono::time_point<Clock,Dur1>& lhs, const std::chrono::time_point<Clock,Dur2>& rhs );` |  | (since C++14) |
|  | (2) |  |
| `template< class Clock, class Dur1, class Dur2 > bool operator!=( const std::chrono::time_point<Clock,Dur1>& lhs, const std::chrono::time_point<Clock,Dur2>& rhs );` |  | (since C++11) (until C++14) |
| `template< class Clock, class Dur1, class Dur2 > constexpr bool operator!=( const std::chrono::time_point<Clock,Dur1>& lhs, const std::chrono::time_point<Clock,Dur2>& rhs );` |  | (since C++14) (until C++20) |
|  | (3) |  |
| `template< class Clock, class Dur1, class Dur2 > bool operator<( const std::chrono::time_point<Clock,Dur1>& lhs, const std::chrono::time_point<Clock,Dur2>& rhs );` |  | (since C++11) (until C++14) |
| `template< class Clock, class Dur1, class Dur2 > constexpr bool operator<( const std::chrono::time_point<Clock,Dur1>& lhs, const std::chrono::time_point<Clock,Dur2>& rhs );` |  | (since C++14) |
|  | (4) |  |
| `template< class Clock, class Dur1, class Dur2 > bool operator<=( const std::chrono::time_point<Clock,Dur1>& lhs, const std::chrono::time_point<Clock,Dur2>& rhs );` |  | (since C++11) (until C++14) |
| `template< class Clock, class Dur1, class Dur2 > constexpr bool operator<=( const std::chrono::time_point<Clock,Dur1>& lhs, const std::chrono::time_point<Clock,Dur2>& rhs );` |  | (since C++14) |
|  | (5) |  |
| `template< class Clock, class Dur1, class Dur2 > bool operator>( const std::chrono::time_point<Clock,Dur1>& lhs, const std::chrono::time_point<Clock,Dur2>& rhs );` |  | (since C++11) (until C++14) |
| `template< class Clock, class Dur1, class Dur2 > constexpr bool operator>( const std::chrono::time_point<Clock,Dur1>& lhs, const std::chrono::time_point<Clock,Dur2>& rhs );` |  | (since C++14) |
|  | (6) |  |
| `template< class Clock, class Dur1, class Dur2 > bool operator>=( const std::chrono::time_point<Clock,Dur1>& lhs, const std::chrono::time_point<Clock,Dur2>& rhs );` |  | (since C++11) (until C++14) |
| `template< class Clock, class Dur1, class Dur2 > constexpr bool operator>=( const std::chrono::time_point<Clock,Dur1>& lhs, const std::chrono::time_point<Clock,Dur2>& rhs );` |  | (since C++14) |
| `template< class Clock, class Dur1, std::three_way_comparable_with<Dur1> Dur2 > constexpr auto operator<=>( const std::chrono::time_point<Clock,Dur1>& lhs, const std::chrono::time_point<Clock,Dur2>& rhs );` | (7) | (since C++20) |

Compares two time points. The comparison is done by comparing the results `time_since_epoch()` for the time points.

1,2) Checks if the time points `lhs` and `rhs` refer to the same time point for the given clock.

3-6) Compares the time points `lhs` and `rhs`.

7) Compares the time points `lhs` and `rhs`. The return type is deduced from `lhs.time_since_epoch() <=> rhs.time_since_epoch()`, and hence the three-way comparison result type of `Dur1` and `Dur2`.

The `!=` operator is synthesized from `operator==`. (since C++20)

### Parameters

lhs, rhs - time points to compare

### Return value

1) `true` if the `lhs` and `rhs` refer to the same time point, `false` otherwise.

2) `true` if the `lhs` and `rhs` refer to different time points, `false` otherwise.

3) `true` if the `lhs` refers to time point *before* `rhs`, `false` otherwise.

4) `true` if the `lhs` refers to time point *before* `rhs`, or to the same time point as `rhs`, `false` otherwise.

5) `true` if the `lhs` refers to time point *after* `rhs`, `false` otherwise.

6) `true` if the `lhs` refers to time point *after* `rhs`, or to the same time point as `rhs`, `false` otherwise.

7) `lhs.time_since_epoch() <=> rhs.time_since_epoch()`.

### Exceptions

May throw implementation-defined exceptions.

### Notes

Two-way comparison operators of `time_point` were not `constexpr` in C++11, this was corrected in C++14.
