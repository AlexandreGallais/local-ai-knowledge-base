---
title: "Semaphore class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Semaphore.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Semaphore class (part 4 of 4)

## Semaphore.Release(Int32) method

```csharp
public int Release (int releaseCount);
```

Exits the semaphore a specified number of times and returns the previous count.

Parameters:

- `releaseCount`: The number of times to exit the semaphore.

Returns: The count on the semaphore before the `Release` method was called.

Exceptions:

- `ArgumentOutOfRangeException`: `releaseCount` is less than 1.
- `SemaphoreFullException`: The semaphore count is already at the maximum value.
- `IOException`: A Win32 error occurred with a named semaphore.
- `UnauthorizedAccessException`: The current semaphore represents a named system semaphore, but the user does not have `SemaphoreRights.Modify` rights.

-or-

The current semaphore represents a named system semaphore, but it was not opened with `SemaphoreRights.Modify` rights.

#### Remarks
If a thread has entered the semaphore multiple times, this method overload allows the entire semaphore count to be restored with one call.

If a `SemaphoreFullException` is thrown by the `Semaphore.Release` method, it does not necessarily indicate a problem with the calling thread. A programming error in another thread might have caused that thread to exit the semaphore more times than it entered.

If the current `Semaphore` object represents a named system semaphore, the user must have `Modify` rights and the semaphore must have been opened with `Modify` rights.

#### Examples
The following code example creates a semaphore with a maximum count of three and an initial count of zero. The example starts five threads, which block waiting for the semaphore. The main thread uses the `Release` method overload to increase the semaphore count to its maximum, allowing three threads to enter the semaphore. Each thread uses the `Thread.Sleep` method to wait for one second, to simulate work, and then calls the `Release` method overload to release the semaphore.

Each time the semaphore is released, the previous semaphore count is displayed. Console messages track semaphore use. The simulated work interval is increased slightly for each thread, to make the output easier to read.

_Code sample not included: ~/snippets/csharp/System.Threading/Semaphore/Overview/source.cs._

## Semaphore.TryOpenExisting(String, Semaphore) method

```csharp
public static bool TryOpenExisting (string name, out System.Threading.Semaphore? result);
```

Opens the specified named semaphore, if it already exists, and returns a value that indicates whether the operation succeeded.

Parameters:

- `name`: The name of the synchronization object to be shared with other processes. The name is case-sensitive. The backslash character (\\) is reserved and may only be used to specify a namespace. For more information on namespaces, see the remarks section. There may be further restrictions on the name depending on the operating system. For example, on Unix-based operating systems, the name after excluding the namespace must be a valid file name.
- `result`: When this method returns, contains a `Semaphore` object that represents the named semaphore if the call succeeded, or `null` if the call failed. This parameter is treated as uninitialized.

Returns: `true` if the named semaphore was opened successfully; otherwise, `false`. In some cases, `false` may be returned for invalid names.

Exceptions:

- `ArgumentException`: `name` is an empty string.
- `ArgumentNullException`: `name` is `null`.
- `IOException`: `name` is invalid. This can be for various reasons, including some restrictions that might be placed by the operating system, such as an unknown prefix or invalid characters. Note that the name and common prefixes "Global\\" and "Local\\" are case-sensitive. For some invalid names, the method may return `false` instead.

-or-

There was some other error. The `HResult` property might provide more information.
- `PathTooLongException`: The `name` is too long. Length restrictions may depend on the operating system or configuration.
- `UnauthorizedAccessException`: The named semaphore exists, but the user does not have the security access required to use it.

#### Remarks
The `name` may be prefixed with `Global\` or `Local\` to specify a namespace. When the `Global` namespace is specified, the synchronization object may be shared with any processes on the system. When the `Local` namespace is specified, which is also the default when no namespace is specified, the synchronization object may be shared with processes in the same session. On Windows, a session is a login session, and services typically run in a different non-interactive session. On Unix-like operating systems, each shell has its own session. Session-local synchronization objects may be appropriate for synchronizing between processes with a parent/child relationship where they all run in the same session. For more information about synchronization object names on Windows, see Object Names.

If a synchronization object of the requested type exists in the namespace, the existing synchronization object is opened. If a synchronization object does not exist in the namespace, or a synchronization object of a different type exists in the namespace, `false` is returned.

To create the system semaphore when it does not already exist, use one of the `Semaphore.%23ctor` constructors that has a `name` parameter.

If you are uncertain whether a named semaphore exists, use this method overload instead of the `OpenExisting` method overload, which throws an exception if the semaphore does not exist.

This method overload is equivalent to calling the `Semaphore.TryOpenExisting` method overload and specifying `Synchronize` and `Modify` rights, combined by using the bitwise OR operation. Specifying the `Synchronize` flag allows a thread to enter the semaphore, and specifying the   `Modify` flag allows a thread to call the `Semaphore.Release` method.

## Semaphore.TryOpenExisting(String, NamedWaitHandleOptions, Semaphore) method

```csharp
public static bool TryOpenExisting (string name, System.Threading.NamedWaitHandleOptions options, out System.Threading.Semaphore? result);
```

Opens the specified named semaphore, if it already exists, and returns a value that indicates whether the operation succeeded. If the options are set to the current user only, the object's access controls are verified for the calling user.

Parameters:

- `name`: The name of the synchronization object to be shared with other processes. The name is case-sensitive. The backslash character (\\) is reserved and may only be used to specify a namespace. For more information on namespaces, see the remarks section.
- `options`: The scope options for the named semaphore. Defaults to access limited to current user and current session only. The specified options might affect the namespace for the name and access to the underlying semaphore object.
- `result`: When this method returns, contains a `Semaphore` object that represents the named semaphore if the call succeeded, or `null` if the call failed. This parameter is treated as uninitialized.

Returns: `true` if the named semaphore was opened successfully; otherwise, `false`. In some cases, `false` may be returned for invalid names.

Exceptions:

- `ArgumentException`: `name` is an empty string.
- `ArgumentNullException`: `name` is `null`.
- `IOException`: `name` is invalid. This can be for various reasons, including some restrictions that might be placed by the operating system, such as an unknown prefix or invalid characters. Note that the name and common prefixes "Global\\" and "Local\\" are case-sensitive. For some invalid names, the method may return `false` instead.

-or-

There was some other error. The `HResult` property might provide more information.
- `PathTooLongException`: The `name` is too long. Length restrictions may depend on the operating system or configuration.
- `UnauthorizedAccessException`: The named semaphore exists, but the user does not have the security access required to use it.

If a synchronization object of the requested type exists in the namespace, the existing synchronization object is opened. However, if `options` specifies access limited to the current user and the synchronization object is not compatible with it,  `false` is returned. If a synchronization object does not exist in the namespace, or a synchronization object of a different type exists in the namespace, `false` is returned as well.

To create the system semaphore when it does not already exist, use one of the `Semaphore.%23ctor` constructors that has a `name` parameter.

If you are uncertain whether a named semaphore exists, use this method overload instead of the `OpenExisting` method overload, which throws an exception if the semaphore does not exist.
