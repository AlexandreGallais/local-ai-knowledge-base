---
title: "NetBiosNodeType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/NetBiosNodeType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NetBiosNodeType enum

Namespace: `System.Net.NetworkInformation`

```csharp
public enum NetBiosNodeType
```

Specifies the Network Basic <example-value> System (NetBIOS) node type.

#### Remarks
The node type determines the way in which NetBIOS names are resolved to Internet Protocol (IP) addresses. The following table shows the name resolution method for each node type.

|Node type|Resolve name to IP address|
|---------------|--------------------------------|
|Broadcast|Uses NetBIOS name queries.|
|Peer2Peer|Uses a NetBIOS name server (NBNS), for example, Windows Internet Name Service (WINS).|
|Mixed|Attempts to resolve by first using NetBIOS name queries and then using an NBNS.|
|Hybrid|Attempts to resolve by first using an NBNS and then using a NetBIOS name query.|

This enumeration is used to specify values for the `NodeType` property.

## NetBiosNodeType.Broadcast field

```csharp
Broadcast
```

A broadcast node.

## NetBiosNodeType.Hybrid field

```csharp
Hybrid
```

A hybrid node.

## NetBiosNodeType.Mixed field

```csharp
Mixed
```

A mixed node.

## NetBiosNodeType.Peer2Peer field

```csharp
Peer2Peer
```

A peer-to-peer node.

## NetBiosNodeType.Unknown field

```csharp
Unknown
```

An unknown node type.
