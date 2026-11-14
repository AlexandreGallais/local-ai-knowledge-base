---
title: "PipeOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipes/PipeOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PipeOptions enum

Namespace: `System.IO.Pipes`

```csharp
public enum PipeOptions
```

Provides options for creating a `PipeStream` object. This enumeration has a `FlagsAttribute` attribute that allows a bitwise combination of its member values.

#### Remarks
Use the `PipeOptions` enumeration to specify advanced pipe options.

## PipeOptions.Asynchronous field

```csharp
Asynchronous
```

Indicates that the pipe can be used for asynchronous reading and writing.

## PipeOptions.CurrentUserOnly field

```csharp
CurrentUserOnly
```

When used to create a `NamedPipeServerStream` instance, indicates that the pipe can only be connected to a client created by the same user. When used to create a `NamedPipeClientStream` instance, indicates that the pipe can only connect to a server created by the same user. On Windows, it verifies both the user account and elevation level.

## PipeOptions.FirstPipeInstance field

```csharp
FirstPipeInstance
```

To be added.

## PipeOptions.None field

```csharp
None
```

Indicates that there are no additional parameters.

## PipeOptions.WriteThrough field

```csharp
WriteThrough
```

Indicates that the system should write through any intermediate cache and go directly to the pipe.
