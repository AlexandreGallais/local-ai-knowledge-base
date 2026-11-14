---
title: "IAsyncDisposable interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/IAsyncDisposable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IAsyncDisposable interface

Namespace: `System`

```csharp
public interface IAsyncDisposable
```

Provides a mechanism for releasing unmanaged resources asynchronously.

In .NET, classes that own unmanaged resources usually implement the `IDisposable` interface to provide a mechanism for releasing unmanaged resources synchronously. However, in some cases they need to provide an asynchronous mechanism for releasing unmanaged resources in addition to (or instead of) the synchronous one. Providing such a mechanism enables the consumer to perform resource-intensive dispose operations without blocking the main thread of a GUI application for a long time.

The `IAsyncDisposable.DisposeAsync` method of this interface returns a `ValueTask` that represents the asynchronous dispose operation. Classes that own unmanaged resources implement this method, and the consumer of these classes calls this method on an object when it is no longer needed.

The async methods are used in conjunction with the `async` and `await` keywords in C# and Visual Basic. For more information, see The Task asynchronous programming model in C# or Asynchronous Programming with Async and Await (Visual Basic).

#### Use an object that implements IAsyncDisposable

If your application uses an object that implements `IAsyncDisposable`, you should call the object's `IAsyncDisposable.DisposeAsync` implementation when you are finished using it. To make sure resources are released even in case of an exception, put the code that uses the `IAsyncDisposable` object into the using statement (in C# beginning from version 8.0) or call the `IAsyncDisposable.DisposeAsync` method inside a `finally` clause of the `try`/`finally` statement. For more information about the `try`/`finally` pattern, see try-finally (C#) or Try...Catch...Finally Statement (Visual Basic).

#### Implement IAsyncDisposable

You might implement `IAsyncDisposable` in the following situations:

- When developing an asynchronous enumerator that owns unmanaged resources. Asynchronous enumerators are used with the C# 8.0 async streams feature. For more information about async streams, see Tutorial: Generate and consume async streams.
- When your class owns unmanaged resources and releasing them requires a resource-intensive I/O operation, such as flushing the contents of an intermediate buffer into a file or sending a packet over a network to close a connection.

Use the `IAsyncDisposable.DisposeAsync` method to perform whatever cleanup is necessary after using the unmanaged resources, such as freeing, releasing, or resetting the unmanaged resources. For more information, see Implement a DisposeAsync method.

## IAsyncDisposable.DisposeAsync() method

```csharp
public System.Threading.Tasks.ValueTask DisposeAsync ();
```

Performs application-defined tasks associated with freeing, releasing, or
resetting unmanaged resources asynchronously.

Returns: A task that represents the asynchronous dispose operation.

#### Remarks

Use this method to asynchronously close or release unmanaged resources such as files, streams, and handles held by an instance of the class that implements this interface. Using this method instead of `IDisposable.Dispose` enables you to perform a resource-intensive dispose operation without blocking the main thread of a GUI application for a long time.

> **Warning:**
>  If you are using a class that implements the `IAsyncDisposable` interface, you should call its `DisposeAsync` implementation when you are finished using the class. For more information, see the "Using an object that implements IAsyncDisposable" section in the `IAsyncDisposable` topic.

When implementing this method, ensure that all held resources are freed by propagating the call through the containment hierarchy. For example, if an object A allocates an object B, and object B allocates an object C, then A's `DisposeAsync` implementation must call `DisposeAsync` on B, which must in turn call `DisposeAsync` on C. An object must also call the `DisposeAsync` method of its base class if the base class implements `IAsyncDisposable`.

If an object's `DisposeAsync` method is called more than once, the object must ignore all calls after the first one and synchronously return a successfully completed `ValueTask`. The object must not throw an exception if its `DisposeAsync` method is called multiple times. Instance methods other than `DisposeAsync` can throw an `ObjectDisposedException` when resources are already disposed.
