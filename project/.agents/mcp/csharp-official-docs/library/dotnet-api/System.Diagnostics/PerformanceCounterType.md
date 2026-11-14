---
title: "PerformanceCounterType enum (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/PerformanceCounterType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PerformanceCounterType enum

Namespace: `System.Diagnostics`

```csharp
public enum PerformanceCounterType
```

Specifies performance counter types that map directly to native types.

The `PerformanceCounterType` enumeration specifies performance counter types that map directly to native types.

Some counter types represent raw data, while others represent calculated values that are based on one or more counter samples. The following categories classify the types of counters available.

- **Average**: Measures a value over time and displays the average of the last two measurements. A base counter that tracks the number of samples involved is associated with each average counter.
- **Difference**: Subtracts the last measurement from the previous one and, if the difference is positive, displays it; if negative, displays a zero.
- **Instantaneous**: Displays the most recent measurement.
- **Percentage**: Displays calculated values as a percentage.
- **Rate**: Samples an increasing count of events over time and divides the change in count values by the change in time to display a rate of activity.

When sampling performance counter data, using a counter type that represents an average can make raw data values meaningful for your use. For example, the raw data counter `NumberOfItems64` can expose data that is fairly random from sample to sample. The formula for an average calculation of the values that the counter returns would be (X 0 +X 1 +…+X n)/n, where each X i is a raw counter sample.

Rate counters are similar to average counters, but more useful for situations in which the rate increases as a resource is used. A formula that quickly calculates the average is ((X n -X 0)/(T n -T 0)) / frequency, where each X i is a counter sample and each T i is the time that the corresponding sample was taken. The result is the average usage per second.

*Multitimer counters* collect data from more than one instance of a component, such as a processor or disk.

*Inverse counters* measure the time that a component is not active and derive the active time from that measurement.

> **Note:**
> Unless otherwise indicated, the time base is seconds.

When instrumenting applications (creating and writing custom performance counters), you might be working with performance counter types that rely on an accompanying base counter that is used in the calculations. The base counter must be immediately after its associated counter in the `CounterCreationDataCollection` collection your application uses. The following table lists the base counter types with their corresponding performance counter types.

| Base counter type  | Performance counter types                    |
|--------------------|----------------------------------------------|
| `AverageBase`      | `AverageTimer32``AverageCount64` |
| `RawBase`          | `RawFraction`                                |
| `CounterMultiBase` | `CounterMultiTimer``CounterMultiTimerInverse``CounterMultiTimer100Ns``CounterMultiTimer100NsInverse`|
| `SampleBase`       | `SampleFraction`                             |

The following are the formulas used by some of the counters that represent calculated values:

- `AverageCount64`: (N1 - N0)/(B1 - B0), where N 1 and N 0 are performance counter readings, and B1 and B0 are their corresponding `AverageBase` values. Thus, the numerator represents the numbers of items processed during the sample interval, and the denominator represents the number of operations completed during the sample interval.

- `AverageTimer32`: ((N1 - N0)/F)/(B1 - B0), where N1 and N0 are performance counter readings, B1 and B0 are their corresponding `AverageBase` values, and F is the number of ticks per second. The value of F is factored into the equation so that the result can be displayed in seconds. Thus, the numerator represents the numbers of ticks counted during the last sample interval, F represents the frequency of the ticks, and the denominator represents the number of operations completed during the last sample interval.

- `CounterDelta32`: N1 - N0, where N1 and N0 are performance counter readings.

- `CounterDelta64`: N1 - N0, where N1 and N0 are performance counter readings.

- `CounterMultiTimer`: ((N1 - N0) / (D1 - D0)) x 100 / B, where N1 and N0 are performance counter readings, D1 and D0 are their corresponding time readings in ticks of the system performance timer, and the variable B denotes the base count for the monitored components (using a base counter of type `CounterMultiBase`). Thus, the numerator represents the portions of the sample interval during which the monitored components were active, and the denominator represents the total elapsed time of the sample interval.

