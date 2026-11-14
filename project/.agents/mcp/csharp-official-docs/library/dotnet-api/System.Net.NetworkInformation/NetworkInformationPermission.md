---
title: "NetworkInformationPermission class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/NetworkInformationPermission.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NetworkInformationPermission class

Namespace: `System.Net.NetworkInformation`

```csharp
public sealed class NetworkInformationPermission : System.Security.CodeAccessPermission, System.Security.Permissions.IUnrestrictedPermission
```

Controls access to network information and traffic statistics for the local computer. This class cannot be inherited.

#### Remarks

## NetworkInformationPermission.NetworkInformationPermission(NetworkInformationAccess) constructor

```csharp
public NetworkInformationPermission (System.Net.NetworkInformation.NetworkInformationAccess access);
```

Initializes a new instance of the `NetworkInformationPermission` class using the specified `NetworkInformationAccess` value.

Parameters:

- `access`: One of the `NetworkInformationAccess` values.

To be added.

## NetworkInformationPermission.NetworkInformationPermission(PermissionState) constructor

```csharp
public NetworkInformationPermission (System.Security.Permissions.PermissionState state);
```

Initializes a new instance of the `NetworkInformationPermission` class with the specified `PermissionState`.

Parameters:

- `state`: One of the `PermissionState` values.

To be added.

## NetworkInformationPermission.Access property

```csharp
public System.Net.NetworkInformation.NetworkInformationAccess Access { get; }
```

Gets the level of access to network information controlled by this permission.

Returns: One of the `NetworkInformationAccess` values.

To be added.

## NetworkInformationPermission.AddPermission(NetworkInformationAccess) method

```csharp
public void AddPermission (System.Net.NetworkInformation.NetworkInformationAccess access);
```

Adds the specified value to this permission.

Parameters:

- `access`: One of the `NetworkInformationAccess` values.

To be added.

## NetworkInformationPermission.Copy() method

```csharp
public override System.Security.IPermission Copy ();
```

Creates and returns an identical copy of this permission.

Returns: A `NetworkInformationPermission` that is identical to the current permission.

To be added.

## NetworkInformationPermission.FromXml(SecurityElement) method

```csharp
public override void FromXml (System.Security.SecurityElement securityElement);
```

Sets the state of this permission using the specified XML encoding.

Parameters:

- `securityElement`: A `SecurityElement` that contains the XML encoding to use to set the state of the current permission.

Exceptions:

- `ArgumentNullException`: `securityElement` is `null`.
- `ArgumentException`: `securityElement` is not a permission encoding.

-or-

`securityElement` is not an encoding of a `NetworkInformationPermission`.

-or-

`securityElement` has invalid `NetworkInformationAccess` values.

To be added.

## NetworkInformationPermission.Intersect(IPermission) method

```csharp
public override System.Security.IPermission Intersect (System.Security.IPermission target);
```

Creates and returns a permission that is the intersection of the current permission and the specified permission.

Parameters:

- `target`: An `IPermission` to intersect with the current permission. It must be of the same type as the current permission.

Returns: A `NetworkInformationPermission` that represents the intersection of the current permission and the specified permission. This new permission is `null` if the intersection is empty or `target` is `null`.

Exceptions:

- `ArgumentException`: `target` is not a `NetworkInformationPermission`.

To be added.

## NetworkInformationPermission.IsSubsetOf(IPermission) method

```csharp
public override bool IsSubsetOf (System.Security.IPermission target);
```

Determines whether the current permission is a subset of the specified permission.

Parameters:

- `target`: An `IPermission` that is to be tested for the subset relationship. This permission must be of the same type as the current permission.

Returns: `true` if the current permission is a subset of the specified permission; otherwise, `false`.

To be added.

## NetworkInformationPermission.IsUnrestricted() method

```csharp
public bool IsUnrestricted ();
```

Returns a value indicating whether the current permission is unrestricted.

Returns: `true` if the current permission is unrestricted; otherwise, `false`.

To be added.

## NetworkInformationPermission.ToXml() method

```csharp
public override System.Security.SecurityElement ToXml ();
```

Creates an XML encoding of the state of this permission.

Returns: A `SecurityElement` that contains the XML encoding of the current permission.

To be added.

## NetworkInformationPermission.Union(IPermission) method

```csharp
public override System.Security.IPermission Union (System.Security.IPermission target);
```

Creates a permission that is the union of this permission and the specified permission.

Parameters:

- `target`: A `NetworkInformationPermission` permission to combine with the current permission.

Returns: A new permission that represents the union of the current permission and the specified permission.

To be added.
