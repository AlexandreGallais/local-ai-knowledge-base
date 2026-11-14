---
title: "TcpStatistics class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/TcpStatistics.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TcpStatistics class

Namespace: `System.Net.NetworkInformation`

```csharp
public abstract class TcpStatistics
```

Provides Transmission Control Protocol (TCP) statistical data.

#### Remarks
Instances of this class are returned by the `IPGlobalProperties.GetTcpIPv4Statistics` and `IPGlobalProperties.GetTcpIPv6Statistics` methods, to give applications access to TCP traffic information.

The information in this class correlates to the management information objects described in https://www.ietf.org/rfc/rfc2012.txt.

#### Examples
The following code example displays the TCP statistics for the specified address family.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## TcpStatistics.TcpStatistics() constructor

```csharp
protected TcpStatistics ();
```

Initializes a new instance of the `TcpStatistics` class.

#### Remarks
This constructor can be called only by classes that derive from the `TcpStatistics` class.

## TcpStatistics.ConnectionsAccepted property

```csharp
public abstract long ConnectionsAccepted { get; }
```

Gets the number of accepted Transmission Control Protocol (TCP) connection requests.

Returns: An `Int64` value that specifies the total number of TCP connection requests accepted.

#### Remarks
IETF RFC 2012 formally defines this value as, "The number of times TCP connections have made a direct transition to the SYN-RCVD state from the LISTEN state."

#### Examples
The following code example displays connection information.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## TcpStatistics.ConnectionsInitiated property

```csharp
public abstract long ConnectionsInitiated { get; }
```

Gets the number of Transmission Control Protocol (TCP) connection requests made by clients.

Returns: An `Int64` value that specifies the total number of TCP connections initiated by clients.

#### Remarks
IETF RFC 2012 formally defines this value as, "The number of times TCP connections have made a direct transition to the SYN-SENT state from the CLOSED state."

#### Examples
The following code example displays connection information.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## TcpStatistics.CumulativeConnections property

```csharp
public abstract long CumulativeConnections { get; }
```

Specifies the total number of Transmission Control Protocol (TCP) connections established.

Returns: An `Int64` value that specifies the total number of connections established.

#### Examples
The following code example displays connection information.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## TcpStatistics.CurrentConnections property

```csharp
public abstract long CurrentConnections { get; }
```

Gets the number of current Transmission Control Protocol (TCP) connections.

Returns: An `Int64` value that specifies the total number of current TCP connections.

#### Remarks
IETF RFC 2012 formally defines this value as, "The number of TCP connections for which the current state is either ESTABLISHED or CLOSE-WAIT."

#### Examples
The following code example displays connection information.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## TcpStatistics.ErrorsReceived property

```csharp
public abstract long ErrorsReceived { get; }
```

Gets the number of Transmission Control Protocol (TCP) errors received.

Returns: An `Int64` value that specifies the total number of TCP errors received.

#### Examples
The following code example displays connection information.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## TcpStatistics.FailedConnectionAttempts property

```csharp
public abstract long FailedConnectionAttempts { get; }
```

Gets the number of failed Transmission Control Protocol (TCP) connection attempts.

Returns: An `Int64` value that specifies the total number of failed TCP connection attempts.

#### Remarks
IETF RFC 2012 formally defines this value as, "The number of times TCP connections have made a direct transition to the CLOSED state from either the SYN-SENT state or the SYN-RCVD state, plus the number of times TCP connections have made a direct transition to the LISTEN state from the SYN-RCVD state."

#### Examples
The following code example displays connection information.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## TcpStatistics.MaximumConnections property

```csharp
public abstract long MaximumConnections { get; }
```

Gets the maximum number of supported Transmission Control Protocol (TCP) connections.

Returns: An `Int64` value that specifies the total number of TCP connections that can be supported.

#### Remarks
If the maximum number of connections is dynamic, this property returns -1.

#### Examples
The following code example displays time-out and maximum connection information.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## TcpStatistics.MaximumTransmissionTimeout property

```csharp
public abstract long MaximumTransmissionTimeout { get; }
```

Gets the maximum retransmission time-out value for Transmission Control Protocol (TCP) segments.

Returns: An `Int64` value that specifies the maximum number of milliseconds permitted by a TCP implementation for the retransmission time-out value.

#### Remarks
TCP starts a retransmission timer when each outbound segment is passed to the network layer (IP). If no acknowledgement is received for the data in the segment before the timer expires, the segment is retransmitted. The timer can be set to any value between the `TcpStatistics.MinimumTransmissionTimeout` value and the `TcpStatistics.MaximumTransmissionTimeout` value.

#### Examples
The following code example displays time-out and maximum connection information.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## TcpStatistics.MinimumTransmissionTimeout property

```csharp
public abstract long MinimumTransmissionTimeout { get; }
```

Gets the minimum retransmission time-out value for Transmission Control Protocol (TCP) segments.

Returns: An `Int64` value that specifies the minimum number of milliseconds permitted by a TCP implementation for the retransmission time-out value.

#### Remarks
TCP starts a retransmission timer when each outbound segment is passed to the network layer (IP). If no acknowledgement is received for the data in the segment before the timer expires, the segment is retransmitted. The timer The timer can be set to any value between the `TcpStatistics.MinimumTransmissionTimeout` value and the `TcpStatistics.MaximumTransmissionTimeout` value.

#### Examples
The following code example displays time-out and maximum connection information.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## TcpStatistics.ResetConnections property

```csharp
public abstract long ResetConnections { get; }
```

Gets the number of RST packets received by Transmission Control Protocol (TCP) connections.

Returns: An `Int64` value that specifies the total number of reset TCP connections.

#### Remarks
IETF RFC 2012 formally defines this value as, "The number of times TCP connections have made a direct transition to the CLOSED state from either the ESTABLISHED state or the CLOSE-WAIT state."

#### Examples
The following code example displays connection information.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## TcpStatistics.ResetsSent property

```csharp
public abstract long ResetsSent { get; }
```

Gets the number of Transmission Control Protocol (TCP) segments sent with the reset flag set.

Returns: An `Int64` value that specifies the total number of TCP segments sent with the reset flag set.

#### Remarks
TCP resets are specified using the reset (RST) control bit in the TCP header.

#### Examples
The following code example displays segment information.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## TcpStatistics.SegmentsReceived property

```csharp
public abstract long SegmentsReceived { get; }
```

Gets the number of Transmission Control Protocol (TCP) segments received.

Returns: An `Int64` value that specifies the total number of TCP segments received.

#### Remarks
This data includes segments with errors and segments received on currently established connections.

#### Examples
The following code example displays segment information.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## TcpStatistics.SegmentsResent property

```csharp
public abstract long SegmentsResent { get; }
```

Gets the number of Transmission Control Protocol (TCP) segments re-sent.

Returns: An `Int64` value that specifies the total number of TCP segments retransmitted.

#### Remarks
TCP segments that are not acknowledged as being received at the destination are retransmitted.

#### Examples
The following code example displays segment information.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## TcpStatistics.SegmentsSent property

```csharp
public abstract long SegmentsSent { get; }
```

Gets the number of Transmission Control Protocol (TCP) segments sent.

Returns: An `Int64` value that specifies the total number of TCP segments sent.

#### Remarks
This data includes segments sent for currently established connections but does not include segments containing only retransmitted octets.

#### Examples
The following code example displays segment information.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._
