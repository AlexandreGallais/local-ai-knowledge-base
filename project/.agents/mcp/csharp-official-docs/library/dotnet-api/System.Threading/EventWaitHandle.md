---
title: "EventWaitHandle class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/EventWaitHandle.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventWaitHandle class

Namespace: `System.Threading`

```csharp
public class EventWaitHandle : System.Threading.WaitHandle
```

Represents a thread synchronization event.

#### Remarks

The `EventWaitHandle` class allows threads to communicate with each other by signaling. Typically, one or more threads block on an `EventWaitHandle` until an unblocked thread calls the `EventWaitHandle.Set` method, releasing one or more of the blocked threads. A thread can signal an `EventWaitHandle` and then block on it, by calling the `static` (`Shared` in Visual Basic) `WaitHandle.SignalAndWait` method.

> **Note:**
> The `EventWaitHandle` class provides access to named system synchronization events.

The behavior of an `EventWaitHandle` that has been signaled depends on its reset mode. An `EventWaitHandle` created with the `AutoReset` flag resets automatically when signaled, after releasing a single waiting thread. An `EventWaitHandle` created with the `ManualReset` flag remains signaled until its `EventWaitHandle.Reset` method is called.

Automatic reset events provide exclusive access to a resource. If an automatic reset event is signaled when no threads are waiting, it remains signaled until a thread attempts to wait on it. The event releases the thread and immediately resets, blocking subsequent threads.

Manual reset events are like gates. When the event is not signaled, threads that wait on it will block. When the event is signaled, all waiting threads are released, and the event remains signaled (that is, subsequent waits do not block) until its `EventWaitHandle.Reset` method is called. Manual reset events are useful when one thread must complete an activity before other threads can proceed.

`EventWaitHandle` objects can be used with the `static`(`Shared` in Visual Basic) `WaitHandle.WaitAll` and `WaitHandle.WaitAny` methods.

For more information, see the Thread interaction, or signaling section of the Overview of synchronization primitives article.

> **Caution:**
> By default, a named event is not restricted to the user that created it. Other users might be able to open and use the event, including interfering with the event by setting or resetting it inappropriately. To restrict access to specific users, you can use a constructor overload or `EventWaitHandleAcl` and pass in an `EventWaitHandleSecurity` when creating the named event. Avoid using named events without access restrictions on systems that might have untrusted users running code.

#### Examples
The following code example uses the `SignalAndWait` method overload to allow the main thread to signal a blocked thread and then wait until the thread finishes a task.

The example starts five threads and allows them to block on an `EventWaitHandle` created with the `AutoReset` flag, then releases one thread each time the user presses the `Enter` key. The example then queues another five threads and releases them all using an `EventWaitHandle` created with the `ManualReset` flag.

_Code sample not included: ~/snippets/csharp/System.Threading/EventResetMode/Overview/source.cs._

## EventWaitHandle.EventWaitHandle(Boolean, EventResetMode) constructor

```csharp
public EventWaitHandle (bool initialState, System.Threading.EventResetMode mode);
```

Initializes a new instance of the `EventWaitHandle` class, specifying whether the wait handle is initially signaled, and whether it resets automatically or manually.

Parameters:

- `initialState`: `true` to set the initial state to signaled; `false` to set it to nonsignaled.
- `mode`: One of the `EventResetMode` values that determines whether the event resets automatically or manually.

Exceptions:

- `ArgumentException`: The `mode` enum value was out of legal range.

#### Remarks
If the initial state of the event is nonsignaled, threads that wait on the event will block. If the initial state is signaled, and the `ManualReset` flag is specified for `mode`, threads that wait on the event will not block. If the initial state is signaled and `mode` is `AutoReset`, the first thread that waits on the event will be released immediately, after which the event will reset, and subsequent threads will block.

#### Examples
The following code example uses the `SignalAndWait` method overload to allow the main thread to signal a blocked thread and then wait until the thread finishes a task.

