---
title: "FileStreamOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileStreamOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileStreamOptions class

Namespace: `System.IO`

```csharp
public sealed class FileStreamOptions
```

Defines a variety of configuration options for `FileStream`.

To be added.

## FileStreamOptions.FileStreamOptions() constructor

```csharp
public FileStreamOptions ();
```

Initializes a `FileStreamOptions` instance with default values.

To be added.

## FileStreamOptions.Access property

```csharp
public System.IO.FileAccess Access { get; set; }
```

A bitwise combination of the enumeration values that determines how the file can be accessed by the `FileStream` object. This also determines the values returned by the `FileStream.CanRead` and `FileStream.CanWrite` properties of the `FileStream` object.

Returns: A bitwise combination of the `FileAccess` enum flags.

Exceptions:

- `ArgumentOutOfRangeException`: `value` contains an invalid value.

To be added.

## FileStreamOptions.BufferSize property

```csharp
public int BufferSize { get; set; }
```

The size of the buffer used by `FileStream` for buffering. The default buffer size is 4096.
0 or 1 means that buffering should be disabled. Negative values are not allowed.

Returns: A non-negative number that represents the buffer size used by `FileStream` for buffering.

Exceptions:

- `ArgumentOutOfRangeException`: `value` is negative.

To be added.

## FileStreamOptions.Mode property

```csharp
public System.IO.FileMode Mode { get; set; }
```

One of the enumeration values that determines how to open or create the file.

Returns: One of the enumeration values of the `FileMode` enum.

Exceptions:

- `ArgumentOutOfRangeException`: `value` contains an invalid value.

To be added.

## FileStreamOptions.Options property

```csharp
public System.IO.FileOptions Options { get; set; }
```

A bitwise combination of the enumeration values that specifies additional file options. The default value is `FileOptions.None`, which indicates synchronous IO.

Returns: A bitwise combination of the `FileOptions` enum flags.

Exceptions:

- `ArgumentOutOfRangeException`: `value` contains an invalid value.

To be added.

## FileStreamOptions.PreallocationSize property

```csharp
public long PreallocationSize { get; set; }
```

The initial allocation size in bytes for the file. A positive value is effective only when a regular file is being created or overwritten (`FileMode.Create` or `FileMode.CreateNew`). Negative values are not allowed. In other cases (including the default 0 value), it's ignored. This value is a hint and is not a strong guarantee. It is not supported on Web Assembly (WASM) and FreeBSD (the value is ignored). For Windows, Linux and macOS we will try to preallocate the disk space to fill the requested allocation size. If that turns out to be impossible, the operation is going to throw an exception. The final file length (EOF) will be determined by the number of bytes written to the file.

Returns: A non-negative number that represents the initial allocation size in bytes for the file.

Exceptions:

- `ArgumentOutOfRangeException`: `value` is negative.

<format>

## Remarks

`PreallocationSize` can only be requested for write mode (`Access` must be set to `Write`) and when creating new files (`Mode` must be set to either `Create` or to `CreateNew`). Otherwise, the `FileStream` constructor will throw an exception.

If the operating system, platform or file system does not support preallocation, then `PreallocationSize` is ignored. This is the case for Web Assembly (WASM) and FreeBSD.

If there is not enough disk space or the file system does not support files of given size (example: 5 GB file on FAT32), an exception is thrown.

The file length is determined by how many bytes were written to the file.

When the file is closed and not all of the allocated space is written to, what happens to the remaining space is platform dependent. On Windows, this space is no longer reserved for the file. On other platforms, such as Linux and macOS, it remains allocated to the file.

For example, assume 2 GB is preallocated for a file, but only 1 GB is written. After closing the file, the file length is 1 GB on all operating systems. On Windows, the allocated size is also 1 GB, but on Linux and macOS, the allocated size is still 2 GB.

It's permissible to write more than what was initially preallocated. As long as there is enough disk space, the operation should succeed.

## Examples

The following code example demonstrates how to use `PreallocationSize` when working with `FileStream` objects:

_Code sample not included: ~/snippets/csharp/System.IO/FileStreamOptions/PreallocationSizeExample.cs._

</format>

## FileStreamOptions.Share property

```csharp
public System.IO.FileShare Share { get; set; }
```

A bitwise combination of the enumeration values that determines how the file will be shared by processes. The default value is `FileShare.Read`.

Returns: A bitwise combination of the `FileShare` enum flags.

Exceptions:

- `ArgumentOutOfRangeException`: `value` contains an invalid value.

To be added.

## FileStreamOptions.UnixCreateMode property

```csharp
public System.IO.UnixFileMode? UnixCreateMode { get; set; }
```

Gets or sets the Unix file mode used when a new file is created.

Returns: To be added.

Exceptions:

- `ArgumentException`: `value` is an invalid file mode.

To be added.
