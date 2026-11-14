---
title: "PipeDirection enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipes/PipeDirection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PipeDirection enum

Namespace: `System.IO.Pipes`

```csharp
public enum PipeDirection
```

Specifies the direction of the pipe.

#### Remarks
Anonymous pipes must have a pipe direction of `In` or `Out`. `PipeDirection.InOut` is not supported by anonymous pipes because they are defined to be one-way only.

## PipeDirection.In field

```csharp
In
```

Specifies that the pipe direction is in.

## PipeDirection.InOut field

```csharp
InOut
```

Specifies that the pipe direction is two-way.

## PipeDirection.Out field

```csharp
Out
```

Specifies that the pipe direction is out.
