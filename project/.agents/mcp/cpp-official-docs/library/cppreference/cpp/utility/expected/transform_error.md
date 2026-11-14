# std::expected<T,E>::transform_error

|  |  |  |
| --- | --- | --- |
| Primary template |  |  |
| `template< class F > constexpr auto transform_error( F&& f ) &;` | (1) | (since C++23) |
| `template< class F > constexpr auto transform_error( F&& f ) const&;` | (2) | (since C++23) |
| `template< class F > constexpr auto transform_error( F&& f ) &&;` | (3) | (since C++23) |
| `template< class F > constexpr auto transform_error( F&& f ) const&&;` | (4) | (since C++23) |
| `void` partial specialization |  |  |
| `template< class F > constexpr auto transform_error( F&& f ) &;` | (5) | (since C++23) |
| `template< class F > constexpr auto transform_error( F&& f ) const&;` | (6) | (since C++23) |
| `template< class F > constexpr auto transform_error( F&& f ) &&;` | (7) | (since C++23) |
| `template< class F > constexpr auto transform_error( F&& f ) const&&;` | (8) | (since C++23) |

If `*this` contains an unexpected value, invokes `f` with the unexpected value of `*this` as the argument and returns a `std::expected` object that contains an unexpected value, which is initialized with the result of `f`. Otherwise, returns a `std::expected` object that represents an expected value.

1-4) The expected value is initialized with the expected value `val` of `*this`.

Given type `G` as:

1,2) `std::remove_cv_t<std::invoke_result_t<F, decltype(error())>>`

3,4) `std::remove_cv_t<std::invoke_result_t<F, decltype(std::move(error()))>>`

5,6) `std::remove_cv_t<std::invoke_result_t<F, decltype(error())>>`

7,8) `std::remove_cv_t<std::invoke_result_t<F, decltype(std::move(error()))>>`

If any of the following conditions is satisfied, the program is ill-formed:

- `G` is not a valid template argument for `std::unexpected`.
- The following corresponding declaration is ill-formed:

1,2) `G g(std::invoke(std::forward<F>(f), error()));`

3,4) `G g(std::invoke(std::forward<F>(f), std::move(error()));`

5,6) `G g(std::invoke(std::forward<F>(f), error()));`

7,8) `G g(std::invoke(std::forward<F>(f), std::move(error()));`

1,2) This overload participates in overload resolution only if `std::is_constructible_v<T, decltype((val))>` is `true`.

3,4) This overload participates in overload resolution only if `std::is_constructible_v<T, decltype(std::move(val))>` is `true`.

### Parameters

f - a suitable function or Callable object whose call signature returns a non-reference type

### Return value

Given expression `expr` as:

1,2) `std::invoke(std::forward<F>(f), error())`

3,4) `std::invoke(std::forward<F>(f), std::move(error()))`

5,6) `std::invoke(std::forward<F>(f), error())`

7,8) `std::invoke(std::forward<F>(f), std::move(error()))`

The return values are defined as follows:

| Overload | Value of `has_value()` |  |
| --- | --- | --- |
| `true` | `false` |  |
| (1,2) | `std::expected<T, G>(std::in_place, val)` | `std::expected<T, G> (std::unexpect, expr)` |
| (3,4) | `std::expected<T, G>(std::in_place, std::move(val))` |  |
| (5,6) | `std::expected<T, G>()` |  |
| (7,8) |  |  |

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
| or_else | returns the `expected` itself if it contains an expected value; otherwise, returns the result of the given function on the unexpected value (public member function) |
| transform | returns an `expected` containing the transformed expected value if it exists; otherwise, returns the `expected` itself (public member function) |
