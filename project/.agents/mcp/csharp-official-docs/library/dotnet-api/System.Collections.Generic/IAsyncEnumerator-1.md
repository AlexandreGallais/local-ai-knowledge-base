---
title: "IAsyncEnumerator<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/IAsyncEnumerator`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IAsyncEnumerator<T> interface

Namespace: `System.Collections.Generic`

```csharp
public interface IAsyncEnumerator<out T> : IAsyncDisposable where T : allows ref struct
```

Supports a simple asynchronous iteration over a generic collection.

Parameters:

- `T`: The type of objects to enumerate.

To be added.

## IAsyncEnumerator<T>.Current property

```csharp
public T Current { get; }
```

Gets the element in the collection at the current position of the enumerator.

Returns: The element in the collection at the current position of the enumerator.

To be added.

## IAsyncEnumerator<T>.MoveNextAsync() method

```csharp
public System.Threading.Tasks.ValueTask<bool> MoveNextAsync ();
```

Advances the enumerator asynchronously to the next element of the collection.

Returns: A `ValueTask<T>` that will complete with a result of `true` if the enumerator
was successfully advanced to the next element, or `false` if the enumerator has passed the end
of the collection.

To be added.
