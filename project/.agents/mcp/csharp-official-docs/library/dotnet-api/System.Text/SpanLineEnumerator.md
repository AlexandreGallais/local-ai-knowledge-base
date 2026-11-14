---
title: "SpanLineEnumerator struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/SpanLineEnumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SpanLineEnumerator struct

Namespace: `System.Text`

```csharp
public ref struct SpanLineEnumerator : System.Collections.Generic.IEnumerator<ReadOnlySpan<char>>
```

Enumerates the lines of a `ReadOnlySpan<T>`.

#### Remarks

To get an instance of this type, use `EnumerateLines`.

## SpanLineEnumerator.Current property

```csharp
public ReadOnlySpan<char> Current { get; }
```

Gets the line at the current position of the enumerator.

Returns: The line at the current position of the enumerator.

To be added.

## SpanLineEnumerator.System.Collections.IEnumerator.Current property

```csharp
object System.Collections.IEnumerator.Current { get; }
```

To be added.

Returns: To be added.

To be added.

## SpanLineEnumerator.GetEnumerator() method

```csharp
public System.Text.SpanLineEnumerator GetEnumerator ();
```

Returns this instance as an enumerator.

Returns: This instance as an enumerator.

This method is called automatically by the compiler. It is not intended to be called directly by application code.

## SpanLineEnumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next line of the span.

Returns: `true` if the enumerator successfully advanced to the next line; `false` if the enumerator has advanced past the end of the span.

To be added.

## SpanLineEnumerator.System.Collections.IEnumerator.Reset() method

```csharp
void IEnumerator.Reset ();
```

To be added.

To be added.

## SpanLineEnumerator.System.IDisposable.Dispose() method

```csharp
void IDisposable.Dispose ();
```

To be added.

To be added.
