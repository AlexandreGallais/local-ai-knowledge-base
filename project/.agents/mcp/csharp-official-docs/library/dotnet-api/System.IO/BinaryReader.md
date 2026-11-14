---
title: "BinaryReader class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/BinaryReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BinaryReader class

Namespace: `System.IO`

```csharp
public class BinaryReader : IDisposable
```

Reads primitive data types as binary values in a specific encoding.

#### Remarks
The `BinaryReader` class provides methods that simplify reading primitive data types from a stream. For example, you can use the `BinaryReader.ReadBoolean` method to read the next byte as a Boolean value and advance the current position in the stream by one byte. The class includes read methods that support different data types.

When you create a new instance of the `BinaryReader` class, you provide the stream to read from, and optionally specify the type of encoding and whether to leave the stream open after disposing the `BinaryReader` object. If you do not specify an encoding type, UTF-8 is used.

> **Important:**
> This type implements the `IDisposable` interface. When you've finished using the type, you should dispose of it either directly (by calling its `Dispose` method) or indirectly (with a language construct such as `using` in C#). For more information, see Use an object that implements IDisposable.

#### Examples
The following code example demonstrates how to store and retrieve application settings in a file.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/Overview/source.cs._

## BinaryReader.BinaryReader(Stream) constructor

```csharp
public BinaryReader (System.IO.Stream input);
```

Initializes a new instance of the `BinaryReader` class based on the specified stream and using UTF-8 encoding.

Parameters:

- `input`: The input stream.

Exceptions:

- `ArgumentException`: The stream does not support reading, is `null`, or is already closed.

#### Remarks
For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example demonstrates how to store and retrieve application settings in a file.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/Overview/source.cs._

## BinaryReader.BinaryReader(Stream, Encoding) constructor

```csharp
public BinaryReader (System.IO.Stream input, System.Text.Encoding encoding);
```

Initializes a new instance of the `BinaryReader` class based on the specified stream and character encoding.

Parameters:

- `input`: The input stream.
- `encoding`: The character encoding to use.

Exceptions:

- `ArgumentException`: The stream does not support reading, is `null`, or is already closed.
- `ArgumentNullException`: `encoding` is `null`.

#### Remarks
For a list of common I/O tasks, see Common I/O Tasks.

## BinaryReader.BinaryReader(Stream, Encoding, Boolean) constructor

```csharp
public BinaryReader (System.IO.Stream input, System.Text.Encoding encoding, bool leaveOpen);
```

Initializes a new instance of the `BinaryReader` class based on the specified stream and character encoding, and optionally leaves the stream open.

Parameters:

- `input`: The input stream.
- `encoding`: The character encoding to use.
- `leaveOpen`: `true` to leave the stream open after the `BinaryReader` object is disposed; otherwise, `false`.

Exceptions:

- `ArgumentException`: The stream does not support reading, is `null`, or is already closed.
- `ArgumentNullException`: `encoding` or `input` is `null`.

To be added.

## BinaryReader.BaseStream property

```csharp
public virtual System.IO.Stream BaseStream { get; }
```

Exposes access to the underlying stream of the `BinaryReader`.

Returns: The underlying stream associated with the `BinaryReader`.

#### Remarks

> **Caution:**
> Using the underlying stream while reading or while using the `BinaryReader` can cause data loss and corruption. For example, the same bytes might be read more than once, bytes might be skipped, or character reading might become unpredictable.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example shows how to read and write `Double` data to memory by using the `BinaryReader` and `BinaryWriter` classes on top of the `MemoryStream` class. `MemoryStream` only reads and writes `Byte` data.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/BaseStream/rwdouble.cs._

## BinaryReader.Close() method

```csharp
public virtual void Close ();
```

Closes the current reader and the underlying stream.

#### Remarks
This implementation of `Close` calls the `BinaryReader.Dispose` method passing a `true` value.

Flushing the stream will not flush its underlying encoder unless you explicitly call `Stream.Flush` or `Close`. Setting `StreamWriter.AutoFlush` to `true` means that data will be flushed from the buffer to the stream, but the encoder state will not be flushed. This allows the encoder to keep its state (partial characters) so that it can encode the next block of characters correctly. This scenario affects UTF8 and UTF7 where certain characters can only be encoded after the encoder receives the adjacent character or characters.

## BinaryReader.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `BinaryReader` class.

#### Remarks
Call `Dispose` when you are finished using the `BinaryReader`. The `Dispose` method leaves the `BinaryReader` in an unusable state. After calling `Dispose`, you must release all references to the `BinaryReader` so the garbage collector can reclaim the memory that the `BinaryReader` was occupying.

For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
> Always call `Dispose` before you release your last reference to the `BinaryReader`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `BinaryReader` object's `Finalize` method.

## BinaryReader.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `BinaryReader` class and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by `Dispose` and `Object.Finalize`. By default, this method specifies the `disposing` parameter as `true`. `Finalize` specifies the `disposing` parameter as `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `BinaryReader` references. This method invokes the `Dispose` method of each referenced object.

## BinaryReader.FillBuffer(Int32) method

```csharp
protected virtual void FillBuffer (int numBytes);
```

Fills the internal buffer with the specified number of bytes read from the stream.

Parameters:

- `numBytes`: The number of bytes to be read.

Exceptions:

- `EndOfStreamException`: The end of the stream is reached before `numBytes` could be read.
- `IOException`: An I/O error occurred.
- `ArgumentOutOfRangeException`: Requested `numBytes` is larger than the internal buffer size.

#### Remarks
The internal buffer size is the larger value between 16 and the value returned by `Encoding.GetMaxByteCount` for the specified encoding.

For a list of common I/O tasks, see Common I/O Tasks.

## BinaryReader.PeekChar() method

