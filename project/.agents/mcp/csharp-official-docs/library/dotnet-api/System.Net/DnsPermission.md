---
title: "DnsPermission class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/DnsPermission.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DnsPermission class

Namespace: `System.Net`

```csharp
public sealed class DnsPermission : System.Security.CodeAccessPermission, System.Security.Permissions.IUnrestrictedPermission
```

Controls rights to access Domain Name System (DNS) servers on the network.

#### Remarks

## DnsPermission.DnsPermission(PermissionState) constructor

```csharp
public DnsPermission (System.Security.Permissions.PermissionState state);
```

Creates a new instance of the `DnsPermission` class that either allows unrestricted DNS access or disallows DNS access.

Parameters:

- `state`: One of the `PermissionState` values.

Exceptions:

- `ArgumentException`: `state` is not a valid `PermissionState` value.

To be added.

## DnsPermission.Copy() method

```csharp
public override System.Security.IPermission Copy ();
```

Creates an identical copy of the current permission instance.

Returns: A new instance of the `DnsPermission` class that is an identical copy of the current instance.

To be added.

## DnsPermission.FromXml(SecurityElement) method

```csharp
public override void FromXml (System.Security.SecurityElement securityElement);
```

Reconstructs a `DnsPermission` instance from an XML encoding.

Parameters:

- `securityElement`: The XML encoding to use to reconstruct the `DnsPermission` instance.

Exceptions:

- `ArgumentNullException`: `securityElement` is `null`.
- `ArgumentException`: `securityElement` is not a `DnsPermission` element.

To be added.

## DnsPermission.Intersect(IPermission) method

```csharp
public override System.Security.IPermission Intersect (System.Security.IPermission target);
```

Creates a permission instance that is the intersection of the current permission instance and the specified permission instance.

Parameters:

- `target`: The `DnsPermission` instance to intersect with the current instance.

Returns: A `DnsPermission` instance that represents the intersection of the current `DnsPermission` instance with the specified `DnsPermission` instance, or `null` if the intersection is empty. If both the current instance and `target` are unrestricted, this method returns a new `DnsPermission` instance that is unrestricted; otherwise, it returns `null`.

Exceptions:

- `ArgumentException`: `target` is neither a `DnsPermission` nor `null`.

To be added.

## DnsPermission.IsSubsetOf(IPermission) method

```csharp
public override bool IsSubsetOf (System.Security.IPermission target);
```

Determines whether the current permission instance is a subset of the specified permission instance.

Parameters:

- `target`: The second `DnsPermission` instance to be tested for the subset relationship.

Returns: `false` if the current instance is unrestricted and `target` is either `null` or unrestricted; otherwise, `true`.

Exceptions:

- `ArgumentException`: `target` is neither a `DnsPermission` nor `null`.

To be added.

## DnsPermission.IsUnrestricted() method

```csharp
public bool IsUnrestricted ();
```

Checks the overall permission state of the object.

Returns: `true` if the `DnsPermission` instance was created with `PermissionState.Unrestricted`; otherwise, `false`.

To be added.

## DnsPermission.ToXml() method

```csharp
public override System.Security.SecurityElement ToXml ();
```

Creates an XML encoding of a `DnsPermission` instance and its current state.

Returns: A `SecurityElement` instance that contains an XML-encoded representation of the security object, including state information.

To be added.

## DnsPermission.Union(IPermission) method

```csharp
public override System.Security.IPermission Union (System.Security.IPermission target);
```

Creates a permission instance that is the union of the current permission instance and the specified permission instance.

Parameters:

- `target`: The `DnsPermission` instance to combine with the current instance.

Returns: A `DnsPermission` instance that represents the union of the current `DnsPermission` instance with the specified `DnsPermission` instance. If `target` is `null`, this method returns a copy of the current instance. If the current instance or `target` is unrestricted, this method returns a `DnsPermission` instance that is unrestricted; otherwise, it returns a `DnsPermission` instance that is restricted.

Exceptions:

- `ArgumentException`: `target` is neither a `DnsPermission` nor `null`.

To be added.
