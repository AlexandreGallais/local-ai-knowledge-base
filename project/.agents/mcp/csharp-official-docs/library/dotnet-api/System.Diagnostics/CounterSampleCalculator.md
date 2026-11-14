---
title: "CounterSampleCalculator class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/CounterSampleCalculator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CounterSampleCalculator class

Namespace: `System.Diagnostics`

```csharp
public static class CounterSampleCalculator
```

Provides a set of utility functions for interpreting performance counter data.

To be added.

## CounterSampleCalculator.ComputeCounterValue(CounterSample) method

```csharp
public static float ComputeCounterValue (System.Diagnostics.CounterSample newSample);
```

Computes the calculated value of a single raw counter sample.

Parameters:

- `newSample`: A `CounterSample` that indicates the most recent sample the system has taken.

Returns: A floating-point representation of the performance counter's calculated value.

#### Remarks
The `ComputeCounterValue` method overload returns meaningful results only for performance counters of the following `PerformanceCounterType`:

-   `RawFraction`

-   `NumberOfItems32`

-   `NumberOfItemsHEX32`

-   `NumberOfItems64`

-   `NumberOfItemsHEX64`

For other counter types, this overload always returns a value of 0 (zero).

## CounterSampleCalculator.ComputeCounterValue(CounterSample, CounterSample) method

```csharp
public static float ComputeCounterValue (System.Diagnostics.CounterSample oldSample, System.Diagnostics.CounterSample newSample);
```

Computes the calculated value of two raw counter samples.

Parameters:

- `oldSample`: A `CounterSample` that indicates a previous sample the system has taken.
- `newSample`: A `CounterSample` that indicates the most recent sample the system has taken.

Returns: A floating-point representation of the performance counter's calculated value.

Exceptions:

- `InvalidOperationException`: `oldSample` uses a counter type that is different from `newSample`.
- `Win32Exception`: `newSample` counter type has a Performance Data Helper (PDH) error. For more information, see "Checking PDH Interface Return Values" in the Win32 and COM Development section of this documentation.

#### Examples
The following example demonstrates the use of the `ComputeCounterValue` method overload to calculate the value of two raw counter samples.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationData/Overview/averagecount32.cs._
