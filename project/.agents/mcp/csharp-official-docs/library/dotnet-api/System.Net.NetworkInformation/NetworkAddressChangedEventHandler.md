---
title: "NetworkAddressChangedEventHandler delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/NetworkAddressChangedEventHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NetworkAddressChangedEventHandler delegate

Namespace: `System.Net.NetworkInformation`

```csharp
public delegate void NetworkAddressChangedEventHandler(object? sender, EventArgs e);
```

References one or more methods to be called when the address of a network interface changes.

Parameters:

- `sender`: The source of the event.
- `e`: An `EventArgs` object that contains data about the event.

#### Remarks
This delegate handles `NetworkAddressChanged` events raised by the `NetworkChange` class. For detailed information on receiving notification for network interface address change events, see the `NetworkChange` class overview documentation.

#### Examples
The following code example listens for address changes and displays the status of network interfaces when a `NetworkAddressChanged` event occurs.
