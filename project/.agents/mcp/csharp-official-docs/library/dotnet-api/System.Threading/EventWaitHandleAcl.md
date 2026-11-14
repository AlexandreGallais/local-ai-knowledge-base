---
title: "EventWaitHandleAcl class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/EventWaitHandleAcl.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventWaitHandleAcl class

Namespace: `System.Threading`

```csharp
public static class EventWaitHandleAcl
```

Provides a Windows-specific extension method for creating `EventWaitHandle` objects with specific access control list (ACL) security.

#### Remarks

> **Note:**
> This type is only supported on Windows.

## EventWaitHandleAcl.Create(Boolean, EventResetMode, String, Boolean, EventWaitHandleSecurity) method

```csharp
public static System.Threading.EventWaitHandle Create (bool initialState, System.Threading.EventResetMode mode, string? name, out bool createdNew, System.Security.AccessControl.EventWaitHandleSecurity? eventSecurity);
```

Gets or creates an `EventWaitHandle` instance, allowing a `EventWaitHandleSecurity` instance to be optionally specified to set it during the event creation.

Parameters:

- `initialState`: `true` to set the initial state to signaled if the named event is created as a result of this call; `false` to set it to non-signaled.
- `mode`: One of the enum values that determines whether the event resets automatically or manually.
- `name`: The name, if the synchronization object is to be shared with other processes; otherwise, `null` or an empty string. The name is case-sensitive. The backslash character (\\) is reserved and may only be used to specify a namespace. For more information on namespaces, see the remarks section. There may be further restrictions on the name depending on the operating system. For example, on Unix-based operating systems, the name after excluding the namespace must be a valid file name.
- `createdNew`: When this method returns, this argument is always set to `true` if a local event is created; that is, when `name` is `null` or `String.Empty`. If `name` has a valid, non-empty value, this argument is set to `true` when the system event is created, or it is set to `false` if an existing system event is found with that name.
- `eventSecurity`: The optional Windows access control security to apply.

Returns: An object that represents an event wait handle as requested.

Exceptions:

- `ArgumentException`: The `mode` enum value was out of legal range.
- `ArgumentOutOfRangeException`: The `mode` enum value was out of legal range. In some cases `ArgumentException` is thrown instead.
- `IOException`: `name` is invalid. This can be for various reasons, including some restrictions that may be placed by the operating system, such as an unknown prefix or invalid characters. Note that the name and common prefixes "Global\\" and "Local\\" are case-sensitive.

-or-

There was some other error. The `HResult` property may provide more information.
- `DirectoryNotFoundException`: Windows only: `name` specified an unknown namespace. See Object Names for more information.
- `PathTooLongException`: The `name` is too long. Length restrictions may depend on the operating system or configuration.
- `WaitHandleCannotBeOpenedException`: A synchronization object with the provided `name` cannot be created. A synchronization object of a different type might have the same name.
- `UnauthorizedAccessException`: The named event exists, but the user does not have the desired security access.

#### Remarks
The `name` may be prefixed with `Global\` or `Local\` to specify a namespace. When the `Global` namespace is specified, the synchronization object may be shared with any processes on the system. When the `Local` namespace is specified, which is also the default when no namespace is specified, the synchronization object may be shared with processes in the same session. On Windows, a session is a login session, and services typically run in a different non-interactive session. On Unix-like operating systems, each shell has its own session. Session-local synchronization objects may be appropriate for synchronizing between processes with a parent/child relationship where they all run in the same session. For more information about synchronization object names on Windows, see Object Names.

If a `name` is provided and a synchronization object of the requested type already exists in the namespace, the existing synchronization object is opened. If a synchronization object of a different type already exists in the namespace, a `WaitHandleCannotBeOpenedException` is thrown. Otherwise, a new synchronization object is created.

> **Caution:**
> By default, a named event is not restricted to the user that created it. Other users may be able to open and use the event, including interfering with the event by setting or resetting it inappropriately. To restrict access to specific users, you can pass in an `EventWaitHandleSecurity` when creating the named event. Avoid using named events without access restrictions on systems that might have untrusted users running code.

## EventWaitHandleAcl.OpenExisting(String, EventWaitHandleRights) method

```csharp
public static System.Threading.EventWaitHandle OpenExisting (string name, System.Security.AccessControl.EventWaitHandleRights rights);
```

Opens a specified named event wait handle, if it already exists, and applies the desired access rights.

Parameters:

- `name`: The name of the event wait handle to be opened. If it's prefixed by "Global", it refers to a machine-wide event wait handle. If it's prefixed by "Local", or doesn't have a prefix, it refers to a session-wide event wait handle. Both prefix and name are case-sensitive.
- `rights`: The desired access rights to apply to the returned event wait handle.

Returns: An existing named event wait handle.

Exceptions:

- `ArgumentNullException`: `name` is `null`.
- `ArgumentException`: `name` is an empty string.
- `WaitHandleCannotBeOpenedException`: The named event wait handle does not exist or is invalid.
- `DirectoryNotFoundException`: The path was not found.
- `IOException`: A Win32 error occurred.
- `UnauthorizedAccessException`: The named event wait handle exists, but the user does not have the security access required to use it.

To be added.

## EventWaitHandleAcl.TryOpenExisting(String, EventWaitHandleRights, EventWaitHandle) method

```csharp
public static bool TryOpenExisting (string name, System.Security.AccessControl.EventWaitHandleRights rights, out System.Threading.EventWaitHandle? result);
```

Tries to open a specified named event wait handle, if it already exists, applies the desired access rights, and returns a value that indicates whether the operation succeeded.

Parameters:

- `name`: The name of the event wait handle to be opened. If it's prefixed by "Global", it refers to a machine-wide event wait handle. If it's prefixed by "Local", or doesn't have a prefix, it refers to a session-wide event wait handle. Both prefix and name are case-sensitive.
- `rights`: The desired access rights to apply to the returned event wait handle.
- `result`: When this method returns `true`, contains an object that represents the named event wait handle if the call succeeded, or `null` otherwise. This parameter is treated as uninitialized.

Returns: `true` if the named event wait handle was opened successfully; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `name` is `null`
- `ArgumentException`: `name` is an empty string.
- `IOException`: A Win32 error occurred.
- `UnauthorizedAccessException`: The named event wait handle exists, but the user does not have the security access required to use it.

To be added.
