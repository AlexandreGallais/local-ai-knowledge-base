---
title: "NetworkInformationPermissionAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/NetworkInformationPermissionAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NetworkInformationPermissionAttribute class

Namespace: `System.Net.NetworkInformation`

```csharp
public sealed class NetworkInformationPermissionAttribute : System.Security.Permissions.CodeAccessSecurityAttribute
```

Allows security actions for `NetworkInformationPermission` to be applied to code using declarative security.

#### Remarks

## NetworkInformationPermissionAttribute.NetworkInformationPermissionAttribute(SecurityAction) constructor

```csharp
public NetworkInformationPermissionAttribute (System.Security.Permissions.SecurityAction action);
```

Initializes a new instance of the `NetworkInformationPermissionAttribute` class.

Parameters:

- `action`: A `SecurityAction` value that specifies the permission behavior.

To be added.

## NetworkInformationPermissionAttribute.Access property

```csharp
public string Access { get; set; }
```

Gets or sets the network information access level.

Returns: A string that specifies the access level.

To be added.

## NetworkInformationPermissionAttribute.CreatePermission() method

```csharp
public override System.Security.IPermission CreatePermission ();
```

Creates and returns a new `NetworkInformationPermission` object.

Returns: A `NetworkInformationPermission` that corresponds to this attribute.

To be added.
