---
title: "BinaryReader class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/BinaryReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BinaryReader class (part 2 of 3)

## BinaryReader.Read7BitEncodedInt64() method

```csharp
public long Read7BitEncodedInt64 ();
```

Reads a number 7 bits at a time.

Returns: The number that is read from this binary reader instance.

To be added.

## BinaryReader.ReadBoolean() method

```csharp
public virtual bool ReadBoolean ();
```

Reads a `Boolean` value from the current stream and advances the current position of the stream by one byte.

Returns: `true` if the byte is nonzero; otherwise, `false`.

Exceptions:

- `EndOfStreamException`: The end of the stream is reached.
- `ObjectDisposedException`: The stream is closed.
- `IOException`: An I/O error occurred.

#### Remarks
`BinaryReader` does not restore the file position after an unsuccessful read.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example demonstrates how to store and retrieve application settings in a file.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/Overview/source.cs._

## BinaryReader.ReadByte() method

```csharp
public virtual byte ReadByte ();
```

Reads the next byte from the current stream and advances the current position of the stream by one byte.

Returns: The next byte read from the current stream.

Exceptions:

- `EndOfStreamException`: The end of the stream is reached.
- `ObjectDisposedException`: The stream is closed.
- `IOException`: An I/O error occurred.

#### Remarks
`BinaryReader` does not restore the file position after an unsuccessful read.

Because of data formatting conflicts, using this method with the following encodings is not recommended:

- UTF-7

- ISO-2022-JP

- ISCII

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example shows how to write binary data using memory as a backing store, and then verify that the data was written correctly.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/ReadByte/rwbyte.cs._

## BinaryReader.ReadBytes(Int32) method

```csharp
public virtual byte[] ReadBytes (int count);
```

Reads the specified number of bytes from the current stream into a byte array and advances the current position by that number of bytes.

Parameters:

- `count`: The number of bytes to read. This value must be 0 or a non-negative number or an exception will occur.

Returns: A byte array containing data read from the underlying stream. This might be less than the number of bytes requested if the end of the stream is reached.

Exceptions:

- `ArgumentException`: The number of decoded characters to read is greater than `count`. This can happen if a Unicode decoder returns fallback characters or a surrogate pair.
- `IOException`: An I/O error occurred.
- `ObjectDisposedException`: The stream is closed.
- `ArgumentOutOfRangeException`: `count` is negative.

#### Remarks
`BinaryReader` does not restore the file position after an unsuccessful read operation.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example shows how to write binary data using memory as a backing store, and then verify that the data was written correctly.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/ReadBytes/rwbytes.cs._

This example reads the contents of a file and displays it to the console as dump text. The end of the file that is being read is detected when the length of the `Byte` array returned from `BinaryReader.ReadBytes` is zero.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/Overview/source5.cs._

## BinaryReader.ReadChar() method

```csharp
public virtual char ReadChar ();
```

Reads the next character from the current stream and advances the current position of the stream in accordance with the `Encoding` used and the specific character being read from the stream.

Returns: A character read from the current stream.

Exceptions:

- `EndOfStreamException`: The end of the stream is reached.
- `ObjectDisposedException`: The stream is closed.
- `IOException`: An I/O error occurred.
- `ArgumentException`: A surrogate character was read.

#### Remarks
If the `BinaryReader.ReadChar` method attempts to read a surrogate character in the stream an exception will be raised and the position in the stream will advance. The position is restored to the original location before `BinaryReader.ReadChar` was called if the stream is seekable; however, if the stream is unseekable, the position will not be corrected. If surrogate characters can be expected in the stream, use the `BinaryReader.ReadChars` method instead.

Because of data formatting conflicts, using this method with the following encodings is not recommended:

- UTF-7

- ISO-2022-JP

- ISCII

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example shows how to read and write data using memory as a backing store.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/ReadChar/rwchar.cs._

## BinaryReader.ReadChars(Int32) method

```csharp
public virtual char[] ReadChars (int count);
```

Reads the specified number of characters from the current stream, returns the data in a character array, and advances the current position in accordance with the `Encoding` used and the specific character being read from the stream.

Parameters:

- `count`: The number of characters to read.

