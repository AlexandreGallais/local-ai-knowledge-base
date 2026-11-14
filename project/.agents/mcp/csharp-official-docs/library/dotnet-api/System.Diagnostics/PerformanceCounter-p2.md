---
title: "PerformanceCounter class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/PerformanceCounter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PerformanceCounter class (part 2 of 4)

## PerformanceCounter.PerformanceCounter(String, String, String) constructor

```csharp
public PerformanceCounter (string categoryName, string counterName, string instanceName);
```

Initializes a new, read-only instance of the `PerformanceCounter` class and associates it with the specified system or custom performance counter and category instance on the local computer.

Parameters:

- `categoryName`: The name of the performance counter category (performance object) with which this performance counter is associated.
- `counterName`: The name of the performance counter.
- `instanceName`: The name of the performance counter category instance, or an empty string (""), if the category contains a single instance.

Exceptions:

- `InvalidOperationException`: `categoryName` is an empty string ("").

-or-

`counterName` is an empty string ("").

-or-

The category specified is not valid.

-or-

The category specified is marked as multi-instance and requires the performance counter to be created with an instance name.

-or-

`instanceName` is longer than 127 characters.

-or-

`categoryName` and `counterName` have been localized into different languages.
- `ArgumentNullException`: `categoryName` or `counterName` is `null`.
- `Win32Exception`: An error occurred when accessing a system API.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks
The parameter strings are not case-sensitive.

This overload of the constructor sets the `PerformanceCounter.CategoryName`, `PerformanceCounter.CounterName`, and `PerformanceCounter.InstanceName` properties to the values you pass in, and sets the `MachineName` property to the local computer, ".".

This constructor initializes the performance counter and associates the instance with an existing counter (either a system or a custom counter) on the local computer. The values that you pass in for the `PerformanceCounter.CategoryName`, `PerformanceCounter.CounterName`, and `PerformanceCounter.InstanceName` properties must point to an existing performance counter on the local computer. If the performance counter instance you point to is not valid, calling the constructor throws an exception.

This overload can access any read-only or read/write counter, but does so in a read-only mode. A `PerformanceCounter` instance created using this overload cannot write to the counter, even if the counter itself is read/write.

To create a performance category instance, specify an `instanceName` on the `PerformanceCounter.%23ctor` constructor. If the category instance specified by `instanceName` already exists the new object will reference the existing category instance.

> **Note:**
> To read performance counters in Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.

## PerformanceCounter.PerformanceCounter(String, String, String, Boolean) constructor

```csharp
public PerformanceCounter (string categoryName, string counterName, string instanceName, bool readOnly);
```

Initializes a new, read-only or read/write instance of the `PerformanceCounter` class and associates it with the specified system or custom performance counter and category instance on the local computer.

Parameters:

- `categoryName`: The name of the performance counter category (performance object) with which this performance counter is associated.
- `counterName`: The name of the performance counter.
- `instanceName`: The name of the performance counter category instance, or an empty string (""), if the category contains a single instance.
- `readOnly`: `true` to access a counter in read-only mode; `false` to access a counter in read/write mode.

Exceptions:

- `InvalidOperationException`: `categoryName` is an empty string ("").

-or-

`counterName` is an empty string ("").

-or-

The read/write permission setting requested is invalid for this counter.

-or-

The category specified does not exist (if `readOnly` is `true`).

-or-

The category specified is not a .NET custom category (if `readOnly` is `false`).

-or-

The category specified is marked as multi-instance and requires the performance counter to be created with an instance name.

-or-

`instanceName` is longer than 127 characters.

-or-

`categoryName` and `counterName` have been localized into different languages.
- `ArgumentNullException`: `categoryName` or `counterName` is `null`.
- `Win32Exception`: An error occurred when accessing a system API.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks
The parameter strings are not case-sensitive.

Use this overload to access a performance counter in either read-only or read/write mode.

This overload of the constructor sets the `PerformanceCounter.CategoryName`, `PerformanceCounter.CounterName`, and `PerformanceCounter.InstanceName` properties to the values you pass in, it and sets the `MachineName` property to the local computer, ".".

This constructor initializes the performance counter and associates the instance with an existing counter (either a system or a custom counter) on the local computer. The values that you pass in for the `PerformanceCounter.CategoryName`, `PerformanceCounter.CounterName`, and `PerformanceCounter.InstanceName` properties must point to an existing performance counter on the local computer. If the performance counter instance that you point to is not valid, calling the constructor throws an exception.

> **Note:**
> You can use this overload to connect to a system counter, but you cannot write to a system counter. Therefore, setting `readOnly` to `false` when connecting to a system counter causes the constructor to throw an exception.

To create a performance category instance, specify an `instanceName` on the `PerformanceCounter.%23ctor` constructor. If the category instance specified by `instanceName` already exists the new object will reference the existing category instance.

> **Note:**
> To read performance counters in Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.

## PerformanceCounter.PerformanceCounter(String, String, String, String) constructor

```csharp
public PerformanceCounter (string categoryName, string counterName, string instanceName, string machineName);
```

Initializes a new, read-only instance of the `PerformanceCounter` class and associates it with the specified system or custom performance counter and category instance, on the specified computer.

Parameters:

- `categoryName`: The name of the performance counter category (performance object) with which this performance counter is associated.
- `counterName`: The name of the performance counter.
- `instanceName`: The name of the performance counter category instance, or an empty string (""), if the category contains a single instance.
- `machineName`: The computer on which the performance counter and its associated category exist.

