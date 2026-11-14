---
title: "PingCompletedEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/PingCompletedEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PingCompletedEventHandler delegate

Namespace: `System.Net.NetworkInformation`

```csharp
public delegate void PingCompletedEventHandler(object sender, PingCompletedEventArgs e);
```

Represents the method that will handle the `Ping.PingCompleted` event of a `Ping` object.

Parameters:

- `sender`: The source of the `Ping.PingCompleted` event.
- `e`: A `PingCompletedEventArgs` object that contains the event data.

#### Remarks
User data that is specified in a `Ping.SendAsync` call is available to the method invoked by this delegate in the `UserState` property.

#### Examples
The following code example demonstrates specifying a `PingCompletedEventHandler` to respond to a `PingCompleted` event.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/Ping/Overview/asyncping.cs._
