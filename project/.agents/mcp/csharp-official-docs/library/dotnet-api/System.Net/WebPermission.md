---
title: "WebPermission class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/WebPermission.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebPermission class

Namespace: `System.Net`

```csharp
public sealed class WebPermission : System.Security.CodeAccessPermission, System.Security.Permissions.IUnrestrictedPermission
```

Controls rights to access HTTP Internet resources.

#### Remarks

## WebPermission.WebPermission() constructor

```csharp
public WebPermission ();
```

Creates a new instance of the `WebPermission` class.

To be added.

## WebPermission.WebPermission(PermissionState) constructor

```csharp
public WebPermission (System.Security.Permissions.PermissionState state);
```

Creates a new instance of the `WebPermission` class that passes all demands or fails all demands.

Parameters:

- `state`: A `PermissionState` value.

To be added.

## WebPermission.WebPermission(NetworkAccess, String) constructor

```csharp
public WebPermission (System.Net.NetworkAccess access, string uriString);
```

Initializes a new instance of the `WebPermission` class with the specified access rights for the specified URI.

Parameters:

- `access`: A NetworkAccess value that indicates what kind of access to grant to the specified URI. `NetworkAccess.Accept` indicates that the application is allowed to accept connections from the Internet on a local resource. `NetworkAccess.Connect` indicates that the application is allowed to connect to specific Internet resources.
- `uriString`: A URI string to which access rights are granted.

Exceptions:

- `ArgumentNullException`: `uriString` is `null`.

To be added.

## WebPermission.WebPermission(NetworkAccess, Regex) constructor

```csharp
public WebPermission (System.Net.NetworkAccess access, System.Text.RegularExpressions.Regex uriRegex);
```

Initializes a new instance of the `WebPermission` class with the specified access rights for the specified URI regular expression.

Parameters:

- `access`: A `NetworkAccess` value that indicates what kind of access to grant to the specified URI. `NetworkAccess.Accept` indicates that the application is allowed to accept connections from the Internet on a local resource. `NetworkAccess.Connect` indicates that the application is allowed to connect to specific Internet resources.
- `uriRegex`: A regular expression that describes the URI to which access is to be granted.

To be added.

## WebPermission.AcceptList property

```csharp
public System.Collections.IEnumerator AcceptList { get; }
```

This property returns an enumeration of a single accept permissions held by this `WebPermission`. The possible objects types contained in the returned enumeration are `String` and `Regex`.

Returns: The `IEnumerator` interface that contains accept permissions.

To be added.

## WebPermission.ConnectList property

```csharp
public System.Collections.IEnumerator ConnectList { get; }
```

This property returns an enumeration of a single connect permissions held by this `WebPermission`. The possible objects types contained in the returned enumeration are `String` and `Regex`.

Returns: The `IEnumerator` interface that contains connect permissions.

To be added.

## WebPermission.AddPermission(NetworkAccess, String) method

```csharp
public void AddPermission (System.Net.NetworkAccess access, string uriString);
```

Adds the specified URI string with the specified access rights to the current `WebPermission`.

Parameters:

- `access`: A `NetworkAccess` that specifies the access rights that are granted to the URI.
- `uriString`: A string that describes the URI to which access rights are granted.

Exceptions:

- `ArgumentNullException`: `uriString` is `null`.

To be added.

## WebPermission.AddPermission(NetworkAccess, Regex) method

```csharp
public void AddPermission (System.Net.NetworkAccess access, System.Text.RegularExpressions.Regex uriRegex);
```

Adds the specified URI with the specified access rights to the current `WebPermission`.

Parameters:

- `access`: A NetworkAccess that specifies the access rights that are granted to the URI.
- `uriRegex`: A regular expression that describes the set of URIs to which access rights are granted.

Exceptions:

- `ArgumentNullException`: The `uriRegex` parameter is `null`.

To be added.

## WebPermission.Copy() method

```csharp
public override System.Security.IPermission Copy ();
```

Creates a copy of a `WebPermission`.

Returns: A new instance of the `WebPermission` class that has the same values as the original.

To be added.

## WebPermission.FromXml(SecurityElement) method

```csharp
public override void FromXml (System.Security.SecurityElement securityElement);
```

Reconstructs a `WebPermission` from an XML encoding.

Parameters:

- `securityElement`: The XML encoding from which to reconstruct the `WebPermission`.

Exceptions:

- `ArgumentNullException`: The `securityElement` parameter is `null`.
- `ArgumentException`: `securityElement` is not a permission element for this type.

To be added.

## WebPermission.Intersect(IPermission) method

```csharp
public override System.Security.IPermission Intersect (System.Security.IPermission target);
```

Returns the logical intersection of two `WebPermission` instances.

Parameters:

- `target`: The `WebPermission` to compare with the current instance.

Returns: A new `WebPermission` that represents the intersection of the current instance and the `target` parameter. If the intersection is empty, the method returns `null`.

Exceptions:

- `ArgumentException`: `target` is not `null` or of type `WebPermission`

To be added.

## WebPermission.IsSubsetOf(IPermission) method

```csharp
public override bool IsSubsetOf (System.Security.IPermission target);
```

Determines whether the current `WebPermission` is a subset of the specified object.

Parameters:

- `target`: The `WebPermission` to compare to the current `WebPermission`.

Returns: `true` if the current instance is a subset of the `target` parameter; otherwise, `false`. If the target is `null`, the method returns `true` for an empty current permission that is not unrestricted and `false` otherwise.

Exceptions:

- `ArgumentException`: The target parameter is not an instance of `WebPermission`.
- `NotSupportedException`: The current instance contains a Regex-encoded right and there is not exactly the same right found in the target instance.

To be added.

## WebPermission.IsUnrestricted() method

```csharp
public bool IsUnrestricted ();
```

Checks the overall permission state of the `WebPermission`.

Returns: `true` if the `WebPermission` was created with the `PermissionState.Unrestricted``PermissionState`; otherwise, `false`.

To be added.

## WebPermission.ToXml() method

```csharp
public override System.Security.SecurityElement ToXml ();
```

Creates an XML encoding of a `WebPermission` and its current state.

Returns: A `SecurityElement` that contains an XML-encoded representation of the `WebPermission`, including state information.

To be added.

## WebPermission.Union(IPermission) method

```csharp
public override System.Security.IPermission Union (System.Security.IPermission target);
```

Returns the logical union between two instances of the `WebPermission` class.

Parameters:

- `target`: The `WebPermission` to combine with the current `WebPermission`.

Returns: A `WebPermission` that represents the union of the current instance and the `target` parameter. If either `WebPermission` is `PermissionState.Unrestricted`, the method returns a `WebPermission` that is `PermissionState.Unrestricted`. If the target is `null`, the method returns a copy of the current `WebPermission`.

Exceptions:

- `ArgumentException`: target is not `null` or of type `WebPermission`.

To be added.
