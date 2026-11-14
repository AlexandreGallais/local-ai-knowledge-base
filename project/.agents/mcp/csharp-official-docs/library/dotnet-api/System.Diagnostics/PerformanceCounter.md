---
title: "PerformanceCounter class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/PerformanceCounter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PerformanceCounter class

Namespace: `System.Diagnostics`

```csharp
public sealed class PerformanceCounter : System.ComponentModel.Component, System.ComponentModel.ISupportInitialize
```

Represents a Windows NT performance counter component.

#### Remarks
The `PerformanceCounter` component can be used for both reading existing predefined or custom counters and publishing (writing) performance data to custom counters.

There are numerous predefined counters listed in the Windows Performance Monitor's **Add Counters** dialog box. To learn about the .NET performance counters, see Performance Counters.

To read from a performance counter, create an instance of the `PerformanceCounter` class, set the `PerformanceCounter.CategoryName`, `PerformanceCounter.CounterName`, and, optionally, the `PerformanceCounter.InstanceName` or `PerformanceCounter.MachineName` properties, and then call the `PerformanceCounter.NextValue` method to take a performance counter reading.

To publish performance counter data, create one or more custom counters using the `PerformanceCounterCategory.Create` method, create an instance of the `PerformanceCounter` class, set the `PerformanceCounter.CategoryName`, `PerformanceCounter.CounterName` and, optionally, `PerformanceCounter.InstanceName` or `PerformanceCounter.MachineName` properties, and then call the `PerformanceCounter.IncrementBy`, `PerformanceCounter.Increment`, or `PerformanceCounter.Decrement` methods, or set the `RawValue` property to change the value of your custom counter.

> **Note:**
> The `PerformanceCounter.Increment`, `PerformanceCounter.IncrementBy`, and `PerformanceCounter.Decrement` methods use interlocks to update the counter value. This helps keep the counter value accurate in multithreaded or multiprocess scenarios, but also results in a performance penalty. If you do not need the accuracy that interlocked operations provide, you can update the `RawValue` property directly for up to a 5 times performance improvement.  However, in multithreaded scenarios, some updates to the counter value might be ignored, resulting in inaccurate data.

The counter is the mechanism by which performance data is collected. The registry stores the names of all the counters, each of which is related to a specific area of system functionality. Examples include a processor's busy time, memory usage, or the number of bytes received over a network connection.

Each counter is uniquely identified through its name and its location. In the same way that a file path includes a drive, a directory, one or more subdirectories, and a file name, counter information consists of four elements: the computer, the category, the category instance, and the counter name.

The counter information must include the category, or performance object, that the counter measures data for. A computer's categories include physical components, such as processors, disks, and memory. There are also system categories, such as processes and threads. Each category is related to a functional element within the computer and has a set of standard counters assigned to it. These objects are listed in the Performance object drop-down list of the Add Counters dialog box within the Windows System Monitor, and you must include them in the counter path. Performance data is grouped by the category to which is it related.

In certain cases, several copies of the same category can exist. For example, several processes and threads run simultaneously, and some computers contain more than one processor. The category copies are called category instances, and each instance has a set of standard counters assigned to it. If a category can have more than one instance, an instance specification must be included in the counter information.

To obtain performance data for counters that required an initial or previous value for performing the necessary calculation, call the `PerformanceCounter.NextValue` method twice and use the information returned as your application requires.

> **Note:**
> Performance counter categories installed with .NET use separate shared memory, with each performance counter category having its own memory. You can specify the size of separate shared memory by creating a DWORD named FileMappingSize in the registry key <example-value>*\<category name>*\Performance. The FileMappingSize value is set to the shared memory size of the category. The default size is 131072 decimal.

#### Examples
The following code example demonstrates the use of the `PerformanceCounter` class to create and use an `AverageCount64` counter type. The example creates categories, sets up counters, collects data from the counters, and calls the `CounterSampleCalculator` class to interpret the performance counter data. The intermediate and final results are displayed in the console window. For additional examples of other performance counter types, see the `PerformanceCounterType` enumeration.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationData/Overview/averagecount32.cs._

## PerformanceCounter.PerformanceCounter() constructor

```csharp
public PerformanceCounter ();
```

Initializes a new, read-only instance of the `PerformanceCounter` class, without associating the instance with any system or custom performance counter.

#### Remarks
This overload of the constructor sets the `PerformanceCounter.CategoryName`, `PerformanceCounter.CounterName`, and `PerformanceCounter.InstanceName` properties to empty strings (""), and sets the `MachineName` property to the local computer, (".").

This constructor does not initialize the performance counter, so it does not associate the instance with an existing counter on the local computer. To point to a specific performance counter, set the `PerformanceCounter.CategoryName`, `PerformanceCounter.CounterName`, and, optionally, the `PerformanceCounter.InstanceName` and `PerformanceCounter.MachineName` properties before reading any other properties or attempting to read from a counter. To write to a performance counter, set the `ReadOnly` property to `false`.