- `CounterMultiTimer100Ns`: ((N1 - N0) / (D1 - D0)) x 100 / B, where N1 and N0 are performance counter readings, D1 and D0 are their corresponding time readings in 100-nanosecond units, and the variable B denotes the base count for the monitored components (using a base counter of type `CounterMultiBase`). Thus, the numerator represents the portions of the sample interval during which the monitored components were active, and the denominator represents the total elapsed time of the sample interval.

- `CounterMultiTimer100NsInverse`: (B - ((N1 - N0) / (D1 - D0))) x 100, where the denominator represents the total elapsed time of the sample interval, the numerator represents the time during the interval when monitored components were inactive, and B represents the number of components being monitored, using a base counter of type `CounterMultiBase`.

- `CounterMultiTimerInverse`: (B- ((N1 - N0) / (D1 - D0))) x 100, where the denominator represents the total elapsed time of the sample interval, the numerator represents the time during the interval when monitored components were inactive, and B represents the number of components being monitored, using a base counter of type `CounterMultiBase`.

- `CounterTimer`: (N1 - N0) / (D1 - D0), where N1 and N0 are performance counter readings, and D1 and D0 are their corresponding time readings. Thus, the numerator represents the portions of the sample interval during which the monitored components were active, and the denominator represents the total elapsed time of the sample interval.

- `CounterTimerInverse`: (1- ((N1 - N0) / (D1 - D0))) x 100, where the numerator represents the time during the interval when the monitored components were inactive, and the denominator represents the total elapsed time of the sample interval.

- `CountPerTimeInterval32`: (N1 - N0) / (D1 - D0), where the numerator represents the number of items in the queue, and the denominator represents the time elapsed during the last sample interval.

- `CountPerTimeInterval64`: (N1 - N0) / (D1 - D0), where the numerator represents the number of items in a queue and the denominator represents the time elapsed during the sample interval.

- `ElapsedTime`: (D0 - N0) / F, where D0 represents the current time, N0 represents the time the object was started, and F represents the number of time units that elapse in one second. The value of F is factored into the equation so that the result can be displayed in seconds.

- `NumberOfItems32`: None. Does not display an average, but shows the raw data as it is collected.

- `NumberOfItems64`: None. Does not display an average, but shows the raw data as it is collected.

- `NumberOfItemsHEX32`: None. Does not display an average, but shows the raw data as it is collected.

- `NumberOfItemsHEX64`: None. Does not display an average, but shows the raw data as it is collected

- `RateOfCountsPerSecond32`: (N1 - N0) / ((D1 - D0) / F), where N1 and N0 are performance counter readings, D1 and D0 are their corresponding time readings, and F represents the number of ticks per second. Thus, the numerator represents the number of operations performed during the last sample interval, the denominator represents the number of ticks elapsed during the last sample interval, and F is the frequency of the ticks. The value of F is factored into the equation so that the result can be displayed in seconds.

- `RateOfCountsPerSecond64`: (N1 - N0) / ((D1 - D0) / F), where N1 and N0 are performance counter readings, D1 and D0 are their corresponding time readings, and F represents the number of ticks per second. Thus, the numerator represents the number of operations performed during the last sample interval, the denominator represents the number of ticks elapsed during the last sample interval, and F is the frequency of the ticks. The value of F is factored into the equation so that the result can be displayed in seconds.

- `RawFraction`: (N0 / D0) x 100, where D0 represents a measured attribute (using a base counter of type `RawBase`) and N0 represents one component of that attribute.

- `SampleCounter`: (N1 - N0) / ((D1 - D0) / F), where the numerator (N) represents the number of operations completed, the denominator (D) represents elapsed time in units of ticks of the system performance timer, and F represents the number of ticks that elapse in one second. F is factored into the equation so that the result can be displayed in seconds.

- `SampleFraction`: ((N1 - N0) / (D1 - D0)) x 100, where the numerator represents the number of successful operations during the last sample interval, and the denominator represents the change in the number of all operations (of the type measured) completed during the sample interval, using counters of type `SampleBase`.

