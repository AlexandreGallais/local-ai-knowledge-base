---
title: "WaitHandleExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/WaitHandleExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WaitHandleExtensions class

Namespace: `System.Threading`

```csharp
public static class WaitHandleExtensions
```

Provides convenience methods to for working with a safe handle for a wait handle.

#### Remarks
The `WaitHandleExtensions` class includes two extension methods that allow you to create a safe handle for a wait handle and to retrieve the native operating system handle from a safe handle.

## WaitHandleExtensions.GetSafeWaitHandle(WaitHandle) method

```csharp
public static Microsoft.Win32.SafeHandles.SafeWaitHandle GetSafeWaitHandle (this System.Threading.WaitHandle waitHandle);
```

Gets the safe handle for a native operating system wait handle.

Parameters:

- `waitHandle`: A native operating system handle.

Returns: The safe wait handle that wraps the native operating system wait handle.

Exceptions:

- `ArgumentNullException`: `waitHandle` is `null`.

#### Remarks
`WaitHandleExtensions.GetSafeWaitHandle` is an extension method that is equivalent to retrieving the value of the `SafeWaitHandle` property.

## WaitHandleExtensions.SetSafeWaitHandle(WaitHandle, SafeWaitHandle) method

```csharp
public static void SetSafeWaitHandle (this System.Threading.WaitHandle waitHandle, Microsoft.Win32.SafeHandles.SafeWaitHandle? value);
```

Sets a safe handle for a native operating system wait handle.

Parameters:

- `waitHandle`: A wait handle that encapsulates an operating system-specific object that waits for exclusive access to a shared resource.
- `value`: The safe handle to wrap the operating system handle.

Exceptions:

- `ArgumentNullException`: `waitHandle` is `null`.

#### Remarks
`WaitHandleExtensions.SetSafeWaitHandle` is an extension method that is equivalent to assigning a value to the `SafeWaitHandle` property.
