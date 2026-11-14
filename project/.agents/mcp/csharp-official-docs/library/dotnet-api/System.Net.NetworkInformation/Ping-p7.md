---
title: "Ping class (part 7 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/Ping.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Ping class (part 7 of 7)

## Ping.SendPingAsync(IPAddress, Int32, Byte[], PingOptions) method

```csharp
public System.Threading.Tasks.Task<System.Net.NetworkInformation.PingReply> SendPingAsync (System.Net.IPAddress address, int timeout, byte[] buffer, System.Net.NetworkInformation.PingOptions? options);
```

Sends an Internet Control Message Protocol (ICMP) echo message with the specified data buffer to the computer that has the specified `IPAddress`, and receives a corresponding ICMP echo reply message from that computer as an asynchronous operation. This overload allows you to specify a time-out value for the operation, a buffer to use for send and receive, and control fragmentation and Time-to-Live values for the ICMP echo message packet.

Parameters:

- `address`: An IP address that identifies the computer that is the destination for the ICMP echo message.
- `timeout`: The maximum number of milliseconds (after sending the echo message) to wait for the ICMP echo reply message.
- `buffer`: A `Byte` array that contains data to be sent with the ICMP echo message and returned in the ICMP echo reply message. The array cannot contain more than 65,500 bytes.
- `options`: A `PingOptions` object used to control fragmentation and Time-to-Live values for the ICMP echo message packet.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `address` or `buffer` is `null`.
- `ArgumentOutOfRangeException`: `timeout` is less than zero.
- `InvalidOperationException`: A call to `SendPingAsync` is in progress.
- `PingException`: An exception was thrown while sending or receiving the ICMP messages. See the inner exception for the exact exception that was thrown.
- `SocketException`: `address` is not a valid IP address.
- `ObjectDisposedException`: This object has been disposed.
- `ArgumentException`: The size of `buffer` exceeds 65,500 bytes.
- `PlatformNotSupportedException`: On Linux: The process is non-privileged, and `buffer` is not empty.

#### Remarks
This operation will not block. The returned `Task<T>`> object will complete after the ICMP packet has been sent and the response has been received.

## Ping.SendPingAsync(String, Int32, Byte[], PingOptions) method

```csharp
public System.Threading.Tasks.Task<System.Net.NetworkInformation.PingReply> SendPingAsync (string hostNameOrAddress, int timeout, byte[] buffer, System.Net.NetworkInformation.PingOptions? options);
```

Sends an Internet Control Message Protocol (ICMP) echo message with the specified data buffer to the specified computer, and receive a corresponding ICMP echo reply message from that computer as an asynchronous operation. This overload allows you to specify a time-out value for the operation, a buffer to use for send and receive, and control fragmentation and Time-to-Live values for the ICMP echo message packet.

Parameters:

- `hostNameOrAddress`: The computer that is the destination for the ICMP echo message. The value specified for this parameter can be a host name or a string representation of an IP address.
- `timeout`: The maximum number of milliseconds (after sending the echo message) to wait for the ICMP echo reply message.
- `buffer`: A `Byte` array that contains data to be sent with the ICMP echo message and returned in the ICMP echo reply message. The array cannot contain more than 65,500 bytes.
- `options`: A `PingOptions` object used to control fragmentation and Time-to-Live values for the ICMP echo message packet.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `hostNameOrAddress` is `null` or is an empty string ("").

-or-

`buffer` is `null`.
- `ArgumentOutOfRangeException`: `timeout` is less than zero.
- `InvalidOperationException`: A call to `SendAsync` is in progress.
- `PingException`: An exception was thrown while sending or receiving the ICMP messages. See the inner exception for the exact exception that was thrown.
- `SocketException`: `hostNameOrAddress` could not be resolved to a valid IP address.
- `ObjectDisposedException`: This object has been disposed.
- `ArgumentException`: The size of `buffer` exceeds 65500 bytes.
- `PlatformNotSupportedException`: On Linux: The process is non-privileged, and `buffer` is not empty.

#### Remarks
This operation will not block. The returned `Task<T>`> object will complete after the ICMP packet has been sent and the response has been received.

## Ping.SendPingAsync(IPAddress, TimeSpan, Byte[], PingOptions, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Net.NetworkInformation.PingReply> SendPingAsync (System.Net.IPAddress address, TimeSpan timeout, byte[]? buffer = default, System.Net.NetworkInformation.PingOptions? options = default, System.Threading.CancellationToken <example-value> = default);
```

Sends an Internet Control Message Protocol (ICMP) echo message with the specified data buffer to the computer that has the specified `IPAddress`, and receives a corresponding ICMP echo reply message from that computer as an asynchronous operation. This overload allows you to specify a time-out value for the operation, a buffer to use for send and receive, control fragmentation and Time-to-Live values, and a `CancellationToken` for the ICMP echo message packet.

Parameters:

- `address`: An IP address that identifies the computer that is the destination for the ICMP echo message.
- `timeout`: The amount of time (after sending the echo message) to wait for the ICMP echo reply message.
- `buffer`: A `Byte` array that contains data to be sent with the ICMP echo message and returned in the ICMP echo reply message. The array cannot contain more than 65,500 bytes.
- `options`: A `PingOptions` object used to control fragmentation and Time-to-Live values for the ICMP echo message packet.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is
`CancellationToken.None`.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## Ping.SendPingAsync(String, TimeSpan, Byte[], PingOptions, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Net.NetworkInformation.PingReply> SendPingAsync (string hostNameOrAddress, TimeSpan timeout, byte[]? buffer = default, System.Net.NetworkInformation.PingOptions? options = default, System.Threading.CancellationToken <example-value> = default);
```

Sends an Internet Control Message Protocol (ICMP) echo message with the specified data buffer to the specified computer, and receives a corresponding ICMP echo reply message from that computer as an asynchronous operation. This overload allows you to specify a time-out value for the operation, a buffer to use for send and receive, control fragmentation and Time-to-Live values, and a `CancellationToken` for the ICMP echo message packet.

Parameters:

- `hostNameOrAddress`: The computer that is the destination for the ICMP echo message. The value specified for this parameter can be a host name or a string representation of an IP address.
- `timeout`: The amount of time (after sending the echo message) to wait for the ICMP echo reply message.
- `buffer`: A `Byte` array that contains data to be sent with the ICMP echo message and returned in the ICMP echo reply message. The array cannot contain more than 65,500 bytes.
- `options`: A `PingOptions` object used to control fragmentation and Time-to-Live values for the ICMP echo message packet.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## Ping.PingCompleted event

```csharp
public event System.Net.NetworkInformation.PingCompletedEventHandler? PingCompleted;
```

Occurs when an asynchronous operation to send an Internet Control Message Protocol (ICMP) echo message and receive the corresponding ICMP echo reply message completes or is canceled.

#### Remarks
Applications use the `PingCompleted` event to get information about the completion status and data collected by a call to one of the `Ping.SendAsync` methods. The `PingCompletedEventHandler` delegate provides the call back method invoked when `Ping.SendAsync` raises this event.

#### Examples
The following code example demonstrates specifying a callback method for the `PingCompleted` event. The complete example is available in the `Ping` class overview.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/Ping/Overview/asyncping.cs._
