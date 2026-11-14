---
title: "Ping class (part 4 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/Ping.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Ping class (part 4 of 7)

## Ping.SendAsync(String, Object) method

```csharp
public void SendAsync (string hostNameOrAddress, object? userToken);
```

Asynchronously attempts to send an Internet Control Message Protocol (ICMP) echo message to the specified computer, and receive a corresponding ICMP echo reply message from that computer.

Parameters:

- `hostNameOrAddress`: A `String` that identifies the computer that is the destination for the ICMP echo message. The value specified for this parameter can be a host name or a string representation of an IP address.
- `userToken`: An object that is passed to the method invoked when the asynchronous operation completes.

Exceptions:

- `ArgumentNullException`: `hostNameOrAddress` is `null` or is an empty string ("").
- `InvalidOperationException`: A call to `Ping.SendAsync` method is in progress.
- `PingException`: An exception was thrown while sending or receiving the ICMP messages. See the inner exception for the exact exception that was thrown.
- `SocketException`: `hostNameOrAddress` could not be resolved to a valid IP address.
- `ObjectDisposedException`: This object has been disposed.

#### Remarks
The `Ping.SendAsync` method sends the echo message asynchronously and, when the operation completes (successfully or unsuccessfully), returns the status to your application. Call the `Ping.SendAsync` method when your application should not block. Each call to this method executes in a separate thread that is automatically allocated from the thread pool. When the asynchronous operation completes, it raises the `PingCompleted` event. To specify the method that is called when `Ping.SendAsync` raises the event, you must add a `PingCompletedEventHandler` delegate to the event before calling `Ping.SendAsync`. The delegate's method receives a `PingCompletedEventArgs` object that contains a `PingReply` object that describes the result of the `Ping.SendAsync` call. The `PingCompletedEventArgs` object inherits the `UserState` property. This property contains the `userToken` object passed into the `Ping.SendAsync` call.

> **Note:**
>  If your application should block while waiting for a reply, use the `Ping.Send` methods; these methods are synchronous.

This method sends a 32 `Byte` data buffer with the ICMP echo message. The method waits five seconds for an ICMP echo reply message. If it does not receive a reply in that time the method returns and the `Status` property is set to `TimedOut`.

This overload uses default settings for packet fragmentation and packet forwarding. The packet that contains the ICMP echo message can be fragmented in transit if the total packet size exceeds the maximum packet size that can be transmitted by one of the routing nodes between the local and remote computers. To prevent fragmentation, use one of the `Ping.SendAsync` methods that takes an `options` parameter, and set the `DontFragment` property to `true`. When `PingOptions.DontFragment` is `true` and the total packet size exceeds the maximum packet size that can be transmitted by one of the routing nodes between the local and remote computers, the ICMP echo request fails. When this happens, the `PingReply.Status` is set to `PacketTooBig`.

The packet or packet fragments can be forwarded by routing nodes 128 times before being discarded. To change this setting, use a `Ping.SendAsync` overload that takes an `options` parameter, and set the `Ttl` property to the desired value. If the packet does not reach its destination after being forwarded the specified number of times, the packet is discarded and the ICMP echo request fails. When this happens, the `PingReply.Status` is set to `TtlExpired`.

#### Examples
For a code example that demonstrates calling the `Ping.SendAsync` method, see the `Ping` class overview.

## Ping.SendAsync(IPAddress, Int32, Object) method

```csharp
public void SendAsync (System.Net.IPAddress address, int timeout, object? userToken);
```

Asynchronously attempts to send an Internet Control Message Protocol (ICMP) echo message to the computer that has the specified `IPAddress`, and receive a corresponding ICMP echo reply message from that computer. This overload allows you to specify a time-out value for the operation.

Parameters:

- `address`: An `IPAddress` that identifies the computer that is the destination for the ICMP echo message.
- `timeout`: An `Int32` value that specifies the maximum number of milliseconds (after sending the echo message) to wait for the ICMP echo reply message.
- `userToken`: An object that is passed to the method invoked when the asynchronous operation completes.

Exceptions:

- `ArgumentNullException`: `address` is `null`.
- `ArgumentOutOfRangeException`: `timeout` is less than zero.
- `InvalidOperationException`: A call to `Ping.SendAsync` method is in progress.
- `PingException`: An exception was thrown while sending or receiving the ICMP messages. See the inner exception for the exact exception that was thrown.
- `SocketException`: `address` is not a valid IP address.
- `ObjectDisposedException`: This object has been disposed.

#### Remarks
The `Ping.SendAsync` method sends the Echo message asynchronously and, when the operation completes (successfully or unsuccessfully), returns the status to your application. Call the `Ping.SendAsync` method when your application should not block. Each call executes in a separate thread that is automatically allocated from the thread pool. When the asynchronous operation completes, it raises the `PingCompleted` event. Applications use a `PingCompletedEventHandler` delegate to specify the method that is called when `Ping.SendAsync` raises the event. You must add a `PingCompletedEventHandler` delegate to the event before calling `Ping.SendAsync`. The delegate's method receives a `PingCompletedEventArgs` object that contains a `PingReply` object that describes the result of the `Ping.SendAsync` call. The `PingCompletedEventArgs` object inherits the `UserState` property. This property contains the `userToken` object passed into the `Ping.SendAsync` call.

