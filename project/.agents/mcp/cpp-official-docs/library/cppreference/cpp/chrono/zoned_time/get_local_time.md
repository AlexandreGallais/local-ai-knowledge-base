# std::chrono::zoned_time<Duration,TimeZonePtr>::operator local_time<duration>, std::chrono::zoned_time<Duration,TimeZonePtr>::get_local_time

|  |  |
| --- | --- |
| `std::chrono::local_time<duration> get_local_time() const;` | (since C++20) |
| `explicit operator std::chrono::local_time<duration>() const;` | (since C++20) |

Obtains a `std::chrono::local_time<duration>` representing the local time in the time zone corresponding to the time point `*this` represents.

### Return value

A `std::chrono::local_time<duration>` computed as if by `zone->to_local(get_sys_time())`, where `zone` is the non-static data member holding the stored time zone pointer.
