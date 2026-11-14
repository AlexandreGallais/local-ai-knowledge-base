---
title: "PerformanceCounterPermissionAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/PerformanceCounterPermissionAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PerformanceCounterPermissionAttribute class

Namespace: `System.Diagnostics`

```csharp
public class PerformanceCounterPermissionAttribute : System.Security.Permissions.CodeAccessSecurityAttribute
```

Allows declarative performance counter permission checks.

#### Remarks

## PerformanceCounterPermissionAttribute.PerformanceCounterPermissionAttribute(SecurityAction) constructor

```csharp
public PerformanceCounterPermissionAttribute (System.Security.Permissions.SecurityAction action);
```

Initializes a new instance of the `PerformanceCounterPermissionAttribute` class.

Parameters:

- `action`: One of the `SecurityAction` values.

To be added.

## PerformanceCounterPermissionAttribute.CategoryName property

```csharp
public string CategoryName { get; set; }
```

Gets or sets the name of the performance counter category.

Returns: The name of the performance counter category (performance object).

Exceptions:

- `ArgumentNullException`: The value is `null`.

To be added.

## PerformanceCounterPermissionAttribute.MachineName property

```csharp
public string MachineName { get; set; }
```

Gets or sets the computer name for the performance counter.

Returns: The server on which the category of the performance counter resides.

Exceptions:

- `ArgumentException`: The `PerformanceCounterPermissionAttribute.MachineName` format is invalid.

To be added.

## PerformanceCounterPermissionAttribute.PermissionAccess property

```csharp
public System.Diagnostics.PerformanceCounterPermissionAccess PermissionAccess { get; set; }
```

Gets or sets the access levels used in the permissions request.

Returns: A bitwise combination of the `PerformanceCounterPermissionAccess` values. The default is `EventLogPermissionAccess.Write`.

To be added.

## PerformanceCounterPermissionAttribute.CreatePermission() method

```csharp
public override System.Security.IPermission CreatePermission ();
```

Creates the permission based on the requested access levels that are set through the `PerformanceCounterPermissionAttribute.PermissionAccess` property on the attribute.

Returns: An `IPermission` that represents the created permission.

To be added.
