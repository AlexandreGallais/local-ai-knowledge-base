---
title: "SafeHandle class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/SafeHandle.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SafeHandle class (part 2 of 2)

## SafeHandle.ReleaseHandle() method

```csharp
protected abstract bool ReleaseHandle ();
```

When overridden in a derived class, executes the code required to free the handle.

Returns: `true` if the handle is released successfully; otherwise, in the event of a catastrophic failure, `false`. In this case, it generates a releaseHandleFailed Managed Debugging Assistant.

#### Remarks
The `SafeHandle.ReleaseHandle` method is guaranteed to be called only once and only if the handle is valid as defined by the `IsInvalid` property. Implement this method in your `SafeHandle` derived classes to execute any code that is required to free the handle. Because one of the functions of `SafeHandle` is to guarantee prevention of resource leaks, the code in your implementation of `SafeHandle.ReleaseHandle` must never fail. The garbage collector calls `SafeHandle.ReleaseHandle` after normal finalizers have been run for objects that were garbage collected at the same time. The garbage collector guarantees the resources to invoke this method and that the method will not be interrupted while it is in progress.

Additionally, for simple cleanup (for example, calling the Windows API `CloseHandle` on a file handle) you can check the return value for the single platform invoke call. For complex cleanup, you may have a lot of program logic and many method calls, some of which might fail. You must ensure that your program logic has fallback code for each of those cases.

#### Examples
The following code example releases the handle and is part of a larger example provided for the `SafeHandle` class.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/SafeHandle/Overview/program.cs._
## SafeHandle.SetHandle(IntPtr) method

```csharp
protected void SetHandle (IntPtr handle);
```

Sets the handle to the specified pre-existing handle.

Parameters:

- `handle`: The pre-existing handle to use.

#### Remarks
Use the `SafeHandle.SetHandle` method only if you need to support a pre-existing handle (for example, if the handle is returned in a structure) because the .NET COM interop infrastructure does not support marshaling output handles in a structure.

## SafeHandle.SetHandleAsInvalid() method

```csharp
public void SetHandleAsInvalid ();
```

Marks a handle as no longer used.

#### Remarks
Call the `SafeHandle.SetHandleAsInvalid` method only when you know that your handle no longer references a resource. Doing so does not change the value of the `handle` field; it only marks the handle as closed. The handle might then contain a potentially stale value. The effect of this call is that no attempt is made to free the resources.

As with the `SafeHandle.SetHandle` method, use `SafeHandle.SetHandleAsInvalid` only if you need to support a pre-existing handle.

## SafeHandle.handle field

```csharp
protected IntPtr handle;
```

Specifies the handle to be wrapped.

#### Remarks
Do not expose the handle publicly (that is, outside of the derived class).
