---
title: "PerformanceCounterPermission class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/PerformanceCounterPermission.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PerformanceCounterPermission class

Namespace: `System.Diagnostics`

```csharp
public sealed class PerformanceCounterPermission : System.Security.Permissions.ResourcePermissionBase
```

Allows control of code access permissions for `PerformanceCounter`.

#### Remarks

## PerformanceCounterPermission.PerformanceCounterPermission() constructor

```csharp
public PerformanceCounterPermission ();
```

Initializes a new instance of the `PerformanceCounterPermission` class.

To be added.

## PerformanceCounterPermission.PerformanceCounterPermission(PerformanceCounterPermissionEntry[]) constructor

```csharp
public PerformanceCounterPermission (System.Diagnostics.PerformanceCounterPermissionEntry[] permissionAccessEntries);
```

Initializes a new instance of the `PerformanceCounterPermission` class with the specified permission access level entries.

Parameters:

- `permissionAccessEntries`: An array of `PerformanceCounterPermissionEntry` objects. The `PerformanceCounterPermission.PermissionEntries` property is set to this value.

Exceptions:

- `ArgumentNullException`: `permissionAccessEntries` is `null`.

To be added.

## PerformanceCounterPermission.PerformanceCounterPermission(PermissionState) constructor

```csharp
public PerformanceCounterPermission (System.Security.Permissions.PermissionState state);
```

Initializes a new instance of the `PerformanceCounterPermission` class with the specified permission state.

Parameters:

- `state`: One of the `PermissionState` values.

Exceptions:

- `ArgumentException`: The `state` parameter is not a valid value of `PermissionState`.

To be added.

## PerformanceCounterPermission.PerformanceCounterPermission(PerformanceCounterPermissionAccess, String, String) constructor

```csharp
public PerformanceCounterPermission (System.Diagnostics.PerformanceCounterPermissionAccess permissionAccess, string machineName, string categoryName);
```

Initializes a new instance of the `PerformanceCounterPermission` class with the specified access levels, the name of the computer to use, and the category associated with the performance counter.

Parameters:

- `permissionAccess`: One of the `PerformanceCounterPermissionAccess` values.
- `machineName`: The server on which the performance counter and its associate category reside.
- `categoryName`: The name of the performance counter category (performance object) with which the performance counter is associated.

To be added.

## PerformanceCounterPermission.PermissionEntries property

```csharp
public System.Diagnostics.PerformanceCounterPermissionEntryCollection PermissionEntries { get; }
```

Gets the collection of permission entries for this permissions request.

Returns: A `PerformanceCounterPermissionEntryCollection` that contains the permission entries for this permissions request.

To be added.
