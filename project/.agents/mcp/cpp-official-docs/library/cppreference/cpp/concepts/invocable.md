# std::invocable, std::regular_invocable

| Defined in header `<concepts>` |  |
| --- | --- |
| `template< class F, class... Args > concept invocable = requires(F&& f, Args&&... args) { std::invoke(std::forward<F>(f), std::forward<Args>(args)...); /* not required to be equality-preserving */ };` | (since C++20) |
| `template< class F, class... Args > concept regular_invocable = std::invocable<F, Args...>;` | (since C++20) |

The `invocable` concept specifies that a callable type `F` can be called with a set of arguments `Args...` using the function template `std::invoke`.

The `regular_invocable` concept adds to the `invocable` concept by requiring the `invoke` expression to be equality-preserving and not modify either the function object or the arguments.

### Equality preservation

Expressions declared in `requires` expressions of the standard library concepts are required to be equality-preserving (except where stated otherwise).

### Notes

The distinction between `invocable` and `regular_invocable` is purely semantic.

A random number generator may satisfy `invocable` but cannot satisfy `regular_invocable` (comical ones excluded).

### References

- C++23 standard (ISO/IEC 14882:2024):

- 18.7.2 Concept `invocable` [concept.invocable]

- 18.7.3 Concept `regular_invocable` [concept.regularinvocable]

- C++20 standard (ISO/IEC 14882:2020):

- 18.7.2 Concept `invocable` [concept.invocable]

- 18.7.3 Concept `regular_invocable` [concept.regularinvocable]

### See also

is_invocable, is_invocable_r, is_nothrow_invocable, is_nothrow_invocable_r (C++17) checks if a type can be invoked (as if by `std::invoke`) with the given argument types (class template)

### External links

A joke example of a random number generator that satisfies both `invocable` and `regular_invocable`.
