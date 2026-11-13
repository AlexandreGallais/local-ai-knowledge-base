---
title: "The `value` implicit parameter"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/value.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# The `value` implicit parameter

The `set` accessor in property and indexer declarations uses the implicit parameter `value`. This parameter acts as an input for the method. The word `value` refers to the value that client code tries to assign to the property or indexer.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

In the following example, `TimePeriod2` has a property named `Seconds` that uses the `value` parameter to assign a new string to the backing field `_seconds`. From the point of view of client code, the operation is written as a simple assignment.

```csharp
class TimePeriod2
{
    private double _seconds;

    public double Seconds
    {
        get => _seconds;
        set => _seconds = value;
    }
}
```
For more information, see the Properties and Indexers articles.

## C# language specification

For more information, see the C# Language Specification. The language specification is the definitive source for C# syntax and usage.
