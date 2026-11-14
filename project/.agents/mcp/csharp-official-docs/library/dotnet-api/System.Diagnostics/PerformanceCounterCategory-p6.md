---
title: "PerformanceCounterCategory class (part 6 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/PerformanceCounterCategory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PerformanceCounterCategory class (part 6 of 6)

## PerformanceCounterCategory.ReadCategory() method

```csharp
public System.Diagnostics.InstanceDataCollectionCollection ReadCategory ();
```

Reads all the counter and performance object instance data that is associated with this performance counter category.

Returns: An `InstanceDataCollectionCollection` that contains the counter and performance object instance data for the category.

Exceptions:

- `InvalidOperationException`: The `PerformanceCounterCategory.CategoryName` property is `null`. The property might not have been set.
- `Win32Exception`: A call to an underlying system API failed.
- `UnauthorizedAccessException`: Code that is executing without administrative privileges attempted to read a performance counter.

#### Remarks
You must set the `CategoryName` property before you call `PerformanceCounterCategory.ReadCategory`.

Reading the entire category at once can be as efficient as reading a single counter because of the way that the system provides the data.

> **Note:**
> To read performance counters from a non-interactive logon session on Windows, you must either be a member of the Performance Monitor Users group or have administrative privileges.
>
> To avoid having to elevate your privileges to access performance counters in Windows Vista and later, add yourself to the Performance Monitor Users group.
>
> In Windows Vista and later, User Account Control (UAC) determines the privileges of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To execute the code that accesses performance counters, you must first elevate your privileges from standard user to administrator. You can do this when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.

#### Examples
The following code example creates a `PerformanceCounterCategory` for a specified `PerformanceCounterCategory` name. It then uses `PerformanceCounterCategory.ReadCategory` to return an `InstanceDataCollectionCollection` that contains instance data for all the instances of the `PerformanceCounter` objects within the `PerformanceCounterCategory`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/InstanceData/Overview/instdatacopyto.cs._
