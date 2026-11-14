---
title: "Mutex class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Mutex.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Mutex class

Namespace: `System.Threading`

```csharp
public sealed class Mutex : System.Threading.WaitHandle
```

A synchronization primitive that can also be used for interprocess synchronization.

#### Remarks
When two or more threads need to access a shared resource at the same time, the system needs a synchronization mechanism to ensure that only one thread at a time uses the resource. `Mutex` is a synchronization primitive that grants exclusive access to the shared resource to only one thread. If a thread acquires a mutex, the second thread that wants to acquire that mutex is suspended until the first thread releases the mutex.

> **Important:**
> This type implements the `IDisposable` interface. When you've finished using the type, you should dispose of it either directly (by calling its `Dispose` method) or indirectly (with a language construct such as `using` in C#). For more information, see Use an object that implements IDisposable.

You can use the `WaitHandle.WaitOne` method to request ownership of a mutex. The calling thread blocks until one of the following occurs:

- The mutex is signaled to indicate that it is not owned. When this happens, the `WaitHandle.WaitOne` method returns `true`, and the calling thread assumes ownership of the mutex and accesses the resource protected by the mutex. When it has finished accessing the resource, the thread must call the `Mutex.ReleaseMutex` method to release ownership of the mutex. The first example in the Examples section illustrates this pattern.
- The time-out interval specified in the call to a `WaitHandle.WaitOne` method that has a `millisecondsTimeout` or `timeout` parameter has elapsed. When this happens, the `WaitHandle.WaitOne` method returns `false`, and the calling thread makes no further attempt to acquire ownership of the mutex. In this case, you should structure your code so that access to the resource that is protected by the mutex is denied to the calling thread. Because the thread never acquired ownership of the mutex, it must not call the `Mutex.ReleaseMutex` method. The second example in the Examples section illustrates this pattern.

The `Mutex` class enforces thread identity, so a mutex can be released only by the thread that acquired it. By contrast, the `Semaphore` class does not enforce thread identity.

The thread that owns a mutex can request the same mutex in repeated calls to `WaitHandle.WaitOne` without blocking its execution. However, the thread must call the `Mutex.ReleaseMutex` method the same number of times to release ownership of the mutex.

Because the `Mutex` class inherits from `WaitHandle`, you can also call the static `WaitHandle.WaitAll` and `WaitHandle.WaitAny` methods to synchronize access to a protected resource.

If a thread terminates while owning a mutex, the mutex is said to be abandoned. The state of the mutex is set to signaled, and the next waiting thread gets ownership. An `AbandonedMutexException` is thrown in the next thread that acquires the abandoned mutex.

> **Caution:**
> An abandoned mutex often indicates a serious error in the code. When a thread exits without releasing the mutex, the data structures protected by the mutex might not be in a consistent state. The next thread to request ownership of the mutex can handle this exception and proceed, if the integrity of the data structures can be verified.

In the case of a system-wide mutex, an abandoned mutex might indicate that an application has been terminated abruptly (for example, by using Windows Task Manager).

Mutexes are of two types: local mutexes, which are unnamed, and named system mutexes. A local mutex exists only within your process. It can be used by any thread in your process that has a reference to the `Mutex` object that represents the mutex. Each unnamed `Mutex` object represents a separate local mutex.

Named system mutexes are visible throughout the operating system, and can be used to synchronize the activities of processes. You can create a `Mutex` object that represents a named system mutex by using a constructor that accepts a name. The operating-system object can be created at the same time, or it can exist before the creation of the `Mutex` object. You can create multiple `Mutex` objects that represent the same named system mutex, and you can use the `Mutex.OpenExisting` method to open an existing named system mutex.

