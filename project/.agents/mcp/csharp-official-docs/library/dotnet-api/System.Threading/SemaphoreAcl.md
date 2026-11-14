---
title: "SemaphoreAcl class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/SemaphoreAcl.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SemaphoreAcl class

Namespace: `System.Threading`

```csharp
public static class SemaphoreAcl
```

Provides a Windows-specific extension method for creating `Semaphore` objects with specific access control list (ACL) security.

#### Remarks

> **Note:**
> This type is only supported on Windows.

## SemaphoreAcl.Create(Int32, Int32, String, Boolean, SemaphoreSecurity) method

```csharp
public static System.Threading.Semaphore Create (int initialCount, int maximumCount, string? name, out bool createdNew, System.Security.AccessControl.SemaphoreSecurity? semaphoreSecurity);
```

Gets or creates an `Semaphore` instance, allowing a `SemaphoreSecurity` instance to be optionally specified to set it during the event creation.

Parameters:

- `initialCount`: The initial number of requests for the semaphore that can be satisfied concurrently.
- `maximumCount`: The maximum number of requests for the semaphore that can be satisfied concurrently.
- `name`: The name, if the synchronization object is to be shared with other processes; otherwise, `null` or an empty string. The name is case-sensitive. The backslash character (\\) is reserved and may only be used to specify a namespace. For more information on namespaces, see the remarks section. There may be further restrictions on the name depending on the operating system. For example, on Unix-based operating systems, the name after excluding the namespace must be a valid file name.
- `createdNew`: When this method returns, this argument is always set to `true` if a local semaphore is created; that is, when `name` is `null` or `String.Empty`. If `name` has a valid, non-empty value, this argument is set to `true` when the system semaphore is created, or it is set to `false` if an existing system semaphore is found with that name. This parameter is passed uninitialized.
- `semaphoreSecurity`: The optional semaphore access control security to apply.

Returns: An object that represents a system semaphore, if named, or a local semaphore, if nameless.

Exceptions:

- `ArgumentOutOfRangeException`: `initialCount` is a negative number.
-or-

`maximumCount` is not a positive number.
- `ArgumentException`: `initialCount` is greater than `maximumCount`.
- `IOException`: `name` is invalid. This can be for various reasons, including some restrictions that may be placed by the operating system, such as an unknown prefix or invalid characters. Note that the name and common prefixes "Global\\" and "Local\\" are case-sensitive.

-or-

There was some other error. The `HResult` property may provide more information.
- `DirectoryNotFoundException`: Windows only: `name` specified an unknown namespace. See Object Names for more information.
- `PathTooLongException`: The `name` is too long. Length restrictions may depend on the operating system or configuration.
- `WaitHandleCannotBeOpenedException`: A synchronization object with the provided `name` cannot be created. A synchronization object of a different type might have the same name.

#### Remarks
The `name` may be prefixed with `Global\` or `Local\` to specify a namespace. When the `Global` namespace is specified, the synchronization object may be shared with any processes on the system. When the `Local` namespace is specified, which is also the default when no namespace is specified, the synchronization object may be shared with processes in the same session. On Windows, a session is a login session, and services typically run in a different non-interactive session. On Unix-like operating systems, each shell has its own session. Session-local synchronization objects may be appropriate for synchronizing between processes with a parent/child relationship where they all run in the same session. For more information about synchronization object names on Windows, see Object Names.

If a `name` is provided and a synchronization object of the requested type already exists in the namespace, the existing synchronization object is opened. If a synchronization object of a different type already exists in the namespace, a `WaitHandleCannotBeOpenedException` is thrown. Otherwise, a new synchronization object is created.

> **Caution:**
> By default, a named semaphore is not restricted to the user that created it. Other users may be able to open and use the semaphore, including interfering with the semaphore by acquiring the semaphore multiple times and not releasing it. To restrict access to specific users, you can pass in a `SemaphoreSecurity` when creating the named semaphore. Avoid using named semaphores without access restrictions on systems that might have untrusted users running code.

## SemaphoreAcl.OpenExisting(String, SemaphoreRights) method

```csharp
public static System.Threading.Semaphore OpenExisting (string name, System.Security.AccessControl.SemaphoreRights rights);
```

Opens a specified named semaphore, if it already exists, and applies the desired access rights.

Parameters:

- `name`: The name of the semaphore to be opened. If it's prefixed by "Global", it refers to a machine-wide semaphore. If it's prefixed by "Local", or doesn't have a prefix, it refers to a session-wide semaphore. Both prefix and name are case-sensitive.
- `rights`: The desired access rights to apply to the returned semaphore.

Returns: An existing named semaphore.

Exceptions:

- `ArgumentNullException`: `name` is `null`.
- `ArgumentException`: `name` is an empty string.
- `WaitHandleCannotBeOpenedException`: The named semaphore does not exist or is invalid.
- `IOException`: The path was not found.

-or-

A Win32 error occurred.
- `UnauthorizedAccessException`: The named semaphore exists, but the user does not have the security access required to use it.

To be added.

## SemaphoreAcl.TryOpenExisting(String, SemaphoreRights, Semaphore) method

```csharp
public static bool TryOpenExisting (string name, System.Security.AccessControl.SemaphoreRights rights, out System.Threading.Semaphore? result);
```

Tries to open a specified named semaphore, if it already exists, applies the desired access rights, and returns a value that indicates whether the operation succeeded.

Parameters:

- `name`: The name of the semaphore to be opened. If it's prefixed by "Global", it refers to a machine-wide semaphore. If it's prefixed by "Local", or doesn't have a prefix, it refers to a session-wide semaphore. Both prefix and name are case-sensitive.
- `rights`: The desired access rights to apply to the returned semaphore.
- `result`: When this method returns `true`, contains an object that represents the named semaphore if the call succeeded, or `null` otherwise. This parameter is treated as uninitialized.

Returns: `true` if the named semaphore was opened successfully; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `name` is `null`
- `ArgumentException`: `name` is an empty string.
- `IOException`: A Win32 error occurred.
- `UnauthorizedAccessException`: The named semaphore exists, but the user does not have the security access required to use it.

To be added.
