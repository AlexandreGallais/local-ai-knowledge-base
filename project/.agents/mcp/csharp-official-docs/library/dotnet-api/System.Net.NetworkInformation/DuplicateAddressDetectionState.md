---
title: "DuplicateAddressDetectionState enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/DuplicateAddressDetectionState.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DuplicateAddressDetectionState enum

Namespace: `System.Net.NetworkInformation`

```csharp
public enum DuplicateAddressDetectionState
```

Specifies the current state of an IP address.

#### Remarks
To help ensure that all interfaces on a network have a unique address, the interface host is responsible for running a "duplicate address detection" algorithm on unicast addresses. The purpose of this algorithm is to attempt to prevent non-unique addresses on the network. This process is defined in IETF RFC 1971.

This enumeration is used by the `UnicastIPAddressInformation` and `MulticastIPAddressInformation` classes. Instances of this class are returned when you retrieve the unicast address information for a `NetworkInterface` object.

#### Examples
The following code example determines unicast address information.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## DuplicateAddressDetectionState.Deprecated field

```csharp
Deprecated
```

The address is valid, but it is nearing its lease lifetime and should not be used by applications.

## DuplicateAddressDetectionState.Duplicate field

```csharp
Duplicate
```

The address is not unique. This address should not be assigned to the network interface.

## DuplicateAddressDetectionState.Invalid field

```csharp
Invalid
```

The address is not valid. A nonvalid address is expired and no longer assigned to an interface; applications should not send data packets to it.

## DuplicateAddressDetectionState.Preferred field

```csharp
Preferred
```

The address is valid and its use is unrestricted.

## DuplicateAddressDetectionState.Tentative field

```csharp
Tentative
```

The duplicate address detection procedure's evaluation of the address has not completed successfully. Applications should not use the address because it is not yet valid and packets sent to it are discarded.
