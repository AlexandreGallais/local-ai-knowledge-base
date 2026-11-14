# std::constructible_from

| Defined in header `<concepts>` |  |
| --- | --- |
| `template< class T, class... Args > concept constructible_from = std::destructible<T> && std::is_constructible_v<T, Args...>;` | (since C++20) |

The `constructible_from` concept specifies that a variable of type `T` can be initialized with the given set of argument types `Args...`.

### References

- C++23 standard (ISO/IEC 14882:2024):

- 18.4.11 Concept `constructible_from` [concept.constructible]

- C++20 standard (ISO/IEC 14882:2020):

- 18.4.11 Concept `constructible_from` [concept.constructible]

### See also

is_constructible, is_trivially_constructible, is_nothrow_constructible (C++11), (C++11), (C++11) checks if a type has a constructor for specific arguments (class template)
