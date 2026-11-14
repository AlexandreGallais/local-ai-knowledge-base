---
title: "Relational, logical, and parenthesized patterns (part 1 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/fundamentals/patterns/relational-logical-patterns.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Relational, logical, and parenthesized patterns

> **Tip:**
> This article is part of the **Fundamentals** section for developers who already know at least one programming language and are learning C#. Start with the pattern matching overview if patterns are new to you. For complete language rules, see relational patterns and logical patterns in the language reference.

Relational and logical patterns describe ranges, alternatives, and exclusions. The following method combines them to classify a temperature:

```csharp
static class RelationalLogicalPatterns
{
    public static void Run()
    {
        Console.WriteLine($"Temperature: {ClassifyTemperature(21)}");
        ShowExpressionAndPattern(-4, threshold: 0);
        Console.WriteLine(
            $"Weekend pattern: {IsWeekendPattern(DayOfWeek.Saturday)}; " +
            $"imperative: {IsWeekendImperative(DayOfWeek.Saturday)}");
        Console.WriteLine($"Accepted priority: {IsAcceptedPriority(9)}");
        Console.WriteLine(
            $"Heat warning: {GetHeatWarning(36, isOutdoors: true)}");
    }

    static string ClassifyTemperature(int temperature) =>
        temperature switch
        {
            < 0 => "Below freezing",
            >= 18 and <= 24 => "Comfortable",
            (>= 0 and < 10) or > 30 => "Far outside the comfortable range",
            _ => "Cool or warm"
        };

    static void ShowExpressionAndPattern(int temperature, int threshold)
    {
        bool belowThreshold = temperature < threshold;
        bool belowFreezing = temperature is < 0;

        string description = temperature switch
        {
            < 0 => "Freezing",
            0 => "Freezing point",
            > 0 => "Above freezing"
        };

        Console.WriteLine(
            $"Below threshold: {belowThreshold}; " +
            $"below freezing: {belowFreezing}; {description}");
    }

    static bool IsWeekendPattern(DayOfWeek day) =>
        day is DayOfWeek.Saturday or DayOfWeek.Sunday;

    static bool IsWeekendImperative(DayOfWeek day) =>
        day == DayOfWeek.Saturday || day == DayOfWeek.Sunday;

    static bool IsAcceptedPriority(int priority) =>
        priority is (>= 1 and <= 3) or 9;

    static string GetHeatWarning(int temperature, bool isOutdoors) =>
        temperature switch
        {
            > 35 when isOutdoors => "High heat outdoors",
            > 35 => "High heat",
            _ => "No heat warning"
        };
}
```
The expression `temperature` is the pattern input. C# evaluates it once, and each switch arm tests the resulting value. The arms demonstrate these tests:

- `< 0` tests one boundary.
- `>= 18 and <= 24` tests a range.
- `(>= 0 and < 10) or > 30` tests two alternative ranges.

This article shows both patterns and imperative conditions so you can learn each form and compare how they express the same decisions. A single condition can look similar in either form. Patterns can make a series of related branches easier to read by keeping the choices next to their results. Choose the form that makes the code easiest to understand.

## Compare values with relational patterns

A *relational pattern* compares its pattern input with a compile-time constant by using `<`, `>`, `<=`, or `>=`. A *compile-time constant* is a value the compiler can evaluate while compiling the program. Numeric and character literals, and `const` variables of compatible numeric or character types, are representative examples. Ordinary variables, properties, method calls, and `static readonly` fields aren't compile-time constants. In the opening example, both `>= 18` and `<= 24` test the same evaluated `temperature` value.

The same relational symbol can appear in an ordinary expression or in a pattern. The following example uses both forms with a temperature:

