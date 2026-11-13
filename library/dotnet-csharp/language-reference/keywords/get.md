---
title: "The get keyword: property accessor"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/get.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# The `get` keyword

The `get` keyword defines an *accessor* method in a property or indexer that returns the property value or the indexer element. For more information, see Properties, Automatically implemented Properties, and Indexers.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

For simple cases where a property's `get` and `set` accessors perform no other operation than setting or retrieving a value in a private backing field, take advantage of the C# compiler's support for automatically implemented properties. The following example implements `Hours` as an automatically implemented property.

```csharp
class TimePeriod3
{
    public double Hours { get; set; }
}
```
> **Important:**
> You can't use automatically implemented properties for interface property declarations or the implementing declaration for a partial property. The compiler interprets syntax matching an automatically implemented property as the declaring declaration, not an implementing declaration.

Often, the `get` accessor consists of a single statement that returns a value, as it did in the previous example. You can implement the `get` accessor as an expression-bodied member. The following example implements both the `get` and the `set` accessor as expression-bodied members.

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
You might find that you need to implement one of the accessor bodies. Use a field backed property to let the compiler generate one accessor while you write the other by hand. Use the `field` keyword, added in C# 14, to access the compiler synthesized backing field:

```csharp
class TimePeriod4
{
    public double Hours {
        get;
        set => field = (value >= 0)
            ? value
            : throw new ArgumentOutOfRangeException(nameof(value), "The value must not be negative");
    }
}
```
The following example defines both a `get` and a `set` accessor for a property named `Seconds`. It uses a private field named `_seconds` to back the property value.

```csharp
class TimePeriod
{
    private double _seconds;

    public double Seconds
    {
        get { return _seconds; }
        set
        {
            if (value < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(value), "The value of the time period must be non-negative.");
            }
            _seconds = value;
        }
    }
}
```
## C# Language Specification

For more information, see the C# Language Specification. The language specification is the definitive source for C# syntax and usage.

## See also

- C# Keywords
- Properties
