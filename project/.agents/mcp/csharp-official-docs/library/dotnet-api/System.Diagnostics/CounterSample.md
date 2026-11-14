---
title: "CounterSample struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/CounterSample.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CounterSample struct

Namespace: `System.Diagnostics`

```csharp
public readonly struct CounterSample : IEquatable<System.Diagnostics.CounterSample>
```

Defines a structure that holds the raw data for a performance counter.

#### Examples
The following example demonstrates the use of the `CounterSample` class to display data for a performance counter.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationData/Overview/averagecount32.cs._

## CounterSample.CounterSample(Int64, Int64, Int64, Int64, Int64, Int64, PerformanceCounterType) constructor

```csharp
public CounterSample (long rawValue, long baseValue, long counterFrequency, long systemFrequency, long timeStamp, long timeStamp100nSec, System.Diagnostics.PerformanceCounterType counterType);
```

Initializes a new instance of the `CounterSample` structure and sets the `CounterSample.CounterTimeStamp` property to 0 (zero).

Parameters:

- `rawValue`: The numeric value associated with the performance counter sample.
- `baseValue`: An optional, base raw value for the counter, to use only if the sample is based on multiple counters.
- `counterFrequency`: The frequency with which the counter is read.
- `systemFrequency`: The frequency with which the system reads from the counter.
- `timeStamp`: The raw time stamp.
- `timeStamp100nSec`: The raw, high-fidelity time stamp.
- `counterType`: A `PerformanceCounterType` object that indicates the type of the counter for which this sample is a snapshot.

#### Remarks
Use this constructor to take an initial sample of the performance counter. The System Monitor supplies values for these parameters automatically when you call the `PerformanceCounter.NextSample` method for the first time.

## CounterSample.CounterSample(Int64, Int64, Int64, Int64, Int64, Int64, PerformanceCounterType, Int64) constructor

```csharp
public CounterSample (long rawValue, long baseValue, long counterFrequency, long systemFrequency, long timeStamp, long timeStamp100nSec, System.Diagnostics.PerformanceCounterType counterType, long counterTimeStamp);
```

Initializes a new instance of the `CounterSample` structure and sets the `CounterSample.CounterTimeStamp` property to the value that is passed in.

Parameters:

- `rawValue`: The numeric value associated with the performance counter sample.
- `baseValue`: An optional, base raw value for the counter, to use only if the sample is based on multiple counters.
- `counterFrequency`: The frequency with which the counter is read.
- `systemFrequency`: The frequency with which the system reads from the counter.
- `timeStamp`: The raw time stamp.
- `timeStamp100nSec`: The raw, high-fidelity time stamp.
- `counterType`: A `PerformanceCounterType` object that indicates the type of the counter for which this sample is a snapshot.
- `counterTimeStamp`: The time at which the sample was taken.

#### Remarks
Use this constructor to take samples after you have already taken an initial sample of the performance counter. The System Monitor supplies values for these parameters automatically when you call the `PerformanceCounter.NextSample` method.

#### Examples
The following example demonstrates how to initialize a new `CounterSample` structure, passing in values for the `rawValue`, `baseValue`, `counterFrequency`, `systemFrequency`, `timeStamp`, `timeStamp100nSec`, `counterType`, and `counterTimeStamp` parameters. After creating the `CounterSample` structure, the example displays the property values for the `CounterSample` in the console window.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterSample/.ctor/countersample_ctor_2.cs._

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterSample/.ctor/countersample_ctor_2.cs._

## CounterSample.BaseValue property

```csharp
public long BaseValue { get; }
```

Gets an optional, base raw value for the counter.

Returns: The base raw value, which is used only if the sample is based on multiple counters.

#### Examples
The following example displays the value of the `BaseValue` property for a counter.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationData/Overview/averagecount32.cs._

## CounterSample.CounterFrequency property

```csharp
public long CounterFrequency { get; }
```

Gets the raw counter frequency.

Returns: The frequency with which the counter is read.

#### Examples
The following example displays the value of the `CounterFrequency` property for a counter.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationData/Overview/averagecount32.cs._

## CounterSample.CounterTimeStamp property

```csharp
public long CounterTimeStamp { get; }
```

Gets the counter's time stamp.

Returns: The time at which the sample was taken.

#### Examples
The following example displays the value of the `CounterTimeStamp` property for a counter.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationData/Overview/averagecount32.cs._

## CounterSample.CounterType property

```csharp
public System.Diagnostics.PerformanceCounterType CounterType { get; }
```

Gets the performance counter type.

Returns: A `PerformanceCounterType` object that indicates the type of the counter for which this sample is a snapshot.

