---
title: "Implement a Dispose method (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/garbage-collection/implementing-dispose.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Implement a Dispose method

The `System.IDisposable.Dispose*` method is primarily implemented to release unmanaged resources. When working with instance members that are `System.IDisposable` implementations, it's common to cascade `System.IDisposable.Dispose*` calls. There are other reasons for implementing `System.IDisposable.Dispose*`, for example, to free memory that was allocated, remove an item that was added to a collection, or signal the release of a lock that was acquired.

The .NET garbage collector doesn't allocate or release unmanaged memory. The pattern for disposing an object, referred to as the dispose pattern, imposes order on the lifetime of an object. The dispose pattern is used for objects that implement the `System.IDisposable` interface. This pattern is common when interacting with file and pipe handles, registry handles, wait handles, or pointers to blocks of unmanaged memory, because the garbage collector is unable to reclaim unmanaged objects.

To help ensure that resources are always cleaned up appropriately, a `System.IDisposable.Dispose*` method should be idempotent, such that it's callable multiple times without throwing an exception. Furthermore, subsequent invocations of `System.IDisposable.Dispose*` should do nothing.

The code example provided for the `System.GC.KeepAlive*` method shows how garbage collection can cause a finalizer to run while an unmanaged reference to the object or its members is still in use. It may make sense to utilize `System.GC.KeepAlive*` to make the object ineligible for garbage collection from the start of the current routine to the point where this method is called.

> **Tip:**
> With regard to dependency injection, when registering services in an `Microsoft.Extensions.DependencyInjection.IServiceCollection`, the service lifetime is managed implicitly on your behalf. The `System.IServiceProvider` and corresponding `Microsoft.Extensions.Hosting.IHost` orchestrate resource cleanup. Specifically, implementations of `System.IDisposable` and `System.IAsyncDisposable` are properly disposed at the end of their specified lifetime.
>
> For more information, see Dependency injection in .NET.

## Cascade dispose calls

If your class owns an instance of another type that implements `System.IDisposable`, the containing class itself should also implement `System.IDisposable`. Typically a class that instantiates an `System.IDisposable` implementation and stores it as an instance member (or property) is also responsible for its cleanup. This helps ensure that the referenced disposable types are given the opportunity to deterministically perform cleanup through the `System.IDisposable.Dispose*` method. In the following example, the class is `sealed` (or `NotInheritable` in Visual Basic).

```csharp
﻿using System;

public sealed class Foo : IDisposable
{
    private readonly IDisposable _bar;

    public Foo()
    {
        _bar = new Bar();
    }

    public void Dispose() => _bar.Dispose();
}
```

> **Tip:**
>
> - If your class has an `System.IDisposable` field or property but doesn't *own* it, then the class doesn't need to implement `System.IDisposable`. Typically a class creating and storing the `System.IDisposable` child object also becomes the owner, but in some cases the ownership can be transferred to another `System.IDisposable` type.
> - There are cases when you might want to perform `null`-checking in a finalizer (which includes the `Dispose(false)` method invoked by a finalizer). One of the primary reasons is if you're unsure whether the instance got fully initialized (for example, an exception might be thrown in a constructor).

## Dispose() and Dispose(bool)

The `System.IDisposable` interface requires the implementation of a single parameterless method, `System.IDisposable.Dispose*`. Also, any non-sealed class should have an `Dispose(bool)` overload method.

Method signatures are:

- `public` non-virtual (`NotOverridable` in Visual Basic) (`System.IDisposable.Dispose*` implementation).
- `protected virtual` (`Overridable` in Visual Basic) `Dispose(bool)`.

### The Dispose() method

Because the `public`, non-virtual (`NotOverridable` in Visual Basic), parameterless `Dispose` method is called when it's no longer needed (by a consumer of the type), its purpose is to free unmanaged resources, perform general cleanup, and to indicate that the finalizer, if one is present, doesn't have to run. Freeing the actual memory associated with a managed object is always the domain of the garbage collector. Because of this, it has a standard implementation:

```csharp
﻿using System;

public class Disposable : IDisposable
{
    private bool _disposed;
    public void Dispose()
    {
        // Dispose of unmanaged resources.
        Dispose(true);
        // Suppress finalization.
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (_disposed)
        {
            return;
        }

        if (disposing)
        {
            // Dispose managed state (managed objects).
            // ...
        }

        // Free unmanaged resources.
        // ...

        _disposed = true;
    }
}
```
```vb
﻿Public Class Disposable : Implements IDisposable

    Dim disposed As Boolean
    Public Sub Dispose() _
        Implements IDisposable.Dispose
        ' Dispose of unmanaged resources.
        Dispose(True)
        ' Suppress finalization.
        GC.SuppressFinalize(Me)
    End Sub

   Protected Overridable Sub Dispose(disposing As Boolean)
		If disposed Then Exit Sub

		If disposing Then

            ' Free managed resources.
            ' ...

        End If

        ' Free unmanaged resources.
        ' ...

        disposed = True
   End Sub

End Class
```
The `Dispose` method performs all object cleanup, so the garbage collector no longer needs to call the objects' `System.Object.Finalize*` override. Therefore, the call to the `System.GC.SuppressFinalize*` method prevents the garbage collector from running the finalizer. If the type has no finalizer, the call to `System.GC.SuppressFinalize*` has no effect. The actual cleanup is performed by the `Dispose(bool)` method overload.

### The Dispose(bool) method overload

In the overload, the `disposing` parameter is a `System.Boolean` that indicates whether the method call comes from a `System.IDisposable.Dispose*` method (its value is `true`) or from a finalizer (its value is `false`).

```csharp
﻿using System;

public class Disposable : IDisposable
{
    private bool _disposed;
    public void Dispose()
    {
        // Dispose of unmanaged resources.
        Dispose(true);
        // Suppress finalization.
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (_disposed)
        {
            return;
        }

        if (disposing)
        {
            // Dispose managed state (managed objects).
            // ...
        }

        // Free unmanaged resources.
        // ...

        _disposed = true;
    }
}
```
```vb
﻿Public Class Disposable : Implements IDisposable

    Dim disposed As Boolean
    Public Sub Dispose() _
        Implements IDisposable.Dispose
        ' Dispose of unmanaged resources.
        Dispose(True)
        ' Suppress finalization.
        GC.SuppressFinalize(Me)
    End Sub

   Protected Overridable Sub Dispose(disposing As Boolean)
		If disposed Then Exit Sub

		If disposing Then

            ' Free managed resources.
            ' ...

        End If

        ' Free unmanaged resources.
        ' ...

        disposed = True
   End Sub

End Class
```
  > **Important:**
  > The `disposing` parameter should be `false` when called from a finalizer, and `true` when called from the `System.IDisposable.Dispose*` method. In other words, it is `true` when deterministically called and `false` when nondeterministically called.

The body of the method consists of three blocks of code:

- A block for conditional return if object is already disposed.
- A conditional block that frees managed resources. This block executes if the value of `disposing` is `true`. The managed resources that it frees can include:

  - **Managed objects that implement `System.IDisposable`.** The conditional block can be used to call their `System.IDisposable.Dispose*` implementation (cascade dispose). If you have used a derived class of `System.Runtime.InteropServices.SafeHandle` to wrap your unmanaged resource, you should call the `System.Runtime.InteropServices.SafeHandle.Dispose` implementation here.
  - **Managed objects that consume large amounts of memory or consume scarce resources.** Assign large managed object references to `null` to make them more likely to be unreachable. This releases them faster than if they were reclaimed nondeterministically.

- A block that frees unmanaged resources. This block executes regardless of the value of the `disposing` parameter.

If the method call comes from a finalizer, only the code that frees unmanaged resources should execute. The implementer is responsible for ensuring that the false path doesn't interact with managed objects that may have been disposed. This is important because the order in which the garbage collector disposes managed objects during finalization is nondeterministic.

## Implement the dispose pattern

