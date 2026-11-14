---
title: "PerformanceCounterType enum (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/PerformanceCounterType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PerformanceCounterType enum (part 2 of 2)

## PerformanceCounterType.CounterMultiTimer100NsInverse field

```csharp
CounterMultiTimer100NsInverse
```

A percentage counter that shows the active time of one or more components as a percentage of the total time of the sample interval. Counters of this type measure time in 100 nanosecond (ns) units. They derive the active time by measuring the time that the components were not active and subtracting the result from multiplying 100 percent by the number of objects monitored. This counter type is an inverse multitimer.

## PerformanceCounterType.CounterMultiTimerInverse field

```csharp
CounterMultiTimerInverse
```

A percentage counter that shows the active time of one or more components as a percentage of the total time of the sample interval. It derives the active time by measuring the time that the components were not active and subtracting the result from 100 percent by the number of objects monitored. This counter type is an inverse multitimer. It differs from `PerformanceCounterType.CounterMultiTimer100NsInverse` in that it measures time in units of ticks of the system performance timer, rather than in 100 nanosecond units.

## PerformanceCounterType.CounterTimer field

```csharp
CounterTimer
```

A percentage counter that shows the average time that a component is active as a percentage of the total sample time.

## PerformanceCounterType.CounterTimerInverse field

```csharp
CounterTimerInverse
```

A percentage counter that displays the average percentage of active time observed during sample interval. The value of these counters is calculated by monitoring the percentage of time that the service was inactive and then subtracting that value from 100 percent. This is an inverse counter type. It measures time in units of ticks of the system performance timer.

## PerformanceCounterType.CountPerTimeInterval32 field

```csharp
CountPerTimeInterval32
```

An average counter designed to monitor the average length of a queue to a resource over time. It shows the difference between the queue lengths observed during the last two sample intervals divided by the duration of the interval. This type of counter is typically used to track the number of items that are queued or waiting.

## PerformanceCounterType.CountPerTimeInterval64 field

```csharp
CountPerTimeInterval64
```

An average counter that monitors the average length of a queue to a resource over time. Counters of this type display the difference between the queue lengths observed during the last two sample intervals, divided by the duration of the interval. This counter type is the same as `PerformanceCounterType.CountPerTimeInterval32` except that it uses larger fields to accommodate larger values. This type of counter is typically used to track a high-volume or very large number of items that are queued or waiting.

## PerformanceCounterType.ElapsedTime field

```csharp
ElapsedTime
```

A difference timer that shows the total time between when the component or process started and the time when this value is calculated. Counters of this type include System\ System Up Time.

## PerformanceCounterType.NumberOfItems32 field

```csharp
NumberOfItems32
```

An instantaneous counter that shows the most recently observed value. Used, for example, to maintain a simple count of items or operations. Counters of this type include Memory\Available Bytes.

## PerformanceCounterType.NumberOfItems64 field

```csharp
NumberOfItems64
```

An instantaneous counter that shows the most recently observed value. Used, for example, to maintain a simple count of a very large number of items or operations. It is the same as `PerformanceCounterType.NumberOfItems32` except that it uses larger fields to accommodate larger values.

## PerformanceCounterType.NumberOfItemsHEX32 field

```csharp
NumberOfItemsHEX32
```

An instantaneous counter that shows the most recently observed value in hexadecimal format. Used, for example, to maintain a simple count of items or operations.

## PerformanceCounterType.NumberOfItemsHEX64 field

```csharp
NumberOfItemsHEX64
```

An instantaneous counter that shows the most recently observed value. Used, for example, to maintain a simple count of a very large number of items or operations. It is the same as `PerformanceCounterType.NumberOfItemsHEX32` except that it uses larger fields to accommodate larger values.

## PerformanceCounterType.RateOfCountsPerSecond32 field

```csharp
RateOfCountsPerSecond32
```

A difference counter that shows the average number of operations completed during each second of the sample interval. Counters of this type measure time in ticks of the system clock. Counters of this type include System\ File Read Operations/sec.

## PerformanceCounterType.RateOfCountsPerSecond64 field

```csharp
RateOfCountsPerSecond64
```

A difference counter that shows the average number of operations completed during each second of the sample interval. Counters of this type measure time in ticks of the system clock. This counter type is the same as the `PerformanceCounterType.RateOfCountsPerSecond32` type, but it uses larger fields to accommodate larger values to track a high-volume number of items or operations per second, such as a byte-transmission rate. Counters of this type include System\ File Read Bytes/sec.

## PerformanceCounterType.RawBase field

```csharp
RawBase
```

A base counter that stores the denominator of a counter that presents a general arithmetic fraction. Check that this value is greater than zero before using it as the denominator in a `PerformanceCounterType.RawFraction` value calculation.

## PerformanceCounterType.RawFraction field

```csharp
RawFraction
```

An instantaneous percentage counter that shows the ratio of a subset to its set as a percentage. For example, it compares the number of bytes in use on a disk to the total number of bytes on the disk. Counters of this type display the current percentage only, not an average over time. Counters of this type include Paging File\\% Usage Peak.

## PerformanceCounterType.SampleBase field

```csharp
SampleBase
```

A base counter that stores the number of sampling interrupts taken and is used as a denominator in the sampling fraction. The sampling fraction is the number of samples that were 1 (or `true`) for a sample interrupt. Check that this value is greater than zero before using it as the denominator in a calculation of `PerformanceCounterType.SampleFraction`.

## PerformanceCounterType.SampleCounter field

```csharp
SampleCounter
```

An average counter that shows the average number of operations completed in one second. When a counter of this type samples the data, each sampling interrupt returns one or zero. The counter data is the number of ones that were sampled. It measures time in units of ticks of the system performance timer.

## PerformanceCounterType.SampleFraction field

```csharp
SampleFraction
```

A percentage counter that shows the average ratio of hits to all operations during the last two sample intervals. Counters of this type include Cache\Pin Read Hits %.

## PerformanceCounterType.Timer100Ns field

```csharp
Timer100Ns
```

A percentage counter that shows the active time of a component as a percentage of the total elapsed time of the sample interval. It measures time in units of 100 nanoseconds (ns). Counters of this type are designed to measure the activity of one component at a time. Counters of this type include Processor\\% User Time.

## PerformanceCounterType.Timer100NsInverse field

```csharp
Timer100NsInverse
```

A percentage counter that shows the average percentage of active time observed during the sample interval. This is an inverse counter. Counters of this type include Processor\\% Processor Time.
