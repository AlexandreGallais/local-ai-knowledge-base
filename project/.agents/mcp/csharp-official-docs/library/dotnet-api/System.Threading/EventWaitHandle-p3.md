---
title: "EventWaitHandle class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/EventWaitHandle.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventWaitHandle class (part 3 of 3)

## EventWaitHandle.OpenExisting(String, NamedWaitHandleOptions) method

```csharp
public static System.Threading.EventWaitHandle OpenExisting (string name, System.Threading.NamedWaitHandleOptions options);
```

Opens the specified named synchronization event, if it already exists. If the options are set to the current user only, the object's access controls are verified for the calling user.

Parameters:

- `name`: The name of the synchronization object to be opened and shared with other processes. The name is case-sensitive.
- `options`: The scope options for the named handle. Defaults to access limited to current user and current session only. The specified options might affect the namespace for the name and access to the underlying handle object.

Returns: An object that represents the named system event.

Exceptions:

- `WaitHandleCannotBeOpenedException`: A synchronization object with the provided `name` cannot be opened. It might not exist, or a synchronization object of a different type might have the same name. In some cases, this exception might be thrown for invalid names.

-or-

An object with the specified `name` exists, but the specified `options` are not compatible with the existing object's options.
- `ArgumentException`: `name` is an empty string.
- `ArgumentNullException`: `name` is `null`.
- `IOException`: `name` is invalid. This can be for various reasons, including some restrictions that might be placed by the operating system, such as an unknown prefix or invalid characters. Note that the name and common prefixes "Global\\" and "Local\\" are case-sensitive.

-or-

There was some other error. The `HResult` property might provide more information.
- `DirectoryNotFoundException`: Windows only: `name` specified an unknown namespace. See Object Names for more information.
- `PathTooLongException`: The `name` is too long. Length restrictions might depend on the operating system or configuration.
- `UnauthorizedAccessException`: The named event exists, but the user does not have the security access required to use it.

If a synchronization object of the requested type exists in the namespace, the existing synchronization object is opened. However, if `options` specifies access limited to the current user and the synchronization object is not compatible with it, a `WaitHandleCannotBeOpenedException` is thrown. If a synchronization object does not exist in the namespace, or a synchronization object of a different type exists in the namespace, a `WaitHandleCannotBeOpenedException` is thrown as well.

The `EventWaitHandle.OpenExisting` method tries to open the specified named system event. To create the system event when it does not already exist, use one of the `EventWaitHandle.%23ctor` constructors that has a `name` parameter.

Multiple calls to this method that use the same value for `name` do not necessarily return the same `EventWaitHandle` object, even though the objects that are returned represent the same named system event.

## EventWaitHandle.Reset() method

```csharp
public bool Reset ();
```

Sets the state of the event to nonsignaled, causing threads to block.

Returns: `true` if the operation succeeds; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The `WaitHandle.Close` method was previously called on this `EventWaitHandle`.

To be added.

## EventWaitHandle.Set() method

```csharp
public bool Set ();
```

Sets the state of the event to signaled, allowing one or more waiting threads to proceed.

Returns: `true` if the operation succeeds; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The `WaitHandle.Close` method was previously called on this `EventWaitHandle`.

#### Remarks
For an `EventWaitHandle` with `AutoReset` (including `AutoResetEvent`), the `EventWaitHandle.Set` method releases a single thread. If there are no waiting threads, the wait handle remains signaled until a thread attempts to wait on it, or until its `EventWaitHandle.Reset` method is called.

> **Important:**
>  There is no guarantee that every call to the `EventWaitHandle.Set` method will release a thread from an `EventWaitHandle` whose reset mode is `AutoReset`. If two calls are too close together, so that the second call occurs before a thread has been released, only one thread is released. It is as if the second call did not happen. Also, if `EventWaitHandle.Set` is called when there are no threads waiting and the `EventWaitHandle` is already signaled, the call has no effect.

For an `EventWaitHandle` with `ManualReset` (including `ManualResetEvent`), calling the `EventWaitHandle.Set` method leaves the wait handle in a signaled state until its `EventWaitHandle.Reset` method is called.

#### Examples
The following code example uses the `SignalAndWait` method overload to allow the main thread to signal a blocked thread and then wait until the thread finishes a task.

The example starts five threads and allows them to block on an `EventWaitHandle` created with the `AutoReset` flag, then releases one thread each time the user presses the `Enter` key. The example then queues another five threads and releases them all using an `EventWaitHandle` created with the `ManualReset` flag.

_Code sample not included: ~/snippets/csharp/System.Threading/EventResetMode/Overview/source.cs._

## EventWaitHandle.TryOpenExisting(String, EventWaitHandle) method

```csharp
public static bool TryOpenExisting (string name, out System.Threading.EventWaitHandle? result);
```

Opens the specified named synchronization event, if it already exists, and returns a value that indicates whether the operation succeeded.

Parameters:

