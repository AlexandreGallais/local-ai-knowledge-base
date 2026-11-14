# std::atomic_ref<T>::notify_one

`void notify_one() const noexcept;` (constexpr since C++26)

Performs atomic notifying operations.

If there is a thread blocked in atomic waiting operation (i.e. `wait()`) on `*ptr`, then unblocks *at least* one such thread; otherwise does nothing. This overload participates in overload resolution only if `std::is_const_v<T>` is `false`.

### Notes

This form of change-detection is often more efficient than simple polling or pure spinlocks.

### Example

This section is incomplete Reason: no example

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3508 (P3323R1) | C++20 | `notify_one` was meaningless for `const T` | constrained to accept only non-const `T` |

### See also

|  |  |
| --- | --- |
| wait | blocks the thread until notified and the atomic value changes (public member function) |
| atomic_wait, atomic_wait_explicit (C++20), (C++20) | blocks the thread until notified and the atomic value changes (function template) |
| atomic_notify_one (C++20) | notifies a thread blocked in atomic_wait (function template) |
