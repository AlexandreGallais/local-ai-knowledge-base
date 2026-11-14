# C++ named requirements: SharedTimedMutex (since C++14)

The **SharedTimedMutex** requirements extend the TimedMutex requirements to include shared lock ownership mode.

### Requirements

- TimedMutex
- SharedMutex

Additionally, an object `m` of SharedTimedMutex type supports timed shared operations:

- The expression `m.try_lock_shared_for(duration)` has the following properties

- Behaves as an atomic operation.
- Attempts to obtain shared ownership of the mutex within the duration specified by `duration`. If `duration` is less or equal `duration.zero()`, attempts to obtain the ownership without waiting (as if by `try_lock()`). Otherwise, this function blocks until the mutex is acquired or until the time specified by `duration` passes. It returns within `duration` only if it succeeds, but it allowed to fail to acquire the mutex even if at some point in time during `duration` it was not owned by another thread. In any case, it returns `true` if the mutex was acquired and `false` otherwise.
- If `try_lock_shared_for(duration)` succeeds, prior `unlock()` operations on the same object *synchronize-with* this operation (equivalent to release-acquire `std::memory_order`).
- The behavior is undefined if the calling thread already owns the mutex in any mode.
- An exception may be thrown by clock, time point, or duration during the execution (clocks, time points, and durations provided by the standard library never throw).
- If an exception is thrown, the shared lock is not acquired.

- The expression `m.try_lock_shared_until(time_point)` has the following properties

- Behaves as an atomic operation.
- Attempts to obtain shared ownership of the mutex within the time left until `time_point`. If `time_point` already passed, attempts to obtain the ownership without locking (as if by `try_lock()`). Otherwise, this function blocks until the mutex is acquired or until the time specified by `time_point` passes. It returns before `time_point` only if it succeeds, but it allowed to fail to acquire the mutex even if at some point in time before `time_point` it was not owned by another thread. In any case, it returns `true` if the mutex was acquired and `false` otherwise.
- If `try_lock_shared_until(time_point)` succeeds, prior `unlock()` operations on the same object *synchronize-with* this operation (equivalent to release-acquire `std::memory_order`).
- The behavior is undefined if the calling thread already owns the mutex in any mode.
- An exception may be thrown by clock, time point, or duration during the execution (clocks, time points, and durations provided by the standard library never throw).
- If an exception is thrown, the shared lock is not acquired.

### Standard library

The following standard library types satisfy SharedTimedMutex requirements:

shared_timed_mutex (C++14) provides shared mutual exclusion facility and implements locking with a timeout (class)

### See also

- Thread support library
- Mutex
- TimedMutex
- SharedMutex
