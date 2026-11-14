---
title: "BinaryWriter class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/BinaryWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BinaryWriter class (part 2 of 2)

## BinaryWriter.Write(Half) method

```csharp
public virtual void Write (Half value);
```

Writes a two-byte floating-point value to the current stream and advances the stream position by two bytes.

Parameters:

- `value`: The two-byte floating-point value to write.

Exceptions:

- `IOException`: An I/O error occurs.
- `ObjectDisposedException`: The stream is closed.

#### Remarks
For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example shows how to read and write `Double` data to memory by using the `BinaryReader` and `BinaryWriter` classes on top of the `MemoryStream` class. `MemoryStream` only reads and writes `Byte` data.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/BaseStream/rwdouble.cs._

## BinaryWriter.Write(Int16) method

```csharp
public virtual void Write (short value);
```

Writes a two-byte signed integer to the current stream and advances the stream position by two bytes.

Parameters:

- `value`: The two-byte signed integer to write.

Exceptions:

- `IOException`: An I/O error occurs.
- `ObjectDisposedException`: The stream is closed.

#### Remarks
`BinaryWriter` stores this data type in little endian format.

The following table lists examples of other typical or related I/O tasks.

|To do this...|See the example in this topic...|
|-------------------|--------------------------------------|
|Create a text file.|How to: Write Text to a File|
|Write to a text file.|How to: Write Text to a File|
|Read from a text file.|How to: Read Text from a File|
|Append text to a file.|How to: Open and Append to a Log File `File.AppendText` `FileInfo.AppendText`|
|Get the size of a file.|`FileInfo.Length`|
|Get the attributes of a file.|`File.GetAttributes`|
|Set the attributes of a file.|`File.SetAttributes`|
|Determine if a file exists.|`File.Exists`|
|Read from a binary file.|How to: Read and Write to a Newly Created Data File|
|Write to a binary file.|How to: Read and Write to a Newly Created Data File|

## BinaryWriter.Write(Int32) method

```csharp
public virtual void Write (int value);
```

Writes a four-byte signed integer to the current stream and advances the stream position by four bytes.

Parameters:

- `value`: The four-byte signed integer to write.

Exceptions:

- `IOException`: An I/O error occurs.
- `ObjectDisposedException`: The stream is closed.

#### Remarks
`BinaryWriter` stores this data type in little endian format.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example demonstrates how to store and retrieve application settings in a file.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/Overview/source.cs._

## BinaryWriter.Write(Int64) method

```csharp
public virtual void Write (long value);
```

Writes an eight-byte signed integer to the current stream and advances the stream position by eight bytes.

Parameters:

- `value`: The eight-byte signed integer to write.

Exceptions:

- `IOException`: An I/O error occurs.
- `ObjectDisposedException`: The stream is closed.

#### Remarks
`BinaryWriter` stores this data type in little endian format.

For a list of common I/O tasks, see Common I/O Tasks.

## BinaryWriter.Write(Byte>) method

```csharp
public virtual void Write (ReadOnlySpan<byte> buffer);
```

Writes a span of bytes to the current stream.

Parameters:

- `buffer`: The span of bytes to write.

To be added.

## BinaryWriter.Write(Char>) method

```csharp
public virtual void Write (ReadOnlySpan<char> chars);
```

Writes a span of characters to the current stream, and advances the current position of the stream in accordance with the `Encoding` used and perhaps the specific characters being written to the stream.

Parameters:

- `chars`: A span of chars to write.

To be added.

## BinaryWriter.Write(SByte) method

```csharp
public virtual void Write (sbyte value);
```

Writes a signed byte to the current stream and advances the stream position by one byte.

Parameters:

- `value`: The signed byte to write.

Exceptions:

- `IOException`: An I/O error occurs.
- `ObjectDisposedException`: The stream is closed.

#### Remarks
For a list of common I/O tasks, see Common I/O Tasks.

## BinaryWriter.Write(Single) method

```csharp
public virtual void Write (float value);
```

Writes a four-byte floating-point value to the current stream and advances the stream position by four bytes.

Parameters:

- `value`: The four-byte floating-point value to write.

Exceptions:

- `IOException`: An I/O error occurs.
- `ObjectDisposedException`: The stream is closed.

#### Remarks
`BinaryWriter` stores this data type in little endian format.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example demonstrates how to store and retrieve application settings in a file.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/Overview/source.cs._

## BinaryWriter.Write(String) method

```csharp
public virtual void Write (string value);
```

Writes a length-prefixed string to this stream in the current encoding of the `BinaryWriter`, and advances the current position of the stream in accordance with the encoding used and the specific characters being written to the stream.

Parameters:

- `value`: The value to write.

Exceptions:

- `IOException`: An I/O error occurs.
- `ArgumentNullException`: `value` is `null`.
- `ObjectDisposedException`: The stream is closed.

