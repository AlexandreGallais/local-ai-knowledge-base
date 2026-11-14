---
title: "EndPoint class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/EndPoint.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EndPoint class

Namespace: `System.Net`

```csharp
public abstract class EndPoint
```

Identifies a network address. This is an `abstract` class.

#### Remarks
The `EndPoint` class provides an `abstract` base class that represents a network resource or service. Descendant classes combine network connection information to form a connection point to a service.

## EndPoint.EndPoint() constructor

```csharp
protected EndPoint ();
```

Initializes a new instance of the `EndPoint` class.

To be added.

## EndPoint.AddressFamily property

```csharp
public virtual System.Net.Sockets.AddressFamily AddressFamily { get; }
```

Gets the address family to which the endpoint belongs.

Returns: One of the `AddressFamily` values.

Exceptions:

- `NotImplementedException`: Any attempt is made to get or set the property when the property is not overridden in a descendant class.

#### Remarks
The `AddressFamily` property specifies the addressing scheme that is used by the endpoint's underlying network protocol.

## EndPoint.Create(SocketAddress) method

```csharp
public virtual System.Net.EndPoint Create (System.Net.SocketAddress socketAddress);
```

Creates an `EndPoint` instance from a `SocketAddress` instance.

Parameters:

- `socketAddress`: The socket address that serves as the endpoint for a connection.

Returns: A new `EndPoint` instance that is initialized from the specified `SocketAddress` instance.

Exceptions:

- `NotImplementedException`: Any attempt is made to access the method when the method is not overridden in a descendant class.

To be added.

## EndPoint.Serialize() method

```csharp
public virtual System.Net.SocketAddress Serialize ();
```

Serializes endpoint information into a `SocketAddress` instance.

Returns: A `SocketAddress` instance that contains the endpoint information.

Exceptions:

- `NotImplementedException`: Any attempt is made to access the method when the method is not overridden in a descendant class.

To be added.
