---
title: "Ping class (part 6 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/Ping.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Ping class (part 6 of 7)

## Ping.SendAsync(String, Int32, Byte[], PingOptions, Object) method

```csharp
public void SendAsync (string hostNameOrAddress, int timeout, byte[] buffer, System.Net.NetworkInformation.PingOptions? options, object? userToken);
```

Asynchronously attempts to send an Internet Control Message Protocol (ICMP) echo message with the specified data buffer to the specified computer, and receive a corresponding ICMP echo reply message from that computer. This overload allows you to specify a time-out value for the operation and control fragmentation and Time-to-Live values for the ICMP packet.

Parameters:

- `hostNameOrAddress`: A `String` that identifies the computer that is the destination for the ICMP echo message. The value specified for this parameter can be a host name or a string representation of an IP address.
- `timeout`: An `Int32` value that specifies the maximum number of milliseconds (after sending the echo message) to wait for the ICMP echo reply message.
- `buffer`: A `Byte` array that contains data to be sent with the ICMP echo message and returned in the ICMP echo reply message. The array cannot contain more than 65,500 bytes.
- `options`: A `PingOptions` object used to control fragmentation and Time-to-Live values for the ICMP echo message packet.
- `userToken`: An object that is passed to the method invoked when the asynchronous operation completes.

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
The `Ping.SendAsync` method sends the Echo message asynchronously and, when the operation completes (successfully or unsuccessfully), returns the status to your application. Call the `Ping.SendAsync` method when your application must not block. Each call executes in a separate thread that is automatically allocated from the thread pool. When the asynchronous operation completes, it raises the `PingCompleted` event. Applications use a `PingCompletedEventHandler` delegate to specify the method that is called when `Ping.SendAsync` raises the event. You must add a `PingCompletedEventHandler` delegate to the event before calling `Ping.SendAsync`. The delegate's method receives a `PingCompletedEventArgs` object that contains a `PingReply` object that describes the result of the `Ping.SendAsync` call. The `PingCompletedEventArgs` object inherits the `UserState` property. This property contains the `userToken` object passed into the `Ping.SendAsync` call.

If your application should block while waiting for a reply, use the `Ping.Send` methods; these methods are synchronous.

If the ICMP echo reply message is not received within the time specified by the `timeout` parameter, the ICMP echo fails, and the `Status` property is set to `TimedOut`.

> **Note:**
>  When specifying very small numbers for `timeout`, the Ping reply can be received even if `timeout` milliseconds have elapsed.

If the `DontFragment` property is `true` and the total packet size exceeds the maximum packet size that can be transmitted by one of the routing nodes between the local and remote computers, the ICMP echo request fails. When this happens, the `PingReply.Status` is set to `PacketTooBig`.

Use the `Ttl` property to specify the maximum number of times the ICMP echo message can be forwarded before reaching its destination. If the packet does not reach its destination after being forwarded the specified number of times, the packet is discarded and the ICMP echo request fails. When this happens, the `PingReply.Status` is set to `TtlExpired`.

#### Examples
The following code example demonstrates how to call this method.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/Ping/Overview/asyncping.cs._
## Ping.SendAsyncCancel() method

```csharp
public void SendAsyncCancel ();
```

Cancels all pending asynchronous requests to send an Internet Control Message Protocol (ICMP) echo message and receives a corresponding ICMP echo reply message.

#### Remarks
Call this method to terminate any calls to `Ping.SendAsync` that have not completed.

## Ping.SendPingAsync(IPAddress) method

```csharp
public System.Threading.Tasks.Task<System.Net.NetworkInformation.PingReply> SendPingAsync (System.Net.IPAddress address);
```

Sends an Internet Control Message Protocol (ICMP) echo message with the specified data buffer to the computer that has the specified `IPAddress`, and receives a corresponding ICMP echo reply message from that computer as an asynchronous operation.

Parameters:

- `address`: An IP address that identifies the computer that is the destination for the ICMP echo message.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `address` is `null`.
- `InvalidOperationException`: A call to `SendPingAsync` is in progress.
- `PingException`: An exception was thrown while sending or receiving the ICMP messages. See the inner exception for the exact exception that was thrown.
- `SocketException`: `address` is not a valid IP address.
- `ObjectDisposedException`: This object has been disposed.

#### Remarks
This operation will not block. The returned `Task<T>`> object will complete after the ICMP packet has been sent and the response has been received.

## Ping.SendPingAsync(String) method

```csharp
public System.Threading.Tasks.Task<System.Net.NetworkInformation.PingReply> SendPingAsync (string hostNameOrAddress);
```

Sends an Internet Control Message Protocol (ICMP) echo message with the specified data buffer to the specified computer, and receive a corresponding ICMP echo reply message from that computer as an asynchronous operation.

Parameters:

