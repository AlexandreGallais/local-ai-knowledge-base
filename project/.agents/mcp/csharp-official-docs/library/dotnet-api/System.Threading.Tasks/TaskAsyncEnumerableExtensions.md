---
title: "TaskAsyncEnumerableExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/TaskAsyncEnumerableExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaskAsyncEnumerableExtensions class

Namespace: `System.Threading.Tasks`

```csharp
public static class TaskAsyncEnumerableExtensions
```

Provides a set of static methods for configuring `Task`-related behaviors on asynchronous enumerables and disposables.

To be added.

## TaskAsyncEnumerableExtensions.ConfigureAwait(IAsyncDisposable, Boolean) method

```csharp
public static System.Runtime.CompilerServices.ConfiguredAsyncDisposable ConfigureAwait (this IAsyncDisposable source, bool continueOnCapturedContext);
```

Configures how awaits on the tasks returned from an async disposable will be performed.

Parameters:

- `source`: The source async disposable.
- `continueOnCapturedContext`: Whether to capture and marshal back to the current context.

Returns: The configured async disposable.

To be added.

## TaskAsyncEnumerableExtensions.ConfigureAwait<T>(IAsyncEnumerable<T>, Boolean) method

```csharp
public static System.Runtime.CompilerServices.ConfiguredCancelableAsyncEnumerable<T> ConfigureAwait<T> (this System.Collections.Generic.IAsyncEnumerable<T> source, bool continueOnCapturedContext) where T : allows ref struct;
```

Configures how awaits on the tasks returned from an async iteration will be performed.

Parameters:

- `T`: The type of the objects being iterated.
- `source`: The source enumerable being iterated.
- `continueOnCapturedContext`: Whether to capture and marshal back to the current context.

Returns: The configured enumerable.

To be added.

## TaskAsyncEnumerableExtensions.ToBlockingEnumerable<T>(IAsyncEnumerable<T>, CancellationToken) method

```csharp
public static System.Collections.Generic.IEnumerable<T> ToBlockingEnumerable<T> (this System.Collections.Generic.IAsyncEnumerable<T> source, System.Threading.CancellationToken <example-value> = default);
```

Converts an `IAsyncEnumerable<T>` instance into an `IEnumerable<T>` that enumerates elements in a blocking manner.

Parameters:

- `T`: The type of the objects being iterated.
- `source`: The source enumerable being iterated.
- `cancellationToken`: The `CancellationToken` to use.

Returns: An `IEnumerable<T>` instance that enumerates the source `IAsyncEnumerable<T>` in a blocking manner.

#### Remarks

This method is implemented by using deferred execution. The underlying `IAsyncEnumerable<T>` will not be enumerated
unless the returned `IEnumerable<T>` is enumerated by calling its `GetEnumerator` method.
Async enumeration does not happen in the background; each MoveNext call will invoke the underlying `MoveNextAsync` exactly once.

## TaskAsyncEnumerableExtensions.WithCancellation<T>(IAsyncEnumerable<T>, CancellationToken) method

```csharp
public static System.Runtime.CompilerServices.ConfiguredCancelableAsyncEnumerable<T> WithCancellation<T> (this System.Collections.Generic.IAsyncEnumerable<T> source, System.Threading.CancellationToken <example-value>) where T : allows ref struct;
```

Sets the `CancellationToken` to be passed to `IAsyncEnumerable<T>.GetAsyncEnumerator` when iterating.

Parameters:

- `T`: The type of the objects being iterated.
- `source`: The source enumerable being iterated.
- `cancellationToken`: The `CancellationToken` to use.

Returns: The configured enumerable.

To be added.
