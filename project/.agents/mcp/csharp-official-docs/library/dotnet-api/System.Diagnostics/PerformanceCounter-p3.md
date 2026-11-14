---
title: "PerformanceCounter class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/PerformanceCounter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PerformanceCounter class (part 3 of 4)

## PerformanceCounter.CounterType property

```csharp
public System.Diagnostics.PerformanceCounterType CounterType { get; }
```

Gets the counter type of the associated performance counter.

Returns: A `PerformanceCounterType` that describes both how the counter interacts with a monitoring application and the nature of the values it contains (for example, calculated or uncalculated).

Exceptions:

- `InvalidOperationException`: The instance is not correctly associated with a performance counter.

-or-

The `PerformanceCounter.InstanceLifetime` property is set to `PerformanceCounterInstanceLifetime.Process` when using global shared memory.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks
The `PerformanceCounterType` enumeration contains the types of performance counters that you can interact with. Some of the counter types represent calculated values, such as the average of the counter measurements the system has taken. Other types represent raw, or uncalculated, values. The following table shows the counter types that you will interact with most frequently.

|Counter's Responsibility|PerformanceCounterType Value|Example|
|------------------------------|----------------------------------|-------------|
|Maintain a simple count of items or operations.|`NumberOfItems32`|Tracking the number of orders received as a 32-bit integer.|
|Maintain a higher-capacity simple count.|`NumberOfItems64`|Tracking the number of orders for a site with very high volume, stored as a 64-bit integer.|
|Track the number of items or operations per second.|`RateOfCountsPerSecond32`|Tracking orders received per second on a site.|
|Track a higher-capacity number of items or operations per second.|`RateOfCountsPerSecond64`|Tracking orders received per second on a site with very high volume.|
|Calculate the average time to perform a process or to process an item|`AverageTimer32`|Calculate the average time an order takes to be processed.|

When you create a counter whose type requires the use of a corresponding base counter, you must declare the counter and the base in the `CounterCreationDataCollection` you pass into the `PerformanceCounterCategory.Create` method.

> **Note:**
> To read performance counters in Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.

## PerformanceCounter.InstanceLifetime property

```csharp
public System.Diagnostics.PerformanceCounterInstanceLifetime InstanceLifetime { get; set; }
```

Gets or sets the lifetime of a process.

Returns: One of the `PerformanceCounterInstanceLifetime` values. The default is `PerformanceCounterInstanceLifetime.Global`.

Exceptions:

- `ArgumentOutOfRangeException`: The value set is not a member of the `PerformanceCounterInstanceLifetime` enumeration.
- `InvalidOperationException`: `PerformanceCounter.InstanceLifetime` is set after the `PerformanceCounter` has been initialized.

#### Remarks

> **Note:**
> If the value of the `CounterType` property is `SingleInstance`, the `PerformanceCounter.InstanceLifetime` value for the performance counter must be `Global`.

## PerformanceCounter.InstanceName property

```csharp
public string InstanceName { get; set; }
```

Gets or sets an instance name for this performance counter.

Returns: The name of the performance counter category instance, or an empty string (""), if the counter is a single-instance counter.

#### Remarks

> **Note:**
> Instance names must be shorter than 128 characters in length.

In some situations, categories are subdivided into instances, which track data about multiple occurrences of the object that a category relates to. Instances apply to the category as whole, rather than to individual counters. Every counter within a category has each instance defined for the category. For example, the Process category contains instances named Idle and System. Every counter within the Process category thus contains data for each instance, showing information about either idle processes or system processes.

Many categories do not contain multiple instances, so you can leave this property empty to indicate that no instance is associated with the category.

If this `PerformanceCounter` instance points to a noncustom category, you can choose from only the existing category instances. You can create new category instances only in custom categories, which allow you to define as many counters and category instances as you need.

To create a performance category instance, specify an `instanceName` on the `PerformanceCounter.%23ctor` constructor. If the category instance specified by `instanceName` already exists the new object will reference the existing category instance.

> **Note:**
> Do not use the characters "(", ")", "#", "\\", or "/" in the instance name. If any of these characters are used, the Performance Console (see Runtime Profiling) may not correctly display the instance values.

If the instance name is automatically generated and might contain the characters "(", ")", "#", "\\", or "/", use the character mapping in the following table.

|Character|Mapped character|
|---------------|----------------------|
|(|[|
|)|]|
|#|_|
|\\|_|
|/|_|

The `FriendlyName` property of the `AppDomain` object obtained from the `CurrentDomain` property is a common source of instance names that can contain invalid characters.

#### Examples
The following code example creates a default instance of the `PerformanceCounter` class. After the instance is created, the `PerformanceCounter.CategoryName`, `PerformanceCounter.CounterName`, and `InstanceName` property values are set, and the results of a call to the `PerformanceCounter.NextValue` method are displayed.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounter/.ctor/perfcounter.cs._

## PerformanceCounter.MachineName property

```csharp
public string MachineName { get; set; }
```

Gets or sets the computer name for this performance counter.

Returns: The server on which the performance counter and its associated category reside.

Exceptions:

- `ArgumentException`: The `PerformanceCounter.MachineName` format is invalid.

#### Remarks
You can write values only to counters that reside on the local computer. However, you can read counter values from any computer in the enterprise for which you have access privileges.

