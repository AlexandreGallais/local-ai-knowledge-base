---
title: "PerformanceCounterCategory class (part 4 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/PerformanceCounterCategory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PerformanceCounterCategory class (part 4 of 6)

## PerformanceCounterCategory.Exists(String) method

```csharp
public static bool Exists (string categoryName);
```

Determines whether the category is registered on the local computer.

Parameters:

- `categoryName`: The name of the performance counter category to look for.

Returns: `true` if the category is registered; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `categoryName` parameter is `null`.
- `ArgumentException`: The `categoryName` parameter is an empty string ("").
- `Win32Exception`: A call to an underlying system API failed.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks
Use of the `PerformanceCounterCategory.Exists` method can result in a noticeable performance penalty while all performance counters on the machine are checked for availability. If you are only writing to a performance counter, you can avoid the global search for performance counters by creating the performance counter when the application is installed and assuming the category exists when accessing the counter. There is no way to avoid the performance counter search when reading from performance counters.

> **Note:**
> To read performance counters from a non-interactive logon session on Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.
>
> To avoid having to elevate your privileges to access performance counters in Windows Vista and later, add yourself to the Performance Monitor Users group.
>
> In Windows Vista and later, User Account Control (UAC) determines the privileges of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To execute the code that accesses performance counters, you must first elevate your privileges from standard user to administrator. You can do this when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.

#### Examples
The following code example determines whether a `PerformanceCounterCategory` object named "orders" exists. If not, it creates the `PerformanceCounterCategory` object by using a `CounterCreationDataCollection` object that contains two performance counters.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterCategory/Create/ccd.cs._

## PerformanceCounterCategory.Exists(String, String) method

```csharp
public static bool Exists (string categoryName, string machineName);
```

Determines whether the category is registered on the specified computer.

Parameters:

- `categoryName`: The name of the performance counter category to look for.
- `machineName`: The name of the computer to examine for the category.

Returns: `true` if the category is registered; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `categoryName` parameter is `null`.
- `ArgumentException`: The `categoryName` parameter is an empty string ("").

-or-

The `machineName` parameter is invalid.
- `Win32Exception`: A call to an underlying system API failed.
- `IOException`: The network path cannot be found.
- `UnauthorizedAccessException`: The caller does not have the required permission.

-or-

Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks
Use of the `PerformanceCounterCategory.Exists` method can result in a noticeable performance penalty while all performance counters on the machine are checked for availability. If you are only writing to a performance counter, you can avoid the global search for performance counters by creating the performance counter when the application is installed and assuming the category exists when accessing the counter. There is no way to avoid the performance counter search when reading from performance counters.

> **Note:**
> To read performance counters from a non-interactive logon session on Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.
>
> To avoid having to elevate your privileges to access performance counters in Windows Vista and later, add yourself to the Performance Monitor Users group.
>
> In Windows Vista and later, User Account Control (UAC) determines the privileges of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To execute the code that accesses performance counters, you must first elevate your privileges from standard user to administrator. You can do this when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.

#### Examples
The following example determines whether a `PerformanceCounterCategory` object named `Orders` exists. If it does not exist, the example creates the `PerformanceCounterCategory` object by using a `CounterCreationDataCollection` object that contains two performance counters.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterCategory/Create/ccd.cs._

## PerformanceCounterCategory.GetCategories() method

```csharp
public static System.Diagnostics.PerformanceCounterCategory[] GetCategories ();
```

Retrieves a list of the performance counter categories that are registered on the local computer.

Returns: An array of `PerformanceCounterCategory` objects indicating the categories that are registered on the local computer.

Exceptions:

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
The following code example uses the `PerformanceCounterCategory.GetCategories` method to return an array of `PerformanceCounterCategory` objects from the local computer or a specified computer. It converts the `PerformanceCounterCategory` array into an array of category names, which it sorts and displays for the user. The `PerformanceCounterCategory.GetCategories` overload is selected based on whether a computer name was specified.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterCategory/GetCategories/perfcountergetcat.cs._

## PerformanceCounterCategory.GetCategories(String) method

```csharp
public static System.Diagnostics.PerformanceCounterCategory[] GetCategories (string machineName);
```

Retrieves a list of the performance counter categories that are registered on the specified computer.

Parameters:

- `machineName`: The computer to look on.

Returns: An array of `PerformanceCounterCategory` objects indicating the categories that are registered on the specified computer.

Exceptions:

- `ArgumentException`: The `machineName` parameter is invalid.
- `Win32Exception`: A call to an underlying system API failed.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks
To retrieve the categories on the local computer, use another overload or pass "." as the `machineName` parameter.

> **Note:**
> To read performance counters from a non-interactive logon session on Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.
>
> To avoid having to elevate your privileges to access performance counters in Windows Vista and later, add yourself to the Performance Monitor Users group.
>
> In Windows Vista and later, User Account Control (UAC) determines the privileges of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To execute the code that accesses performance counters, you must first elevate your privileges from standard user to administrator. You can do this when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.

#### Examples
The following code example uses the `PerformanceCounterCategory.GetCategories` method to return an array of `PerformanceCounterCategory` objects from the local computer or a specified computer. It converts the `PerformanceCounterCategory` array into an array of category names, which it sorts and displays for the user. The `PerformanceCounterCategory.GetCategories` overload is selected based on whether a computer name was specified.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterCategory/GetCategories/perfcountergetcat.cs._

## PerformanceCounterCategory.GetCounters() method

```csharp
public System.Diagnostics.PerformanceCounter[] GetCounters ();
```

Retrieves a list of the counters in a performance counter category that contains exactly one instance.

Returns: An array of `PerformanceCounter` objects indicating the counters that are associated with this single-instance performance counter category.

Exceptions:

- `ArgumentException`: The category is not a single instance.
- `Win32Exception`: A call to an underlying system API failed.
- `InvalidOperationException`: The category does not have an associated instance.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks
For more information about performance object instances, see the `PerformanceCounter` class overview.

> **Note:**
> To read performance counters from a non-interactive logon session on Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.
>
> To avoid having to elevate your privileges to access performance counters in Windows Vista and later, add yourself to the Performance Monitor Users group.
>
> In Windows Vista and later, User Account Control (UAC) determines the privileges of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To execute the code that accesses performance counters, you must first elevate your privileges from standard user to administrator. You can do this when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.

#### Examples
The following code example gets a list of the `PerformanceCounter` objects in a `PerformanceCounterCategory`. It first creates a `PerformanceCounterCategory` with the appropriate constructor, based on whether a computer name was specified. It then uses the `PerformanceCounterCategory.GetCounters` method to return an array of `PerformanceCounter` objects, selecting the `PerformanceCounterCategory.GetCounters` overload based on whether an instance name was specified.

This `GetCounters` overload fails unless it is used with a single-instance category.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/PerformanceCounterCategory/GetCategories/perfcountercatgetcount.cs._
