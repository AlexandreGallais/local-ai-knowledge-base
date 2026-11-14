# std::shared_mutex::unlock

`void unlock();` (since C++17)

Unlocks the mutex.

The mutex must be locked by the current thread of execution, otherwise, the behavior is undefined.

This operation *synchronizes-with* (as defined in `std::memory_order`) any subsequent lock operation that obtains ownership of the same mutex.

### Parameters

(none)

### Return value

(none)

### Exceptions

Throws nothing.

### Notes

`unlock()` is usually not called directly: `std::unique_lock` and `std::lock_guard` are used to manage exclusive locking.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| lock | locks the mutex, blocks if the mutex is not available (public member function) |
| try_lock | tries to lock the mutex, returns if the mutex is not available (public member function) |
| C documentation for mtx_unlock |  |
