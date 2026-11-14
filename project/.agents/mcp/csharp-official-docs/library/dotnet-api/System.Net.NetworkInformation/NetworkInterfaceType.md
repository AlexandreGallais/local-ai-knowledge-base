---
title: "NetworkInterfaceType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/NetworkInterfaceType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NetworkInterfaceType enum

Namespace: `System.Net.NetworkInformation`

```csharp
public enum NetworkInterfaceType
```

Specifies types of network interfaces.

#### Remarks
Network interfaces, also known as network adapters, connect a computer to a network. The interface type defines the transmission media that provides network connectivity.

This enumeration defines the values returned by the `NetworkInterfaceType` property.

## NetworkInterfaceType.AsymmetricDsl field

```csharp
AsymmetricDsl
```

The network interface uses an Asymmetric Digital Subscriber Line (ADSL).

## NetworkInterfaceType.Atm field

```csharp
Atm
```

The network interface uses asynchronous transfer mode (ATM) for data transmission.

## NetworkInterfaceType.BasicIsdn field

```csharp
BasicIsdn
```

The network interface uses a basic rate interface Integrated Services Digital Network (ISDN) connection. ISDN is a set of standards for data transmission over telephone lines.

## NetworkInterfaceType.Ethernet field

```csharp
Ethernet
```

The network interface uses an Ethernet connection. Ethernet is defined in IEEE standard 802.3.

## NetworkInterfaceType.Ethernet3Megabit field

```csharp
Ethernet3Megabit
```

The network interface uses an Ethernet 3 megabit/second connection. This version of Ethernet is defined in IETF RFC 895.

## NetworkInterfaceType.FastEthernetFx field

```csharp
FastEthernetFx
```

The network interface uses a Fast Ethernet connection over optical fiber and provides a data rate of 100 megabits per second. This type of connection is also known as 100Base-FX.

## NetworkInterfaceType.FastEthernetT field

```csharp
FastEthernetT
```

The network interface uses a Fast Ethernet connection over twisted pair and provides a data rate of 100 megabits per second. This type of connection is also known as 100Base-T.

## NetworkInterfaceType.Fddi field

```csharp
Fddi
```

The network interface uses a Fiber Distributed Data Interface (FDDI) connection. FDDI is a set of standards for data transmission on fiber optic lines in a local area network.

## NetworkInterfaceType.GenericModem field

```csharp
GenericModem
```

The network interface uses a modem.

## NetworkInterfaceType.GigabitEthernet field

```csharp
GigabitEthernet
```

The network interface uses a gigabit Ethernet connection and provides a data rate of 1,000 megabits per second (1 gigabit per second).

## NetworkInterfaceType.HighPerformanceSerialBus field

```csharp
HighPerformanceSerialBus
```

The network interface uses a High Performance Serial Bus.

## NetworkInterfaceType.IPOverAtm field

```csharp
IPOverAtm
```

The network interface uses the Internet Protocol (IP) in combination with asynchronous transfer mode (ATM) for data transmission.

## NetworkInterfaceType.Isdn field

```csharp
Isdn
```

The network interface uses a connection configured for ISDN and the X.25 protocol. X.25 allows computers on public networks to communicate using an intermediary computer.

## NetworkInterfaceType.Loopback field

```csharp
Loopback
```

The network interface is a loopback adapter. Such interfaces are often used for testing; no traffic is sent over the wire.

## NetworkInterfaceType.MultiRateSymmetricDsl field

```csharp
MultiRateSymmetricDsl
```

The network interface uses a Multirate Digital Subscriber Line.

## NetworkInterfaceType.Ppp field

```csharp
Ppp
```

The network interface uses a Point-To-Point protocol (PPP) connection. PPP is a protocol for data transmission using a serial device.

## NetworkInterfaceType.PrimaryIsdn field

```csharp
PrimaryIsdn
```

The network interface uses a primary rate interface Integrated Services Digital Network (ISDN) connection. ISDN is a set of standards for data transmission over telephone lines.

## NetworkInterfaceType.RateAdaptDsl field

```csharp
RateAdaptDsl
```

The network interface uses a Rate Adaptive Digital Subscriber Line (RADSL).

## NetworkInterfaceType.Slip field

```csharp
Slip
```

The network interface uses a Serial Line Internet Protocol (SLIP) connection. SLIP is defined in IETF RFC 1055.

## NetworkInterfaceType.SymmetricDsl field

```csharp
SymmetricDsl
```

The network interface uses a Symmetric Digital Subscriber Line (SDSL).

## NetworkInterfaceType.TokenRing field

```csharp
TokenRing
```

The network interface uses a Token-Ring connection. Token-Ring is defined in IEEE standard 802.5.

## NetworkInterfaceType.Tunnel field

```csharp
Tunnel
```

The network interface uses a tunnel connection.

## NetworkInterfaceType.Unknown field

```csharp
Unknown
```

The interface type is not known.

## NetworkInterfaceType.VeryHighSpeedDsl field

```csharp
VeryHighSpeedDsl
```

The network interface uses a Very High Data Rate Digital Subscriber Line (VDSL).

## NetworkInterfaceType.Wireless80211 field

```csharp
Wireless80211
```

The network interface uses a wireless LAN connection (IEEE 802.11 standard).

## NetworkInterfaceType.Wman field

```csharp
Wman
```

The network interface uses a mobile broadband interface for WiMax devices.

## NetworkInterfaceType.Wwanpp field

```csharp
Wwanpp
```

The network interface uses a mobile broadband interface for GSM-based devices.

## NetworkInterfaceType.Wwanpp2 field

```csharp
Wwanpp2
```

The network interface uses a mobile broadband interface for CDMA-based devices.
