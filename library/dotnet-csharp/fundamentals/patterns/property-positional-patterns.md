---
title: "Property and positional patterns (part 1 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/patterns/property-positional-patterns.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Property and positional patterns

> **Tip:**
> This article is part of the **Fundamentals** section for developers who already know at least one programming language and are learning C#. Start with the pattern matching overview if patterns are new to you. For complete language rules, see property patterns and positional patterns in the language reference.

Property and positional patterns both test parts of a value. The difference is how they identify those parts:

- A *property pattern* names the properties or fields to test.
- A *positional pattern* identifies values by their order.

A *deconstruction* exposes an ordered set of component values. A tuple already has an element order; see deconstruct tuples. For another type, a `Deconstruct` method defines which component values are exposed and their order.

## Compare names and positions

The following property pattern tests two named properties of a weather reading, with temperature values in degrees Celsius:

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
The following positional pattern tests a signal value followed by a Boolean value:

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
The property pattern identifies its inputs by the names `TemperatureC` and `HumidityPercent`. The crossing code creates a tuple from the separate `signal` and `crossingIsClear` values. The tuple pattern then identifies those values by order: `signal` first and `crossingIsClear` second. A positional pattern is a strong fit because this newly created tuple has only two values, and their order has a clear meaning in the crossing decision.

Choose a property pattern when member names help explain the test. Property patterns are usually clearer for classes, structs, and records. Choose a positional pattern when order already gives the values an obvious meaning. Positional patterns are most useful with tuples, which combine multiple related values into one value with a fixed order.

## Follow nested inputs in recursive patterns

Property and positional patterns are *recursive patterns*: They apply another pattern to each property, field, or position they select. The selected value becomes the input to that nested pattern.

In `IsHotAndHumid`, the `reading` expression is the input to the property pattern. C# evaluates that expression before matching. The pattern gets two values from the resulting object:

- The relational pattern `> 30` tests the value of `TemperatureC`.
- The relational pattern `> 70` tests the value of `HumidityPercent`.

An outer type test is optional, and recursive pattern clauses can be empty. For example, the empty property pattern `{ }` matches any non-null evaluated value.

Property and positional patterns match only non-null evaluated values. When `null` is part of the input domain, choose a recursive pattern that checks for a non-null value first:

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
The input expression is `value`. C# evaluates it, and the `{ }` property pattern tests the resulting value for non-null before assigning it to `nonNullValue`. The following switch expression can then test multiple possible runtime types. Its `DateTime` and `string` type patterns have no designation because the method only needs to identify each type, not capture its value.

When recursive pattern clauses contain nested patterns, each selected property, field, or position becomes the input to its nested pattern.

You can add a type test before the braces when the input expression can produce different types. You can also use a member path to test a nested property:

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
`value` is the input expression. C# first evaluates it and tests whether the resulting value is a `System.DateTime`. The `Date` property value then becomes the input for the `DayOfWeek` member access. Finally, the `DayOfWeek` value becomes the input to the logical pattern that tests two constants. Matching succeeds when the outer value has the specified type and every object needed along the member path is non-null.
