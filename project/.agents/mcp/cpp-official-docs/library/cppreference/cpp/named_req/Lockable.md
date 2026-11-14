# C++ named requirements: Lockable (since C++11)

The **Lockable** requirements extends the BasicLockable requirements to include attempted locking.

### Requirements

- BasicLockable

For type `L` to be Lockable, it must meet the above condition as well as the following:

| Expression | Effects | Return value |
| --- | --- | --- |
| `m.try_lock()` | Attempts to acquire the lock for the current execution agent (thread, process, task) without blocking. If an exception is thrown, no lock is obtained. | `true` if the lock was acquired, `false` otherwise |

### Notes

The `try_lock` member functions obtains a non-shared lock on `m` on success.

### Standard library

The following standard library types satisfy Lockable requirements:

|  |  |
| --- | --- |
| mutex (C++11) | provides basic mutual exclusion facility (class) |
| recursive_mutex (C++11) | provides mutual exclusion facility which can be locked recursively by the same thread (class) |
| recursive_timed_mutex (C++11) | provides mutual exclusion facility which can be locked recursively by the same thread and implements locking with a timeout (class) |
| shared_mutex (C++17) | provides shared mutual exclusion facility (class) |
| shared_timed_mutex (C++14) | provides shared mutual exclusion facility and implements locking with a timeout (class) |
| timed_mutex (C++11) | provides mutual exclusion facility which implements locking with a timeout (class) |

### See also

- Thread support library
- Mutex
- BasicLockable
- TimedLockable
