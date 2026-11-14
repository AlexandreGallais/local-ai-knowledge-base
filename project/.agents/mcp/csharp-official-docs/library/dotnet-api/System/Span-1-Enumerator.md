---
title: "Span<T>+Enumerator struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Span`1+Enumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Span<T>+Enumerator struct

Namespace: `System`

```csharp
public ref struct Span<T>.Enumerator : System.Collections.Generic.IEnumerator<T>
```

Provides an enumerator for the elements of a `Span<T>`.

The C# foreach of the C# language and the For Each...Next construct in Visual Basic hides the complexity of enumerators. Instead of directly manipulating the enumerator, using `foreach` or `For Each...Next` is recommended.

Initially, the enumerator is positioned before the first element in the `Span<T>`. At this position, `Current` is undefined. You must call `Enumerator.MoveNext` to advance the enumerator to the first item in the `Span<T>` before reading the value of `Current`.

`Current` returns the same value until `Enumerator.MoveNext` is called. `Enumerator.MoveNext` sets `Current` to the next item in the `Span<T>`.

If `Enumerator.MoveNext` passes the end of the `Span<T>`, `Enumerator.MoveNext` returns `false`. When the enumerator is at this state, subsequent calls to `Enumerator.MoveNext` also return `false` and `Current` is undefined. You cannot set `Current` to the first item in the `Span<T>` again; you must create a new enumerator instance instead.

The enumerator does not have exclusive access to the `Span<T>`. In addition, the underlying data on which the span is based can also be modified. Therefore, enumerating through a span is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you must implement your own synchronization. For example, the following code has a race condition. It does not ensure that the span will be enumerated before the `ClearContents` method executes. As a result, the underlying array is cleared during enumeration of the span:

_Code sample not included: ~/snippets/csharp/System/Span.Enumerator/Program.cs._

If you synchronize access to the array before enumerating the span, as the revised version of the `EnumerateSpan` method does in the following example, the `ClearContents` method doesn't modify underlying span data during enumeration. Note that the example locks the underlying array on which the span is based.

_Code sample not included: ~/snippets/csharp/System/Span.Enumerator/Program2.cs._

Unlike some other enumerator structures in .NET, the `Enumerator`:

- Does not implement the `IEnumerator` or `IEnumerator<T>` interface. This is because `Enumerator` is a ref struct.

- Does not include a `Reset` method, which can set the enumerator to its initial position before the first element in the span. (The `Reset` method must be implemented as part of the interface, but most implementors either throw an exception or provide no implementation.)

## Span<T>+Enumerator.Current property

```csharp
public ref T Current { get; }
```

Gets a reference to the item at the current position of the enumerator.

Returns: The element in the `Span<T>` at the current position of the enumerator.

`Current` is undefined under either of the following conditions:

- Immediately after the enumerator is created, the enumerator is positioned before the first element in the span. `Enumerator.MoveNext` must be called to advance the enumerator to the first element of the span before reading the value of `Current`.

- The last call to `Enumerator.MoveNext` returned `false`, which indicates the end of the span.

`Current` returns the same value until `Enumerator.MoveNext` is called. `Enumerator.MoveNext` sets `Current` to the next item in the span.

## Span<T>+Enumerator.System.Collections.Generic.IEnumerator<T>.Current property

```csharp
T System.Collections.Generic.IEnumerator<T>.Current { get; }
```

Gets the element in the collection at the current position of the enumerator.

Returns: The element in the collection at the current position of the enumerator.

To be added.

## Span<T>+Enumerator.System.Collections.IEnumerator.Current property

```csharp
object System.Collections.IEnumerator.Current { get; }
```

To be added.

Returns: To be added.

To be added.

## Span<T>+Enumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next item of the `Span<T>`.

Returns: `true` if the enumerator successfully advanced to the next item; `false` if the end of the span has been passed.

After an enumerator is created, it is positioned before the first element in the span, and the first call to `MoveNext` advances the enumerator to the first item in the span.

If `MoveNext` passes the end of the span, `MoveNext` returns `false`. When the enumerator is at this state, subsequent calls to `MoveNext` also return `false`.

## Span<T>+Enumerator.System.Collections.IEnumerator.Reset() method

```csharp
void IEnumerator.Reset ();
```

To be added.

To be added.

## Span<T>+Enumerator.System.IDisposable.Dispose() method

```csharp
void IDisposable.Dispose ();
```

To be added.

To be added.
