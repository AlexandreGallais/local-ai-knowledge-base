---
title: "Implement a Dispose method (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/garbage-collection/implementing-dispose.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Implement a Dispose method (part 2 of 2)

## Implement the dispose pattern for a derived class

A class derived from a class that implements the `System.IDisposable` interface shouldn't implement `System.IDisposable`, because the base class implementation of `System.IDisposable.Dispose*` is inherited by its derived classes. Instead, to clean up a derived class, you provide the following:

- A `protected override void Dispose(bool)` method that overrides the base class method and performs the actual cleanup of the derived class. This method must also call the `base.Dispose(bool)` (`MyBase.Dispose(bool)` in Visual Basic) method passing it the disposing status (`bool disposing` parameter) as an argument.
- Either a class derived from `System.Runtime.InteropServices.SafeHandle` that wraps your unmanaged resource (recommended), or an override to the `System.Object.Finalize*` method. The `System.Runtime.InteropServices.SafeHandle` class provides a finalizer that frees you from having to code one. If you do provide a finalizer, it must call the `Dispose(bool)` overload with `false` argument.

Here's an example of the general pattern for implementing the dispose pattern for a derived class that uses a safe handle:

```csharp
﻿using System.IO;

public class DisposableDerived : DisposableBase
{
    // To detect redundant calls
    private bool _isDisposed;

    // Instantiate a disposable object owned by this class.
    private Stream? _managedResource = new MemoryStream();

    // Protected implementation of Dispose pattern.
    protected override void Dispose(bool disposing)
    {
        if (!_isDisposed)
        {
            _isDisposed = true;

            if (disposing)
            {
                _managedResource?.Dispose();
                _managedResource = null;
            }
        }

        // Call base class implementation.
        base.Dispose(disposing);
    }
}
```

> **Note:**
> The previous example uses a `Microsoft.Win32.SafeHandles.SafeFileHandle` object to illustrate the pattern; any object derived from `System.Runtime.InteropServices.SafeHandle` could be used instead. Note that the example doesn't properly instantiate its `Microsoft.Win32.SafeHandles.SafeFileHandle` object.

Here's the general pattern for implementing the dispose pattern for a derived class that overrides `System.Object.Finalize*`:

```csharp
﻿using System.Threading;

public class DisposableDerivedWithFinalizer : DisposableBaseWithFinalizer
{
    // Detect redundant Dispose() calls in a thread-safe manner.
    // _isDisposed == 0 means Dispose(bool) has not been called yet.
    // _isDisposed == 1 means Dispose(bool) has been already called.
    private int _isDisposed;

    ~DisposableDerivedWithFinalizer() => Dispose(false);

    // Protected implementation of Dispose pattern.
    protected override void Dispose(bool disposing)
    {
        // In case _isDisposed is 0, atomically set it to 1.
        // Enter the branch only if the original value is 0.
        if (Interlocked.CompareExchange(ref _isDisposed, 1, 0) == 0)
        {
            if (disposing)
            {
                // TODO: dispose managed state (managed objects).
            }

            // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
            // TODO: set large fields to null.
        }

        // Call the base class implementation.
        base.Dispose(disposing);
    }
}
```

## Safe handles

Writing code for an object's finalizer is a complex task that can cause problems if not done correctly. Therefore, we recommend that you construct `System.Runtime.InteropServices.SafeHandle` objects instead of implementing a finalizer.

A `System.Runtime.InteropServices.SafeHandle` is an abstract managed type that wraps an `System.IntPtr` that identifies an unmanaged resource. On Windows it might identify a handle, and on Unix, a file descriptor. The `SafeHandle` provides all of the logic necessary to ensure that this resource is released once and only once, either when the `SafeHandle` is disposed of or when all references to the `SafeHandle` have been dropped and the `SafeHandle` instance is finalized.

The `System.Runtime.InteropServices.SafeHandle` is an abstract base class. Derived classes provide specific instances for different kinds of handle. These derived classes validate what values for the `System.IntPtr` are considered invalid and how to actually free the handle. For example, `Microsoft.Win32.SafeHandles.SafeFileHandle` derives from `SafeHandle` to wrap `IntPtrs` that identify open file handles and descriptors, and overrides its `System.Runtime.InteropServices.SafeHandle.ReleaseHandle` method to close it (via the `close` function on Unix or `CloseHandle` function on Windows). Most APIs in .NET libraries that create an unmanaged resource wrap it in a `SafeHandle` and return that `SafeHandle` to you as needed, rather than handing back the raw pointer. In situations where you interact with an unmanaged component and get an `IntPtr` for an unmanaged resource, you can create your own `SafeHandle` type to wrap it. As a result, few non-`SafeHandle` types need to implement finalizers. Most disposable pattern implementations only end up wrapping other managed resources, some of which might be `SafeHandle` objects.

