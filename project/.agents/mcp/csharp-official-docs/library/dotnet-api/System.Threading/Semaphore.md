---
title: "Semaphore class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Semaphore.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Semaphore class

Namespace: `System.Threading`

```csharp
public sealed class Semaphore : System.Threading.WaitHandle
```

Limits the number of threads that can access a resource or pool of resources concurrently.

#### Remarks
Use the `Semaphore` class to control access to a pool of resources. Threads enter the semaphore by calling the `WaitHandle.WaitOne` method, which is inherited from the `WaitHandle` class, and release the semaphore by calling the `Semaphore.Release` method.

The count on a semaphore is decremented each time a thread enters the semaphore, and incremented when a thread releases the semaphore. When the count is zero, subsequent requests block until other threads release the semaphore. When all threads have released the semaphore, the count is at the maximum value specified when the semaphore was created.

There is no guaranteed order, such as FIFO or LIFO, in which blocked threads enter the semaphore.

A thread can enter the semaphore multiple times, by calling the `WaitHandle.WaitOne` method repeatedly. To release some or all of these entries, the thread can call the parameterless `Release` method overload multiple times, or it can call the `Release` method overload that specifies the number of entries to be released.

The `Semaphore` class does not enforce thread identity on calls to `WaitHandle.WaitOne` or `Semaphore.Release`. It is the programmer's responsibility to ensure that threads do not release the semaphore too many times. For example, suppose a semaphore has a maximum count of two, and that thread A and thread B both enter the semaphore. If a programming error in thread B causes it to call `Semaphore.Release` twice, both calls succeed. The count on the semaphore is full, and when thread A eventually calls `Semaphore.Release`, a `SemaphoreFullException` is thrown.

Semaphores are of two types: local semaphores and named system semaphores. If you create a `Semaphore` object using a constructor that accepts a name, it is associated with an operating-system semaphore of that name. Named system semaphores are visible throughout the operating system, and can be used to synchronize the activities of processes. You can create multiple `Semaphore` objects that represent the same named system semaphore, and you can use the `Semaphore.OpenExisting` method to open an existing named system semaphore.

A local semaphore exists only within your process. It can be used by any thread in your process that has a reference to the local `Semaphore` object. Each `Semaphore` object is a separate local semaphore.

> **Caution:**
> By default, a named semaphore is not restricted to the user that created it. Other users may be able to open and use the semaphore, including interfering with the semaphore by acquiring the semaphore multiple times and not releasing it. To restrict access to specific users, you can use a constructor overload or `SemaphoreAcl` and pass in a `SemaphoreSecurity` when creating the named semaphore. Avoid using named semaphores without access restrictions on systems that might have untrusted users running code.

#### Examples
The following code example creates a semaphore with a maximum count of three and an initial count of zero. The example starts five threads, which block waiting for the semaphore. The main thread uses the `Release` method overload to increase the semaphore count to its maximum, allowing three threads to enter the semaphore. Each thread uses the `Thread.Sleep` method to wait for one second, to simulate work, and then calls the `Release` method overload to release the semaphore. Each time the semaphore is released, the previous semaphore count is displayed. Console messages track semaphore use. The simulated work interval is increased slightly for each thread, to make the output easier to read.

_Code sample not included: ~/snippets/csharp/System.Threading/Semaphore/Overview/source.cs._

## Semaphore.Semaphore(Int32, Int32) constructor

```csharp
public Semaphore (int initialCount, int maximumCount);
```

Initializes a new instance of the `Semaphore` class, specifying the initial number of entries and the maximum number of concurrent entries.

Parameters:

- `initialCount`: The initial number of requests for the semaphore that can be granted concurrently.
- `maximumCount`: The maximum number of requests for the semaphore that can be granted concurrently.

Exceptions:

- `ArgumentException`: `initialCount` is greater than `maximumCount`.
- `ArgumentOutOfRangeException`: `maximumCount` is less than 1.

-or-

`initialCount` is less than 0.

#### Remarks
This constructor initializes an unnamed semaphore. All threads that use an instance of such a semaphore must have references to the instance.

If `initialCount` is less than `maximumCount`, the effect is the same as if the current thread had called `WaitHandle.WaitOne` (`maximumCount` minus `initialCount`) times. If you do not want to reserve any entries for the thread that creates the semaphore, use the same number for `maximumCount` and `initialCount`.

#### Examples
The following example creates a semaphore with a maximum count of three and an initial count of zero. The example starts five threads, which block waiting for the semaphore. The main thread uses the `Release` method overload to increase the semaphore count to its maximum, allowing three threads to enter the semaphore. Each thread uses the `Thread.Sleep` method to wait for one second, to simulate work, and then calls the `Release` method overload to release the semaphore. Each time the semaphore is released, the previous semaphore count is displayed. Console messages track semaphore use. The simulated work interval is increased slightly for each thread, to make the output easier to read.

