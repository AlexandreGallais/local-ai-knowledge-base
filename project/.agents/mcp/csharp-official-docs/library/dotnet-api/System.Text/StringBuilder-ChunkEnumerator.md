---
title: "StringBuilder+ChunkEnumerator struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/StringBuilder+ChunkEnumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringBuilder+ChunkEnumerator struct

Namespace: `System.Text`

```csharp
public struct StringBuilder.ChunkEnumerator
```

Supports simple iteration over the chunks of a `StringBuilder` instance.

#### Remarks

A `ChunkEnumerator` is returned by the `StringBuilder.GetChunks` method. It supports both the `IEnumerable` and `IEnumerator` patterns so that the chunks can be enumerated with `foreach` in C# or `For Each` in Visual Basic.

`ChunkEnumerator` is a public structure so that language compilers can use it to build a `foreach` statement. However, developers typically don't use it explicitly (which is why it is a nested type).

## StringBuilder+ChunkEnumerator.Current property

```csharp
public ReadOnlyMemory<char> Current { get; }
```

Gets the chunk and the current position of the collection.

Returns: The chunk at the current position of the collection.

To be added.

## StringBuilder+ChunkEnumerator.GetEnumerator() method

```csharp
public System.Text.StringBuilder.ChunkEnumerator GetEnumerator ();
```

Provides an `IEnumerable.GetEnumerator` implementation that returns `this` as the `IEnumerator`.

Returns: An enumerator object that can be used to iterate through the chunks.

To be added.

## StringBuilder+ChunkEnumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next chunk in the collection.

Returns: `true` if the enumerator was successfully advanced to the next element; `false` if the enumerator has passed the end of the collection.

To be added.