```csharp
static class RelationalLogicalPatterns
{
    public static void Run()
    {
        Console.WriteLine($"Temperature: {ClassifyTemperature(21)}");
        ShowExpressionAndPattern(-4, threshold: 0);
        Console.WriteLine(
            $"Weekend pattern: {IsWeekendPattern(DayOfWeek.Saturday)}; " +
            $"imperative: {IsWeekendImperative(DayOfWeek.Saturday)}");
        Console.WriteLine($"Accepted priority: {IsAcceptedPriority(9)}");
        Console.WriteLine(
            $"Heat warning: {GetHeatWarning(36, isOutdoors: true)}");
    }

    static string ClassifyTemperature(int temperature) =>
        temperature switch
        {
            < 0 => "Below freezing",
            >= 18 and <= 24 => "Comfortable",
            (>= 0 and < 10) or > 30 => "Far outside the comfortable range",
            _ => "Cool or warm"
        };

    static void ShowExpressionAndPattern(int temperature, int threshold)
    {
        bool belowThreshold = temperature < threshold;
        bool belowFreezing = temperature is < 0;

        string description = temperature switch
        {
            < 0 => "Freezing",
            0 => "Freezing point",
            > 0 => "Above freezing"
        };

        Console.WriteLine(
            $"Below threshold: {belowThreshold}; " +
            $"below freezing: {belowFreezing}; {description}");
    }

    static bool IsWeekendPattern(DayOfWeek day) =>
        day is DayOfWeek.Saturday or DayOfWeek.Sunday;

    static bool IsWeekendImperative(DayOfWeek day) =>
        day == DayOfWeek.Saturday || day == DayOfWeek.Sunday;

    static bool IsAcceptedPriority(int priority) =>
        priority is (>= 1 and <= 3) or 9;

    static string GetHeatWarning(int temperature, bool isOutdoors) =>
        temperature switch
        {
            > 35 when isOutdoors => "High heat outdoors",
            > 35 => "High heat",
            _ => "No heat warning"
        };
}
```
`temperature < threshold` is a *relational expression*. It evaluates both operands and produces a `bool`. Either operand can be a nonconstant expression.

In `temperature is < 0`, `temperature` is the pattern input expression. C# evaluates it, and the relational pattern `< 0` tests the resulting value. In the switch arm `< 0 => "Freezing"`, the expression before `switch` supplies the input, so the pattern contains only `< 0`.

The expression can compare `temperature` with the variable `threshold`. A relational-pattern operand must be a compile-time constant, so use the relational expression when the comparison value is a variable. When the comparison value is constant, either form can work.

When the right operand is constant, choose mainly for readability. A relational expression often fits one direct comparison. A relational pattern composes with other patterns and fits naturally when several ranges map to switch results.

## Combine conditions with logical patterns

*Logical patterns* combine or negate patterns with the pattern operators `and`, `or`, and `not`:

- An `and` pattern matches when both nested patterns match.
- An `or` pattern matches when either nested pattern matches.
- A `not` pattern succeeds when its nested pattern fails.

The opening example uses `and` to describe a range and `or` to describe alternatives. A `not` pattern can exclude a value, as in `status is not Status.Complete`. The following methods show both forms so you can learn their syntax and compare how they express the same test:

```csharp
static class RelationalLogicalPatterns
{
    public static void Run()
    {
        Console.WriteLine($"Temperature: {ClassifyTemperature(21)}");
        ShowExpressionAndPattern(-4, threshold: 0);
        Console.WriteLine(
            $"Weekend pattern: {IsWeekendPattern(DayOfWeek.Saturday)}; " +
            $"imperative: {IsWeekendImperative(DayOfWeek.Saturday)}");
        Console.WriteLine($"Accepted priority: {IsAcceptedPriority(9)}");
        Console.WriteLine(
            $"Heat warning: {GetHeatWarning(36, isOutdoors: true)}");
    }

    static string ClassifyTemperature(int temperature) =>
        temperature switch
        {
            < 0 => "Below freezing",
            >= 18 and <= 24 => "Comfortable",
            (>= 0 and < 10) or > 30 => "Far outside the comfortable range",
            _ => "Cool or warm"
        };

    static void ShowExpressionAndPattern(int temperature, int threshold)
    {
        bool belowThreshold = temperature < threshold;
        bool belowFreezing = temperature is < 0;

        string description = temperature switch
        {
            < 0 => "Freezing",
            0 => "Freezing point",
            > 0 => "Above freezing"
        };

        Console.WriteLine(
            $"Below threshold: {belowThreshold}; " +
            $"below freezing: {belowFreezing}; {description}");
    }

    static bool IsWeekendPattern(DayOfWeek day) =>
        day is DayOfWeek.Saturday or DayOfWeek.Sunday;

    static bool IsWeekendImperative(DayOfWeek day) =>
        day == DayOfWeek.Saturday || day == DayOfWeek.Sunday;

    static bool IsAcceptedPriority(int priority) =>
        priority is (>= 1 and <= 3) or 9;

    static string GetHeatWarning(int temperature, bool isOutdoors) =>
        temperature switch
        {
            > 35 when isOutdoors => "High heat outdoors",
            > 35 => "High heat",
            _ => "No heat warning"
        };
}
```
The pattern form uses two constant patterns joined by `or`. The imperative form uses two equality expressions joined by the conditional-OR operator `||`. Both forms are concise and clear for this single condition. Choose the form that best fits the surrounding code. Patterns often clarify several related choices in a `switch`, as in the opening example.

