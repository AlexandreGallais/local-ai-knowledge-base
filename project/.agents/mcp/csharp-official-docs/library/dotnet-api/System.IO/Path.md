---
title: "Path class (part 1 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/Path.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Path class

Namespace: `System.IO`

```csharp
public static class Path
```

Performs operations on `String` instances that contain file or directory path information. These operations are performed in a cross-platform manner.

#### Remarks

A path is a string that provides the location of a file or directory. A path does not necessarily point to a location on disk; for example, a path might map to a location in memory or on a device. The exact format of a path is determined by the current platform. For example, on some systems, a path can start with a drive or volume letter, while this element is not present in other systems. On some systems, file paths can contain extensions, which indicate the type of information stored in the file. The format of a file name extension is platform-dependent; for example, some systems limit extensions to three characters (such as FAT16 commonly used on smaller flash storage and older versions of ISO 9660 used on optical media), and others do not. The current platform also determines the set of characters used to separate the elements of a path, and the set of characters that cannot be used when specifying paths. Because of these differences, the fields of the `Path` class as well as the exact behavior of some members of the `Path` class are platform-dependent.

A path can contain absolute or relative location information. Absolute paths fully specify a location: the file or directory can be uniquely identified regardless of the current location. Relative paths specify a partial location: the current location is used as the starting point when locating a file specified with a relative path. To determine the current directory, call `Directory.GetCurrentDirectory`.

This type also supports access to file system objects that are device names, such as "\\\\?\\C:\\".

For more information on file path formats on Windows, see File path formats on Windows systems.

Most members of the `Path` class do not interact with the file system and do not verify the existence of the file specified by a path string. `Path` class members that modify a path string, such as `Path.ChangeExtension`, have no effect on names of files in the file system.

