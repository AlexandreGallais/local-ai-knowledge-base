---
title: "Directory class (part 5 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/Directory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Directory class (part 5 of 10)

## Directory.Exists(String) method

```csharp
public static bool Exists (string? path);
```

Determines whether the given path refers to an existing directory on disk.

Parameters:

- `path`: The path to test.

Returns: `true` if `path` refers to an existing directory; `false` if the directory does not exist or an error occurs when trying to determine if the specified directory exists.

#### Remarks
The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory.

Trailing spaces are removed from the end of the `path` parameter before checking whether the directory exists.

The case-sensitivity of the `path` parameter corresponds to that of the file system on which the code is running. For example, it's case-insensitive on NTFS (the default Windows file system) and case-sensitive on Linux file systems.

If you do not have at a minimum read-only permission to the directory, the `Directory.Exists` method will return `false`.

The `Directory.Exists` method returns `false` if any error occurs while trying to determine if the specified file exists. This can occur in situations that raise exceptions such as passing a file name with invalid characters or too many characters, a failing or missing disk, or if the caller does not have permission to read the file.

#### Examples
The following example takes an array of file or directory names on the command line, determines what kind of name it is, and processes it appropriately.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/Exists/directorylisting.cs._

## Directory.GetCreationTime(String) method

```csharp
public static DateTime GetCreationTime (string path);
```

Gets the creation date and time of a directory.

Parameters:

- `path`: The path of the directory.

Returns: A structure that is set to the creation date and time for the specified directory. This value is expressed in local time.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.

#### Remarks

> **Note:**
>  This method may return an inaccurate value, because it uses native functions whose values may not be continuously updated by the operating system.

This method is equivalent to `File.GetCreationTime`.

If the directory described in the `path` parameter does not exist, this method returns 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC), adjusted to local time.

The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

The case-sensitivity of the `path` parameter corresponds to that of the file system on which the code is running. For example, it's case-insensitive on NTFS (the default Windows file system) and case-sensitive on Linux file systems.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example gets the creation time of the specified directory.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/GetCreationTime/dir_getcreation.cs._

## Directory.GetCreationTimeUtc(String) method

```csharp
public static DateTime GetCreationTimeUtc (string path);
```

Gets the creation date and time, in Coordinated Universal Time (UTC) format, of a directory.

Parameters:

- `path`: The path of the directory.

Returns: A structure that is set to the creation date and time for the specified directory. This value is expressed in UTC time.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.

#### Remarks

> **Note:**
>  This method may return an inaccurate value, because it uses native functions whose values may not be continuously updated by the operating system.

If the directory described in the `path` parameter does not exist, this method returns 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC).

Use this method to get the creation time for a directory based on Coordinated Universal Time (UTC).

#### Examples
The following example illustrates the differences in output when using Coordinated Universal Time (UTC) output.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/GetCreationTimeUtc/example.cs._

## Directory.GetCurrentDirectory() method

```csharp
public static string GetCurrentDirectory ();
```

Gets the current working directory of the application.

Returns: A string that contains the absolute path of the current working directory, and does not end with a backslash (\\).

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.

#### Remarks
The current directory is distinct from the original directory, which is the one from which the process was started.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates how to use the `GetCurrentDirectory` method.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/GetCurrentDirectory/dir_getcurdir.cs._

## Directory.GetDirectories(String) method

```csharp
public static string[] GetDirectories (string path);
```

Returns the names of subdirectories (including their paths) in the specified directory.

Parameters:

- `path`: The relative or absolute path to the directory to search. This string is not case-sensitive.

Returns: An array of the full names (including paths) of subdirectories in the specified path, or an empty array if no directories are found.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `IOException`: `path` is a file name.

-or-

File or directory is corrupted and unreadable (example: invalid first allocation unit of a FAT32 partition).
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).

#### Remarks
This method is identical to `GetDirectories` with the asterisk (\*) specified as the search pattern, so it returns all subdirectories. If you need to search subdirectories, use the `GetDirectories` method, which enables you to specify a search of subdirectories with the `searchOption` parameter.

The `Directory.EnumerateDirectories` and `Directory.GetDirectories` methods differ as follows: When you use `Directory.EnumerateDirectories`, you can start enumerating the collection of names before the whole collection is returned; when you use `Directory.GetDirectories`, you must wait for the whole array of names to be returned before you can access the array. Therefore, when you are working with many files and directories, `Directory.EnumerateDirectories` can be more efficient.

The `path` parameter can specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

The names returned by this method are prefixed with the directory information provided in `path`.

The case-sensitivity of the `path` parameter corresponds to that of the file system on which the code is running. For example, it's case-insensitive on NTFS (the default Windows file system) and case-sensitive on Linux file systems.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example takes an array of file or directory names on the command line, determines what kind of name it is, and processes it appropriately.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/Exists/directorylisting.cs._

## Directory.GetDirectories(String, String) method

```csharp
public static string[] GetDirectories (string path, string searchPattern);
```

Returns the names of subdirectories (including their paths) that match the specified search pattern in the specified directory.

Parameters:

- `path`: The relative or absolute path to the directory to search. This string is not case-sensitive.
- `searchPattern`: The search string to match against the names of subdirectories in `path`. This parameter can contain a combination of valid literal and wildcard characters, but it doesn't support regular expressions.

Returns: An array of the full names (including paths) of the subdirectories that match the search pattern in the specified directory, or an empty array if no directories are found.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentException`: `searchPattern` doesn't contain a valid pattern.
- `ArgumentNullException`: `path` or `searchPattern` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `IOException`: `path` is a file name.

-or-

File or directory is corrupted and unreadable (example: invalid first allocation unit of a FAT32 partition).
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).

#### Remarks
This method returns all subdirectories directly under the specified directory that match the specified search pattern. If the specified directory has no subdirectories, or no subdirectories match the `searchPattern` parameter, this method returns an empty array. Only the top directory is searched. If you want to search the subdirectories as well, use the `GetDirectories` method and specify `AllDirectories` in the `searchOption` parameter.

`searchPattern` can be a combination of literal and wildcard characters, but it doesn't support regular expressions. The following wildcard specifiers are permitted in `searchPattern`.

|Wildcard specifier|Matches|
|------------------------|-------------|
|\* (asterisk)|Zero or more characters in that position.|
|? (question mark)|Exactly one character in that position.|

Characters other than the wildcard are literal characters. For example, the `searchPattern` string "\*t" searches for all names in `path` ending with the letter "t". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

`searchPattern` cannot end in two periods ("..") or contain two periods ("..") followed by `DirectorySeparatorChar` or `AltDirectorySeparatorChar`, nor can it contain any invalid characters. You can query for invalid characters by using the `Path.GetInvalidPathChars` method.

The `path` parameter can specify relative or absolute path information, and is not case-sensitive. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

The `Directory.EnumerateDirectories` and `Directory.GetDirectories` methods differ as follows: When you use `Directory.EnumerateDirectories`, you can start enumerating the collection of names before the whole collection is returned; when you use `Directory.GetDirectories`, you must wait for the whole array of names to be returned before you can access the array. Therefore, when you are working with many files and directories, `Directory.EnumerateDirectories` can be more efficient.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example counts the number of directories in a path that begin with the specified letter.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/GetDirectories/dir_getdirs2.cs._
