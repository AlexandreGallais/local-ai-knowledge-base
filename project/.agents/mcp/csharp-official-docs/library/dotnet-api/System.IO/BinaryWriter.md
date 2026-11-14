---
title: "BinaryWriter class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/BinaryWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BinaryWriter class

Namespace: `System.IO`

```csharp
public class BinaryWriter : IAsyncDisposable, IDisposable
```

Writes primitive types in binary to a stream and supports writing strings in a specific encoding.

#### Remarks
The `BinaryWriter` class provides methods that simplify writing primitive data types to a stream. For example, you can use the `BinaryWriter.Write` method to write a Boolean value to the stream as a one-byte value. The class includes write methods that support different data types.

When you create a new instance of the `BinaryWriter` class, you provide the stream to write to, and optionally specify the type of encoding and whether to leave the stream open after disposing the `BinaryWriter` object. If you do not specify an encoding type, UTF-8 is used.

> **Important:**
> This type implements the `IDisposable` interface. When you've finished using the type, you should dispose of it either directly (by calling its `Dispose` method) or indirectly (with a language construct such as `using` in C#). For more information, see Use an object that implements IDisposable.

A derived class can override the methods of this class to give unique character encodings.

#### Examples
The following code example demonstrates how to store and retrieve application settings in a file.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/Overview/source.cs._

## BinaryWriter.BinaryWriter() constructor

```csharp
protected BinaryWriter ();
```

Initializes a new instance of the `BinaryWriter` class that writes to a stream.

#### Remarks
For a list of common I/O tasks, see Common I/O Tasks.

## BinaryWriter.BinaryWriter(Stream) constructor

```csharp
public BinaryWriter (System.IO.Stream output);
```

Initializes a new instance of the `BinaryWriter` class based on the specified stream and using UTF-8 encoding.

Parameters:

- `output`: The output stream.

Exceptions:

- `ArgumentException`: The stream does not support writing or is already closed.
- `ArgumentNullException`: `output` is `null`.

#### Remarks
For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example demonstrates how to store and retrieve application settings in a file.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/Overview/source.cs._

## BinaryWriter.BinaryWriter(Stream, Encoding) constructor

```csharp
public BinaryWriter (System.IO.Stream output, System.Text.Encoding encoding);
```

Initializes a new instance of the `BinaryWriter` class based on the specified stream and character encoding.

Parameters:

- `output`: The output stream.
- `encoding`: The character encoding to use.

Exceptions:

- `ArgumentException`: The stream does not support writing or is already closed.
- `ArgumentNullException`: `output` or `encoding` is `null`.

#### Remarks
For a list of common I/O tasks, see Common I/O Tasks.

## BinaryWriter.BinaryWriter(Stream, Encoding, Boolean) constructor

```csharp
public BinaryWriter (System.IO.Stream output, System.Text.Encoding encoding, bool leaveOpen);
```

Initializes a new instance of the `BinaryWriter` class based on the specified stream and character encoding, and optionally leaves the stream open.

Parameters:

- `output`: The output stream.
- `encoding`: The character encoding to use.
- `leaveOpen`: `true` to leave the stream open after the `BinaryWriter` object is disposed; otherwise, `false`.

Exceptions:

- `ArgumentException`: The stream does not support writing or is already closed.
- `ArgumentNullException`: `output` or `encoding` is `null`.

To be added.

## BinaryWriter.BaseStream property

```csharp
public virtual System.IO.Stream BaseStream { get; }
```

Gets the underlying stream of the `BinaryWriter`.

Returns: The underlying stream associated with the `BinaryWriter`.

#### Remarks
For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example shows how to read and write `Double` data to memory by using the `BinaryReader` and `BinaryWriter` classes on top of the `MemoryStream` class. `MemoryStream` only reads and writes `Byte` data.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/BaseStream/rwdouble.cs._

## BinaryWriter.Close() method

```csharp
public virtual void Close ();
```

Closes the current `BinaryWriter` and the underlying stream.

#### Remarks
This implementation of `Close` calls the `BinaryWriter.Dispose` method passing a `true` value.

Flushing the stream will not flush its underlying encoder unless you explicitly call `BinaryWriter.Flush` or `Close`. Setting `StreamWriter.AutoFlush` to `true` means that data will be flushed from the buffer to the stream, but the encoder state will not be flushed. This allows the encoder to keep its state (partial characters) so that it can encode the next block of characters correctly. This scenario affects UTF8 and UTF7 where certain characters can only be encoded after the encoder receives the adjacent character or characters.

## BinaryWriter.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `BinaryWriter` class.

To be added.

## BinaryWriter.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `BinaryWriter` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## BinaryWriter.DisposeAsync() method

```csharp
public virtual System.Threading.Tasks.ValueTask DisposeAsync ();
```

Asynchronously releases all resources used by the current instance of the `BinaryWriter` class.

Returns: A task that represents the asynchronous dispose operation.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `BinaryWriter.Dispose`.

## BinaryWriter.Flush() method

```csharp
public virtual void Flush ();
```

Clears all buffers for the current writer and causes any buffered data to be written to the underlying device.

#### Remarks
All derived classes should override `Flush` to ensure that all buffered data is sent to the stream.

