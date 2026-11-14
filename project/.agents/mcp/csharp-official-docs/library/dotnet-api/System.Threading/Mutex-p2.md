---
title: "Mutex class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Mutex.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Mutex class (part 2 of 4)

## Mutex.Mutex(String, NamedWaitHandleOptions) constructor

```csharp
public Mutex (string? name, System.Threading.NamedWaitHandleOptions options);
```

Initializes a new instance of the `Mutex` class with a string that is the name of the mutex and options to set user-scope and session-scope access. The calling thread does not request to have initial ownership of the mutex.

Parameters:

- `name`: The name, if the synchronization object is to be shared with other processes; otherwise, `null` or an empty string. The name is case-sensitive.
- `options`: The scope options for the named system mutex. Defaults to access limited to current user and current session only. The specified options might affect the namespace for the name and access to the underlying system mutex object.

Exceptions:

- `UnauthorizedAccessException`: The named mutex exists and has access control security, but the user does not have `MutexRights.FullControl`.
- `IOException`: `name` is invalid. This can be for various reasons, including some restrictions that might be placed by the operating system, such as an unknown prefix or invalid characters. Note that the name and common prefixes "Global\\" and "Local\\" are case-sensitive.

-or-

There was some other error. The `HResult` property might provide more information.
- `DirectoryNotFoundException`: Windows only: `name` specified an unknown namespace. See Object Names for more information.
- `PathTooLongException`: The `name` is too long. Length restrictions might depend on the operating system or configuration.
- `WaitHandleCannotBeOpenedException`: A synchronization object with the provided `name` cannot be created. A synchronization object of a different type might have the same name.
-or-

An object with the specified `name` exists, but the specified `options` are not compatible with the existing object's options.

> **Caution:**
> On Unix-like operating systems, a named mutex is restricted to the user that created it by default. Setting `CurrentUserOnly` to `false` makes the mutex accessible to all users on the machine, which on Unix-like operating systems is a potential security issue. On Unix-like operating systems, only disable user-level restrictions when all users on the machine, including regular users and root, are in the same trust boundary. Otherwise, a root process and a user process that share a mutex can enable privilege escalation. On Windows, to restrict access to specific users, you can use a constructor overload or `MutexAcl` and pass in a `MutexSecurity` when creating the named mutex. On Unix-like operating systems, currently there is no way to restrict access to specific users beyond `CurrentUserOnly`.

If a `name` is provided and a synchronization object of the requested type already exists in the namespace, the existing synchronization object is used, However, if `options` specifies access limited to the current user and the synchronization object is not compatible with it, a `WaitHandleCannotBeOpenedException` is thrown. If a synchronization object of a different type already exists in the namespace, a `WaitHandleCannotBeOpenedException` is thrown as well. Otherwise, a new synchronization object is created.

This constructor initializes a `Mutex` object that represents a named system mutex. You can create multiple `Mutex` objects that represent the same named system mutex.

If the named mutex has already been created with access control security and the caller does not have `FullControl`, an exception is thrown. To open an existing named mutex with only those permissions needed for synchronizing thread activities, see the `Mutex.OpenExisting` method.

If you specify `null` or an empty string for `name`, a local mutex is created, as if you had called the `%23ctor` constructor.

Because they are system-wide, named mutexes can be used to coordinate resource use across process boundaries.

The `options` parameter can be provided to specify whether the named mutex is accessible to the current user only or to all users. It also allows you to specify whether the named mutex is accessible to processes in the current session only or to all sessions. For more information, see `NamedWaitHandleOptions`.

## Mutex.Mutex(Boolean, String, Boolean) constructor

```csharp
public Mutex (bool initiallyOwned, string? name, out bool createdNew);
```

Initializes a new instance of the `Mutex` class with a Boolean value that indicates whether the calling thread should have initial ownership of the mutex, a string that is the name of the mutex, and a Boolean value that, when the method returns, indicates whether the calling thread was granted initial ownership of the mutex.

Parameters:

- `initiallyOwned`: `true` to give the calling thread initial ownership of the named system mutex if the named system mutex is created as a result of this call; otherwise, `false`.
- `name`: The name, if the synchronization object is to be shared with other processes; otherwise, `null` or an empty string. The name is case-sensitive. The backslash character (\\) is reserved and may only be used to specify a namespace. For more information on namespaces, see the remarks section. There may be further restrictions on the name depending on the operating system. For example, on Unix-based operating systems, the name after excluding the namespace must be a valid file name.
- `createdNew`: When this method returns, contains a Boolean that is `true` if a local mutex was created (that is, if `name` is `null` or an empty string) or if the specified named system mutex was created; `false` if the specified named system mutex already existed. This parameter is passed uninitialized.

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

If `name` is not `null` and `initiallyOwned` is `true`, the calling thread owns the named mutex only if `createdNew` is `true` after the call. Otherwise the thread can request the mutex by calling the `WaitHandle.WaitOne` method.

This constructor initializes a `Mutex` object that represents a named system mutex. You can create multiple `Mutex` objects that represent the same named system mutex.

If the named mutex has already been created with access control security and the caller does not have `FullControl` rights, an exception is thrown. To open an existing named mutex with only those permissions needed for synchronizing thread activities, see the `Mutex.OpenExisting` method.

If you specify `null` or an empty string for `name`, a local mutex is created, as if you had called the `%23ctor` constructor. In this case, `createdNew` is always `true`.

Because they are system-wide, named mutexes can be used to coordinate resource use across process boundaries.

> **Note:**
> On a server that is running Terminal Services, a named system mutex can have two levels of visibility. If its name begins with the prefix `Global\`, the mutex is visible in all terminal server sessions. If its name begins with the prefix `Local\`, the mutex is visible only in the terminal server session where it was created. In that case, a separate mutex with the same name can exist in each of the other terminal server sessions on the server. If you do not specify a prefix when you create a named mutex, it takes the prefix `Local\`. Within a terminal server session, two mutexes whose names differ only by their prefixes are separate mutexes, and both are visible to all processes in the terminal server session. That is, the prefix names `Global\` and `Local\` describe the scope of the mutex name relative to terminal server sessions, not relative to processes.

#### Examples
The following code example shows how a named mutex is used to signal between processes or threads. Run this program from two or more command windows. Each process creates a `Mutex` object that represents the named mutex "MyMutex". The named mutex is a system object. In this example, its lifetime is bounded by the lifetimes of the `Mutex` objects that represent it. The named mutex is created when the first process creates its local `Mutex` object, and destroyed when all the `Mutex` objects that represent it have been released. The named mutex is initially owned by the first process. The second process and any subsequent processes wait for earlier processes to release the named mutex.

_Code sample not included: ~/snippets/csharp/System.Threading/Mutex/.ctor/class12.cs._
