---
title: "SpinLock"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/threading/spinlock.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# SpinLock

The `System.Threading.SpinLock` structure is a low-level, mutual-exclusion synchronization primitive that spins while it waits to acquire a lock. On multicore computers, when wait times are expected to be short and when contention is minimal, `System.Threading.SpinLock` can perform better than other kinds of locks. However, we recommend that you use `System.Threading.SpinLock` only when you determine by profiling that the `System.Threading.Monitor` method or the `System.Threading.Interlocked` methods are significantly slowing the performance of your program.

 `System.Threading.SpinLock` may yield the time slice of the thread even if it has not yet acquired the lock. It does this to avoid thread-priority inversion, and to enable the garbage collector to make progress. When you use a `System.Threading.SpinLock`, ensure that no thread can hold the lock for more than a very brief time span, and that no thread can block while it holds the lock.

 Because SpinLock is a value type, you must explicitly pass it by reference if you intend the two copies to refer to the same lock.

 For more information about how to use this type, see `System.Threading.SpinLock`. For an example, see How to: Use SpinLock for Low-Level Synchronization.

 `System.Threading.SpinLock` supports a *thread*-*tracking* mode that you can use during the development phase to help track the thread that is holding the lock at a specific time. Thread-tracking mode is very useful for debugging, but we recommend that you turn it off in the release version of your program because it may slow performance. For more information, see How to: Enable Thread-Tracking Mode in SpinLock.

## See also

- Threading Objects and Features
