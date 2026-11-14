---
title: "IAsyncEnumerable<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/IAsyncEnumerable`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IAsyncEnumerable<T> interface

Namespace: `System.Collections.Generic`

```csharp
public interface IAsyncEnumerable<out T> where T : allows ref struct
```

Exposes an enumerator that provides asynchronous iteration over values of a specified type.

Parameters:

- `T`: The type of values to enumerate.

To be added.

## IAsyncEnumerable<T>.GetAsyncEnumerator(CancellationToken) method

```csharp
public System.Collections.Generic.IAsyncEnumerator<out T> GetAsyncEnumerator (System.Threading.CancellationToken <example-value> = default);
```

Returns an enumerator that iterates asynchronously through the collection.

Parameters:

- `cancellationToken`: A `CancellationToken` that may be used to cancel the asynchronous iteration.

Returns: An enumerator that can be used to iterate asynchronously through the collection.

To be added.
