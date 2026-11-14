---
title: "PrefixOrigin enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/PrefixOrigin.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PrefixOrigin enum

Namespace: `System.Net.NetworkInformation`

```csharp
public enum PrefixOrigin
```

Specifies how an IP address network prefix was located.

#### Remarks
IP addresses are divided into two parts: the prefix and the suffix. The address prefix identifies the network portion of an IP address, and the address suffix identifies the host portion. Prefixes are assigned by global authorities, and suffixes are assigned by local system administrators.

This enumeration is used by the `UnicastIPAddressInformation` and `MulticastIPAddressInformation` classes. Instances of this class are returned when you retrieve the address information for a `NetworkInterface` object.

#### Examples
The following code example displays prefix and suffix information for unicast addresses.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## PrefixOrigin.Dhcp field

```csharp
Dhcp
```

The prefix was supplied by a Dynamic Host Configuration Protocol (DHCP) server.

## PrefixOrigin.Manual field

```csharp
Manual
```

The prefix was manually configured.

## PrefixOrigin.Other field

```csharp
Other
```

The prefix was located using an unspecified source.

## PrefixOrigin.RouterAdvertisement field

```csharp
RouterAdvertisement
```

The prefix was supplied by a router advertisement.

## PrefixOrigin.WellKnown field

```csharp
WellKnown
```

The prefix is a well-known prefix. Well-known prefixes are specified in standard-track Request for Comments (RFC) documents and assigned by the Internet Assigned Numbers Authority (Iana) or an address registry. Such prefixes are reserved for special purposes.