Returns: A character array containing data read from the underlying stream. This might be less than the number of characters requested if the end of the stream is reached.

Exceptions:

- `ArgumentException`: The number of decoded characters to read is greater than `count`. This can happen if a Unicode decoder returns fallback characters or a surrogate pair.
- `ObjectDisposedException`: The stream is closed.
- `IOException`: An I/O error occurred.
- `ArgumentOutOfRangeException`: `count` is negative.

#### Remarks
`BinaryReader` does not restore the file position after an unsuccessful read operation.

When reading from network streams, in some rare cases, the `BinaryReader.ReadChars` method might read an extra character from the stream if the `BinaryReader` was constructed with Unicode encoding. If this occurs, you can use the `BinaryReader.ReadBytes` method to read a fixed-length byte array, and then pass that array to the `BinaryReader.ReadChars` method.

#### Examples
The following code example shows how to read and write data using memory as a backing store.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/ReadChars/rwchars.cs._

## BinaryReader.ReadDecimal() method

```csharp
public virtual decimal ReadDecimal ();
```

Reads a decimal value from the current stream and advances the current position of the stream by sixteen bytes.

Returns: A decimal value read from the current stream.

Exceptions:

- `EndOfStreamException`: The end of the stream is reached.
- `ObjectDisposedException`: The stream is closed.
- `IOException`: An I/O error occurred.

#### Remarks
`BinaryReader` does not restore the file position after an unsuccessful read.

For a list of common I/O tasks, see Common I/O Tasks.

## BinaryReader.ReadDouble() method

```csharp
public virtual double ReadDouble ();
```

Reads an 8-byte floating point value from the current stream and advances the current position of the stream by eight bytes.

Returns: An 8-byte floating point value read from the current stream.

Exceptions:

- `EndOfStreamException`: The end of the stream is reached.
- `ObjectDisposedException`: The stream is closed.
- `IOException`: An I/O error occurred.

#### Remarks
`BinaryReader` does not restore the file position after an unsuccessful read.

`BinaryReader` reads this data type in little-endian format.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example shows how to read and write `Double` data to memory by using the `BinaryReader` and `BinaryWriter` classes on top of the `MemoryStream` class. `MemoryStream` only reads and writes `Byte` data.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/BaseStream/rwdouble.cs._

## BinaryReader.ReadExactly(Byte>) method

```csharp
public virtual void ReadExactly (Span<byte> buffer);
```

Reads bytes from the current stream and advances the position within the stream until the `buffer` is filled.

Parameters:

- `buffer`: A region of memory. When this method returns, the contents of this region are replaced by the bytes read from the current stream.

Exceptions:

- `ObjectDisposedException`: The stream is closed.
- `IOException`: An I/O error occurred.
- `EndOfStreamException`: The end of the stream is reached before filling the `buffer`.

When `buffer` is empty, this read operation will be completed without waiting for available data in the stream.

## BinaryReader.ReadHalf() method

```csharp
public virtual Half ReadHalf ();
```

Reads a 2-byte floating point value from the current stream and advances the current position of the stream by two bytes.

Returns: A 2-byte floating point value read from the current stream.

Exceptions:

- `EndOfStreamException`: The end of the stream is reached.
- `ObjectDisposedException`: The stream is closed.
- `IOException`: An I/O error occurred.

#### Remarks
`BinaryReader` does not restore the file position after an unsuccessful read.

`BinaryReader` reads this data type in little-endian format.

For a list of common I/O tasks, see Common I/O Tasks.

## BinaryReader.ReadInt16() method

```csharp
public virtual short ReadInt16 ();
```

Reads a 2-byte signed integer from the current stream and advances the current position of the stream by two bytes.

Returns: A 2-byte signed integer read from the current stream.

Exceptions:

- `EndOfStreamException`: The end of the stream is reached.
- `ObjectDisposedException`: The stream is closed.
- `IOException`: An I/O error occurred.

#### Remarks
`BinaryReader` does not restore the file position after an unsuccessful read.

`BinaryReader` reads this data type in little-endian format.

For a list of common I/O tasks, see Common I/O Tasks.

## BinaryReader.ReadInt32() method

