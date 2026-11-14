---
title: "Path class (part 4 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/Path.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Path class (part 4 of 5)

## Path.Join(String[]) method

```csharp
public static string Join (params string?[] paths);
```

Concatenates an array of paths into a single path.

Parameters:

- `paths`: An array of paths.

Returns: The concatenated path.

#### Remarks

This method simply concatenates all the strings in `paths` and adds a directory separator character between any of the path components if one is not already present. If the `Length` of any of the paths in `paths` is zero, the method concatenates the remaining arguments. If the resulting concatenated string's length is zero, the method returns `Empty`.

If any of the paths in `paths`, except for the last one, ends in a path separator character that is not appropriate for the target platform, the `Join` method preserves the original path separator character and appends the supported one. This issue arises in hard-coded paths that use the Windows backslash ("\\") character, which is not recognized as a path separator on Unix-based systems. To work around this issue, you can:

- Retrieve the value of the `DirectorySeparatorChar` property rather than hard-coding a directory separator character.

- Use a forward slash ("/") as the directory separator character. This character is returned by the `DirectorySeparatorChar` property on Unix-based systems and by the `AltDirectorySeparatorChar` property on Windows systems.

Unlike the `Path.Combine` method, the `Path.Join` method does not attempt to root the returned path. (That is, if any of the paths in `paths`, except for the first one, is an absolute path, the `Join` method does not discard the previous paths as the `Path.Combine` method does.)

Not all invalid characters for directory and file names are interpreted as unacceptable by the `Join` method, because you can use these characters for search wildcard characters. For example, while `Path.Join("c:\\", "temp", "*.txt")` might be invalid when creating a file, it is valid as a search string. The `Join` method therefore successfully interprets it.

## Path.Join(Char>, Char>) method

```csharp
public static string Join (ReadOnlySpan<char> path1, ReadOnlySpan<char> path2);
```

Concatenates two path components into a single path.

Parameters:

- `path1`: A character span that contains the first path to join.
- `path2`: A character span that contains the second path to join.

Returns: The combined paths.

#### Remarks

This method simply concatenates `path` and `path2` and adds a directory separator character between the two path components if one is not already present at the end of `path1` or the beginning of `path2`. If the `Length` of either `path1` or `path2` is zero, the method returns the other path. If the `Length` of both `path1` and `path2` is zero, the method returns `Empty`.

If `path1` ends in a path separator character that is not appropriate for the target platform, the `Join` method preserves the original path separator character and appends the supported one. This issue arises in hard-coded paths that use the Windows backslash ("\\") character, which is not recognized as a path separator on Unix-based systems. To work around this issue, you can:

- Retrieve the value of the `DirectorySeparatorChar` property rather than hard-coding a directory separator character.

- Use a forward slash ("/") as the directory separator character. This character is returned by the `DirectorySeparatorChar` property on Unix-based systems and by the `AltDirectorySeparatorChar` property on Windows systems.

