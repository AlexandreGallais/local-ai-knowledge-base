# std::unique_lock<Mutex>::unlock

`void unlock();` (since C++11)

Unlocks (i.e., releases ownership of) the associated mutex.

`std::system_error` is thrown if there is no associated mutex or if the mutex is not locked.

### Parameters

(none)

### Return value

(none)

### Exceptions

If there is no associated mutex or the mutex is not locked, `std::system_error` with an error code of `std::errc::operation_not_permitted`.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| lock | locks (i.e., takes ownership of) the associated mutex (public member function) |
| release | disassociates the associated mutex without unlocking (i.e., releasing ownership of) it (public member function) |
