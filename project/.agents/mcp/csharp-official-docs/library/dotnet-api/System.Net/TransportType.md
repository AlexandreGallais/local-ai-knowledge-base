---
title: "TransportType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/TransportType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TransportType enum

Namespace: `System.Net`

```csharp
public enum TransportType
```

Defines transport types for the `SocketPermission` and `Socket` classes.

#### Remarks
The `TransportType` enumeration defines transport types for the `SocketPermission` and `Socket` classes.

## TransportType.All field

```csharp
All
```

All transport types.

## TransportType.Connectionless field

```csharp
Connectionless
```

The transport type is connectionless, such as UDP. Specifying this value has the same effect as specifying `TransportType.Udp`.

## TransportType.ConnectionOriented field

```csharp
ConnectionOriented
```

The transport is connection oriented, such as TCP. Specifying this value has the same effect as specifying `TransportType.Tcp`.

## TransportType.Tcp field

```csharp
Tcp
```

TCP transport.

## TransportType.Udp field

```csharp
Udp
```

UDP transport.
