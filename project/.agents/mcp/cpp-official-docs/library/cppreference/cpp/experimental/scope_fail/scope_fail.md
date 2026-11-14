# std::experimental::scope_fail<EF>::scope_fail

|  |  |  |
| --- | --- | --- |
| `template< class Fn > explicit scope_fail( Fn&& fn ) noexcept(/*see below*/);` | (1) | (library fundamentals TS v3) |
| `scope_fail( scope_fail&& other ) noexcept(/*see below*/);` | (2) | (library fundamentals TS v3) |
| `scope_fail( const scope_fail& ) = delete;` | (3) | (library fundamentals TS v3) |

Creates a `scope_fail` from a function, a function object or another `scope_fail`.

1) Initializes the exit function with a function or function object, and initializes the counter of uncaught exceptions as if with `std::uncaught_exceptions()`. The constructed `scope_fail` is active.

If `Fn` is not an lvalue reference type and `std::is_nothrow_constructible_v<EF, Fn>` is `true`, the stored `EF` is initialized with `std::forward<Fn>(fn)`; otherwise it is initialized with `fn`.

If initialization of the stored `EF` throws an exception, calls `fn()`.

This overload participates in overload resolution only if `std::is_same_v<std::remove_cvref_t<Fn>, scope_fail>` is `false` and `std::is_constructible_v<EF, Fn>` is `true`.

The program is ill-formed if function call expression `fn()` is ill-formed.

The behavior is undefined if calling `fn()` throws an exception or results in undefined behavior, even if `fn` has not been called.

2) Move constructor. Initializes the stored `EF` with the one in `other`, and initializes the counter of uncaught exceptions with the one in `other`. The constructed `scope_fail` is active if and only if `other` is active before the construction.

If `std::is_nothrow_move_constructible_v<EF>` is `true`, initializes stored `EF` (denoted by `exitfun`) with `std::forward<EF>(other.exitfun)`, otherwise initializes it with `other.exitfun`.

After successful move construction, `other.release()` is called and `other` becomes inactive.

This overload participates in overload resolution only if `std::is_nothrow_move_constructible_v<EF>` is `true` or `std::is_copy_constructible_v<EF>` is `true`.

The behavior is undefined if

- `std::is_nothrow_move_constructible_v<EF>` is `true` and `EF` does not meet the requirements of MoveConstructible, or
- `std::is_nothrow_move_constructible_v<EF>` is `false` and `EF` does not meet the requirements of CopyConstructible.

3) `scope_fail` is not CopyConstructible.

### Parameters

|  |  |  |
| --- | --- | --- |
| fn | - | function or function object used for initializing the stored `EF` |
| other | - | `scope_fail` to move from |

### Exceptions

Any exception thrown during the initialization of the stored `EF`.

1)

`noexcept` specification:

`noexcept(std::is_nothrow_constructible_v<EF, Fn> || std::is_nothrow_constructible_v<EF, Fn&>)`

2)

`noexcept` specification:

`noexcept(std::is_nothrow_move_constructible_v<EF> || std::is_nothrow_copy_constructible_v<EF>)`

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| uncaught_exception, uncaught_exceptions (removed in C++20*), (C++17) | checks if exception handling is currently in progress (function) |
| release | makes the `scope_fail` inactive (public member function) |
