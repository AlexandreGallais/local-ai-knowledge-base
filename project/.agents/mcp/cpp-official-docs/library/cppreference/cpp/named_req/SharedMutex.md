# C++ named requirements: SharedMutex (since C++17)

The **SharedMutex** requirements extend the Mutex requirements to include shared lock ownership mode.

### Requirements

- Mutex

Additionally, an object `m` of SharedMutex type supports another mode of ownership: shared. Multiple threads (or, more generally, execution agents) can simultaneously own this mutex in shared mode, but no thread may obtain shared ownership if there is a thread that owns it in exclusive mode and no thread may obtain exclusive ownership if there is a thread that owns it in shared mode. If more than implementation-defined number of threads (no less than 10000) hold a shared lock, another attempt to acquire the mutex in shared mode blocks until the number of shared owners drops down below that threshold.

- The expression `m.lock_shared()` has the following properties:

- Behaves as an atomic operation.
- Blocks the calling thread until shared ownership of the mutex can be obtained.
- Prior `m.unlock()` operations on the same mutex *synchronize-with* this lock operation (equivalent to release-acquire `std::memory_order`).
- The behavior is undefined if the calling thread already owns the mutex in any mode.
- If an exception is thrown, the shared lock is not acquired.

- The expression `m.try_lock_shared()` has the following properties:

- Behaves as an atomic operation.
- Attempts to obtain shared ownership of the mutex for the calling thread without blocking. If ownership is not obtained, returns immediately. The function is allowed to spuriously fail and return even if the mutex is not currently owned by any threads in any mode.
- If `try_lock_shared()` succeeds, prior `unlock()` operations on the same object *synchronize-with* this operation (equivalent to release-acquire `std::memory_order`).
- The behavior is undefined if the calling thread already owns the mutex in any mode.

- The expression `m.unlock_shared()` has the following properties:

- Behaves as an atomic operation.
- Releases the calling thread's ownership of the mutex and *synchronizes-with* the subsequent successful lock operations on the same object.
- The behavior is undefined if the calling thread does not own the mutex.

- All lock and unlock operations on a single mutex occur in a single total order.

### Standard library

The following standard library types satisfy SharedMutex requirements:

|  |  |
| --- | --- |
| shared_mutex (C++17) | provides shared mutual exclusion facility (class) |
| shared_timed_mutex (C++14) | provides shared mutual exclusion facility and implements locking with a timeout (class) |

### See also

- Thread support library
- Mutex
- TimedMutex
- SharedTimedMutex
