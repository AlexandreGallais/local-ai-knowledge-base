---
title: "Ping class (part 2 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/Ping.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Ping class (part 2 of 7)

## Ping.Send(IPAddress, Int32) method

```csharp
public System.Net.NetworkInformation.PingReply Send (System.Net.IPAddress address, int timeout);
```

Attempts to send an Internet Control Message Protocol (ICMP) echo message with the specified data buffer to the computer that has the specified `IPAddress`, and receive a corresponding ICMP echo reply message from that computer. This method allows you to specify a time-out value for the operation.

Parameters:

- `address`: An `IPAddress` that identifies the computer that is the destination for the ICMP echo message.
- `timeout`: An `Int32` value that specifies the maximum number of milliseconds (after sending the echo message) to wait for the ICMP echo reply message.

Returns: A `PingReply` object that provides information about the ICMP echo reply message if one was received, or provides the reason for the failure if no message was received.

Exceptions:

- `ArgumentNullException`: `address` is `null`.
- `ArgumentOutOfRangeException`: `timeout` is less than zero.
- `InvalidOperationException`: A call to `SendAsync` is in progress.
- `PingException`: An exception was thrown while sending or receiving the ICMP messages. See the inner exception for the exact exception that was thrown.
- `ObjectDisposedException`: This object has been disposed.
- `PlatformNotSupportedException`: On Windows UWP: In all cases.

#### Remarks
If the ICMP echo reply message is not received within the time specified in the `timeout` parameter, the ICMP echo fails, and the `Status` property is set to `TimedOut`.

> **Note:**
>  When specifying very small numbers for `timeout`, the Ping reply can be received even if `timeout` milliseconds have elapsed.

This overload uses default settings for packet fragmentation and packet forwarding. The packet that contains the ICMP echo message can be fragmented in transit if the total packet size exceeds the maximum packet size that can be transmitted by one of the routing nodes between the local and remote computers. To prevent fragmentation, use one of the `Ping.Send` methods that takes an `options` parameter, and set the `DontFragment` property to `true`. When `PingOptions.DontFragment` is `true` and the total packet size exceeds the maximum packet size that can be transmitted by one of the routing nodes between the local and remote computers, the ICMP echo request fails. When this happens, the `PingReply.Status` is set to `PacketTooBig`.

The packet or packet fragments can be forwarded by routing nodes 128 times before being discarded. To change this setting, use a `Ping.Send` overload that takes an `options` parameter, and set the `Ttl` property to the desired value. If the packet does not reach its destination after being forwarded the specified number of times, the packet is discarded and the ICMP echo request fails. When this happens, the `PingReply.Status` is set to `TtlExpired`.

#### Examples
For an example that demonstrates calling a `Ping.Send` method, see the `Ping` class overview.

## Ping.Send(String, Int32) method

```csharp
public System.Net.NetworkInformation.PingReply Send (string hostNameOrAddress, int timeout);
```

Attempts to send an Internet Control Message Protocol (ICMP) echo message to the specified computer, and receive a corresponding ICMP echo reply message from that computer. This method allows you to specify a time-out value for the operation.

Parameters:

- `hostNameOrAddress`: A `String` that identifies the computer that is the destination for the ICMP echo message. The value specified for this parameter can be a host name or a string representation of an IP address.
- `timeout`: An `Int32` value that specifies the maximum number of milliseconds (after sending the echo message) to wait for the ICMP echo reply message.

Returns: A `PingReply` object that provides information about the ICMP echo reply message if one was received, or provides the reason for the failure if no message was received.

Exceptions:

- `ArgumentNullException`: `hostNameOrAddress` is `null` or is an empty string ("").
- `ArgumentOutOfRangeException`: `timeout` is less than zero.
- `InvalidOperationException`: A call to `SendAsync` is in progress.
- `PingException`: An exception was thrown while sending or receiving the ICMP messages. See the inner exception for the exact exception that was thrown.
- `ObjectDisposedException`: This object has been disposed.
- `PlatformNotSupportedException`: On Windows UWP: In all cases.

#### Remarks
If the ICMP echo reply message is not received within the time specified in the `timeout` parameter, the ICMP echo fails, and the `Status` property is set to `TimedOut`.

> **Note:**
>  When specifying very small numbers for `timeout`, the Ping reply can be received even if `timeout` milliseconds have elapsed.

This overload uses default settings for packet fragmentation and packet forwarding. The packet that contains the ICMP echo message can be fragmented in transit if the total packet size exceeds the maximum packet size that can be transmitted by one of the routing nodes between the local and remote computers. To prevent fragmentation, use one of the `Ping.Send` methods that takes an `options` parameter, and set the `DontFragment` property to `true`. When `PingOptions.DontFragment` is `true` and the total packet size exceeds the maximum packet size that can be transmitted by one of the routing nodes between the local and remote computers, the ICMP echo request fails. When this happens, the `PingReply.Status` is set to `PacketTooBig`. The packet or packet fragments (if fragmented) can be forwarded by routing nodes 128 times before being discarded. To change this setting, use a `Ping.Send` overload that takes an `options` parameter, and set the `Ttl` property to the desired value. If the packet does not reach its destination after being forwarded the specified number of times, the packet is discarded and the ICMP echo request fails. When this happens, the `PingReply.Status` is set to `TtlExpired`.

#### Examples
For an example that demonstrates calling a `Ping.Send` method, see the `Ping` class overview.

## Ping.Send(IPAddress, Int32, Byte[]) method

```csharp
public System.Net.NetworkInformation.PingReply Send (System.Net.IPAddress address, int timeout, byte[] buffer);
```

Attempts to send an Internet Control Message Protocol (ICMP) echo message with the specified data buffer to the computer that has the specified `IPAddress`, and receive a corresponding ICMP echo reply message from that computer. This overload allows you to specify a time-out value for the operation.