### Implement the dispose pattern using a custom safe handle

The following code demonstrates how to handle unmanaged resources by implementing a `System.Runtime.InteropServices.SafeHandle`.

```csharp
﻿using System;
using System.IO;
using System.Runtime.InteropServices;
using System.Threading;
using Microsoft.Win32.SafeHandles;

// Wraps the IntPtr allocated by Marshal.AllocHGlobal() into a SafeHandle.
class LocalAllocHandle : SafeHandleZeroOrMinusOneIsInvalid
{
    private LocalAllocHandle() : base(ownsHandle: true) { }

    // No need to implement a finalizer - SafeHandle's finalizer will call ReleaseHandle for you.
    protected override bool ReleaseHandle()
    {
        Marshal.FreeHGlobal(handle);
        return true;
    }

    // Allocate bytes with Marshal.AllocHGlobal() and wrap the result into a SafeHandle.
    public static LocalAllocHandle Allocate(int numberOfBytes)
    {
        IntPtr nativeHandle = Marshal.AllocHGlobal(numberOfBytes);
        LocalAllocHandle safeHandle = new LocalAllocHandle();
        safeHandle.SetHandle(nativeHandle);
        return safeHandle;
    }
}

public class DisposableBaseWithSafeHandle : IDisposable
{
    // Detect redundant Dispose() calls in a thread-safe manner.
    // _isDisposed == 0 means Dispose(bool) has not been called yet.
    // _isDisposed == 1 means Dispose(bool) has been already called.
    private int _isDisposed;

    // Managed disposable objects owned by this class
    private LocalAllocHandle? _safeHandle = LocalAllocHandle.Allocate(10);
    private Stream? _otherUnmanagedResource = new MemoryStream();

    // Public implementation of Dispose pattern callable by consumers.
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    // Protected implementation of Dispose pattern.
    protected virtual void Dispose(bool disposing)
    {
        // In case _isDisposed is 0, atomically set it to 1.
        // Enter the branch only if the original value is 0.
        if (Interlocked.CompareExchange(ref _isDisposed, 1, 0) == 0)
        {
            if (disposing)
            {
                // Dispose managed state.
                _otherUnmanagedResource?.Dispose();
                _safeHandle?.Dispose();
                _otherUnmanagedResource = null;
                _safeHandle = null;
            }
        }
    }
}
```

> **Note:**
> The behavior of the `DisposableBaseWithSafeHandle` class is equivalent to the behavior of the `DisposableBaseWithFinalizer` class in a previous example, however the approach demonstrated here is safer:
>
> - There is no need to implement a finalizer, because `System.Runtime.InteropServices.SafeHandle` will take care of finalization.
> - There is no need for synchronization to guarantee thread safety. Even though there is a race condition in the `Dispose` implementation of `DisposableBaseWithSafeHandle`, `System.Runtime.InteropServices.SafeHandle` guarantees that `System.Runtime.InteropServices.SafeHandle.ReleaseHandle*` is called only once.

### Built-in safe handles in .NET

The following derived classes in the `Microsoft.Win32.SafeHandles` namespace provide safe handles.

| Class | Resources it holds |
| - | - |
| `Microsoft.Win32.SafeHandles.SafeFileHandle``Microsoft.Win32.SafeHandles.SafeMemoryMappedFileHandle``Microsoft.Win32.SafeHandles.SafePipeHandle` | Files, memory mapped files, and pipes |
| `Microsoft.Win32.SafeHandles.SafeMemoryMappedViewHandle` | Memory views |
| `Microsoft.Win32.SafeHandles.SafeNCryptKeyHandle``Microsoft.Win32.SafeHandles.SafeNCryptProviderHandle``Microsoft.Win32.SafeHandles.SafeNCryptSecretHandle` | Cryptography constructs |
| `Microsoft.Win32.SafeHandles.SafeRegistryHandle` | Registry keys |
| `Microsoft.Win32.SafeHandles.SafeWaitHandle` | Wait handles |

## See also

- Disposal of services
- `System.GC.SuppressFinalize*`
- `System.IDisposable`
- `System.IDisposable.Dispose*`
- `Microsoft.Win32.SafeHandles`
- `System.Runtime.InteropServices.SafeHandle`
- `System.Object.Finalize*`
- Define and consume classes and structs (C++/CLI)
- The SafeHandle class