#### Remarks
Length-prefixed means that this method first writes the length of the string, in bytes, when encoded with the `BinaryWriter` instance's current encoding to the stream. This value is written as an unsigned integer. This method then writes that many bytes to the stream.

For example, the string "A" has a length of 1, but when encoded with UTF-16; the length is 2 bytes, so the value written in the prefix is 2, and 3 bytes are written to the stream, including the prefix.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example demonstrates how to store and retrieve application settings in a file.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/Overview/source.cs._

## BinaryWriter.Write(UInt16) method

```csharp
public virtual void Write (ushort value);
```

Writes a two-byte unsigned integer to the current stream and advances the stream position by two bytes.

Parameters:

- `value`: The two-byte unsigned integer to write.

Exceptions:

- `IOException`: An I/O error occurs.
- `ObjectDisposedException`: The stream is closed.

#### Remarks
`BinaryWriter` stores this data type in little endian format.

For a list of common I/O tasks, see Common I/O Tasks.

## BinaryWriter.Write(UInt32) method

```csharp
public virtual void Write (uint value);
```

Writes a four-byte unsigned integer to the current stream and advances the stream position by four bytes.

Parameters:

- `value`: The four-byte unsigned integer to write.

Exceptions:

- `IOException`: An I/O error occurs.
- `ObjectDisposedException`: The stream is closed.

#### Remarks
`BinaryWriter` stores this data type in little endian format.

For a list of common I/O tasks, see Common I/O Tasks.

## BinaryWriter.Write(UInt64) method

```csharp
public virtual void Write (ulong value);
```

Writes an eight-byte unsigned integer to the current stream and advances the stream position by eight bytes.

Parameters:

- `value`: The eight-byte unsigned integer to write.

Exceptions:

- `IOException`: An I/O error occurs.
- `ObjectDisposedException`: The stream is closed.

#### Remarks
`BinaryWriter` stores this data type in little endian format.

For a list of common I/O tasks, see Common I/O Tasks.

## BinaryWriter.Write(Byte[], Int32, Int32) method

```csharp
public virtual void Write (byte[] buffer, int index, int count);
```

Writes a region of a byte array to the current stream.

Parameters:

- `buffer`: A byte array containing the data to write.
- `index`: The index of the first byte to read from `buffer` and to write to the stream.
- `count`: The number of bytes to read from `buffer` and to write to the stream.

Exceptions:

- `ArgumentException`: The buffer length minus `index` is less than `count`.
- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is negative.
- `IOException`: An I/O error occurs.
- `ObjectDisposedException`: The stream is closed.

#### Remarks
For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example shows how to write binary data using memory as a backing store, and then verify that the data was written correctly.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/Read/rwreadbytes.cs._

## BinaryWriter.Write(Char[], Int32, Int32) method

```csharp
public virtual void Write (char[] chars, int index, int count);
```

Writes a section of a character array to the current stream, and advances the current position of the stream in accordance with the `Encoding` used and perhaps the specific characters being written to the stream.

Parameters:

- `chars`: A character array containing the data to write.
- `index`: The index of the first character to read from `chars` and to write to the stream.
- `count`: The number of characters to read from `chars` and to write to the stream.

Exceptions:

- `ArgumentException`: The buffer length minus `index` is less than `count`.
- `ArgumentNullException`: `chars` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is negative.
- `IOException`: An I/O error occurs.
- `ObjectDisposedException`: The stream is closed.

#### Remarks
For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example shows how to read and write data using memory as a backing store.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/Read/rwreadchars.cs._

## BinaryWriter.Write7BitEncodedInt(Int32) method

```csharp
public void Write7BitEncodedInt (int value);
```

Writes a 32-bit integer in a compressed format.

Parameters:

- `value`: The 32-bit integer to be written.

Exceptions:

- `EndOfStreamException`: The end of the stream is reached.
- `ObjectDisposedException`: The stream is closed.
- `IOException`: The stream is closed.

#### Remarks
The integer of the `value` parameter is written out seven bits at a time, starting with the seven least-significant bits. The high bit of a byte indicates whether there are more bytes to be written after this one.

If `value` will fit in seven bits, it takes only one byte of space. If `value` will not fit in seven bits, the high bit is set on the first byte and written out. `value` is then shifted by seven bits and the next byte is written. This process is repeated until the entire integer has been written.

For a list of common I/O tasks, see Common I/O Tasks.

## BinaryWriter.Write7BitEncodedInt64(Int64) method

```csharp
public void Write7BitEncodedInt64 (long value);
```

Writes out a number 7 bits at a time.

Parameters:

- `value`: The value to write.

To be added.

## BinaryWriter.Null field

```csharp
public static readonly System.IO.BinaryWriter Null;
```

Specifies a `BinaryWriter` with no backing store.

#### Remarks
For a list of common I/O tasks, see Common I/O Tasks.

## BinaryWriter.OutStream field

```csharp
protected System.IO.Stream OutStream;
```

Holds the underlying stream.

#### Remarks
For a list of common I/O tasks, see Common I/O Tasks.