If your application should block while waiting for a reply, use the `Ping.Send` methods; these methods are synchronous.

If the ICMP echo reply message is not received within the time specified by the `timeout` parameter, the ICMP echo fails, and the `Status` property is set to `TimedOut`.

> **Note:**
>  When specifying very small numbers for `timeout`, the Ping reply can be received even if `timeout` milliseconds have elapsed.

This overload uses default settings for packet fragmentation and packet forwarding. The packet that contains the ICMP echo message can be fragmented in transit if the total packet size exceeds the maximum packet size that can be transmitted by one of the routing nodes between the local and remote computers. To prevent fragmentation, use one of the `Ping.SendAsync` methods that takes an `options` parameter, and set the `DontFragment` property to `true`. When `PingOptions.DontFragment` is `true` and the total packet size exceeds the maximum packet size that can be transmitted by one of the routing nodes between the local and remote computers, the ICMP echo request fails. When this happens, the `PingReply.Status` is set to `PacketTooBig`. The packet or packet fragments (if fragmented) can be forwarded by routing nodes 128 times before being discarded. To change this setting, use a `Ping.SendAsync` overload that takes an `options` parameter, and set the `Ttl` property to the desired value. If the packet does not reach its destination after being forwarded the specified number of times, the packet is discarded and the ICMP echo request fails. When this happens, the `PingReply.Status` is set to `TtlExpired`.

#### Examples
For a code example that demonstrates calling a `Ping.SendAsync` overload, see the `Ping` class overview.

## Ping.SendAsync(String, Int32, Object) method

```csharp
public void SendAsync (string hostNameOrAddress, int timeout, object? userToken);
```

Asynchronously attempts to send an Internet Control Message Protocol (ICMP) echo message to the specified computer, and receive a corresponding ICMP echo reply message from that computer. This overload allows you to specify a time-out value for the operation.

Parameters:

- `hostNameOrAddress`: A `String` that identifies the computer that is the destination for the ICMP echo message. The value specified for this parameter can be a host name or a string representation of an IP address.
- `timeout`: An `Int32` value that specifies the maximum number of milliseconds (after sending the echo message) to wait for the ICMP echo reply message.
- `userToken`: An object that is passed to the method invoked when the asynchronous operation completes.

Exceptions:

- `ArgumentNullException`: `hostNameOrAddress` is `null` or is an empty string ("").
- `ArgumentOutOfRangeException`: `timeout` is less than zero.
- `InvalidOperationException`: A call to `SendAsync` is in progress.
- `PingException`: An exception was thrown while sending or receiving the ICMP messages. See the inner exception for the exact exception that was thrown.
- `SocketException`: `hostNameOrAddress` could not be resolved to a valid IP address.
- `ObjectDisposedException`: This object has been disposed.

#### Remarks
The `Ping.SendAsync` method sends the Echo message asynchronously and, when the operation completes (successfully or unsuccessfully), returns the status to your application. Call the `Ping.SendAsync` method when your application should not block. Each call executes in a separate thread that is automatically allocated from the thread pool. When the asynchronous operation completes, it raises the `PingCompleted` event. Applications use a `PingCompletedEventHandler` delegate to specify the method that is called when `Ping.SendAsync` raises the event. You must add a `PingCompletedEventHandler` delegate to the event before calling `Ping.SendAsync`. The delegate's method receives a `PingCompletedEventArgs` object that contains a `PingReply` object that describes the result of the `Ping.SendAsync` call. The `PingCompletedEventArgs` object inherits the `UserState` property. This property contains the `userToken` object passed into the `Ping.SendAsync` call.

If your application should block while waiting for a reply, use the `Ping.Send` methods; these methods are synchronous.

If the ICMP echo reply message is not received within the time specified by the `timeout` parameter, the ICMP echo fails, and the `Status` property is set to `TimedOut`.

> **Note:**
>  When specifying very small numbers for `timeout`, the Ping reply can be received even if `timeout` milliseconds have elapsed.

This overload uses default settings for packet fragmentation and packet forwarding. The packet that contains the ICMP echo message can be fragmented in transit if the total packet size exceeds the maximum packet size that can be transmitted by one of the routing nodes between the local and remote computers. To prevent fragmentation, use one of the `Ping.SendAsync` methods that takes an `options` parameter, and set the `DontFragment` property to `true`. When `PingOptions.DontFragment` is `true` and the total packet size exceeds the maximum packet size that can be transmitted by one of the routing nodes between the local and remote computers, the ICMP echo request fails. When this happens, the `PingReply.Status` is set to `PacketTooBig`. The packet or packet fragments (if fragmented) can be forwarded by routing nodes 128 times before being discarded. To change this setting, use a `Ping.SendAsync` overload that takes an `options` parameter, and set the `Ttl` property to the desired value. If the packet does not reach its destination after being forwarded the specified number of times, the packet is discarded and the ICMP echo request fails. When this happens, the `PingReply.Status` is set to `TtlExpired`.

#### Examples
For a code example that demonstrates calling the `Ping.SendAsync` method, see the `Ping` class overview.
