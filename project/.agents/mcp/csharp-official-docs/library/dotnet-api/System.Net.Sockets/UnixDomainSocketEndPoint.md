---
title: "UnixDomainSocketEndPoint class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/UnixDomainSocketEndPoint.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnixDomainSocketEndPoint class

Namespace: `System.Net.Sockets`

```csharp
public sealed class UnixDomainSocketEndPoint : System.Net.EndPoint
```

Represents a Unix Domain Socket endpoint as a path.

To be added.

## UnixDomainSocketEndPoint.UnixDomainSocketEndPoint(String) constructor

```csharp
public UnixDomainSocketEndPoint (string path);
```

Initializes a new instance of the `UnixDomainSocketEndPoint` with the file path to connect a unix domain socket over.

Parameters:

- `path`: The path to connect a unix domain socket over.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `ArgumentOutOfRangeException`: `path` is of an invalid length for use with domain sockets on this platform. The length must be between 1 and the allowed native path length.
- `PlatformNotSupportedException`: The current OS does not support Unix Domain Sockets.

To be added.

## UnixDomainSocketEndPoint.AddressFamily property

```csharp
public override System.Net.Sockets.AddressFamily AddressFamily { get; }
```

Gets the address family to which the endpoint belongs.

Returns: One of the `UnixDomainSocketEndPoint.AddressFamily` values.

To be added.

## UnixDomainSocketEndPoint.Create(SocketAddress) method

```csharp
public override System.Net.EndPoint Create (System.Net.SocketAddress socketAddress);
```

Creates an `EndPoint` instance from a `SocketAddress` instance.

Parameters:

- `socketAddress`: The socket address that serves as the endpoint for a connection.

Returns: A new `EndPoint` instance that is initialized from the specified `SocketAddress` instance.

To be added.

## UnixDomainSocketEndPoint.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified object is equal to the current `UnixDomainSocketEndPoint`.

Parameters:

- `obj`: The object to compare with the current `UnixDomainSocketEndPoint`.

Returns: `true` if the specified object is equal to the current `UnixDomainSocketEndPoint`; otherwise, `false`.

To be added.

## UnixDomainSocketEndPoint.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns a hash value for a `UnixDomainSocketEndPoint` instance.

Returns: An integer hash value.

To be added.

## UnixDomainSocketEndPoint.Serialize() method

```csharp
public override System.Net.SocketAddress Serialize ();
```

Serializes endpoint information into a `SocketAddress` instance.

Returns: A `SocketAddress` instance that contains the endpoint information.

To be added.

## UnixDomainSocketEndPoint.ToString() method

```csharp
public override string ToString ();
```

Gets the path represented by this `UnixDomainSocketEndPoint` instance.

Returns: The path represented by this `UnixDomainSocketEndPoint` instance.

To be added.
