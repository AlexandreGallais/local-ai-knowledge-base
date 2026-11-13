---
title: "Property and positional patterns (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/patterns/property-positional-patterns.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Property and positional patterns (part 2 of 2)

## Compare patterns with branching statements

The earlier `DescribeDate` method expresses four results as patterns:

```csharp
static class PropertyPositionalPatterns
{
    public static void Run()
    {
        Console.WriteLine($"Hot and humid: {IsHotAndHumid(
            new WeatherReading(32, 75))}");
        Console.WriteLine($"Date: {DescribeDate(
            new DateTime(2026, 9, 19))}");
        Console.WriteLine($"Nullable input: {DescribeNullableInput(null)}");
        Console.WriteLine($"Date (branches): {DescribeDateWithBranches(
            new DateTime(2026, 9, 19))}");
        Console.WriteLine($"Crossing: {GetCrossingInstruction(
            PedestrianSignal.Walk, crossingIsClear: true)}");
    }

    static bool IsHotAndHumid(WeatherReading reading) =>
        reading is { TemperatureC: > 30, HumidityPercent: > 70 };

    sealed record WeatherReading(int TemperatureC, int HumidityPercent);

    static string DescribeDate(object? value) =>
        value switch
        {
            DateTime { Date.DayOfWeek:
                DayOfWeek.Saturday or DayOfWeek.Sunday } => "Weekend date",
            DateTime => "Weekday date",
            null => "No date",
            _ => "Not a date"
        };

    static string DescribeNullableInput(object? value)
    {
        if (value is not { } nonNullValue)
        {
            return "No value";
        }

        return nonNullValue switch
        {
            DateTime => "Date",
            string => "Text",
            _ => "Another type"
        };
    }

    static string DescribeDateWithBranches(object? value)
    {
        if (value is DateTime date)
        {
            if (date.DayOfWeek == DayOfWeek.Saturday ||
                date.DayOfWeek == DayOfWeek.Sunday)
            {
                return "Weekend date";
            }

            return "Weekday date";
        }

        if (value is null)
        {
            return "No date";
        }

        return "Not a date";
    }

    static string GetCrossingInstruction(
        PedestrianSignal signal, bool crossingIsClear) =>
        (signal, crossingIsClear) switch
        {
            (PedestrianSignal.Walk, true) => "Cross now",
            (PedestrianSignal.Walk, false) => "Wait for the crossing to clear",
            _ => "Wait for the walk signal"
        };

    enum PedestrianSignal
    {
        Stop,
        Walk
    }
}
```
The following method produces the same results with a series of imperative branching statements:

```csharp
static class PropertyPositionalPatterns
{
    public static void Run()
    {
        Console.WriteLine($"Hot and humid: {IsHotAndHumid(
            new WeatherReading(32, 75))}");
        Console.WriteLine($"Date: {DescribeDate(
            new DateTime(2026, 9, 19))}");
        Console.WriteLine($"Nullable input: {DescribeNullableInput(null)}");
        Console.WriteLine($"Date (branches): {DescribeDateWithBranches(
            new DateTime(2026, 9, 19))}");
        Console.WriteLine($"Crossing: {GetCrossingInstruction(
            PedestrianSignal.Walk, crossingIsClear: true)}");
    }

    static bool IsHotAndHumid(WeatherReading reading) =>
        reading is { TemperatureC: > 30, HumidityPercent: > 70 };

    sealed record WeatherReading(int TemperatureC, int HumidityPercent);

    static string DescribeDate(object? value) =>
        value switch
        {
            DateTime { Date.DayOfWeek:
                DayOfWeek.Saturday or DayOfWeek.Sunday } => "Weekend date",
            DateTime => "Weekday date",
            null => "No date",
            _ => "Not a date"
        };

    static string DescribeNullableInput(object? value)
    {
        if (value is not { } nonNullValue)
        {
            return "No value";
        }

        return nonNullValue switch
        {
            DateTime => "Date",
            string => "Text",
            _ => "Another type"
        };
    }

    static string DescribeDateWithBranches(object? value)
    {
        if (value is DateTime date)
        {
            if (date.DayOfWeek == DayOfWeek.Saturday ||
                date.DayOfWeek == DayOfWeek.Sunday)
            {
                return "Weekend date";
            }

            return "Weekday date";
        }

        if (value is null)
        {
            return "No date";
        }

        return "Not a date";
    }

    static string GetCrossingInstruction(
        PedestrianSignal signal, bool crossingIsClear) =>
        (signal, crossingIsClear) switch
        {
            (PedestrianSignal.Walk, true) => "Cross now",
            (PedestrianSignal.Walk, false) => "Wait for the crossing to clear",
            _ => "Wait for the walk signal"
        };

    enum PedestrianSignal
    {
        Stop,
        Walk
    }
}
```
The pattern-based version keeps the possible results together when several branches test a value's type and shape. The imperative version makes each test and return step explicit. For one condition, either form might look similar. As the number of related branches grows, patterns can make the alternatives easier to compare.

## See also

- Pattern matching overview
- Relational, logical, and parenthesized patterns.
- Deconstructing tuples and other types
- Property pattern reference.
- Positional pattern reference.
