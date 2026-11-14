---
title: "Breaking change: LastIndexOf has improved handling of empty search strings"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/5.0/lastindexof-improved-handling-of-empty-values.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# LastIndexOf has improved handling of empty search strings

`System.String.LastIndexOf*` and related APIs now return correct values when searching for a zero-length (or zero-length equivalent) substring within a larger string.

## Change description

In .NET Framework and .NET Core 1.0 - 3.1, `System.String.LastIndexOf*` and related APIs might return an incorrect value when the caller searches for a zero-length substring.

```csharp
Console.WriteLine("Hello".LastIndexOf("")); // prints '4' (incorrect)

ReadOnlySpan<char> span = "Hello";
Console.WriteLine(span.LastIndexOf("")); // prints '0' (incorrect)
```

Starting with .NET 5, these APIs return the correct value for `LastIndexOf`.

```csharp
Console.WriteLine("Hello".LastIndexOf("")); // prints '5' (correct)

ReadOnlySpan<char> span = "Hello";
Console.WriteLine(span.LastIndexOf("")); // prints '5' (correct)
```

In these examples, `5` is the correct answer because `"Hello".Substring(5)` and `"Hello".AsSpan().Slice(5)` both produce an empty string, which is trivially equal to the empty substring that is sought.

## Reason for change

This change was part of an overall bug fixing effort around string handling for .NET 5. It also helps unify our behavior between Windows and non-Windows platforms. For more information, see dotnet/runtime#13383 and dotnet/runtime##13382.

## Version introduced

5.0

## Recommended action

You don't need to take any action. The .NET 5 runtime provides the new behaviors automatically.

There is no compatibility switch to restore the old behavior.

## Affected APIs

- `System.String.LastIndexOf*`
- `System.Globalization.CompareInfo.LastIndexOf*`
- `System.MemoryExtensions.LastIndexOf*`
