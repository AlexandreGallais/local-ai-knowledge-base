# std::chrono::zoned_time<Duration,TimeZonePtr>::get_time_zone

`TimeZonePtr get_time_zone() const;` (since C++20)

Retrieves the stored time zone pointer.

### Return value

A copy of the stored time zone pointer.

### Notes

There's no way to access the time zone pointer when `TimeZonePtr` is a move-only type.
