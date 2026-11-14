---
title: "Semaphore class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Semaphore.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Semaphore class (part 2 of 4)

## Semaphore.Semaphore(Int32, Int32, String, Boolean) constructor

```csharp
public Semaphore (int initialCount, int maximumCount, string? name, out bool createdNew);
```

Initializes a new instance of the `Semaphore` class, specifying the initial number of entries and the maximum number of concurrent entries, optionally specifying the name of a system semaphore object, and specifying a variable that receives a value indicating whether a new system semaphore was created.

Parameters:

- `initialCount`: The initial number of requests for the semaphore that can be satisfied concurrently.
- `maximumCount`: The maximum number of requests for the semaphore that can be satisfied concurrently.
- `name`: The name, if the synchronization object is to be shared with other processes; otherwise, `null` or an empty string. The name is case-sensitive. The backslash character (\\) is reserved and may only be used to specify a namespace. For more information on namespaces, see the remarks section. There may be further restrictions on the name depending on the operating system. For example, on Unix-based operating systems, the name after excluding the namespace must be a valid file name.
- `createdNew`: When this method returns, contains `true` if a local semaphore was created (that is, if `name` is `null` or an empty string) or if the specified named system semaphore was created; `false` if the specified named system semaphore already existed. This parameter is passed uninitialized.

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
The `name` may be prefixed with `Global\` or `Local\` to specify a namespace. When the `Global` namespace is specified, the synchronization object may be shared with any processes on the system. When the `Local` namespace is specified, which is also the default when no namespace is specified, the synchronization object may be shared with processes in the same session. On Windows, a session is a login session, and services typically run in a different non-interactive session. On Unix-like operating systems, each shell has its own session. Session-local synchronization objects may be appropriate for synchronizing between processes with a parent/child relationship where they all run in the same session. For more information about synchronization object names on Windows, see Object Names.

If a `name` is provided and a synchronization object of the requested type already exists in the namespace, the existing synchronization object is used. If a synchronization object of a different type already exists in the namespace, a `WaitHandleCannotBeOpenedException` is thrown. Otherwise, a new synchronization object is created.

This constructor initializes a `Semaphore` object that represents a named system semaphore. You can create multiple `Semaphore` objects that represent the same named system semaphore.

If the named system semaphore does not exist, it is created with the initial count and maximum count specified by `initialCount` and `maximumCount`. If the named system semaphore already exists, `initialCount` and `maximumCount` are not used, although invalid values still cause exceptions. Use `createdNew` to determine whether the system semaphore was created.

If `initialCount` is less than `maximumCount`, and `createdNew` is `true`, the effect is the same as if the current thread had called `WaitHandle.WaitOne` (`maximumCount` minus `initialCount`) times.

If you specify `null` or an empty string for `name`, a local semaphore is created, as if you had called the `%23ctor` constructor overload. In this case, `createdNew` is always `true`.

Because named semaphores are visible throughout the operating system, they can be used to coordinate resource use across process boundaries.

> **Caution:**
> By default, a named semaphore is not restricted to the user that created it. Other users may be able to open and use the semaphore, including interfering with the semaphore by acquiring the semaphore multiple times and not releasing it. To restrict access to specific users, you can use a constructor overload or `SemaphoreAcl` and pass in a `SemaphoreSecurity` when creating the named semaphore. Avoid using named semaphores without access restrictions on systems that might have untrusted users running code.

#### Examples
The following code example demonstrates the cross-process behavior of a named semaphore. The example creates a named semaphore with a maximum count of five and an initial count of two. That is, it reserves three entries for the thread that calls the constructor. If `createNew` is `false`, the program makes three calls to the `WaitHandle.WaitOne` method. Thus, if you run the compiled example from two command windows, the second copy will block on the third call to `WaitHandle.WaitOne`. Release one or more entries in the first copy of the program to unblock the second.

_Code sample not included: ~/snippets/csharp/System.Threading/Semaphore/.ctor/source1.cs._

## Semaphore.Semaphore(Int32, Int32, String, NamedWaitHandleOptions) constructor

```csharp
public Semaphore (int initialCount, int maximumCount, string? name, System.Threading.NamedWaitHandleOptions options);
```

Initializes a new instance of the `Semaphore` class, specifying the initial number of entries and the maximum number of concurrent entries, and optionally specifying the name of a system semaphore object and options to set user-scope and session-scope access.

Parameters:

- `initialCount`: The initial number of requests for the semaphore that can be satisfied concurrently.
- `maximumCount`: The maximum number of requests for the semaphore that can be satisfied concurrently.
- `name`: The name, if the synchronization object is to be shared with other processes; otherwise, `null` or an empty string. The name is case-sensitive.
- `options`: The scope options for the named semaphore. Defaults to access limited to current user and current session only. The specified options might affect the namespace for the name and access to the underlying semaphore object.

Exceptions:

- `ArgumentException`: `initialCount` is greater than `maximumCount`.

-or-

`initialCount` is less than 0.
- `IOException`: `name` is invalid. This can be for various reasons, including some restrictions that might be placed by the operating system, such as an unknown prefix or invalid characters. Note that the name and common prefixes "Global\\" and "Local\\" are case-sensitive.

-or-

There was some other error. The `HResult` property might provide more information.
- `DirectoryNotFoundException`: Windows only: `name` specified an unknown namespace. See Object Names for more information.
- `PathTooLongException`: The `name` is too long. Length restrictions may depend on the operating system or configuration.
- `UnauthorizedAccessException`: The named semaphore exists and has access control security, and the user does not have `SemaphoreRights.FullControl`.
- `WaitHandleCannotBeOpenedException`: A synchronization object with the provided `name` cannot be created. A synchronization object of a different type might have the same name.

-or-

An object with the specified `name` exists, but the specified `options` are not compatible with the existing object's options.

This constructor initializes a `Semaphore` object that represents a named system semaphore. You can create multiple `Semaphore` objects that represent the same named system semaphore.

If a `name` is provided and a synchronization object of the requested type already exists in the namespace, the existing synchronization object is used unless `options` specifies access limited to the current user and the synchronization object is not compatible with it, in which case a `WaitHandleCannotBeOpenedException` is thrown. If a synchronization object of a different type already exists in the namespace, a `WaitHandleCannotBeOpenedException` is thrown as well. Otherwise, a new synchronization object is created.

If the named system semaphore does not exist, it is created with the initial count and maximum count specified by `initialCount` and `maximumCount`. If the named system semaphore already exists, `initialCount` and `maximumCount` are not used, although invalid values still cause exceptions. If you need to determine whether or not a named system semaphore was created, use the `%23ctor` constructor overload instead.

> **Important:**
> When you use this constructor overload, the recommended practice is to specify the same number for `initialCount` and `maximumCount`. If `initialCount` is less than `maximumCount`, and a named system semaphore is created, the effect is the same as if the current thread had called `WaitHandle.WaitOne` (`maximumCount` minus `initialCount`) times. However, with this constructor overload, there's no way to determine whether a named system semaphore was created.

If you specify `null` or an empty string for `name`, a local semaphore is created, as if you had called the `%23ctor` constructor overload.

Because named semaphores are visible throughout the operating system, they can be used to coordinate resource use across process boundaries.

If you want to find out whether a named system semaphore exists, use the `Semaphore.OpenExisting` method. The `Semaphore.OpenExisting` method attempts to open an existing named semaphore, and throws an exception if the system semaphore does not exist.

On Windows, `options` can be provided to specify whether the named semaphore is accessible to the current user only or to all users. It also allows you to specify whether the named semaphore is accessible to processes in the current session only or to all sessions. For more information, see `NamedWaitHandleOptions`.

> **Caution:**
> On Unix-based operating systems, the `options` parameter has no effect as named semaphores are not supported.
