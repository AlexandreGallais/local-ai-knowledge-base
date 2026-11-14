---
title: "SafeHandle class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/SafeHandle.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SafeHandle class

Namespace: `System.Runtime.InteropServices`

```csharp
public abstract class SafeHandle : System.Runtime.ConstrainedExecution.CriticalFinalizerObject, IDisposable
```

Represents a wrapper class for operating system handles. This class must be inherited.

The `SafeHandle` class provides critical finalization of handle resources, preventing handles from being reclaimed prematurely by garbage collection and from being recycled by the operating system to reference unintended unmanaged objects.

#### Why SafeHandle?

Although overrides to the `Object.Finalize` method allow cleanup of unmanaged resources when an object is being garbage collected, in some circumstances, finalizable objects can be reclaimed by garbage collection while executing a method within a platform invoke call. If a finalizer frees the handle passed to that platform invoke call, it could lead to handle corruption. The handle could also be reclaimed while your method is blocked during a platform invoke call, such as while reading a file.

More critically, because Windows aggressively recycles handles, a handle could be recycled and point to another resource that might contain sensitive data. This is known as a recycle attack and can potentially corrupt data and be a security threat.

#### What SafeHandle does

The `SafeHandle` class simplifies several of these object lifetime issues, and is integrated with platform invoke so that operating system resources are not leaked. The `SafeHandle` class resolves object lifetime issues by assigning and releasing handles without interruption. It contains a critical finalizer that ensures that the handle is closed and is guaranteed to run during unexpected `AppDomain` unloads, even in cases when the platform invoke call is assumed to be in a corrupted state.

Because `SafeHandle` inherits from `CriticalFinalizerObject`, all the noncritical finalizers are called before any of the critical finalizers. The finalizers are called on objects that are no longer live during the same garbage collection pass. For example, a `FileStream` object can run a normal finalizer to flush out existing buffered data without the risk of the handle being leaked or recycled. This very weak ordering between critical and noncritical finalizers is not intended for general use. It exists primarily to assist in the migration of existing libraries by allowing those libraries to use `SafeHandle` without altering their semantics. Additionally, the critical finalizer and anything it calls, such as the `ReleaseHandle` method, must be in a constrained execution region. This imposes constraints on what code can be written within the finalizer's call graph.

Platform invoke operations automatically increment the reference count of handles encapsulated by a `SafeHandle` and decrement them upon completion. This ensures that the handle will not be recycled or closed unexpectedly.

You can specify ownership of the underlying handle when constructing `SafeHandle` objects by supplying a value to the `ownsHandle` argument in the `SafeHandle` class constructor. This controls whether the `SafeHandle` object will release the handle after the object has been disposed. This is useful for handles with peculiar lifetime requirements or for consuming a handle whose lifetime is controlled by someone else.

#### Classes derived from SafeHandle

`SafeHandle` is an abstract wrapper class for operating system handles. Deriving from this class is difficult. Instead, use the derived classes in the `SafeHandles` namespace that provide safe handles for the following:

- Files (the `SafeFileHandle` class).
- Memory mapped files (the `SafeMemoryMappedFileHandle` class).
- Pipes (the `SafePipeHandle` class).
- Memory views (the `SafeMemoryMappedViewHandle` class).
- Cryptography constructs (the `SafeNCryptHandle`, `SafeNCryptKeyHandle`, `SafeNCryptProviderHandle`, and `SafeNCryptSecretHandle` classes).
- Processes (the `SafeProcessHandle` class).
- Registry keys (the `SafeRegistryHandle` class).
- Wait handles (the `SafeWaitHandle` class).

The following code example creates a custom safe handle for an operating system file handle, deriving from `SafeHandleZeroOrMinusOneIsInvalid`. It reads bytes from a file and displays their hexadecimal values. It also contains a fault testing harness that causes the thread to abort, but the handle value is freed. When using an `IntPtr` to represent handles, the handle is occasionally leaked due to the asynchronous thread abort.

You will need a text file in the same folder as the compiled application. Assuming that you name the application "HexViewer", the command line usage is:

`HexViewer <filename> -Fault`

