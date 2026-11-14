---
title: "ThreadingAclExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ThreadingAclExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ThreadingAclExtensions class

Namespace: `System.Threading`

```csharp
public static class ThreadingAclExtensions
```

Provides Windows-specific extension methods for managing the access control list (ACL) security descriptors for `EventWaitHandle`, `Mutex`, and `Semaphore`.

#### Remarks

> **Note:**
> This type is only supported on Windows.

## ThreadingAclExtensions.GetAccessControl(EventWaitHandle) method

```csharp
public static System.Security.AccessControl.EventWaitHandleSecurity GetAccessControl (this System.Threading.EventWaitHandle handle);
```

Returns the security descriptors for the specified `handle`.

Parameters:

- `handle`: The event wait handle from which the security descriptors should be returned.

Returns: The security descriptors for the specified `handle`.

To be added.

## ThreadingAclExtensions.GetAccessControl(Mutex) method

```csharp
public static System.Security.AccessControl.MutexSecurity GetAccessControl (this System.Threading.Mutex mutex);
```

Returns the security descriptors for the specified `mutex`.

Parameters:

- `mutex`: The mutex from which the security descriptors should be returned.

Returns: The security descriptors for the specified `mutex`.

To be added.

## ThreadingAclExtensions.GetAccessControl(Semaphore) method

```csharp
public static System.Security.AccessControl.SemaphoreSecurity GetAccessControl (this System.Threading.Semaphore semaphore);
```

Returns the security descriptors for the specified `semaphore`.

Parameters:

- `semaphore`: The semaphore from which the security descriptors should be returned.

Returns: The security descriptors for the specified semaphore.

To be added.

## ThreadingAclExtensions.SetAccessControl(EventWaitHandle, EventWaitHandleSecurity) method

```csharp
public static void SetAccessControl (this System.Threading.EventWaitHandle handle, System.Security.AccessControl.EventWaitHandleSecurity eventSecurity);
```

Sets the security descriptors for the specified event wait handle.

Parameters:

- `handle`: The event wait handle onto which the `eventSecurity` will be applied.
- `eventSecurity`: The security descriptors to apply to the specified `handle`.

Exceptions:

- `ArgumentNullException`: `eventSecurity` is `null`.

To be added.

## ThreadingAclExtensions.SetAccessControl(Mutex, MutexSecurity) method

```csharp
public static void SetAccessControl (this System.Threading.Mutex mutex, System.Security.AccessControl.MutexSecurity mutexSecurity);
```

Sets the security descriptors for the specified mutex.

Parameters:

- `mutex`: The mutex onto which the `mutexSecurity` will be applied.
- `mutexSecurity`: The security descriptors to apply to the specified `mutex`.

Exceptions:

- `ArgumentNullException`: `mutexSecurity` is `null`.

To be added.

## ThreadingAclExtensions.SetAccessControl(Semaphore, SemaphoreSecurity) method

```csharp
public static void SetAccessControl (this System.Threading.Semaphore semaphore, System.Security.AccessControl.SemaphoreSecurity semaphoreSecurity);
```

Sets the security descriptors for the specified semaphore.

Parameters:

- `semaphore`: The semaphore onto which the `semaphoreSecurity` will be applied.
- `semaphoreSecurity`: The security descriptors to apply to the specified `semaphore`.

Exceptions:

- `ArgumentNullException`: `semaphoreSecurity` is `null`.

To be added.
