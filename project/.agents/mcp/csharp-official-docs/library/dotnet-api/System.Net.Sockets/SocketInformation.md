---
title: "SocketInformation struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/SocketInformation.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SocketInformation struct

Namespace: `System.Net.Sockets`

```csharp
public struct SocketInformation
```

Encapsulates the information that is necessary to duplicate a `Socket`.

#### Remarks
`Socket.DuplicateAndClose` creates a `SocketInformation` instance for use with the `%23ctor` constructor.

## SocketInformation.Options property

```csharp
public System.Net.Sockets.SocketInformationOptions Options { get; set; }
```

Gets or sets the options for a `Socket`.

Returns: A `SocketInformationOptions` instance.

#### Remarks
Options include `Connected`, `Listening`, `NonBlocking`, and `UseOnlyOverlappedIO`.

## SocketInformation.ProtocolInformation property

```csharp
public byte[] ProtocolInformation { get; set; }
```

Gets or sets the protocol information for a `Socket`.

Returns: An array of type `Byte`.

To be added.
