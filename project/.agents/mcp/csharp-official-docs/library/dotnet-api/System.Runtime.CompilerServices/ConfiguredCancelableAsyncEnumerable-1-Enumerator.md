---
title: "ConfiguredCancelableAsyncEnumerable<T>+Enumerator struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/ConfiguredCancelableAsyncEnumerable`1+Enumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfiguredCancelableAsyncEnumerable<T>+Enumerator struct

Namespace: `System.Runtime.CompilerServices`

```csharp
public readonly struct ConfiguredCancelableAsyncEnumerable<T>.Enumerator where T : allows ref struct
```

Provides an awaitable async enumerator that enables cancelable iteration and configured awaits.

Parameters:

- `T`: The type of values to enumerate.

To be added.

## ConfiguredCancelableAsyncEnumerable<T>+Enumerator.Current property

```csharp
public T Current { get; }
```

Gets the element in the collection at the current position of the enumerator.

Returns: The element in the collection at the current position of the enumerator.

To be added.

## ConfiguredCancelableAsyncEnumerable<T>+Enumerator.DisposeAsync() method

```csharp
public System.Runtime.CompilerServices.ConfiguredValueTaskAwaitable DisposeAsync ();
```

Performs application-defined tasks associated with freeing, releasing, or
resetting unmanaged resources asynchronously.

Returns: A task that represents the asynchronous dispose operation.

To be added.

## ConfiguredCancelableAsyncEnumerable<T>+Enumerator.MoveNextAsync() method

```csharp
public System.Runtime.CompilerServices.ConfiguredValueTaskAwaitable<bool> MoveNextAsync ();
```

Advances the enumerator asynchronously to the next element of the collection.

Returns: A `ConfiguredValueTaskAwaitable<T>` that will complete with a result of `true`
if the enumerator was successfully advanced to the next element, or `false` if the enumerator has
passed the end of the collection.

To be added.
