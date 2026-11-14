---
title: "Semaphore class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Semaphore.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Semaphore class (part 3 of 4)

## Semaphore.Semaphore(Int32, Int32, String, NamedWaitHandleOptions, Boolean) constructor

```csharp
public Semaphore (int initialCount, int maximumCount, string? name, System.Threading.NamedWaitHandleOptions options, out bool createdNew);
```

Initializes a new instance of the `Semaphore` class, specifying the initial number of entries and the maximum number of concurrent entries, optionally specifying the name of a system semaphore object and options to set user-scope and session-scope access, and specifying a variable that receives a value indicating whether a new system semaphore was created.

Parameters:

- `initialCount`: The initial number of requests for the semaphore that can be satisfied concurrently.
- `maximumCount`: The maximum number of requests for the semaphore that can be satisfied concurrently.
- `name`: The name, if the synchronization object is to be shared with other processes; otherwise, `null` or an empty string. The name is case-sensitive.
- `options`: The scope options for the named semaphore. Defaults to access limited to current user and current session only. The specified options might affect the namespace for the name and access to the underlying semaphore object.
- `createdNew`: When this method returns, contains `true` if a local semaphore was created (that is, if `name` is `null` or an empty string) or if the specified named system semaphore was created; contains `false` if the specified named system semaphore already existed. This parameter is passed uninitialized.

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

If a `name` is provided and a synchronization object of the requested type already exists in the namespace, the existing synchronization object is used unless `options` specifies access limited to the current user and the synchronization object is not compatible with it, in which case a `WaitHandleCannotBeOpenedException` is thrown. If a synchronization object of a different type already exists in the namespace, a `WaitHandleCannotBeOpenedException` is thrown as well. Otherwise, a new synchronization object is created.

This constructor initializes a `Semaphore` object that represents a named system semaphore. You can create multiple `Semaphore` objects that represent the same named system semaphore.

If the named system semaphore does not exist, it is created with the initial count and maximum count specified by `initialCount` and `maximumCount`. If the named system semaphore already exists, `initialCount` and `maximumCount` are not used, although invalid values still cause exceptions. Use the `createdNew` parameter to determine whether the system semaphore was created by this constructor.

If `initialCount` is less than `maximumCount`, and `createdNew` is `true`, the effect is the same as if the current thread had called `WaitHandle.WaitOne` (`maximumCount` minus `initialCount`) times.

If you specify `null` or an empty string for `name`, a local semaphore is created, as if you had called the `%23ctor` constructor overload. In this case, `createdNew` is always `true`.

Because named semaphores are visible throughout the operating system, they can be used to coordinate resource use across process boundaries.

On Windows, `options` can be provided to specify whether the named semaphore is accessible to the current user only or to all users. It also allows you to specify whether the named semaphore is accessible to processes in the current session only or to all sessions. For more information, see `NamedWaitHandleOptions`.

> **Caution:**
> On Unix-based operating systems, the `options` parameter has no effect as named semaphores are not supported.

## Semaphore.OpenExisting(String) method

```csharp
public static System.Threading.Semaphore OpenExisting (string name);
```

Opens the specified named semaphore, if it already exists.

Parameters:

- `name`: The name of the synchronization object to be shared with other processes. The name is case-sensitive. The backslash character (\\) is reserved and may only be used to specify a namespace. For more information on namespaces, see the remarks section. There may be further restrictions on the name depending on the operating system. For example, on Unix-based operating systems, the name after excluding the namespace must be a valid file name.

Returns: An object that represents the named system semaphore.

Exceptions:

- `ArgumentException`: `name` is an empty string.
- `ArgumentNullException`: `name` is `null`.
- `WaitHandleCannotBeOpenedException`: A synchronization object with the provided `name` cannot be created. A synchronization object of a different type might have the same name. In some cases, this exception may be thrown for invalid names.
- `IOException`: `name` is invalid. This can be for various reasons, including some restrictions that might be placed by the operating system, such as an unknown prefix or invalid characters. Note that the name and common prefixes "Global\\" and "Local\\" are case-sensitive.

-or-

There was some other error. The `HResult` property might provide more information.
- `PathTooLongException`: The `name` is too long. Length restrictions may depend on the operating system or configuration.
- `UnauthorizedAccessException`: The named semaphore exists, but the user does not have the security access required to use it.