Optionally specify `-Fault` to intentionally attempt to leak the handle by aborting the thread in a certain window. Use the Windows Perfmon.exe tool to monitor handle counts while injecting faults.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/SafeHandle/Overview/program.cs._
## SafeHandle.SafeHandle(IntPtr, Boolean) constructor

```csharp
protected SafeHandle (IntPtr invalidHandleValue, bool ownsHandle);
```

Initializes a new instance of the `SafeHandle` class with the specified invalid handle value.

Parameters:

- `invalidHandleValue`: The value of an invalid handle (usually 0 or -1).  Your implementation of `SafeHandle.IsInvalid` should return `true` for this value.
- `ownsHandle`: `true` to reliably let `SafeHandle` release the handle during the finalization phase; otherwise, `false` (not recommended).

Exceptions:

- `TypeLoadException`: The derived class resides in an assembly without unmanaged code access permission.

#### Remarks
If the `ownsHandle` parameter is `false`, `SafeHandle.ReleaseHandle` is never called; thus, it is not recommended to use this parameter value as your code may leak resources.

## SafeHandle.IsClosed property

```csharp
public bool IsClosed { get; }
```

Gets a value indicating whether the handle is closed.

Returns: `true` if the handle is closed; otherwise, `false`.

#### Remarks
The `SafeHandle.IsClosed` method returns a value indicating whether the `SafeHandle` object's handle is no longer associated with a native resource. This differs from the definition of the `IsInvalid` property, which computes whether a given handle is always considered invalid. The `SafeHandle.IsClosed` method returns a `true` value in the following cases:

- The `SafeHandle.SetHandleAsInvalid` method was called.

- The `SafeHandle.Dispose` method or `SafeHandle.Close` method was called and there are no references to the `SafeHandle` object on other threads.

## SafeHandle.IsInvalid property

```csharp
public abstract bool IsInvalid { get; }
```

When overridden in a derived class, gets a value indicating whether the handle value is invalid.

Returns: `true` if the handle value is invalid; otherwise, `false`.

#### Remarks
Derived classes must implement the `IsInvalid` property so that the common language runtime can determine whether critical finalization is required. Derived classes must provide an implementation that suits the general type of handle they support (0 or -1 is invalid). These classes can then be further derived for specific safe handle types.

Unlike the `IsClosed` property, which reports whether the `SafeHandle` object has finished using the underlying handle, the `IsInvalid` property calculates whether the given handle value is always considered invalid. Therefore, the `IsInvalid` property always returns the same value for any one handle value.

#### Examples
The following example checks if a file was opened successfully. This code example is part of a larger example provided for the `SafeHandle` class.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/SafeHandle/Overview/program.cs._
## SafeHandle.Close() method

```csharp
public void Close ();
```

Marks the handle for releasing and freeing resources.

#### Remarks
Calling the `SafeHandle.Close` or `SafeHandle.Dispose` method allows the resources to be freed. This might not happen immediately if other threads are using the same safe handle object, but will happen as soon as that is no longer the case. Although most classes that use the `SafeHandle` class do not need to provide a finalizer, this is sometimes necessary (for example, to flush out file buffers or to write some data back into memory). In this case, the class can provide a finalizer that is guaranteed to run before the `SafeHandle` critical finalizer runs.

Call the `SafeHandle.Close` or `SafeHandle.Dispose` method when you are finished using the `SafeHandle` object.

> **Note:**
>  Always call `SafeHandle.Close` or `SafeHandle.Dispose` before you release your last reference to the `SafeHandle` object. Otherwise, the resources it is using will not be freed until the garbage collector calls the `SafeHandle` object's `SafeHandle.Finalize` method.

## SafeHandle.DangerousAddRef(Boolean) method

```csharp
public void DangerousAddRef (ref bool success);
```

Manually increments the reference counter on `SafeHandle` instances.

Parameters:

- `success`: `true` if the reference counter was successfully incremented; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The SafeHandle has been disposed.

