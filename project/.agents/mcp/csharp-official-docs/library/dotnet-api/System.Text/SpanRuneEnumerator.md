---
title: "SpanRuneEnumerator struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/SpanRuneEnumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SpanRuneEnumerator struct

Namespace: `System.Text`

```csharp
public ref struct SpanRuneEnumerator : System.Collections.Generic.IEnumerator<System.Text.Rune>
```

Provides an enumerator for the `Rune` values represented by a span containing UTF-16 text.

#### Remarks

This type is not intended to be referenced directly by application code. Instead, use the `MemoryExtensions.EnumerateRunes` method along with language-specific enumeration constructs to enumerate `Rune` values within spans.

The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

## SpanRuneEnumerator.Current property

```csharp
public System.Text.Rune Current { get; }
```

Gets the `Rune` at the current position of the enumerator.

Returns: The `Rune` at the current position of the enumerator.

To be added.

## SpanRuneEnumerator.System.Collections.IEnumerator.Current property

```csharp
object System.Collections.IEnumerator.Current { get; }
```

To be added.

Returns: To be added.

To be added.

## SpanRuneEnumerator.GetEnumerator() method

```csharp
public System.Text.SpanRuneEnumerator GetEnumerator ();
```

Returns the current enumerator instance.

Returns: The current enumerator instance.

To be added.

## SpanRuneEnumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next `Rune` of the span.

Returns: `true` if the enumerator successfully advanced to the next item; `false` if the end of the span has been reached.

To be added.

## SpanRuneEnumerator.System.Collections.IEnumerator.Reset() method

```csharp
void IEnumerator.Reset ();
```

To be added.

To be added.

## SpanRuneEnumerator.System.IDisposable.Dispose() method

```csharp
void IDisposable.Dispose ();
```

To be added.

To be added.
