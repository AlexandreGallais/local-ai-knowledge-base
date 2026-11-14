---
title: "Capture class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/Capture.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Capture class

Namespace: `System.Text.RegularExpressions`

```csharp
public class Capture
```

Represents the results from a single successful subexpression capture.

A `Capture` object is immutable and has no public constructor. Instances are returned
through the `CaptureCollection` object, which is returned by the
`Group.Captures` property. However, the `Match.Captures` property provides
information about the same match as the
`Match` object.

If you do not apply a quantifier to a capturing group, the `Group.Captures`
property returns a `CaptureCollection` with a single `Capture` object
that provides information about the same capture as the `Group` object. If you do
apply a quantifier to a capturing group, the `Group.Index`, `Group.Length`, and
`Group.Value` properties provide information only about the last captured group, whereas
the `Capture` objects in the `CaptureCollection` provide information
about all subexpression captures.

## Capture.Index property

```csharp
public int Index { get; }
```

Gets the position in the original string where the first character of the captured substring is found.

Returns: The zero-based starting position in the original string where the captured substring is found.

To be added.

## Capture.Length property

```csharp
public int Length { get; }
```

Gets the length of the captured substring.

Returns: The length of the captured substring.

To be added.

## Capture.Value property

```csharp
public string Value { get; }
```

Gets the captured substring from the input string.

Returns: The substring that is captured by the match.

If a call to the `Regex.Match` or `Match.NextMatch` method fails to
find a match, the value of the returned `Match.Value` property is `String.Empty`.
If the regular expression engine is unable to match a capturing group, the value of the returned
`Group.Value` property is `String.Empty`.

## Capture.ValueSpan property

```csharp
public ReadOnlySpan<char> ValueSpan { get; }
```

Gets the captured span from the input string.

Returns: The span that is captured by the match.

To be added.

## Capture.ToString() method

```csharp
public override string ToString ();
```

Retrieves the captured substring from the input string by calling the
`Capture.Value` property.

Returns: The substring that was captured by the match.

`ToString` is actually an internal call to the `Capture.Value` property.
