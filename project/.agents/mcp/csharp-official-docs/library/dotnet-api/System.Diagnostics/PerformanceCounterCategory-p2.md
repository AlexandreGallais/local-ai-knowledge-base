---
title: "PerformanceCounterCategory class (part 2 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/PerformanceCounterCategory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PerformanceCounterCategory class (part 2 of 6)

## PerformanceCounterCategory.CounterExists(String) method

```csharp
public bool CounterExists (string counterName);
```

Determines whether the specified counter is registered to this category, which is indicated by the `PerformanceCounterCategory.CategoryName` and `PerformanceCounterCategory.MachineName` properties.

Parameters:

- `counterName`: The name of the performance counter to look for.

Returns: `true` if the counter is registered to the category that is specified by the `PerformanceCounterCategory.CategoryName` and `PerformanceCounterCategory.MachineName` properties; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `counterName` is `null`.
- `InvalidOperationException`: The `PerformanceCounterCategory.CategoryName` property has not been set.
- `Win32Exception`: A call to an underlying system API failed.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks
You must set the `CategoryName` property before calling this method. Otherwise, an exception is thrown.

If you have not set the `MachineName` property, this method uses the local computer (".").

> **Note:**
> To read performance counters from a non-interactive logon session on Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.
>
> To avoid having to elevate your privileges to access performance counters in Windows Vista and later, add yourself to the Performance Monitor Users group.
>
> In Windows Vista and later, User Account Control (UAC) determines the privileges of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To execute the code that accesses performance counters, you must first elevate your privileges from standard user to administrator. You can do this when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.

#### Examples
The following code example determines whether a `PerformanceCounter` exists. It gets a category name, counter name, and computer name from the command line, if they are given. It creates a `PerformanceCounterCategory` object using the appropriate `PerformanceCounterCategory.%23ctor`. It then uses the `CounterExists` method to determine whether the specified `PerformanceCounter` exists, and informs the user.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterCategory/CounterExists/perfcountercatobjexists.cs._

## PerformanceCounterCategory.CounterExists(String, String) method

```csharp
public static bool CounterExists (string counterName, string categoryName);
```

Determines whether the specified counter is registered to the specified category on the local computer.

Parameters:

- `counterName`: The name of the performance counter to look for.
- `categoryName`: The name of the performance counter category, or performance object, with which the specified performance counter is associated.

Returns: `true`, if the counter is registered to the specified category on the local computer; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `categoryName` is `null`.

-or-

The `counterName` is `null`.
- `ArgumentException`: The `categoryName` is an empty string ("").
- `InvalidOperationException`: The category name does not exist.
- `Win32Exception`: A call to an underlying system API failed.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks

> **Note:**
> To read performance counters from a non-interactive logon session on Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.
>
> To avoid having to elevate your privileges to access performance counters in Windows Vista and later, add yourself to the Performance Monitor Users group.
>
> In Windows Vista and later, User Account Control (UAC) determines the privileges of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To execute the code that accesses performance counters, you must first elevate your privileges from standard user to administrator. You can do this when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.

#### Examples
The following code example determines whether a `PerformanceCounter` exists. It gets a category name, counter name, and computer name from the command line, if they are given. It uses the static overloads of the `PerformanceCounterCategory.CounterExists` method to determine whether the specified `PerformanceCounter` name exists in the `PerformanceCounterCategory`. The overload is selected based on whether a computer name is provided.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterCategory/CounterExists/perfcountercatstatcounterexists.cs._

## PerformanceCounterCategory.CounterExists(String, String, String) method

```csharp
public static bool CounterExists (string counterName, string categoryName, string machineName);
```

Determines whether the specified counter is registered to the specified category on a remote computer.

Parameters:

- `counterName`: The name of the performance counter to look for.
- `categoryName`: The name of the performance counter category, or performance object, with which the specified performance counter is associated.
- `machineName`: The name of the computer on which the performance counter category and its associated counters exist.

Returns: `true`, if the counter is registered to the specified category on the specified computer; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `categoryName` is `null`.

-or-

The `counterName` is `null`.
- `ArgumentException`: The `categoryName` is an empty string ("").

-or-

The `machineName` is invalid.
- `InvalidOperationException`: The category name does not exist.
- `Win32Exception`: A call to an underlying system API failed.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks

> **Note:**
> To read performance counters from a non-interactive logon session on Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.
>
> To avoid having to elevate your privileges to access performance counters in Windows Vista and later, add yourself to the Performance Monitor Users group.
>
> In Windows Vista and later, User Account Control (UAC) determines the privileges of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To execute the code that accesses performance counters, you must first elevate your privileges from standard user to administrator. You can do this when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.

#### Examples
The following code example determines whether a `PerformanceCounter` exists. It gets a category name, counter name, and computer name from the command line, if they are given. It uses the static overloads of the `PerformanceCounterCategory.CounterExists` method to determine whether the specified `PerformanceCounter` name exists in the `PerformanceCounterCategory`. The overload is selected based on whether a computer name is provided.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterCategory/CounterExists/perfcountercatstatcounterexists.cs._

## PerformanceCounterCategory.Create(String, String, CounterCreationDataCollection) method

```csharp
public static System.Diagnostics.PerformanceCounterCategory Create (string categoryName, string categoryHelp, System.Diagnostics.CounterCreationDataCollection counterData);
```

Registers the custom performance counter category containing the specified counters on the local computer.

Parameters:

- `categoryName`: The name of the custom performance counter category to create and register with the system.
- `categoryHelp`: A description of the custom category.
- `counterData`: A `CounterCreationDataCollection` that specifies the counters to create as part of the new category.

Returns: A `PerformanceCounterCategory` that is associated with the new custom category, or performance object.

Exceptions:

- `ArgumentException`: A counter name that is specified within the `counterData` collection is `null` or an empty string ("").

-or-

A counter that is specified within the `counterData` collection already exists.
- `ArgumentNullException`: The `categoryName` parameter is `null`.
- `InvalidOperationException`: The category already exists on the local computer.

-or-

The layout of the `counterData` collection is incorrect for base counters. A counter of type `AverageCount64`, `AverageTimer32`, `CounterMultiTimer`, `CounterMultiTimerInverse`, `CounterMultiTimer100Ns`, `CounterMultiTimer100NsInverse`, `RawFraction`, `SampleFraction` or `SampleCounter` has to be immediately followed by one of the base counter types (`AverageBase`, `MultiBase`, `RawBase`, or `SampleBase`).
- `Win32Exception`: A call to an underlying system API failed.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks

> **Note:**
> To read performance counters from a non-interactive logon session on Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.
>
> To avoid having to elevate your privileges to access performance counters in Windows Vista and later, add yourself to the Performance Monitor Users group.
>
> In Windows Vista and later, User Account Control (UAC) determines the privileges of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To execute the code that accesses performance counters, you must first elevate your privileges from standard user to administrator. You can do this when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.
