---
title: "Path class (part 2 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/Path.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Path class (part 2 of 5)

## Path.EndsInDirectorySeparator(String) method

```csharp
public static bool EndsInDirectorySeparator (string? path);
```

Returns a value that indicates whether the specified path ends in a directory separator.

Parameters:

- `path`: The path to analyze.

Returns: `true` if the path ends in a directory separator; otherwise, `false`.

To be added.

## Path.Exists(String) method

```csharp
public static bool Exists (string? path);
```

Determines whether the specified file or directory exists.

Parameters:

- `path`: The path to check

Returns: `true` if the caller has the required permissions and `path` contains the name of an existing file or directory; otherwise, `false`.
This method also returns `false` if `path` is `null`, an invalid path, or a zero-length string. If the caller does not have sufficient permissions to read the specified path, no exception is thrown and the method returns `false` regardless of the existence of `path`.

#### Remarks

Unlike `Exists`, this method returns `true` for existing, non-regular files like pipes.
If the path targets an existing link, but the target of the link does not exist, it returns `true`.

## Path.GetDirectoryName(Char>) method

```csharp
public static ReadOnlySpan<char> GetDirectoryName (ReadOnlySpan<char> path);
```

Returns the directory information for the specified path represented by a character span.

Parameters:

- `path`: The path to retrieve the directory information from.

Returns: Directory information for `path`, or an empty span if `path` is `null`, an empty span, or a root (such as \\, C:, or \\\\server\\share).

#### Remarks

Unlike the string overload, this method doesn't normalize directory separators.

## Path.GetDirectoryName(String) method

```csharp
public static string? GetDirectoryName (string? path);
```

Returns the directory information for the specified path.

Parameters:

- `path`: The path of a file or directory.

Returns: Directory information for `path`, or `null` if `path` denotes a root directory or is null. Returns `String.Empty` if `path` does not contain directory information.

Exceptions:

- `PathTooLongException`: The `path` parameter is longer than the system-defined maximum length.

#### Remarks

In most cases, the string returned by this method consists of all characters in the path up to, but not including, the last directory separator character(s). A directory separator character can be either `DirectorySeparatorChar` or `AltDirectorySeparatorChar`. If the path consists of a root directory, such as "c:\\", `null` is returned.

This method does not support paths using "file:".

Because the returned path does not include the last directory separator character(s), passing the returned path back into the `Path.GetDirectoryName` method truncates one folder level per subsequent call on the result path. For example, passing the path "C:\\Directory\\SubDirectory\\test.txt" into `Path.GetDirectoryName` returns "C:\\Directory\\SubDirectory". Passing that path, "C:\\Directory\\SubDirectory", into `Path.GetDirectoryName` returns "C:\\Directory".

For a list of common I/O tasks, see Common I/O tasks.

#### Examples
The following example demonstrates using the `GetDirectoryName` method on a Windows-based desktop platform.

_Code sample not included: ~/snippets/csharp/System.IO/Path/ChangeExtension/pathmembers.cs._

## Path.GetExtension(Char>) method

```csharp
public static ReadOnlySpan<char> GetExtension (ReadOnlySpan<char> path);
```

Returns the extension of a file path that is represented by a read-only character span.

Parameters:

- `path`: The file path from which to get the extension.

Returns: The extension of the specified path (including the period, "."), or `ReadOnlySpan<T>.Empty` if `path` does not have extension information.

This method obtains the extension of `path` by searching `path` for a period ("."), starting from the last character in the read-only span and continuing toward its first character. If a period is found before a `DirectorySeparatorChar` or `AltDirectorySeparatorChar` character, the returned read-only span contains the period and the characters after it; otherwise, `Empty` is returned.

## Path.GetExtension(String) method

```csharp
public static string? GetExtension (string? path);
```

Returns the extension (including the period ".") of the specified path string.

Parameters:

- `path`: The path string from which to get the extension.

