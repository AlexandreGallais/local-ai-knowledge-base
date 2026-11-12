---
id: csharp-analysis-nullability-rules
title: C# nullability rules
topic: csharp-analysis
summary: CS8602, CS8603, CS8618 and CA1510, with wrong and right examples. .NET 10.
tool: dotnet
version: "10.0"
checked: 2026-11-13
sources: [S1, S2]
license: MIT, examples written for this base; rule IDs from the .NET documentation, CC BY 4.0
variant: files
---

# C# nullability rules

Contents: 1. CS8602 · 2. CS8603 · 3. CS8618 · 4. CA1510 · Sources

Nullable reference types are on: `string` can never be null, `string?` can. Never write `!` after a
value to silence a warning: check the value. [S1]

## 1. Check a value that can be null before you use it (CS8602)

Read a member of a nullable value only after a null check, or with `?.` and `??`. [S1]

Wrong:

```csharp
public static class SensorUnits
{
    public static string UnitOf(Dictionary<string, Sensor> sensors, string name)
    {
        Sensor? sensor = sensors.GetValueOrDefault(name);
        return sensor.Unit;
    }
}
```

Right:

```csharp
public static class SensorUnits
{
    public static string UnitOf(Dictionary<string, Sensor> sensors, string name)
    {
        Sensor? sensor = sensors.GetValueOrDefault(name);
        return sensor?.Unit ?? "unknown";
    }
}
```

## 2. Say when a method can return null (CS8603)

When a method can return null, add `?` to its return type. [S1]

Wrong:

```csharp
public static class ValveFinder
{
    public static Valve Find(IEnumerable<Valve> valves, string tag)
    {
        return valves.FirstOrDefault(valve => valve.Tag == tag);
    }
}
```

Right:

```csharp
public static class ValveFinder
{
    public static Valve? Find(IEnumerable<Valve> valves, string tag)
    {
        return valves.FirstOrDefault(valve => valve.Tag == tag);
    }
}
```

## 3. Give every non-nullable property a value (CS8618)

Mark a property that the caller must set `required`, or give it a value. [S1]

Wrong:

```csharp
public sealed class Pump
{
    public string Tag { get; set; }
}
```

Right:

```csharp
public sealed class Pump
{
    public required string Tag { get; set; }
}
```

## 4. Check arguments with the throw helpers (CA1510)

Write `ArgumentNullException.ThrowIfNull(value)`. Also: `ArgumentException.ThrowIfNullOrEmpty` (CA1511), `ArgumentOutOfRangeException.ThrowIfNegative` (CA1512), `ObjectDisposedException.ThrowIf` (CA1513). [S2]

Wrong:

```csharp
public static class ValveGuard
{
    public static void Open(Valve valve)
    {
        if (valve is null)
        {
            throw new ArgumentNullException(nameof(valve));
        }

        valve.IsOpen = true;
    }
}
```

Right:

```csharp
public static class ValveGuard
{
    public static void Open(Valve valve)
    {
        ArgumentNullException.ThrowIfNull(valve);
        valve.IsOpen = true;
    }
}
```

## Sources

- [S1] Microsoft, "Resolve nullable warnings", <https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-messages/nullable-warnings>, read 2026-11-13, CC BY 4.0, summarized.
- [S2] Microsoft, "CA1510: Use ArgumentNullException throw helper", .NET 10, <https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/quality-rules/ca1510>, read 2026-11-13, CC BY 4.0, summarized.
