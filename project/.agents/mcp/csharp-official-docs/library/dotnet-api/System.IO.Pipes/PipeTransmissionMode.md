---
title: "PipeTransmissionMode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipes/PipeTransmissionMode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PipeTransmissionMode enum

Namespace: `System.IO.Pipes`

```csharp
public enum PipeTransmissionMode
```

Specifies the transmission mode of the pipe.

#### Remarks
Anonymous pipes do not support the Message transmission mode.

## PipeTransmissionMode.Byte field

```csharp
Byte
```

Indicates that data in the pipe is transmitted and read as a stream of bytes.

## PipeTransmissionMode.Message field

```csharp
Message
```

Indicates that data in the pipe is transmitted and read as a stream of messages.