#### Remarks
The `SafeHandle.DangerousAddRef` method prevents the common language runtime from reclaiming memory used by a handle (which occurs when the runtime calls the `SafeHandle.ReleaseHandle` method). You can use this method to manually increment the reference count on a `SafeHandle` instance. `SafeHandle.DangerousAddRef` returns a Boolean value using a `ref` parameter (`success`) that indicates whether the reference count was incremented successfully. This allows your program logic to back out in case of failure. You should set `success` to `false` before calling `SafeHandle.DangerousAddRef`. If `success` is `true`, avoid resource leaks by matching the call to `SafeHandle.DangerousAddRef` with a corresponding call to `SafeHandle.DangerousRelease`.

If this call is successful, it will set the `ref bool success` parameter to `true` and return successfully.  If this call is unsuccessful, it will throw an exception and leave the `ref bool success` parameter unmodified.

## SafeHandle.DangerousGetHandle() method

```csharp
public IntPtr DangerousGetHandle ();
```

Returns the value of the `SafeHandle.handle` field.

Returns: An `IntPtr` representing the value of the `SafeHandle.handle` field. If the handle has been marked invalid with `SafeHandle.SetHandleAsInvalid`, this method still returns the original handle value, which can be a stale value.

#### Remarks
You can use this method to retrieve the actual handle value from an instance of the `SafeHandle` derived class. This method is needed for backwards compatibility because many properties in .NET return `IntPtr` handle types. `IntPtr` handle types are platform-specific types used to represent a pointer or a handle.

> **Caution:**
>  Using the `SafeHandle.DangerousGetHandle` method can pose security risks because, if the handle has been marked as invalid with `SafeHandle.SetHandleAsInvalid`, `SafeHandle.DangerousGetHandle` still returns the original, potentially stale handle value. The returned handle can also be recycled at any point. At best, this means the handle might suddenly stop working. At worst, if the handle or the resource that the handle represents is exposed to untrusted code, this can lead to a recycling security attack on the reused or returned handle. For example, an untrusted caller can query data on the handle just returned and receive information for an entirely unrelated resource. See the `SafeHandle.DangerousAddRef` and the `SafeHandle.DangerousRelease` methods for more information about using the `SafeHandle.DangerousGetHandle` method safely.

## SafeHandle.DangerousRelease() method

```csharp
public void DangerousRelease ();
```

Manually decrements the reference counter on a `SafeHandle` instance.

#### Remarks
The `SafeHandle.DangerousRelease` method is the counterpart to `SafeHandle.DangerousAddRef`. You should always match a call to the `SafeHandle.DangerousRelease` method with a successful call to `SafeHandle.DangerousAddRef`.

> **Caution:**
>  In the same way that unmatched `SafeHandle.DangerousAddRef` calls can cause resource leaks, unmatched `SafeHandle.DangerousRelease` calls can cause invalid handle states to become visible to other threads.

## SafeHandle.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the `SafeHandle` class.

#### Remarks
Calling the `SafeHandle.Close` or `SafeHandle.Dispose` method allows the resources to be freed. This might not happen immediately if other threads are using the same instance of the safe handle, but will happen as soon as that is no longer the case. Although most classes using `SafeHandle` do not need to provide a finalizer, this is sometimes necessary (for example, to flush out file buffers or to write some data back into memory). In this case, they can provide a finalizer that is guaranteed to run before the `SafeHandle` critical finalizer runs.

Call the `SafeHandle.Close` or `SafeHandle.Dispose` method when you are finished using the `SafeHandle` object. The `SafeHandle.Close` method leaves the `SafeHandle` object in an unusable state.

> **Note:**
>  Always call the `SafeHandle.Close` or `SafeHandle.Dispose` method before you release your last reference to the `SafeHandle` object. Otherwise, the resources it is using will not be freed until the garbage collector calls the `SafeHandle` object's `SafeHandle.Finalize` method.

## SafeHandle.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `SafeHandle` class specifying whether to perform a normal dispose operation.

Parameters:

- `disposing`: `true` for a normal dispose operation; `false` to finalize the handle.

#### Remarks
You should never explicitly call the `SafeHandle.Dispose` method with the `disposing` parameter set to `false`.

## SafeHandle.Finalize() method

```csharp
~SafeHandle ();
```

Frees all resources associated with the handle.

#### Remarks
The `SafeHandle.Finalize` method is the destructor for the `SafeHandle` class. Application code should not call this method directly.
