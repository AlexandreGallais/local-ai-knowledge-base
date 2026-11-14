---
title: "Use record types tutorial"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/fundamentals/tutorials/records.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Use record types

> **Tip:**
> **New to developing software?** Start with the Get started tutorials first. You get comfortable with classes, methods, and loops there.
>
> **Experienced in another language?** This tutorial focuses on C# record features you use every day: value equality, positional syntax, and `with` expressions.

In this tutorial, you build a console app that models daily temperatures by using records and record structs.

In this tutorial, you learn how to:

- Declare positional records and record structs.
- Build a small record hierarchy.
- Use compiler-generated equality and formatting.
- Use `with` expressions for nondestructive mutation.

## Prerequisites

- The latest .NET SDK
- Visual Studio Code editor
- The C# DevKit

### Installation instructions

On Windows, this WinGet configuration file to install all prerequisites. If you already have something installed, WinGet will skip that step.

1. Download the file and double-click to run it.
1. Read the license agreement, type `y`, and select `Enter` when prompted to accept.
1. If you get a flashing User Account Control (UAC) prompt in your Taskbar, allow the installation to continue.

On other platforms, you need to install each of these components separately.

1. Download the recommended installer from the .NET SDK download page and double-click to run it. The download page detects your platform and recommends the latest installer for your platform.
1. Download the latest installer from the Visual Studio Code home page and double click to run it. That page also detects your platform and the link should be correct for your system.
1. Click the "Install" button on the C# DevKit extension page. That opens Visual Studio code, and asks if you want to install or enable the extension. Select "install".

## Create the app and your first record

Create a folder for your app, run `dotnet new console`, and open the generated project.

Add a file named `DailyTemperature.cs`, and add a positional `readonly record struct` for temperature values:

```csharp
﻿namespace record_types;

public readonly record struct DailyTemperature(double HighTemp, double LowTemp)
{
    public double Mean => (HighTemp + LowTemp) / 2.0;
}
```
Add a file named `Program.cs`, and create sample temperature data:

```csharp
﻿namespace record_types;

class Program
{
    private static DailyTemperature[] data = [
        new DailyTemperature(HighTemp: 57, LowTemp: 30), 
        new DailyTemperature(60, 35),
        new DailyTemperature(63, 33),
        new DailyTemperature(68, 29),
        new DailyTemperature(72, 47),
        new DailyTemperature(75, 55),
        new DailyTemperature(77, 55),
        new DailyTemperature(72, 58),
        new DailyTemperature(70, 47),
        new DailyTemperature(77, 59),
        new DailyTemperature(85, 65),
        new DailyTemperature(87, 65),
        new DailyTemperature(85, 72),
        new DailyTemperature(83, 68),
        new DailyTemperature(77, 65),
        new DailyTemperature(72, 58),
        new DailyTemperature(77, 55),
        new DailyTemperature(76, 53),
        new DailyTemperature(80, 60),
        new DailyTemperature(85, 66) 
    ];

    static void Main(string[] args)
    {
        var heatingDegreeDays = new HeatingDegreeDays(65, data);
        Console.WriteLine(heatingDegreeDays);

        var coolingDegreeDays = new CoolingDegreeDays(65, data);
        Console.WriteLine(coolingDegreeDays);

        // Growing degree days measure warming to determine plant growing rates
        var growingDegreeDays = coolingDegreeDays with { BaseTemperature = 41 };
        Console.WriteLine(growingDegreeDays);

        // showing moving accumulation of 5 days using range syntax
        List<CoolingDegreeDays> movingAccumulation = new();
        int rangeSize = (data.Length > 5) ? 5 : data.Length;
        for (int start = 0; start < data.Length - rangeSize; start++)
        {
            var fiveDayTotal = growingDegreeDays with { TempRecords = data[start..(start + rangeSize)] };
            movingAccumulation.Add(fiveDayTotal);
        }
        Console.WriteLine();
        Console.WriteLine("Total degree days in the last five days");
        foreach(var item in movingAccumulation)
        {
            Console.WriteLine(item);
        }
    }
}
```
This syntax gives you concise data modeling with immutable value semantics.

## Add behavior to the record struct

In `DailyTemperature.cs`, the record struct already has a computed `Mean` property:

```csharp
public double Mean => (HighTemp + LowTemp) / 2.0;
```

A record struct works well here because each value is small and self-contained.

## Build record types for degree-day calculations

> **Note:**
> **Heating degree-days** and **cooling degree-days** measure how much the daily average temperature deviates from a base temperature (typically 65°F/18°C). Heating degree-days accumulate on cold days when the average is below the base, while cooling degree-days accumulate on warm days when the average is above the base. These calculations help estimate energy consumption for heating or cooling buildings, making them useful for utility companies, building managers, and climate analysis.