- `hostNameOrAddress`: The computer that is the destination for the ICMP echo message. The value specified for this parameter can be a host name or a string representation of an IP address.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `hostNameOrAddress` is `null` or is an empty string ("").
- `InvalidOperationException`: A call to `Ping.SendAsync` method is in progress.
- `PingException`: An exception was thrown while sending or receiving the ICMP messages. See the inner exception for the exact exception that was thrown.
- `SocketException`: `hostNameOrAddress` could not be resolved to a valid IP address.
- `ObjectDisposedException`: This object has been disposed.

#### Remarks
This operation will not block. The returned `Task<T>`> object will complete after the ICMP packet has been sent and the response has been received.

## Ping.SendPingAsync(IPAddress, Int32) method

```csharp
public System.Threading.Tasks.Task<System.Net.NetworkInformation.PingReply> SendPingAsync (System.Net.IPAddress address, int timeout);
```

Sends an Internet Control Message Protocol (ICMP) echo message with the specified data buffer to the computer that has the specified `IPAddress`, and receives a corresponding ICMP echo reply message from that computer as an asynchronous operation. This overload allows you to specify a time-out value for the operation.

Parameters:

- `address`: An IP address that identifies the computer that is the destination for the ICMP echo message.
- `timeout`: The maximum number of milliseconds (after sending the echo message) to wait for the ICMP echo reply message.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `address` is `null`.
- `InvalidOperationException`: A call to the `SendAsync` method is in progress.
- `PingException`: An exception was thrown while sending or receiving the ICMP messages. See the inner exception for the exact exception that was thrown.
- `SocketException`: `address` is not a valid IP address.
- `ObjectDisposedException`: This object has been disposed.

#### Remarks
This operation will not block. The returned `Task<T>`> object will complete after the ICMP packet has been sent and the response has been received.

## Ping.SendPingAsync(String, Int32) method

```csharp
public System.Threading.Tasks.Task<System.Net.NetworkInformation.PingReply> SendPingAsync (string hostNameOrAddress, int timeout);
```

Sends an Internet Control Message Protocol (ICMP) echo message with the specified data buffer to the specified computer, and receive a corresponding ICMP echo reply message from that computer as an asynchronous operation. This overload allows you to specify a time-out value for the operation.

Parameters:

- `hostNameOrAddress`: The computer that is the destination for the ICMP echo message. The value specified for this parameter can be a host name or a string representation of an IP address.
- `timeout`: The maximum number of milliseconds (after sending the echo message) to wait for the ICMP echo reply message.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `hostNameOrAddress` is `null`.
- `ArgumentOutOfRangeException`: `timeout` is less than zero.
- `InvalidOperationException`: A call to the `SendAsync` method is in progress.
- `PingException`: An exception was thrown while sending or receiving the ICMP messages. See the inner exception for the exact exception that was thrown.
- `SocketException`: `hostNameOrAddress` is not a valid IP address.
- `ObjectDisposedException`: This object has been disposed.

#### Remarks
This operation will not block. The returned `Task<T>`> object will complete after the ICMP packet has been sent and the response has been received.

## Ping.SendPingAsync(IPAddress, Int32, Byte[]) method

```csharp
public System.Threading.Tasks.Task<System.Net.NetworkInformation.PingReply> SendPingAsync (System.Net.IPAddress address, int timeout, byte[] buffer);
```

Sends an Internet Control Message Protocol (ICMP) echo message with the specified data buffer to the computer that has the specified `IPAddress`, and receives a corresponding ICMP echo reply message from that computer as an asynchronous operation. This overload allows you to specify a time-out value for the operation and a buffer to use for send and receive.

Parameters:

- `address`: An IP address that identifies the computer that is the destination for the ICMP echo message.
- `timeout`: The maximum number of milliseconds (after sending the echo message) to wait for the ICMP echo reply message.
- `buffer`: A `Byte` array that contains data to be sent with the ICMP echo message and returned in the ICMP echo reply message. The array cannot contain more than 65,500 bytes.

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

## Ping.SendPingAsync(String, Int32, Byte[]) method

```csharp
public System.Threading.Tasks.Task<System.Net.NetworkInformation.PingReply> SendPingAsync (string hostNameOrAddress, int timeout, byte[] buffer);
```

Sends an Internet Control Message Protocol (ICMP) echo message with the specified data buffer to the specified computer, and receive a corresponding ICMP echo reply message from that computer as an asynchronous operation. This overload allows you to specify a time-out value for the operation and a buffer to use for send and receive.

Parameters:

- `hostNameOrAddress`: The computer that is the destination for the ICMP echo message. The value specified for this parameter can be a host name or a string representation of an IP address.
- `timeout`: The maximum number of milliseconds (after sending the echo message) to wait for the ICMP echo reply message.
- `buffer`: A `Byte` array that contains data to be sent with the ICMP echo message and returned in the ICMP echo reply message. The array cannot contain more than 65,500 bytes.

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
