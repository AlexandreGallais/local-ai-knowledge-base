---
title: "StringWriter class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/StringWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringWriter class

Namespace: `System.IO`

```csharp
public class StringWriter : System.IO.TextWriter
```

Implements a `TextWriter` for writing information to a string. The information is stored in an underlying `StringBuilder`.

#### Remarks
`StringWriter` enables you to write to a string synchronously or asynchronously. You can write a character at a time with the `Write` or the `WriteAsync` method, a string at a time using the `Write` or the `WriteAsync` method. In addition, you can write a character, an array of characters or a string followed by the line terminator asynchronously with one of the `StringWriter.WriteLineAsync` methods.

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
The following code example demonstrates the creation of a continuous paragraph from a group of double-spaced sentences, and then the conversion of the paragraph back to the original text.

_Code sample not included: ~/snippets/csharp/System.IO/StringReader/.ctor/stringrw.cs._

## StringWriter.StringWriter() constructor

```csharp
public StringWriter ();
```

Initializes a new instance of the `StringWriter` class.

#### Remarks
A new `StringBuilder` object is automatically created and associated with the new instance of the `StringWriter` class. Since a format control is not specified for this constructor, the new instance will be initialized with `CultureInfo.CurrentCulture`.

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
The following code example demonstrates how to construct a string using the `StringWriter` class.

_Code sample not included: ~/snippets/csharp/System.IO/StringWriter/.ctor/strwriter1.cs._

## StringWriter.StringWriter(IFormatProvider) constructor

```csharp
public StringWriter (IFormatProvider? formatProvider);
```

Initializes a new instance of the `StringWriter` class with the specified format control.

Parameters:

- `formatProvider`: An `IFormatProvider` object that controls formatting.

#### Remarks
A new `StringBuilder` object is automatically created and associated with the new instance of the `StringWriter` class.

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
The following code example demonstrates how to construct a string in a specific culture.

_Code sample not included: ~/snippets/csharp/System.IO/StringWriter/.ctor/strwriter2.cs._

## StringWriter.StringWriter(StringBuilder) constructor

```csharp
public StringWriter (System.Text.StringBuilder sb);
```

Initializes a new instance of the `StringWriter` class that writes to the specified `StringBuilder`.

Parameters:

- `sb`: The `StringBuilder` object to write to.

Exceptions:

- `ArgumentNullException`: `sb` is `null`.

#### Remarks
Since a format control is not specified for this constructor, the new instance will be initialized with `CultureInfo.CurrentCulture`.

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
The following code example demonstrates using the `StringBuilder` class to modify the underlying string in a closed `StringWriter`.

_Code sample not included: ~/snippets/csharp/System.IO/StringWriter/.ctor/strwriter3.cs._

## StringWriter.StringWriter(StringBuilder, IFormatProvider) constructor

```csharp
public StringWriter (System.Text.StringBuilder sb, IFormatProvider? formatProvider);
```

Initializes a new instance of the `StringWriter` class that writes to the specified `StringBuilder` and has the specified format provider.

Parameters:

- `sb`: The `StringBuilder` object to write to.
- `formatProvider`: An `IFormatProvider` object that controls formatting.

Exceptions:

- `ArgumentNullException`: `sb` is `null`.

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

## StringWriter.Encoding property

```csharp
public override System.Text.Encoding Encoding { get; }
```

Gets the `Encoding` in which the output is written.

Returns: The `Encoding` in which the output is written.

#### Remarks
This property is necessary for some XML scenarios where a header must be written containing the encoding used by the `StringWriter`. This allows the XML code to consume an arbitrary `StringWriter` and generate the correct XML header.

The following table lists examples of other typical or related I/O tasks.

|To do this...|See the example in this topic...|
|-------------------|--------------------------------------|
|Create a text file.|How to: Write Text to a File|
|Write to a text file.|How to: Write Text to a File|
|Read from a text file.|How to: Read Text from a File|

