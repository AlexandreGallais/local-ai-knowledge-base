---
title: "Mutex class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Mutex.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Mutex class (part 3 of 4)

## Mutex.Mutex(Boolean, String, NamedWaitHandleOptions) constructor

```csharp
public Mutex (bool initiallyOwned, string? name, System.Threading.NamedWaitHandleOptions options);
```

Initializes a new instance of the `Mutex` class with a Boolean value that indicates whether the calling thread should have initial ownership of the mutex, a string that is the name of the mutex, and options to set user-scope and session-scope access.

Parameters:

- `initiallyOwned`: `true` to give the calling thread initial ownership of the named system mutex if the named system mutex is created as a result of this call; otherwise, `false`.
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

If `name` is not `null` and `initiallyOwned` is `true`, the calling thread owns the mutex only if the named system mutex was created as a result of this call. Since there is no mechanism for determining whether the named system mutex was created, it is better to specify `false` for `initiallyOwned` when calling this constructor overload. You can use the `%23ctor` constructor if you need to determine initial ownership.

This constructor initializes a `Mutex` object that represents a named system mutex. You can create multiple `Mutex` objects that represent the same named system mutex.

If the named mutex has already been created with access control security and the caller does not have `FullControl`, an exception is thrown. To open an existing named mutex with only those permissions needed for synchronizing thread activities, see the `Mutex.OpenExisting` method.

If you specify `null` or an empty string for `name`, a local mutex is created, as if you had called the `%23ctor` constructor.

Because they are system-wide, named mutexes can be used to coordinate resource use across process boundaries.

The `options` parameter can be provided to specify whether the named mutex is accessible to the current user only or to all users. It also allows you to specify whether the named mutex is accessible to processes in the current session only or to all sessions. For more information, see `NamedWaitHandleOptions`.

## Mutex.Mutex(Boolean, String, NamedWaitHandleOptions, Boolean) constructor

```csharp
public Mutex (bool initiallyOwned, string? name, System.Threading.NamedWaitHandleOptions options, out bool createdNew);
```

Initializes a new instance of the `Mutex` class with a Boolean value that indicates whether the calling thread should have initial ownership of the mutex, a string that is the name of the mutex, options to set user-scope and session-scope access, and a Boolean value that, when the method returns, indicates whether the calling thread was granted initial ownership of the mutex.

Parameters:

- `initiallyOwned`: `true` to give the calling thread initial ownership of the named system mutex if the named system mutex is created as a result of this call; otherwise, `false`.
- `name`: The name, if the synchronization object is to be shared with other processes; otherwise, `null` or an empty string. The name is case-sensitive.
- `options`: The scope options for the named system mutex. Defaults to access limited to current user and current session only. The specified options might affect the namespace for the name and access to the underlying system mutex object.
- `createdNew`: When this method returns, contains a Boolean that is `true` if a local mutex was created (that is, if `name` is `null` or an empty string) or if the specified named system mutex was created; contains `false` if the specified named system mutex already existed. This parameter is passed uninitialized.

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

If `name` is not `null` and `initiallyOwned` is `true`, the calling thread owns the named mutex only if `createdNew` is `true` after the call. Otherwise the thread can request the mutex by calling the `WaitHandle.WaitOne` method.

This constructor initializes a `Mutex` object that represents a named system mutex. You can create multiple `Mutex` objects that represent the same named system mutex.

If the named mutex has already been created with access control security and the caller does not have `FullControl` rights, an exception is thrown. To open an existing named mutex with only those permissions needed for synchronizing thread activities, see the `Mutex.OpenExisting` method.

If you specify `null` or an empty string for `name`, a local mutex is created, as if you had called the `%23ctor` constructor. In this case, `createdNew` is always `true`.

Because they are system-wide, named mutexes can be used to coordinate resource use across process boundaries.

The `options` parameter can be provided to specify whether the named mutex is accessible to the current user only or to all users. It also allows you to specify whether the named mutex is accessible to processes in the current session only or to all sessions. For more information, see `NamedWaitHandleOptions`.

## Mutex.OpenExisting(String) method

```csharp
public static System.Threading.Mutex OpenExisting (string name);
```

Opens the specified named mutex, if it already exists.

Parameters:

- `name`: The name of the synchronization object to be shared with other processes. The name is case-sensitive. The backslash character (\\) is reserved and may only be used to specify a namespace. For more information on namespaces, see the remarks section. There may be further restrictions on the name depending on the operating system. For example, on Unix-based operating systems, the name after excluding the namespace must be a valid file name.

Returns: An object that represents the named system mutex.

Exceptions:

- `ArgumentException`: `name` is an empty string.
- `ArgumentNullException`: `name` is `null`.
- `WaitHandleCannotBeOpenedException`: A synchronization object with the provided `name` cannot be created. A synchronization object of a different type might have the same name. In some cases, this exception may be thrown for invalid names.
- `IOException`: `name` is invalid. This can be for various reasons, including some restrictions that might be placed by the operating system, such as an unknown prefix or invalid characters. Note that the name and common prefixes "Global\\" and "Local\\" are case-sensitive.

-or-

There was some other error. The `HResult` property might provide more information.
- `DirectoryNotFoundException`: Windows only: `name` specified an unknown namespace. See Object Names for more information.
- `PathTooLongException`: The `name` is too long. Length restrictions might depend on the operating system or configuration.
- `UnauthorizedAccessException`: The named mutex exists, but the user does not have the security access required to use it.

#### Remarks
The `name` may be prefixed with `Global\` or `Local\` to specify a namespace. When the `Global` namespace is specified, the synchronization object may be shared with any processes on the system. When the `Local` namespace is specified, which is also the default when no namespace is specified, the synchronization object may be shared with processes in the same session. On Windows, a session is a login session, and services typically run in a different non-interactive session. On Unix-like operating systems, each shell has its own session. Session-local synchronization objects may be appropriate for synchronizing between processes with a parent/child relationship where they all run in the same session. For more information about synchronization object names on Windows, see Object Names.

If a synchronization object of the requested type exists in the namespace, the existing synchronization object is opened. If a synchronization object does not exist in the namespace, or a synchronization object of a different type exists in the namespace, a `WaitHandleCannotBeOpenedException` is thrown.

The `Mutex.OpenExisting` method tries to open the specified named system mutex. To create the system mutex when it does not already exist, use one of the `Mutex.%23ctor` constructors that has a `name` parameter.

Multiple calls to this method that use the same value for `name` do not necessarily return the same `Mutex` object, even though the objects that are returned represent the same named system mutex.

This method overload is equivalent to calling the `OpenExisting` method overload and specifying `Synchronize` and `Modify` rights, combined by using the bitwise OR operation.

Specifying the `Synchronize` flag allows a thread to wait on the mutex, and specifying the `Modify` flag allows a thread to call the `Mutex.ReleaseMutex` method.

This method does not request ownership of the mutex.

#### Examples
The following code example demonstrates the cross-process behavior of a named mutex with access control security. The example uses the `OpenExisting` method overload to test for the existence of a named mutex.

If the mutex does not exist, it is created with initial ownership and access control security that denies the current user the right to use the mutex, but grants the right to read and change permissions on the mutex.

If you run the compiled example from two command windows, the second copy will throw an access violation exception on the call to `OpenExisting`. The exception is caught, and the example uses the `OpenExisting` method overload to open the mutex with the rights needed to read and change the permissions.

After the permissions are changed, the mutex is opened with the rights required to enter and release it. If you run the compiled example from a third command window, it runs using the new permissions.

_Code sample not included: ~/snippets/csharp/System.Threading/Mutex/.ctor/source.cs._
