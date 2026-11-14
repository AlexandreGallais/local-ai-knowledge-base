---
title: "Path class (part 5 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/Path.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Path class (part 5 of 5)

## Path.Join(Char>, Char>, Char>, Char>) method

```csharp
public static string Join (ReadOnlySpan<char> path1, ReadOnlySpan<char> path2, ReadOnlySpan<char> path3, ReadOnlySpan<char> path4);
```

Concatenates four path components into a single path.

Parameters:

- `path1`: A character span that contains the first path to join.
- `path2`: A character span that contains the second path to join.
- `path3`: A character span that contains the third path to join.
- `path4`: A character span that contains the fourth path to join.

Returns: The concatenated path.

#### Remarks

This method simply concatenates `path`, `path2`, `path3` and `path4` and adds a directory separator character between any of the path components if one is not already present. If the `Length` of any of `path1`, `path2`, `path3` or `path4` argument is zero, the method concatenates the remaining arguments. If the `Length` of all components is zero, the method returns `Empty`.

If `path1` or `path2` or `path3` ends in a path separator character that is not appropriate for the target platform, the `Join` method preserves the original path separator character and appends the supported one. This issue arises in hard-coded paths that use the Windows backslash ("\\") character, which is not recognized as a path separator on Unix-based systems. To work around this issue, you can:

- Retrieve the value of the `DirectorySeparatorChar` property rather than hard-coding a directory separator character.

- Use a forward slash ("/") as the directory separator character. This character is returned by the `DirectorySeparatorChar` property on Unix-based systems and by the `AltDirectorySeparatorChar` property on Windows systems.

Unlike the `Path.Combine` method, the `Path.Join` method does not attempt to root the returned path. (That is, if `path2` or `path3` or `path4` is an absolute path, the `Join` method does not discard the previous paths as the `Path.Combine` method does.)

Not all invalid characters for directory and file names are interpreted as unacceptable by the `Join` method, because you can use these characters for search wildcard characters. For example, while `Path.Join("c:\\", "temp", "*.txt")` might be invalid when creating a file, it is valid as a search string. The `Join` method therefore successfully interprets it.

## Path.Join(String, String, String, String) method

```csharp
public static string Join (string? path1, string? path2, string? path3, string? path4);
```

Concatenates four paths into a single path.

Parameters:

- `path1`: The first path to join.
- `path2`: The second path to join.
- `path3`: The third path to join.
- `path4`: The fourth path to join.

Returns: The concatenated path.

#### Remarks

This method simply concatenates `path`, `path2`, `path3` and `path4` and adds a directory separator character between any of the path components if one is not already present. If the length of any of `path1`, `path2`, `path3` or `path4` argument is zero, the method concatenates the remaining arguments. If the length of the resulting concatenated string is zero, the method returns `Empty`.

If `path1` or `path2` or `path3` ends in a path separator character that is not appropriate for the target platform, the `Join` method preserves the original path separator character and appends the supported one. This issue arises in hard-coded paths that use the Windows backslash ("\\") character, which is not recognized as a path separator on Unix-based systems. To work around this issue, you can:

- Retrieve the value of the `DirectorySeparatorChar` property rather than hard-coding a directory separator character.

- Use a forward slash ("/") as the directory separator character. This character is returned by the `DirectorySeparatorChar` property on Unix-based systems and by the `AltDirectorySeparatorChar` property on Windows systems.

Unlike the `Path.Combine` method, the `Path.Join` method does not attempt to root the returned path. (That is, if `path2` or `path3` or `path4` is an absolute path, the `Join` method does not discard the previous paths as the `Path.Combine` method does.)

Not all invalid characters for directory and file names are interpreted as unacceptable by the `Join` method, because you can use these characters for search wildcard characters. For example, while `Path.Join("c:\\", "temp", "*.txt")` might be invalid when creating a file, it is valid as a search string. The `Join` method therefore successfully interprets it.

## Path.TrimEndingDirectorySeparator(Char>) method

```csharp
public static ReadOnlySpan<char> TrimEndingDirectorySeparator (ReadOnlySpan<char> path);
```

Trims one trailing directory separator beyond the root of the specified path.

Parameters:

- `path`: The path to trim.

Returns: The `path` without any trailing directory separators.

To be added.

## Path.TrimEndingDirectorySeparator(String) method

```csharp
public static string TrimEndingDirectorySeparator (string path);
```

Trims one trailing directory separator beyond the root of the specified path.

Parameters:

- `path`: The path to trim.

Returns: The `path` without any trailing directory separators.

To be added.

## Path.TryJoin(Char>, Char>, Char>, Int32) method

```csharp
public static bool TryJoin (ReadOnlySpan<char> path1, ReadOnlySpan<char> path2, Span<char> destination, out int charsWritten);
```

Attempts to concatenate two path components to a single preallocated character span, and returns a value that indicates whether the operation succeeded.

Parameters:

