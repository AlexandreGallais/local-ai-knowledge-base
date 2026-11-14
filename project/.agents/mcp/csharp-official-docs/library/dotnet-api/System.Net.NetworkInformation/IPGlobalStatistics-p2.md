---
title: "IPGlobalStatistics class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/IPGlobalStatistics.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPGlobalStatistics class (part 2 of 2)

## IPGlobalStatistics.ReceivedPacketsWithAddressErrors property

```csharp
public abstract long ReceivedPacketsWithAddressErrors { get; }
```

Gets the number of Internet Protocol (IP) packets with address errors that were received.

Returns: An `Int64` value that specifies the total number of IP packets received with errors in the address portion of the header.

#### Remarks
The value returned by this property includes packets discarded for address related issues in the header fields, such as invalid addresses. If packet forwarding is not enabled, the value returned by this property includes packets that were discarded because the destination address was not a local address.

#### Examples
The following code example displays statistics for received IP packets with errors.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPGlobalStatistics.ReceivedPacketsWithHeadersErrors property

```csharp
public abstract long ReceivedPacketsWithHeadersErrors { get; }
```

Gets the number of Internet Protocol (IP) packets with header errors that were received.

Returns: An `Int64` value that specifies the total number of IP packets received and discarded due to errors in the header.

#### Remarks
The value returned by this property includes packets discarded for non-address related issues in the header fields, such as bad checksums, time-to-live value exceeded, and incorrect IP options.

#### Examples
The following code example displays statistics for received IP packets with errors.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPGlobalStatistics.ReceivedPacketsWithUnknownProtocol property

```csharp
public abstract long ReceivedPacketsWithUnknownProtocol { get; }
```

Gets the number of Internet Protocol (IP) packets received on the local machine with an unknown protocol in the header.

Returns: An `Int64` value that indicates the total number of IP packets received with an unknown protocol.

#### Remarks
The protocol field in the IP header indicates the next-level protocol used in the data portion of the IP datagram. If the protocol is not recognized, the data cannot be passed to the correct application.

#### Examples
The following code example displays statistics for received IP packets with errors.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._
