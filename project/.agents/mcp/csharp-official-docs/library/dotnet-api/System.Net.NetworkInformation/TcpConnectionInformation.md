---
title: "TcpConnectionInformation class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/TcpConnectionInformation.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TcpConnectionInformation class

Namespace: `System.Net.NetworkInformation`

```csharp
public abstract class TcpConnectionInformation
```

Provides information about the Transmission Control Protocol (TCP) connections on the local computer.

#### Remarks
TCP is a connection-oriented reliable protocol for transporting data between networked computers. It is defined in IETF RFC 793.

#### Examples
The following example displays endpoint information for active TCP connections.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## TcpConnectionInformation.TcpConnectionInformation() constructor

```csharp
protected TcpConnectionInformation ();
```

Initializes a new instance of the `TcpConnectionInformation` class.

#### Remarks
This constructor can be called only by classes that derive from the `TcpConnectionInformation` class.

## TcpConnectionInformation.LocalEndPoint property

```csharp
public abstract System.Net.IPEndPoint LocalEndPoint { get; }
```

Gets the local endpoint of a Transmission Control Protocol (TCP) connection.

Returns: An `IPEndPoint` instance that contains the IP address and port on the local computer.

#### Examples
The following example displays endpoint information for active TCP connections.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## TcpConnectionInformation.RemoteEndPoint property

```csharp
public abstract System.Net.IPEndPoint RemoteEndPoint { get; }
```

Gets the remote endpoint of a Transmission Control Protocol (TCP) connection.

Returns: An `IPEndPoint` instance that contains the IP address and port on the remote computer.

#### Remarks
If the `TcpConnectionInformation.State` of this connection is `Listen`, the remote endpoint is not established, and has all zeros for its IP address.

## TcpConnectionInformation.State property

```csharp
public abstract System.Net.NetworkInformation.TcpState State { get; }
```

Gets the state of this Transmission Control Protocol (TCP) connection.

Returns: One of the `TcpState` enumeration values.

#### Remarks
The states for TCP connections are described in the `TcpState` enumeration documentation.
