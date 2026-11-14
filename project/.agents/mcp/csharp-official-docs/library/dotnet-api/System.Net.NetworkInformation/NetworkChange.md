---
title: "NetworkChange class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/NetworkChange.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NetworkChange class

Namespace: `System.Net.NetworkInformation`

```csharp
public class NetworkChange
```

Allows applications to receive notification when the Internet Protocol (IP) address of a network interface, also called a network card or adapter, changes.

#### Remarks
The `NetworkChange` class provides address change notification by raising `NetworkAddressChanged` events. An interface address can change for many reasons, such as a disconnected network cable, moving out of range of a wireless Local Area Network, or hardware failure.

To receive notification, you must identify your application's event handlers, which are one or more methods that perform your application-specific tasks each time the event is raised. To have a `NetworkChange` object call your event-handling methods when a `NetworkAddressChanged` event occurs, you must associate the methods with a `NetworkAddressChangedEventHandler` delegate, and add this delegate to the event.

#### Examples
The following code example listens for address changes and displays the status of network interfaces when a `NetworkAddressChanged` event occurs.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/NetworkChange/Overview/changed.cs._

## NetworkChange.NetworkChange() constructor

```csharp
public NetworkChange ();
```

Initializes a new instance of the `NetworkChange` class.

To be added.

## NetworkChange.IsSupported property

```csharp
public static bool IsSupported { get; }
```

To be added.

Returns: To be added.

To be added.

## NetworkChange.RegisterNetworkChange(NetworkChange) method

```csharp
public static void RegisterNetworkChange (System.Net.NetworkInformation.NetworkChange nc);
```

Registers a network change instance to receive network change events.

Parameters:

- `nc`: The instance to register.

To be added.

## NetworkChange.NetworkAddressChanged event

```csharp
public static event System.Net.NetworkInformation.NetworkAddressChangedEventHandler? NetworkAddressChanged;
```

Occurs when the IP address of a network interface changes.

#### Remarks
The `NetworkChange` class raises `NetworkAddressChanged` events when the address of a network interface, also called a network card or adapter, changes.

To have a `NetworkChange` object call an event-handling method when a `NetworkAddressChanged` event occurs, you must associate the method with a `NetworkAddressChangedEventHandler` delegate, and add this delegate to this event.

#### Examples
The following code example listens for address changes and displays the status of network interfaces when a `NetworkAddressChanged` event occurs.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/NetworkChange/Overview/changed.cs._

## NetworkChange.NetworkAvailabilityChanged event

```csharp
public static event System.Net.NetworkInformation.NetworkAvailabilityChangedEventHandler? NetworkAvailabilityChanged;
```

Occurs when the availability of the network changes.

#### Remarks
The `NetworkChange` class raises `NetworkAvailabilityChanged` events when the availability of the network changes. The network is available when at least one network interface is marked "up" and is not a tunnel or loopback interface.

To have a `NetworkChange` object call an event-handling method when a `NetworkAvailabilityChanged` event occurs, you must associate the method with a `NetworkAvailabilityChangedEventHandler` delegate, and add this delegate to this event.
