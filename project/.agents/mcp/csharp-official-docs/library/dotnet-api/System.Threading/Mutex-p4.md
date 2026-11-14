---
title: "Mutex class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Mutex.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Mutex class (part 4 of 4)

## Mutex.OpenExisting(String, NamedWaitHandleOptions) method

```csharp
public static System.Threading.Mutex OpenExisting (string name, System.Threading.NamedWaitHandleOptions options);
```

Opens the specified named mutex, if it already exists. If the options are set to the current user only, the object's access controls are verified for the calling user.

Parameters:

- `name`: The name of the synchronization object to be shared with other processes. The name is case-sensitive.
- `options`: The scope options for the named system mutex. Defaults to access limited to current user and current session only. The specified options might affect the namespace for the name and access to the underlying system mutex object.

Returns: An object that represents the named system mutex.

Exceptions:

- `ArgumentException`: `name` is an empty string.
- `ArgumentNullException`: `name` is `null`.
- `WaitHandleCannotBeOpenedException`: A synchronization object with the provided `name` cannot be created. A synchronization object of a different type might have the same name. In some cases, this exception may be thrown for invalid names.

-or-

An object with the specified `name` exists, but the specified `options` are not compatible with the existing object's options.
- `IOException`: `name` is invalid. This can be for various reasons, including some restrictions that might be placed by the operating system, such as an unknown prefix or invalid characters. Note that the name and common prefixes "Global\\" and "Local\\" are case-sensitive.

-or-

There was some other error. The `HResult` property might provide more information.
- `DirectoryNotFoundException`: Windows only: `name` specified an unknown namespace. See Object Names for more information.
- `PathTooLongException`: The `name` is too long. Length restrictions might depend on the operating system or configuration.
- `UnauthorizedAccessException`: The named mutex exists, but the user does not have the security access required to use it.

If a synchronization object of the requested type exists in the namespace, the existing synchronization object is opened. However, if `options` specifies access limited to the current user and the synchronization object is not compatible with it, a `WaitHandleCannotBeOpenedException` is thrown. If a synchronization object does not exist in the namespace, or a synchronization object of a different type exists in the namespace, a `WaitHandleCannotBeOpenedException` is thrown as well.

The `Mutex.OpenExisting` method tries to open the specified named system mutex. To create the system mutex when it does not already exist, use one of the `Mutex.%23ctor` constructors that has a `name` parameter.

Multiple calls to this method that use the same value for `name` do not necessarily return the same `Mutex` object, even though the objects that are returned represent the same named system mutex.

This method does not request ownership of the mutex.

## Mutex.ReleaseMutex() method

```csharp
public void ReleaseMutex ();
```

Releases the `Mutex` once.

Exceptions:

- `ApplicationException`: The calling thread does not own the mutex.
- `ObjectDisposedException`: The current instance has already been disposed.

#### Remarks
Whenever a thread acquires a mutex (for example, by calling its `WaitHandle.WaitOne` method), it must subsequently call `Mutex.ReleaseMutex` to relinquish ownership of the mutex and unblock other threads that are trying to gain ownership of the mutex. If the attempt to get ownership of the mutex fails (for example, when a call to the `WaitHandle.WaitOne` method with a `millisecondsTimeout` or a `timeout` parameter returns `false` because the request times out), the thread shouldn't call `Mutex.ReleaseMutex`, In this case, the thread should also not be allowed to access the resource protected by the mutex, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Threading/Mutex/Overview/example2.cs._

A thread that owns a mutex can specify the same mutex in repeated wait function calls without blocking its execution. The number of calls is kept by the common language runtime. The thread must call `Mutex.ReleaseMutex` the same number of times to release ownership of the mutex.

If a thread terminates while owning a mutex, the mutex is said to be abandoned. The state of the mutex is set to signaled and the next waiting thread gets ownership. If no one owns the mutex, the state of the mutex is signaled. An `AbandonedMutexException` is thrown in the next thread that acquires the mutex.

> **Caution:**
> An abandoned mutex often indicates a serious error in the code. When a thread exits without releasing the mutex, the data structures protected by the mutex might not be in a consistent state. The next thread to request ownership of the mutex can handle this exception and proceed, if the integrity of the data structures can be verified.

In the case of a system-wide mutex, an abandoned mutex might indicate that an application has been terminated abruptly (for example, by using Windows Task Manager).

#### Examples
The following example shows how a local `Mutex` object is used to synchronize access to a protected resource. The thread that creates the mutex does not own it initially. The `Mutex.ReleaseMutex` method is used to release the mutex when it is no longer needed.

_Code sample not included: ~/snippets/csharp/System.Threading/Mutex/.ctor/class13.cs._

## Mutex.TryOpenExisting(String, Mutex) method

```csharp
public static bool TryOpenExisting (string name, out System.Threading.Mutex? result);
```

Opens the specified named mutex, if it already exists, and returns a value that indicates whether the operation succeeded.

Parameters:

