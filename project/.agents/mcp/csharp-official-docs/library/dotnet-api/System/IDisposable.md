---
title: "IDisposable interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/IDisposable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IDisposable interface

Namespace: `System`

```csharp
public interface IDisposable
```

Provides a mechanism for releasing unmanaged resources.

The primary use of the `IDisposable` interface is to release unmanaged resources. The garbage collector automatically releases the memory allocated to a managed object when that object is no longer used. However, it's not possible to predict when garbage collection will occur. Furthermore, the garbage collector has no knowledge of unmanaged resources such as window handles, or open files and streams.

Use the `IDisposable.Dispose` method of this interface to explicitly release unmanaged resources in conjunction with the garbage collector. The consumer of an object can call this method when the object is no longer needed.

> **Warning:**
> It is a breaking change to add the `IDisposable` interface to an existing class. Because pre-existing consumers of your type cannot call `IDisposable.Dispose`, you cannot be certain that unmanaged resources held by your type will be released.

Because the `IDisposable.Dispose` implementation is called by the consumer of a type when the resources owned by an instance are no longer needed, you should either wrap the managed object in a `SafeHandle` (the recommended alternative), or you should override `Object.Finalize` to free unmanaged resources in the event that the consumer forgets to call `IDisposable.Dispose`.

For a detailed discussion about how this interface and the `Object.Finalize` method are used, see Garbage collection and Implementing a dispose method.

#### Use an object that implements IDisposable

If your app uses an object that implements the `IDisposable` interface, you should dispose of it when it's no longer needed. Depending on your programming language, you can do this in one of two ways:

- By using a language construct such as `using` in C#, `Using` in Visual Basic, or the `use` statement or `using` function in F#.
- By wrapping a call to the `IDisposable.Dispose` method in a `try`/`finally` block.

#### The C#, F#, and Visual Basic <example-value> statement

You can use a language construct such as the using statement in C#, the Using statement in Visual Basic, or the use statement in F# instead of explicitly calling `IDisposable.Dispose` yourself. The following example uses this approach in defining a `WordCount` class that preserves information about a file and the number of words in it.

_Code sample not included: ~/snippets/csharp/System/IDisposable/Overview/calling1.cs._

