---
title: "Managed Threading Basics"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/threading/managed-threading-basics.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Managed threading basics

The first five articles of this section are designed to help you determine when to use managed threading and to explain some basic features. For information on classes that provide additional features, see Threading Objects and Features and Overview of Synchronization Primitives.

> In .NET 9 and C# 13 or later, use a dedicated `System.Threading.Lock` instance with the C# lock statement. This approach improves performance and reduces mistakes from locking the wrong object. In Visual Basic, continue to use SyncLock with a dedicated private reference type.

 The remaining articles in this section cover advanced topics, including the interaction of managed threading with the Windows operating system.

> **Note:**
> The Task Parallel Library and PLINQ provide APIs for task and data parallelism in multi-threaded programs. For more information, see Parallel Programming.

## In this section

 Threads and Threading\
 Discusses the advantages and drawbacks of multiple threads, and outlines the scenarios in which you might create threads or use thread pool threads.

 Exceptions in Managed Threads\
 Describes the behavior of unhandled exceptions in threads for different versions of .NET, in particular the situations in which they result in termination of the application.

 Synchronizing Data for Multithreading\
 Describes strategies for synchronizing data in classes that will be used with multiple threads.

 Foreground and Background Threads\
 Explains the differences between foreground and background threads.

 Managed and Unmanaged Threading in Windows\
 Discusses the relationship between managed and unmanaged threading, lists managed equivalents for Windows threading APIs, and discusses the interaction of COM apartments and managed threads.

 Thread Local Storage: Thread-Relative Static Fields and Data Slots\
 Describes thread-relative storage mechanisms.

## Reference

 `System.Threading.Thread`
 Provides reference documentation for the **Thread** class, which represents a managed thread, whether it came from unmanaged code or was created in a managed application.

 `System.ComponentModel.BackgroundWorker`
 Provides a safe way to implement multithreading in conjunction with user-interface objects.

## Related sections

Overview of Synchronization Primitives\
Describes the managed classes used to synchronize the activities of multiple threads.

Managed Threading Best Practices\
Describes common problems with multithreading and strategies for avoiding problems.

Parallel Programming\
Describes the Task Parallel Library and PLINQ, which greatly simplify the work of creating asynchronous and multi-threaded .NET applications.

System.Threading.Channels library\
Describes the System.Threading.Channels library, which provides a set of synchronization data structures for passing data between producers and consumers asynchronously.
