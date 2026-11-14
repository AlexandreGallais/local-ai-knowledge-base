---
title: "BinaryReader class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/BinaryReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BinaryReader class (part 3 of 3)

## BinaryReader.ReadUInt64() method

```csharp
public virtual ulong ReadUInt64 ();
```

Reads an 8-byte unsigned integer from the current stream and advances the position of the stream by eight bytes.

Returns: An 8-byte unsigned integer read from this stream.

Exceptions:

- `EndOfStreamException`: The end of the stream is reached.
- `IOException`: An I/O error occurred.
- `ObjectDisposedException`: The stream is closed.

#### Remarks
`BinaryReader` does not restore the file position after an unsuccessful read.

`BinaryReader` reads this data type in little-endian format.

For a list of common I/O tasks, see Common I/O Tasks.
