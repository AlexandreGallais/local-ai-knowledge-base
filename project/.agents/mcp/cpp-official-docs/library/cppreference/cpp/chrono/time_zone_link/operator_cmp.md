# std::chrono::operator==,<=>(std::chrono::time_zone_link)

| Defined in header `<chrono>` |  |  |
| --- | --- | --- |
| `bool operator==( const std::chrono::time_zone_link& x, const std::chrono::time_zone_link& y ) noexcept;` | (1) | (since C++20) |
| `std::strong_ordering operator<=>( const std::chrono::time_zone_link& x, const std::chrono::time_zone_link& y ) noexcept;` | (2) | (since C++20) |

Compares the two `time_zone_link` values `x` and `y` by name.

The `<`, `<=`, `>`, `>=`, and `!=` operators are synthesized from `operator<=>` and `operator==` respectively.

### Return value

1) `x.name() == y.name()`

2) `x.name() <=> y.name()`
