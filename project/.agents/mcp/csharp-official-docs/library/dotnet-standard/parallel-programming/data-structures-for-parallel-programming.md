---
title: "Data Structures for Parallel Programming"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/data-structures-for-parallel-programming.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Data Structures for Parallel Programming

.NET provides several types that are useful in parallel programming, including a set of concurrent collection classes, lightweight synchronization primitives, and types for lazy initialization. You can use these types with any multithreaded application code, including the Task Parallel Library and PLINQ.

## Concurrent Collection Classes

 The collection classes in the `System.Collections.Concurrent` namespace provide thread-safe add and remove operations that avoid locks wherever possible and use fine-grained locking where locks are necessary. A concurrent collection class does not require user code to take any locks when it accesses items. The concurrent collection classes can significantly improve performance over types such as `System.Collections.ArrayList` and `System.Collections.Generic.List`1` (with user-implemented locking) in scenarios where multiple threads add and remove items from a collection.

 The following table lists the concurrent collection classes:

|Type|Description|
|----------|-----------------|
|`System.Collections.Concurrent.BlockingCollection`1`|Provides blocking and bounding capabilities for thread-safe collections that implement `System.Collections.Concurrent.IProducerConsumerCollection`1`. Producer threads block if no slots are available or if the collection is full. Consumer threads block if the collection is empty. This type also supports non-blocking access by consumers and producers. `System.Collections.Concurrent.BlockingCollection`1` can be used as a base class or backing store to provide blocking and bounding for any collection class that supports `System.Collections.Generic.IEnumerable`1`.|
|`System.Collections.Concurrent.ConcurrentBag`1`|A thread-safe bag implementation that provides scalable add and get operations.|
|`System.Collections.Concurrent.ConcurrentDictionary`2`|A concurrent and scalable dictionary type.|
|`System.Collections.Concurrent.ConcurrentQueue`1`|A concurrent and scalable FIFO queue.|
|`System.Collections.Concurrent.ConcurrentStack`1`|A concurrent and scalable LIFO stack.|

 For more information, see Thread-Safe Collections.

## Synchronization Primitives

 The synchronization primitives in the `System.Threading` namespace enable fine-grained concurrency and faster performance by avoiding expensive locking mechanisms found in legacy multithreading code.

 The following table lists the synchronization types:

|Type|Description|
|----------|-----------------|
|`System.Threading.Barrier`|Enables multiple threads to work on an algorithm in parallel by providing a point at which each task can signal its arrival and then block until some or all tasks have arrived. For more information, see Barrier.|
|`System.Threading.CountdownEvent`|Simplifies fork and join scenarios by providing an easy rendezvous mechanism. For more information, see CountdownEvent.|
|`System.Threading.ManualResetEventSlim`|A synchronization primitive similar to `System.Threading.ManualResetEvent`. `System.Threading.ManualResetEventSlim` is lighter-weight but can only be used for intra-process communication.|
|`System.Threading.SemaphoreSlim`|A synchronization primitive that limits the number of threads that can concurrently access a resource or a pool of resources. For more information, see Semaphore and SemaphoreSlim.|
|`System.Threading.SpinLock`|A mutual exclusion lock primitive that causes the thread that is trying to acquire the lock to wait in a loop, or *spin*, for a period of time before yielding its quantum. In scenarios where the wait for the lock is expected to be short, `System.Threading.SpinLock` offers better performance than other forms of locking. For more information, see SpinLock.|
|`System.Threading.SpinWait`|A small, lightweight type that will spin for a specified time and eventually put the thread into a wait state if the spin count is exceeded.  For more information, see SpinWait.|

 For more information, see:

- How to: Use SpinLock for Low-Level Synchronization

- How to: Synchronize Concurrent Operations with a Barrier.

## Lazy Initialization Classes

 With lazy initialization, the memory for an object is not allocated until it is needed. Lazy initialization can improve performance by spreading object allocations evenly across the lifetime of a program. You can enable lazy initialization for any custom type by wrapping the type `System.Lazy`1`.

 The following table lists the lazy initialization types:

|Type|Description|
|----------|-----------------|
|`System.Lazy`1`|Provides lightweight, thread-safe lazy-initialization.|
|`System.Threading.ThreadLocal`1`|Provides a lazily-initialized value on a per-thread basis, with each thread lazily-invoking the initialization function.|
|`System.Threading.LazyInitializer`|Provides static methods that avoid the need to allocate a dedicated, lazy-initialization instance. Instead, they use references to ensure targets have been initialized as they are accessed.|

 For more information, see Lazy Initialization.

## Aggregate Exceptions

 The `System.AggregateException` type can be used to capture multiple exceptions that are thrown concurrently on separate threads, and return them to the joining thread as a single exception. The `System.Threading.Tasks.Task` and `System.Threading.Tasks.Parallel` types and PLINQ use `System.AggregateException` extensively for this purpose. For more information, see Exception Handling and How to: Handle Exceptions in a PLINQ Query.

## See also

- `System.Collections.Concurrent`
- `System.Threading`
- Parallel Programming
