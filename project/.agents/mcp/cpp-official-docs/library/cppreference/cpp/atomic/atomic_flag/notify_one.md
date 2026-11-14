# std::atomic_flag::notify_one

|  |  |  |
| --- | --- | --- |
| `void notify_one() noexcept;` | (1) | (since C++20) (constexpr since C++26) |
| `void notify_one() volatile noexcept;` | (2) | (since C++20) |

Performs atomic notifying operations.

If there is a thread blocked in atomic waiting operation (i.e. `wait()`) on `*this`, then unblocks *at least* one such thread; otherwise does nothing.

### Notes

This form of change-detection is often more efficient than simple polling or pure spinlocks.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| wait (C++20) | blocks the thread until notified and the atomic value changes (public member function) |
| atomic_flag_wait, atomic_flag_wait_explicit (C++20), (C++20) | blocks the thread until notified and the flag changes (function) |
| atomic_flag_notify_one (C++20) | notifies a thread blocked in atomic_flag_wait (function) |
