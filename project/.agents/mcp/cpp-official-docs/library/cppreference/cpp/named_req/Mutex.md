# C++ named requirements: Mutex (since C++11)

The **Mutex** requirements extends the Lockable requirements to include inter-thread synchronization.

### Requirements

- Lockable
- DefaultConstructible
- Destructible
- not copyable
- not movable

For an object `m` of Mutex type:

- The expression `m.lock()` has the following properties

- Behaves as an atomic operation.
- Blocks the calling thread until exclusive ownership of the mutex can be obtained.
- Prior `m.unlock()` operations on the same mutex *synchronize-with* this lock operation (equivalent to release-acquire `std::memory_order`).
- The behavior is undefined if the calling thread already owns the mutex (except if m is `std::recursive_mutex` or `std::recursive_timed_mutex`).
- Exception of type `std::system_error` may be thrown on errors, with the following error codes:

- `std::errc::operation_not_permitted` if the calling thread does not have required privileges.
- `std::errc::resource_deadlock_would_occur` if the implementation detects that this operation would lead to deadlock.

- The expression `m.try_lock()` has the following properties

- Behaves as an atomic operation.
- Attempts to obtain exclusive ownership of the mutex for the calling thread without blocking. If ownership is not obtained, returns immediately. The function is allowed to spuriously fail and return even if the mutex is not currently owned by another thread.
- If `try_lock()` succeeds, prior `unlock()` operations on the same object *synchronize-with* this operation (equivalent to release-acquire `std::memory_order`). `lock()` does not synchronize with a failed `try_lock()`.
- Does not throw exceptions.

- The expression `m.unlock()` has the following properties

- Behaves as an atomic operation.
- Releases the calling thread's ownership of the mutex and *synchronizes-with* the subsequent successful lock operations on the same object.
- The behavior is undefined if the calling thread does not own the mutex.
- Does not throw exceptions.

- All lock and unlock operations on a single mutex occur in a single total order that can be viewed as modification order of an atomic variable: the order is specific to this individual mutex.

### Standard library

The following standard library types satisfy Mutex requirements:

|  |  |
| --- | --- |
| mutex (C++11) | provides basic mutual exclusion facility (class) |
| recursive_mutex (C++11) | provides mutual exclusion facility which can be locked recursively by the same thread (class) |
| recursive_timed_mutex (C++11) | provides mutual exclusion facility which can be locked recursively by the same thread and implements locking with a timeout (class) |
| shared_mutex (C++17) | provides shared mutual exclusion facility (class) |
| shared_timed_mutex (C++14) | provides shared mutual exclusion facility and implements locking with a timeout (class) |
| timed_mutex (C++11) | provides mutual exclusion facility which implements locking with a timeout (class) |

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2309 | C++11 | `lock` might throw `std::system_error` with error code `std::errc::device_or_resource_busy` | not allowed |

### See also

- Thread support library
- Lockable
- TimedMutex
