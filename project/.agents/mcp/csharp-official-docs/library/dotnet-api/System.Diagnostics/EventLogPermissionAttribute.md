---
title: "EventLogPermissionAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventLogPermissionAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventLogPermissionAttribute class

Namespace: `System.Diagnostics`

```csharp
public class EventLogPermissionAttribute : System.Security.Permissions.CodeAccessSecurityAttribute
```

Allows declarative permission checks for event logging.

#### Remarks

## EventLogPermissionAttribute.EventLogPermissionAttribute(SecurityAction) constructor

```csharp
public EventLogPermissionAttribute (System.Security.Permissions.SecurityAction action);
```

Initializes a new instance of the `EventLogPermissionAttribute` class.

Parameters:

- `action`: One of the `SecurityAction` values.

To be added.

## EventLogPermissionAttribute.MachineName property

```csharp
public string MachineName { get; set; }
```

Gets or sets the name of the computer on which events might be read.

Returns: The name of the computer on which events might be read. The default is ".".

Exceptions:

- `ArgumentException`: The computer name is invalid.

To be added.

## EventLogPermissionAttribute.PermissionAccess property

```csharp
public System.Diagnostics.EventLogPermissionAccess PermissionAccess { get; set; }
```

Gets or sets the access levels used in the permissions request.

Returns: A bitwise combination of the `EventLogPermissionAccess` values. The default is `EventLogPermissionAccess.Write`.

To be added.

## EventLogPermissionAttribute.CreatePermission() method

```csharp
public override System.Security.IPermission CreatePermission ();
```

Creates the permission based on the `EventLogPermissionAttribute.MachineName` property and the requested access levels that are set through the `EventLogPermissionAttribute.PermissionAccess` property on the attribute.

Returns: An `IPermission` that represents the created permission.

To be added.
