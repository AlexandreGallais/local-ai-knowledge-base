---
title: "Breaking change: CreateCounterSetInstance throws InvalidOperationException if instance already exists"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/5.0/createcountersetinstance-throws-invalidoperation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CounterSet.CreateCounterSetInstance now throws InvalidOperationException if instance already exists

Starting in .NET 5, `System.Diagnostics.PerformanceData.CounterSet.CreateCounterSetInstance(System.String)` throws an `System.InvalidOperationException` instead of an `System.ArgumentException` if the counter set already exists.

## Change description

In .NET Framework and .NET Core 1.0 to 3.1, you can create an instance of the counter set by calling `System.Diagnostics.PerformanceData.CounterSet.CreateCounterSetInstance*`. However, if the counter set already exists, the method throws an `System.ArgumentException` exception.

In .NET 5 and later versions, when you call `System.Diagnostics.PerformanceData.CounterSet.CreateCounterSetInstance*` and the counter set exists, an `System.InvalidOperationException` exception is thrown.

## Version introduced

5.0

## Recommended action

If you catch `System.ArgumentException` exceptions in your app when calling `System.Diagnostics.PerformanceData.CounterSet.CreateCounterSetInstance*`, consider also catching `System.InvalidOperationException` exceptions.

> **Note:**
> Catching `System.ArgumentException` exceptions is not recommended.

## Affected APIs

- `System.Diagnostics.PerformanceData.CounterSet.CreateCounterSetInstance*`
