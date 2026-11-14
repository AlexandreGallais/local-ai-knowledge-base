# std::experimental::ranges::not_equal_to

| Defined in header `<experimental/ranges/functional>` |  |
| --- | --- |
| `template< class T = void > requires EqualityComparable<T> \|\| Same<T, void> \|\| /* == on two const T lvalues invokes a built-in operator comparing pointers */ struct not_equal_to;` | (ranges TS) |
| `template<> struct not_equal_to<void>;` | (ranges TS) |

Function object for performing comparisons. The primary template invokes `operator ==` on const lvalues of type `T` and negates the result. The specialization `not_equal_to<void>` deduces the parameter types of the function call operator from the arguments (but not the return type).

All specializations of `not_equal_to` are `Semiregular`.

### Member types

| Member type | Definition |
| --- | --- |
| `is_transparent` (member only of `not_equal_to<void>` specialization) | /* unspecified */ |

### Member functions

operator() checks if the arguments are *not equal* (public member function)

## std::experimental::ranges::not_equal_to::operator()

|  |  |  |
| --- | --- | --- |
| `constexpr bool operator()(const T& x, const T& y) const;` | (1) | (member only of primary `not_equal_to<T>` template) |
| `template< class T, class U > requires EqualityComparableWith<T, U> \|\| /* std::declval<T>() == std::declval<U>() resolves to a built-in operator comparing pointers */ constexpr bool operator()(T&& t, U&& u) const;` | (2) | (member only of `not_equal_to<void>` specialization) |

1) Compares `x` and `y`. Equivalent to `return !ranges::equal_to<>{}(x, y);`.

2) Compares `t` and `u`. Equivalent to `return !ranges::equal_to<>{}(std::forward<T>(t), std::forward<U>(u));`.

### Notes

Unlike `std::not_equal_to`, `ranges::not_equal_to` requires both `==` and `!=` to be valid (via the `EqualityComparable` and `EqualityComparableWith` constraints), and is entirely defined in terms of `ranges::equal_to`. However, the implementation is free to use `operator!=` directly, because those concepts require the results of `==` and `!=` to be consistent.

### Example

This section is incomplete Reason: no example

### See also

not_equal_to function object implementing `x != y` (class template)
