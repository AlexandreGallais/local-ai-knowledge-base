# C++ named requirements: TrivialClock (since C++11)

The **TrivialClock** requirements describe the requirements satisfied by several clocks in the chrono library.

### Requirements

For a type `TC`:

- The type must meet Clock requirements.
- The types `TC::rep`, `TC::duration`, and `TC::time_point` satisfy the requirements of EqualityComparable, LessThanComparable, DefaultConstructible, CopyConstructible, CopyAssignable, Destructible(until C++17), Swappable, and NumericType.
- The function `TC::now()` does not throw exceptions.
- The type `TC::time_point::clock` meets the TrivialClock requirements, recursively.

### Standard library

The following types in the standard library satisfy TrivialClock requirements:

|  |  |
| --- | --- |
| system_clock (C++11) | wall clock time from the system-wide realtime clock (class) |
| steady_clock (C++11) | monotonic clock that will never be adjusted (class) |
| high_resolution_clock (C++11) | the clock with the shortest tick period available (class) |
| file_clock (C++20) | Clock used for file time (typedef) |
| file_time_type (C++17) | represents file time values (typedef) |
