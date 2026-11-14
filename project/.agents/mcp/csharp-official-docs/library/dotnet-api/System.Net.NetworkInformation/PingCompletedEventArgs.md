---
title: "PingCompletedEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/PingCompletedEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PingCompletedEventArgs class

Namespace: `System.Net.NetworkInformation`

```csharp
public class PingCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs
```

Provides data for the `Ping.PingCompleted` event.

#### Remarks
Instances of this class are passed to a `PingCompletedEventHandler` method that is called when a `Ping.SendAsync` call completes. The `Ping.SendAsync` methods send an Internet Control Message Protocol (ICMP) echo request asynchronously and wait for a corresponding ICMP echo reply message. The `Reply` property contains the results of the ICMP echo request.

#### Examples
The following code example demonstrates sending an ICMP echo request asynchronously.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/Ping/Overview/asyncping.cs._
## PingCompletedEventArgs.Reply property

```csharp
public System.Net.NetworkInformation.PingReply? Reply { get; }
```

Gets an object that contains data that describes an attempt to send an Internet Control Message Protocol (ICMP) echo request message and receive a corresponding ICMP echo reply message.

Returns: A `PingReply` object that describes the results of the ICMP echo request.

#### Remarks
If the value of `PingReply.Status` is not `Success`, you should not use the values that are returned by the `PingReply.RoundtripTime`, `PingReply.Options`, and `PingReply.Buffer` properties. The `PingReply.RoundtripTime` and `PingReply.Buffer` properties will return zero, and the `Options` property will return `null`.

#### Examples
The following code example implements a method that is used to respond to a `PingCompleted` event. For the complete example, see the `PingCompletedEventArgs` class overview.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/Ping/Overview/asyncping.cs._
