# std::movable

| Defined in header `<concepts>` |  |
| --- | --- |
| `template< class T > concept movable = std::is_object_v<T> && std::move_constructible<T> && std::assignable_from<T&, T> && std::swappable<T>;` | (since C++20) |

The concept `movable<T>` specifies that `T` is an object type that can be moved (that is, it can be move constructed, move assigned, and lvalues of type `T` can be swapped).

### References

- C++23 standard (ISO/IEC 14882:2024):

- 18.6 Object concepts [concepts.object]

- C++20 standard (ISO/IEC 14882:2020):

- 18.6 Object concepts [concepts.object]

### See also

copyable (C++20) specifies that an object of a type can be copied, moved, and swapped (concept)
