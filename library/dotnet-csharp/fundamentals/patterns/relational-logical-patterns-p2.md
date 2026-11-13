---
title: "Relational, logical, and parenthesized patterns (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/patterns/relational-logical-patterns.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Relational, logical, and parenthesized patterns (part 2 of 2)

## Use a `when` guard for a separate condition

Logical patterns work best when nested patterns describe the input value itself. A `when` guard is an additional Boolean condition on a `case` label or switch arm. Use a guard when the decision also depends on information separate from the pattern input.

The following warning depends on the temperature and a separate `isOutdoors` value:

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
The relational pattern `> 35` describes the `temperature` input. The guard `when isOutdoors` checks a separate value. A guard is also preferable when the condition needs a method call or a Boolean expression that pattern syntax doesn't express clearly.

Use relational and logical patterns when they make the input's allowed shapes or values easier to see, especially across several switch arms. Use an ordinary Boolean expression when it states a direct condition more simply. Use a `when` guard when a switch choice depends on a separate value or on a condition better expressed as a Boolean expression.

## See also

- Pattern matching overview
- Property and positional patterns
- C# operators
- Relational pattern reference
- Logical pattern reference
- Parenthesized pattern reference
