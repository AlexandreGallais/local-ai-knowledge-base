# std::hash<std::chrono::year_month_weekday_last>

| Defined in header `<chrono>` |  |
| --- | --- |
| `template<> struct hash<std::chrono::year_month_weekday_last>;` | (since C++26) |

The template specialization of `std::hash` for `std::chrono::year_month_weekday_last` allows users to obtain hashes of objects of type `std::chrono::year_month_weekday_last`. This specialization is enabled.

The `operator()` of this specialization is `noexcept`.

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_chrono` | `202306L` | (C++26) | Hashing support for `std::chrono` value classes |

### See also

hash (C++11) hash function object (class template)
