---
title: "Iterators"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/building-software/iterators.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Iterators

Choose an iterator when you want to return a sequence whose elements callers can consume one at a time, without first building the complete result in a collection. This approach fits generated values, filters with custom control flow, and sequences that callers might stop reading early. Compared with a completed collection, an iterator changes when the work happens, not just how you write it.

> **Tip:**
> This article teaches synchronous iterators for developers who know methods, loops, and collections. For complete `yield` syntax and restrictions, see the `yield` statement reference.

An *iterator method* produces a sequence of values one at a time. This article focuses on iterator methods that return `System.Collections.Generic.IEnumerable`1`, whose values callers usually consume with a `foreach` statement.

## Produce elements with `yield return`

Use `yield return` to provide the next element in the sequence. The following iterator selects acceptable temperature readings from a sensor. In this scenario, `-1` marks the end of the sensor data.

```csharp
int[] readings = [21, 27, 24, -1, 19];

IEnumerable<int> acceptedReadings =
    SelectTemperatures(readings, maximum: 25);

Console.WriteLine("Sequence created.");

foreach (int temperature in acceptedReadings)
{
    Console.WriteLine($"Accepted: {temperature}°C");
}

static IEnumerable<int> SelectTemperatures(
    IEnumerable<int> readings,
    int maximum)
{
    foreach (int reading in readings)
    {
        Console.WriteLine($"Checking {reading}°C");

        if (reading == -1)
        {
            yield break;
        }

        if (reading <= maximum)
        {
            yield return reading;
        }
    }
}
```
`SelectTemperatures` returns `IEnumerable<int>`, which represents a sequence of `int` values. Each `yield return reading` provides one value to the `foreach` loop. After the caller handles that value, the iterator continues with the next input.

Use the generic `IEnumerable<T>` form for most modern C# code. The type argument, such as `int`, tells callers which element type the sequence contains.

## End the sequence with `yield break`

Use `yield break` to end an iterator before control reaches the end of the method. In the example, the sentinel value `-1` means that no more readings are available:

```csharp
if (reading == -1)
{
    yield break;
}
```

The iterator also ends naturally when execution reaches the end of its body. Use `yield break` when a condition should stop element production immediately.

## Consume an iterator with `foreach`

An iterator exposes the same `IEnumerable<T>` shape as many .NET collections. Callers can use `foreach` without knowing how the sequence produces its elements:

```csharp
foreach (int temperature in SelectTemperatures(readings, 25))
{
    Console.WriteLine($"Accepted: {temperature}°C");
}
```

The caller requests each element as the loop advances. The iterator keeps its position between requests and continues after the previous `yield return`.

## Understand deferred element production

Calling an iterator method doesn't run its body immediately. The method starts to produce elements when the caller begins enumeration. This behavior is called *deferred execution*.

The example prints `Sequence created.` before any `Checking ...` messages. The iterator starts checking readings only when the `foreach` loop asks for its first element.

Deferred execution has practical effects:

- The caller can begin processing before the iterator produces every element.
- The iterator can stop early with `yield break`.
- A caller that never enumerates the sequence doesn't run the iterator body.
- Each new enumeration runs the iterator again.

Make deferred execution clear in the method's purpose and documentation. Readers can't infer execution timing from `IEnumerable<T>` alone because both iterators and collections can expose that interface. Keep element production free of unrelated side effects because callers might enumerate the sequence later or more than once. The example's diagnostic messages illustrate that timing.

## Choose an iterator or collection

Return an iterator when values naturally arrive one at a time or when the caller doesn't need the complete result immediately. Return a completed collection when callers need a stable snapshot, indexed access, or repeated enumeration without recalculating the elements.

Both approaches can return the same elements. The iterator leaves element production under the caller's control; a method that builds a collection completes that work before it returns.

Use an ordinary loop when you want to perform an action for each item without returning a sequence. For a standard filter or transformation, prefer a LINQ operation such as `Where` or `Select`; write an iterator when custom element-production logic is clearer as a series of statements.

Iterator methods compose with LINQ because both use `IEnumerable<T>`. For example, a caller can add another filter:

```csharp
var comfortableReadings = SelectTemperatures(readings, 25)
    .Where(static temperature => temperature >= 18);
```

The iterator and LINQ operation remain deferred until code enumerates `comfortableReadings`.

For asynchronous sequences, see Generate and consume asynchronous streams. For custom enumeration patterns and all `yield` restrictions, use the language reference.

## See also

- Building software
- Lambda expressions
- Local functions
- `foreach` statement
- `yield` statement
- LINQ
