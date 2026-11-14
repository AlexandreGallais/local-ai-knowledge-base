# std::relation

| Defined in header `<concepts>` |  |  |
| --- | --- | --- |
| `template< class R, class T, class U > concept relation = std::predicate<R, T, T> && std::predicate<R, U, U> && std::predicate<R, T, U> && std::predicate<R, U, T>;` | (1) | (since C++20) |

The concept `relation<R, T, U>` specifies that `R` defines a binary relation over the set of expressions whose type and value category are those encoded by either `T` or `U`.

### References

- C++23 standard (ISO/IEC 14882:2024):

- 18.7.5 Concept `relation` [concept.relation]

- C++20 standard (ISO/IEC 14882:2020):

- 18.7.5 Concept `relation` [concept.relation]
