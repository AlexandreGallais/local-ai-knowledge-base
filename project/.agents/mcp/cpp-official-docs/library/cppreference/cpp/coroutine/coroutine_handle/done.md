# std::coroutine_handle<Promise>::done

|  |  |  |
| --- | --- | --- |
| Member of other specializations |  |  |
| `bool done() const;` | (1) | (since C++20) |
| Member of specialization `std::coroutine_handle<std::noop_coroutine_promise>` |  |  |
| `constexpr bool done() const noexcept;` | (2) | (since C++20) |

Checks if a suspended coroutine is suspended at its final suspend point.

1) Returns `true` if the coroutine to which `*this` refers is suspended at its final suspend point, or `false` if the coroutine is suspended at other suspend points. The behavior is undefined if `*this` does not refer to a suspended coroutine.

2) Always returns `false`.

### Parameters

(none)

### Return value

1) `true` if the coroutine is suspended at its final suspend point, `false` if the coroutine is suspended at other suspend points.

2) `false`

### Notes

A no-op coroutine is never considered to be suspended at its final suspend point.

A coroutine with promise object `p` is considered to be suspended at its final suspend point only if, let `e` be the result of `p.final_suspend()`, `e.await_ready()` returns `false`. In particular, if `p.final_suspend()` returns `std::suspend_never`, then `done()` never returns `true`.

### Example

This section is incomplete Reason: no example
