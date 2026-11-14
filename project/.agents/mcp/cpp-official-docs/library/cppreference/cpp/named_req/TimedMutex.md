# C++ named requirements: TimedMutex (since C++11)

The **TimedMutex** requirements extend the TimedLockable requirements to include inter-thread synchronization.

### Requirements

- TimedLockable
- Mutex

Additionally, for an object `m` of TimedMutex type:

- The expression `m.try_lock_for(duration)` has the following properties

- Behaves as an atomic operation.
- Attempts to obtain exclusive ownership of the mutex within the duration specified by `duration`. If `duration` is less or equal `duration.zero()`, attempts to obtain the ownership without blocking (as if by `try_lock()`). Otherwise, this function blocks until the mutex is acquired or until the time specified by `duration` passes. It returns within `duration` only if it succeeds, but it is allowed to fail to acquire the mutex even if at some point in time during `duration` it was not owned by another thread. In any case, it returns `true` if the mutex was acquired and `false` otherwise.
- If `try_lock_for(duration)` succeeds, prior `unlock()` operations on the same object *synchronize-with* this operation (equivalent to release-acquire `std::memory_order`).
- The behavior is undefined if the calling thread already owns the mutex (except if m is `std::recursive_timed_mutex`).
- An exception may be thrown by clock, time point, or duration during the execution (clocks, time points, and durations provided by the standard library never throw).

- The expression `m.try_lock_until(time_point)` has the following properties

- Behaves as an atomic operation.
- Attempts to obtain exclusive ownership of the mutex within the time left until `time_point`. If `time_point` already passed, attempts to obtain the ownership without blocking (as if by `try_lock()`). Otherwise, this function blocks until the mutex is acquired or until the time specified by `time_point` passes. It returns before `time_point` only if it succeeds, but it is allowed to fail to acquire the mutex even if at some point in time before `time_point` it was not owned by another thread. In any case, it returns `true` if the mutex was acquired and `false` otherwise.
- If `try_lock_until(time_point)` succeeds, prior `unlock()` operations on the same object *synchronize-with* this operation (equivalent to release-acquire `std::memory_order`).
- The behavior is undefined if the calling thread already owns the mutex (except if m is `std::recursive_timed_mutex`).
- An exception may be thrown by clock, time point, or duration during the execution (clocks, time points, and durations provided by the standard library never throw).

### Standard library

The following standard library types satisfy TimedMutex requirements:

|  |  |
| --- | --- |
| recursive_timed_mutex (C++11) | provides mutual exclusion facility which can be locked recursively by the same thread and implements locking with a timeout (class) |
| shared_timed_mutex (C++14) | provides shared mutual exclusion facility and implements locking with a timeout (class) |
| timed_mutex (C++11) | provides mutual exclusion facility which implements locking with a timeout (class) |

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2093 | C++11 | timeout-related exceptions were missing in the specification | mentioned |

### See also

- Thread support library
- TimedLockable
- Mutex
