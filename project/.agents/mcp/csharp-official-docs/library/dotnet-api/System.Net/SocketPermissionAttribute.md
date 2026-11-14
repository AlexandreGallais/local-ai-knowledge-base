---
title: "SocketPermissionAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/SocketPermissionAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SocketPermissionAttribute class

Namespace: `System.Net`

```csharp
public sealed class SocketPermissionAttribute : System.Security.Permissions.CodeAccessSecurityAttribute
```

Specifies security actions to control `Socket` connections. This class cannot be inherited.

#### Remarks

## SocketPermissionAttribute.SocketPermissionAttribute(SecurityAction) constructor

```csharp
public SocketPermissionAttribute (System.Security.Permissions.SecurityAction action);
```

Initializes a new instance of the `SocketPermissionAttribute` class with the specified `SecurityAction` value.

Parameters:

- `action`: One of the `SecurityAction` values.

Exceptions:

- `ArgumentException`: `action` is not a valid `SecurityAction` value.

To be added.

## SocketPermissionAttribute.Access property

```csharp
public string Access { get; set; }
```

Gets or sets the network access method that is allowed by this `SocketPermissionAttribute`.

Returns: A string that contains the network access method that is allowed by this instance of `SocketPermissionAttribute`. Valid values are "Accept" and "Connect."

Exceptions:

- `ArgumentException`: The `SocketPermissionAttribute.Access` property is not `null` when you attempt to set the value. To specify more than one Access method, use an additional attribute declaration statement.

To be added.

## SocketPermissionAttribute.Host property

```csharp
public string Host { get; set; }
```

Gets or sets the DNS host name or IP address that is specified by this `SocketPermissionAttribute`.

Returns: A string that contains the DNS host name or IP address that is associated with this instance of `SocketPermissionAttribute`.

Exceptions:

- `ArgumentException`: `SocketPermissionAttribute.Host` is not `null` when you attempt to set the value. To specify more than one host, use an additional attribute declaration statement.

To be added.

## SocketPermissionAttribute.Port property

```csharp
public string Port { get; set; }
```

Gets or sets the port number that is associated with this `SocketPermissionAttribute`.

Returns: A string that contains the port number that is associated with this instance of `SocketPermissionAttribute`.

Exceptions:

- `ArgumentException`: The `SocketPermissionAttribute.Port` property is `null` when you attempt to set the value. To specify more than one port, use an additional attribute declaration statement.

To be added.

## SocketPermissionAttribute.Transport property

```csharp
public string Transport { get; set; }
```

Gets or sets the `TransportType` that is specified by this `SocketPermissionAttribute`.

Returns: A string that contains the `TransportType` that is associated with this `SocketPermissionAttribute`.

Exceptions:

- `ArgumentException`: `SocketPermissionAttribute.Transport` is not `null` when you attempt to set the value. To specify more than one transport type, use an additional attribute declaration statement.

To be added.

## SocketPermissionAttribute.CreatePermission() method

```csharp
public override System.Security.IPermission CreatePermission ();
```

Creates and returns a new instance of the `SocketPermission` class.

Returns: An instance of the `SocketPermission` class that corresponds to the security declaration.

Exceptions:

- `ArgumentException`: One or more of the current instance's `SocketPermissionAttribute.Access`, `SocketPermissionAttribute.Host`, `SocketPermissionAttribute.Transport`, or `SocketPermissionAttribute.Port` properties is `null`.

To be added.
