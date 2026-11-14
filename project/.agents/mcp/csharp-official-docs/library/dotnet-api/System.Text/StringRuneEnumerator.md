---
title: "StringRuneEnumerator struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/StringRuneEnumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringRuneEnumerator struct

Namespace: `System.Text`

```csharp
public struct StringRuneEnumerator : System.Collections.Generic.IEnumerable<System.Text.Rune>, System.Collections.Generic.IEnumerator<System.Text.Rune>
```

Provides an enumerator for the `Rune` values represented by a string.

#### Remarks

This type is not intended to be referenced directly by application code. Instead, use the `EnumerateRunes` method along with language-specific enumeration constructs to enumerate `Rune` values within strings.

The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

## StringRuneEnumerator.Current property

```csharp
public System.Text.Rune Current { get; }
```

Gets the `Rune` at the current position of the enumerator.

Returns: The `Rune` at the current position of the enumerator.

To be added.

## StringRuneEnumerator.System.Collections.IEnumerator.Current property

```csharp
object? System.Collections.IEnumerator.Current { get; }
```

Gets the `Rune` at the current position of the enumerator.

Returns: The `Rune` at the current position of the enumerator.

#### Remarks

This member is an explicit interface member implementation.
It can be used only when the `StringRuneEnumerator` instance is cast to an `IEnumerator` interface.

## StringRuneEnumerator.GetEnumerator() method

```csharp
public System.Text.StringRuneEnumerator GetEnumerator ();
```

Returns the current enumerator instance.

Returns: The current enumerator instance.

To be added.

## StringRuneEnumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next `Rune` of the string.

Returns: `true` if the enumerator successfully advanced to the next item; `false` if the end of the string has been reached.

To be added.

## StringRuneEnumerator.System.Collections.Generic.IEnumerable<System.Text.Rune>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Text.Rune> IEnumerable<Rune>.GetEnumerator ();
```

Returns the current enumerator instance.

Returns: The current enumerator instance.

#### Remarks

This member is an explicit interface member implementation.
It can be used only when the `StringRuneEnumerator` instance is cast to an `IEnumerable<T>` interface.

## StringRuneEnumerator.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns the current enumerator instance.

Returns: The current enumerator instance.

#### Remarks

This member is an explicit interface member implementation.
It can be used only when the `StringRuneEnumerator` instance is cast to an `IEnumerable` interface.

## StringRuneEnumerator.System.Collections.IEnumerator.Reset() method

```csharp
void IEnumerator.Reset ();
```

Resets the current `StringRuneEnumerator` instance to the beginning of the string.

#### Remarks

This member is an explicit interface member implementation.
It can be used only when the `StringRuneEnumerator` instance is cast to an `IEnumerator` interface.

## StringRuneEnumerator.System.IDisposable.Dispose() method

```csharp
void IDisposable.Dispose ();
```

Releases all resources used by the current `StringRuneEnumerator` instance.

This method performs no operation and produces no side effects.