- `name`: The name of the synchronization object to be opened and shared with other processes. The name is case-sensitive. The backslash character (\\) is reserved and can only be used to specify a namespace. For more information on namespaces, see the remarks section. There might be further restrictions on the name depending on the operating system. For example, on Unix-based operating systems, the name after excluding the namespace must be a valid file name.
- `result`: When this method returns, contains a `EventWaitHandle` object that represents the named synchronization event if the call succeeded, or `null` if the call failed. This parameter is treated as uninitialized.

Returns: `true` if the named synchronization event was opened successfully; otherwise, `false`. In some cases, `false` might be returned for invalid names.

Exceptions:

- `ArgumentException`: `name` is an empty string.
- `ArgumentNullException`: `name` is `null`.
- `IOException`: `name` is invalid. This can be for various reasons, including some restrictions that might be placed by the operating system, such as an unknown prefix or invalid characters. Note that the name and common prefixes "Global\\" and "Local\\" are case-sensitive. For some invalid names, the method might return `false` instead.

-or-

There was some other error. The `HResult` property might provide more information.
- `PathTooLongException`: The `name` is too long. Length restrictions might depend on the operating system or configuration.
- `UnauthorizedAccessException`: The named event exists, but the user does not have the desired security access.

#### Remarks
The `name` can be prefixed with `Global\` or `Local\` to specify a namespace. When the `Global` namespace is specified, the synchronization object can be shared with any processes on the system. When the `Local` namespace is specified, which is also the default when no namespace is specified, the synchronization object can be shared with processes in the same session. On Windows, a session is a login session, and services typically run in a different non-interactive session. On Unix-like operating systems, each shell has its own session. Session-local synchronization objects might be appropriate for synchronizing between processes with a parent/child relationship where they all run in the same session. For more information about synchronization object names on Windows, see Object Names.

If a synchronization object of the requested type exists in the namespace, the existing synchronization object is opened. If a synchronization object does not exist in the namespace, or a synchronization object of a different type exists in the namespace, `false` is returned.

To create the system event when it does not already exist, use one of the `EventWaitHandle.%23ctor` constructors that has a `name` parameter.

If you are uncertain whether a named synchronization event exists, use this method overload instead of the `OpenExisting` method overload, which throws an exception if the synchronization event does not exist.

This method overload is equivalent to calling the `TryOpenExisting` method overload and specifying `Synchronize` and `Modify` rights, combined by using the bitwise OR operation. Specifying the `Synchronize` flag allows a thread to wait on the named system event, and specifying the `Modify` flag allows a thread to call the `EventWaitHandle.Set` and `EventWaitHandle.Reset` methods.

Multiple calls to this method that use the same value for `name` do not necessarily return the same `EventWaitHandle` object, even though the objects that are returned represent the same named system event.

## EventWaitHandle.TryOpenExisting(String, NamedWaitHandleOptions, EventWaitHandle) method

```csharp
public static bool TryOpenExisting (string name, System.Threading.NamedWaitHandleOptions options, out System.Threading.EventWaitHandle? result);
```

Opens the specified named synchronization event, if it already exists, and returns a value that indicates whether the operation succeeded. If the options are set to the current user only, the object's access controls are verified for the calling user.

Parameters:

- `name`: The name of the synchronization object to be opened and shared with other processes. The name is case-sensitive.
- `options`: The scope options for the named handle. Defaults to access limited to current user and current session only. The specified options might affect the namespace for the name and access to the underlying handle object.
- `result`: When this method returns, contains a `EventWaitHandle` object that represents the named synchronization event if the call succeeded, or `null` if the call failed. This parameter is treated as uninitialized.

Returns: `true` if the named synchronization event was opened successfully; otherwise, `false`. In some cases, `false` might be returned for invalid names.

Exceptions:

- `ArgumentException`: `name` is an empty string.
- `ArgumentNullException`: `name` is `null`.
- `IOException`: `name` is invalid. This can be for various reasons, including some restrictions that might be placed by the operating system, such as an unknown prefix or invalid characters. Note that the name and common prefixes "Global\\" and "Local\\" are case-sensitive. For some invalid names, the method might return `false` instead.

-or-

There was some other error. The `HResult` property might provide more information.
- `PathTooLongException`: The `name` is too long. Length restrictions might depend on the operating system or configuration.
- `UnauthorizedAccessException`: The named event exists, but the user does not have the desired security access.

If a synchronization object of the requested type exists in the namespace, the existing synchronization object is opened. However, if `options` specifies access limited to the current user and the synchronization object is not compatible with it,  `false` is returned. If a synchronization object does not exist in the namespace, or a synchronization object of a different type exists in the namespace, `false` is returned as well.

To create the system event when it does not already exist, use one of the `EventWaitHandle.%23ctor` constructors that has a `name` parameter.

If you are uncertain whether a named synchronization event exists, use this method overload instead of the `OpenExisting` method overload, which throws an exception if the synchronization event does not exist.

Multiple calls to this method that use the same value for `name` do not necessarily return the same `EventWaitHandle` object, even though the objects that are returned represent the same named system event.
