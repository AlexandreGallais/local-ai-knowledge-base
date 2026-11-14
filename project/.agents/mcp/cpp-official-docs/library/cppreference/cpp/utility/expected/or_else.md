# std::expected<T,E>::or_else

|  |  |  |
| --- | --- | --- |
| Primary template |  |  |
| `template< class F > constexpr auto or_else( F&& f ) &;` | (1) | (since C++23) |
| `template< class F > constexpr auto or_else( F&& f ) const&;` | (2) | (since C++23) |
| `template< class F > constexpr auto or_else( F&& f ) &&;` | (3) | (since C++23) |
| `template< class F > constexpr auto or_else( F&& f ) const&&;` | (4) | (since C++23) |
| `void` partial specialization |  |  |
| `template< class F > constexpr auto or_else( F&& f ) &;` | (5) | (since C++23) |
| `template< class F > constexpr auto or_else( F&& f ) const&;` | (6) | (since C++23) |
| `template< class F > constexpr auto or_else( F&& f ) &&;` | (7) | (since C++23) |
| `template< class F > constexpr auto or_else( F&& f ) const&&;` | (8) | (since C++23) |

If `*this` contains an unexpected value, invokes `f` with the unexpected value of `*this` as the argument and returns its result. Otherwise, returns a `std::expected` object that represents an expected value.

1-4) The expected value is initialized with the expected value `val` of `*this`.

Given type `G` as:

1,2) `std::remove_cvref_t<std::invoke_result_t<F, decltype(error())>>`

3,4) `std::remove_cvref_t<std::invoke_result_t<F, decltype(std::move(error()))>>`

5,6) `std::remove_cvref_t<std::invoke_result_t<F, decltype(error())>>`

7,8) `std::remove_cvref_t<std::invoke_result_t<F, decltype(std::move(error()))>>`

If `G` is not a specialization of `std::expected`, or `std::is_same_v<G::value_type, T>` is `false`, the program is ill-formed.

1,2) These overloads participate in overload resolution only if `std::is_constructible_v<T, decltype((val))>` is `true`.

3,4) These overloads participate in overload resolution only if `std::is_constructible_v<T, decltype(std::move(val))>` is `true`.

### Parameters

f - a suitable function or Callable object that returns a `std::expected`

### Return value

| Overload | Value of `has_value()` |  |
| --- | --- | --- |
| `true` | `false` |  |
| (1,2) | `G(std::in_place, val)` | `std::invoke(std::forward<F>(f), error())` |
| (3,4) | `G(std::in_place, std::move(val))` | `std::invoke(std::forward<F>(f), std::move(error()))` |
| (5,6) | `G()` | `std::invoke(std::forward<F>(f), error())` |
| (7,8) | `std::invoke(std::forward<F>(f), std::move(error()))` |  |

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

transform_error returns the `expected` itself if it contains an expected value; otherwise, returns an `expected` containing the transformed unexpected value (public member function)
