---
title: "OperationalStatus enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/OperationalStatus.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OperationalStatus enum

Namespace: `System.Net.NetworkInformation`

```csharp
public enum OperationalStatus
```

Specifies the operational state of a network interface.

#### Remarks
This enumeration defines valid values for the `OperationalStatus` property.

#### Examples
The following code example displays a summary for all interfaces on the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## OperationalStatus.Dormant field

```csharp
Dormant
```

The network interface is not in a condition to transmit data packets; it is waiting for an external event.

## OperationalStatus.Down field

```csharp
Down
```

The network interface is unable to transmit data packets.

## OperationalStatus.LowerLayerDown field

```csharp
LowerLayerDown
```

The network interface is unable to transmit data packets because it runs on top of one or more other interfaces, and at least one of these "lower layer" interfaces is down.

## OperationalStatus.NotPresent field

```csharp
NotPresent
```

The network interface is unable to transmit data packets because of a missing component, typically a hardware component.

## OperationalStatus.Testing field

```csharp
Testing
```

The network interface is running tests.

## OperationalStatus.Unknown field

```csharp
Unknown
```

The network interface status is not known.

## OperationalStatus.Up field

```csharp
Up
```

The network interface is up; it can transmit data packets.
