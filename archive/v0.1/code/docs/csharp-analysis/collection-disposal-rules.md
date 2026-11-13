---
id: csharp-analysis-collection-disposal-rules
title: C# collection and disposal rules
topic: csharp-analysis
summary: CA1827, CA1860, CA1854, CA1869 and CA1001, with wrong and right examples. .NET 10.
tool: dotnet
version: "10.0"
checked: 2026-11-13
sources: [S1]
license: MIT, examples written for this base; rule IDs from the .NET documentation, CC BY 4.0
variant: files
---

# C# collection and disposal rules

Contents: 1. Any, Count, Length · 2. TryGetValue · 3. JsonSerializerOptions · 4. Disposable fields · Sources

## 1. Any for a sequence, Count or Length for a list (CA1827, CA1829, CA1860)

Test a sequence (`IEnumerable<T>`) with `Any()`. Test a list or an array with its `Count` or `Length` property. Never call the `Count()` method when the property exists. [S1]

Why: `Count()` walks the whole sequence, and `Any()` on a list is slower than reading `Count`.

Wrong:

```csharp
public static class Work
{
    public static bool HasWork(IEnumerable<Valve> pending, List<Valve> done)
    {
        return pending.Count() > 0 || done.Any();
    }
}
```

Right:

```csharp
public static class Work
{
    public static bool HasWork(IEnumerable<Valve> pending, List<Valve> done)
    {
        return pending.Any() || done.Count > 0;
    }
}
```

## 2. Read a dictionary with TryGetValue (CA1854)

Read a dictionary with `TryGetValue`, never with `ContainsKey` followed by the indexer. [S1]

Wrong:

```csharp
public static class Levels
{
    public static double Read(Dictionary<string, double> levels, string tank)
    {
        if (levels.ContainsKey(tank))
        {
            return levels[tank];
        }

        return 0;
    }
}
```

Right:

```csharp
public static class Levels
{
    public static double Read(Dictionary<string, double> levels, string tank)
    {
        return levels.TryGetValue(tank, out double level) ? level : 0;
    }
}
```

## 3. Create JsonSerializerOptions once (CA1869)

Create `JsonSerializerOptions` once, in a `static readonly` field. [S1]

Why: each new options object rebuilds its cache, which is slow.

Wrong:

```csharp
public static class ValveJson
{
    public static string Write(Valve valve)
    {
        return JsonSerializer.Serialize(valve, new JsonSerializerOptions { WriteIndented = true });
    }
}
```

Right:

```csharp
public static class ValveJson
{
    private static readonly JsonSerializerOptions Options = new() { WriteIndented = true };

    public static string Write(Valve valve)
    {
        return JsonSerializer.Serialize(valve, Options);
    }
}
```

## 4. Dispose the disposable fields you own (CA1001, CA2213)

A class that owns a disposable field implements `IDisposable` and disposes that field. Create a local disposable object with a `using` declaration. [S1]

Wrong:

```csharp
public sealed class LogWriter
{
    private readonly StreamWriter writer = new("valves.log");

    public void Write(string line) => writer.WriteLine(line);
}
```

Right:

```csharp
public sealed class LogWriter : IDisposable
{
    private readonly StreamWriter writer = new("valves.log");

    public void Write(string line) => writer.WriteLine(line);

    public void Dispose() => writer.Dispose();
}
```

## Sources

- [S1] Microsoft, "Code quality rules: performance (CA1827, CA1829, CA1854, CA1860, CA1869) and design (CA1001), usage (CA2213)", .NET 10, <https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/quality-rules/performance-warnings>, read 2026-11-13, CC BY 4.0, summarized.
