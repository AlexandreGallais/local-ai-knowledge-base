---
title: "PerformanceCounter class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/PerformanceCounter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PerformanceCounter class (part 4 of 4)

## PerformanceCounter.IncrementBy(Int64) method

```csharp
public long IncrementBy (long value);
```

Increments or decrements the value of the associated performance counter by a specified amount through an efficient atomic operation.

Parameters:

- `value`: The value to increment by. (A negative value decrements the counter.)

Returns: The new counter value.

Exceptions:

- `InvalidOperationException`: The counter is read-only, so the application cannot increment it.

-or-

The instance is not correctly associated with a performance counter.

-or-

The `PerformanceCounter.InstanceLifetime` property is set to `PerformanceCounterInstanceLifetime.Process` when using global shared memory.
- `Win32Exception`: An error occurred when accessing a system API.

#### Remarks
You can write only to custom counters. All system counters are read-only.

> **Note:**
> The `PerformanceCounter.Increment`, `PerformanceCounter.IncrementBy`, and `PerformanceCounter.Decrement` methods use interlocks to update the counter value. This helps keep the counter value accurate in multithreaded or multiprocess scenarios, but also results in a performance penalty. If you do not need the accuracy that interlocked operations provide, you can update the `RawValue` property directly for up to a 5 times performance improvement.  However, in multithreaded scenarios, some updates to the counter value might be ignored, resulting in inaccurate data.

#### Examples
The following code example demonstrates how to use the `PerformanceCounter.IncrementBy` method to add increments to a counter. This code example is part of a larger example for the `PerformanceCounter` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationData/Overview/averagecount32.cs._

## PerformanceCounter.NextSample() method

```csharp
public System.Diagnostics.CounterSample NextSample ();
```

Obtains a counter sample, and returns the raw, or uncalculated, value for it.

Returns: A `CounterSample` that represents the next raw value that the system obtains for this counter.

Exceptions:

- `InvalidOperationException`: The instance is not correctly associated with a performance counter.

-or-

The `PerformanceCounter.InstanceLifetime` property is set to `PerformanceCounterInstanceLifetime.Process` when using global shared memory.
- `Win32Exception`: An error occurred when accessing a system API.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks
This method is generally used for counters that contain uncalculated values.

> **Note:**
> To read performance counters in Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.

#### Examples
The following code example demonstrates how to use the `PerformanceCounter.NextSample` method to obtain the next uncalculated value of a counter. This code example is part of a larger example for the `PerformanceCounter` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationData/Overview/averagecount32.cs._

## PerformanceCounter.NextValue() method

```csharp
public float NextValue ();
```

Obtains a counter sample and returns the calculated value for it.

Returns: The next calculated value that the system obtains for this counter.

Exceptions:

- `InvalidOperationException`: The instance is not correctly associated with a performance counter.
- `Win32Exception`: An error occurred when accessing a system API.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks

> **Note:**
> If the calculated value of a counter depends on two counter reads, the first read operation returns 0.0. Resetting the performance counter properties to specify a different counter is equivalent to creating a new performance counter, and the first read operation using the new properties returns 0.0. The recommended delay time between calls to the `PerformanceCounter.NextValue` method is one second, to allow the counter to perform the next incremental read.

> **Note:**
> To read performance counters, you must have administrative privileges. In Windows Vista, User Account Control (UAC) determines the privileges of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To execute the code that accesses performance counters, you must first elevate your privileges from standard user to administrator. You can do this when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.

#### Examples
The following code example creates an `ElapsedTime` counter and uses the `PerformanceCounter.NextValue` method to display the counter's values over a time period.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounter/NextValue/elapsedtime.cs._

## PerformanceCounter.RemoveInstance() method

```csharp
public void RemoveInstance ();
```

Deletes the category instance specified by the `PerformanceCounter` object `PerformanceCounter.InstanceName` property.

Exceptions:

- `InvalidOperationException`: This counter is read-only, so any instance that is associated with the category cannot be removed.

-or-

The instance is not correctly associated with a performance counter.

-or-

The `PerformanceCounter.InstanceLifetime` property is set to `PerformanceCounterInstanceLifetime.Process` when using global shared memory.
- `Win32Exception`: An error occurred when accessing a system API.

#### Remarks
You can remove an instance only for a custom counter. All system counters are read-only, so attempting to remove one of them throws an exception.

> **Note:**
> To avoid a possible race condition when the performance counter shared memory is released, it is recommended that the `PerformanceCounter.RemoveInstance` method be called from the `DomainUnload` event handler.

To create a performance category instance, specify an `instanceName` on the `PerformanceCounter.%23ctor` constructor. If the category instance specified by `instanceName` already exists the new object will reference the existing category instance.

## PerformanceCounter.DefaultFileMappingSize field

```csharp
public static int DefaultFileMappingSize;
```

Specifies the size, in bytes, of the global memory shared by performance counters. The default size is 524,288 bytes.

To be added.
