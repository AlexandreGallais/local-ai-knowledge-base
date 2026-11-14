---
title: "PerformanceCounterCategory class (part 1 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/PerformanceCounterCategory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PerformanceCounterCategory class

Namespace: `System.Diagnostics`

```csharp
public sealed class PerformanceCounterCategory
```

Represents a performance object, which defines a category of performance counters.

#### Remarks

> **Important:**
> Creating or deleting a performance counter requires synchronization of the underlying code by using a named mutex. If a highly privileged application locks the named mutex, attempts to create or delete a performance counter causes the application to stop responding until the lock is released. To help avoid this problem, never grant `UnmanagedCode` permission to untrusted code. In addition, `UnmanagedCode` permission potentially allows other permissions to be bypassed and should only be granted to highly trusted code.

The `PerformanceCounterCategory` instance's `CategoryName` property is displayed in the Performance Object field of the Performance Viewer application's Add Counter dialog box.

The `PerformanceCounterCategory` class provides several methods for interacting with counters and categories on the computer. The `PerformanceCounterCategory.Create` methods enable you to define custom categories. The `PerformanceCounterCategory.Delete` method provides a way to remove categories from the computer. The `PerformanceCounterCategory.GetCategories` method enables you to view the list of categories, while `PerformanceCounterCategory.ReadCategory` retrieves all the counter and instance data associated with a single category.

A performance counter publishes performance data about an application. Categories include physical components (such as processors, disks, and memory) and system objects (such as processes and threads). System counters that are related to the same performance object are grouped into a category that indicates their common focus. When you create an instance of the `PerformanceCounter` class, you first indicate the category with which the component will interact, and then you choose a counter from that category.

For example, one Windows counter category is the Memory category. System counters within this category track memory data such as the number of bytes available and the number of bytes cached. If you wanted to work with the bytes cached in your application, you would create an instance of the `PerformanceCounter` component, connect it to the Memory category, and then pick the appropriate counter (in this case, Cached Bytes) from that category.

Although your system makes many more counter categories available, the categories that you will probably interact with most frequently are the Cache, Memory, Objects, PhysicalDisk, Process, Processor, Server, System, and Thread categories.

> **Important:**
> The `PerformanceCounter.RemoveInstance` method in the `PerformanceCounter` class will release the counter and, if the reuse option is selected for that category, the instance of the counter will be reused. This could cause a race condition if another process or even another part of the code is trying to write to the counter instance.

> **Note:**
> It is strongly recommended that new performance counter categories be created during the installation of the application, not during the execution of the application. This allows time for the operating system to refresh its list of registered performance counter categories. If the list has not been refreshed, the attempt to use the category will fail.

> **Note:**
> Performance counter categories installed with .NET use separate shared memory, with each performance counter category having its own memory. You can specify the size of separate shared memory by creating a DWORD named FileMappingSize in the registry key <example-value>*\<category name>*\Performance. The FileMappingSize value is set to the shared memory size of the category. The default size is 131072 decimal.

#### Examples
The following code example determines whether a `PerformanceCounter` and its `PerformanceCounterCategory` exist on the local computer or on another computer. If these objects do not exist on the local computer, the example optionally creates them. It uses the `PerformanceCounterCategory.Exists` method to determine whether the `PerformanceCounterCategory` exists.  If the `PerformanceCounterCategory` does not exist and no counter name is specified, or if the computer is a remote machine, the example exits.

If a `PerformanceCounter` name is provided, the example uses the `PerformanceCounterCategory.CounterExists` method and displays the result to the user. If the `PerformanceCounter` does not exist, the user can delete and re-create the `PerformanceCounterCategory` with the new `PerformanceCounter`. If the user does so, the category is deleted using the `PerformanceCounterCategory.Delete` method.

If requested, the example now creates the new `PerformanceCounterCategory` and `PerformanceCounter` using the `PerformanceCounterCategory.Create` method. If an instance name is specified, the example uses the `PerformanceCounterCategory.InstanceExists` method and displays the result.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterCategory/Overview/perfcountercatcreateexist.cs._

## PerformanceCounterCategory.PerformanceCounterCategory() constructor

```csharp
public PerformanceCounterCategory ();
```

Initializes a new instance of the `PerformanceCounterCategory` class, leaves the `PerformanceCounterCategory.CategoryName` property empty, and sets the `PerformanceCounterCategory.MachineName` property to the local computer.

#### Remarks
The `CategoryName` property must be set before associating this `PerformanceCounterCategory` instance with a performance object on the server. Otherwise, an exception is thrown.

#### Examples
The following code example accepts a `PerformanceCounterCategory` name and a computer name from the command line.  It creates a `PerformanceCounterCategory` using the constructor overload appropriate for the number of parameters provided, then displays its properties.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterCategory/.ctor/perfcountercatctor.cs._

## PerformanceCounterCategory.PerformanceCounterCategory(String) constructor

```csharp
public PerformanceCounterCategory (string categoryName);
```

Initializes a new instance of the `PerformanceCounterCategory` class, sets the `PerformanceCounterCategory.CategoryName` property to the specified value, and sets the `PerformanceCounterCategory.MachineName` property to the local computer.

Parameters:

