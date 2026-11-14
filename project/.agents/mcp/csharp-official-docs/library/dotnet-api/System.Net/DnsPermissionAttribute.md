---
title: "DnsPermissionAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/DnsPermissionAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DnsPermissionAttribute class

Namespace: `System.Net`

```csharp
public sealed class DnsPermissionAttribute : System.Security.Permissions.CodeAccessSecurityAttribute
```

Specifies permission to request information from Domain Name Servers.

#### Remarks

## DnsPermissionAttribute.DnsPermissionAttribute(SecurityAction) constructor

```csharp
public DnsPermissionAttribute (System.Security.Permissions.SecurityAction action);
```

Initializes a new instance of the `DnsPermissionAttribute` class with the specified `SecurityAction` value.

Parameters:

- `action`: One of the `SecurityAction` values.

Exceptions:

- `ArgumentException`: The `action` parameter is not a valid `SecurityAction`.

To be added.

## DnsPermissionAttribute.CreatePermission() method

```csharp
public override System.Security.IPermission CreatePermission ();
```

Creates and returns a new instance of the `DnsPermission` class.

Returns: A `DnsPermission` that corresponds to the security declaration.

To be added.
