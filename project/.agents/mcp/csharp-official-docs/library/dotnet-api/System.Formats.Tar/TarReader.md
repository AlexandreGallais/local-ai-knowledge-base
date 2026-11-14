---
title: "TarReader class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Formats.Tar/TarReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TarReader class

Namespace: `System.Formats.Tar`

```csharp
public sealed class TarReader : IAsyncDisposable, IDisposable
```

Reads a tar archive from a stream.

To be added.

## TarReader.TarReader(Stream, Boolean) constructor

```csharp
public TarReader (System.IO.Stream archiveStream, bool leaveOpen = false);
```

Initializes a `TarReader` instance that can read tar entries from the specified stream, and can optionally leave the stream open upon disposal of this instance.

Parameters:

- `archiveStream`: The stream to read from.
- `leaveOpen`: `false` to dispose the `archiveStream` when this instance is disposed; `true` to leave the stream open.

Exceptions:

- `ArgumentException`: `archiveStream` does not support reading.
- `ArgumentNullException`: `archiveStream` is `null`.

To be added.

## TarReader.Dispose() method

```csharp
public void Dispose ();
```

Disposes the current `TarReader` instance, and disposes the streams of all the entries that were read from the archive if the `leaveOpen` argument was set to `false` in the constructor.

The `TarEntry.DataStream` property of any entry can be replaced with a new stream. If the user decides to replace it on a `TarEntry` instance that was obtained using a `TarReader`, the underlying stream gets disposed immediately, freeing the `TarReader` of origin from the responsibility of having to dispose it.

## TarReader.DisposeAsync() method

```csharp
public System.Threading.Tasks.ValueTask DisposeAsync ();
```

Asynchronously disposes the current `TarReader` instance, and closes the streams of all the entries that were read from the archive if the `leaveOpen` argument was set to `false` in the constructor.

Returns: A value task that represents the asynchronous dispose operation.

The `TarEntry.DataStream` property of any entry can be replaced with a new stream. If the user decides to replace it on a `TarEntry` instance that was obtained using a `TarReader`, the underlying stream gets disposed immediately, freeing the `TarReader` of origin from the responsibility of having to dispose it.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `TarReader.Dispose`.

## TarReader.GetNextEntry(Boolean) method

```csharp
public System.Formats.Tar.TarEntry? GetNextEntry (bool copyData = false);
```

Retrieves the next entry from the archive stream.

Parameters:

- `copyData`: `true` to copy the data of the entry into a new `MemoryStream`. This is helpful when the underlying archive stream is unseekable, and the data needs to be accessed later.

`false` if the data should not be copied into a new stream. If the underlying stream is unseekable, the user has the responsibility of reading and processing the `TarEntry.DataStream` immediately after calling this method.

The default value is `false`.

Returns: A `TarEntry` instance if a valid entry was found, or `null` if the end of the archive has been reached.

Exceptions:

- `InvalidDataException`: The entry's data is malformed.

-or-

The archive contains entries in different formats.

-or-

More than one global extended attributes entry was found in the current `TarEntryFormat.Pax` archive.

-or-

Two or more extended attributes entries were found consecutively in the current `TarEntryFormat.Pax` archive.

-or-

.NET 11 and later versions only: An entry's checksum is invalid.
- `IOException`: An I/O problem occurred.

To be added.

## TarReader.GetNextEntryAsync(Boolean, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<System.Formats.Tar.TarEntry?> GetNextEntryAsync (bool copyData = false, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously retrieves the next entry from the archive stream.

Parameters:

- `copyData`: `true` to copy the data of the entry into a new `MemoryStream`. This is helpful when the underlying archive stream does not support seeking, and the data needs to be accessed later.

`false` if the data should not be copied into a new stream. If the underlying stream does not support seeking, the user has the responsibility of reading and processing the `TarEntry.DataStream` immediately after calling this method.

The default value is `false`.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A value task containing a `TarEntry` instance if a valid entry was found, or `null` if the end of the archive has been reached.

Exceptions:

- `InvalidDataException`: The archive is malformed.

-or-

The archive contains entries in different formats.

-or-

More than one Global Extended Attributes Entry was found in the current `TarEntryFormat.Pax` archive.

-or-

Two or more Extended Attributes entries were found consecutively in the current `TarEntryFormat.Pax` archive.

-or-

.NET 11 and later versions only: An entry's checksum is invalid.
- `IOException`: An I/O problem occurred.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `TarReader.GetNextEntry`.
