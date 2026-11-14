---
title: "NetworkInterfaceComponent enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/NetworkInterfaceComponent.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NetworkInterfaceComponent enum

Namespace: `System.Net.NetworkInformation`

```csharp
public enum NetworkInterfaceComponent
```

Specifies the Internet Protocol versions that are supported by a network interface.

#### Remarks
The values in this enumeration are used by the `NetworkInterface.Supports` method to specify the Internet Protocol version supported by a network interface.

#### Examples
The following code example checks whether a network interface supports IPv4.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## NetworkInterfaceComponent.IPv4 field

```csharp
IPv4
```

Internet Protocol version 4.

## NetworkInterfaceComponent.IPv6 field

```csharp
IPv6
```

Internet Protocol version 6.
