# std::expected<T,E>::transform

|  |  |  |
| --- | --- | --- |
| Primary template |  |  |
| `template< class F > constexpr auto transform( F&& f ) &;` | (1) | (since C++23) |
| `template< class F > constexpr auto transform( F&& f ) const&;` | (2) | (since C++23) |
| `template< class F > constexpr auto transform( F&& f ) &&;` | (3) | (since C++23) |
| `template< class F > constexpr auto transform( F&& f ) const&&;` | (4) | (since C++23) |
| `void` partial specialization |  |  |
| `template< class F > constexpr auto transform( F&& f ) &;` | (5) | (since C++23) |
| `template< class F > constexpr auto transform( F&& f ) const&;` | (6) | (since C++23) |
| `template< class F > constexpr auto transform( F&& f ) &&;` | (7) | (since C++23) |
| `template< class F > constexpr auto transform( F&& f ) const&&;` | (8) | (since C++23) |

If `*this` represents an expected value, invokes `f` and returns a `std::expected` object that contains an expected value, which is initialized with its result (or value-initialized if the result type is `void`). Otherwise, returns a `std::expected` object that contains an unexpected value, which is initialized with the unexpected value of `*this`.

1-4) `f` is invoked with the expected value `val` of `*this` as the argument.

5-8) `f` is invoked without any argument.

Given type `U` as:

1,2) `std::remove_cv_t<std::invoke_result_t<F, decltype((``val``))>>`

3,4) `std::remove_cv_t<std::invoke_result_t<F, decltype(std::move(``val``))>>`

5-8) `std::remove_cv_t<std::invoke_result_t<F>>`

If any of the following conditions is satisfied, the program is ill-formed:

- `U` is not a valid value type for `std::expected`.
- `std::is_void_v<U>` is `false`, and the following corresponding declaration is ill-formed:

1,2) `U u(std::invoke(std::forward<F>(f), val));`

3,4) `U u(std::invoke(std::forward<F>(f), std::move(val)));`

5-8) `U u(std::invoke(std::forward<F>(f)));`

1,2) These overloads participate in overload resolution only if `std::is_constructible_v<E, decltype(error())>` is `true`.

3,4) These overloads participate in overload resolution only if `std::is_constructible_v<E, decltype(std::move(error()))>` is `true`.

5,6) These overloads participate in overload resolution only if `std::is_constructible_v<E, decltype(error())>` is `true`.

7,8) These overloads participate in overload resolution only if `std::is_constructible_v<E, decltype(std::move(error()))>` is `true`.

### Parameters

f - a suitable function or Callable object whose call signature returns a non-reference type

### Return value

Given expression `expr` as:

1,2) `std::invoke(std::forward<F>(f), val)`

3,4) `std::invoke(std::forward<F>(f),std::move(val))`

5-8) `std::invoke(std::forward<F>(f))`

The return values are defined as follows:

| Overload | Value of `has_value()` |  |
| --- | --- | --- |
| `true` | `false` |  |
| (1,2) | If `std::is_void_v<U>` is `false`, returns `std::expected<U, E> (std::in_place, expr)`. Otherwise, returns `std::expected<U, E>()` (but still evaluates `expr`). | `std::expected<U, E>(std::unexpect, error())` |
| (3,4) | `std::expected<U, E> (std::unexpect, std::move(error()))` |  |
| (5,6) | `std::expected<U, E>(std::unexpect, error())` |  |
| (7,8) | `std::expected<U, E> (std::unexpect, std::move(error()))` |  |

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
