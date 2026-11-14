---
title: "Finalizers"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/programming-guide/classes-and-structs/finalizers.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Finalizers (C# Programming Guide)

Finalizers (historically referred to as **destructors**) are used to perform any necessary final clean-up when a class instance is being collected by the garbage collector. In most cases, you can avoid writing a finalizer by using the  `System.Runtime.InteropServices.SafeHandle` or derived classes to wrap any unmanaged handle.

## Remarks

- Finalizers cannot be defined in structs. They are only used with classes.
- A class can only have one finalizer.
- Finalizers cannot be inherited or overloaded.
- Finalizers cannot be called. They are invoked automatically.
- A finalizer does not take modifiers or have parameters.

For example, the following is a declaration of a finalizer for the `Car` class.

```csharp
class First
{
    ~First()
    {
        System.Diagnostics.Trace.WriteLine("First's finalizer is called.");
    }
}

class Second : First
{
    ~Second()
    {
        System.Diagnostics.Trace.WriteLine("Second's finalizer is called.");
    }
}

class Third : Second
{
    ~Third()
    {
        System.Diagnostics.Trace.WriteLine("Third's finalizer is called.");
    }
}

/* 
Test with code like the following:
    Third t = new Third();
    t = null;

When objects are finalized, the output would be:
Third's finalizer is called.
Second's finalizer is called.
First's finalizer is called.
*/

class Car
{
    ~Car()  // finalizer
    {
        // cleanup statements...
    }
}
```
A finalizer can also be implemented as an expression body definition, as the following example shows.

```csharp
public class Destroyer
{
   public override string ToString() => GetType().Name;

   ~Destroyer() => Console.WriteLine($"The {ToString()} finalizer is executing.");
}

class Program
{
   static void Main()
   {
        var destroyer = new Destroyer();
        destroyer = null;
        GC.GetTotalMemory(forceFullCollection: true);
        Console.WriteLine("Exiting...");
    }
}
```
The finalizer implicitly calls `System.Object.Finalize*` on the base class of the object. Therefore, a call to a finalizer is implicitly translated to the following code:

```csharp
protected override void Finalize()
{
    try
    {
        // Cleanup statements...
    }
    finally
    {
        base.Finalize();
    }
}
```

This design means that the `Finalize` method is called recursively for all instances in the inheritance chain, from the most-derived to the least-derived.

> **Note:**
> Empty finalizers should not be used. When a class contains a finalizer, an entry is created in the `Finalize` queue. This queue is processed by the garbage collector. When the GC processes the queue, it calls each finalizer. Unnecessary finalizers, including empty finalizers, finalizers that only call the base class finalizer, or finalizers that only call conditionally emitted methods, cause a needless loss of performance.

The programmer has no control over when the finalizer is called; the garbage collector decides when to call it. The garbage collector checks for objects that are no longer being used by the application. If it considers an object eligible for finalization, it calls the finalizer (if any) and reclaims the memory used to store the object. It's possible to force garbage collection by calling `System.GC.Collect*`, but most of the time, this call should be avoided because it may create performance issues.

> **Note:**
> Whether or not finalizers are run as part of application termination is specific to each implementation of .NET. When an application terminates, .NET Framework makes every reasonable effort to call finalizers for objects that haven't yet been garbage collected, unless such cleanup has been suppressed (by a call to the library method `GC.SuppressFinalize`, for example). .NET 5 (including .NET Core) and later versions don't call finalizers as part of application termination. For more information, see GitHub issue dotnet/csharpstandard #291.

 If you need to perform cleanup reliably when an application exits, register a handler for the `System.AppDomain.ProcessExit` event. That handler would ensure `System.IDisposable.Dispose` (or, `System.IAsyncDisposable.DisposeAsync`) has been called for all objects that require cleanup before application exit. Because you can't call *Finalize* directly, and you can't guarantee the garbage collector calls all finalizers before exit, you must use `Dispose` or `DisposeAsync` to ensure resources are freed.

## Using finalizers to release resources

In general, C# does not require as much memory management on the part of the developer as languages that don't target a runtime with garbage collection. This is because the .NET garbage collector implicitly manages the allocation and release of memory for your objects. However, when your application encapsulates unmanaged resources, such as windows, files, and network connections, you should use finalizers to free those resources. When the object is eligible for finalization, the garbage collector runs the `Finalize` method of the object.

> **Warning:**
> Don't access managed object members from a finalizer. During finalization, managed objects might already be disposed, making them unavailable or in an invalid state. Only access unmanaged resources directly from finalizers.

## Explicit release of resources

If your application is using an expensive external resource, we also recommend that you provide a way to explicitly release the resource before the garbage collector frees the object. To release the resource, implement a `Dispose` method from the `System.IDisposable` interface that performs the necessary cleanup for the object. This can considerably improve the performance of the application. Even with this explicit control over resources, the finalizer becomes a safeguard to clean up resources if the call to the `Dispose` method fails.

For more information about cleaning up resources, see the following articles:

- Cleaning Up Unmanaged Resources
- Implementing a Dispose Method
- Implementing a DisposeAsync Method
- `using` statement

## Example

The following example creates three classes that make a chain of inheritance. The class `First` is the base class, `Second` is derived from `First`, and `Third` is derived from `Second`. All three have finalizers. In `Main`, an instance of the most-derived class is created. The output from this code depends on which implementation of .NET the application targets:

* .NET Framework: The output shows that the finalizers for the three classes are called automatically when the application terminates, in order from the most-derived to the least-derived.
* .NET 5 (including .NET Core) or a later version: There's no output, because this implementation of .NET doesn't call finalizers when the application terminates.

```csharp
class First
{
    ~First()
    {
        System.Diagnostics.Trace.WriteLine("First's finalizer is called.");
    }
}

class Second : First
{
    ~Second()
    {
        System.Diagnostics.Trace.WriteLine("Second's finalizer is called.");
    }
}

class Third : Second
{
    ~Third()
    {
        System.Diagnostics.Trace.WriteLine("Third's finalizer is called.");
    }
}

/* 
Test with code like the following:
    Third t = new Third();
    t = null;

When objects are finalized, the output would be:
Third's finalizer is called.
Second's finalizer is called.
First's finalizer is called.
*/

class Car
{
    ~Car()  // finalizer
    {
        // cleanup statements...
    }
}
```
## C# language specification

For more information, see the Finalizers section of the C# Language Specification.

## See also

- `System.IDisposable`
- Constructors
- Garbage Collection