- `categoryName`: The name of the performance counter category, or performance object, with which to associate this `PerformanceCounterCategory` instance.

Exceptions:

- `ArgumentException`: The `categoryName` is an empty string ("").
- `ArgumentNullException`: The `categoryName` is `null`.

#### Examples
The following code example accepts a `PerformanceCounterCategory` name and a computer name from the command line. It creates a `PerformanceCounterCategory` using the constructor overload that is appropriate for the number of parameters provided, then displays its properties.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterCategory/.ctor/perfcountercatctor.cs._

## PerformanceCounterCategory.PerformanceCounterCategory(String, String) constructor

```csharp
public PerformanceCounterCategory (string categoryName, string machineName);
```

Initializes a new instance of the `PerformanceCounterCategory` class and sets the `PerformanceCounterCategory.CategoryName` and `PerformanceCounterCategory.MachineName` properties to the specified values.

Parameters:

- `categoryName`: The name of the performance counter category, or performance object, with which to associate this `PerformanceCounterCategory` instance.
- `machineName`: The computer on which the performance counter category and its associated counters exist.

Exceptions:

- `ArgumentException`: The `categoryName` is an empty string ("").

-or-

The `machineName` syntax is invalid.
- `ArgumentNullException`: The `categoryName` is `null`.

#### Examples
The following code example accepts a `PerformanceCounterCategory` name and a computer name from the command line. It creates a `PerformanceCounterCategory` using the constructor overload that is appropriate for the number of parameters provided, then displays its properties.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterCategory/.ctor/perfcountercatctor.cs._

## PerformanceCounterCategory.CategoryHelp property

```csharp
public string CategoryHelp { get; }
```

Gets the category's help text.

Returns: A description of the performance object that this category measures.

Exceptions:

- `InvalidOperationException`: The `PerformanceCounterCategory.CategoryName` property is `null`. The category name must be set before getting the category help.
- `Win32Exception`: A call to an underlying system API failed.

#### Examples
The following code example creates a `PerformanceCounterCategory` with the `%23ctor`. It prompts the user for the `PerformanceCounterCategory` and computer names, then sets the `PerformanceCounterCategory.CategoryName` and `PerformanceCounterCategory.MachineName` properties from the entered values. It then displays the values of the `PerformanceCounterCategory.CategoryName`, `PerformanceCounterCategory.MachineName`, and `PerformanceCounterCategory.CategoryHelp` properties, or it displays an error message if the `PerformanceCounterCategory` cannot be accessed.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterCategory/.ctor/perfCounterCatProps.cs._

## PerformanceCounterCategory.CategoryName property

```csharp
public string CategoryName { get; set; }
```

Gets or sets the name of the performance object that defines this category.

Returns: The name of the performance counter category, or performance object, with which to associate this `PerformanceCounterCategory` instance.

Exceptions:

- `ArgumentException`: The `PerformanceCounterCategory.CategoryName` is an empty string ("").
- `ArgumentNullException`: The `PerformanceCounterCategory.CategoryName` is `null`.

#### Examples
The following code example creates a `PerformanceCounterCategory` with the `%23ctor`. It prompts the user for the `PerformanceCounterCategory` and computer names, then sets the `PerformanceCounterCategory.CategoryName` and `PerformanceCounterCategory.MachineName` properties from the entered values. It then displays the values of the `PerformanceCounterCategory.CategoryName`, `PerformanceCounterCategory.MachineName`, and `PerformanceCounterCategory.CategoryHelp` properties, or it displays an error message if the `PerformanceCounterCategory` cannot be accessed.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterCategory/.ctor/perfCounterCatProps.cs._

## PerformanceCounterCategory.CategoryType property

```csharp
public System.Diagnostics.PerformanceCounterCategoryType CategoryType { get; }
```

Gets the performance counter category type.

Returns: One of the `PerformanceCounterCategoryType` values.

#### Remarks
The `CategoryType` property indicates whether the `PerformanceCounterCategory` object can have multiple instances. The possible values are `MultiInstance`, `SingleInstance`, or `Unknown`.

There are two types of performance counter categories: single-instance and multi-instance. By default, a category is single-instance when it is created and becomes multi-instance when another instance is added. Categories are created when an application is set up, and instances are added at run time. The `PerformanceCounterCategoryType` enumeration is used to indicate whether a performance counter can have multiple instances.

## PerformanceCounterCategory.MachineName property

```csharp
public string MachineName { get; set; }
```

Gets or sets the name of the computer on which this category exists.

Returns: The name of the computer on which the performance counter category and its associated counters exist.

Exceptions:

- `ArgumentException`: The `PerformanceCounterCategory.MachineName` syntax is invalid.

#### Examples
The following code example creates a `PerformanceCounterCategory` with the `%23ctor` constructor. It prompts the user for the `PerformanceCounterCategory` and the computer names, then sets the `PerformanceCounterCategory.CategoryName` and `PerformanceCounterCategory.MachineName` properties from the entered values. It then displays the values of the `PerformanceCounterCategory.CategoryName`, `PerformanceCounterCategory.MachineName`, and `PerformanceCounterCategory.CategoryHelp` properties, or it displays an error message if the `PerformanceCounterCategory` cannot be accessed.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterCategory/.ctor/perfCounterCatProps.cs._
