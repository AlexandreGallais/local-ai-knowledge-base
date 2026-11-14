---
title: "Path class (part 3 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/Path.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Path class (part 3 of 5)

## Path.GetInvalidFileNameChars() method

```csharp
public static char[] GetInvalidFileNameChars ();
```

Gets an array containing the characters that are not allowed in file names.

Returns: An array containing the characters that are not allowed in file names.

#### Remarks
The array returned from this method is not guaranteed to contain the complete set of characters that are invalid in file and directory names. The full set of invalid characters can vary by file system. For example, on Windows-based desktop platforms, invalid path characters might include ASCII/Unicode characters 1 through 31, as well as quote ("), less than (\<), greater than (>), pipe (|), backspace (\\b), null (\\0) and tab (\\t).

#### Examples
The following example demonstrates the `Path.GetInvalidFileNameChars` method and the `Path.GetInvalidPathChars` method to retrieve invalid characters.

_Code sample not included: ~/snippets/csharp/System.IO/Path/GetInvalidFileNameChars/example.cs._

## Path.GetInvalidPathChars() method

```csharp
public static char[] GetInvalidPathChars ();
```

Gets an array containing the characters that are not allowed in path names.

Returns: An array containing the characters that are not allowed in path names.

#### Remarks
The array returned from this method is not guaranteed to contain the complete set of characters that are invalid in file and directory names. The full set of invalid characters can vary by file system. For example, on Windows-based desktop platforms, invalid path characters might include ASCII/Unicode characters 1 through 31, as well as pipe (|) and null (\\0).

#### Examples
The following example demonstrates the `Path.GetInvalidFileNameChars` method and the `Path.GetInvalidPathChars` method to retrieve invalid characters.

_Code sample not included: ~/snippets/csharp/System.IO/Path/GetInvalidFileNameChars/example.cs._

## Path.GetPathRoot(Char>) method

```csharp
public static ReadOnlySpan<char> GetPathRoot (ReadOnlySpan<char> path);
```

Gets the root directory information from the path contained in the specified character span.

Parameters:

- `path`: A read-only span of characters containing the path from which to obtain root directory information.

Returns: A read-only span of characters containing the root directory of `path`.

#### Remarks

This method does not verify that the path or file exists.

Unlike the string overload, this method doesn't normalize directory separators.

A `ReadOnlySpan<System.Char>` is "effectively empty" if:

- In Windows, calling `IsEmpty` on this span of characters returns `true`, or all its characters are spaces (' ').
- In Unix, calling `IsEmpty` on this span of characters returns `true`.

Possible patterns for the read-only character span returned by this method are as follows:

- `Empty` (`path` was `Empty`.
- `Empty` (`path` specified a relative path on the current drive or volume).
- "/" (Unix: `path` specified an absolute path on the current drive).
- "X:" (Windows: `path` specified a relative path on a drive, where *X* represents a drive or volume letter).
- "X:\\" (Windows: `path` specified an absolute path on a given drive).
- "\\\\ComputerName\\SharedFolder" (Windows: a UNC path).
- "\\\\?\\C:" (Windows: a DOS device path).

For more information on file paths on Windows, see File path formats on Windows systems. For a list of common I/O tasks, see Common I/O Tasks.

## Path.GetPathRoot(String) method

```csharp
public static string? GetPathRoot (string? path);
```

Gets the root directory information from the path contained in the specified string.

Parameters:

- `path`: A string containing the path from which to obtain root directory information.

Returns: The root directory of `path` if it is rooted.

-or-

`String.Empty` if `path` does not contain root directory information.

-or-

`null` if `path` is `null` or is effectively empty.

#### Remarks

This method does not verify that the path or file exists.

This method normalizes directory separators.

A string is "effectively empty" if:

- In Windows, calling `IsEmpty` on this string returns `true`, or all its characters are spaces (' ').
- In Unix, calling `String.IsNullOrEmpty` on this string returns `true`.

Possible patterns for the string returned by this method are as follows:

- `null` (`path` was null or an empty string).
- An empty string (`path` specified a relative path on the current drive or volume).
- "/" (Unix: `path` specified an absolute path on the current drive).
- "X:" (Windows: `path` specified a relative path on a drive, where *X* represents a drive or volume letter).
- "X:\\" (Windows: `path` specified an absolute path on a given drive).
- "\\\\ComputerName\\SharedFolder" (Windows: a UNC path).
- "\\\\?\\C:" (Windows: a DOS device path).

For more information on file paths on Windows, see File path formats on Windows systems. For a list of common I/O tasks, see Common I/O Tasks.

#### Examples

The following example demonstrates a use of the `GetPathRoot` method.

_Code sample not included: ~/snippets/csharp/System.IO/Path/ChangeExtension/pathmembers.cs._

## Path.GetRandomFileName() method

```csharp
public static string GetRandomFileName ();
```

Returns a random folder name or file name.

Returns: A random folder name or file name.

#### Remarks

Unlike `Path.GetTempFileName`, `Path.GetRandomFileName` does not create a file.

#### Examples
The following example show output from the `Path.GetRandomFileName` method.

_Code sample not included: ~/snippets/csharp/System.IO/Path/ChangeExtension/pathmembers20.cs._

## Path.GetRelativePath(String, String) method

```csharp
public static string GetRelativePath (string relativeTo, string path);
```

Returns a relative path from one path to another.

Parameters:

- `relativeTo`: The source path the result should be relative to. This path is always considered to be a directory.
- `path`: The destination path.

Returns: The relative path, or `path` if the paths don't share the same root.

Exceptions:

- `ArgumentNullException`: `relativeTo` or `path` is `null`.
- `ArgumentException`: `relativeTo` or `path` is effectively empty.

Paths are resolved by calling the `Path.GetFullPath` method before calculating the difference. The method uses the default file path comparison for the current platform (`OrdinalIgnoreCase` for Windows and macOS, `Ordinal` for Linux).

#### Examples
The following code shows how to call the `Path.GetRelativePath` method.

_Code sample not included: ~/snippets/csharp/System.IO/Path/GetRelativePath/GetRelativePath.cs._

## Path.GetTempFileName() method

```csharp
public static string GetTempFileName ();
```

Creates a uniquely named, zero-byte temporary file on disk and returns the full path of that file.

Returns: The full path of the temporary file.

Exceptions:

- `IOException`: An I/O error occurs, such as no unique temporary file name is available.

-or-

This method was unable to create a temporary file.

#### Remarks

This method creates a temporary file with a *.tmp* file extension and returns the path to it. The temporary file is created within the user's temporary folder, which is the path returned by the `Path.GetTempPath` method.

The `Path.GetTempFileName` method will raise an `IOException` if no unique temporary file name is available. To resolve this error, delete all unneeded temporary files.

For a list of common I/O tasks, see Common I/O Tasks.

## Path.GetTempPath() method

```csharp
public static string GetTempPath ();
```

Returns the path of the current user's temporary folder.

Returns: The path to the temporary folder, ending with a  `Path.DirectorySeparatorChar`.

Exceptions:

- `SecurityException`: The caller does not have the required permissions.

#### Remarks

The method does not verify that the path exists or test to see if the current process can access the path.

#### Windows

If the current Windows version exposes the `GetTempPath2` Win32 API, this method invokes that API and returns the resolved path. For more information on how this resolution is performed, including how to control the return value through the use of environment variables, see the _Remarks_ section of the GetTempPath2 documentation. The GetTempPath2 API might not be available on all versions of Windows.

On Windows versions that don't expose GetTempPath2, this method instead invokes the `GetTempPath` Win32 API and returns the resolved path. For more information on how this resolution is performed, including how to control the return value through the use of environment variables, see the _Remarks_ section of the GetTempPath documentation.

#### macOS

If the `TMPDIR` environment variable has been set, this method returns the value specified by that environment variable. macOS sets `TMPDIR` on login to a per-user temporary directory.

Otherwise, this method returns `/tmp/`, which is shared among all users.

> **Caution:**
> If your application needs a private temporary directory, use `Directory.CreateTempSubdirectory`, which creates a subdirectory with owner-only permissions (`700`).

#### Linux

If the `TMPDIR` environment variable has been set, this method returns the value specified by that environment variable.

Otherwise, this method returns `/tmp/`.
The `/tmp/` directory on Linux is commonly shared among all users (`1777` permissions); ensure this meets your application's security needs.

> **Caution:**
> If your application needs a private temporary directory, use `Directory.CreateTempSubdirectory`, which creates a subdirectory with owner-only permissions (`700`).

---

#### Examples
The following code shows how to call the `Path.GetTempPath` method.

```vb
Dim result As String = Path.GetTempPath()
Console.WriteLine(result)
```

```csharp
string result = Path.GetTempPath();
Console.WriteLine(result);
```

This example produces output similar to the following.

```txt
C:\Users\UserName\AppData\Local\Temp\
```

## Path.HasExtension(Char>) method

```csharp
public static bool HasExtension (ReadOnlySpan<char> path);
```

Determines whether the path represented by the specified character span includes a file name extension.

Parameters:

- `path`: The path to search for an extension.

Returns: `true` if the characters that follow the last directory separator character in the path include a period ("."), and the last such period is followed by one or more characters; otherwise, `false`.

A trailing period in `path` is not considered an extension, even if an earlier period is followed by characters. For example, `file.tar.` has no extension.

## Path.HasExtension(String) method

```csharp
public static bool HasExtension (string? path);
```

Determines whether a path includes a file name extension.

Parameters:

- `path`: The path to search for an extension.

Returns: `true` if the characters that follow the last `Path.DirectorySeparatorChar` or `Path.AltDirectorySeparatorChar` character in the path include a period (.), and the last such period is followed by one or more characters; otherwise, `false`.

#### Remarks
Starting from the end of `path`, this method searches for a period (.), and stops at the first period it finds or at a `DirectorySeparatorChar` or `AltDirectorySeparatorChar` character. It returns `true` if it finds a period and that period isn't the last character of `path`. For example, `Path.HasExtension("file.tar.")` returns `false`.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates the use of the `HasExtension` method.

_Code sample not included: ~/snippets/csharp/System.IO/Path/ChangeExtension/pathmembers.cs._

## Path.IsPathFullyQualified(Char>) method

```csharp
public static bool IsPathFullyQualified (ReadOnlySpan<char> path);
```

Returns a value that indicates whether the file path represented by the specified character span is fixed to a specific drive or UNC path.

Parameters:

- `path`: A file path.

Returns: `true` if the path is fixed to a specific drive or UNC path; `false` if the path is relative to the current drive or working directory.

## Path.IsPathFullyQualified(String) method

```csharp
public static bool IsPathFullyQualified (string path);
```

Returns a value that indicates whether the specified file path is fixed to a specific drive or UNC path.

Parameters:

- `path`: A file path.

Returns: `true` if the path is fixed to a specific drive or UNC path; `false` if the path is relative to the current drive or working directory.

Exceptions:

- `ArgumentNullException`: `path` is `null`.

#### Remarks

This method handles paths that use the alternate directory separator. It's a frequent mistake to assume that rooted paths (`IsPathRooted`) aren't relative. For example, "C:a" is drive relative, that is, it's resolved against the current directory for C: (rooted, but relative). "C:\\a" is rooted and not relative, that is, the current directory isn't used to modify the path.

## Path.IsPathRooted(Char>) method

```csharp
public static bool IsPathRooted (ReadOnlySpan<char> path);
```

Returns a value that indicates whether the specified character span that represents a file path contains a root.

Parameters:

- `path`: The path to test.

Returns: `true` if `path` contains a root; otherwise, `false`.

To be added.

## Path.IsPathRooted(String) method

```csharp
public static bool IsPathRooted (string? path);
```

Returns a value indicating whether the specified path string contains a root.

Parameters:

- `path`: The path to test.

Returns: `true` if `path` contains a root; otherwise, `false`.

#### Remarks
The `Path.IsPathRooted` method returns `true` if the first character is a directory separator character such as "\\", or if the path starts with a drive letter and colon (:). For example, it returns `true` for `path` strings such as "\\\\MyDir\\MyFile.txt", "C:\\MyDir", or "C:MyDir". It returns `false` for `path` strings such as "MyDir".

This method does not verify that the path or file name exists.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates how the `IsPathRooted` method can be used to test three strings.

_Code sample not included: ~/snippets/csharp/System.IO/Path/ChangeExtension/pathmembers.cs._

## Path.Join(String>) method

```csharp
public static string Join (scoped ReadOnlySpan<string?> paths);
```

Concatenates a span of paths into a single path.

Parameters:

- `paths`: A span of paths.

Returns: The concatenated path.

To be added.