_Code sample not included: ~/snippets/csharp/System.Threading/Semaphore/Overview/source.cs._

## Semaphore.Semaphore(Int32, Int32, String) constructor

```csharp
public Semaphore (int initialCount, int maximumCount, string? name);
```

Initializes a new instance of the `Semaphore` class, specifying the initial number of entries and the maximum number of concurrent entries, and optionally specifying the name of a system semaphore object.

Parameters:

- `initialCount`: The initial number of requests for the semaphore that can be granted concurrently.
- `maximumCount`: The maximum number of requests for the semaphore that can be granted concurrently.
- `name`: The name, if the synchronization object is to be shared with other processes; otherwise, `null` or an empty string. The name is case-sensitive. The backslash character (\\) is reserved and may only be used to specify a namespace. For more information on namespaces, see the remarks section. There may be further restrictions on the name depending on the operating system. For example, on Unix-based operating systems, the name after excluding the namespace must be a valid file name.

Exceptions:

- `ArgumentException`: `initialCount` is greater than `maximumCount`.
- `ArgumentOutOfRangeException`: `maximumCount` is less than 1.

-or-

`initialCount` is less than 0.
- `IOException`: `name` is invalid. This can be for various reasons, including some restrictions that might be placed by the operating system, such as an unknown prefix or invalid characters. Note that the name and common prefixes "Global\\" and "Local\\" are case-sensitive.

-or-

There was some other error. The `HResult` property might provide more information.
- `DirectoryNotFoundException`: Windows only: `name` specified an unknown namespace. See Object Names for more information.
- `PathTooLongException`: The `name` is too long. Length restrictions may depend on the operating system or configuration.
- `UnauthorizedAccessException`: The named semaphore exists and has access control security, and the user does not have `SemaphoreRights.FullControl`.
- `WaitHandleCannotBeOpenedException`: A synchronization object with the provided `name` cannot be created. A synchronization object of a different type might have the same name.

#### Remarks
This constructor initializes a `Semaphore` object that represents a named system semaphore. You can create multiple `Semaphore` objects that represent the same named system semaphore.

The `name` may be prefixed with `Global\` or `Local\` to specify a namespace. When the `Global` namespace is specified, the synchronization object may be shared with any processes on the system. When the `Local` namespace is specified, which is also the default when no namespace is specified, the synchronization object may be shared with processes in the same session. On Windows, a session is a login session, and services typically run in a different non-interactive session. On Unix-like operating systems, each shell has its own session. Session-local synchronization objects may be appropriate for synchronizing between processes with a parent/child relationship where they all run in the same session. For more information about synchronization object names on Windows, see Object Names.

If a `name` is provided and a synchronization object of the requested type already exists in the namespace, the existing synchronization object is used. If a synchronization object of a different type already exists in the namespace, a `WaitHandleCannotBeOpenedException` is thrown. Otherwise, a new synchronization object is created.

If the named system semaphore does not exist, it is created with the initial count and maximum count specified by `initialCount` and `maximumCount`. If the named system semaphore already exists, `initialCount` and `maximumCount` are not used, although invalid values still cause exceptions. If you need to determine whether or not a named system semaphore was created, use the `%23ctor` constructor overload instead.

> **Important:**
>  When you use this constructor overload, the recommended practice is to specify the same number for `initialCount` and `maximumCount`. If `initialCount` is less than `maximumCount`, and a named system semaphore is created, the effect is the same as if the current thread had called `WaitHandle.WaitOne` (`maximumCount` minus `initialCount`) times. However, with this constructor overload there is no way to determine whether a named system semaphore was created.

If you specify `null` or an empty string for `name`, a local semaphore is created, as if you had called the `%23ctor` constructor overload.

Because named semaphores are visible throughout the operating system, they can be used to coordinate resource use across process boundaries.

If you want to find out whether a named system semaphore exists, use the `Semaphore.OpenExisting` method. The `Semaphore.OpenExisting` method attempts to open an existing named semaphore, and throws an exception if the system semaphore does not exist.

> **Caution:**
> By default, a named semaphore is not restricted to the user that created it. Other users may be able to open and use the semaphore, including interfering with the semaphore by acquiring the semaphore multiple times and not releasing it. To restrict access to specific users, you can use a constructor overload or `SemaphoreAcl` and pass in a `SemaphoreSecurity` when creating the named semaphore. Avoid using named semaphores without access restrictions on systems that might have untrusted users running code.

#### Examples
The following code example demonstrates the cross-process behavior of a named semaphore. The example creates a named semaphore with a maximum count of five and an initial count of five. The program makes three calls to the `WaitHandle.WaitOne` method. Thus, if you run the compiled example from two command windows, the second copy will block on the third call to `WaitHandle.WaitOne`. Release one or more entries in the first copy of the program to unblock the second.

_Code sample not included: ~/snippets/csharp/System.Threading/Semaphore/.ctor/source.cs._
