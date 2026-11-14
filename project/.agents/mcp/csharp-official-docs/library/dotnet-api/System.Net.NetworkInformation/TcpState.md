---
title: "TcpState enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/TcpState.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TcpState enum

Namespace: `System.Net.NetworkInformation`

```csharp
public enum TcpState
```

Specifies the states of a Transmission Control Protocol (TCP) connection.

#### Remarks
This enumeration defines valid values for the `State` property. TCP is a transport layer protocol responsible for reliably sending and receiving data packets. The TCP states in this enumeration are defined in IETF RFC 793 available at https://www.ietf.org.

#### Examples
The following code example counts the established TCP connections.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## TcpState.Closed field

```csharp
Closed
```

The TCP connection is closed.

## TcpState.CloseWait field

```csharp
CloseWait
```

The local endpoint of the TCP connection is waiting for a connection termination request from the local user.

## TcpState.Closing field

```csharp
Closing
```

The local endpoint of the TCP connection is waiting for an acknowledgement of the connection termination request sent previously.

## TcpState.DeleteTcb field

```csharp
DeleteTcb
```

The transmission control buffer (TCB) for the TCP connection is being deleted.

## TcpState.Established field

```csharp
Established
```

The TCP handshake is complete. The connection has been established and data can be sent.

## TcpState.FinWait1 field

```csharp
FinWait1
```

The local endpoint of the TCP connection is waiting for a connection termination request from the remote endpoint or for an acknowledgement of the connection termination request sent previously.

## TcpState.FinWait2 field

```csharp
FinWait2
```

The local endpoint of the TCP connection is waiting for a connection termination request from the remote endpoint.

## TcpState.LastAck field

```csharp
LastAck
```

The local endpoint of the TCP connection is waiting for the final acknowledgement of the connection termination request sent previously.

## TcpState.Listen field

```csharp
Listen
```

The local endpoint of the TCP connection is listening for a connection request from any remote endpoint.

## TcpState.SynReceived field

```csharp
SynReceived
```

The local endpoint of the TCP connection has sent and received a connection request and is waiting for an acknowledgment.

## TcpState.SynSent field

```csharp
SynSent
```

The local endpoint of the TCP connection has sent the remote endpoint a segment header with the synchronize (SYN) control bit set and is waiting for a matching connection request.

## TcpState.TimeWait field

```csharp
TimeWait
```

The local endpoint of the TCP connection is waiting for enough time to pass to ensure that the remote endpoint received the acknowledgement of its connection termination request.

## TcpState.Unknown field

```csharp
Unknown
```

The TCP connection state is unknown.
