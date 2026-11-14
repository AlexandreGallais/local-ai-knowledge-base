---
title: "TextWriter class (part 1 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/TextWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TextWriter class

Namespace: `System.IO`

```csharp
public abstract class TextWriter : MarshalByRefObject, IAsyncDisposable, IDisposable
```

Represents a writer that can write a sequential series of characters. This class is abstract.

#### Remarks
`TextWriter` is the abstract base class of `StreamWriter` and `StringWriter`, which write characters to streams and strings, respectively. Use an instance of `TextWriter` to write an object to a string, write strings to a file, or to serialize XML. You can also use the instance of `TextWriter` to write text to a custom backing store using the same APIs you would use for a string or a stream, or to add support for text formatting.

All the `Write` methods of `TextWriter` having primitive data types as parameters write out the values as strings.

By default, a `TextWriter` is not thread safe. See `TextWriter.Synchronized` for a thread-safe wrapper.

> **Important:**
This type implements the `IDisposable` interface. When you've finished using the type, you should dispose of it either directly (by calling its `Dispose` method) or indirectly (with a language construct such as `using` in C#). For more information, see Use an object that implements IDisposable.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The `TextWriter` class is an abstract class. Therefore, you do not instantiate it in your code. The `StreamWriter` class derives from `TextWriter` and provides implementations of the members for writing to a stream. The following example shows how to write two lines that consist of string values to a text file by using the `WriteLineAsync` method.

_Code sample not included: ~/snippets/csharp/System.IO/StreamWriter/AutoFlush/example23.cs._

## TextWriter.TextWriter() constructor

```csharp
protected TextWriter ();
```

Initializes a new instance of the `TextWriter` class.

#### Remarks
Use this constructor overload when you do not want to provide a value for the `FormatProvider` property. When the `FormatProvider` property is `null`, the culture of the current thread is used for formatting.

Use this constructor for derived classes.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.TextWriter(IFormatProvider) constructor

```csharp
protected TextWriter (IFormatProvider? formatProvider);
```

Initializes a new instance of the `TextWriter` class with the specified format provider.

Parameters:

- `formatProvider`: An `IFormatProvider` object that controls formatting.

#### Remarks
Use this constructor overload to provide a value for the `FormatProvider` property. The value of the `FormatProvider` property specifies the culture-specific formatting that is used when you call the `TextWriter.Write` and `TextWriter.WriteLine` methods. If you do not want to provide a format provider, you create an instance by using the `%23ctor` constructor, which sets the `FormatProvider` property to `null`. When the `FormatProvider` property is `null`, the culture of the current thread is used for formatting.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.Encoding property

```csharp
public abstract System.Text.Encoding Encoding { get; }
```

When overridden in a derived class, returns the character encoding in which the output is written.

Returns: The character encoding in which the output is written.

#### Remarks
This property is necessary for some XML scenarios where a header must be written containing the encoding used by the `TextWriter`. This enables the XML code to consume an arbitrary `TextWriter` and generate the correct XML header.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.FormatProvider property

```csharp
public virtual IFormatProvider FormatProvider { get; }
```

Gets an object that controls formatting.

Returns: An `IFormatProvider` object for a specific culture, or the formatting of the current culture if no other culture is specified.

#### Remarks
The value of the `FormatProvider` property specifies the culture-specific formatting that is used when you call the `TextWriter.Write` and `TextWriter.WriteLine` methods. If you do not want to provide a format provider, you create an instance by using the `%23ctor` constructor, which sets the `FormatProvider` property to `null`. When the `FormatProvider` property contains `null`, the culture of the current thread is used for formatting.

For an example of creating a file and writing text to a file, see How to: Write Text to a File. For an example of reading text from a file, see How to: Read Text from a File. For an example of reading from and writing to a binary file, see How to: Read and Write to a Newly Created Data File.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.NewLine property

```csharp
public virtual string NewLine { get; set; }
```

Gets or sets the line terminator string used by the current `TextWriter`.

Returns: The line terminator string for the current `TextWriter`.

#### Remarks

For non-Unix platforms, the default line terminator string is a carriage return followed by a line feed ('\r\n'). For Unix platforms, it's a line feed ('\n').

The line terminator string is written to the text stream whenever one of the `WriteLine` methods is called. In order for text written by the `TextWriter` to be readable by a `TextReader`, only "\n" or "\r\n" should be used as terminator strings. If `NewLine` is set to `null`, the default newline character is used instead.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.Close() method

```csharp
public virtual void Close ();
```

Closes the current writer and releases any system resources associated with the writer.

#### Remarks
This implementation of `Close` calls the `Dispose` method and passes it a `true` value.

Flushing the stream will not flush its underlying encoder unless you explicitly call `TextWriter.Flush` or `Close`. Setting the `AutoFlush` property to `true` means that data will be flushed from the buffer to the stream, but the encoder state will not be flushed. This allows the encoder to keep its state (partial characters) so that it can encode the next block of characters correctly. This scenario affects UTF8 and UTF7 where certain characters can be encoded only after the encoder receives the adjacent character or characters.

> **Note:**
> In derived classes, do not override the `TextWriter.Close` method. Instead, override the `Dispose` method to add code for releasing resources.

## TextWriter.CreateBroadcasting(TextWriter[]) method

