---
title: "ReadOnlySequence<T>+Enumerator struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers/ReadOnlySequence`1+Enumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReadOnlySequence<T>+Enumerator struct

Namespace: `System.Buffers`

```csharp
public struct ReadOnlySequence<T>.Enumerator
```

Represents an enumerator over a `ReadOnlySequence<T>`.

To be added.

## ReadOnlySequence<T>+Enumerator.ReadOnlySequence(ReadOnlySequence<T>) constructor

```csharp
public Enumerator (in System.Buffers.ReadOnlySequence<T> sequence);
```

Initializes the enumerator.

Parameters:

- `sequence`: The `ReadOnlySequence<T>` to enumerate.

To be added.

## ReadOnlySequence<T>+Enumerator.Current property

```csharp
public ReadOnlyMemory<T> Current { get; }
```

Gets the current `ReadOnlyMemory<T>`.

Returns: The current `ReadOnlyMemory<T>`.

To be added.

## ReadOnlySequence<T>+Enumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Moves to the next `ReadOnlyMemory<T>` in the `ReadOnlySequence<T>`.

Returns: `true` if the enumerator successfully advanced to the next item; `false` if the end of the sequence has been reached.

To be added.
