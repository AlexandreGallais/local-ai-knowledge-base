---
id: csharp-analysis-style-rules
title: C# style rules
topic: csharp-analysis
summary: IDE1006, IDE0040, IDE0011 and IDE0044 with examples; the style rules the format command fixes. .NET 10.
tool: dotnet
version: "10.0"
checked: 2026-11-13
sources: [S1]
license: MIT, examples written for this base; rule IDs from the .NET documentation, CC BY 4.0
variant: files
---

# C# style rules

Contents: 1. IDE1006 · 2. IDE0040 · 3. IDE0011 · 4. IDE0044 · 5. Fixed by the format command · Sources

## 1. Start an interface name with I (IDE1006)

Name an interface `IValveStore`, never `ValveStore`. The format command cannot rename it for you. [S1]

Wrong:

```csharp
public interface ValveStore
{
    Valve? Find(string tag);
}
```

Right:

```csharp
public interface IValveStore
{
    Valve? Find(string tag);
}
```

## 2. Write an access modifier on every type and member (IDE0040)

Write `public`, `internal` or `private` on every type and member. [S1]

Wrong:

```csharp
sealed class Counter
{
    public int Count { get; private set; }

    public void Add() => Count++;
}
```

Right:

```csharp
internal sealed class Counter
{
    public int Count { get; private set; }

    public void Add() => Count++;
}
```

## 3. Put braces around every body (IDE0011)

Put braces around the body of every `if`, `else`, `for`, `foreach` and `while`. [S1]

Wrong:

```csharp
public sealed class Gauge
{
    public int Level { get; private set; }

    public void Raise()
    {
        if (Level < 10) Level++;
    }
}
```

Right:

```csharp
public sealed class Gauge
{
    public int Level { get; private set; }

    public void Raise()
    {
        if (Level < 10)
        {
            Level++;
        }
    }
}
```

## 4. Mark a field readonly when nothing changes it (IDE0044)

Mark a private field `readonly` when only its initializer or the constructor sets it. [S1]

Wrong:

```csharp
public sealed class Tank
{
    private int capacity = 40;

    public double Percent(int level) => level * 100.0 / capacity;
}
```

Right:

```csharp
public sealed class Tank
{
    private readonly int capacity = 40;

    public double Percent(int level) => level * 100.0 / capacity;
}
```

## 5. Rules that the format command fixes (C# code style)

Never fix these by hand: run the format command. It applies IDE0005 (unused `using`), IDE0161 (file-scoped namespace), IDE0065 (`using` outside the namespace), IDE0036 (order of modifiers), IDE0051 and IDE0052 (unused private members) and IDE0059 (unused values), and the spaces and line breaks.

## Sources

- [S1] Microsoft, "Code-style rules", .NET 10, <https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/style-rules/>, read 2026-11-13, CC BY 4.0, summarized.
