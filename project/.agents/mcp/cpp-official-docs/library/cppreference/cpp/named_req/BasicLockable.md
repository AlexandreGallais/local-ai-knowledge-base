# C++ named requirements: BasicLockable (since C++11)

The **BasicLockable** requirements describe the minimal characteristics of types that provide exclusive blocking semantics for execution agents (i.e. threads).

### Requirements

For type `L` to be BasicLockable, the following conditions have to be satisfied for an object `m` of type `L`:

| Expression | Preconditions | Effects |
| --- | --- | --- |
| `m.lock()` |  | Blocks until a lock can be acquired for the current execution agent (thread, process, task). If an exception is thrown, no lock is acquired. |
| `m.unlock()` | The current execution agent holds a non-shared lock on `m`. | Releases the non-shared lock held by the execution agent. Throws no exceptions. |

#### Non-shared locks

A lock on an object is said to be *non-shared lock* if it is acquired by a call to `lock`, `try_lock`, `try_lock_for`, or `try_lock_until` member function.

### Standard library

The following standard library types satisfy BasicLockable requirements:

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
- Lockable
- TimedLockable