Exceptions:

- `InvalidOperationException`: `categoryName` is an empty string ("").

-or-

`counterName` is an empty string ("").

-or-

The read/write permission setting requested is invalid for this counter.

-or-

The counter does not exist on the specified computer.

-or-

The category specified is marked as multi-instance and requires the performance counter to be created with an instance name.

-or-

`instanceName` is longer than 127 characters.

-or-

`categoryName` and `counterName` have been localized into different languages.
- `ArgumentException`: The `machineName` parameter is not valid.
- `ArgumentNullException`: `categoryName` or `counterName` is `null`.
- `Win32Exception`: An error occurred when accessing a system API.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks
The parameter strings are not case-sensitive.

This overload of the constructor sets the `PerformanceCounter.CategoryName`, `PerformanceCounter.CounterName`, `PerformanceCounter.InstanceName`, and `PerformanceCounter.MachineName` properties to the values you pass in.

This constructor initializes the performance counter and associates the instance with an existing counter (either a system or a custom counter) on the specified computer. The values that you pass in for the `PerformanceCounter.CategoryName`, `PerformanceCounter.CounterName`, `PerformanceCounter.InstanceName` and `PerformanceCounter.MachineName` properties must point to an existing performance counter. If the performance counter instance you point to is not valid, calling the constructor throws an exception. This overload can access any read-only or read/write counter, but does so in a read-only mode. A `PerformanceCounter` instance created using this overload cannot write to the counter, even if the counter itself is read/write.

> **Note:**
> You cannot write to remote performance counters. There is no overload that allows you to specify a read/write instance of the `PerformanceCounter` class that connects to a remote computer.

To create a performance category instance, specify an `instanceName` on the `PerformanceCounter.%23ctor` constructor. If the category instance specified by `instanceName` already exists the new object will reference the existing category instance.

> **Note:**
> To read performance counters in Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.

> **Note:**
> In Windows Vista, when the remote computer is a member of a workgroup, you may need to disable UAC so that the local user account is not filtered and can be elevated to an administrator account. For security reasons, disabling UAC should be a last resort. For information on disabling UAC, see User Account Control and WMI.

## PerformanceCounter.CategoryName property

```csharp
public string CategoryName { get; set; }
```

Gets or sets the name of the performance counter category for this performance counter.

Returns: The name of the performance counter category (performance object) with which this performance counter is associated.

Exceptions:

- `ArgumentNullException`: The `PerformanceCounter.CategoryName` is `null`.

#### Remarks
The `PerformanceCounter.CategoryName` is displayed in the `Performance Object` field of Performance Counter Manager MMC snap in's `Add Counter` dialog box.

A performance counter monitors the behavior of a category, or performance object, on a computer. Categories include physical components (such as processors, disks, and memory) and system objects (such as processes and threads). System counters that are related to the same performance object are grouped into a category that indicates their common focus. When you create an instance of the `PerformanceCounter` class, you first indicate the category with which the component will interact, and then you choose a counter from that category.

For example, one Windows counter category is the Memory category. System counters within this category track memory data such as the number of bytes available and the number of bytes cached. If you wanted to work with the bytes cached in your application, you would create an instance of the `PerformanceCounter` component, connect it to the Memory category, and then pick the appropriate counter (in this case, Cached Bytes) from that category.

Although your system makes many more counter categories available, the categories that you will probably interact with most frequently are the Cache, Memory, Objects, PhysicalDisk, Process, Processor, Server, System, and Thread categories.

#### Examples
The following code example creates a default instance of the `PerformanceCounter` class. After the instance is created, the `PerformanceCounter.CategoryName`, `PerformanceCounter.CounterName`, and `InstanceName` property values are set, and the results of a call to the `PerformanceCounter.NextValue` method are displayed.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounter/.ctor/perfcounter.cs._

## PerformanceCounter.CounterHelp property

```csharp
public string CounterHelp { get; }
```

Gets the description for this performance counter.

Returns: A description of the item or quantity that this performance counter measures.

Exceptions:

- `InvalidOperationException`: The `PerformanceCounter` instance is not associated with a performance counter.

-or-

The `PerformanceCounter.InstanceLifetime` property is set to `PerformanceCounterInstanceLifetime.Process` when using global shared memory.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks
The Add Counters dialog box of the Performance Counter Manager MMC snap in displays the `PerformanceCounter.CounterHelp` text when a user selects a counter from the counters list and clicks the Explain button.

When you create a new counter, use the `PerformanceCounter.CounterHelp` text to describe what the counter monitors do so the user can determine whether to add the counter to the System Monitor's display.

> **Note:**
> To read performance counters in Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.

## PerformanceCounter.CounterName property

```csharp
public string CounterName { get; set; }
```

Gets or sets the name of the performance counter that is associated with this `PerformanceCounter` instance.

Returns: The name of the counter, which generally describes the quantity being counted. This name is displayed in the list of counters of the Performance Counter Manager MMC snap in's Add Counters dialog box.

Exceptions:

- `ArgumentNullException`: The `PerformanceCounter.CounterName` is `null`.

#### Remarks
You can get a list of available pre-existing counters from the Windows Performance Manager's Add Counters dialog box.

#### Examples
The following code example shows how to set the `CounterName` property to a typical counter name.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounter/.ctor/perfcounter.cs._