To be added.

## CounterSample.RawValue property

```csharp
public long RawValue { get; }
```

Gets the raw value of the counter.

Returns: The numeric value that is associated with the performance counter sample.

#### Examples
The following example displays the value of the `RawValue` property for a counter.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationData/Overview/averagecount32.cs._

## CounterSample.SystemFrequency property

```csharp
public long SystemFrequency { get; }
```

Gets the raw system frequency.

Returns: The frequency with which the system reads from the counter.

#### Examples
The following example displays the value of the `SystemFrequency` property for a counter.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationData/Overview/averagecount32.cs._

## CounterSample.TimeStamp property

```csharp
public long TimeStamp { get; }
```

Gets the raw time stamp.

Returns: The system time stamp.

#### Examples
The following example displays the value of the `TimeStamp` property for a counter.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationData/Overview/averagecount32.cs._

## CounterSample.TimeStamp100nSec property

```csharp
public long TimeStamp100nSec { get; }
```

Gets the raw, high-fidelity time stamp.

Returns: The system time stamp, represented within 0.1 millisecond.

#### Examples
The following example displays the value of the `TimeStamp100nSec` property for a counter.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationData/Overview/averagecount32.cs._

## CounterSample.Calculate(CounterSample) method

```csharp
public static float Calculate (System.Diagnostics.CounterSample counterSample);
```

Calculates the performance data of the counter, using a single sample point. This method is generally used for uncalculated performance counter types.

Parameters:

- `counterSample`: The `CounterSample` structure to use as a base point for calculating performance data.

Returns: The calculated performance value.

To be added.

## CounterSample.Calculate(CounterSample, CounterSample) method

```csharp
public static float Calculate (System.Diagnostics.CounterSample counterSample, System.Diagnostics.CounterSample nextCounterSample);
```

Calculates the performance data of the counter, using two sample points. This method is generally used for calculated performance counter types, such as averages.

Parameters:

- `counterSample`: The `CounterSample` structure to use as a base point for calculating performance data.
- `nextCounterSample`: The `CounterSample` structure to use as an ending point for calculating performance data.

Returns: The calculated performance value.

To be added.

## CounterSample.Equals(CounterSample) method

```csharp
public bool Equals (System.Diagnostics.CounterSample sample);
```

Indicates whether the specified `CounterSample` structure is equal to the current `CounterSample` structure.

Parameters:

- `sample`: The `CounterSample` structure to be compared with this instance.

Returns: `true` if `sample` is equal to the current instance; otherwise, `false`.

#### Remarks
Two `CounterSample` structures are equal if they have identical property values.

## CounterSample.Equals(Object) method

```csharp
public override bool Equals (object o);
```

Indicates whether the specified structure is a `CounterSample` structure and is identical to the current `CounterSample` structure.

Parameters:

- `o`: The `CounterSample` structure to be compared with the current structure.

Returns: `true` if `o` is a `CounterSample` structure and is identical to the current instance; otherwise, `false`.

#### Remarks
Two `CounterSample` structures are equal if they have identical property values.

## CounterSample.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Gets a hash code for the current counter sample.

Returns: A hash code for the current counter sample.

To be added.

## CounterSample.op_Equality(CounterSample, CounterSample) method

```csharp
public static bool operator == (System.Diagnostics.CounterSample a, System.Diagnostics.CounterSample b);
```

Returns a value that indicates whether two `CounterSample` structures are equal.

Parameters:

- `a`: A `CounterSample` structure.
- `b`: Another `CounterSample` structure to be compared to the structure specified by the `a` parameter.

Returns: `true` if `a` and `b` are equal; otherwise, `false`.

#### Remarks
Two `CounterSample` structures are equal if they have identical property values.

The equivalent method for this operator is `Equals`.

## CounterSample.op_Inequality(CounterSample, CounterSample) method

```csharp
public static bool operator != (System.Diagnostics.CounterSample a, System.Diagnostics.CounterSample b);
```

Returns a value that indicates whether two `CounterSample` structures are not equal.

Parameters:

- `a`: A `CounterSample` structure.
- `b`: Another `CounterSample` structure to be compared to the structure specified by the `a` parameter.

Returns: `true` if `a` and `b` are not equal; otherwise, `false`.

#### Remarks
Two `CounterSample` structures are not equal if any of their property values are different.

The equivalent method for this operator is `Equals`.

## CounterSample.Empty field

```csharp
public static System.Diagnostics.CounterSample Empty;
```

Defines an empty, uninitialized performance counter sample of type `NumberOfItems32`.

To be added.
