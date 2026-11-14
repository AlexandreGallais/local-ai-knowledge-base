---
title: "ArraySegment<T>+Enumerator struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ArraySegment`1+Enumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ArraySegment<T>+Enumerator struct

Namespace: `System`

```csharp
public struct ArraySegment<T>.Enumerator : System.Collections.Generic.IEnumerator<T>
```

Provides an enumerator for the elements of an `ArraySegment<T>`.

#### Remarks

The C# foreach of the C# language and the For Each...Next construct in Visual Basic hides the complexity of enumerators. Instead of directly manipulating the enumerator, using `foreach` or `For Each...Next` is recommended.

Initially, the enumerator is positioned before the first element in the `ArraySegment<T>`. At this position, `Current` is undefined. You must call `Enumerator.MoveNext` to advance the enumerator to the first item in the `ArraySegment<T>` before reading the value of `Current`.

`Current` returns the same value until `Enumerator.MoveNext` is called. `Enumerator.MoveNext` sets `Current` to the next item in the `ArraySegment<T>`.

If `Enumerator.MoveNext` passes the end of the `ArraySegment<T>`, `Enumerator.MoveNext` returns `false`. When the enumerator is at this state, subsequent calls to `Enumerator.MoveNext` also return `false` and `Current` is undefined. You cannot set `Current` to the first item in the `ArraySegment<T>` again; you must create a new enumerator instance instead.

## ArraySegment<T>+Enumerator.Current property

```csharp
public T Current { get; }
```

Gets a reference to the item at the current position of the enumerator.

Returns: The element of the `ArraySegment<T>` at the current position of the enumerator.

#### Remarks

`Current` is undefined under either of the following conditions:

- Immediately after the enumerator is created, the enumerator is positioned before the first element in the array segment. `Enumerator.MoveNext` must be called to advance the enumerator to the first element of the array segment before reading the value of `Current`.

- The last call to `Enumerator.MoveNext` returned `false`, which indicates the end of the array segment.

`Current` returns the same value until `Enumerator.MoveNext` is called. `Enumerator.MoveNext` sets `Current` to the next item in the array segment.

## ArraySegment<T>+Enumerator.System.Collections.IEnumerator.Current property

```csharp
object? System.Collections.IEnumerator.Current { get; }
```

Gets the element at the current position of the enumerator.

Returns: The element in the array segment at the current position of the enumerator.

Exceptions:

- `InvalidOperationException`: The enumerator is positioned before the first element of the array segment or after the last element.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Enumerator` instance is cast to an `IEnumerator` interface.

## ArraySegment<T>+Enumerator.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by this enumerator instance.

To be added.

## ArraySegment<T>+Enumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next element of the `ArraySegment<T>`.

Returns: `true` if the enumerator was successfully advanced to the next element; `false` if the enumerator has passed the end of the array segment.

#### Remarks

After an enumerator is created, it is positioned before the first element in the array segment, and the first call to `MoveNext` advances the enumerator to the first item in the array segment.

If `MoveNext` passes the end of the array segment, `MoveNext` returns `false`. When the enumerator is at this state, subsequent calls to `MoveNext` also return `false`.

## ArraySegment<T>+Enumerator.System.Collections.IEnumerator.Reset() method

```csharp
void IEnumerator.Reset ();
```

Sets the enumerator to its initial position, which is before the first element in the array segment.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Enumerator` instance is cast to an `IEnumerator` interface.