Parameters:

- `address`: An `IPAddress` that identifies the computer that is the destination for the ICMP echo message.
- `timeout`: An `Int32` value that specifies the maximum number of milliseconds (after sending the echo message) to wait for the ICMP echo reply message.
- `buffer`: A `Byte` array that contains data to be sent with the ICMP echo message and returned in the ICMP echo reply message. The array cannot contain more than 65,500 bytes.

Returns: A `PingReply` object that provides information about the ICMP echo reply message, if one was received, or provides the reason for the failure, if no message was received. The method will return `IPStatus.PacketTooBig` if the packet exceeds the Maximum Transmission Unit (MTU).

Exceptions:

- `ArgumentException`: The size of `buffer` exceeds 65500 bytes.
- `ArgumentNullException`: `address` or `buffer` is `null`.
- `ArgumentOutOfRangeException`: `timeout` is less than zero.
- `InvalidOperationException`: A call to `SendAsync` is in progress.
- `PingException`: An exception was thrown while sending or receiving the ICMP messages. See the inner exception for the exact exception that was thrown.
- `ObjectDisposedException`: This object has been disposed.
- `PlatformNotSupportedException`: On Linux: The process is non-privileged, and `buffer` is not empty. On Windows UWP: In all cases.

#### Remarks
If the ICMP echo reply message is not received within the time specified in the `timeout` parameter, the ICMP echo fails, and the `Status` property is set to `TimedOut`.

> **Note:**
>  When specifying very small numbers for `timeout`, the Ping reply can be received even if `timeout` milliseconds have elapsed.

This overload uses default settings for packet fragmentation and packet forwarding. The packet that contains the ICMP echo message can be fragmented in transit if the total packet size exceeds the maximum packet size that can be transmitted by one of the routing nodes between the local and remote computers. To prevent fragmentation, use one of the `Ping.Send` methods that takes an `options` parameter, and set the `DontFragment` property to `true`. When `PingOptions.DontFragment` is `true` and the total packet size exceeds the maximum packet size that can be transmitted by one of the routing nodes between the local and remote computers, the ICMP echo request fails. When this happens, the `PingReply.Status` is set to `PacketTooBig`.

The packet or packet fragments can be forwarded by routing nodes 128 times before being discarded. To change this setting, use a `Ping.Send` overload that takes an `options` parameter, and set the `Ttl` property to the desired value. If the packet does not reach its destination after being forwarded the specified number of times, the packet is discarded and the ICMP echo request fails. When this happens, the `PingReply.Status` is set to `TtlExpired`.

#### Examples
The following code example demonstrates how to call this method.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/Ping/Send/pingtest.cs._
## Ping.Send(String, Int32, Byte[]) method

```csharp
public System.Net.NetworkInformation.PingReply Send (string hostNameOrAddress, int timeout, byte[] buffer);
```

Attempts to send an Internet Control Message Protocol (ICMP) echo message with the specified data buffer to the specified computer, and receive a corresponding ICMP echo reply message from that computer. This overload allows you to specify a time-out value for the operation.

Parameters:

- `hostNameOrAddress`: A `String` that identifies the computer that is the destination for the ICMP echo message. The value specified for this parameter can be a host name or a string representation of an IP address.
- `timeout`: An `Int32` value that specifies the maximum number of milliseconds (after sending the echo message) to wait for the ICMP echo reply message.
- `buffer`: A `Byte` array that contains data to be sent with the ICMP echo message and returned in the ICMP echo reply message. The array cannot contain more than 65,500 bytes.

Returns: A `PingReply` object that provides information about the ICMP echo reply message if one was received, or provides the reason for the failure if no message was received.

Exceptions:

- `ArgumentException`: The size of `buffer` exceeds 65500 bytes.
- `ArgumentNullException`: `hostNameOrAddress` is `null` or is an empty string ("").

-or-

`buffer` is `null`.
- `ArgumentOutOfRangeException`: `timeout` is less than zero.
- `InvalidOperationException`: A call to `SendAsync` is in progress.
- `PingException`: An exception was thrown while sending or receiving the ICMP messages. See the inner exception for the exact exception that was thrown.
- `ObjectDisposedException`: This object has been disposed.
- `PlatformNotSupportedException`: On Linux: The process is non-privileged, and `buffer` is not empty. On Windows UWP: In all cases.

#### Remarks
If the ICMP echo reply message is not received within the time specified in the `timeout` parameter, the ICMP echo fails, and the `Status` property is set to `TimedOut`.

> **Note:**
>  When specifying very small numbers for `timeout`, the Ping reply can be received even if `timeout` milliseconds have elapsed.

This overload uses default settings for packet fragmentation and packet forwarding. The packet that contains the ICMP echo message can be fragmented in transit if the total packet size exceeds the maximum packet size that can be transmitted by one of the routing nodes between the local and remote computers. To prevent fragmentation, use one of the `Ping.Send` methods that takes an `options` parameter, and set the `DontFragment` property to `true`. When `PingOptions.DontFragment` is `true` and the total packet size exceeds the maximum packet size that can be transmitted by one of the routing nodes between the local and remote computers, the ICMP echo request fails. When this happens, the `PingReply.Status` is set to `PacketTooBig`.

The packet or packet fragments can be forwarded by routing nodes 128 times before being discarded. To change this setting, use a `Ping.Send` overload that takes an `options` parameter, and set the `Ttl` property to the desired value. If the packet does not reach its destination after being forwarded the specified number of times, the packet is discarded and the ICMP echo request fails. When this happens, the `PingReply.Status` is set to `TtlExpired`.

#### Examples
For an example that demonstrates how to call a `Ping.Send` overload, see the `Ping` class overview.
