---
title: "SocketPermission class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/SocketPermission.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SocketPermission class

Namespace: `System.Net`

```csharp
public sealed class SocketPermission : System.Security.CodeAccessPermission, System.Security.Permissions.IUnrestrictedPermission
```

Controls rights to make or accept connections on a transport address.

#### Remarks

## SocketPermission.SocketPermission(PermissionState) constructor

```csharp
public SocketPermission (System.Security.Permissions.PermissionState state);
```

Initializes a new instance of the `SocketPermission` class that allows unrestricted access to the `Socket` or disallows access to the `Socket`.

Parameters:

- `state`: One of the `PermissionState` values.

To be added.

## SocketPermission.SocketPermission(NetworkAccess, TransportType, String, Int32) constructor

```csharp
public SocketPermission (System.Net.NetworkAccess access, System.Net.TransportType transport, string hostName, int portNumber);
```

Initializes a new instance of the `SocketPermission` class for the given transport address with the specified permission.

Parameters:

- `access`: One of the `NetworkAccess` values.
- `transport`: One of the `TransportType` values.
- `hostName`: The host name for the transport address.
- `portNumber`: The port number for the transport address.

Exceptions:

- `ArgumentNullException`: `hostName` is `null`.

To be added.

## SocketPermission.AcceptList property

```csharp
public System.Collections.IEnumerator AcceptList { get; }
```

Gets a list of `EndpointPermission` instances that identifies the endpoints that can be accepted under this permission instance.

Returns: An instance that implements the `IEnumerator` interface that contains `EndpointPermission` instances.

To be added.

## SocketPermission.ConnectList property

```csharp
public System.Collections.IEnumerator ConnectList { get; }
```

Gets a list of `EndpointPermission` instances that identifies the endpoints that can be connected to under this permission instance.

Returns: An instance that implements the `IEnumerator` interface that contains `EndpointPermission` instances.

To be added.

## SocketPermission.AddPermission(NetworkAccess, TransportType, String, Int32) method

```csharp
public void AddPermission (System.Net.NetworkAccess access, System.Net.TransportType transport, string hostName, int portNumber);
```

Adds a permission to the set of permissions for a transport address.

Parameters:

- `access`: One of the `NetworkAccess` values.
- `transport`: One of the `TransportType` values.
- `hostName`: The host name for the transport address.
- `portNumber`: The port number for the transport address.

Exceptions:

- `ArgumentNullException`: `hostName` is `null`.

To be added.

## SocketPermission.Copy() method

```csharp
public override System.Security.IPermission Copy ();
```

Creates a copy of a `SocketPermission` instance.

Returns: A new instance of the `SocketPermission` class that is a copy of the current instance.

To be added.

## SocketPermission.FromXml(SecurityElement) method

```csharp
public override void FromXml (System.Security.SecurityElement securityElement);
```

Reconstructs a `SocketPermission` instance for an XML encoding.

Parameters:

- `securityElement`: The XML encoding used to reconstruct the `SocketPermission` instance.

Exceptions:

- `ArgumentNullException`: The `securityElement` is `null`.
- `ArgumentException`: The `securityElement` is not a permission element for this type.

To be added.

## SocketPermission.Intersect(IPermission) method

```csharp
public override System.Security.IPermission Intersect (System.Security.IPermission target);
```

Returns the logical intersection between two `SocketPermission` instances.

Parameters:

- `target`: The `SocketPermission` instance to intersect with the current instance.

Returns: The `SocketPermission` instance that represents the intersection of two `SocketPermission` instances. If the intersection is empty, the method returns `null`. If the `target` parameter is a null reference, the method returns `null`.

Exceptions:

- `ArgumentException`: The `target` parameter is not a `SocketPermission`.
- `SecurityException`: `DnsPermission` is not granted to the method caller.

To be added.

## SocketPermission.IsSubsetOf(IPermission) method

```csharp
public override bool IsSubsetOf (System.Security.IPermission target);
```

Determines if the current permission is a subset of the specified permission.

Parameters:

- `target`: A `SocketPermission` that is to be tested for the subset relationship.

Returns: If `target` is `null`, this method returns `true` if the current instance defines no permissions; otherwise, `false`. If `target` is not `null`, this method returns `true` if the current instance defines a subset of `target` permissions; otherwise, `false`.

Exceptions:

- `ArgumentException`: `target` is not a `SocketException`.
- `SecurityException`: `DnsPermission` is not granted to the method caller.

To be added.

## SocketPermission.IsUnrestricted() method

```csharp
public bool IsUnrestricted ();
```

Checks the overall permission state of the object.

Returns: `true` if the `SocketPermission` instance is created with the `Unrestricted` value from `PermissionState`; otherwise, `false`.

To be added.

## SocketPermission.ToXml() method

```csharp
public override System.Security.SecurityElement ToXml ();
```

Creates an XML encoding of a `SocketPermission` instance and its current state.

Returns: A `SecurityElement` instance that contains an XML-encoded representation of the `SocketPermission` instance, including state information.

To be added.

## SocketPermission.Union(IPermission) method

```csharp
public override System.Security.IPermission Union (System.Security.IPermission target);
```

Returns the logical union between two `SocketPermission` instances.

Parameters:

- `target`: The `SocketPermission` instance to combine with the current instance.

Returns: The `SocketPermission` instance that represents the union of two `SocketPermission` instances. If `target` parameter is `null`, it returns a copy of the current instance.

Exceptions:

- `ArgumentException`: `target` is not a `SocketPermission`.

To be added.

## SocketPermission.AllPorts field

```csharp
public const int AllPorts = -1;
```

Defines a constant that represents all ports.

To be added.
