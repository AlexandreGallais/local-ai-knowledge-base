# std::copyable

| Defined in header `<concepts>` |  |
| --- | --- |
| `template< class T > concept copyable = std::copy_constructible<T> && std::movable<T> && std::assignable_from<T&, T&> && std::assignable_from<T&, const T&> && std::assignable_from<T&, const T>;` | (since C++20) |

The concept `copyable<T>` specifies that `T` is a `movable` object type that can also be copied (that is, it supports copy construction and copy assignment).

### References

- C++23 standard (ISO/IEC 14882:2024):

- 18.6 Object concepts [concepts.object]

- C++20 standard (ISO/IEC 14882:2020):

- 18.6 Object concepts [concepts.object]

### See also

movable (C++20) specifies that an object of a type can be moved and swapped (concept)
