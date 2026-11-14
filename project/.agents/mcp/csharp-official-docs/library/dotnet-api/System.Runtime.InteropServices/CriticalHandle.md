---
title: "CriticalHandle class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/CriticalHandle.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CriticalHandle class

Namespace: `System.Runtime.InteropServices`

```csharp
public abstract class CriticalHandle : System.Runtime.ConstrainedExecution.CriticalFinalizerObject, IDisposable
```

Represents a wrapper class for handle resources.

#### Remarks
The `CriticalHandle` class is similar to the `SafeHandle` class, except that `SafeHandle` implements reference counting. You can use `CriticalHandle` instead of `SafeHandle` to address performance considerations when you can provide the necessary synchronization more efficiently yourself.

Because the `CriticalHandle` class does not perform reference counting, it does not provide protection from handle recycling security attacks. Because the reference counting algorithm implicitly serializes operations, a certain amount of thread safety is also lost. If you call the `IDisposable.Dispose` or `SafeHandle.Close` method while an operation that is using the handle is outstanding on another thread, or if you call `IDisposable.Dispose` or `SafeHandle.Close` from two threads at the same time, the results are non-deterministic. The `CriticalHandle` class still provides the guaranteed critical finalization provided by the `CriticalFinalizerObject` class.

## CriticalHandle.CriticalHandle(IntPtr) constructor

```csharp
protected CriticalHandle (IntPtr invalidHandleValue);
```

Initializes a new instance of the `CriticalHandle` class with the specified invalid handle value.

Parameters:

- `invalidHandleValue`: The value of an invalid handle (usually 0 or -1).

Exceptions:

- `TypeLoadException`: The derived class resides in an assembly without unmanaged code access permission.

To be added.

## CriticalHandle.IsClosed property

```csharp
public bool IsClosed { get; }
```

Gets a value indicating whether the handle is closed.

Returns: `true` if the handle is closed; otherwise, `false`.

#### Remarks
The `CriticalHandle.IsClosed` method returns a value indicating whether the `CriticalHandle` object's handle is no longer associated with a native resource. This differs from the definition of the `IsInvalid` property, which computes whether a given handle is always considered invalid. The `CriticalHandle.IsClosed` method returns a `true` value in the following cases:

- The `CriticalHandle.SetHandleAsInvalid` method was called.

- The `CriticalHandle.Dispose` method or `CriticalHandle.Close` method was called and there are no references to the `CriticalHandle` object on other threads.

## CriticalHandle.IsInvalid property

```csharp
public abstract bool IsInvalid { get; }
```

When overridden in a derived class, gets a value indicating whether the handle value is invalid.

Returns: `true` if the handle is valid; otherwise, `false`.

#### Remarks
Derived classes must implement the `IsInvalid` property so that the common language runtime can determine whether critical finalization is required. Derived classes must provide an implementation that suits the general type of handle they support (0 or -1 is invalid). These classes can then be further derived for specific safe handle types.

Unlike the `IsClosed` property, which reports whether the `CriticalHandle` object has finished using the underlying handle, the `IsInvalid` property calculates whether the given handle value is always considered invalid. Therefore, the `IsInvalid` property always returns the same value for any one handle value.

## CriticalHandle.Close() method

```csharp
public void Close ();
```

Marks the handle for releasing and freeing resources.

#### Remarks
Calling the `CriticalHandle.Close` or `CriticalHandle.Dispose` method allows the resources to be freed. Unlike the `SafeHandle` class, this will always happen immediately since there is no reference count to indicate that other threads are using this handle. Therefore, you must employ a synchronization mechanism to ensure it is safe to call the `CriticalHandle.Close` method. Although most classes that use the `CriticalHandle` class do not need to provide a finalizer, this is sometimes necessary (for example, to flush out file buffers or to write some data back into memory). In this case, the class can provide a finalizer that is guaranteed to run before the `CriticalHandle` critical finalizer runs.

Call the `CriticalHandle.Close` or `CriticalHandle.Dispose` method when you are finished using the `CriticalHandle` object. The `CriticalHandle.Close` method leaves the `CriticalHandle` object in an unusable state.

**Note** Always call `CriticalHandle.Close` or `CriticalHandle.Dispose` before you release your last reference to the `CriticalHandle` object. Otherwise, the resources it is using will not be freed until the garbage collector calls the `CriticalHandle` object's `CriticalHandle.Finalize` method.

## CriticalHandle.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the `CriticalHandle`.

