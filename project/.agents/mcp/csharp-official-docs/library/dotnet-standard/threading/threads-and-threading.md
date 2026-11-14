---
title: "Threads and threading"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/threading/threads-and-threading.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Threads and threading

Multithreading allows you to increase the responsiveness of your application and, if your application runs on a multiprocessor or multi-core system, increase its throughput.

## Processes and threads

A *process* is an executing program. An operating system uses processes to separate the applications that are being executed. A *thread* is the basic unit to which an operating system allocates processor time. Each thread has a scheduling priority and maintains a set of structures the system uses to save the thread context when the thread's execution is paused. The thread context includes all the information the thread needs to seamlessly resume execution, including the thread's set of CPU registers and stack. Multiple threads can run in the context of a process. All threads of a process share its virtual address space. A thread can execute any part of the program code, including parts currently being executed by another thread.

> **Note:**
> .NET Framework provides a way to isolate applications within a process with the use of *application domains*. (Application domains are not available on .NET Core.) For more information, see the Application domains and threads section of the Application domains article.

By default, a .NET program is started with a single thread, often called the *primary* thread. However, it can create additional threads to execute code in parallel or concurrently with the primary thread. These threads are often called *worker* threads.

## When to use multiple threads

You use multiple threads to increase the responsiveness of your application and to take advantage of a multiprocessor or multi-core system to increase the application's throughput.

Consider a desktop application, in which the primary thread is responsible for user interface elements and responds to user actions. Use worker threads to perform time-consuming operations that, otherwise, would occupy the primary thread and make the user interface non-responsive. You can also use a dedicated thread for network or device communication to be more responsive to incoming messages or events.

If your program performs operations that can be done in parallel, the total execution time can be decreased by performing those operations in separate threads and running the program on a multiprocessor or multi-core system. On such a system, use of multithreading might increase throughput along with the increased responsiveness.

## How to use multithreading in .NET

The recommended way to utilize multithreading is to use Task Parallel Library (TPL) and Parallel LINQ (PLINQ). For more information, see Parallel programming.

Both TPL and PLINQ rely on the `System.Threading.ThreadPool` threads. The `System.Threading.ThreadPool` class provides a .NET application with a pool of worker threads. You can also use thread pool threads. For more information, see The managed thread pool.

At last, you can use the `System.Threading.Thread` class that represents a managed thread. For more information, see Using threads and threading.

Multiple threads might need to access a shared resource. To keep the resource in an uncorrupted state and avoid race conditions, you must synchronize the thread access to it. You also might want to coordinate the interaction of multiple threads. .NET provides a range of types that you can use to synchronize access to a shared resource or coordinate thread interaction. For more information, see Overview of synchronization primitives.

Do handle exceptions in threads. Unhandled exceptions in threads generally terminate the process. For more information, see Exceptions in managed threads.

## See also

- Threading objects and features
- Managed threading best practices
- About Processes and Threads
- Parallel Processing in .NET
- Async programming patterns in .NET