```csharp
public static System.IO.TextWriter CreateBroadcasting (params System.IO.TextWriter[] writers);
```

Creates an instance of `TextWriter` that writes supplied inputs to each of the writers in `writers`.

Parameters:

- `writers`: The `TextWriter` instances to which all operations should be broadcast (multiplexed).

Returns: An instance of `TextWriter` that writes supplied inputs to each of the writers in `writers`

Exceptions:

- `ArgumentNullException`: `writers` is `null` or it contains a `null`.

The resulting instance will delegate each operation to each of the writers in `writers`. For example, calling `TextWriter.Write` will write the specified char to each writer, one after the other. The writers will be written to in the same order as they are specified in `writers`. An exception from the operation on one writer will prevent the operation from being performed on subsequent writers.

`TextWriter.Encoding` and `TextWriter.FormatProvider` will return the corresponding object from first writer in `writers`.

## TextWriter.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the `TextWriter` object.

#### Remarks
Call `TextWriter.Dispose` when you are finished using the `TextWriter`. The `TextWriter.Dispose` method leaves the `TextWriter` in an unusable state. After calling `TextWriter.Dispose`, you must release all references to the `TextWriter` so the garbage collector can reclaim the memory that the `TextWriter` was occupying.

For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

**Note** Always call `TextWriter.Dispose` before you release your last reference to the `TextWriter`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `TextWriter` object's `Object.Finalize` method.

## TextWriter.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `TextWriter` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by `Dispose` and `Object.Finalize`. By default, this method specifies the `disposing` parameter as `true`. `Finalize` specifies the `disposing` parameter as `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `TextWriter` references. This method invokes the `Dispose` method of each referenced object.

## TextWriter.DisposeAsync() method

```csharp
public virtual System.Threading.Tasks.ValueTask DisposeAsync ();
```

Asynchronously releases all resources used by the `TextWriter` object.

Returns: A task that represents the asynchronous dispose operation.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `TextWriter.Dispose`.

## TextWriter.Flush() method

```csharp
public virtual void Flush ();
```

Clears all buffers for the current writer and causes any buffered data to be written to the underlying device.

#### Remarks
This default method does nothing, but derived classes can override the method to provide the appropriate functionality.

Flushing the stream will not flush its underlying encoder unless you explicitly call `Flush` or `TextWriter.Close`. Setting `StreamWriter.AutoFlush` to `true` means that data will be flushed from the buffer to the stream, but the encoder state will not be flushed. This allows the encoder to keep its state (partial characters) so that it can encode the next block of characters correctly. This scenario affects UTF8 and UTF7 where certain characters can only be encoded after the encoder receives the adjacent character or characters.

## TextWriter.FlushAsync() method

```csharp
public virtual System.Threading.Tasks.Task FlushAsync ();
```

Asynchronously clears all buffers for the current writer and causes any buffered data to be written to the underlying device.

Returns: A task that represents the asynchronous flush operation.

Exceptions:

- `ObjectDisposedException`: The text writer is disposed.
- `InvalidOperationException`: The writer is currently in use by a previous write operation.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `TextWriter.Flush`.

## TextWriter.FlushAsync(CancellationToken) method

```csharp
public virtual System.Threading.Tasks.Task FlushAsync (System.Threading.CancellationToken <example-value>);
```

Asynchronously clears all buffers for the current writer and causes any buffered data to be written to the underlying device.

Parameters:

- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests.

Returns: A `Task` that represents the asynchronous flush operation.

Exceptions:

- `ObjectDisposedException`: The text writer is disposed.
- `InvalidOperationException`: The writer is currently in use by a previous write operation.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## TextWriter.Synchronized(TextWriter) method

```csharp
public static System.IO.TextWriter Synchronized (System.IO.TextWriter writer);
```

Creates a thread-safe wrapper around the specified `TextWriter`.

Parameters:

- `writer`: The `TextWriter` to synchronize.

Returns: A thread-safe wrapper.

Exceptions:

- `ArgumentNullException`: `writer` is `null`.

#### Remarks
All write operations to the returned wrapper will be thread safe. You call this method to ensure that only one thread at a time can execute the methods on the `TextWriter` instance that is returned. For more information about synchronization and threading, see Synchronizing Data for Multithreading.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.Write(Boolean) method

```csharp
public virtual void Write (bool value);
```

Writes the text representation of a `Boolean` value to the text stream.

Parameters:

- `value`: The `Boolean` value to write.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
The text representation of the specified value is produced by calling the `Boolean.ToString` method.

This method outputs either `TrueString` or `FalseString`.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.Write(Char) method

```csharp
public virtual void Write (char value);
```

Writes a character to the text stream.

Parameters:

- `value`: The character to write to the text stream.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
This default method does nothing, but derived classes can override the method to provide the appropriate functionality.

For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.Write(Char[]) method

```csharp
public virtual void Write (char[]? buffer);
```

Writes a character array to the text stream.

Parameters:

- `buffer`: The character array to write to the text stream.

Exceptions:

- `ObjectDisposedException`: The `TextWriter` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
This method does not search the specified string for individual newline characters (hexadecimal 0x000a) and replace them with `TextWriter.NewLine`.

This default method calls the `Write` method and passes the entire character array. If the character array is `null`, nothing is written.

For a list of common I/O tasks, see Common I/O Tasks.
