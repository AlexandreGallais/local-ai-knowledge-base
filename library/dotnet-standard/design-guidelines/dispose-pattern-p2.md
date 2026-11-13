---
title: "Dispose Pattern (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/design-guidelines/dispose-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Dispose Pattern (part 2 of 2)

## Finalizable Types

 Finalizable types are types that extend the Basic <example-value> Pattern by overriding the finalizer and providing finalization code path in the `Dispose(bool)` method.

 Finalizers are notoriously difficult to implement correctly, primarily because you cannot make certain (normally valid) assumptions about the state of the system during their execution. The following guidelines should be taken into careful consideration.

 Note that some of the guidelines apply not just to the `Finalize` method, but to any code called from a finalizer. In the case of the Basic <example-value> Pattern previously defined, this means logic that executes inside `Dispose(bool disposing)` when the `disposing` parameter is false.

 If the base class already is finalizable and implements the Basic <example-value> Pattern, you should not override `Finalize` again. You should instead just override the `Dispose(bool)` method to provide additional resource cleanup logic.

 The following code shows an example of a finalizable type:

```csharp
public class ComplexResourceHolder : IDisposable {

    private IntPtr buffer; // unmanaged memory buffer
    private SafeHandle resource; // disposable handle to a resource

    public ComplexResourceHolder() {
        this.buffer = ... // allocates memory
        this.resource = ... // allocates the resource
    }

    protected virtual void Dispose(bool disposing) {
        ReleaseBuffer(buffer); // release unmanaged memory
        if (disposing) { // release other disposable objects
            if (resource!= null) resource.Dispose();
        }
    }

    ~ComplexResourceHolder() {
        Dispose(false);
    }

    public void Dispose() {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}
```

 **X AVOID** making types finalizable.

 Carefully consider any case in which you think a finalizer is needed. There is a real cost associated with instances with finalizers, from both a performance and code complexity standpoint. Prefer using resource wrappers such as `System.Runtime.InteropServices.SafeHandle` to encapsulate unmanaged resources where possible, in which case a finalizer becomes unnecessary because the wrapper is responsible for its own resource cleanup.

 **X DO NOT** make value types finalizable.

 Only reference types actually get finalized by the CLR, and thus any attempt to place a finalizer on a value type will be ignored. The C# and C++ compilers enforce this rule.

 **✓ DO** make a type finalizable if the type is responsible for releasing an unmanaged resource that does not have its own finalizer.

 When implementing the finalizer, simply call `Dispose(false)` and place all resource cleanup logic inside the `Dispose(bool disposing)` method.

```csharp
public class ComplexResourceHolder : IDisposable {

    ~ComplexResourceHolder() {
        Dispose(false);
    }

    protected virtual void Dispose(bool disposing) {
        ...
    }
}
```

 **✓ DO** implement the Basic <example-value> Pattern on every finalizable type.

 This gives users of the type a means to explicitly perform deterministic cleanup of those same resources for which the finalizer is responsible.

 **X DO NOT** access any finalizable objects in the finalizer code path, because there is significant risk that they will have already been finalized.

 For example, a finalizable object A that has a reference to another finalizable object B cannot reliably use B in A’s finalizer, or vice versa. Finalizers are called in a random order (short of a weak ordering guarantee for critical finalization).

 Also, be aware that objects stored in static variables will get collected at certain points during an application domain unload or while exiting the process. Accessing a static variable that refers to a finalizable object (or calling a static method that might use values stored in static variables) might not be safe if `System.Environment.HasShutdownStarted` returns true.

 **✓ DO** make your `Finalize` method protected.

 C#, C++, and VB.NET developers do not need to worry about this, because the compilers help to enforce this guideline.

 **X DO NOT** let exceptions escape from the finalizer logic, except for system-critical failures.

 If an exception is thrown from a finalizer, the CLR will shut down the entire process (as of .NET Framework version 2.0), preventing other finalizers from executing and resources from being released in a controlled manner.

 **✓ CONSIDER** creating and using a critical finalizable object (a type with a type hierarchy that contains `System.Runtime.ConstrainedExecution.CriticalFinalizerObject`) for situations in which a finalizer absolutely must execute even in the face of forced application domain unloads and thread aborts.

 *Portions © 2005, 2009 Microsoft Corporation. All rights reserved.*

 *Reprinted by permission of Pearson Education, Inc. from Framework Design Guidelines: Conventions, Idioms, and Patterns for Reusable .NET Libraries, 2nd Edition by Krzysztof Cwalina and Brad Abrams, published Oct 22, 2008 by Addison-Wesley Professional as part of the Microsoft Windows Development Series.*

## See also

- `System.IDisposable.Dispose*`
- `System.Object.Finalize*`
- Framework Design Guidelines
- Common Design Patterns
- Garbage Collection
