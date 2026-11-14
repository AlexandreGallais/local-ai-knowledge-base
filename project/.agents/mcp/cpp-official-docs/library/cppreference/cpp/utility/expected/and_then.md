# std::expected<T,E>::and_then

|  |  |  |
| --- | --- | --- |
| Main template |  |  |
| `template< class F > constexpr auto and_then( F&& f ) &;` | (1) | (since C++23) |
| `template< class F > constexpr auto and_then( F&& f ) const&;` | (2) | (since C++23) |
| `template< class F > constexpr auto and_then( F&& f ) &&;` | (3) | (since C++23) |
| `template< class F > constexpr auto and_then( F&& f ) const&&;` | (4) | (since C++23) |
| `void` partial specialization |  |  |
| `template< class F > constexpr auto and_then( F&& f ) &;` | (5) | (since C++23) |
| `template< class F > constexpr auto and_then( F&& f ) const&;` | (6) | (since C++23) |
| `template< class F > constexpr auto and_then( F&& f ) &&;` | (7) | (since C++23) |
| `template< class F > constexpr auto and_then( F&& f ) const&&;` | (8) | (since C++23) |

If `*this` represents an expected value, invokes `f` and returns its result. Otherwise, returns a `std::expected` object that contains an unexpected value, which is initialized with the unexpected value of `*this`.

1-4) `f` is invoked with the expected value `val` as the argument.

5-8) `f` is invoked without any argument.

Given type `U` as:

1,2) `std::remove_cvref_t<std::invoke_result_t<F, decltype((``val``))>>`

3,4) `std::remove_cvref_t<std::invoke_result_t<F, decltype(std::move(``val``))>>`

5-8) `std::remove_cvref_t<std::invoke_result_t<F>>`

If `U` is not a specialization of `std::expected`, or `std::is_same_v<U::error_type, E>` is `false`, the program is ill-formed.

1,2) These overloads participate in overload resolution only if `std::is_constructible_v<E, decltype(error())>` is `true`.

3,4) These overloads participate in overload resolution only if `std::is_constructible_v<E, decltype(std::move(error()))>` is `true`.

5,6) These overloads participate in overload resolution only if `std::is_constructible_v<E, decltype(error())>` is `true`.

7,8) These overloads participate in overload resolution only if `std::is_constructible_v<E, decltype(std::move(error()))>` is `true`.

### Parameters

f - a suitable function or Callable object that returns a `std::expected`

### Return value

| Overload | Value of `has_value()` |  |
| --- | --- | --- |
| `true` | `false` |  |
| (1,2) | `std::invoke(std::forward<F>(f), val)` | `U(std::unexpect, error())` |
| (3,4) | `std::invoke(std::forward<F>(f),std::move(val))` | `U(std::unexpect, std::move(error()))` |
| (5,6) | `std::invoke(std::forward<F>(f))` | `U(std::unexpect, error())` |
| (7,8) | `U(std::unexpect, std::move(error()))` |  |

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_expected` | `202211L` | (C++23) | Monadic functions for `std::expected` |

### Example

This section is incomplete Reason: no example

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3938 | C++23 | the expected value was obtained by `value()`[1] | changed to `**this` |
| LWG 3973 | C++23 | the expected value was obtained by `**this`[2] | changed to `val` |

1. ↑ `value()` requires `E` to be copy constructible (see LWG issue 3843), where `operator*` does not.
2. ↑ `**this` can trigger argument-dependent lookup.

### See also

|  |  |
| --- | --- |
| unexpect, unexpect_t (C++23) | in-place construction tag for unexpected value in `expected` (tag) |
| transform | returns an `expected` containing the transformed expected value if it exists; otherwise, returns the `expected` itself (public member function) |
