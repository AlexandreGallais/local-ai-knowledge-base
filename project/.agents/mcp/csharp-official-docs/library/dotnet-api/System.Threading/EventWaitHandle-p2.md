---
title: "EventWaitHandle class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/EventWaitHandle.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventWaitHandle class (part 2 of 3)

## EventWaitHandle.EventWaitHandle(Boolean, EventResetMode, String, NamedWaitHandleOptions) constructor

```csharp
public EventWaitHandle (bool initialState, System.Threading.EventResetMode mode, string? name, System.Threading.NamedWaitHandleOptions options);
```

Initializes a new instance of the `EventWaitHandle` class, specifying whether the wait handle is initially signaled if created as a result of this call, whether it resets automatically or manually, the name of a system synchronization event, and options to set user-scope and session-scope access.

Parameters:

- `initialState`: `true` to set the initial state to signaled if the named event is created as a result of this call; `false` to set it to nonsignaled.
- `mode`: One of the `EventResetMode` values that determines whether the event resets automatically or manually.
- `name`: The name, if the synchronization object is to be shared with other processes; otherwise, `null` or an empty string. The name is case-sensitive.
- `options`: The scope options for the named handle. Defaults to access limited to current user and current session only. The specified options might affect the namespace for the name and access to the underlying handle object.

Exceptions:

- `IOException`: `name` is invalid. This can be for various reasons, including some restrictions that might be placed by the operating system, such as an unknown prefix or invalid characters. Note that the name and common prefixes "Global\\" and "Local\\" are case-sensitive.

-or-

There was some other error. The `HResult` property might provide more information.
- `DirectoryNotFoundException`: Windows only: `name` specified an unknown namespace. See Object Names for more information.
- `PathTooLongException`: The `name` is too long. Length restrictions might depend on the operating system or configuration.
- `UnauthorizedAccessException`: The named event exists and has access control security, but the user does not have `EventWaitHandleRights.FullControl`.
- `WaitHandleCannotBeOpenedException`: A synchronization object with the provided `name` cannot be created. A synchronization object of a different type might have the same name.
-or-

An object with the specified `name` exists, but the specified `options` are not compatible with the existing object's options.
- `ArgumentException`: The `mode` enum value was out of legal range.

If a `name` is provided and a synchronization object of the requested type already exists in the namespace, the existing synchronization object is opened. However, if `options` specifies access limited to the current user and the synchronization object is not compatible with it, a `WaitHandleCannotBeOpenedException` is thrown. If a synchronization object of a different type already exists in the namespace, a `WaitHandleCannotBeOpenedException` is thrown as well. Otherwise, a new synchronization object is created.

If a system event with the name specified for the `name` parameter already exists, the `initialState` parameter is ignored.

> **Important:**
> When using this constructor for named system events, specify `false` for `initialState`. This constructor provides no way to determine whether a named system event was created, so you can't make any assumptions about the state of the named event. To determine whether a named event was created, use the `%23ctor` constructor or the `%23ctor` constructor.

If the initial state of the event is nonsignaled, threads that wait on the event will block. If the initial state is signaled and the `ManualReset` flag is specified for `mode`, threads that wait on the event will not block. If the initial state is signaled and `mode` is `AutoReset`, the first thread that waits on the event will be released immediately, after which the event will reset and subsequent threads will block.

On Windows, `options` can be provided to specify whether the named system event is accessible to the current user only, or to all users. It also allows you to specify whether the named system event is accessible to processes in the current session only, or to all sessions. For more information, see `NamedWaitHandleOptions`.

> **Caution:**
> On Unix-based operating systems, the `options` parameter has no effect as named system events aren't supported.

## EventWaitHandle.EventWaitHandle(Boolean, EventResetMode, String, NamedWaitHandleOptions, Boolean) constructor

```csharp
public EventWaitHandle (bool initialState, System.Threading.EventResetMode mode, string? name, System.Threading.NamedWaitHandleOptions options, out bool createdNew);
```

Initializes a new instance of the `EventWaitHandle` class, specifying whether the wait handle is initially signaled if created as a result of this call, whether it resets automatically or manually, the name of a system synchronization event, options to set user-scope and session-scope access, and a Boolean variable whose value after the call indicates whether the named system event was created.

Parameters:

- `initialState`: `true` to set the initial state to signaled if the named event is created as a result of this call; `false` to set it to nonsignaled.
- `mode`: One of the `EventResetMode` values that determines whether the event resets automatically or manually.
- `name`: The name, if the synchronization object is to be shared with other processes; otherwise, `null` or an empty string. The name is case-sensitive.
- `options`: The scope options for the named handle. Defaults to access limited to current user and current session only. The specified options might affect the namespace for the name and access to the underlying handle object.
- `createdNew`: When this method returns, contains `true` if a local event was created (that is, if `name` is `null` or an empty string) or if the specified named system event was created; contains `false` if the specified named system event already existed. This parameter is passed uninitialized.

Exceptions:

