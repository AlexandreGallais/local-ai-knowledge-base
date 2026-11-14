# std::destructible

| Defined in header `<concepts>` |  |
| --- | --- |
| `template< class T > concept destructible = std::is_nothrow_destructible_v<T>;` | (since C++20) |

The concept `destructible` specifies the concept of all types whose instances can safely be destroyed at the end of their lifetime (including reference types).

### Notes

Unlike the Destructible named requirement, `std::destructible` requires the destructor to be `noexcept(true)`, not merely non-throwing when invoked, and allows reference types and array types.

### References

- C++23 standard (ISO/IEC 14882:2024):

- 18.4.10 Concept `destructible` [concept.destructible]

- C++20 standard (ISO/IEC 14882:2020):

- 18.4.10 Concept `destructible` [concept.destructible]

### See also

is_destructible, is_trivially_destructible, is_nothrow_destructible (C++11), (C++11), (C++11) checks if a type has a non-deleted destructor (class template)