- `path1`: A character span that contains the first path to join.
- `path2`: A character span that contains the second path to join.
- `destination`: A character span to hold the concatenated path.
- `charsWritten`: When the method returns, a value that indicates the number of characters written to the `destination`.

Returns: `true` if the concatenation operation is successful; otherwise, `false`.

#### Remarks

`destination` must be large enough to hold the concatenated path. You can then retrieve the concatenated path by calling the `Span<T>.Slice` method, as the example illustrates.

## Path.TryJoin(Char>, Char>, Char>, Char>, Int32) method

```csharp
public static bool TryJoin (ReadOnlySpan<char> path1, ReadOnlySpan<char> path2, ReadOnlySpan<char> path3, Span<char> destination, out int charsWritten);
```

Attempts to concatenate three path components to a single preallocated character span, and returns a value that indicates whether the operation succeeded.

Parameters:

- `path1`: A character span that contains the first path to join.
- `path2`: A character span that contains the second path to join.
- `path3`: A character span that contains the third path to join.
- `destination`: A character span to hold the concatenated path.
- `charsWritten`: When the method returns, a value that indicates the number of characters written to the `destination`.

Returns: `true` if the concatenation operation is successful; otherwise, `false`.

#### Remarks

`destination` must be large enough to hold the concatenated path. You can then retrieve the concatenated path by calling the `Span<T>.Slice` method, as the example illustrates.

## Path.AltDirectorySeparatorChar field

```csharp
public static readonly char AltDirectorySeparatorChar;
```

Provides a platform-specific alternate character used to separate directory levels in a path string that reflects a hierarchical file system organization.

#### Remarks

This field can have the same value as `DirectorySeparatorChar`. `AltDirectorySeparatorChar` and `DirectorySeparatorChar` are both valid for separating directory levels in a path string.

The value of this field is a slash ('/') on both Windows and Unix-based operating systems.

#### Examples

The following example displays `Path` field values on Windows and on Unix-based systems. Note that Windows supports either the forward slash (which is returned by the `AltDirectorySeparatorChar` field) or the backslash (which is returned by the `DirectorySeparatorChar` field) as path separator characters, while Unix-based systems support only the forward slash.

_Code sample not included: ~/snippets/csharp/System.IO/Path/DirectorySeparatorChar/Program.cs._

## Path.DirectorySeparatorChar field

```csharp
public static readonly char DirectorySeparatorChar;
```

Provides a platform-specific character used to separate directory levels in a path string that reflects a hierarchical file system organization.

#### Remarks

`AltDirectorySeparatorChar` and `DirectorySeparatorChar` are both valid for separating directory levels in a path string.

When you are developing applications that run on multiple platforms:

- If you prefer to hard-code the directory separator character, you should use the forward slash (`/`) character. It is the only recognized directory separator character on Unix systems, as the output from the example shows, and is the `AltDirectorySeparatorChar` on Windows.

- Use string concatenation to dynamically retrieve the path separator character at runtime and incorporate it into file system paths. For example,

```csharp
   separator = Path.DirectorySeparatorChar;
   path = $"{separator}users{separator}user1{separator}";
```

```vb
   separator = Path.DirectorySeparatorChar
   path = $"{separator}users{separator}user1{separator}"
```

You can also retrieve the value from the `AltDirectorySeparatorChar` property, since it is the same on both Windows and Unix-based systems.

- Retrieve the `AltDirectorySeparatorChar` property

If your application is not cross-platform, you can use the separator appropriate for your system.

#### Examples

The following example displays `Path` field values on Windows and on Unix-based systems. Note that Windows supports either the forward slash (which is returned by the `AltDirectorySeparatorChar` field) or the backslash (which is returned by the `DirectorySeparatorChar` field) as path separator characters, while Unix-based systems support only the forward slash.

_Code sample not included: ~/snippets/csharp/System.IO/Path/DirectorySeparatorChar/Program.cs._

## Path.InvalidPathChars field

```csharp
public static readonly char[] InvalidPathChars;
```

Provides a platform-specific array of characters that cannot be specified in path string arguments passed to members of the `Path` class.

To be added.

## Path.PathSeparator field

```csharp
public static readonly char PathSeparator;
```

A platform-specific separator character used to separate path strings in environment variables.

#### Remarks
On Windows-based desktop platforms, the value of this field is the semicolon (;) by default, but might vary on other platforms.

#### Examples
The following example demonstrates the use of the `PathSeparator` field.

_Code sample not included: ~/snippets/csharp/System.IO/Path/ChangeExtension/pathmembers.cs._

## Path.VolumeSeparatorChar field

```csharp
public static readonly char VolumeSeparatorChar;
```

Provides a platform-specific volume separator character.

#### Remarks
The value of this field is a colon (:) on Windows and Macintosh, and a slash (/) on UNIX operating systems. This is most useful for parsing paths such as "c:\\windows" or "MacVolume:System Folder".

#### Examples
The following example demonstrates the use of the `VolumeSeparatorChar` field.

_Code sample not included: ~/snippets/csharp/System.IO/Path/ChangeExtension/pathmembers.cs._