Flushing the stream will not flush its underlying encoder unless you explicitly call `Flush` or `BinaryWriter.Close`. Setting `StreamWriter.AutoFlush` to `true` means that data will be flushed from the buffer to the stream, but the encoder state will not be flushed. This allows the encoder to keep its state (partial characters) so that it can encode the next block of characters correctly. This scenario affects UTF8 and UTF7 where certain characters can only be encoded after the encoder receives the adjacent character or characters.

For a list of common I/O tasks, see Common I/O Tasks.

## BinaryWriter.Seek(Int32, SeekOrigin) method

```csharp
public virtual long Seek (int offset, System.IO.SeekOrigin origin);
```

Sets the position within the current stream.

Parameters:

- `offset`: A byte offset relative to `origin`.
- `origin`: A field of `SeekOrigin` indicating the reference point from which the new position is to be obtained.

Returns: The position with the current stream.

Exceptions:

- `IOException`: The file pointer was moved to an invalid location.
- `ArgumentException`: The `SeekOrigin` value is invalid.

#### Remarks
For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example writes a series of byte values to a file. The example uses `BinaryWriter.Seek` to move to various locations in the file, and then writes marker bytes by using the `BinaryWriter.Write` method.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/Overview/source3.cs._

## BinaryWriter.Write(Boolean) method

```csharp
public virtual void Write (bool value);
```

Writes a one-byte `Boolean` value to the current stream, with 0 representing `false` and 1 representing `true`.

Parameters:

- `value`: The `Boolean` value to write (0 or 1).

Exceptions:

- `IOException`: An I/O error occurs.
- `ObjectDisposedException`: The stream is closed.

#### Remarks
For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example demonstrates how to store and retrieve application settings in a file.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/Overview/source.cs._

## BinaryWriter.Write(Byte) method

```csharp
public virtual void Write (byte value);
```

Writes an unsigned byte to the current stream and advances the stream position by one byte.

Parameters:

- `value`: The unsigned byte to write.

Exceptions:

- `IOException`: An I/O error occurs.
- `ObjectDisposedException`: The stream is closed.

#### Remarks
Because of data formatting conflicts, using this method with the following encodings is not recommended:

- UTF-7

- ISO-2022-JP

- ISCII

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example shows how to write binary data using memory as a backing store, and then verify that the data was written correctly.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/ReadByte/rwbyte.cs._

## BinaryWriter.Write(Byte[]) method

```csharp
public virtual void Write (byte[] buffer);
```

Writes a byte array to the underlying stream.

Parameters:

- `buffer`: A byte array containing the data to write.

Exceptions:

- `IOException`: An I/O error occurs.
- `ObjectDisposedException`: The stream is closed.
- `ArgumentNullException`: `buffer` is `null`.

#### Remarks
For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example shows how to write binary data using memory as a backing store, and then verify that the data was written correctly.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/ReadBytes/rwbytes.cs._

## BinaryWriter.Write(Char) method

```csharp
public virtual void Write (char ch);
```

Writes a Unicode character to the current stream and advances the current position of the stream in accordance with the `Encoding` used and the specific characters being written to the stream.

Parameters:

- `ch`: The non-surrogate, Unicode character to write.

Exceptions:

- `IOException`: An I/O error occurs.
- `ObjectDisposedException`: The stream is closed.
- `ArgumentException`: `ch` is a single surrogate character.

#### Remarks
Because of data formatting conflicts, using this method with the following encodings is not recommended:

- UTF-7

- ISO-2022-JP

- ISCII

For a list of common I/O tasks, see Common I/O Tasks.

Unicode surrogate characters must be written out as pairs together in the same call, not individually. If you require support for surrogate pairs in your application, consider using a character array and the `BinaryWriter.Write` method overload.

#### Examples
The following code example shows how to read and write data using memory as a backing store.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/ReadChar/rwchar.cs._

## BinaryWriter.Write(Char[]) method

```csharp
public virtual void Write (char[] chars);
```

Writes a character array to the current stream and advances the current position of the stream in accordance with the `Encoding` used and the specific characters being written to the stream.

Parameters:

- `chars`: A character array containing the data to write.

Exceptions:

- `ArgumentNullException`: `chars` is `null`.
- `ObjectDisposedException`: The stream is closed.
- `IOException`: An I/O error occurs.

#### Remarks
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

#### Examples
The following code example shows how to read and write data using memory as a backing store.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/ReadChars/rwchars.cs._

## BinaryWriter.Write(Decimal) method

```csharp
public virtual void Write (decimal value);
```

Writes a decimal value to the current stream and advances the stream position by sixteen bytes.

Parameters:

- `value`: The decimal value to write.

Exceptions:

- `IOException`: An I/O error occurs.
- `ObjectDisposedException`: The stream is closed.

#### Remarks
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

## BinaryWriter.Write(Double) method

```csharp
public virtual void Write (double value);
```

Writes an eight-byte floating-point value to the current stream and advances the stream position by eight bytes.

Parameters:

- `value`: The eight-byte floating-point value to write.

Exceptions:

- `IOException`: An I/O error occurs.
- `ObjectDisposedException`: The stream is closed.

#### Remarks
For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example shows how to read and write `Double` data to memory by using the `BinaryReader` and `BinaryWriter` classes on top of the `MemoryStream` class. `MemoryStream` only reads and writes `Byte` data.

_Code sample not included: ~/snippets/csharp/System.IO/BinaryReader/BaseStream/rwdouble.cs._
