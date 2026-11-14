---
title: "AsyncServiceScope struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/AsyncServiceScope.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncServiceScope struct

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public readonly struct AsyncServiceScope : IAsyncDisposable, IDisposable, Microsoft.Extensions.DependencyInjection.IServiceScope
```

An `IServiceScope` implementation that implements `IAsyncDisposable`.

To be added.

## AsyncServiceScope.AsyncServiceScope(IServiceScope) constructor

```csharp
public AsyncServiceScope (Microsoft.Extensions.DependencyInjection.IServiceScope serviceScope);
```

Initializes a new instance of the `AsyncServiceScope` struct.
Wraps an instance of `IServiceScope`.

Parameters:

- `serviceScope`: The `IServiceScope` instance to wrap.

To be added.

## AsyncServiceScope.ServiceProvider property

```csharp
public IServiceProvider ServiceProvider { get; }
```

The  used to resolve dependencies from the scope.

Returns: To be added.

To be added.

## AsyncServiceScope.Dispose() method

```csharp
public void Dispose ();
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.

To be added.

## AsyncServiceScope.DisposeAsync() method

```csharp
public System.Threading.Tasks.ValueTask DisposeAsync ();
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources asynchronously.

Returns: A task that represents the asynchronous dispose operation.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `AsyncServiceScope.Dispose`.