Returns: The extension of the specified path (including the period "."), or `null`, or `String.Empty`. If `path` is `null`, `Path.GetExtension` returns `null`. If `path` does not have extension information, `Path.GetExtension` returns `String.Empty`.

#### Remarks

This method obtains the extension of `path` by searching `path` for a period (.), starting with the last character in `path` and continuing toward the first character. If a period is found before a `DirectorySeparatorChar` or `AltDirectorySeparatorChar` character, the returned string contains the period and the characters after it; otherwise, `Empty` is returned.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates using the `GetExtension` method on a Windows-based desktop platform.

_Code sample not included: ~/snippets/csharp/System.IO/Path/ChangeExtension/pathmembers.cs._

## Path.GetFileName(Char>) method

```csharp
public static ReadOnlySpan<char> GetFileName (ReadOnlySpan<char> path);
```

Returns the file name and extension of a file path that is represented by a read-only character span.

Parameters:

- `path`: A read-only span that contains the path from which to obtain the file name and extension.

Returns: The characters that follow the last directory separator character or the root of `path`, whichever comes later.

The returned read-only span contains the characters of `path` that follow either the last directory separator character or the end of the root of `path` (as returned by `Path.GetPathRoot`), whichever comes later. If `path` ends with a directory separator character or consists only of a root, the method returns `Empty`. If `path` contains neither a directory separator character nor a root, the method returns `path`.

On Windows, the root can be, for example, a drive or a UNC share. For other root formats, such as DOS device paths, see File path formats on Windows systems. In `C:file.txt`, the root is `C:`, so the file name is `file.txt`. A UNC root such as `\\server\share` contains directory separators, but they're part of the root and don't mark the start of the file name. So the file name in `\\server\share\file.txt` is `file.txt`, and the file name in `\\server\share` is empty, because the whole path is the root.

## Path.GetFileName(String) method

```csharp
public static string? GetFileName (string? path);
```

Returns the file name and extension of the specified path string.

Parameters:

- `path`: The path string from which to obtain the file name and extension.

Returns: The characters that follow the last directory separator character or the root of `path`, whichever comes later, or `null` if `path` is `null`.

#### Remarks

The returned value is `null` if the file path is `null`.

The returned string contains the characters of `path` that follow either the last `DirectorySeparatorChar` or `AltDirectorySeparatorChar` character or the end of the root of `path` (as returned by `Path.GetPathRoot`), whichever comes later. If `path` ends with a directory separator character or consists only of a root, the method returns `Empty`. If `path` contains neither a directory separator character nor a root, the method returns `path`.

On Windows, the root can be, for example, a drive or a UNC share. For other root formats, such as DOS device paths, see File path formats on Windows systems. In `C:file.txt`, the root is `C:`, so the file name is `file.txt`. A UNC root such as `\\server\share` contains directory separators, but they're part of the root and don't mark the start of the file name. So the file name in `\\server\share\file.txt` is `file.txt`, and the file name in `\\server\share` is empty, because the whole path is the root.

Because *\\* is a legal file name on Unix, `GetFileName` running under Unix-based platforms cannot correctly return the file name from a Windows-based path like *C:\\mydir\\myfile.ext*, but `GetFileName` running under Windows-based platforms can correctly return the file name from a Unix-based path like */tmp/myfile.ext*, so the behavior of the `GetFileName` method is not strictly the same on Unix-based and Windows-based platforms.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates the behavior of the `GetFileName` method on a Windows-based desktop platform.

_Code sample not included: ~/snippets/csharp/System.IO/Path/ChangeExtension/pathmembers.cs._

## Path.GetFileNameWithoutExtension(Char>) method

```csharp
public static ReadOnlySpan<char> GetFileNameWithoutExtension (ReadOnlySpan<char> path);
```

Returns the file name without the extension of a file path that is represented by a read-only character span.

Parameters:

- `path`: A read-only span that contains the path from which to obtain the file name without the extension.

Returns: The characters in the read-only span returned by `Path.GetFileName`, minus the last period (.) and all characters following it.

