---
title: "MemoryExtensions+SpanSplitEnumerator<T> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MemoryExtensions+SpanSplitEnumerator`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryExtensions+SpanSplitEnumerator<T> struct

Namespace: `System`

```csharp
public ref struct MemoryExtensions.SpanSplitEnumerator<T> : System.Collections.Generic.IEnumerator<Range> where T : IEquatable<T>
```

Enables enumerating each split within a `ReadOnlySpan<T>` that has been divided using one or more separators.

Parameters:

- `T`: The type of items in the `SpanSplitEnumerator<T>`.

To be added.

## MemoryExtensions+SpanSplitEnumerator<T>.Current property

```csharp
public Range Current { get; }
```

Gets the current element of the enumeration.

Returns: A `Range` instance that indicates the bounds of the current element withing the source span.

To be added.

## MemoryExtensions+SpanSplitEnumerator<T>.Source property

```csharp
public ReadOnlySpan<T> Source { get; }
```

Gets the source span being enumerated.

Returns: The `ReadOnlySpan<T>` that was provided when creating this enumerator.

To be added.

## MemoryExtensions+SpanSplitEnumerator<T>.System.Collections.IEnumerator.Current property

```csharp
object System.Collections.IEnumerator.Current { get; }
```

To be added.

Returns: To be added.

To be added.

## MemoryExtensions+SpanSplitEnumerator<T>.GetEnumerator() method

```csharp
public MemoryExtensions.SpanSplitEnumerator<T> GetEnumerator ();
```

Gets an enumerator that allows for iteration over the split span.

Returns: A `SpanSplitEnumerator<T>` that can be used to iterate over the split span.

To be added.

## MemoryExtensions+SpanSplitEnumerator<T>.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next element of the enumeration.

Returns: `true` if the enumerator was successfully advanced to the next element; `false` if the enumerator has passed the end of the enumeration.

To be added.

## MemoryExtensions+SpanSplitEnumerator<T>.System.Collections.IEnumerator.Reset() method

```csharp
void IEnumerator.Reset ();
```

To be added.

To be added.

## MemoryExtensions+SpanSplitEnumerator<T>.System.IDisposable.Dispose() method

```csharp
void IDisposable.Dispose ();
```

To be added.

To be added.