The `using` statement (`use` expression in F#) is actually a syntactic convenience. At compile time, the language compiler implements the intermediate language (IL) for a `try`/`finally` block.

For more information about the `using` statement, see using statement (C# reference) or Using statement (Visual Basic).

#### The try/finally block

If you prefer not to use a `using` statement or declaration, you can call `IDisposable.Dispose` from the `finally` block of a `try`/`finally` statement. The following example replaces the `using` block in the previous example with a `try`/`finally` block.

_Code sample not included: ~/snippets/csharp/System/IDisposable/Overview/calling2.cs._

For more information about the `try`/`finally` pattern, see try-finally (C#), Try...Catch...Finally statement (Visual Basic), or try...finally expression (F#).

#### Implement IDisposable

You should implement `IDisposable` if your type uses unmanaged resources directly or if you wish to use disposable resources yourself. The consumers of your type can call your `IDisposable.Dispose` implementation to free resources when the instance is no longer needed. To handle cases in which they fail to call `IDisposable.Dispose`, you should either use a class derived from `SafeHandle` to wrap the unmanaged resources, or you should override the `Object.Finalize` method for a reference type. In either case, you use the `IDisposable.Dispose` method to perform whatever cleanup is necessary after using the unmanaged resources, such as freeing, releasing, or resetting the unmanaged resources. For more information about implementing `IDisposable.Dispose`, see the Dispose(bool) method overload.

> **Important:**
> If you're defining a base class that uses unmanaged resources and that either has, or is likely to have, subclasses that should be disposed, you should implement the `IDisposable.Dispose` method and provide a second overload of `Dispose`, as discussed in the next section.

#### IDisposable and the inheritance hierarchy

A base class with subclasses that should be disposable must implement `IDisposable` as follows. You should use this pattern whenever you implement `IDisposable` on any type that isn't `sealed` (`NotInheritable` in Visual Basic).

- It should provide one public, non-virtual `Dispose` method and a protected virtual `Dispose(Boolean disposing)` method.
- The `Dispose` method must call `Dispose(true)` and should suppress finalization for performance.
- The base type should not include any finalizers.

The following code fragment reflects the dispose pattern for base classes. It assumes that your type does not override the `Object.Finalize` method.

_Code sample not included: ~/snippets/csharp/System/IDisposable/Overview/base1.cs._

If you do override the `Object.Finalize` method, your class should implement the following pattern.

_Code sample not included: ~/snippets/csharp/System/IDisposable/Overview/base2.cs._

Subclasses should implement the disposable pattern as follows:

- They must override `Dispose(Boolean)` and call the base class `Dispose(Boolean)` implementation.
- They can provide a finalizer if needed. The finalizer must call `Dispose(false)`.

Note that derived classes do not themselves implement the `IDisposable` interface and do not include a parameterless `IDisposable.Dispose` method. They only override the base class `Dispose(Boolean)` method.

The following code fragment reflects the dispose pattern for derived classes. It assumes that your type does not override the `Object.Finalize` method.

_Code sample not included: ~/snippets/csharp/System/IDisposable/Overview/derived1.cs._

The following example demonstrates how to create a resource class that implements the `IDisposable` interface.

_Code sample not included: ~/snippets/csharp/System/IDisposable/Overview/idisposabledispose.cs._

## IDisposable.Dispose() method

```csharp
public void Dispose ();
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.

#### Remarks

Use this method to close or release unmanaged resources such as files, streams, and handles held by an instance of the class that implements this interface. By convention, this method is used for all tasks associated with freeing resources held by an object, or preparing an object for reuse.

> **Warning:**
> If you're using a class that implements the `IDisposable` interface, you should call its `IDisposable.Dispose` implementation when you're finished using the class. For more information, see Use an object that implements IDisposable.

When implementing this method, ensure that all held resources are freed by propagating the call through the containment hierarchy. For example, if an object A allocates an object B, and object B allocates an object C, then A's `IDisposable.Dispose` implementation must call `IDisposable.Dispose` on B, which must in turn call `IDisposable.Dispose` on C.

An object must also call the `IDisposable.Dispose` method of its base class if the base class implements `IDisposable`. For more information about implementing `IDisposable` on a base class and its subclasses, see IDisposable and the inheritance hierarchy.

If an object's `IDisposable.Dispose` method is called more than once, the object must ignore all calls after the first one. The object must not throw an exception if its `IDisposable.Dispose` method is called multiple times. Instance methods other than `IDisposable.Dispose` can throw an `ObjectDisposedException` when resources are already disposed.

Users might expect a resource type to use a particular convention to denote an allocated state versus a freed state. An example of this is stream classes, which are traditionally thought of as open or closed. The implementer of a class that has such a convention might choose to implement a public method with a customized name, such as `Close`, that calls the `IDisposable.Dispose` method.

Because the `IDisposable.Dispose` method must be called explicitly, there is always a danger that the unmanaged resources will not be released, because the consumer of an object fails to call its `IDisposable.Dispose` method. There are two ways to avoid this:

- Wrap the managed resource in an object derived from `SafeHandle`. Your `IDisposable.Dispose` implementation then calls the `IDisposable.Dispose` method of the `SafeHandle` instances. For more information, see The SafeHandle alternative.
- Implement a finalizer to free resources when `IDisposable.Dispose` is not called. By default, the garbage collector automatically calls an object's finalizer before reclaiming its memory. However, if the `IDisposable.Dispose` method has been called, it is typically unnecessary for the garbage collector to call the disposed object's finalizer. To prevent automatic finalization, `IDisposable.Dispose` implementations can call the `GC.SuppressFinalize` method.

When you use an object that accesses unmanaged resources, such as a `StreamWriter`, a good practice is to create the instance with a `using` statement. The `using` statement automatically closes the stream and calls `IDisposable.Dispose` on the object when the code that is using it has completed. For an example, see the `StreamWriter` class.

#### Examples

The following example shows how you can implement the `IDisposable.Dispose` method.

_Code sample not included: ~/snippets/csharp/System/IDisposable/Overview/idisposabledispose.cs._