> **Note:**
> On a server that is running Terminal Services, a named system mutex can have two levels of visibility. If its name begins with the prefix `Global\`, the mutex is visible in all terminal server sessions. If its name begins with the prefix `Local\`, the mutex is visible only in the terminal server session where it was created. In that case, a separate mutex with the same name can exist in each of the other terminal server sessions on the server. If you do not specify a prefix when you create a named mutex, it takes the prefix `Local\`. Within a terminal server session, two mutexes whose names differ only by their prefixes are separate mutexes, and both are visible to all processes in the terminal server session. That is, the prefix names `Global\` and `Local\` describe the scope of the mutex name relative to terminal server sessions, not relative to processes.

> **Caution:**
> On Unix-like operating systems, a named mutex is restricted to the user that created it by default. Setting `CurrentUserOnly` to `false` makes the mutex accessible to all users on the machine, which on Unix-like operating systems is a potential security issue. On Unix-like operating systems, only disable user-level restrictions when all users on the machine, including regular users and root, are in the same trust boundary. Otherwise, a root process and a user process that share a mutex can enable privilege escalation. On Windows, to restrict access to specific users, you can use a constructor overload or `MutexAcl` and pass in a `MutexSecurity` when creating the named mutex. On Unix-like operating systems, currently there is no way to restrict access to specific users beyond `CurrentUserOnly`.

#### Examples
This example shows how a local `Mutex` object is used to synchronize access to a protected resource. Because each calling thread is blocked until it acquires ownership of the mutex, it must call the `Mutex.ReleaseMutex` method to release ownership of the mutex.

_Code sample not included: ~/snippets/csharp/System.Threading/Mutex/Overview/example1.cs._

In the following example, each thread calls the `WaitOne` method to acquire the mutex. If the time-out interval elapses, the method returns `false`, and the thread neither acquires the mutex nor gains access to the resource the mutex protects. The `Mutex.ReleaseMutex` method is called only by the thread that acquires the mutex.

_Code sample not included: ~/snippets/csharp/System.Threading/Mutex/Overview/example2.cs._

## Mutex.Mutex() constructor

```csharp
public Mutex ();
```

Initializes a new instance of the `Mutex` class with default properties.

#### Remarks
Calling this constructor overload is the same as calling the `%23ctor` constructor overload and specifying `false` for initial ownership of the mutex. That is, the calling thread does not own the mutex.

#### Examples
The following code example shows how a local `Mutex` object is used to synchronize access to a protected resource. The thread that creates the mutex does not own it initially.

_Code sample not included: ~/snippets/csharp/System.Threading/Mutex/.ctor/class13.cs._

## Mutex.Mutex(Boolean) constructor

```csharp
public Mutex (bool initiallyOwned);
```

Initializes a new instance of the `Mutex` class with a Boolean value that indicates whether the calling thread should have initial ownership of the mutex.

Parameters:

- `initiallyOwned`: `true` to give the calling thread initial ownership of the mutex; otherwise, `false`.

#### Examples
The following code example shows how a local `Mutex` object is used to synchronize access to a protected resource. The thread that creates the `Mutex` owns it initially.

_Code sample not included: ~/snippets/csharp/System.Threading/Mutex/.ctor/class1.cs._

## Mutex.Mutex(Boolean, String) constructor

```csharp
public Mutex (bool initiallyOwned, string? name);
```

Initializes a new instance of the `Mutex` class with a Boolean value that indicates whether the calling thread should have initial ownership of the mutex, and a string that is the name of the mutex.

Parameters:

- `initiallyOwned`: `true` to give the calling thread initial ownership of the named system mutex if the named system mutex is created as a result of this call; otherwise, `false`.
- `name`: The name, if the synchronization object is to be shared with other processes; otherwise, `null` or an empty string. The name is case-sensitive. The backslash character (\\) is reserved and may only be used to specify a namespace. For more information on namespaces, see the remarks section. There may be further restrictions on the name depending on the operating system. For example, on Unix-based operating systems, the name after excluding the namespace must be a valid file name.

Exceptions:

- `UnauthorizedAccessException`: The named mutex exists and has access control security, but the user does not have `MutexRights.FullControl`.
- `IOException`: `name` is invalid. This can be for various reasons, including some restrictions that might be placed by the operating system, such as an unknown prefix or invalid characters. Note that the name and common prefixes "Global\\" and "Local\\" are case-sensitive.

-or-

There was some other error. The `HResult` property might provide more information.
- `DirectoryNotFoundException`: Windows only: `name` specified an unknown namespace. See Object Names for more information.
- `PathTooLongException`: The `name` is too long. Length restrictions might depend on the operating system or configuration.
- `WaitHandleCannotBeOpenedException`: A synchronization object with the provided `name` cannot be created. A synchronization object of a different type might have the same name.

#### Remarks
The `name` may be prefixed with `Global\` or `Local\` to specify a namespace. When the `Global` namespace is specified, the synchronization object may be shared with any processes on the system. When the `Local` namespace is specified, which is also the default when no namespace is specified, the synchronization object may be shared with processes in the same session. On Windows, a session is a login session, and services typically run in a different non-interactive session. On Unix-like operating systems, each shell has its own session. Session-local synchronization objects may be appropriate for synchronizing between processes with a parent/child relationship where they all run in the same session. For more information about synchronization object names on Windows, see Object Names.

If a `name` is provided and a synchronization object of the requested type already exists in the namespace, the existing synchronization object is used. If a synchronization object of a different type already exists in the namespace, a `WaitHandleCannotBeOpenedException` is thrown. Otherwise, a new synchronization object is created.

If `name` is not `null` and `initiallyOwned` is `true`, the calling thread owns the mutex only if the named system mutex was created as a result of this call. Since there is no mechanism for determining whether the named system mutex was created, it is better to specify `false` for `initiallyOwned` when calling this constructor overload. You can use the `%23ctor` constructor if you need to determine initial ownership.

This constructor initializes a `Mutex` object that represents a named system mutex. You can create multiple `Mutex` objects that represent the same named system mutex.

If the named mutex has already been created with access control security and the caller does not have `FullControl`, an exception is thrown. To open an existing named mutex with only those permissions needed for synchronizing thread activities, see the `Mutex.OpenExisting` method.

If you specify `null` or an empty string for `name`, a local mutex is created, as if you had called the `%23ctor` constructor.

Because they are system-wide, named mutexes can be used to coordinate resource use across process boundaries.

> **Note:**
> On a server that is running Terminal Services, a named system mutex can have two levels of visibility. If its name begins with the prefix `Global\`, the mutex is visible in all terminal server sessions. If its name begins with the prefix `Local\`, the mutex is visible only in the terminal server session where it was created. In that case, a separate mutex with the same name can exist in each of the other terminal server sessions on the server. If you do not specify a prefix when you create a named mutex, it takes the prefix `Local\`. Within a terminal server session, two mutexes whose names differ only by their prefixes are separate mutexes, and both are visible to all processes in the terminal server session. That is, the prefix names `Global\` and `Local\` describe the scope of the mutex name relative to terminal server sessions, not relative to processes.

#### Examples
The following example shows how a named mutex is used to signal between threads running in two separate processes.

Run this program from two or more command windows. Each process creates a `Mutex` object that represents the named mutex `MyMutex`. The named mutex is a system object whose lifetime is bounded by the lifetimes of the `Mutex` objects that represent it. The named mutex is created when the first process creates its `Mutex` object; in this example, the named mutex is owned by the first process that runs the program. The named mutex is destroyed when all the `Mutex` objects that represent it have been released.

The constructor overload used in this example cannot tell the calling thread whether initial ownership of the named mutex was granted. You should not use this constructor to request initial ownership unless you can be certain that the thread will create the named mutex.

_Code sample not included: ~/snippets/csharp/System.Threading/Mutex/.ctor/class11.cs._