```csharp
public virtual int ReadInt32 ();
```

Reads a 4-byte signed integer from the current stream and advances the current position of the stream by four bytes.

Returns: A 4-byte signed integer read from the current stream.

Exceptions:

- `EndOfStreamException`: The end of the stream is reached.
- `ObjectDisposedException`: The stream is closed.
- `IOException`: An I/O error occurred.

#### Remarks
`BinaryReader` does not restore the file position after an unsuccessful read.

`BinaryReader` reads this data type in little-endian format.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example demonstrates how to store and retrieve application settings in a file.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/Overview/source.cs._

## BinaryReader.ReadInt64() method

```csharp
public virtual long ReadInt64 ();
```

Reads an 8-byte signed integer from the current stream and advances the current position of the stream by eight bytes.

Returns: An 8-byte signed integer read from the current stream.

Exceptions:

- `EndOfStreamException`: The end of the stream is reached.
- `ObjectDisposedException`: The stream is closed.
- `IOException`: An I/O error occurred.

#### Remarks
`BinaryReader` does not restore the file position after an unsuccessful read.

`BinaryReader` reads this data type in little-endian format.

For a list of common I/O tasks, see Common I/O Tasks.

## BinaryReader.ReadSByte() method

```csharp
public virtual sbyte ReadSByte ();
```

Reads a signed byte from this stream and advances the current position of the stream by one byte.

Returns: A signed byte read from the current stream.

Exceptions:

- `EndOfStreamException`: The end of the stream is reached.
- `ObjectDisposedException`: The stream is closed.
- `IOException`: An I/O error occurred.

#### Remarks
`BinaryReader` does not restore the file position after an unsuccessful read.

For a list of common I/O tasks, see Common I/O Tasks.

## BinaryReader.ReadSingle() method

```csharp
public virtual float ReadSingle ();
```

Reads a 4-byte floating point value from the current stream and advances the current position of the stream by four bytes.

Returns: A 4-byte floating point value read from the current stream.

Exceptions:

- `EndOfStreamException`: The end of the stream is reached.
- `ObjectDisposedException`: The stream is closed.
- `IOException`: An I/O error occurred.

#### Remarks
`BinaryReader` does not restore the file position after an unsuccessful read.

`BinaryReader` reads this data type in little-endian format.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example demonstrates how to store and retrieve application settings in a file.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/Overview/source.cs._

## BinaryReader.ReadString() method

```csharp
public virtual string ReadString ();
```

Reads a string from the current stream. The string is prefixed with the length, encoded as an integer seven bits at a time.

Returns: The string being read.

Exceptions:

- `EndOfStreamException`: The end of the stream is reached.
- `ObjectDisposedException`: The stream is closed.
- `IOException`: An I/O error occurred.

#### Remarks
`BinaryReader` does not restore the file position after an unsuccessful read.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example demonstrates how to store and retrieve application settings in a file.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/Overview/source.cs._

## BinaryReader.ReadUInt16() method

```csharp
public virtual ushort ReadUInt16 ();
```

Reads a 2-byte unsigned integer from the current stream using little-endian encoding and advances the position of the stream by two bytes.

Returns: A 2-byte unsigned integer read from this stream.

Exceptions:

- `EndOfStreamException`: The end of the stream is reached.
- `ObjectDisposedException`: The stream is closed.
- `IOException`: An I/O error occurred.

#### Remarks
`BinaryReader` does not restore the file position after an unsuccessful read.

`BinaryReader` reads this data type in little-endian format.

For a list of common I/O tasks, see Common I/O Tasks.

## BinaryReader.ReadUInt32() method

```csharp
public virtual uint ReadUInt32 ();
```

Reads a 4-byte unsigned integer from the current stream and advances the position of the stream by four bytes.

Returns: A 4-byte unsigned integer read from this stream.

Exceptions:

- `EndOfStreamException`: The end of the stream is reached.
- `ObjectDisposedException`: The stream is closed.
- `IOException`: An I/O error occurred.

#### Remarks
`BinaryReader` does not restore the file position after an unsuccessful read.

`BinaryReader` reads this data type in little-endian format.

For a list of common I/O tasks, see Common I/O Tasks.
