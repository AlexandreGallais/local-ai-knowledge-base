---
title: "Threading objects and features"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/threading/threading-objects-and-features.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Threading objects and features

Along with the `System.Threading.Thread` class, .NET provides a number of classes that help you develop multithreaded applications. The following articles provide overview of those classes:

|Title|Description|
|-----------|-----------------|
|The managed thread pool|Describes the `System.Threading.ThreadPool` class, which provides a pool of worker threads that are managed by .NET.|
|Timers|Describes .NET timers that can be used in a multithreaded environment.|
|Overview of synchronization primitives|Describes types that can be used to synchronize access to a shared resource or control thread interaction.|
|EventWaitHandle|Describes the `System.Threading.EventWaitHandle` class, which represents a thread synchronization event.|
|CountdownEvent|Describes the `System.Threading.CountdownEvent` class, which represents a thread synchronization event that becomes set when its count is zero.|
|Mutexes|Describes the `System.Threading.Mutex` class, which grants exclusive access to a shared resource.|
|Semaphore and SemaphoreSlim|Describes the `System.Threading.Semaphore` class, which limits number of threads that can access a shared resource or a pool of resources concurrently.|
|Barrier|Describes the `System.Threading.Barrier` class, which implements the barrier pattern for coordination of threads in phased operations.|
|SpinLock|Describes the `System.Threading.SpinLock` structure, which is a lightweight alternative to the `System.Threading.Monitor` class for certain low-level locking scenarios.|
|SpinWait|Describes the `System.Threading.SpinWait` structure, which provides support for spin-based waiting.|

> **Note:**
> In .NET 9 and C# 13 or later, prefer a dedicated `System.Threading.Lock` instance with the C# `lock` statement for general locking scenarios. This approach improves performance and reduces mistakes from locking shared objects that weren't meant for synchronization. For details, see Overview of synchronization primitives and The lock statement. In Visual Basic, continue to use `SyncLock` with a dedicated private reference type.

## See also

- `System.Threading.Monitor`
- `System.Threading.WaitHandle`
- `System.ComponentModel.BackgroundWorker`
- `System.Threading.Tasks.Parallel`
- `System.Threading.Tasks.Task`
- Using threads and threading
- Asynchronous File I/O
- Parallel Programming
- Task Parallel Library (TPL)
