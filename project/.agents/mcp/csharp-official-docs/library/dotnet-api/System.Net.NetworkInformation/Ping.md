---
title: "Ping class (part 1 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/Ping.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Ping class

Namespace: `System.Net.NetworkInformation`

```csharp
public class Ping : System.ComponentModel.Component
```

Allows an application to determine whether a remote computer is accessible over the network.

#### Remarks
Applications use the `Ping` class to detect whether a remote computer is reachable.

Network topology can determine whether `Ping` can successfully contact a remote host. The presence and configuration of proxies, network address translation (NAT) equipment, or firewalls can prevent `Ping` from succeeding. A successful `Ping` indicates only that the remote host can be reached on the network; the presence of higher level services (such as a Web server) on the remote host is not guaranteed.

This class provides functionality similar to the Ping.exe command line tool. The `Ping.Send` and `Ping.SendAsync` methods send an Internet Control Message Protocol (ICMP) echo request message to a remote computer and wait for an ICMP echo reply message from that computer. For a detailed description of ICMP messages, see RFC 792, available at https://www.ietf.org.

The following types are used with the `Ping` class and are described in detail below.

|**Type name**|**Description**|
|-------------------|---------------------|
|`IPStatus`|Defines status codes that describe the outcome of an ICMP echo request message.|
|`PingOptions`|Allows you to configure or retrieve the settings that control how many times the request packet can be forwarded (`PingOptions.Ttl`), and whether it can be fragmented (`PingOptions.DontFragment` ).|
|`PingReply`|Contains the results of an ICMP echo request.|
|`PingException`|Thrown if an unrecoverable error occurs.|
|`PingCompletedEventArgs`|Contains the data associated with `PingCompleted` events, which are raised when a `Ping.SendAsync` call completes or is canceled.|
|`PingCompletedEventHandler`|The delegate that provides the callback method invoked when a `Ping.SendAsync` call completes or is canceled.|

The `Ping.Send` and `Ping.SendAsync` methods return the reply in a `PingReply` object. The `Status` property returns an `IPStatus` value to indicate the outcome of the request.

When sending the request, you must specify the remote computer. You can do this by providing a host name string, an IP address in string format, or an `IPAddress` object.

You can also specify any of the following types of information:

- Data to accompany the request. Specifying `buffer` allows you to learn the amount of time required for a packet of a particular size to travel to and from the remote host and the maximum transmission unit of the network path. (See the `Ping.Send` or `Ping.SendAsync` overloads that take a `buffer` parameter.)

- Whether the ICMP Echo packet can be fragmented in transit. (See the `DontFragment` property and the `Ping.Send` or `Ping.SendAsync` overloads that take an `options` parameter.)

- How many times routing nodes, such as routers or gateways, can forward the packet before it either reaches the destination computer or is discarded. (See `PingOptions.Ttl` and the `Ping.Send` or `Ping.SendAsync` overloads that take an `options` parameter.)