#### Examples
This code example is part of a larger example provided for the `%23ctor` constructor.

_Code sample not included: ~/snippets/csharp/System.IO/StringWriter/.ctor/strwriter1.cs._

## StringWriter.Close() method

```csharp
public override void Close ();
```

Closes the current `StringWriter` and the underlying stream.

#### Remarks
For an example of creating a file and writing text to a file, see How to: Write Text to a File. For an example of reading text from a file, see How to: Read Text from a File. For an example of reading from and writing to a binary file, see How to: Read and Write to a Newly Created Data File.

This method overrides `Stream.Close`.

This implementation of `Close` calls the `StringWriter.Dispose` method passing a `true` value.

Flushing the stream will not flush its underlying encoder unless you explicitly call `Close`. Setting `StreamWriter.AutoFlush` to `true` means that data will be flushed from the buffer to the stream, but the encoder state will not be flushed. This allows the encoder to keep its state (partial characters) so that it can encode the next block of characters correctly. This scenario affects UTF8 and UTF7 where certain characters can only be encoded after the encoder receives the adjacent character or characters.

#### Examples
This code example is part of a larger example provided for the `%23ctor` constructor.

_Code sample not included: ~/snippets/csharp/System.IO/StringWriter/.ctor/strwriter3.cs._

## StringWriter.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `StringWriter` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `StringWriter` references. This method invokes the `Dispose` method of each referenced object.

## StringWriter.FlushAsync() method

```csharp
public override System.Threading.Tasks.Task FlushAsync ();
```

Asynchronously clears all buffers for the current writer and causes any buffered data to be written to the underlying device.

Returns: A task that represents the asynchronous flush operation.

To be added.

## StringWriter.GetStringBuilder() method

```csharp
public virtual System.Text.StringBuilder GetStringBuilder ();
```

Returns the underlying `StringBuilder`.

Returns: The underlying `StringBuilder`.

#### Remarks
This is either the `StringBuilder` that was passed to the constructor, or the `StringBuilder` that was automatically created.

The following table lists examples of other typical or related I/O tasks.

|To do this...|See the example in this topic...|
|-------------------|--------------------------------------|
|Create a text file.|How to: Write Text to a File|
|Write to a text file.|How to: Write Text to a File|
|Read from a text file.|How to: Read Text from a File|

#### Examples
This code example is part of a larger example provided for the `%23ctor` constructor.

_Code sample not included: ~/snippets/csharp/System.IO/StringWriter/.ctor/strwriter1.cs._

## StringWriter.ToString() method

```csharp
public override string ToString ();
```

Returns a string containing the characters written to the current `StringWriter` so far.

Returns: The string containing the characters written to the current `StringWriter`.

#### Remarks
The following table lists examples of other typical or related I/O tasks.

|To do this...|See the example in this topic...|
|-------------------|--------------------------------------|
|Create a text file.|How to: Write Text to a File|
|Write to a text file.|How to: Write Text to a File|
|Read from a text file.|How to: Read Text from a File|

#### Examples
This code example is part of a larger example provided for the `%23ctor` constructor.

_Code sample not included: ~/snippets/csharp/System.IO/StringWriter/.ctor/strwriter2.cs._

## StringWriter.Write(Char) method

```csharp
public override void Write (char value);
```

Writes a character to the string.

Parameters:

- `value`: The character to write.

Exceptions:

- `ObjectDisposedException`: The writer is closed.

#### Remarks
This method overrides `TextWriter.Write`.

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
This code example is part of a larger example provided for the `%23ctor` constructor.

_Code sample not included: ~/snippets/csharp/System.IO/StringWriter/.ctor/strwriter1.cs._

## StringWriter.Write(Char>) method

```csharp
public override void Write (ReadOnlySpan<char> buffer);
```

Writes the string representation of a span of chars to the current string.

Parameters:

- `buffer`: A span of chars to write to the string.

To be added.