Pattern operators form patterns rather than Boolean expressions: `and` corresponds to pattern conjunction, `or` to pattern alternatives, and `not` to pattern negation. Boolean expressions use `&&`, `||`, and `!`. Choose `or` when several pattern alternatives have the same result. Choose `not` when expressing the excluded pattern is clearer than listing every accepted value.

## Group patterns with parentheses

A *parenthesized pattern* uses parentheses to show or change how nested patterns are grouped. *Binding* determines which pattern operands an operator groups together, similar to implicit grouping when you don't write parentheses. C# specifies the following binding order:

1. `not`
1. `and`
1. `or`

The following test accepts priorities 1 through 3 or the special priority 9:

```csharp
static class RelationalLogicalPatterns
{
    public static void Run()
    {
        Console.WriteLine($"Temperature: {ClassifyTemperature(21)}");
        ShowExpressionAndPattern(-4, threshold: 0);
        Console.WriteLine(
            $"Weekend pattern: {IsWeekendPattern(DayOfWeek.Saturday)}; " +
            $"imperative: {IsWeekendImperative(DayOfWeek.Saturday)}");
        Console.WriteLine($"Accepted priority: {IsAcceptedPriority(9)}");
        Console.WriteLine(
            $"Heat warning: {GetHeatWarning(36, isOutdoors: true)}");
    }

    static string ClassifyTemperature(int temperature) =>
        temperature switch
        {
            < 0 => "Below freezing",
            >= 18 and <= 24 => "Comfortable",
            (>= 0 and < 10) or > 30 => "Far outside the comfortable range",
            _ => "Cool or warm"
        };

    static void ShowExpressionAndPattern(int temperature, int threshold)
    {
        bool belowThreshold = temperature < threshold;
        bool belowFreezing = temperature is < 0;

        string description = temperature switch
        {
            < 0 => "Freezing",
            0 => "Freezing point",
            > 0 => "Above freezing"
        };

        Console.WriteLine(
            $"Below threshold: {belowThreshold}; " +
            $"below freezing: {belowFreezing}; {description}");
    }

    static bool IsWeekendPattern(DayOfWeek day) =>
        day is DayOfWeek.Saturday or DayOfWeek.Sunday;

    static bool IsWeekendImperative(DayOfWeek day) =>
        day == DayOfWeek.Saturday || day == DayOfWeek.Sunday;

    static bool IsAcceptedPriority(int priority) =>
        priority is (>= 1 and <= 3) or 9;

    static string GetHeatWarning(int temperature, bool isOutdoors) =>
        temperature switch
        {
            > 35 when isOutdoors => "High heat outdoors",
            > 35 => "High heat",
            _ => "No heat warning"
        };
}
```
The compiler groups `and` before `or`. The parentheses make the intended grouping explicit and the two alternatives easy to see: the range from 1 through 3, or 9. For readability, use parentheses whenever a pattern mixes `and` and `or`, or when `not` applies to a compound pattern. Parentheses can also change the default grouping, as in `not (>= 1 and <= 3)`.

The runtime check order for nested patterns is unspecified, and pattern operators follow pattern-matching rules rather than short-circuit Boolean rules. Write nested patterns so their result is independent of check order.
