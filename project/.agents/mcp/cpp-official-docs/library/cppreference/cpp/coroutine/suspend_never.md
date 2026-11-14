# std::suspend_never

| Defined in header `<coroutine>` |  |
| --- | --- |
| `struct suspend_never;` | (since C++20) |

`suspend_never` is an empty class which can be used to indicate that an await expression never suspends and does not produce a value.

### Member functions

|  |  |
| --- | --- |
| await_ready | indicates that an await expression never suspends (public member function) |
| await_suspend | no-op (public member function) |
| await_resume | no-op (public member function) |

## std::suspend_never::await_ready

`constexpr bool await_ready() const noexcept { return true; }`

Always returns `true`, indicating that an await expression never suspends.

## std::suspend_never::await_suspend

`constexpr void await_suspend( std::coroutine_handle<> ) const noexcept {}`

Does nothing.

## std::suspend_never::await_resume

`constexpr void await_resume() const noexcept {}`

Does nothing. An await expression does not produce a value if `suspend_never` is used.

### Example

This section is incomplete Reason: no example

### See also

suspend_always (C++20) indicates that an await-expression should always suspend (class)
