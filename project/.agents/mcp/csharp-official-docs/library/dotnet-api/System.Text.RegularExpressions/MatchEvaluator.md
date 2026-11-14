---
title: "MatchEvaluator delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/MatchEvaluator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MatchEvaluator delegate

Namespace: `System.Text.RegularExpressions`

```csharp
public delegate string MatchEvaluator(Match match);
```

Represents the method that is called each time a regular expression match is found during a
`Regex.Replace` method operation.

Parameters:

- `match`: The `Match` object that represents a single regular expression
match during a `Regex.Replace` method operation.

Returns: A string returned by the method that is represented by the
`MatchEvaluator` delegate.

You can use a `MatchEvaluator` delegate method to perform a custom verification or
manipulation operation for each match found by a replacement method such as
`Regex.Replace`. For each matched string, the
`Regex.Replace` method calls the
`MatchEvaluator` delegate method with a `Match` object that represents
the match. The delegate method performs whatever processing you prefer and returns a string that
the `Regex.Replace` method substitutes for the matched string.