- `name`: The name of the synchronization object to be shared with other processes. The name is case-sensitive. The backslash character (\\) is reserved and may only be used to specify a namespace. For more information on namespaces, see the remarks section. There may be further restrictions on the name depending on the operating system. For example, on Unix-based operating systems, the name after excluding the namespace must be a valid file name.
- `result`: When this method returns, contains a `Mutex` object that represents the named mutex if the call succeeded, or `null` if the call failed. This parameter is treated as uninitialized.

Returns: `true` if the named mutex was opened successfully; otherwise, `false`. In some cases, `false` might be returned for invalid names.

Exceptions:

- `ArgumentException`: `name` is an empty string.
- `ArgumentNullException`: `name` is `null`.
- `IOException`: `name` is invalid. This can be for various reasons, including some restrictions that might be placed by the operating system, such as an unknown prefix or invalid characters. Note that the name and common prefixes "Global\\" and "Local\\" are case-sensitive. For some invalid names, the method may return `false` instead.

-or-

There was some other error. The `HResult` property might provide more information.
- `PathTooLongException`: The `name` is too long. Length restrictions might depend on the operating system or configuration.
- `UnauthorizedAccessException`: The named mutex exists, but the user does not have the security access required to use it.

#### Remarks
The `name` may be prefixed with `Global\` or `Local\` to specify a namespace. When the `Global` namespace is specified, the synchronization object may be shared with any processes on the system. When the `Local` namespace is specified, which is also the default when no namespace is specified, the synchronization object may be shared with processes in the same session. On Windows, a session is a login session, and services typically run in a different non-interactive session. On Unix-like operating systems, each shell has its own session. Session-local synchronization objects may be appropriate for synchronizing between processes with a parent/child relationship where they all run in the same session. For more information about synchronization object names on Windows, see Object Names.

If a synchronization object of the requested type exists in the namespace, the existing synchronization object is opened. If a synchronization object does not exist in the namespace, or a synchronization object of a different type exists in the namespace, `false` is returned.

To create the system mutex when it does not already exist, use one of the `Mutex.%23ctor` constructors that has a `name` parameter.

If you are uncertain whether a named mutex exists, use this method overload instead of the `OpenExisting` method overload, which throws an exception if the mutex does not exist.

Multiple calls to this method that use the same value for `name` do not necessarily return the same `Mutex` object, even though the objects that are returned represent the same named system mutex.

This method overload is equivalent to calling the `TryOpenExisting` method overload and specifying `Synchronize` and `Modify` rights, combined by using the bitwise OR operation. Specifying the `Synchronize` flag allows a thread to wait on the mutex, and specifying the `Modify` flag allows a thread to call the `Mutex.ReleaseMutex` method.

This method does not request ownership of the mutex.

## Mutex.TryOpenExisting(String, NamedWaitHandleOptions, Mutex) method

```csharp
public static bool TryOpenExisting (string name, System.Threading.NamedWaitHandleOptions options, out System.Threading.Mutex? result);
```

Opens the specified named mutex, if it already exists, and returns a value that indicates whether the operation succeeded. If the options are set to the current user only, the object's access controls are verified for the calling user.

Parameters:

- `name`: The name of the synchronization object to be shared with other processes. The name is case-sensitive.
- `options`: The scope options for the named system mutex. Defaults to access limited to current user and current session only. The specified options might affect the namespace for the name and access to the underlying system mutex object.
- `result`: When this method returns, contains a `Mutex` object that represents the named mutex if the call succeeded, or `null` if the call failed. This parameter is treated as uninitialized.

Returns: `true` if the named mutex was opened successfully; otherwise, `false`. In some cases, `false` might be returned for invalid names.

Exceptions:

- `ArgumentException`: `name` is an empty string.
- `ArgumentNullException`: `name` is `null`.
- `IOException`: `name` is invalid. This can be for various reasons, including some restrictions that might be placed by the operating system, such as an unknown prefix or invalid characters. Note that the name and common prefixes "Global\\" and "Local\\" are case-sensitive. For some invalid names, the method may return `false` instead.

-or-

There was some other error. The `HResult` property might provide more information.
- `PathTooLongException`: The `name` is too long. Length restrictions might depend on the operating system or configuration.
- `UnauthorizedAccessException`: The named mutex exists, but the user does not have the security access required to use it.

If a synchronization object of the requested type exists in the namespace, the existing synchronization object is opened. However, if `options` specifies access limited to the current user and the synchronization object is not compatible with it, `false` is returned. If a synchronization object does not exist in the namespace, or a synchronization object of a different type exists in the namespace, `false` is returned as well.

To create the system mutex when it does not already exist, use one of the `Mutex.%23ctor` constructors that has a `name` parameter.

If you are uncertain whether a named mutex exists, use this method overload instead of the `OpenExisting` method overload, which throws an exception if the mutex does not exist.

Multiple calls to this method that use the same value for `name` do not necessarily return the same `Mutex` object, even though the objects that are returned represent the same named system mutex.

This method does not request ownership of the mutex.
