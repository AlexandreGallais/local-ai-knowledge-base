---
title: "PerformanceCounterCategory class (part 3 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/PerformanceCounterCategory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PerformanceCounterCategory class (part 3 of 6)

## PerformanceCounterCategory.Create(String, String, PerformanceCounterCategoryType, CounterCreationDataCollection) method

```csharp
public static System.Diagnostics.PerformanceCounterCategory Create (string categoryName, string categoryHelp, System.Diagnostics.PerformanceCounterCategoryType categoryType, System.Diagnostics.CounterCreationDataCollection counterData);
```

Registers the custom performance counter category containing the specified counters on the local computer.

Parameters:

- `categoryName`: The name of the custom performance counter category to create and register with the system.
- `categoryHelp`: A description of the custom category.
- `categoryType`: One of the `PerformanceCounterCategoryType` values.
- `counterData`: A `CounterCreationDataCollection` that specifies the counters to create as part of the new category.

Returns: A `PerformanceCounterCategory` that is associated with the new custom category, or performance object.

Exceptions:

- `ArgumentException`: A counter name that is specified within the `counterData` collection is `null` or an empty string ("").

-or-

A counter that is specified within the `counterData` collection already exists.
- `ArgumentNullException`: `categoryName` is `null`.

-or-

`counterData` is `null`.
- `ArgumentOutOfRangeException`: `categoryType` value is outside of the range of the following values: `MultiInstance`, `SingleInstance`, or `Unknown`.
- `InvalidOperationException`: The category already exists on the local computer.

-or-

The layout of the `counterData` collection is incorrect for base counters. A counter of type `AverageCount64`, `AverageTimer32`, `CounterMultiTimer`, `CounterMultiTimerInverse`, `CounterMultiTimer100Ns`, `CounterMultiTimer100NsInverse`, `RawFraction`, `SampleFraction`, or `SampleCounter` must be immediately followed by one of the base counter types (`AverageBase`, `MultiBase`, `RawBase`, or `SampleBase`).
- `Win32Exception`: A call to an underlying system API failed.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks
The `categoryType` parameter specifies whether the performance counter category is single-instance or multi-instance. By default, a category is single-instance when it is created and becomes multi-instance when another instance is added. Categories are created when an application is set up, and instances are added at run time. The `PerformanceCounterCategoryType` enumeration is used to indicate whether a performance counter can have multiple instances.

Performance counter categories installed with .NET use separate shared memory, with each performance counter category having its own memory.  You can specify the size of separate shared memory by creating a DWORD named FileMappingSize in the registry key <example-value>*\<category name>*\Performance. The FileMappingSize value is set to the shared memory size of the category. The default size is 131072 decimal. If the FileMappingSize value is not present, the `fileMappingSize` attribute value for the `performanceCounters` element specified in the Machine.config file is used, causing additional overhead for configuration file processing. You can realize a performance improvement for application startup by setting the file mapping size in the registry.

> **Note:**
> It is strongly recommended that new performance counter categories be created during the installation of the application, not during the execution of the application. This allows time for the operating system to refresh its list of registered performance counter categories. If the list has not been refreshed, the attempt to use the category will fail.

> **Note:**
> To read performance counters from a non-interactive logon session on Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.
>
> On Windows, User Account Control (UAC) determines the privileges of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To execute the code that accesses performance counters, you must first elevate your privileges from standard user to administrator. You can do this when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.

#### Examples
The following code example shows the use of the `PerformanceCounterCategory.Create` method. The example shows how to create a custom, multi-instance performance counter category for the number of orders per second.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterCategory/Create/program.cs._

## PerformanceCounterCategory.Create(String, String, String, String) method

```csharp
public static System.Diagnostics.PerformanceCounterCategory Create (string categoryName, string categoryHelp, string counterName, string counterHelp);
```

Registers a custom performance counter category containing a single counter of type `NumberOfItems32` on the local computer.

Parameters:

- `categoryName`: The name of the custom performance counter category to create and register with the system.
- `categoryHelp`: A description of the custom category.
- `counterName`: The name of a new counter, of type `NumberOfItems32`, to create as part of the new category.
- `counterHelp`: A description of the counter that is associated with the new custom category.

Returns: A `PerformanceCounterCategory` that is associated with the new system category, or performance object.

Exceptions:

- `ArgumentException`: `counterName` is `null` or is an empty string ("").

-or-

The counter that is specified by `counterName` already exists.

-or-

`counterName` has invalid syntax. It might contain backslash characters ("\\") or have length greater than 80 characters.
- `InvalidOperationException`: The category already exists on the local computer.
- `ArgumentNullException`: `categoryName` is `null`.

-or-

`counterHelp` is `null`.
- `Win32Exception`: A call to an underlying system API failed.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks

> **Note:**
> To read performance counters from a non-interactive logon session on Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.
>
> To avoid having to elevate your privileges to access performance counters in Windows Vista and later, add yourself to the Performance Monitor Users group.
>
> In Windows Vista and later, User Account Control (UAC) determines the privileges of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To execute the code that accesses performance counters, you must first elevate your privileges from standard user to administrator. You can do this when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.

## PerformanceCounterCategory.Create(String, String, PerformanceCounterCategoryType, String, String) method

```csharp
public static System.Diagnostics.PerformanceCounterCategory Create (string categoryName, string categoryHelp, System.Diagnostics.PerformanceCounterCategoryType categoryType, string counterName, string counterHelp);
```

Registers the custom performance counter category containing a single counter of type `PerformanceCounterType.NumberOfItems32` on the local computer.

Parameters:

- `categoryName`: The name of the custom performance counter category to create and register with the system.
- `categoryHelp`: A description of the custom category.
- `categoryType`: One of the `PerformanceCounterCategoryType` values specifying whether the category is `PerformanceCounterCategoryType.MultiInstance`, `PerformanceCounterCategoryType.SingleInstance`, or `PerformanceCounterCategoryType.Unknown`.
- `counterName`: The name of a new counter to create as part of the new category.
- `counterHelp`: A description of the counter that is associated with the new custom category.

Returns: A `PerformanceCounterCategory` that is associated with the new system category, or performance object.

Exceptions:

- `ArgumentException`: `counterName` is `null` or is an empty string ("").

-or-

The counter that is specified by `counterName` already exists.

-or-

`counterName` has invalid syntax. It might contain backslash characters ("\\") or have length greater than 80 characters.
- `InvalidOperationException`: The category already exists on the local computer.
- `ArgumentNullException`: `categoryName` is `null`.

-or-

`counterHelp` is `null`.
- `Win32Exception`: A call to an underlying system API failed.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks
The `categoryType` parameter specifies whether the performance counter category is single-instance or multi-instance. By default, a category is single-instance when it is created and becomes multi-instance when another instance is added. Categories are created when an application is set up, and instances are added at run time. The `PerformanceCounterCategoryType` enumeration is used to indicate whether a performance counter can have multiple instances.

Performance counter categories installed with .NET use separate shared memory, with each performance counter category having its own memory. You can specify the size of separate shared memory by creating a DWORD named FileMappingSize in the registry key <example-value>*\<category name>*\Performance. The FileMappingSize value is set to the shared memory size of the category. The default size is 131072 decimal. If the FileMappingSize value is not present, the `fileMappingSize` attribute value for the `performanceCounters` element specified in the Machine.config file is used, causing additional overhead for configuration file processing. You can realize a performance improvement for application startup by setting the file mapping size in the registry.

> **Note:**
> It is strongly recommended that new performance counter categories be created during the installation of the application, not during the execution of the application. This allows time for the operating system to refresh its list of registered performance counter categories. If the list has not been refreshed, the attempt to use the category will fail.

> **Note:**
> To read performance counters from a non-interactive logon session on Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.
>
> To avoid having to elevate your privileges to access performance counters in Windows Vista and later, add yourself to the Performance Monitor Users group.
>
> In Windows Vista and later, User Account Control (UAC) determines the privileges of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To execute the code that accesses performance counters, you must first elevate your privileges from standard user to administrator. You can do this when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.

#### Examples
The following code example shows the use of the `PerformanceCounterCategory.Create` method. The example shows how to create a custom, single instance performance counter category.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterCategory/Create/program.cs._

## PerformanceCounterCategory.Delete(String) method

```csharp
public static void Delete (string categoryName);
```

Removes the category and its associated counters from the local computer.

Parameters:

- `categoryName`: The name of the custom performance counter category to delete.

Exceptions:

- `ArgumentNullException`: The `categoryName` parameter is `null`.
- `ArgumentException`: The `categoryName` parameter has invalid syntax. It might contain backslash characters ("\\") or have length greater than 80 characters.
- `Win32Exception`: A call to an underlying system API failed.
- `InvalidOperationException`: The category cannot be deleted because it is not a custom category.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks
You can delete only custom performance counter categories from the system. You cannot delete a counter from a category. To do so, delete the category and recreate the category with the counters you want to retain. To avoid an exception, confirm that the category exists before you attempt to delete it.

> **Note:**
> To read performance counters from a non-interactive logon session on Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.
>
> To avoid having to elevate your privileges to access performance counters in Windows Vista and later, add yourself to the Performance Monitor Users group.
>
> In Windows Vista and later, User Account Control (UAC) determines the privileges of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To execute the code that accesses performance counters, you must first elevate your privileges from standard user to administrator. You can do this when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.

#### Examples
The following code example uses the `PerformanceCounterCategory.Delete` method to delete a `PerformanceCounterCategory` and the `PerformanceCounter` objects that it contains.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterCategory/.ctor/perfCounterCatDelete.cs._
