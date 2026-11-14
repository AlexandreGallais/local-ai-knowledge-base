---
title: "FileStream class (part 7 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileStream class (part 7 of 7)

## FileStream.WriteByte(Byte) method

```csharp
public override void WriteByte (byte value);
```

Writes a byte to the current position in the file stream.

Parameters:

- `value`: A byte to write to the stream.

Exceptions:

- `ObjectDisposedException`: The stream is closed.
- `NotSupportedException`: The stream does not support writing.
- `IOException`: .NET 8 and later versions: The underlying pipe is closed or disconnected.

#### Remarks
This method overrides `Stream.WriteByte`.

Use `WriteByte` to write a byte to a `FileStream` efficiently. If the stream is closed or not writable, an exception will be thrown.

> **Note:**
> Use the `CanWrite` property to determine whether the current instance supports writing. For additional information, see `Stream.CanWrite`.

#### Examples
The following code example shows how to write data to a file, byte by byte, and then verify that the data was written correctly.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/.ctor/source.cs._