- The time limit within which the reply must be received. (See the `Ping.Send` or `Ping.SendAsync` overloads that take a `timeout` parameter.

The `Ping` class offers both synchronous and asynchronous methods for sending the request. If your application should block while waiting for a reply, use the `Ping.Send` methods; these methods are synchronous. If your application should not block, use the asynchronous `Ping.SendAsync` methods. A call to `Ping.SendAsync` executes in its own thread that is automatically allocated from the thread pool. When the asynchronous operation completes, it raises the `PingCompleted` event. Applications use a `PingCompletedEventHandler` delegate to specify the method that is called for `PingCompleted` events. You must add a `PingCompletedEventHandler` delegate to the event before calling `Ping.SendAsync`. The delegate's method receives a `PingCompletedEventArgs` object that contains a `PingReply` object that describes the result of the `Ping.SendAsync` call.

You cannot use the same instance of the `Ping` class to generate multiple simultaneous ICMP Echo requests. Calling `Ping.Send` while a `Ping.SendAsync` call is in progress or calling `Ping.SendAsync` multiple times before all previous calls have completed causes an `InvalidOperationException`.

#### Examples
The following code example demonstrates using the `Ping` class synchronously.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IPStatus/Overview/syncping.cs._

The following code example demonstrates using the `Ping` class asynchronously.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/Ping/Overview/asyncping.cs._
## Ping.Ping() constructor

```csharp
public Ping ();
```

Initializes a new instance of the `Ping` class.

#### Examples
The following code example demonstrates creating a `Ping` instance. The complete example is available in the `Ping` class overview.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/Ping/Overview/asyncping.cs._
## Ping.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `Ping` object, and optionally disposes of the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to releases only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method. The public `Dispose()` method invokes the protected `Ping.Dispose` method with the `disposing` parameter set to `true`. `Finalize` invokes `Dispose` with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `Ping` object references. This method invokes the `Dispose()` method of each referenced object.

## Ping.OnPingCompleted(PingCompletedEventArgs) method

```csharp
protected void OnPingCompleted (System.Net.NetworkInformation.PingCompletedEventArgs e);
```

Raises the `Ping.PingCompleted` event.

Parameters:

- `e`: A `PingCompletedEventArgs` object that contains event data.

#### Remarks
Classes that inherit from the `Ping` class can override this method to perform additional tasks, such as logging the data contained in the `e` parameter.

Raising an event invokes the event handler through a delegate. For more information, see Handling and Raising Events.

The `Ping.OnPingCompleted` method also allows derived classes to handle the event without attaching a delegate. This is the preferred technique for handling the event in a derived class.

## Ping.Send(IPAddress) method

```csharp
public System.Net.NetworkInformation.PingReply Send (System.Net.IPAddress address);
```

Attempts to send an Internet Control Message Protocol (ICMP) echo message to the computer that has the specified `IPAddress`, and receive a corresponding ICMP echo reply message from that computer.

Parameters:

- `address`: An `IPAddress` that identifies the computer that is the destination for the ICMP echo message.

Returns: A `PingReply` object that provides information about the ICMP echo reply message, if one was received, or describes the reason for the failure if no message was received.

Exceptions:

- `ArgumentNullException`: `address` is `null`.
- `InvalidOperationException`: A call to `SendAsync` is in progress.
- `PingException`: An exception was thrown while sending or receiving the ICMP messages. See the inner exception for the exact exception that was thrown.
- `ObjectDisposedException`: This object has been disposed.
- `PlatformNotSupportedException`: On Windows UWP: In all cases.

#### Remarks
This method sends to the host that is specified by `address` a 32 `Byte` data buffer with the ICMP echo message. The method waits five seconds for an ICMP echo reply message. If it does not receive a reply in that time, the method returns and the `Status` property is set to `TimedOut`.

This overload uses default settings for packet fragmentation and packet forwarding. The packet that contains the ICMP echo message can be fragmented in transit if the total packet size exceeds the maximum packet size that can be transmitted by one of the routing nodes between the local and remote computers. To prevent fragmentation, use one of the `Ping.Send` methods that takes an `options` parameter, and set the `DontFragment` property to `true`. When `PingOptions.DontFragment` is `true` and the total packet size exceeds the maximum packet size that can be transmitted by one of the routing nodes between the local and remote computers, the ICMP echo request fails. When this happens, the `PingReply.Status` is set to `PacketTooBig`. The packet or packet fragments (if fragmented) can be forwarded by routing nodes 128 times before being discarded. To change this setting, use a `Ping.Send` overload that takes an `options` parameter, and set the `Ttl` property to the desired value. If the packet does not reach its destination after being forwarded the specified number of times, the packet is discarded and the ICMP echo request fails. When this happens, the `PingReply.Status` is set to `TtlExpired`.

#### Examples
The following code example demonstrates calling this method.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/Ping/Send/pingtest.cs._
## Ping.Send(String) method

```csharp
public System.Net.NetworkInformation.PingReply Send (string hostNameOrAddress);
```

Attempts to send an Internet Control Message Protocol (ICMP) echo message to the specified computer, and receive a corresponding ICMP echo reply message from that computer.

Parameters:

- `hostNameOrAddress`: A `String` that identifies the computer that is the destination for the ICMP echo message. The value specified for this parameter can be a host name or a string representation of an IP address.

Returns: A `PingReply` object that provides information about the ICMP echo reply message, if one was received, or provides the reason for the failure, if no message was received.

Exceptions:

- `ArgumentNullException`: `hostNameOrAddress` is `null` or is an empty string ("").
- `InvalidOperationException`: A call to `SendAsync` is in progress.
- `PingException`: An exception was thrown while sending or receiving the ICMP messages. See the inner exception for the exact exception that was thrown.
- `ObjectDisposedException`: This object has been disposed.
- `PlatformNotSupportedException`: On Windows UWP: In all cases.

#### Remarks
This method sends a 32 `Byte` data buffer with the ICMP echo message. The method waits five seconds for an ICMP echo reply message. If it does not receive a reply in that time, the method returns and the `Status` property is set to `TimedOut`.

This overload uses default settings for packet fragmentation and packet forwarding. The packet that contains the ICMP echo message can be fragmented in transit if the total packet size exceeds the maximum packet size that can be transmitted by one of the routing nodes between the local and remote computers. To prevent fragmentation, use one of the `Ping.Send` methods that takes an `options` parameter, and set the `DontFragment` property to `true`. When `PingOptions.DontFragment` is `true` and the total packet size exceeds the maximum packet size that can be transmitted by one of the routing nodes between the local and remote computers, the ICMP echo request fails. When this happens, the `PingReply.Status` is set to `PacketTooBig`. The packet or packet fragments (if fragmented) can be forwarded by routing nodes 128 times before being discarded. To change this setting, use a `Ping.Send` overload that takes an `options` parameter, and set the `Ttl` property to the desired value. If the packet does not reach its destination after being forwarded the specified number of times, the packet is discarded and the ICMP echo request fails. When this happens, the `PingReply.Status` is set to `TtlExpired`.

#### Examples
The following code example demonstrates calling this method.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/Ping/Send/pingtest.cs._
