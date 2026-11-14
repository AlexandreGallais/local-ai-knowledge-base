# std::unique_lock<Mutex>::release

`mutex_type* release() noexcept;` (since C++11)

Breaks the association of the associated mutex, if any, and `*this`.

No locks are unlocked. If `*this` held ownership of the associated mutex prior to the call, the caller is now responsible to unlock the mutex.

### Parameters

(none)

### Return value

Pointer to the associated mutex or a null pointer if there was no associated mutex.

### Example

This section is incomplete Reason: no example

### See also

unlock unlocks (i.e., releases ownership of) the associated mutex (public member function)