```csharp
public virtual int PeekChar ();
```

Returns the next available character and does not advance the byte or character position.

Returns: The next available character, or -1 if no more characters are available or the stream does not support seeking.

Exceptions:

- `IOException`: An I/O error occurred.
- `ArgumentException`: The current character cannot be decoded into the internal character buffer by using the `Encoding` selected for the stream.

#### Remarks
If surrogate characters can be expected in the stream use the `BinaryReader.ReadChars` method, then set the stream back to the original position.

For a list of common I/O tasks, see Common I/O Tasks.

## BinaryReader.Read() method

```csharp
public virtual int Read ();
```

Reads characters from the underlying stream and advances the current position of the stream in accordance with the `Encoding` used and the specific character being read from the stream.

Returns: The next character from the input stream, or -1 if no characters are currently available.

Exceptions:

- `IOException`: An I/O error occurred.
- `ObjectDisposedException`: The stream is closed.

#### Remarks
`BinaryReader` does not restore the file position after an unsuccessful read.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example shows how to read and write data using memory as a backing store. This example displays a list of invalid file path characters to the console. Although the code tries to display a list of all invalid file path characters, not all of the characters are within the displayable set of characters. Because the list of invalid characters can vary based on the system, output for this code may also vary.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/Read/rwreadchar.cs._

## BinaryReader.Read(Byte>) method

```csharp
public virtual int Read (Span<byte> buffer);
```

Reads a sequence of bytes from the current stream and advances the position within the stream by the number of bytes read.

Parameters:

- `buffer`: A region of memory. When this method returns, the contents of this region are replaced by the bytes read from the current source.

Returns: The total number of bytes read into the buffer. This can be less than the number of bytes allocated in the buffer if that many bytes are not currently available, or zero (0) if the end of the stream has been reached.

Exceptions:

- `ObjectDisposedException`: The stream is closed.
- `IOException`: An I/O error occurred.

To be added.

## BinaryReader.Read(Char>) method

```csharp
public virtual int Read (Span<char> buffer);
```

Reads, from the current stream, the same number of characters as the length of the provided buffer, writes them in the provided buffer, and advances the current position in accordance with the `Encoding` used and the specific character being read from the stream.

Parameters:

- `buffer`: A span of characters. When this method returns, the contents of this region are replaced by the characters read from the current source.

Returns: The total number of characters read into the buffer. This might be less than the number of characters requested if that many characters are not currently available, or it might be zero if the end of the stream is reached.

Exceptions:

- `ObjectDisposedException`: The stream is closed.
- `IOException`: An I/O error occurred.

To be added.

## BinaryReader.Read(Byte[], Int32, Int32) method

```csharp
public virtual int Read (byte[] buffer, int index, int count);
```

Reads the specified number of bytes from the stream, starting from a specified point in the byte array.

Parameters:

- `buffer`: The buffer to read data into.
- `index`: The starting point in the buffer at which to begin reading into the buffer.
- `count`: The number of bytes to read.

Returns: The number of bytes read into `buffer`. This might be less than the number of bytes requested if that many bytes are not available, or it might be zero if the end of the stream is reached.

Exceptions:

- `ArgumentException`: The buffer length minus `index` is less than `count`.

-or-

The number of decoded characters to read is greater than `count`. This can happen if a Unicode decoder returns fallback characters or a surrogate pair.
- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is negative.
- `ObjectDisposedException`: The stream is closed.
- `IOException`: An I/O error occurred.

#### Remarks
`BinaryReader` does not restore the file position after an unsuccessful read operation.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example shows how to write binary data by using memory as a backing store. It displays a message to the console that indicates whether the data was written correctly.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/Read/rwreadbytes.cs._

This example reads the contents of a file and displays each byte's numeric value in 16-column format. The end of the file that is being read is detected when the `BinaryReader.Read` method returns zero bytes.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/Overview/source5.cs._

## BinaryReader.Read(Char[], Int32, Int32) method

```csharp
public virtual int Read (char[] buffer, int index, int count);
```

Reads the specified number of characters from the stream, starting from a specified point in the character array.

Parameters:

- `buffer`: The buffer to read data into.
- `index`: The starting point in the buffer at which to begin reading into the buffer.
- `count`: The number of characters to read.

Returns: The total number of characters read into the buffer. This might be less than the number of characters requested if that many characters are not currently available, or it might be zero if the end of the stream is reached.

Exceptions:

- `ArgumentException`: The buffer length minus `index` is less than `count`.

-or-

The number of decoded characters to read is greater than `count`. This can happen if a Unicode decoder returns fallback characters or a surrogate pair.
- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is negative.
- `ObjectDisposedException`: The stream is closed.
- `IOException`: An I/O error occurred.

#### Remarks
`BinaryReader` does not restore the file position after an unsuccessful read operation.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example shows how to read and write data using memory as a backing store. This example displays a list of invalid file path characters to the console. Although the code tries to display a list of all invalid file path characters, not all of the characters are within the displayable set of characters. Because the list of invalid characters can vary based on the system, output for this code may also vary.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/Read/rwreadchars.cs._

## BinaryReader.Read7BitEncodedInt() method

```csharp
public int Read7BitEncodedInt ();
```

Reads in a 32-bit integer in compressed format.

Returns: A 32-bit integer in compressed format.

Exceptions:

- `EndOfStreamException`: The end of the stream is reached.
- `ObjectDisposedException`: The stream is closed.
- `IOException`: An I/O error occurred.
- `FormatException`: The stream is corrupted.

#### Remarks
`BinaryReader` does not restore the file position after an unsuccessful read.

If the integer will fit in seven bits, the integer takes only one byte of space. The integer is expected to have been written through `BinaryWriter.Write7BitEncodedInt`.

For a list of common I/O tasks, see Common I/O Tasks.
