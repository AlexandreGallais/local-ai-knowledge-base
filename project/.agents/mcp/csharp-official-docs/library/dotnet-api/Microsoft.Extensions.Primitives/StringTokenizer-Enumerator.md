---
title: "StringTokenizer+Enumerator struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Primitives/StringTokenizer+Enumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringTokenizer+Enumerator struct

Namespace: `Microsoft.Extensions.Primitives`

```csharp
public struct StringTokenizer.Enumerator : System.Collections.Generic.IEnumerator<Microsoft.Extensions.Primitives.StringSegment>
```

Enumerates the `String` tokens represented by `StringSegment`.

To be added.

## StringTokenizer+Enumerator.StringTokenizer+Enumerator(StringTokenizer) constructor

```csharp
public Enumerator (ref Microsoft.Extensions.Primitives.StringTokenizer tokenizer);
```

Initializes an `Enumerator` using a `StringTokenizer`.

Parameters:

- `tokenizer`: A `StringTokenizer` that contains the value to enumerate and token separators.

To be added.

## StringTokenizer+Enumerator.Current property

```csharp
public Microsoft.Extensions.Primitives.StringSegment Current { get; }
```

Gets the current `StringSegment` from the `StringTokenizer`.

Returns: The element in the collection at the current position of the enumerator.

To be added.

## StringTokenizer+Enumerator.System.Collections.IEnumerator.Current property

```csharp
object System.Collections.IEnumerator.Current { get; }
```

Gets the element in the collection at the current position of the enumerator.

Returns: The element in the collection at the current position of the enumerator.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Enumerator` instance is cast to an `IEnumerator` interface.

## StringTokenizer+Enumerator.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the `Enumerator`.

To be added.

## StringTokenizer+Enumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next token in the `StringTokenizer`.

Returns: `true` if the enumerator was successfully advanced to the next token; `false` if the enumerator has passed the end of the `StringTokenizer`.

To be added.

## StringTokenizer+Enumerator.Reset() method

```csharp
public void Reset ();
```

Resets the `Enumerator` to its initial state.

To be added.
