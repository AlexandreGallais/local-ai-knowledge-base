# std::suspend_always

| Defined in header `<coroutine>` |  |
| --- | --- |
| `struct suspend_always;` | (since C++20) |

`suspend_always` is an empty class which can be used to indicate that an await expression always suspends and does not produce a value.

### Member functions

|  |  |
| --- | --- |
| await_ready | indicates that an await expression always suspends (public member function) |
| await_suspend | no-op (public member function) |
| await_resume | no-op (public member function) |

## std::suspend_always::await_ready

`constexpr bool await_ready() const noexcept { return false; }`

Always returns `false`, indicating that an await expression always suspends.

## std::suspend_always::await_suspend

`constexpr void await_suspend( std::coroutine_handle<> ) const noexcept {}`

Does nothing.

## std::suspend_always::await_resume

`constexpr void await_resume() const noexcept {}`

Does nothing. An await expression does not produce a value if `suspend_always` is used.

### Example

This section is incomplete Reason: no example

### See also

suspend_never (C++20) indicates that an await-expression should never suspend (class)
