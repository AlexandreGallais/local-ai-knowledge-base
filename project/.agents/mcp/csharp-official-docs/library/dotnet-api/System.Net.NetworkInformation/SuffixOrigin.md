---
title: "SuffixOrigin enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/SuffixOrigin.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SuffixOrigin enum

Namespace: `System.Net.NetworkInformation`

```csharp
public enum SuffixOrigin
```

Specifies how an IP address host suffix was located.

#### Remarks
IP addresses are divided into two parts: the prefix and the suffix. The address prefix identifies the network portion of an IP address, and the address suffix identifies the host portion. Prefixes are assigned by global authorities, and suffixes are assigned by local system administrators.

This enumeration is used by the `UnicastIPAddressInformation` class. Instances of this class are returned when you retrieve the unicast address information for a `NetworkInterface` object.

#### Examples
The following code example displays prefix and suffix information for unicast addresses.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## SuffixOrigin.LinkLayerAddress field

```csharp
LinkLayerAddress
```

The suffix is a link-local suffix.

## SuffixOrigin.Manual field

```csharp
Manual
```

The suffix was manually configured.

## SuffixOrigin.OriginDhcp field

```csharp
OriginDhcp
```

The suffix was supplied by a Dynamic Host Configuration Protocol (DHCP) server.

## SuffixOrigin.Other field

```csharp
Other
```

The suffix was located using an unspecified source.

## SuffixOrigin.Random field

```csharp
Random
```

The suffix was randomly assigned.

## SuffixOrigin.WellKnown field

```csharp
WellKnown
```

The suffix is a well-known suffix. Well-known suffixes are specified in standard-track Request for Comments (RFC) documents and assigned by the Internet Assigned Numbers Authority (Iana) or an address registry. Such suffixes are reserved for special purposes.
