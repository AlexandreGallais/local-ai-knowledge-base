---
title: "Regex+ValueMatchEnumerator struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/Regex+ValueMatchEnumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Regex+ValueMatchEnumerator struct

Namespace: `System.Text.RegularExpressions`

```csharp
public ref struct Regex.ValueMatchEnumerator : System.Collections.Generic.IEnumerator<System.Text.RegularExpressions.ValueMatch>
```

Represents an enumerator containing the set of successful matches found by iteratively applying
a regular expression pattern to the input span.

The enumerator has no public constructor. The `Regex.EnumerateMatches`
method returns a `ValueMatchEnumerator` object. The enumerator will lazily iterate
over zero or more `ValueMatch` objects. If there is at least one successful match in the
span, then `ValueMatchEnumerator.MoveNext` returns `true` and `ValueMatchEnumerator.Current` will contain
the first `ValueMatch`. If there are no successful matches, then `ValueMatchEnumerator.MoveNext`
returns `false` and `ValueMatchEnumerator.Current` throws an `InvalidOperationException`.

This type is a ref struct since it stores the input span as a field in order to be able to lazily
iterate over it.

## Regex+ValueMatchEnumerator.Current property

```csharp
public System.Text.RegularExpressions.ValueMatch Current { get; }
```

Gets the `ValueMatch` element at the current position of the enumerator.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: Enumeration has either not started or has already finished.

To be added.

## Regex+ValueMatchEnumerator.System.Collections.IEnumerator.Current property

```csharp
readonly object System.Collections.IEnumerator.Current { get; }
```

To be added.

Returns: To be added.

To be added.

## Regex+ValueMatchEnumerator.GetEnumerator() method

```csharp
public readonly System.Text.RegularExpressions.Regex.ValueMatchEnumerator GetEnumerator ();
```

Provides an enumerator that iterates through the matches in the input span.

Returns: A copy of this enumerator.

To be added.

## Regex+ValueMatchEnumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next match in the span.

Returns: `true` if the enumerator was successfully advanced to the next element; `false` if the enumerator cannot find additional matches.

To be added.

## Regex+ValueMatchEnumerator.System.Collections.IEnumerator.Reset() method

```csharp
void IEnumerator.Reset ();
```

To be added.

To be added.

## Regex+ValueMatchEnumerator.System.IDisposable.Dispose() method

```csharp
void IDisposable.Dispose ();
```

To be added.

To be added.
