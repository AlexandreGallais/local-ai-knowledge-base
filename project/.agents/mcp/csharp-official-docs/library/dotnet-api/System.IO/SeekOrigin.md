---
title: "SeekOrigin enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/SeekOrigin.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SeekOrigin enum

Namespace: `System.IO`

```csharp
public enum SeekOrigin
```

Specifies the position in a stream to use for seeking.

#### Remarks
`SeekOrigin` is used by the `Seek` methods of `Stream`, `BufferedStream`, `FileStream`, `MemoryStream`, `BinaryWriter`, and other classes. The `Seek` methods take an offset parameter that is relative to the position specified by `SeekOrigin`.

#### Examples
The following example shows how to read backwards starting at the end of the stream, and how to read from a specified point in the stream.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/Seek/source.cs._

## SeekOrigin.Begin field

```csharp
Begin
```

Specifies the beginning of a stream.

## SeekOrigin.Current field

```csharp
Current
```

Specifies the current position within a stream.

## SeekOrigin.End field

```csharp
End
```

Specifies the end of a stream.
