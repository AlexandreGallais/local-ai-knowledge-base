# std::chrono::tzdb_list::front

`const std::chrono::tzdb& front() const noexcept;` (since C++20)

Obtains a reference to the first `std::chrono::tzdb` in the list. Simultaneous calls to this function and `std::chrono::reload_tzdb()` does not introduce a data race.

### Return value

A reference to the first `std::chrono::tzdb` in the list.
