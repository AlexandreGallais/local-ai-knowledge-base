---
title: "NetworkInformationAccess enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/NetworkInformationAccess.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NetworkInformationAccess enum

Namespace: `System.Net.NetworkInformation`

```csharp
public enum NetworkInformationAccess
```

Specifies permission to access information about network interfaces and traffic statistics.

#### Remarks
This enumeration is used with the `NetworkInformationPermission` class to specify the level of access to information that the permission object controls.

#### Examples
The following code example creates a permission that controls Read access to network information.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/NetworkInformationAccess/Overview/permissionexample.cs._

## NetworkInformationAccess.None field

```csharp
None
```

No access to network information.

## NetworkInformationAccess.Ping field

```csharp
Ping
```

Ping access to network information.

## NetworkInformationAccess.Read field

```csharp
Read
```

Read access to network information.
