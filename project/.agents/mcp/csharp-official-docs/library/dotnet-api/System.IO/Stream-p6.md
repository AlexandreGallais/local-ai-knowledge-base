---
title: "Stream class (part 6 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/Stream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Stream class (part 6 of 6)

## Stream.WriteByte(Byte) method

```csharp
public virtual void WriteByte (byte value);
```

Writes a byte to the current position in the stream and advances the position within the stream by one byte.

Parameters:

- `value`: The byte to write to the stream.

Exceptions:

- `IOException`: An I/O error occurs.
- `NotSupportedException`: The stream does not support writing, or the stream is already closed.
- `ObjectDisposedException`: Methods were called after the stream was closed.

#### Remarks
Use the `CanWrite` property to determine whether the current instance supports writing.

## Stream.Null field

```csharp
public static readonly System.IO.Stream Null;
```

A `Stream` with no backing store.

#### Remarks
Use `Null` to redirect output to a stream that will not consume any operating system resources. When the methods of `Stream` that provide writing are invoked on `Null`, the call simply returns, and no data is written. `Null` also implements a `Read` method that returns zero without reading data.