All non-sealed classes (or Visual Basic classes not modified as `NotInheritable`) should be considered a potential base class, because they could be inherited. If you implement the dispose pattern for any potential base class, you must add the following methods to your class:

- A `System.IDisposable.Dispose*` implementation that calls the `Dispose(bool)` method.
- A `Dispose(bool)` method that performs the actual cleanup.
- If your class deals with unmanaged resources, either provide an override to the `System.Object.Finalize*` method or wrap the unmanaged resource in a `System.Runtime.InteropServices.SafeHandle`.

> **Important:**
> A finalizer (a `System.Object.Finalize*` override) is only required if you directly reference unmanaged resources. This is a highly advanced scenario that can be typically avoided:
>
> - **If your class references only managed objects**, it's still possible for the class to implement the dispose pattern. There's no need to implement a finalizer.
> - **If you need to deal with unmanaged resources**, we strongly recommend wrapping the unmanaged `System.IntPtr` handle into a `System.Runtime.InteropServices.SafeHandle`. The `System.Runtime.InteropServices.SafeHandle` provides a finalizer so you don't have to write one yourself. For more information, see the Safe handles paragraph.

### Base class with managed resources

Here's a general example of implementing the dispose pattern for a base class that only owns managed resources. The example uses `System.Threading.Interlocked.CompareExchange*` to ensure thread-safe disposal.

```csharp
﻿using System;
using System.IO;
using System.Threading;

public class DisposableBase : IDisposable
{
    // Detect redundant Dispose() calls in a thread-safe manner.
    // _isDisposed == 0 means Dispose(bool) has not been called yet.
    // _isDisposed == 1 means Dispose(bool) has been already called.
    private int _isDisposed;

    // Instantiate a disposable object owned by this class.
    private Stream? _managedResource = new MemoryStream();

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
                _managedResource?.Dispose();
                _managedResource = null;
            }
        }
    }
}
```

> **Note:**
> The previous example uses a **dummy** `System.IO.MemoryStream` object to illustrate the pattern. Any `System.IDisposable` could be used instead.

### Base class with unmanaged resources

Here's an example for implementing the dispose pattern for a base class that overrides `System.Object.Finalize*` in order to clean up unmanaged resources it owns. The example also demonstrates a way to implement `Dispose(bool)` in a thread-safe manner. Synchronization might be critical when dealing with unmanaged resources in a multi-threaded application. As mentioned earlier, this is an advanced scenario.

```csharp
﻿using System;
using System.IO;
using System.Runtime.InteropServices;
using System.Threading;

public class DisposableBaseWithFinalizer : IDisposable
{
    // Detect redundant Dispose() calls in a thread-safe manner.
    // _isDisposed == 0 means Dispose(bool) has not been called yet.
    // _isDisposed == 1 means Dispose(bool) has been already called.
    private int _isDisposed;

    // Instantiate a disposable object owned by this class.
    private Stream? _managedResource = new MemoryStream();

    // A pointer to 10 bytes allocated on the unmanaged heap.
    private IntPtr _unmanagedResource = Marshal.AllocHGlobal(10);

    ~DisposableBaseWithFinalizer() => Dispose(false);

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
                _managedResource?.Dispose();
                _managedResource = null;
            }

            Marshal.FreeHGlobal(_unmanagedResource);
        }
    }
}
```

> **Note:**
>
> - The previous example uses `System.Runtime.InteropServices.Marshal.AllocHGlobal*` to allocate 10 bytes on the unmanaged heap in the constructor and free the buffer in `Dispose(bool)` by calling `System.Runtime.InteropServices.Marshal.FreeHGlobal*`. This is a dummy allocation for illustrational purpose.
> - Again, it's recommended to avoid implementing a finalizer. See Implement the dispose pattern using a custom safe handle for an equivalent of the previous example that delegates non-deterministic finalization and synchronization to `System.Runtime.InteropServices.SafeHandle`.

> **Tip:**
> In C#, you implement a finalization by providing a finalizer, not by overriding `System.Object.Finalize*`. In Visual Basic, you create a finalizer with `Protected Overrides Sub Finalize()`.
