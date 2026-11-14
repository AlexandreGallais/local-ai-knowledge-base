---
title: "ReadState enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/ReadState.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReadState enum

Namespace: `System.Xml`

```csharp
public enum ReadState
```

Specifies the state of the reader.

To be added.

## ReadState.Closed field

```csharp
Closed
```

The `XmlReader.Close` method has been called.

## ReadState.EndOfFile field

```csharp
EndOfFile
```

The end of the file has been reached successfully.

## ReadState.Error field

```csharp
Error
```

An error occurred that prevents the read operation from continuing.

## ReadState.Initial field

```csharp
Initial
```

The `Read` method has not been called.

## ReadState.Interactive field

```csharp
Interactive
```

The `Read` method has been called. Additional methods may be called on the reader.