- `IOException`: `name` is invalid. This can be for various reasons, including some restrictions that might be placed by the operating system, such as an unknown prefix or invalid characters. Note that the name and common prefixes "Global\\" and "Local\\" are case-sensitive.

-or-

There was some other error. The `HResult` property might provide more information.
- `DirectoryNotFoundException`: Windows only: `name` specified an unknown namespace. See Object Names for more information.
- `PathTooLongException`: The `name` is too long. Length restrictions might depend on the operating system or configuration.
- `UnauthorizedAccessException`: The named event exists and has access control security, but the user does not have `EventWaitHandleRights.FullControl`.
- `WaitHandleCannotBeOpenedException`: A synchronization object with the provided `name` cannot be created. A synchronization object of a different type might have the same name.

-or-

An object with the specified `name` exists, but the specified `options` are not compatible with the existing object's options.
- `ArgumentException`: The `mode` enum value was out of legal range.

If a `name` is provided and a synchronization object of the requested type already exists in the namespace, the existing synchronization object is opened. However, if `options` specifies access limited to the current user and the synchronization object is not compatible with it, a `WaitHandleCannotBeOpenedException` is thrown. If a synchronization object of a different type already exists in the namespace, a `WaitHandleCannotBeOpenedException` is thrown as well. Otherwise, a new synchronization object is created.

If a system event with the name specified for the `name` parameter already exists, the `initialState` parameter is ignored. After calling this constructor, use the value in the variable specified for the `ref` parameter (`ByRef` parameter in Visual Basic) `createdNew` to determine whether the named system event already existed or was created.

If the initial state of the event is nonsignaled, threads that wait on the event will block. If the initial state is signaled, and the `ManualReset` flag is specified for `mode`, threads that wait on the event will not block. If the initial state is signaled and `mode` is `AutoReset`, the first thread that waits on the event will be released immediately, after which the event will reset, and subsequent threads will block.

On Windows, `options` can be provided to specify whether the named system event is accessible to the current user only or to all users. It also allows you to specify whether the named system event is accessible to processes in the current session only or to all sessions. For more information, see `NamedWaitHandleOptions`.

> **Caution:**
> On Unix-based operating systems, the `options` parameter has no effect as named system events are not supported.

## EventWaitHandle.OpenExisting(String) method

```csharp
public static System.Threading.EventWaitHandle OpenExisting (string name);
```

Opens the specified named synchronization event, if it already exists.

Parameters:

- `name`: The name of the synchronization object to be opened and shared with other processes. The name is case-sensitive. The backslash character (\\) is reserved and can only be used to specify a namespace. For more information on namespaces, see the remarks section. There might be further restrictions on the name depending on the operating system. For example, on Unix-based operating systems, the name after excluding the namespace must be a valid file name.

Returns: An object that represents the named system event.

Exceptions:

- `WaitHandleCannotBeOpenedException`: A synchronization object with the provided `name` cannot be opened. It might not exist, or a synchronization object of a different type might have the same name. In some cases, this exception might be thrown for invalid names.
- `ArgumentException`: `name` is an empty string.
- `ArgumentNullException`: `name` is `null`.
- `IOException`: `name` is invalid. This can be for various reasons, including some restrictions that might be placed by the operating system, such as an unknown prefix or invalid characters. Note that the name and common prefixes "Global\\" and "Local\\" are case-sensitive.

-or-

There was some other error. The `HResult` property might provide more information.
- `DirectoryNotFoundException`: Windows only: `name` specified an unknown namespace. See Object Names for more information.
- `PathTooLongException`: The `name` is too long. Length restrictions might depend on the operating system or configuration.
- `UnauthorizedAccessException`: The named event exists, but the user does not have the security access required to use it.

#### Remarks
The `name` can be prefixed with `Global\` or `Local\` to specify a namespace. When the `Global` namespace is specified, the synchronization object can be shared with any processes on the system. When the `Local` namespace is specified, which is also the default when no namespace is specified, the synchronization object can be shared with processes in the same session. On Windows, a session is a login session, and services typically run in a different non-interactive session. On Unix-like operating systems, each shell has its own session. Session-local synchronization objects might be appropriate for synchronizing between processes with a parent/child relationship where they all run in the same session. For more information about synchronization object names on Windows, see Object Names.

If a synchronization object of the requested type exists in the namespace, the existing synchronization object is opened. If a synchronization object does not exist in the namespace, or a synchronization object of a different type exists in the namespace, a `WaitHandleCannotBeOpenedException` is thrown.

The `EventWaitHandle.OpenExisting` method tries to open the specified named system event. To create the system event when it does not already exist, use one of the `EventWaitHandle.%23ctor` constructors that has a `name` parameter.

Multiple calls to this method that use the same value for `name` do not necessarily return the same `EventWaitHandle` object, even though the objects that are returned represent the same named system event.

Specifying the `Synchronize` flag allows a thread to wait on the named system event, and specifying the `Modify` flag allows a thread to call the `EventWaitHandle.Set` and `EventWaitHandle.Reset` methods.
