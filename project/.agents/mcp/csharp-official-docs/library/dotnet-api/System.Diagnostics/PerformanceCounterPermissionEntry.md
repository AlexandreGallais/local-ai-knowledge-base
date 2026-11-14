---
title: "PerformanceCounterPermissionEntry class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/PerformanceCounterPermissionEntry.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PerformanceCounterPermissionEntry class

Namespace: `System.Diagnostics`

```csharp
public class PerformanceCounterPermissionEntry
```

Defines the smallest unit of a code access security permission that is set for a `PerformanceCounter`.

To be added.

## PerformanceCounterPermissionEntry.PerformanceCounterPermissionEntry(PerformanceCounterPermissionAccess, String, String) constructor

```csharp
public PerformanceCounterPermissionEntry (System.Diagnostics.PerformanceCounterPermissionAccess permissionAccess, string machineName, string categoryName);
```

Initializes a new instance of the `PerformanceCounterPermissionEntry` class.

Parameters:

- `permissionAccess`: A bitwise combination of the `PerformanceCounterPermissionAccess` values. The `PerformanceCounterPermissionEntry.PermissionAccess` property is set to this value.
- `machineName`: The server on which the category of the performance counter resides.
- `categoryName`: The name of the performance counter category (performance object) with which this performance counter is associated.

Exceptions:

- `ArgumentNullException`: `categoryName` is `null`.

-or-

`machineName` is `null`.
- `ArgumentException`: `permissionAccess` is not a valid `PerformanceCounterPermissionAccess` value.

-or-

`machineName` is not a valid computer name.

To be added.

## PerformanceCounterPermissionEntry.CategoryName property

```csharp
public string CategoryName { get; }
```

Gets the name of the performance counter category (performance object).

Returns: The name of the performance counter category (performance object).

To be added.

## PerformanceCounterPermissionEntry.MachineName property

```csharp
public string MachineName { get; }
```

Gets the name of the server on which the category of the performance counter resides.

Returns: The name of the server on which the category resides.

To be added.

## PerformanceCounterPermissionEntry.PermissionAccess property

```csharp
public System.Diagnostics.PerformanceCounterPermissionAccess PermissionAccess { get; }
```

Gets the permission access level of the entry.

Returns: A bitwise combination of the `PerformanceCounterPermissionAccess` values.

To be added.
