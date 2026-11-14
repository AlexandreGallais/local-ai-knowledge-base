# std::shared_lock<Mutex>::release

`mutex_type* release() noexcept;` (since C++14)

Breaks the association of the associated mutex, if any, and `*this`.

No locks are unlocked. If the `*this` held ownership of the associated mutex prior to the call, the caller is now responsible to unlock the mutex.

### Parameters

(none)

### Return value

Pointer to the associated mutex or a null pointer if there was no associated mutex.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| unlock | unlocks the associated mutex (public member function) |
| release | disassociates the associated mutex without unlocking (i.e., releasing ownership of) it (public member function of `std::unique_lock<Mutex>`) |
