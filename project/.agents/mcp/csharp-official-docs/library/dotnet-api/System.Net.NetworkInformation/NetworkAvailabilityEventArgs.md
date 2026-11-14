---
title: "NetworkAvailabilityEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/NetworkAvailabilityEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NetworkAvailabilityEventArgs class

Namespace: `System.Net.NetworkInformation`

```csharp
public class NetworkAvailabilityEventArgs : EventArgs
```

Provides data for the `NetworkChange.NetworkAvailabilityChanged` event.

#### Remarks
Instances of this class are passed to a `NetworkAvailabilityChangedEventHandler` method that is called when the status of the network changes.

## NetworkAvailabilityEventArgs.IsAvailable property

```csharp
public bool IsAvailable { get; }
```

Gets the current status of the network connection.

Returns: `true` if the network is available; otherwise, `false`.

To be added.
