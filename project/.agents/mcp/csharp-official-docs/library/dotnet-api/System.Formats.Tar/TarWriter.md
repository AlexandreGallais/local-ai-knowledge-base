---
title: "TarWriter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Formats.Tar/TarWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TarWriter class

Namespace: `System.Formats.Tar`

```csharp
public sealed class TarWriter : IAsyncDisposable, IDisposable
```

Writes a tar archive into a stream.

To be added.

## TarWriter.TarWriter(Stream) constructor

```csharp
public TarWriter (System.IO.Stream archiveStream);
```

Initializes a `TarWriter` instance that can write tar entries to the specified stream and closes the `archiveStream` upon disposal of this instance.

Parameters:

- `archiveStream`: The stream to write to.

Exceptions:

- `ArgumentNullException`: `archiveStream` is `null`.
- `ArgumentException`: `archiveStream` does not support writing.

When using this constructor, `TarEntryFormat.Pax` is used as the default format of the entries written to the archive using the `TarWriter.WriteEntry` method.

## TarWriter.TarWriter(Stream, Boolean) constructor

```csharp
public TarWriter (System.IO.Stream archiveStream, bool leaveOpen = false);
```

Initializes a `TarWriter` instance that can write tar entries to the specified stream and optionally leaves the stream open upon disposal of this instance. When using this constructor, the format of the resulting archive is `TarEntryFormat.Pax`.

Parameters:

- `archiveStream`: The stream to write to.
- `leaveOpen`: `false` to dispose the `archiveStream` when this instance is disposed; `true` to leave the stream open.

Exceptions:

- `ArgumentNullException`: `archiveStream` is `null`.
- `ArgumentException`: `archiveStream` does not support writing.

The `TarEntryFormat.Pax` format is the default format as it is the most flexible and POSIX compatible. This is the only format with which `TarWriter` reads and stores `atime` and `ctime` when creating entries from filesystem entries.

## TarWriter.TarWriter(Stream, TarEntryFormat, Boolean) constructor

```csharp
public TarWriter (System.IO.Stream archiveStream, System.Formats.Tar.TarEntryFormat format = System.Formats.Tar.TarEntryFormat.Pax, bool leaveOpen = false);
```

Initializes a `TarWriter` instance that can write tar entries to the specified stream, optionally leaving the stream open upon disposal of this instance, and optionally specifying the format when writing entries using the `TarWriter.WriteEntry` method.

Parameters:

- `archiveStream`: The stream to write to.
- `format`: The format to use when calling `TarWriter.WriteEntry`. The default value is `TarEntryFormat.Pax`.
- `leaveOpen`: `false` to dispose the `archiveStream` when this instance is disposed; `true` to leave the stream open.

Exceptions:

- `ArgumentNullException`: `archiveStream` is `null`.
- `ArgumentException`: `archiveStream` does not support writing.
- `ArgumentOutOfRangeException`: `format` is either `TarEntryFormat.Unknown` or not one of the other enum values.

The recommended format is `TarEntryFormat.Pax` for its flexibility.

## TarWriter.TarWriter(Stream, TarWriterOptions, Boolean) constructor

```csharp
public TarWriter (System.IO.Stream archiveStream, System.Formats.Tar.TarWriterOptions options, bool leaveOpen = false);
```

To be added.

Parameters:

- `archiveStream`: To be added.
- `options`: To be added.
- `leaveOpen`: To be added.

To be added.

## TarWriter.Format property

```csharp
public System.Formats.Tar.TarEntryFormat Format { get; }
```

Gets the format of the entries when writing them to the archive using the `TarWriter.WriteEntry` method.

Returns: To be added.

To be added.

## TarWriter.Dispose() method

```csharp
public void Dispose ();
```

Disposes the current `TarWriter` instance, and closes the archive stream if the `leaveOpen` argument was set to `false` in the constructor.

To be added.

## TarWriter.DisposeAsync() method

```csharp
public System.Threading.Tasks.ValueTask DisposeAsync ();
```

Asynchronously disposes the current `TarWriter` instance, and closes the archive stream if the `leaveOpen` argument was set to `false` in the constructor.