When you set the `MachineName` property to point to a remote computer, the `PerformanceCounter` instance attempts to open the counter on that computer. If the counter does not exist, setting this property throws an exception.

## PerformanceCounter.RawValue property

```csharp
public long RawValue { get; set; }
```

Gets or sets the raw, or uncalculated, value of this counter.

Returns: The raw value of the counter.

Exceptions:

- `InvalidOperationException`: You are trying to set the counter's raw value, but the counter is read-only.

-or-

The instance is not correctly associated with a performance counter.

-or-

The `PerformanceCounter.InstanceLifetime` property is set to `PerformanceCounterInstanceLifetime.Process` when using global shared memory.
- `Win32Exception`: An error occurred when accessing a system API.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks
If the counter type is a 32-bit size and you attempt to set this property to a value that is too large to fit, the property truncates the value to 32 bits. When reading custom counters on the local computer, using the `RawValue` property rather than a calculated value can produce significantly better performance in scenarios where the raw value is sufficient.

If the counter that you are reading is read-only, getting the `RawValue` property samples the counter at the time that the property is called. This action is equivalent to making an initial call to the `PerformanceCounter.NextSample` method. If you subsequently call `PerformanceCounter.NextSample`, you can perform calculations on the values that both calls returned.

Because system counters are read-only, you can get but not set their raw values.

> **Note:**
> The `PerformanceCounter.Increment`, `PerformanceCounter.IncrementBy`, and `PerformanceCounter.Decrement` methods use interlocks to update the counter value. This helps keep the counter value accurate in multithreaded or multiprocess scenarios, but also results in a performance penalty. If you do not need the accuracy that interlocked operations provide, you can update the `RawValue` property directly for up to a 5 times performance improvement.  However, in multithreaded scenarios, some updates to the counter value might be ignored, resulting in inaccurate data.

> **Note:**
> To read performance counters in Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.

#### Examples
The following example uses the `CounterSample` class to display the value of the `RawValue` property for a counter.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationData/Overview/averagecount32.cs._

## PerformanceCounter.ReadOnly property

```csharp
public bool ReadOnly { get; set; }
```

Gets or sets a value indicating whether this `PerformanceCounter` instance is in read-only mode.

Returns: `true`, if the `PerformanceCounter` instance is in read-only mode (even if the counter itself is a custom .NET counter); `false` if it is in read/write mode. The default is the value set by the constructor.

#### Remarks
For a system counter, `PerformanceCounter.ReadOnly` should always `true`. You cannot write to a system counter.

## PerformanceCounter.BeginInit() method

```csharp
public void BeginInit ();
```

Begins the initialization of a `PerformanceCounter` instance used on a form or by another component. The initialization occurs at runtime.

#### Remarks
The Visual Studio 2005 design environment uses this method to start the initialization of a component that is used on a form or by another component. The `PerformanceCounter.EndInit` method ends the initialization. Using the `PerformanceCounter.BeginInit` and `PerformanceCounter.EndInit` methods prevents the component from being used before it is fully initialized.

## PerformanceCounter.Close() method

```csharp
public void Close ();
```

Closes the performance counter and frees all the resources allocated by this performance counter instance.

#### Remarks
When you associate this `PerformanceCounter` instance with a performance counter that resides on the server, the system initializes the instance and allocates memory to contain counter sample information. The `PerformanceCounter.Close` method frees the resources allocated by the object.

## PerformanceCounter.CloseSharedResources() method

```csharp
public static void CloseSharedResources ();
```

Frees the performance counter library shared state allocated by the counters.

To be added.

## PerformanceCounter.Decrement() method

```csharp
public long Decrement ();
```

Decrements the associated performance counter by one through an efficient atomic operation.

Returns: The decremented counter value.

Exceptions:

- `InvalidOperationException`: The counter is read-only, so the application cannot decrement it.

-or-

The instance is not correctly associated with a performance counter.

-or-

The `PerformanceCounter.InstanceLifetime` property is set to `PerformanceCounterInstanceLifetime.Process` when using global shared memory.
- `Win32Exception`: An error occurred when accessing a system API.

#### Remarks
You can write only to custom counters. All system counters are read-only.

> **Note:**
> The `PerformanceCounter.Increment`, `PerformanceCounter.IncrementBy`, and `PerformanceCounter.Decrement` methods use interlocks to update the counter value. This helps keep the counter value accurate in multithreaded or multiprocess scenarios, but also results in a performance penalty. If you do not need the accuracy that interlocked operations provide, you can update the `RawValue` property directly for up to a 5 times performance improvement.  However, in multithreaded scenarios, some updates to the counter value might be ignored, resulting in inaccurate data.

## PerformanceCounter.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## PerformanceCounter.EndInit() method

```csharp
public void EndInit ();
```

Ends the initialization of a `PerformanceCounter` instance that is used on a form or by another component. The initialization occurs at runtime.

#### Remarks
The Visual Studio 2005 design environment uses this method to end the initialization of a component that is used on a form or by another component. The `PerformanceCounter.BeginInit` method starts the initialization. Using the `PerformanceCounter.BeginInit` and `PerformanceCounter.EndInit` methods prevents the component from being used before it is fully initialized.

## PerformanceCounter.Increment() method

```csharp
public long Increment ();
```

Increments the associated performance counter by one through an efficient atomic operation.

Returns: The incremented counter value.

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