To be added.

## Path.GetFileNameWithoutExtension(String) method

```csharp
public static string? GetFileNameWithoutExtension (string? path);
```

Returns the file name of the specified path string without the extension.

Parameters:

- `path`: The path of the file.

Returns: The string returned by `Path.GetFileName`, minus the last period (.) and all characters following it.

#### Remarks
This method does not verify that the path or file name exists.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates a use of the `GetFileNameWithoutExtension` method.

_Code sample not included: ~/snippets/csharp/System.IO/Path/ChangeExtension/pathmembers.cs._

## Path.GetFullPath(String) method

```csharp
public static string GetFullPath (string path);
```

Returns the absolute path for the specified path string.

Parameters:

- `path`: The file or directory for which to obtain absolute path information.

Returns: The fully qualified location of `path`, such as "C:\\MyFile.txt".

Exceptions:

- `ArgumentException`: `path` is a zero-length string, contains only white space on Windows systems, or contains one or more of the invalid characters defined in `Path.GetInvalidPathChars`.

-or-

The system could not retrieve the absolute path.
- `SecurityException`: The caller does not have the required permissions.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.

#### Remarks

The absolute path includes all information required to locate a file or directory on a system.

The file or directory specified by `path` is not required to exist. For example, if *c:\\temp\\newdir* is the current directory, calling `GetFullPath` on a file name such as *test.txt* returns *c:\\temp\\newdir\\test.txt*. The file need not exist.

> **Important:**
> If `path` is a relative path, this overload returns a fully qualified path that can be based on the current drive and current directory. The current drive and current directory can change at any time as an application executes. As a result, the path returned by this overload cannot be determined in advance. To return a deterministic path, call the `GetFullPath` overload. You can also call the `Path.IsPathFullyQualified` method to determine whether a path is fully qualified or relative and therefore whether a call to `GetFullPath` is necessary.

However, if `path` does exist, the caller must have permission to obtain path information for `path`. Note that unlike most members of the `Path` class, this method accesses the file system.

This method uses the current directory and current volume information to fully qualify `path`. If you specify a file name only in `path`, `GetFullPath` returns the fully qualified path of the current directory.

If you pass in a short file name, it is expanded to a long file name.

If a path contains no significant characters, it is invalid unless it contains one or more "." characters followed by any number of spaces; then it will be parsed as either "." or "..".

The path can include device names, such as "\\\\?\\C:\\".

For more information on file path formats on Windows, see File path formats on Windows systems. For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates the `GetFullPath` method on a Windows-based desktop platform.

_Code sample not included: ~/snippets/csharp/System.IO/Path/ChangeExtension/pathmembers.cs._

## Path.GetFullPath(String, String) method

```csharp
public static string GetFullPath (string path, string basePath);
```

Returns an absolute path from a relative path and a fully qualified base path.

Parameters:

- `path`: A relative path to concatenate to `basePath`.
- `basePath`: The beginning of a fully qualified path.

Returns: The absolute path.

Exceptions:

- `ArgumentNullException`: `path` or `basePath` is `null`.
- `ArgumentException`: `basePath` is not a fully qualified path.

-or-

`path` or `basePath` contains one or more of the invalid characters defined in `Path.GetInvalidPathChars`.

#### Remarks

If `path` is an empty path, the method returns `basePath`. If `path` is a fully qualified path, the method passes `path` to the `GetFullPath` method and returns the result.

Use this method to return a deterministic path based on a specified volume and rooted directory when you're using relative paths. Using a predefined `basePath` rather than one based on the current drive directory guards against unwanted file paths caused by unexpected changes in the current drive and directory.

#### Examples

The following example defines a variable, `basePath`, to represent an application's current directory. It then passes it to the `GetFullPath` method to get a fully qualified path to the application's data directory.

_Code sample not included: ~/snippets/csharp/System.IO/Path/GetFullPath/Program.cs._