The example starts five threads and allows them to block on an `EventWaitHandle` created with the `AutoReset` flag, then releases one thread each time the user presses the `Enter` key. The example then queues another five threads and releases them all using an `EventWaitHandle` created with the `ManualReset` flag.

_Code sample not included: ~/snippets/csharp/System.Threading/EventResetMode/Overview/source.cs._

## EventWaitHandle.EventWaitHandle(Boolean, EventResetMode, String) constructor

```csharp
public EventWaitHandle (bool initialState, System.Threading.EventResetMode mode, string? name);
```

Initializes a new instance of the `EventWaitHandle` class, specifying whether the wait handle is initially signaled if created as a result of this call, whether it resets automatically or manually, and the name of a system synchronization event.

Parameters:

- `initialState`: `true` to set the initial state to signaled if the named event is created as a result of this call; `false` to set it to nonsignaled.
- `mode`: One of the `EventResetMode` values that determines whether the event resets automatically or manually.
- `name`: The name, if the synchronization object is to be shared with other processes; otherwise, `null` or an empty string. The name is case-sensitive. The backslash character (\\) is reserved and can only be used to specify a namespace. For more information on namespaces, see the remarks section. There might be further restrictions on the name depending on the operating system. For example, on Unix-based operating systems, the name after excluding the namespace must be a valid file name.

Exceptions:

- `IOException`: `name` is invalid. This can be for various reasons, including some restrictions that might be placed by the operating system, such as an unknown prefix or invalid characters. Note that the name and common prefixes "Global\\" and "Local\\" are case-sensitive.

-or-

There was some other error. The `HResult` property might provide more information.
- `DirectoryNotFoundException`: Windows only: `name` specified an unknown namespace. See Object Names for more information.
- `PathTooLongException`: The `name` is too long. Length restrictions might depend on the operating system or configuration.
- `UnauthorizedAccessException`: The named event exists and has access control security, but the user does not have `EventWaitHandleRights.FullControl`.
- `WaitHandleCannotBeOpenedException`: A synchronization object with the provided `name` cannot be created. A synchronization object of a different type might have the same name.
- `ArgumentException`: The `mode` enum value was out of legal range.