Create a file named `DegreeDays.cs` with a hierarchy for heating and cooling degree-day calculations:

```csharp
﻿namespace InterimSteps
{
    public readonly record struct DailyTemperature(double HighTemp, double LowTemp);

}

namespace InterimSteps2
{
    public readonly record struct DailyTemperature(double HighTemp, double LowTemp)
    {
        public double Mean => (HighTemp + LowTemp) / 2.0;
    }

    public abstract record DegreeDays(double BaseTemperature, IEnumerable<DailyTemperature> TempRecords);

    public sealed record HeatingDegreeDays(double BaseTemperature, IEnumerable<DailyTemperature> TempRecords)
        : DegreeDays(BaseTemperature, TempRecords)
    {
        public double DegreeDays => TempRecords.Where(s => s.Mean < BaseTemperature).Sum(s => BaseTemperature - s.Mean);
    }

    public sealed record CoolingDegreeDays(double BaseTemperature, IEnumerable<DailyTemperature> TempRecords)
        : DegreeDays(BaseTemperature, TempRecords)
    {
        public double DegreeDays => TempRecords.Where(s => s.Mean > BaseTemperature).Sum(s => s.Mean - BaseTemperature);
    }
}
```
Now calculate totals from your `Main` method in `Program.cs`:

```csharp
﻿namespace record_types;

class Program
{
    private static DailyTemperature[] data = [
        new DailyTemperature(HighTemp: 57, LowTemp: 30), 
        new DailyTemperature(60, 35),
        new DailyTemperature(63, 33),
        new DailyTemperature(68, 29),
        new DailyTemperature(72, 47),
        new DailyTemperature(75, 55),
        new DailyTemperature(77, 55),
        new DailyTemperature(72, 58),
        new DailyTemperature(70, 47),
        new DailyTemperature(77, 59),
        new DailyTemperature(85, 65),
        new DailyTemperature(87, 65),
        new DailyTemperature(85, 72),
        new DailyTemperature(83, 68),
        new DailyTemperature(77, 65),
        new DailyTemperature(72, 58),
        new DailyTemperature(77, 55),
        new DailyTemperature(76, 53),
        new DailyTemperature(80, 60),
        new DailyTemperature(85, 66) 
    ];

    static void Main(string[] args)
    {
        var heatingDegreeDays = new HeatingDegreeDays(65, data);
        Console.WriteLine(heatingDegreeDays);

        var coolingDegreeDays = new CoolingDegreeDays(65, data);
        Console.WriteLine(coolingDegreeDays);

        // Growing degree days measure warming to determine plant growing rates
        var growingDegreeDays = coolingDegreeDays with { BaseTemperature = 41 };
        Console.WriteLine(growingDegreeDays);

        // showing moving accumulation of 5 days using range syntax
        List<CoolingDegreeDays> movingAccumulation = new();
        int rangeSize = (data.Length > 5) ? 5 : data.Length;
        for (int start = 0; start < data.Length - rangeSize; start++)
        {
            var fiveDayTotal = growingDegreeDays with { TempRecords = data[start..(start + rangeSize)] };
            movingAccumulation.Add(fiveDayTotal);
        }
        Console.WriteLine();
        Console.WriteLine("Total degree days in the last five days");
        foreach(var item in movingAccumulation)
        {
            Console.WriteLine(item);
        }
    }
}
```
The generated `ToString` output is useful for quick diagnostics while you iterate.

## Override `PrintMembers` to customize output

When the default output includes too much noise, override `PrintMembers` in the base record:

```csharp
﻿using System.Text;

namespace record_types;

public abstract record DegreeDays(double BaseTemperature, IEnumerable<DailyTemperature> TempRecords)
{
    protected virtual bool PrintMembers(StringBuilder stringBuilder)
    {
        stringBuilder.Append($"BaseTemperature = {BaseTemperature}");
        return true;
    }
}

public record HeatingDegreeDays(double BaseTemperature, IEnumerable<DailyTemperature> TempRecords)
    : DegreeDays(BaseTemperature, TempRecords)
{
    public double DegreeDays => TempRecords.Where(s => s.Mean < BaseTemperature).Sum(s => BaseTemperature - s.Mean);
}

public sealed record CoolingDegreeDays(double BaseTemperature, IEnumerable<DailyTemperature> TempRecords)
    : DegreeDays(BaseTemperature, TempRecords)
{
    public double DegreeDays => TempRecords.Where(s => s.Mean > BaseTemperature).Sum(s => s.Mean - BaseTemperature);
}
```
The override keeps the output focused on the information you need.