Unlike the `Path.Combine` method, the `Path.Join` method does not attempt to root the returned path. (That is, if `path2` is an absolute path, the `Join` method does not discard `path1` and return `path2` as the `Path.Combine` method does.) The following example illustrates the difference in the paths returned by the two methods. If the source of `path2` is user input, the `Path.Combine` method makes it possible for a user to access a file system resource (such as *C:/Users/User1/Documents/Financial/* in the case of the example) that the application did not intend to make accessible.

Not all invalid characters for directory and file names are interpreted as unacceptable by the `Join` method, because you can use these characters for search wildcard characters. For example, while `Path.Join("c:\\", "*.txt")` might be invalid when creating a file, it is valid as a search string. The `Join` method therefore successfully interprets it.

#### Examples

The following example illustrates the difference in the paths returned by the `Join` and `Combine` methods. When the first string is an fully qualified path that includes a drive and root directory and the second is a relative path from the first path, the two methods produce identical results. In the second and third calls to the `ShowPathInformation` method, the strings returned by the two methods diverge. In the second method call, the first string argument is a drive, while the second is a rooted directory. The `Join` method concatenates the two strings and preserves duplicate path separators. The `Combine` method abandons the drive and returns a rooted directory on the current drive. If the application's current drive is C:\\ and the string is used to access a file or files in the directory, it would access C: instead of D:. Finally, because both arguments in the third call to `ShowPathInformation` are rooted, the `Join` method simply appends them to create a nonsensical file path, while the `Combine` method discards the first string and returns the second. Using this string for file access could give the application unintended access to sensitive files.

_Code sample not included: ~/snippets/csharp/System.IO/Path/Combine/Program2.cs._

## Path.Join(String, String) method

```csharp
public static string Join (string? path1, string? path2);
```

Concatenates two paths into a single path.

Parameters:

- `path1`: The first path to join.
- `path2`: The second path to join.

Returns: The concatenated path.

#### Remarks

This method simply concatenates `path` and `path2` and adds a directory separator character between any of the path components if one is not already present. If the length of either `path1` or `path2` is zero, the method concatenates the remaining argument. If the length of the resulting concatenated string is zero, the method returns `Empty`.

If `path1` ends in a path separator character that is not appropriate for the target platform, the `Join` method preserves the original path separator character and appends the supported one. This issue arises in hard-coded paths that use the Windows backslash ("\\") character, which is not recognized as a path separator on Unix-based systems. To work around this issue, you can:

- Retrieve the value of the `DirectorySeparatorChar` property rather than hard-coding a directory separator character.

- Use a forward slash ("/") as the directory separator character. This character is returned by the `DirectorySeparatorChar` property on Unix-based systems and by the `AltDirectorySeparatorChar` property on Windows systems.

Unlike the `Path.Combine` method, the `Path.Join` method does not attempt to root the returned path. (That is, if `path2` is an absolute path, the `Join` method does not discard the previous paths as the `Path.Combine` method does.)

Not all invalid characters for directory and file names are interpreted as unacceptable by the `Join` method, because you can use these characters for search wildcard characters. For example, while `Path.Join("c:\\", "temp", "*.txt")` might be invalid when creating a file, it is valid as a search string. The `Join` method therefore successfully interprets it.

## Path.Join(Char>, Char>, Char>) method

```csharp
public static string Join (ReadOnlySpan<char> path1, ReadOnlySpan<char> path2, ReadOnlySpan<char> path3);
```

Concatenates three path components into a single path.

Parameters:

- `path1`: A character span that contains the first path to join.
- `path2`: A character span that contains the second path to join.
- `path3`: A character span that contains the third path to join.

Returns: The concatenated path.

#### Remarks

This method simply concatenates `path`, `path2`, and `path3` and adds a directory separator character between any of the path components if one is not already present. If the `Length` of any of `path1`, `path2`, or `path3` arguments is zero, the method concatenates the remaining arguments. If the `Length` of all components is zero, the method returns `Empty`.

If `path1` or `path2` ends in a path separator character that is not appropriate for the target platform, the `Join` method preserves the original path separator character and appends the supported one. This issue arises in hard-coded paths that use the Windows backslash ("\\") character, which is not recognized as a path separator on Unix-based systems. To work around this issue, you can:

- Retrieve the value of the `DirectorySeparatorChar` property rather than hard-coding a directory separator character.

- Use a forward slash ("/") as the directory separator character. This character is returned by the `DirectorySeparatorChar` property on Unix-based systems and by the `AltDirectorySeparatorChar` property on Windows systems.

Unlike the `Path.Combine` method, the `Path.Join` method does not attempt to root the returned path. (That is, if `path2` or `path3` is an absolute path, the `Join` method does not discard the previous paths as the `Path.Combine` method does.)

Not all invalid characters for directory and file names are interpreted as unacceptable by the `Join` method, because you can use these characters for search wildcard characters. For example, while `Path.Join("c:\\", "temp", "*.txt")` might be invalid when creating a file, it is valid as a search string. The `Join` method therefore successfully interprets it.

#### Examples

The following example illustrates the difference in the paths returned by the `Join` and `Combine` methods. When the first string is a fully qualified path that includes a drive and root directory and the second is a relative path from the first path, the two methods produce identical results. In the second and third calls to the `ShowPathInformation` method, the strings returned by the two methods diverge. In the second method call, the first string argument is a drive, while the second is a rooted directory. The `Join` method concatenates the two strings and preserves duplicate path separators. A call to the `Path.GetFullPath` method would eliminate the duplication. The `Combine` method abandons the drive and returns a rooted directory on the current drive. If the application's current drive is C:\\ and the string is used to access a file or files in the directory, it would access C: instead of D:. Finally, because the final argument in the third call to `ShowPathInformation` are rooted, the `Join` method simply appends it to the first two arguments to create a nonsensical file path, while the `Combine` method discards the first two strings and returns the third. Using this string for file access could give the application unintended access to sensitive files.

_Code sample not included: ~/snippets/csharp/System.IO/Path/Combine/Program3.cs._

## Path.Join(String, String, String) method

```csharp
public static string Join (string? path1, string? path2, string? path3);
```

Concatenates three paths into a single path.

Parameters:

- `path1`: The first path to join.
- `path2`: The second path to join.
- `path3`: The third path to join.

Returns: The concatenated path.

#### Remarks

This method simply concatenates `path`, `path2`, and `path3` and adds a directory separator character between any of the path components if one is not already present. If the length of any of `path1`, `path2` or `path3` argument is zero, the method concatenates the remaining arguments. If the length of the resulting concatenated string is zero, the method returns `Empty`.

If `path1` or `path2` ends in a path separator character that is not appropriate for the target platform, the `Join` method preserves the original path separator character and appends the supported one. This issue arises in hard-coded paths that use the Windows backslash ("\\") character, which is not recognized as a path separator on Unix-based systems. To work around this issue, you can:

- Retrieve the value of the `DirectorySeparatorChar` property rather than hard-coding a directory separator character.

- Use a forward slash ("/") as the directory separator character. This character is returned by the `DirectorySeparatorChar` property on Unix-based systems and by the `AltDirectorySeparatorChar` property on Windows systems.

Unlike the `Path.Combine` method, the `Path.Join` method does not attempt to root the returned path. (That is, if `path2` or `path3` is an absolute path, the `Join` method does not discard the previous paths as the `Path.Combine` method does.)

Not all invalid characters for directory and file names are interpreted as unacceptable by the `Join` method, because you can use these characters for search wildcard characters. For example, while `Path.Join("c:\\", "temp", "*.txt")` might be invalid when creating a file, it is valid as a search string. The `Join` method therefore successfully interprets it.