> **Note:**
> The `HostProtectionAttribute` attribute applied to this member has the following `Resources` property value: `Synchronization` | `SharedState`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

#### Examples
The following code example creates a default instance of the `PerformanceCounter` class. After the instance is created, the `PerformanceCounter.CategoryName`, `PerformanceCounter.CounterName`, and `InstanceName` property values are set, and the results of a call to the `PerformanceCounter.NextValue` method are displayed.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounter/.ctor/perfcounter.cs._

## PerformanceCounter.PerformanceCounter(String, String) constructor

```csharp
public PerformanceCounter (string categoryName, string counterName);
```

Initializes a new, read-only instance of the `PerformanceCounter` class and associates it with the specified system or custom performance counter on the local computer. This constructor requires that the category have a single instance.

Parameters:

- `categoryName`: The name of the performance counter category (performance object) with which this performance counter is associated.
- `counterName`: The name of the performance counter.

Exceptions:

- `InvalidOperationException`: `categoryName` is an empty string ("").

-or-

`counterName` is an empty string ("").

-or-

The category specified does not exist.

-or-

The category specified is marked as multi-instance and requires the performance counter to be created with an instance name.

-or-

`categoryName` and `counterName` have been localized into different languages.
- `ArgumentNullException`: `categoryName` or `counterName` is `null`.
- `Win32Exception`: An error occurred when accessing a system API.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks
The parameter strings are not case-sensitive.

Use this overload to access a counter on the local computer that belongs to a category containing a single performance counter category instance. If you attempt to use this constructor to point this `PerformanceCounter` instance to a category that contains multiple instances, the constructor throws an exception. This overload can access any read-only or read/write counter, but does so in a read-only mode. A `PerformanceCounter` instance created using this overload cannot write to the counter, even if the counter itself is read/write.

This overload of the constructor sets the `PerformanceCounter.CategoryName` and `PerformanceCounter.CounterName` properties to the values you pass in, sets the `MachineName` property to the local computer, ".", and sets the `InstanceName` property to an empty string ("").

This constructor initializes the performance counter and associates the instance with an existing counter (either a system or a custom counter) on the local computer. The values that you pass in for the `PerformanceCounter.CategoryName` and `PerformanceCounter.CounterName` properties must point to an existing performance counter on the local computer.

> **Note:**
> To read performance counters from a non-interactive logon session on Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.

## PerformanceCounter.PerformanceCounter(String, String, Boolean) constructor

```csharp
public PerformanceCounter (string categoryName, string counterName, bool readOnly);
```

Initializes a new, read-only or read/write instance of the `PerformanceCounter` class and associates it with the specified system or custom performance counter on the local computer. This constructor requires that the category contain a single instance.

Parameters:

- `categoryName`: The name of the performance counter category (performance object) with which this performance counter is associated.
- `counterName`: The name of the performance counter.
- `readOnly`: `true` to access the counter in read-only mode (although the counter itself could be read/write); `false` to access the counter in read/write mode.

Exceptions:

- `InvalidOperationException`: The `categoryName` is an empty string ("").

-or-

The `counterName` is an empty string ("").

-or-

The category specified does not exist. (if `readOnly` is `true`).

-or-

The category specified is not a .NET custom category (if `readOnly` is `false`).

-or-

The category specified is marked as multi-instance and requires the performance counter to be created with an instance name.

-or-

`categoryName` and `counterName` have been localized into different languages.
- `ArgumentNullException`: `categoryName` or `counterName` is `null`.
- `Win32Exception`: An error occurred when accessing a system API.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks
The parameter strings are not case-sensitive.

Use this overload to access a read-only or read/write counter on the local computer that belongs to a category containing a single performance counter category instance. If you attempt to use this constructor to point this `PerformanceCounter` instance to a category that contains multiple instances, the constructor throws an exception.

This overload of the constructor sets the `PerformanceCounter.CategoryName`, `PerformanceCounter.CounterName`, and `PerformanceCounter.ReadOnly` properties to the values you pass in, sets the `MachineName` property to the local computer, ".", and sets the `InstanceName` property to an empty string ("").

This constructor initializes the performance counter and associates the instance with an existing counter (either a system or a custom counter) on the local computer. The values that you pass in for the `PerformanceCounter.CategoryName` and `PerformanceCounter.CounterName` properties must point to an existing performance counter on the local computer. If the performance counter instance that you point to is not valid, calling the constructor throws an exception.

> **Note:**
> You can use this overload to connect to a system counter, but you cannot write to a system counter. Therefore, setting `readOnly` to `false` when connecting to a system counter causes the constructor to throw an exception.

> **Note:**
> To read performance counters from a non-interactive logon session on Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.

#### Examples
The following code example creates an instance of the `PerformanceCounter` class. The example passes in category names, counter names, and a flag value indicating that the counter is not read-only. This code example is part of a larger example for the `PerformanceCounter` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationData/Overview/averagecount32.cs._
