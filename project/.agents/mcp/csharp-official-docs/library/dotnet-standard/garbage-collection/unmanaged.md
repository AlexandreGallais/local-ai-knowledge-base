---
title: "Cleaning up unmanaged resources"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/garbage-collection/unmanaged.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Cleaning up unmanaged resources

For a majority of the objects that your app creates, you can rely on the .NET garbage collector to handle memory management. However, when you create objects that include unmanaged resources, you **must** explicitly release those resources when you finish using them. The most common types of unmanaged resources are objects that wrap operating system resources, such as files, windows, network connections, or database connections. Although the garbage collector is able to track the lifetime of an object that encapsulates an unmanaged resource, it doesn't know how to release and clean up the unmanaged resource.

If your types use unmanaged resources, you should do the following:

- Implement the dispose pattern. This requires that you provide an `System.IDisposable.Dispose*` implementation to enable the deterministic release of unmanaged resources. A consumer of your type calls `System.IDisposable.Dispose*` when the object (and the resources it uses) are no longer needed. The `System.IDisposable.Dispose*` method immediately releases the unmanaged resources.

- In the event that a consumer of your type forgets to call `System.IDisposable.Dispose*`, provide a way for your unmanaged resources to be released. There are two ways to do this:

  - Use a safe handle to wrap your unmanaged resource. This is the recommended technique. Safe handles are derived from the `System.Runtime.InteropServices.SafeHandle` abstract class and include a robust `System.Object.Finalize*` method. When you use a safe handle, you simply implement the `System.IDisposable` interface and call your safe handle's `System.Runtime.InteropServices.SafeHandle.Dispose*` method in your `System.IDisposable.Dispose*` implementation. The safe handle's finalizer is called automatically by the garbage collector if its `System.IDisposable.Dispose*` method is not called.

    —**or**—

  - Define a finalizer. Finalization enables the non-deterministic release of unmanaged resources when the consumer of a type fails to call `System.IDisposable.Dispose*` to dispose of them deterministically.

    > **Warning:**
    > Object finalization can be a complex and error-prone operation, we recommend that you use a safe handle instead of providing your own finalizer.

Consumers of your type can then call your `System.IDisposable.Dispose*` implementation directly to free memory used by unmanaged resources. When you properly implement a `System.IDisposable.Dispose*` method, either your safe handle's `System.Object.Finalize*` method or your own override of the `System.Object.Finalize*` method becomes a safeguard to clean up resources in the event that the `System.IDisposable.Dispose*` method is not called.

## In this section

Implementing a Dispose method describes how to implement the dispose pattern for releasing unmanaged resources.

Using objects that implement `IDisposable` describes how consumers of a type ensure that its `System.IDisposable.Dispose*` implementation is called. We strongly recommend using the C# `using` (or the Visual Basic `Using`) statement to do this.

## Reference

| Type / Member | Description |
|--|--|
| `System.IDisposable` | Defines the `System.IDisposable.Dispose*` method for releasing unmanaged resources. |
| `System.Object.Finalize*` | Provides for object finalization if unmanaged resources are not released by the `System.IDisposable.Dispose*` method. |
| `System.GC.SuppressFinalize*` | Suppresses finalization. This method is customarily called from a `Dispose` method to prevent a finalizer from executing. |
