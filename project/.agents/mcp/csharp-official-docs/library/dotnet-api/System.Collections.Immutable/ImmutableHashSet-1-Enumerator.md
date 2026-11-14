---
title: "ImmutableHashSet<T>+Enumerator struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableHashSet`1+Enumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableHashSet<T>+Enumerator struct

Namespace: `System.Collections.Immutable`

```csharp
public struct ImmutableHashSet<T>.Enumerator : System.Collections.Generic.IEnumerator<T>
```

Enumerates the contents of the immutable hash set without allocating any memory.

To be added.

## ImmutableHashSet<T>+Enumerator.Current property

```csharp
public T Current { get; }
```

Gets the element at the current position of the enumerator.

Returns: The element at the current position of the enumerator.

To be added.

## ImmutableHashSet<T>+Enumerator.System.Collections.IEnumerator.Current property

```csharp
object? System.Collections.IEnumerator.Current { get; }
```

Gets the current element.

Returns: The element in the collection at the current position of the enumerator.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Enumerator` instance is cast to an `IEnumerator` interface.

## ImmutableHashSet<T>+Enumerator.Dispose() method

```csharp
public void Dispose ();
```

Releases the resources used by the current instance of the `Enumerator` class.

To be added.

## ImmutableHashSet<T>+Enumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next element of the immutable hash set.

Returns: `true` if the enumerator was successfully advanced to the next element; `false` if the enumerator has passed the end of the hash set.

Exceptions:

- `InvalidOperationException`: The hash set was modified after the enumerator was created.

To be added.

## ImmutableHashSet<T>+Enumerator.Reset() method

```csharp
public void Reset ();
```

Sets the enumerator to its initial position, which is before the first element in the hash set.

Exceptions:

- `InvalidOperationException`: The hash set was modified after the enumerator was created.

To be added.
