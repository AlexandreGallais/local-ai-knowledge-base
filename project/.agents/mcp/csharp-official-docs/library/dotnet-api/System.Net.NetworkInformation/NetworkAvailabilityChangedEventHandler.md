---
title: "NetworkAvailabilityChangedEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/NetworkAvailabilityChangedEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NetworkAvailabilityChangedEventHandler delegate

Namespace: `System.Net.NetworkInformation`

```csharp
public delegate void NetworkAvailabilityChangedEventHandler(object? sender, NetworkAvailabilityEventArgs e);
```

References one or more methods to be called when the availability of the network changes.

Parameters:

- `sender`: The source of the event.
- `e`: An `EventArgs` object that contains data about the event.

#### Remarks
This delegate handles `NetworkAvailabilityChanged` events raised by the `NetworkChange` class. For detailed information on receiving notification for network interface address change events, see the `NetworkChange` class overview documentation.