## Use with expressions for nondestructive mutation

Use `with` to create modified copies without mutating the original record:

```csharp
﻿namespace record_types;

class Program
{
    private static DailyTemperature[] data = [
        new DailyTemperature(HighTemp: 57, LowTemp: 30), 
        new DailyTemperature(60, 35),
        new DailyTemperature(63, 33),
        new DailyTemperature(68, 29),
        new DailyTemperature(72, 47),
        new DailyTemperature(75, 55),
        new DailyTemperature(77, 55),
        new DailyTemperature(72, 58),
        new DailyTemperature(70, 47),
        new DailyTemperature(77, 59),
        new DailyTemperature(85, 65),
        new DailyTemperature(87, 65),
        new DailyTemperature(85, 72),
        new DailyTemperature(83, 68),
        new DailyTemperature(77, 65),
        new DailyTemperature(72, 58),
        new DailyTemperature(77, 55),
        new DailyTemperature(76, 53),
        new DailyTemperature(80, 60),
        new DailyTemperature(85, 66) 
    ];

    static void Main(string[] args)
    {
        var heatingDegreeDays = new HeatingDegreeDays(65, data);
        Console.WriteLine(heatingDegreeDays);

        var coolingDegreeDays = new CoolingDegreeDays(65, data);
        Console.WriteLine(coolingDegreeDays);

        // Growing degree days measure warming to determine plant growing rates
        var growingDegreeDays = coolingDegreeDays with { BaseTemperature = 41 };
        Console.WriteLine(growingDegreeDays);

        // showing moving accumulation of 5 days using range syntax
        List<CoolingDegreeDays> movingAccumulation = new();
        int rangeSize = (data.Length > 5) ? 5 : data.Length;
        for (int start = 0; start < data.Length - rangeSize; start++)
        {
            var fiveDayTotal = growingDegreeDays with { TempRecords = data[start..(start + rangeSize)] };
            movingAccumulation.Add(fiveDayTotal);
        }
        Console.WriteLine();
        Console.WriteLine("Total degree days in the last five days");
        foreach(var item in movingAccumulation)
        {
            Console.WriteLine(item);
        }
    }
}
```
Extend that idea to compute rolling totals from slices of your input data:

```csharp
﻿namespace record_types;

class Program
{
    private static DailyTemperature[] data = [
        new DailyTemperature(HighTemp: 57, LowTemp: 30), 
        new DailyTemperature(60, 35),
        new DailyTemperature(63, 33),
        new DailyTemperature(68, 29),
        new DailyTemperature(72, 47),
        new DailyTemperature(75, 55),
        new DailyTemperature(77, 55),
        new DailyTemperature(72, 58),
        new DailyTemperature(70, 47),
        new DailyTemperature(77, 59),
        new DailyTemperature(85, 65),
        new DailyTemperature(87, 65),
        new DailyTemperature(85, 72),
        new DailyTemperature(83, 68),
        new DailyTemperature(77, 65),
        new DailyTemperature(72, 58),
        new DailyTemperature(77, 55),
        new DailyTemperature(76, 53),
        new DailyTemperature(80, 60),
        new DailyTemperature(85, 66) 
    ];

    static void Main(string[] args)
    {
        var heatingDegreeDays = new HeatingDegreeDays(65, data);
        Console.WriteLine(heatingDegreeDays);

        var coolingDegreeDays = new CoolingDegreeDays(65, data);
        Console.WriteLine(coolingDegreeDays);

        // Growing degree days measure warming to determine plant growing rates
        var growingDegreeDays = coolingDegreeDays with { BaseTemperature = 41 };
        Console.WriteLine(growingDegreeDays);

        // showing moving accumulation of 5 days using range syntax
        List<CoolingDegreeDays> movingAccumulation = new();
        int rangeSize = (data.Length > 5) ? 5 : data.Length;
        for (int start = 0; start < data.Length - rangeSize; start++)
        {
            var fiveDayTotal = growingDegreeDays with { TempRecords = data[start..(start + rangeSize)] };
            movingAccumulation.Add(fiveDayTotal);
        }
        Console.WriteLine();
        Console.WriteLine("Total degree days in the last five days");
        foreach(var item in movingAccumulation)
        {
            Console.WriteLine(item);
        }
    }
}
```
This approach is useful when you need transformations while you preserve original values.

## Next steps

- Review C# record types for deeper guidance.
- Continue with Object-oriented C# for broader design patterns.
- Explore Converting types to combine records with safe conversion patterns.
