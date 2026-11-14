---
title: "PerformanceCounterCategory class (part 5 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/PerformanceCounterCategory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PerformanceCounterCategory class (part 5 of 6)

## PerformanceCounterCategory.GetCounters(String) method

```csharp
public System.Diagnostics.PerformanceCounter[] GetCounters (string instanceName);
```

Retrieves a list of the counters in a performance counter category that contains one or more instances.

Parameters:

- `instanceName`: The performance object instance for which to retrieve the list of associated counters.

Returns: An array of `PerformanceCounter` objects indicating the counters that are associated with the specified object instance of this performance counter category.

Exceptions:

- `ArgumentNullException`: The `instanceName` parameter is `null`.
- `InvalidOperationException`: The `PerformanceCounterCategory.CategoryName` property for this `PerformanceCounterCategory` instance has not been set.

-or-

The category does not contain the instance that is specified by the `instanceName` parameter.
- `Win32Exception`: A call to an underlying system API failed.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks
To represent a single-instance category, pass an empty string ("") for the `instanceName` parameter.

For more information about performance object instances, see the `PerformanceCounter` class overview.

> **Note:**
> To read performance counters from a non-interactive logon session on Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.
>
> To avoid having to elevate your privileges to access performance counters in Windows Vista and later, add yourself to the Performance Monitor Users group.
>
> In Windows Vista and later, User Account Control (UAC) determines the privileges of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To execute the code that accesses performance counters, you must first elevate your privileges from standard user to administrator. You can do this when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.

#### Examples
The following code example gets a list of the `PerformanceCounter` objects in a `PerformanceCounterCategory`. It first creates a `PerformanceCounterCategory` with the appropriate constructor, based on whether a computer name was specified. It then uses the `PerformanceCounterCategory.GetCounters` method to return an array of `PerformanceCounter` objects, selecting the `PerformanceCounterCategory.GetCounters` overload based on whether an instance name was specified.

This `GetCounters` overload fails unless it is used with a category that contains instances.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterCategory/GetCategories/perfcountercatgetcount.cs._

## PerformanceCounterCategory.GetInstanceNames() method

```csharp
public string[] GetInstanceNames ();
```

Retrieves the list of performance object instances that are associated with this category.

Returns: An array of strings representing the performance object instance names that are associated with this category or, if the category contains only one performance object instance, a single-entry array that contains an empty string ("").

Exceptions:

- `InvalidOperationException`: The `PerformanceCounterCategory.CategoryName` property is `null`. The property might not have been set.

-or-

The category does not have an associated instance.
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
The following code example gets a list of the `PerformanceCounter` objects in a `PerformanceCounterCategory`. It first creates a `PerformanceCounterCategory` object, using the appropriate constructor based on whether a computer name was specified. It then uses `PerformanceCounterCategory.GetInstanceNames` to return the instance names as an array of `String`, which it sorts and displays.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterCategory/GetCategories/perfcountercatgetinst.cs._

## PerformanceCounterCategory.InstanceExists(String) method

```csharp
public bool InstanceExists (string instanceName);
```

Determines whether the specified performance object instance exists in the category that is identified by this `PerformanceCounterCategory` object's `PerformanceCounterCategory.CategoryName` property.

Parameters:

- `instanceName`: The performance object instance in this performance counter category to search for.

Returns: `true` if the category contains the specified performance object instance; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The `PerformanceCounterCategory.CategoryName` property is `null`. The property might not have been set.
- `ArgumentNullException`: The `instanceName` parameter is `null`.
- `Win32Exception`: A call to an underlying system API failed.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks
This overload of `PerformanceCounterCategory.InstanceExists` is not `static`. It requires you to create a `PerformanceCounterCategory` object and to set the `CategoryName` property.

> **Note:**
> To read performance counters from a non-interactive logon session on Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.
>
> To avoid having to elevate your privileges to access performance counters in Windows Vista and later, add yourself to the Performance Monitor Users group.
>
> In Windows Vista and later, User Account Control (UAC) determines the privileges of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To execute the code that accesses performance counters, you must first elevate your privileges from standard user to administrator. You can do this when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.

#### Examples
The following code example determines whether a `PerformanceCounter` instance exists within a `PerformanceCounterCategory`. It first creates a `PerformanceCounterCategory` object, using the appropriate constructor based on whether a computer name was specified. It then uses `InstanceExists` to determine whether the specified instance exists, then informs the user. If no instance name is specified, the example uses the default single-instance name.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterCategory/CounterExists/perfcounterobjinstexists.cs._

## PerformanceCounterCategory.InstanceExists(String, String) method

```csharp
public static bool InstanceExists (string instanceName, string categoryName);
```

Determines whether a specified category on the local computer contains the specified performance object instance.

Parameters:

- `instanceName`: The performance object instance to search for.
- `categoryName`: The performance counter category to search.

Returns: `true` if the category contains the specified performance object instance; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `instanceName` parameter is `null`.

-or-

The `categoryName` parameter is `null`.
- `ArgumentException`: The `categoryName` parameter is an empty string ("").
- `Win32Exception`: A call to an underlying system API failed.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks
It is not possible to determine whether a performance object instance exists on a computer without specifying a specific category to look in.

> **Note:**
> To read performance counters from a non-interactive logon session on Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.
>
> To avoid having to elevate your privileges to access performance counters in Windows Vista and later, add yourself to the Performance Monitor Users group.
>
> In Windows Vista and later, User Account Control (UAC) determines the privileges of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To execute the code that accesses performance counters, you must first elevate your privileges from standard user to administrator. You can do this when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.

#### Examples
The following code example uses the static overloads of `PerformanceCounterCategory.InstanceExists` to determine whether the given `PerformanceCounter` instance exists in the `PerformanceCounterCategory`. The overload is selected based on whether a computer name is specified. If no instance name is specified, the example uses the default single-instance name.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterCategory/CounterExists/perfcountercatstatinstexists.cs._

## PerformanceCounterCategory.InstanceExists(String, String, String) method

```csharp
public static bool InstanceExists (string instanceName, string categoryName, string machineName);
```

Determines whether a specified category on a specified computer contains the specified performance object instance.

Parameters:

- `instanceName`: The performance object instance to search for.
- `categoryName`: The performance counter category to search.
- `machineName`: The name of the computer on which to look for the category instance pair.

Returns: `true` if the category contains the specified performance object instance; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `instanceName` parameter is `null`.

-or-

The `categoryName` parameter is `null`.
- `ArgumentException`: The `categoryName` parameter is an empty string ("").

-or-

The `machineName` parameter is invalid.
- `Win32Exception`: A call to an underlying system API failed.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks
It is not possible to determine whether a performance object instance exists on a computer without specifying a specific category to look in.

You can use "." to specify the local computer.

> **Note:**
> To read performance counters from a non-interactive logon session on Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.
>
> To avoid having to elevate your privileges to access performance counters in Windows Vista and later, add yourself to the Performance Monitor Users group.
>
> In Windows Vista and later, User Account Control (UAC) determines the privileges of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To execute the code that accesses performance counters, you must first elevate your privileges from standard user to administrator. You can do this when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.

#### Examples
The following code example uses the static overloads of `PerformanceCounterCategory.InstanceExists` to determine whether the given `PerformanceCounter` instance exists in the `PerformanceCounterCategory`. The overload is selected based on whether a computer name is specified. If no instance name is specified, the example uses the default single-instance name.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterCategory/CounterExists/perfcountercatstatinstexists.cs._