`Path.GetFullPath` validates the contents of a specified path string, and throws an `ArgumentException` if the string contains characters that are not valid in path strings, as defined in the characters returned from the `Path.GetInvalidPathChars` method. For example, on Windows-based desktop platforms, invalid path characters might include quote ("), less than (\<), greater than (>), pipe (|), backspace (\\b), null (\\0), and Unicode characters 16 through 18 and 20 through 25.

The members of the `Path` class enable you to quickly and easily perform common operations such as determining whether a file name extension is part of a path, and combining two strings into one path name.

All members of the `Path` class are static and can therefore be called without having an instance of a path.

> **Note:**
> In members that accept a path as an input string, that path must be well-formed or an exception is raised. For example, if a path is fully qualified but begins with a space, the path is not trimmed in methods of the class. Therefore, the path is malformed and an exception is raised. Similarly, a path or a combination of paths cannot be fully qualified twice. For example, "c:\\temp c:\\windows" also raises an exception in most cases. Ensure that your paths are well-formed when using methods that accept a path string.

In members that accept a path, the path can refer to a file or just a directory. The specified path can also refer to a relative path or a Universal Naming Convention (UNC) path for a server and share name. For example, all the following are acceptable paths:

- "c:\\\\MyDir\\\\MyFile.txt" in C#, or "c:\\MyDir\\MyFile.txt" in Visual Basic.
- "c:\\\\MyDir" in C#, or "c:\\MyDir" in Visual Basic.
- "MyDir\\\\MySubdir" in C#, or "MyDir\\MySubDir" in Visual Basic.
- "\\\\\\\\MyServer\\\\MyShare" in C#, or "\\\\MyServer\\MyShare" in Visual Basic.

Because all these operations are performed on strings, it is impossible to verify that the results are valid in all scenarios. For example, the `Path.GetExtension` method parses a string that you pass to it and returns the extension from that string. However, this does not mean that a file with that extension exists on the disk.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates some of the main members of the `Path` class.

_Code sample not included: ~/snippets/csharp/System.IO/Path/Overview/path class.cs._

## Path.ChangeExtension(String, String) method

```csharp
public static string? ChangeExtension (string? path, string? extension);
```

Changes the extension of a path string.

Parameters:

- `path`: The path information to modify.
- `extension`: The new extension (with or without a leading period). Specify `null` to remove an existing extension from `path`.

Returns: The modified path information.

On Windows-based desktop platforms, if `path` is `null` or an empty string (""), the path information is returned unmodified. If `extension` is `null`, the returned string contains the specified path with its extension removed. If `path` has no extension, and `extension` is not `null`, the returned path string contains `extension` appended to the end of `path`.

#### Remarks
If neither `path` nor `extension` contains a period (.), `ChangeExtension` adds the period.

The `extension` parameter can contain multiple periods and any valid path characters, and can be any length. If `extension` is `null`, the returned string contains the contents of `path` with the last period and all characters following it removed.

If `extension` is an empty string, the returned path string contains the contents of `path` with any characters following the last period removed.

If `path` does not have an extension and `extension` is not `null`, the returned string contains `path` followed by `extension`.

If `extension` is not `null` and does not contain a leading period, the period is added.

If `path` contains a multiple extension separated by multiple periods, the returned string contains the contents of `path` with the last period and all characters following it replaced by `extension`. For example, if `path` is "\\Dir1\\examples\\pathtests.csx.txt" and `extension` is "cs", the modified path is "\\Dir1\\examples\\pathtests.csx.cs".

It is not possible to verify that the returned results are valid in all scenarios. For example, if `path` is empty, `extension` is appended.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates a use of the `ChangeExtension` method.

_Code sample not included: ~/snippets/csharp/System.IO/Path/ChangeExtension/pathmembers.cs._

## Path.Combine(String>) method

```csharp
public static string Combine (scoped ReadOnlySpan<string> paths);
```

Combines a span of strings into a path.

Parameters:

- `paths`: A span of parts of the path.

Returns: The combined paths.

To be added.

## Path.Combine(String[]) method

```csharp
public static string Combine (params string[] paths);
```

Combines an array of strings into a path.

Parameters:

- `paths`: An array of parts of the path.

Returns: The combined paths.

Exceptions:

- `ArgumentNullException`: One of the strings in the array is `null`.

#### Remarks

`paths` should be an array of the parts of the path to combine. If the one of the subsequent paths is an absolute path, then the combine operation resets starting with that absolute path, discarding all previous combined paths.

If any element in `paths` but the last one does not end with either the `DirectorySeparatorChar` or the `AltDirectorySeparatorChar` character, the `Combine` method adds a `DirectorySeparatorChar` character between that element and the next one. Note that, if the element ends in a path separator character that is not appropriate for the target platform, the `Combine` method preserves the original path separator character and appends a supported one. The following example compares the result on Windows and Unix-based systems when the backslash is used as a path separator character.

_Code sample not included: ~/snippets/csharp/System.IO/Path/Combine/Program.cs._

Zero-length strings are omitted from the combined path.

The parameters are not parsed if they have white space.

#### Examples
The following example combines an array of strings into a path.

_Code sample not included: ~/snippets/csharp/System.IO/Path/Combine/program1.cs._

## Path.Combine(String, String) method

```csharp
public static string Combine (string path1, string path2);
```

Combines two strings into a path.

Parameters:

- `path1`: The first path to combine.
- `path2`: The second path to combine.

Returns: The combined paths. If one of the specified paths is a zero-length string, this method returns the other path. If `path2` contains an absolute path, this method returns `path2`.

Exceptions:

- `ArgumentNullException`: `path1` or `path2` is `null`.

#### Remarks
If `path1` does not end with a valid separator character as defined in `DirectorySeparatorChar` or `AltDirectorySeparatorChar`, `DirectorySeparatorChar` is appended to `path1` before concatenation. Note that if `path1` ends in a path separator character that is not appropriate for the target platform, the `Combine` method preserves the original path separator character and appends a supported one. The following example compares the result on Windows and Unix-based systems when the backslash is used as a path separator character.

_Code sample not included: ~/snippets/csharp/System.IO/Path/Combine/Program.cs._

If `path2` does not include a root (for example, if `path2` does not start with a separator character or a drive specification), the result is a concatenation of the two paths, with an intervening separator character. If `path2` includes a root, `path2` is returned.

The parameters are not parsed if they have white space. Therefore, if `path2` includes white space (for example, " \\file.txt "), the `Path.Combine` method appends `path2` to `path1` instead of returning only `path2`.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates using the `Combine` method on Windows.

_Code sample not included: ~/snippets/csharp/System.IO/Path/Combine/pathcombine.cs._

## Path.Combine(String, String, String) method

```csharp
public static string Combine (string path1, string path2, string path3);
```

Combines three strings into a path.

Parameters:

- `path1`: The first path to combine.
- `path2`: The second path to combine.
- `path3`: The third path to combine.

Returns: The combined paths.

Exceptions:

- `ArgumentNullException`: `path1`, `path2`, or `path3` is `null`.

#### Remarks
`path1` should be an absolute path (for example, "d:\\archives" or "\\\\archives\\public"). If `path2` or `path3` is also an absolute path, the combine operation discards all previously combined paths and resets to that absolute path.

Zero-length strings are omitted from the combined path.

If `path1` or `path2` does not end with a valid separator character as defined in `DirectorySeparatorChar` or `AltDirectorySeparatorChar`, `DirectorySeparatorChar` is appended to `path1` or `path2` before concatenation. Note that if `path1` or `path2` ends in a path separator character that is not appropriate for the target platform, the `Combine` method preserves the original path separator character and appends a supported one. The following example compares the result on Windows and Unix-based systems when the backslash is used as a path separator character.

_Code sample not included: ~/snippets/csharp/System.IO/Path/Combine/Program.cs._

If `path2` does not include a root (for example, if `path2` does not start with a separator character or a drive specification), the result is a concatenation of the two paths, with an intervening separator character. If `path2` includes a root, `path2` is returned.

The parameters are not parsed if they have white space. Therefore, if `path2` includes white space (for example, " \\file.txt "), the `Path.Combine` method appends `path2` to `path1`.

#### Examples
The following example combines three paths.

_Code sample not included: ~/snippets/csharp/System.IO/Path/Combine/program1.cs._

## Path.Combine(String, String, String, String) method

```csharp
public static string Combine (string path1, string path2, string path3, string path4);
```

Combines four strings into a path.

Parameters:

- `path1`: The first path to combine.
- `path2`: The second path to combine.
- `path3`: The third path to combine.
- `path4`: The fourth path to combine.

Returns: The combined paths.

Exceptions:

- `ArgumentNullException`: `path1`, `path2`, `path3`, or `path4` is `null`.

#### Remarks
`path1` should be an absolute path (for example, "d:\\archives" or "\\\\archives\\public"). If one of the subsequent paths is also an absolute path, the combine operation discards all previously combined paths and resets to that absolute path.

Zero-length strings are omitted from the combined path.

If `path1`, `path2`, or `path3` does not end with a valid separator character as defined in `DirectorySeparatorChar` or `AltDirectorySeparatorChar`, `DirectorySeparatorChar` is appended to it before concatenation. Note that if `path1`, `path2`, or `path3` ends in a path separator character that is not appropriate for the target platform, the `Combine` method preserves the original path separator character and appends a supported one. The following example compares the result on Windows and Unix-based systems when the backslash is used as a path separator character.

_Code sample not included: ~/snippets/csharp/System.IO/Path/Combine/Program.cs._

If `path2` does not include a root (for example, if `path2` does not start with a separator character or a drive specification), the result is a concatenation of the two paths, with an intervening separator character. If `path2` includes a root, `path2` is returned.

The parameters are not parsed if they have white space. Therefore, if `path2` includes white space (for example, " \\file.txt "), the `Path.Combine` method appends `path2` to `path1`.

#### Examples
The following example combines four paths.

_Code sample not included: ~/snippets/csharp/System.IO/Path/Combine/program1.cs._

## Path.EndsInDirectorySeparator(Char>) method

```csharp
public static bool EndsInDirectorySeparator (ReadOnlySpan<char> path);
```

Returns a value that indicates whether the path, specified as a read-only span, ends in a directory separator.

Parameters:

- `path`: The path to analyze.

Returns: `true` if the path ends in a directory separator; otherwise, `false`.

To be added.
