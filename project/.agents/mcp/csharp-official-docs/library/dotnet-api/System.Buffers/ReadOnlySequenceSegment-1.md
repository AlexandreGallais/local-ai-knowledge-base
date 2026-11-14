---
title: "ReadOnlySequenceSegment<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers/ReadOnlySequenceSegment`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReadOnlySequenceSegment<T> class

Namespace: `System.Buffers`

```csharp
public abstract class ReadOnlySequenceSegment<T>
```

Represents a linked list of `ReadOnlyMemory<T>` nodes.

Parameters:

- `T`: The type of the elements in the read-only sequence segment.

To be added.

## ReadOnlySequenceSegment<T>.ReadOnlySequenceSegment() constructor

```csharp
protected ReadOnlySequenceSegment ();
```

Initializes a new instance of the `ReadOnlySequenceSegment<T>` class.

To be added.

## ReadOnlySequenceSegment<T>.Memory property

```csharp
public ReadOnlyMemory<T> Memory { get; protected set; }
```

Gets or sets a `ReadOnlyMemory<T>` value for the current node.

Returns: A `ReadOnlyMemory<T>` value for the current node.

To be added.

## ReadOnlySequenceSegment<T>.Next property

```csharp
public System.Buffers.ReadOnlySequenceSegment<T>? Next { get; protected set; }
```

Gets or sets the next node.

Returns: The next node.

To be added.

## ReadOnlySequenceSegment<T>.RunningIndex property

```csharp
public long RunningIndex { get; protected set; }
```

Gets or sets the sum of node lengths before the current node.

Returns: The sum of node lengths before the current node.

To be added.
