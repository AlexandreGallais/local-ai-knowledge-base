---
title: "DnsEndPoint class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/DnsEndPoint.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DnsEndPoint class

Namespace: `System.Net`

```csharp
public class DnsEndPoint : System.Net.EndPoint
```

Represents a network endpoint as a host name or a string representation of an IP address and a port number.

#### Remarks
The `DnsEndPoint` class contains a host name or an IP address and remote port information needed by an application to connect to a service on a host. By combining the host name or IP address and port number of a service, the `DnsEndPoint` class forms a connection point to a service.

## DnsEndPoint.DnsEndPoint(String, Int32) constructor

```csharp
public DnsEndPoint (string host, int port);
```

Initializes a new instance of the `DnsEndPoint` class with the host name or string representation of an IP address and a port number.

Parameters:

- `host`: The host name or a string representation of the IP address.
- `port`: The port number associated with the address, or 0 to specify any available port. `port` is in host order.

Exceptions:

- `ArgumentException`: The `host` parameter contains an empty string.
- `ArgumentNullException`: The `host` parameter is a `null`.
- `ArgumentOutOfRangeException`: `port` is less than `IPEndPoint.MinPort`.

-or-

`port` is greater than `IPEndPoint.MaxPort`.

#### Remarks
The `%23ctor` constructor can be used to initialize a `DnsEndPoint` class using either a host name or a string that represents an IP address and a port. This constructor sets the `AddressFamily` property to `Unknown`.

When using this constructor with a host name rather than a string representation of an IP address, the address family of the `DnsEndPoint` will remain `Unknown` even after use. The `AddressFamily` property of any `Socket` that is created by calls to the `Socket.ConnectAsync` method will be the address family of the first address to which a connection can be successfully established (not necessarily the first address to be resolved).

## DnsEndPoint.DnsEndPoint(String, Int32, AddressFamily) constructor

```csharp
public DnsEndPoint (string host, int port, System.Net.Sockets.AddressFamily addressFamily);
```

Initializes a new instance of the `DnsEndPoint` class with the host name or string representation of an IP address, a port number, and an address family.

Parameters:

- `host`: The host name or a string representation of the IP address.
- `port`: The port number associated with the address, or 0 to specify any available port. `port` is in host order.
- `addressFamily`: One of the `AddressFamily` values.

Exceptions:

- `ArgumentException`: The `host` parameter contains an empty string.

-or-

`addressFamily` is `AddressFamily.Unknown`.
- `ArgumentNullException`: The `host` parameter is a `null`.
- `ArgumentOutOfRangeException`: `port` is less than `IPEndPoint.MinPort`.

-or-

`port` is greater than `IPEndPoint.MaxPort`.

#### Remarks
The `%23ctor` constructor can be used to initialize a `DnsEndPoint` class using either a host name or a string that represents an IP address, a port, and an address family.

When using the constructor with a host name rather than a string representation of an IP address, the address family restricts DNS resolution to prefer addresses of the specified address family value. When using the constructor with the address family specified as `Unknown`, the address family of the `DnsEndPoint` will remain `Unknown` even after use. The `AddressFamily` property of any `Socket` that is created by calls to the `Socket.ConnectAsync` method will be the address family of the first address to which a connection can be successfully established (not necessarily the first address to be resolved).

## DnsEndPoint.AddressFamily property

```csharp
public override System.Net.Sockets.AddressFamily AddressFamily { get; }
```

Gets the Internet Protocol (IP) address family.

Returns: One of the `AddressFamily` values.

#### Remarks
The `AddressFamily` property indicates the address family for an instance of the `DnsEndPoint` class.

## DnsEndPoint.Host property

```csharp
public string Host { get; }
```

Gets the host name or string representation of the Internet Protocol (IP) address of the host.

Returns: A host name or string representation of an IP address.

#### Remarks
The `Host` property indicates the host name or string representation of the IP address for an instance of the `DnsEndPoint` class.

## DnsEndPoint.Port property

```csharp
public int Port { get; }
```

Gets the port number of the `DnsEndPoint`.

Returns: An integer value in the range 0 to 0xffff indicating the port number of the `DnsEndPoint`.

To be added.

## DnsEndPoint.Equals(Object) method

```csharp
public override bool Equals (object? comparand);
```

Compares two `DnsEndPoint` objects.

Parameters:

- `comparand`: A `DnsEndPoint` instance to compare to the current instance.

Returns: `true` if the two `DnsEndPoint` instances are equal; otherwise, `false`.

#### Remarks
The `DnsEndPoint.Equals` method compares the current `DnsEndPoint` instance with the `comparand` parameter and returns `true` if the two instances contain the same endpoint.

## DnsEndPoint.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns a hash value for a `DnsEndPoint`.

Returns: An integer hash value for the `DnsEndPoint`.

#### Remarks
The `DnsEndPoint.GetHashCode` method returns a hash code of the `DnsEndPoint`. This value can be used as a key in hash tables.

## DnsEndPoint.ToString() method

```csharp
public override string ToString ();
```

Returns the host name or string representation of the IP address and port number of the `DnsEndPoint`.

Returns: A string containing the address family, host name or IP address string, and the port number of the specified `DnsEndPoint`.

#### Remarks
The `DnsEndPoint.ToString` method returns a string that contains the address family, the host name or IP address string, and the port number.
