---
title: "Dispose Pattern (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/design-guidelines/dispose-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Dispose Pattern

> **Note:**
> This content is reprinted by permission of Pearson Education, Inc. from *Framework Design Guidelines: Conventions, Idioms, and Patterns for Reusable .NET Libraries, 2nd Edition*. That edition was published in 2008, and the book has since been fully revised in the third edition. Some of the information on this page may be out-of-date.

All programs acquire one or more system resources, such as memory, system handles, or database connections, during the course of their execution. Developers have to be careful when using such system resources, because they must be released after they have been acquired and used.

 The CLR provides support for automatic memory management. Managed memory (memory allocated using the C# operator `new`) does not need to be explicitly released. It is released automatically by the garbage collector (GC). This frees developers from the tedious and difficult task of releasing memory and has been one of the main reasons for the unprecedented productivity afforded by the .NET Framework.

 Unfortunately, managed memory is just one of many types of system resources. Resources other than managed memory still need to be released explicitly and are referred to as unmanaged resources. The GC was specifically not designed to manage such unmanaged resources, which means that the responsibility for managing unmanaged resources lies in the hands of the developers.

 The CLR provides some help in releasing unmanaged resources. `System.Object` declares a virtual method `System.Object.Finalize*` (also called the finalizer) that is called by the GC before the object’s memory is reclaimed by the GC and can be overridden to release unmanaged resources. Types that override the finalizer are referred to as finalizable types.

 Although finalizers are effective in some cleanup scenarios, they have two significant drawbacks:

- The finalizer is called when the GC detects that an object is eligible for collection. This happens at some undetermined period of time after the resource is not needed anymore. The delay between when the developer could or would like to release the resource and the time when the resource is actually released by the finalizer might be unacceptable in programs that acquire many scarce resources (resources that can be easily exhausted) or in cases in which resources are costly to keep in use (e.g., large unmanaged memory buffers).

- When the CLR needs to call a finalizer, it must postpone collection of the object’s memory until the next round of garbage collection (the finalizers run between collections). This means that the object’s memory (and all objects it refers to) will not be released for a longer period of time.

 Therefore, relying exclusively on finalizers might not be appropriate in many scenarios when it is important to reclaim unmanaged resources as quickly as possible, when dealing with scarce resources, or in highly performant scenarios in which the added GC overhead of finalization is unacceptable.

 The Framework provides the `System.IDisposable` interface that should be implemented to provide the developer a manual way to release unmanaged resources as soon as they are not needed. It also provides the `System.GC.SuppressFinalize*` method that can tell the GC that an object was manually disposed of and does not need to be finalized anymore, in which case the object’s memory can be reclaimed earlier. Types that implement the `IDisposable` interface are referred to as disposable types.

 The Dispose Pattern is intended to standardize the usage and implementation of finalizers and the `IDisposable` interface.

 The main motivation for the pattern is to reduce the complexity of the implementation of the `System.Object.Finalize*` and the `System.IDisposable.Dispose*` methods. The complexity stems from the fact that the methods share some but not all code paths (the differences are described later in the chapter). In addition, there are historical reasons for some elements of the pattern related to the evolution of language support for deterministic resource management.

 **✓ DO** implement the Basic <example-value> Pattern on types containing instances of disposable types. See the Basic <example-value> Pattern section for details on the basic pattern.

 If a type is responsible for the lifetime of other disposable objects, developers need a way to dispose of them, too. Using the container’s `Dispose` method is a convenient way to make this possible.

 **✓ DO** implement the Basic <example-value> Pattern and provide a finalizer on types holding resources that need to be freed explicitly and that do not have finalizers.

 For example, the pattern should be implemented on types storing unmanaged memory buffers. The Finalizable Types section discusses guidelines related to implementing finalizers.

 **✓ CONSIDER** implementing the Basic <example-value> Pattern on classes that themselves don’t hold unmanaged resources or disposable objects but are likely to have subtypes that do.

 A great example of this is the `System.IO.Stream` class. Although it is an abstract base class that doesn’t hold any resources, most of its subclasses do and because of this, it implements this pattern.

## Basic <example-value> Pattern

 The basic <example-value> of the pattern involves implementing the `System.IDisposable` interface and declaring the `Dispose(bool)` method that implements all resource cleanup logic to be shared between the `Dispose` method and the optional finalizer.

 The following example shows a simple implementation of the basic <example-value>:

```csharp
public class DisposableResourceHolder : IDisposable {

    private SafeHandle resource; // handle to a resource

    public DisposableResourceHolder() {
        this.resource = ... // allocates the resource
    }

    public void Dispose() {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing) {
        if (disposing) {
            if (resource!= null) resource.Dispose();
        }
    }
}
```

 The Boolean parameter `disposing` indicates whether the method was invoked from the `IDisposable.Dispose` implementation or from the finalizer. The `Dispose(bool)` implementation should check the parameter before accessing other reference objects (e.g., the resource field in the preceding sample). Such objects should only be accessed when the method is called from the `IDisposable.Dispose` implementation (when the `disposing` parameter is equal to true). If the method is invoked from the finalizer (`disposing` is false), other objects should not be accessed. The reason is that objects are finalized in an unpredictable order and so they, or any of their dependencies, might already have been finalized.

 Also, this section applies to classes with a base that does not already implement the Dispose Pattern. If you are inheriting from a class that already implements the pattern, simply override the `Dispose(bool)` method to provide additional resource cleanup logic.

 **✓ DO** declare a `protected virtual void Dispose(bool disposing)` method to centralize all logic related to releasing unmanaged resources.

 All resource cleanup should occur in this method. The method is called from both the finalizer and the `IDisposable.Dispose` method. The parameter will be false if being invoked from inside a finalizer. It should be used to ensure any code running during finalization is not accessing other finalizable objects. Details of implementing finalizers are described in the next section.

```csharp
protected virtual void Dispose(bool disposing) {
    if (disposing) {
        if (resource!= null) resource.Dispose();
    }
}
```

 **✓ DO** implement the `IDisposable` interface by simply calling `Dispose(true)` followed by `GC.SuppressFinalize(this)`.

 The call to `SuppressFinalize` should only occur if `Dispose(true)` executes successfully.

```csharp
public void Dispose(){
    Dispose(true);
    GC.SuppressFinalize(this);
}
```

 **X DO NOT** make the parameterless `Dispose` method virtual.

 The `Dispose(bool)` method is the one that should be overridden by subclasses.

```csharp
// bad design
public class DisposableResourceHolder : IDisposable {
    public virtual void Dispose() { ... }
    protected virtual void Dispose(bool disposing) { ... }
}

// good design
public class DisposableResourceHolder : IDisposable {
    public void Dispose() { ... }
    protected virtual void Dispose(bool disposing) { ... }
}
```

 **X DO NOT** declare any overloads of the `Dispose` method other than `Dispose()` and `Dispose(bool)`.

 `Dispose` should be considered a reserved word to help codify this pattern and prevent confusion among implementers, users, and compilers. Some languages might choose to automatically implement this pattern on certain types.

 **✓ DO** allow the `Dispose(bool)` method to be called more than once. The method might choose to do nothing after the first call.

```csharp
public class DisposableResourceHolder : IDisposable {

    bool disposed = false;

    protected virtual void Dispose(bool disposing) {
        if (disposed) return;
        // cleanup
        ...
        disposed = true;
    }
}
```

 **X AVOID** throwing an exception from within `Dispose(bool)` except under critical situations where the containing process has been corrupted (leaks, inconsistent shared state, etc.).

 Users expect that a call to `Dispose` will not raise an exception.

 If `Dispose` could raise an exception, further finally-block cleanup logic will not execute. To work around this, the user would need to wrap every call to `Dispose` (within the finally block!) in a try block, which leads to very complex cleanup handlers. If executing a `Dispose(bool disposing)` method, never throw an exception if disposing is false. Doing so will terminate the process if executing inside a finalizer context.

 **✓ DO** throw an `System.ObjectDisposedException` from any member that cannot be used after the object has been disposed of.

```csharp
public class DisposableResourceHolder : IDisposable {
    bool disposed = false;
    SafeHandle resource; // handle to a resource

    public void DoSomething() {
        if (disposed) throw new ObjectDisposedException(...);
        // now call some native methods using the resource
        ...
    }
    protected virtual void Dispose(bool disposing) {
        if (disposed) return;
        // cleanup
        ...
        disposed = true;
    }
}
```

 **✓ CONSIDER** providing method `Close()`, in addition to the `Dispose()`, if close is standard terminology in the area.

 When doing so, it is important that you make the `Close` implementation identical to `Dispose` and consider implementing the `IDisposable.Dispose` method explicitly.

```csharp
public class Stream : IDisposable {
    IDisposable.Dispose() {
        Close();
    }
    public void Close() {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}
```
