---
title: "ImmutableDictionary<TKey,TValue>+Enumerator struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableDictionary`2+Enumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableDictionary<TKey,TValue>+Enumerator struct

Namespace: `System.Collections.Immutable`

```csharp
public struct ImmutableDictionary<TKey,TValue>.Enumerator : System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<TKey,TValue>>
```

Enumerates the contents of the immutable dictionary without allocating any memory.

To be added.

## ImmutableDictionary<TKey,TValue>+Enumerator.Current property

```csharp
public System.Collections.Generic.KeyValuePair<TKey,TValue> Current { get; }
```

Gets the element at the current position of the enumerator.

Returns: The element in the dictionary at the current position of the enumerator.

To be added.

## ImmutableDictionary<TKey,TValue>+Enumerator.System.Collections.IEnumerator.Current property

```csharp
object System.Collections.IEnumerator.Current { get; }
```

Gets the current element.

Returns: Current element in enumeration.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Enumerator` instance is cast to an `IEnumerator` interface.

## ImmutableDictionary<TKey,TValue>+Enumerator.Dispose() method

```csharp
public void Dispose ();
```

Releases the resources used by the current instance of the `Enumerator` class.

To be added.

## ImmutableDictionary<TKey,TValue>+Enumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next element of the immutable dictionary.

Returns: `true` if the enumerator was successfully advanced to the next element; `false` if the enumerator has passed the end of the dictionary.

Exceptions:

- `InvalidOperationException`: The dictionary was modified after the enumerator was created.

To be added.

## ImmutableDictionary<TKey,TValue>+Enumerator.Reset() method

```csharp
public void Reset ();
```

Sets the enumerator to its initial position, which is before the first element in the dictionary.

Exceptions:

- `InvalidOperationException`: The dictionary was modified after the enumerator was created.

To be added.