#### Remarks
The `name` can be prefixed with `Global\` or `Local\` to specify a namespace. When the `Global` namespace is specified, the synchronization object can be shared with any processes on the system. When the `Local` namespace is specified, which is also the default when no namespace is specified, the synchronization object can be shared with processes in the same session. On Windows, a session is a login session, and services typically run in a different non-interactive session. On Unix-like operating systems, each shell has its own session. Session-local synchronization objects might be appropriate for synchronizing between processes with a parent/child relationship where they all run in the same session. For more information about synchronization object names on Windows, see Object Names.

If a `name` is provided and a synchronization object of the requested type already exists in the namespace, the existing synchronization object is opened. If a synchronization object of a different type already exists in the namespace, a `WaitHandleCannotBeOpenedException` is thrown. Otherwise, a new synchronization object is created.

If a system event with the name specified for the `name` parameter already exists, the `initialState` parameter is ignored.

> **Caution:**
> By default, a named event is not restricted to the user that created it. Other users might be able to open and use the event, including interfering with the event by setting or resetting it inappropriately. To restrict access to specific users, you can use a constructor overload or `EventWaitHandleAcl` and pass in an `EventWaitHandleSecurity` when creating the named event. Avoid using named events without access restrictions on systems that might have untrusted users running code.

> **Important:**
>  When using this constructor for named system events, specify `false` for `initialState`. This constructor provides no way to determine whether a named system event was created, so you cannot make any assumptions about the state of the named event. To determine whether a named event was created, use the `%23ctor` constructor or the `%23ctor` constructor.

If the initial state of the event is nonsignaled, threads that wait on the event will block. If the initial state is signaled, and the `ManualReset` flag is specified for `mode`, threads that wait on the event will not block. If the initial state is signaled and `mode` is `AutoReset`, the first thread that waits on the event will be released immediately, after which the event will reset, and subsequent threads will block.

## EventWaitHandle.EventWaitHandle(Boolean, EventResetMode, String, Boolean) constructor

```csharp
public EventWaitHandle (bool initialState, System.Threading.EventResetMode mode, string? name, out bool createdNew);
```

Initializes a new instance of the `EventWaitHandle` class, specifying whether the wait handle is initially signaled if created as a result of this call, whether it resets automatically or manually, the name of a system synchronization event, and a Boolean variable whose value after the call indicates whether the named system event was created.

Parameters:

- `initialState`: `true` to set the initial state to signaled if the named event is created as a result of this call; `false` to set it to nonsignaled.
- `mode`: One of the `EventResetMode` values that determines whether the event resets automatically or manually.
- `name`: The name, if the synchronization object is to be shared with other processes; otherwise, `null` or an empty string. The name is case-sensitive. The backslash character (\\) is reserved and can only be used to specify a namespace. For more information on namespaces, see the remarks section. There might be further restrictions on the name depending on the operating system. For example, on Unix-based operating systems, the name after excluding the namespace must be a valid file name.
- `createdNew`: When this method returns, contains `true` if a local event was created (that is, if `name` is `null` or an empty string) or if the specified named system event was created; `false` if the specified named system event already existed. This parameter is passed uninitialized.

Exceptions:

- `IOException`: `name` is invalid. This can be for various reasons, including some restrictions that might be placed by the operating system, such as an unknown prefix or invalid characters. Note that the name and common prefixes "Global\\" and "Local\\" are case-sensitive.

-or-

There was some other error. The `HResult` property might provide more information.
- `DirectoryNotFoundException`: Windows only: `name` specified an unknown namespace. See Object Names for more information.
- `PathTooLongException`: The `name` is too long. Length restrictions might depend on the operating system or configuration.
- `UnauthorizedAccessException`: The named event exists and has access control security, but the user does not have `EventWaitHandleRights.FullControl`.
- `WaitHandleCannotBeOpenedException`: A synchronization object with the provided `name` cannot be created. A synchronization object of a different type might have the same name.
- `ArgumentException`: The `mode` enum value was out of legal range.

#### Remarks
The `name` can be prefixed with `Global\` or `Local\` to specify a namespace. When the `Global` namespace is specified, the synchronization object can be shared with any processes on the system. When the `Local` namespace is specified, which is also the default when no namespace is specified, the synchronization object can be shared with processes in the same session. On Windows, a session is a login session, and services typically run in a different non-interactive session. On Unix-like operating systems, each shell has its own session. Session-local synchronization objects might be appropriate for synchronizing between processes with a parent/child relationship where they all run in the same session. For more information about synchronization object names on Windows, see Object Names.

If a `name` is provided and a synchronization object of the requested type already exists in the namespace, the existing synchronization object is opened. If a synchronization object of a different type already exists in the namespace, a `WaitHandleCannotBeOpenedException` is thrown. Otherwise, a new synchronization object is created.

If a system event with the name specified for the `name` parameter already exists, the `initialState` parameter is ignored. After calling this constructor, use the value in the variable specified for the `ref` parameter (`ByRef` parameter in Visual Basic)`createdNew` to determine whether the named system event already existed or was created.

If the initial state of the event is nonsignaled, threads that wait on the event will block. If the initial state is signaled, and the `ManualReset` flag is specified for `mode`, threads that wait on the event will not block. If the initial state is signaled and `mode` is `AutoReset`, the first thread that waits on the event will be released immediately, after which the event will reset, and subsequent threads will block.

> **Caution:**
> By default, a named event is not restricted to the user that created it. Other users might be able to open and use the event, including interfering with the event by setting or resetting it inappropriately. To restrict access to specific users, you can use a constructor overload or `EventWaitHandleAcl` and pass in an `EventWaitHandleSecurity` when creating the named event. Avoid using named events without access restrictions on systems that might have untrusted users running code.