Returns: A value task that represents the asynchronous dispose operation.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `TarWriter.Dispose`.

## TarWriter.WriteEntry(TarEntry) method

```csharp
public void WriteEntry (System.Formats.Tar.TarEntry entry);
```

Writes the specified entry into the archive stream.

Parameters:

- `entry`: The tar entry to write.

Exceptions:

- `ArgumentException`: The entry type is `TarEntryType.HardLink` or `TarEntryType.SymbolicLink` and the `TarEntry.LinkName` is `null` or empty.
- `ObjectDisposedException`: The archive stream is disposed.
- `ArgumentNullException`: `entry` is `null`.
- `IOException`: An I/O problem occurred.

#### Remarks

Before writing an entry to the archive, if you wrote data into the entry's `DataStream`, make sure to rewind it to the desired start position.

These are the entry types supported for writing on each format:

- `V7`:

- `Directory`.
- `HardLink`.
- `SymbolicLink`.
- `V7RegularFile`.

- `Ustar`, `Pax`, and `Gnu`:

- `BlockDevice`.
- `CharacterDevice`.
- `Directory`.
- `Fifo`.
- `HardLink`.
- `RegularFile`.
- `SymbolicLink`.

## TarWriter.WriteEntry(String, String) method

```csharp
public void WriteEntry (string fileName, string? entryName);
```

Writes the specified file into the archive stream as a tar entry.

Parameters:

- `fileName`: The path to the file to write to the archive.
- `entryName`: The name of the file as it should be represented in the archive. It should include the optional relative path and the filename.

Exceptions:

- `ObjectDisposedException`: The archive stream is disposed.
- `ArgumentException`: `fileName` or `entryName` is `null` or empty.
- `IOException`: An I/O problem occurred.

The entry will be created using the format specified in the `TarWriter.#ctor` constructor, or will use `TarEntryFormat.Pax` if other constructors are used.

If the format is `TarEntryFormat.Pax`, the `atime` and `ctime` from the file will be stored in the `PaxTarEntry.ExtendedAttributes` dictionary. If the format is `TarEntryFormat.Gnu`, this method will not set a value for `GnuTarEntry.AccessTime` and `GnuTarEntry.ChangeTime` because most TAR tools do not support these fields for this format.

## TarWriter.WriteEntryAsync(TarEntry, CancellationToken) method

```csharp
public System.Threading.Tasks.Task WriteEntryAsync (System.Formats.Tar.TarEntry entry, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously writes the specified entry into the archive stream.

Parameters:

- `entry`: The tar entry to write.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ArgumentException`: The entry type is `TarEntryType.HardLink` or `TarEntryType.SymbolicLink` and the `TarEntry.LinkName` is `null` or empty.
- `ObjectDisposedException`: The archive stream is disposed.
- `ArgumentNullException`: `entry` is `null`.
- `IOException`: An I/O problem occurred.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

Before writing an entry to the archive, if you wrote data into the entry's `DataStream`, make sure to rewind it to the desired start position.

These are the entry types supported for writing on each format:

- `V7`:

- `Directory`
- `HardLink`
- `SymbolicLink`
- `V7RegularFile`

- `Ustar`, `Pax`, and `Gnu`:

- `BlockDevice`
- `CharacterDevice`
- `Directory`
- `Fifo`
- `HardLink`
- `RegularFile`
- `SymbolicLink`

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteEntry`.

## TarWriter.WriteEntryAsync(String, String, CancellationToken) method

```csharp
public System.Threading.Tasks.Task WriteEntryAsync (string fileName, string? entryName, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously writes the specified file into the archive stream as a tar entry.

Parameters:

- `fileName`: The path to the file to write to the archive.
- `entryName`: The name of the file as it should be represented in the archive. It should include the optional relative path and the filename.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ObjectDisposedException`: The archive stream is disposed.
- `ArgumentException`: `fileName` or `entryName` is `null` or empty.
- `IOException`: An I/O problem occurred.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `TarWriter.WriteEntry`.