#### Remarks
The `name` may be prefixed with `Global\` or `Local\` to specify a namespace. When the `Global` namespace is specified, the synchronization object may be shared with any processes on the system. When the `Local` namespace is specified, which is also the default when no namespace is specified, the synchronization object may be shared with processes in the same session. On Windows, a session is a login session, and services typically run in a different non-interactive session. On Unix-like operating systems, each shell has its own session. Session-local synchronization objects may be appropriate for synchronizing between processes with a parent/child relationship where they all run in the same session. For more information about synchronization object names on Windows, see Object Names.

If a synchronization object of the requested type exists in the namespace, the existing synchronization object is opened. If a synchronization object does not exist in the namespace, or a synchronization object of a different type exists in the namespace, a `WaitHandleCannotBeOpenedException` is thrown.

The `Semaphore.OpenExisting` method tries to open the specified named semaphore. To create the system semaphore when it does not already exist, use one of the `Semaphore.%23ctor` constructors that has a `name` parameter.

Multiple calls to this method that use the same value for `name` do not necessarily return the same `Semaphore` object, even though the objects that are returned represent the same named system semaphore.

This method overload is equivalent to calling the `Semaphore.OpenExisting` method overload and specifying `Synchronize` and `Modify` rights, combined by using the bitwise OR operation.

Specifying the `Synchronize` flag allows a thread to enter the semaphore, and specifying the `Modify` flag allows a thread to call the `Semaphore.Release` method.

#### Examples
The following code example demonstrates the cross-process behavior of a named semaphore with access control security. The example uses the `OpenExisting` method overload to test for the existence of a named semaphore.

If the semaphore does not exist, it is created with a maximum count of two and with access control security that denies the current user the right to use the semaphore, but which grants the right to read and change permissions on the semaphore.

If you run the compiled example from two command windows, the second copy will throw an access violation exception on the call to the `OpenExisting` method overload. The exception is caught, and the example uses the `OpenExisting` method overload to open the semaphore with the rights needed to read and change the permissions.

After the permissions are changed, the semaphore is opened with the rights required to enter and release it. If you run the compiled example from a third command window, it runs using the new permissions.

_Code sample not included: ~/snippets/csharp/System.Threading/Semaphore/.ctor/source2.cs._

## Semaphore.OpenExisting(String, NamedWaitHandleOptions) method

```csharp
public static System.Threading.Semaphore OpenExisting (string name, System.Threading.NamedWaitHandleOptions options);
```

Opens the specified named semaphore, if it already exists. If the options are set to the current user only, the object's access controls are verified for the calling user.

Parameters:

- `name`: The name of the synchronization object to be shared with other processes. The name is case-sensitive. The backslash character (\\) is reserved and may only be used to specify a namespace. For more information on namespaces, see the remarks section.
- `options`: The scope options for the named semaphore. Defaults to access limited to current user and current session only. The specified options might affect the namespace for the name and access to the underlying semaphore object.

Returns: An object that represents the named system semaphore.

Exceptions:

- `ArgumentException`: `name` is an empty string.
- `ArgumentNullException`: `name` is `null`.
- `WaitHandleCannotBeOpenedException`: A synchronization object with the provided `name` cannot be created. A synchronization object of a different type might have the same name.

-or-

An object with the specified `name` exists, but the specified `options` are not compatible with the existing object's options.
- `IOException`: `name` is invalid. This can be for various reasons, including some restrictions that might be placed by the operating system, such as an unknown prefix or invalid characters. Note that the name and common prefixes "Global\\" and "Local\\" are case-sensitive.

-or-

There was some other error. The `HResult` property might provide more information.
- `PathTooLongException`: The `name` is too long. Length restrictions may depend on the operating system or configuration.
- `UnauthorizedAccessException`: The named semaphore exists, but the user does not have the security access required to use it.

If a synchronization object of the requested type exists in the namespace, the existing synchronization object is opened. However, if `options` specifies access limited to the current user and the synchronization object is not compatible with it,  a `WaitHandleCannotBeOpenedException` is thrown. If a synchronization object does not exist in the namespace, or a synchronization object of a different type exists in the namespace, a `WaitHandleCannotBeOpenedException` is thrown as well.

The `Semaphore.OpenExisting` method tries to open the specified named semaphore. To create the system semaphore when it does not already exist, use one of the `Semaphore.%23ctor` constructors that has a `name` parameter.

Multiple calls to this method that use the same value for `name` do not necessarily return the same `Semaphore` object, even though the objects that are returned represent the same named system semaphore.

## Semaphore.Release() method

```csharp
public int Release ();
```

Exits the semaphore and returns the previous count.

Returns: The count on the semaphore before the `Release` method was called.

Exceptions:

- `SemaphoreFullException`: The semaphore count is already at the maximum value.
- `IOException`: A Win32 error occurred with a named semaphore.
- `UnauthorizedAccessException`: The current semaphore represents a named system semaphore, but the user does not have `SemaphoreRights.Modify`.

-or-

The current semaphore represents a named system semaphore, but it was not opened with `SemaphoreRights.Modify`.

#### Remarks
Threads typically use the `WaitHandle.WaitOne` method to enter the semaphore, and they typically use this method overload to exit.

If a `SemaphoreFullException` is thrown by the `Semaphore.Release` method, it does not necessarily indicate a problem with the calling thread. A programming error in another thread might have caused that thread to exit the semaphore more times than it entered.

If the current `Semaphore` object represents a named system semaphore, the user must have `Modify` rights and the semaphore must have been opened with `Modify` rights.

#### Examples
The following code example creates a semaphore with a maximum count of three and an initial count of zero. The example starts five threads, which block waiting for the semaphore. The main thread uses the `Release` method overload to increase the semaphore count to its maximum, allowing three threads to enter the semaphore. Each thread uses the `Thread.Sleep` method to wait for one second, to simulate work, and then calls the `Release` method overload to release the semaphore.

Each time the semaphore is released, the previous semaphore count is displayed. Console messages track semaphore use. The simulated work interval is increased slightly for each thread, to make the output easier to read.

_Code sample not included: ~/snippets/csharp/System.Threading/Semaphore/Overview/source.cs._
