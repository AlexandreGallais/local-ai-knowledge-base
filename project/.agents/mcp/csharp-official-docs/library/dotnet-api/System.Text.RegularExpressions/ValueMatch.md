---
title: "ValueMatch struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/ValueMatch.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ValueMatch struct

Namespace: `System.Text.RegularExpressions`

```csharp
public readonly ref struct ValueMatch
```

Represents the results from a single regular expression match.

The `ValueMatch` type is immutable and has no public constructor. An instance of the
`ValueMatch` struct is returned by the
`ValueMatchEnumerator.Current` method when iterating over the results from
calling `Regex.EnumerateMatches`.

## ValueMatch.Index property

```csharp
public int Index { get; }
```

Gets the position in the original span where the first character of the captured sliced
span is found.

Returns: To be added.

To be added.

## ValueMatch.Length property

```csharp
public int Length { get; }
```

Gets the length of the captured sliced span.

Returns: To be added.

To be added.
