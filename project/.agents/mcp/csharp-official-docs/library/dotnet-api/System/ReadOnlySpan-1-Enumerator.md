---
title: "ReadOnlySpan<T>+Enumerator struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ReadOnlySpan`1+Enumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReadOnlySpan<T>+Enumerator struct

Namespace: `System`

```csharp
public ref struct ReadOnlySpan<T>.Enumerator : System.Collections.Generic.IEnumerator<T>
```

Provides an enumerator for the elements of a `ReadOnlySpan<T>`.

#### Remarks

The C# foreach of the C# language and the For Each...Next construct in Visual Basic hides the complexity of enumerators. Instead of directly manipulating the enumerator, using `foreach` or `For Each...Next` is recommended.

Initially, the enumerator is positioned before the first element in the `ReadOnlySpan<T>`. At this position, `Current` is undefined. You must call `Enumerator.MoveNext` to advance the enumerator to the first item in the `ReadOnlySpan<T>` before reading the value of `Current`.

`Current` returns the same value until `Enumerator.MoveNext` is called. `Enumerator.MoveNext` sets `Current` to the next item in the `ReadOnlySpan<T>`.

If `Enumerator.MoveNext` passes the end of the `ReadOnlySpan<T>`, `Enumerator.MoveNext` returns `false`. When the enumerator is at this state, subsequent calls to `Enumerator.MoveNext` also return `false` and `Current` is undefined. You cannot set `Current` to the first item in the `ReadOnlySpan<T>` again; you must create a new enumerator instance instead.

Though the `ReadOnlySpan<T>` is allocated on the stack, the underlying data on which the `ReadOnlySpan<T>` points to, may not be. Therefore, enumerating through a `ReadOnlySpan<T>` is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you must implement your own synchronization.

Unlike some other enumerator structures in .NET, the `Enumerator`:

- Does not implement the `IEnumerator` or `IEnumerator<T>` interface. This is because `Enumerator` is a ref struct and cannot be boxed.

- Does not include a `Reset` method, which can set the enumerator to its initial position before the first element in the span. (The `Reset` method must be implemented as part of the interface, but most implementors either throw an exception or provide no implementation.)

## ReadOnlySpan<T>+Enumerator.Current property

```csharp
public ref readonly T Current { get; }
```

Gets a reference to the item at the current position of the enumerator.

Returns: The element in the `ReadOnlySpan<T>` at the current position of the enumerator.

#### Remarks

`Current` is undefined under either of the following conditions:

- Immediately after the enumerator is created, the enumerator is positioned before the first element in the span. `Enumerator.MoveNext` must be called to advance the enumerator to the first element of the span before reading the value of `Current`.

- The last call to `Enumerator.MoveNext` returned `false`, which indicates the end of the span.

`Current` returns the same value until `Enumerator.MoveNext` is called. `Enumerator.MoveNext` sets `Current` to the next item in the span.

## ReadOnlySpan<T>+Enumerator.System.Collections.Generic.IEnumerator<T>.Current property

```csharp
T System.Collections.Generic.IEnumerator<T>.Current { get; }
```

Gets the element in the collection at the current position of the enumerator.

Returns: The element in the collection at the current position of the enumerator.

To be added.

## ReadOnlySpan<T>+Enumerator.System.Collections.IEnumerator.Current property

```csharp
object System.Collections.IEnumerator.Current { get; }
```

To be added.

Returns: To be added.

To be added.

## ReadOnlySpan<T>+Enumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next item of the `ReadOnlySpan<T>`.

Returns: `true` if the enumerator successfully advanced to the next item; `false` if the end of the span has been passed.

#### Remarks

After an enumerator is created, it is positioned before the first element in the span, and the first call to `MoveNext` advances the enumerator to the first item in the span.

If `MoveNext` passes the end of the span, `MoveNext` returns `false`. When the enumerator is at this state, subsequent calls to `MoveNext` also return `false`.

## ReadOnlySpan<T>+Enumerator.System.Collections.IEnumerator.Reset() method

```csharp
void IEnumerator.Reset ();
```

To be added.

To be added.

## ReadOnlySpan<T>+Enumerator.System.IDisposable.Dispose() method

```csharp
void IDisposable.Dispose ();
```

To be added.

To be added.
