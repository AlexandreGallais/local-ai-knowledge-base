---
title: "ConfiguredCancelableAsyncEnumerable<T> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/ConfiguredCancelableAsyncEnumerable`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfiguredCancelableAsyncEnumerable<T> struct

Namespace: `System.Runtime.CompilerServices`

```csharp
public readonly struct ConfiguredCancelableAsyncEnumerable<T> where T : allows ref struct
```

Provides an awaitable async enumerable that enables cancelable iteration and configured awaits.

Parameters:

- `T`: The type of values to enumerate.

To be added.

## ConfiguredCancelableAsyncEnumerable<T>.ConfigureAwait(Boolean) method

```csharp
public System.Runtime.CompilerServices.ConfiguredCancelableAsyncEnumerable<T> ConfigureAwait (bool continueOnCapturedContext);
```

Configures how awaits on the tasks returned from an async iteration will be performed.

Parameters:

- `continueOnCapturedContext`: Whether to capture and marshal back to the current context.

Returns: The configured enumerable.

This will replace any previous value set by `ConfiguredCancelableAsyncEnumerable<T>.ConfigureAwait` for this iteration.

## ConfiguredCancelableAsyncEnumerable<T>.GetAsyncEnumerator() method

```csharp
public System.Runtime.CompilerServices.ConfiguredCancelableAsyncEnumerable<T>.Enumerator GetAsyncEnumerator ();
```

Returns an enumerator that iterates asynchronously through collections that enables cancelable iteration and configured awaits.

Returns: An enumerator for the `ConfiguredCancelableAsyncEnumerable<T>` class.

To be added.

## ConfiguredCancelableAsyncEnumerable<T>.WithCancellation(CancellationToken) method

```csharp
public System.Runtime.CompilerServices.ConfiguredCancelableAsyncEnumerable<T> WithCancellation (System.Threading.CancellationToken <example-value>);
```

Sets the `CancellationToken` to be passed to `IAsyncEnumerable<T>.GetAsyncEnumerator` when iterating.

Parameters:

- `cancellationToken`: The `CancellationToken` to use.

Returns: The configured enumerable.

This will replace any previous `CancellationToken` set by `ConfiguredCancelableAsyncEnumerable<T>.WithCancellation` for this iteration.
