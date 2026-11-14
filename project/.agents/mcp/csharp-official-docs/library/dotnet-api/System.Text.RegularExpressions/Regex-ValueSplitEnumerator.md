---
title: "Regex+ValueSplitEnumerator struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/Regex+ValueSplitEnumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Regex+ValueSplitEnumerator struct

Namespace: `System.Text.RegularExpressions`

```csharp
public ref struct Regex.ValueSplitEnumerator : System.Collections.Generic.IEnumerator<Range>
```

Represents an enumerator containing the set of splits around successful matches found by iteratively
applying a regular expression pattern to the input span.

To be added.

## Regex+ValueSplitEnumerator.Current property

```csharp
public Range Current { get; }
```

Gets the `Range` element at the current position of the enumerator.

Returns: To be added.

To be added.

## Regex+ValueSplitEnumerator.System.Collections.IEnumerator.Current property

```csharp
readonly object System.Collections.IEnumerator.Current { get; }
```

To be added.

Returns: To be added.

To be added.

## Regex+ValueSplitEnumerator.GetEnumerator() method

```csharp
public readonly System.Text.RegularExpressions.Regex.ValueSplitEnumerator GetEnumerator ();
```

Provides an enumerator that iterates through the splits in the input span.

Returns: A copy of this enumerator.

To be added.

## Regex+ValueSplitEnumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next split.

Returns: `true` if the enumerator was successfully advanced to the next element; `false` if the enumerator cannot find additional matches.

To be added.

## Regex+ValueSplitEnumerator.System.Collections.IEnumerator.Reset() method

```csharp
void IEnumerator.Reset ();
```

To be added.

To be added.

## Regex+ValueSplitEnumerator.System.IDisposable.Dispose() method

```csharp
void IDisposable.Dispose ();
```

To be added.

To be added.
