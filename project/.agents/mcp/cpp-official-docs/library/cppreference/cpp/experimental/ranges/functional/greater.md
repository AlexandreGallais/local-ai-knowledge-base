# std::experimental::ranges::greater

| Defined in header `<experimental/ranges/functional>` |  |
| --- | --- |
| `template< class T = void > requires StrictTotallyOrdered<T> \|\| Same<T, void> \|\| /* < on two const T lvalues invokes a built-in operator comparing pointers */ struct greater;` | (ranges TS) |
| `template<> struct greater<void>;` | (ranges TS) |

Function object for performing comparisons. The primary template invokes `operator<` on const lvalues of type `T` with the argument order inverted. The specialization `greater<void>` deduces the parameter types of the function call operator from the arguments (but not the return type).

All specializations of `greater` are `Semiregular`.

### Member types

| Member type | Definition |
| --- | --- |
| `is_transparent` (member only of `greater<void>` specialization) | /* unspecified */ |

### Member functions

operator() checks if the first argument is *greater* than the second (public member function)

## std::experimental::ranges::greater::operator()

|  |  |  |
| --- | --- | --- |
| `constexpr bool operator()(const T& x, const T& y) const;` | (1) | (member only of primary `greater<T>` template) |
| `template< class T, class U > requires StrictTotallyOrderedWith<T, U> \|\| /* std::declval<T>() < std::declval<U>() resolves to a built-in operator comparing pointers */ constexpr bool operator()(T&& t, U&& u) const;` | (2) | (member only of `greater<void>` specialization) |

1) Compares `x` and `y`. Equivalent to `return ranges::less<>{}(y, x);`.

2) Compares `t` and `u`. Equivalent to `return ranges::less<>{}(std::forward<U>(u), std::forward<T>(t));`.

### Notes

Unlike `std::greater`, `ranges::greater` requires all six comparison operators `<`, `<=`, `>`, `>=`, `==` and `!=` to be valid (via the `StrictTotallyOrdered` and `StrictTotallyOrderedWith` constraints) and is entirely defined in terms of `ranges::less`. However, the implementation is free to use `operator>` directly, because those concepts require the results of the comparison operators to be consistent.

### Example

This section is incomplete Reason: no example

### See also

greater function object implementing `x > y` (class template)
