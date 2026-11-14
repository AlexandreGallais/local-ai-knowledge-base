# std::atomic_flag::wait

|  |  |  |
| --- | --- | --- |
| `void wait( bool old, std::memory_order order = std::memory_order_seq_cst ) const noexcept;` | (1) | (since C++20) (constexpr since C++26) |
| `void wait( bool old, std::memory_order order = std::memory_order_seq_cst ) const volatile noexcept;` | (2) | (since C++20) |

Performs atomic waiting operations. Behaves as if it repeatedly performs the following steps:

- Compare `this->test(order)` with that of `old`.
  - If those are equal, then blocks until `*this` is notified by `notify_one()` or `notify_all()`, or the thread is unblocked spuriously.
  - Otherwise, returns.

These functions are guaranteed to return only if value has changed, even if underlying implementation unblocks spuriously.

If `order` is not `std::memory_order_relaxed`, `std::memory_order_consume`, `std::memory_order_acquire` or `std::memory_order_seq_cst`, the behavior is undefined.

### Parameters

|  |  |  |
| --- | --- | --- |
| old | - | the value to check the `atomic_flag`'s object no longer contains |
| order | - | memory order constraints to enforce |

### Notes

This form of change-detection is often more efficient than simple polling or pure spinlocks.

Due to the ABA problem, transient changes from `old` to another value and back to `old` might be missed, and not unblock.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| notify_one (C++20) | notifies at least one thread waiting on the atomic object (public member function) |
| notify_all (C++20) | notifies all threads blocked waiting on the atomic object (public member function) |
| atomic_flag_notify_one (C++20) | notifies a thread blocked in atomic_flag_wait (function) |
| atomic_flag_notify_all (C++20) | notifies all threads blocked in atomic_flag_wait (function) |