- `Timer100Ns`: (N1 - N0) / (D1 - D0) x 100, where the numerator represents the portions of the sample interval during which the monitored components were active, and the denominator represents the total elapsed time of the sample interval.

- `Timer100NsInverse`: (1- ((N1 - N0) / (D1 - D0))) x 100, where the numerator represents the time during the interval when the monitored components were inactive, and the denominator represents the total elapsed time of the sample interval.

#### Examples

The following examples demonstrate several of the counter types in the `PerformanceCounterType` enumeration.

#### AverageCount64

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationData/Overview/averagecount32.cs._

#### AverageTimer32

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterType/Overview/averagetimer32.cs._

#### ElapsedTime

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounter/NextValue/elapsedtime.cs._

#### NumberOfItems32

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterType/Overview/numberofitems32.cs._

#### NumberOfItems64

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterType/Overview/numberofitems64.cs._

#### SampleFraction

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterType/Overview/program.cs._

#### RateOfCountsPerSecond32

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterType/Overview/rateofcountspersecond32.cs._

#### RateOfCountsPerSecond64

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterType/Overview/rateofcountspersecond64.cs._

#### RawFraction

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterType/Overview/rawfraction.cs._

## PerformanceCounterType.AverageBase field

```csharp
AverageBase
```

A base counter that is used in the calculation of time or count averages, such as `PerformanceCounterType.AverageTimer32` and `PerformanceCounterType.AverageCount64`. Stores the denominator for calculating a counter to present "time per operation" or "count per operation".

## PerformanceCounterType.AverageCount64 field

```csharp
AverageCount64
```

An average counter that shows how many items are processed, on average, during an operation. Counters of this type display a ratio of the items processed to the number of operations completed. The ratio is calculated by comparing the number of items processed during the last interval to the number of operations completed during the last interval. Counters of this type include PhysicalDisk\ Avg. Disk Bytes/Transfer.

## PerformanceCounterType.AverageTimer32 field

```csharp
AverageTimer32
```

An average counter that measures the time it takes, on average, to complete a process or operation. Counters of this type display a ratio of the total elapsed time of the sample interval to the number of processes or operations completed during that time. This counter type measures time in ticks of the system clock. Counters of this type include PhysicalDisk\ Avg. Disk sec/Transfer.

## PerformanceCounterType.CounterDelta32 field

```csharp
CounterDelta32
```

A difference counter that shows the change in the measured attribute between the two most recent sample intervals.

## PerformanceCounterType.CounterDelta64 field

```csharp
CounterDelta64
```

A difference counter that shows the change in the measured attribute between the two most recent sample intervals. It is the same as the `PerformanceCounterType.CounterDelta32` counter type except that is uses larger fields to accommodate larger values.

## PerformanceCounterType.CounterMultiBase field

```csharp
CounterMultiBase
```

A base counter that indicates the number of items sampled. It is used as the denominator in the calculations to get an average among the items sampled when taking timings of multiple, but similar items. Used with `PerformanceCounterType.CounterMultiTimer`, `PerformanceCounterType.CounterMultiTimerInverse`, `PerformanceCounterType.CounterMultiTimer100Ns`, and `PerformanceCounterType.CounterMultiTimer100NsInverse`.

## PerformanceCounterType.CounterMultiTimer field

```csharp
CounterMultiTimer
```

A percentage counter that displays the active time of one or more components as a percentage of the total time of the sample interval. Because the numerator records the active time of components operating simultaneously, the resulting percentage can exceed 100 percent. This counter type differs from `PerformanceCounterType.CounterMultiTimer100Ns` in that it measures time in units of ticks of the system performance timer, rather than in 100 nanosecond units. This counter type is a multitimer.

## PerformanceCounterType.CounterMultiTimer100Ns field

```csharp
CounterMultiTimer100Ns
```

A percentage counter that shows the active time of one or more components as a percentage of the total time of the sample interval. It measures time in 100 nanosecond (ns) units. This counter type is a multitimer.