#### Remarks
Calling the `CriticalHandle.Close` or `CriticalHandle.Dispose` method allows the resources to be freed. Unlike the `SafeHandle` class, this will always happen immediately since there is no reference count to indicate that other threads are using this handle. Therefore, you must employ a synchronization mechanism to ensure it is safe to call the `CriticalHandle.Dispose` method. Although most classes that use the `CriticalHandle` class do not need to provide a finalizer, this is sometimes necessary (for example, to flush out file buffers or to write some data back into memory). In this case, the class can provide a finalizer that is guaranteed to run before the `CriticalHandle` critical finalizer runs.

Call the `CriticalHandle.Close` or `CriticalHandle.Dispose` method when you are finished using the `CriticalHandle` object. The `CriticalHandle.Close` method leaves the `CriticalHandle` object in an unusable state.

**Note** Always call the `CriticalHandle.Close` or `CriticalHandle.Dispose` method before you release your last reference to the `CriticalHandle` object. Otherwise, the resources it is using will not be freed until the garbage collector calls the `CriticalHandle` object's `CriticalHandle.Finalize` method.

## CriticalHandle.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `CriticalHandle` class specifying whether to perform a normal dispose operation.

Parameters:

- `disposing`: `true` for a normal dispose operation; `false` to finalize the handle.

#### Remarks
You should never explicitly call the `CriticalHandle.Dispose` method with the `disposing` parameter set to `false`.

## CriticalHandle.Finalize() method

```csharp
~CriticalHandle ();
```

Frees all resources associated with the handle.

#### Remarks
The `CriticalHandle.Finalize` method is the destructor for the `CriticalHandle` class. Application code should not call this method directly.

## CriticalHandle.ReleaseHandle() method

```csharp
protected abstract bool ReleaseHandle ();
```

When overridden in a derived class, executes the code required to free the handle.

Returns: `true` if the handle is released successfully; otherwise, in the event of a catastrophic failure, `false`. In this case, it generates a releaseHandleFailed Managed Debugging Assistant.

#### Remarks
The `CriticalHandle.ReleaseHandle` method is guaranteed to be called only once, provided that you employ proper synchronization mechanisms to ensure that only one call to the `CriticalHandle.Close` or `CriticalHandle.Dispose` method is made. The `CriticalHandle.ReleaseHandle` method will not be called if the `CriticalHandle.IsInvalid` or `IsClosed` property is `true`. Implement this method in your `CriticalHandle` derived classes to execute any code that is required to free the handle. Because one of the functions of `CriticalHandle` is to guarantee prevention of resource leaks, the code in your implementation of `CriticalHandle.ReleaseHandle` must never fail. The garbage collector calls `CriticalHandle.ReleaseHandle` after normal finalizers have been run for objects that were garbage collected at the same time, and guarantees the resources to invoke it and that it will not be interrupted while it is in progress.

For simple cleanup (for example, calling the Windows API `CloseHandle` on a file handle) you can check the return value for the single platform invoke call. For complex cleanup, you might have a lot of program logic and many method calls, some of which might fail. You must ensure that your program logic has fallback code for each of those cases.

If the `CriticalHandle.ReleaseHandle` method returns `false` for any reason, it generates a releaseHandleFailed Managed Debugging Assistant.

## CriticalHandle.SetHandle(IntPtr) method

```csharp
protected void SetHandle (IntPtr handle);
```

Sets the handle to the specified pre-existing handle.

Parameters:

- `handle`: The pre-existing handle to use.

#### Remarks
Use the `CriticalHandle.SetHandle` method only if you need to support a pre-existing handle (for example, if the handle is returned in a structure) because the COM interop infrastructure does not support marshaling handles in a structure.

## CriticalHandle.SetHandleAsInvalid() method

```csharp
public void SetHandleAsInvalid ();
```

Marks a handle as invalid.

#### Remarks
Call the `CriticalHandle.SetHandleAsInvalid` method only when you know that your handle is invalid and you want to mark it as such. Doing so does not change the value of the `handle` field; it only marks the handle as invalid. The handle might then contain a potentially stale value. The effect of this call is that no attempt is made to free the resources.

As with the `CriticalHandle.SetHandle` method, use `CriticalHandle.SetHandleAsInvalid` only if you need to support a pre-existing handle.

## CriticalHandle.handle field

```csharp
protected IntPtr handle;
```

Specifies the handle to be wrapped.

#### Remarks
Do not expose the handle publicly (that is, outside of the derived class).
