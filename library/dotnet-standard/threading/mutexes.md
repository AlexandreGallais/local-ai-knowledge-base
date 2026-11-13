---
title: "Mutexes"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/threading/mutexes.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Mutexes

You can use a `System.Threading.Mutex` object to provide exclusive access to a resource. The `System.Threading.Mutex` class uses more system resources than the `System.Threading.Monitor` class, but it can be marshalled across application domain boundaries, it can be used with multiple waits, and it can be used to synchronize threads in different processes. For a comparison of managed synchronization mechanisms, see Overview of Synchronization Primitives.

For code examples, see the reference documentation for the `System.Threading.Mutex.#ctor*` constructors.

## Use mutexes

A thread calls the `System.Threading.WaitHandle.WaitOne*` method of a mutex to request ownership. The call blocks until the mutex is available, or until the optional timeout interval elapses. The state of a mutex is signaled if no thread owns it.

A thread releases a mutex by calling its `System.Threading.Mutex.ReleaseMutex*` method. Mutexes have thread affinity; that is, the mutex can be released only by the thread that owns it. If a thread releases a mutex it does not own, an `System.ApplicationException` is thrown in the thread.

Because the `System.Threading.Mutex` class derives from `System.Threading.WaitHandle`, you can also call the static `System.Threading.WaitHandle.WaitAll*` or `System.Threading.WaitHandle.WaitAny*` methods of `System.Threading.WaitHandle` to request ownership of a `System.Threading.Mutex` in combination with other wait handles.

If a thread owns a `System.Threading.Mutex`, that thread can specify the same `System.Threading.Mutex` in repeated wait-request calls without blocking its execution; however, it must release the `System.Threading.Mutex` as many times to release ownership.

## Abandoned mutexes

If a thread terminates without releasing a `System.Threading.Mutex`, the mutex is said to be abandoned. This often indicates a serious programming error because the resource the mutex is protecting might be left in an inconsistent state. An `System.Threading.AbandonedMutexException` is thrown in the next thread that acquires the mutex.

In the case of a system-wide mutex, an abandoned mutex might indicate that an application has been terminated abruptly (for example, by using Windows Task Manager).

## Local and system mutexes

Mutexes are of two types: local mutexes and named system mutexes. If you create a `System.Threading.Mutex` object using a constructor that accepts a name, it is associated with an operating-system object of that name. Named mutex scope depends on the platform: on Windows, named mutexes are visible throughout the operating system; on Unix, they default to the current user. Named mutexes can synchronize processes that share their scope. You can create multiple `System.Threading.Mutex` objects that represent the same named mutex, and you can use the `System.Threading.Mutex.OpenExisting*` method to open an existing named mutex.

To learn about the Unix default scope change and how to opt into global scope, see Named mutexes default to user scope on Unix.

A local mutex exists only within your process. It can be used by any thread in your process that has a reference to the local `System.Threading.Mutex` object. Each `System.Threading.Mutex` object is a separate local mutex.

### Access control security for system mutexes

.NET Framework provides the ability to query and set Windows access control security for named system objects. Protecting system mutexes from the moment of creation is recommended because system objects are global and therefore can be locked by code other than your own.

For information on access control security for mutexes, see the `System.Security.AccessControl.MutexSecurity` and `System.Security.AccessControl.MutexAccessRule` classes, the `System.Security.AccessControl.MutexRights` enumeration, the `System.Threading.Mutex.GetAccessControl*`, `System.Threading.Mutex.SetAccessControl*`, and `System.Threading.Mutex.OpenExisting*` methods of the `System.Threading.Mutex` class, and the `System.Threading.Mutex.#ctor(System.Boolean,System.String,System.Boolean@,System.Security.AccessControl.MutexSecurity)` constructor.

> **Note:**
> Access control security for system mutexes is only available with .NET Framework, it's not available with .NET Core or .NET 5+.

## See also

- `System.Threading.Mutex`
- `System.Threading.Mutex.#ctor*`
- `System.Security.AccessControl.MutexSecurity`
- `System.Security.AccessControl.MutexAccessRule`
- `System.Threading.Monitor`
- Threading objects and features
- Threads and threading
- Threading
