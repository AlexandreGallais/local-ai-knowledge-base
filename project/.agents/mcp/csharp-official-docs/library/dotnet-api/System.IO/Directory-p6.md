---
title: "Directory class (part 6 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/Directory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Directory class (part 6 of 10)

## Directory.GetDirectories(String, String, EnumerationOptions) method

```csharp
public static string[] GetDirectories (string path, string searchPattern, System.IO.EnumerationOptions enumerationOptions);
```

Returns the names of subdirectories (including their paths) that match the specified search pattern and enumeration options in the specified directory.

Parameters:

- `path`: The relative or absolute path to the directory to search. This string is not case-sensitive.
- `searchPattern`: The search string to match against the names of subdirectories in `path`. This parameter can contain a combination of valid literal and wildcard characters, but it doesn't support regular expressions.
- `enumerationOptions`: An object that describes the search and enumeration configuration to use.

Returns: An array of the full names (including paths) of the subdirectories that match the search pattern and enumeration options in the specified directory, or an empty array if no directories are found.

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

| Wildcard specifier | Matches                                   |
|--------------------|-------------------------------------------|
| \* (asterisk)      | Zero or more characters in that position. |
| ? (question mark)  | Exactly one character in that position.   |

Characters other than the wildcard are literal characters. For example, the `searchPattern` string "\*t" searches for all names in `path` ending with the letter "t". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

`searchPattern` cannot end in two periods ("..") or contain two periods ("..") followed by `DirectorySeparatorChar` or `AltDirectorySeparatorChar`, nor can it contain any invalid characters. You can query for invalid characters by using the `Path.GetInvalidPathChars` method.

The `path` parameter can specify relative or absolute path information, and is not case-sensitive. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

The `Directory.EnumerateDirectories` and `Directory.GetDirectories` methods differ as follows: When you use `Directory.EnumerateDirectories`, you can start enumerating the collection of names before the whole collection is returned; when you use `Directory.GetDirectories`, you must wait for the whole array of names to be returned before you can access the array. Therefore, when you are working with many files and directories, `Directory.EnumerateDirectories` can be more efficient.

For a list of common I/O tasks, see Common I/O Tasks.

## Directory.GetDirectories(String, String, SearchOption) method

```csharp
public static string[] GetDirectories (string path, string searchPattern, System.IO.SearchOption searchOption);
```

Returns the names of the subdirectories (including their paths) that match the specified search pattern in the specified directory, and optionally searches subdirectories.

Parameters:

- `path`: The relative or absolute path to the directory to search. This string is not case-sensitive.
- `searchPattern`: The search string to match against the names of subdirectories in `path`. This parameter can contain a combination of valid literal and wildcard characters, but it doesn't support regular expressions.
- `searchOption`: One of the enumeration values that specifies whether the search operation should include all subdirectories or only the current directory.

Returns: An array of the full names (including paths) of the subdirectories that match the specified criteria, or an empty array if no directories are found.

Exceptions:

- `ArgumentException`: `searchPattern` does not contain a valid pattern.
- `ArgumentNullException`: `path` or `searchPattern` is `null`.
- `ArgumentOutOfRangeException`: `searchOption` is not a valid `SearchOption` value.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `IOException`: `path` is a file name.

-or-

File or directory is corrupted and unreadable (example: invalid first allocation unit of a FAT32 partition).
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).

#### Remarks
The `path` parameter can specify relative or absolute path information, and is not case-sensitive. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

`searchPattern` can be a combination of literal and wildcard characters, but it doesn't support regular expressions. The following wildcard specifiers are permitted in `searchPattern`.

|Wildcard specifier|Matches|
|------------------------|-------------|
|\* (asterisk)|Zero or more characters in that position.|
|? (question mark)|Exactly one character in that position.|

Characters other than the wildcard are literal characters. For example, the `searchPattern` string "\*t" searches for all names in `path` ending with the letter "t". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

`searchPattern` cannot end in two periods ("..") or contain two periods ("..") followed by `DirectorySeparatorChar` or `AltDirectorySeparatorChar`, nor can it contain any invalid characters. You can query for invalid characters by using the `Path.GetInvalidPathChars` method.

The `Directory.EnumerateDirectories` and `Directory.GetDirectories` methods differ as follows: When you use `Directory.EnumerateDirectories`, you can start enumerating the collection of names before the whole collection is returned; when you use `Directory.GetDirectories`, you must wait for the whole array of names to be returned before you can access the array. Therefore, when you are working with many files and directories, `Directory.EnumerateDirectories` can be more efficient.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example counts the number of directories that begin with the specified letter in a path. Only the top-level directory is searched.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/GetDirectories/dir_getdirs3.cs._

## Directory.GetDirectoryRoot(String) method

```csharp
public static string GetDirectoryRoot (string path);
```

Returns the volume information, root information, or both for the specified path.

Parameters:

- `path`: The path of a file or directory.

Returns: A string that contains the volume information, root information, or both for the specified path.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.

#### Remarks
This method obtains the fully qualified path name of `path`, as returned by `Path.GetFullPath`, and returns root directory information. The specified path is not required to exist.

The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

The case-sensitivity of the `path` parameter corresponds to that of the file system on which the code is running. For example, it's case-insensitive on NTFS (the default Windows file system) and case-sensitive on Linux file systems.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example illustrates how to set the current directory and display the directory root.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/GetDirectoryRoot/example.cs._

## Directory.GetFiles(String) method

```csharp
public static string[] GetFiles (string path);
```

Returns the names of files (including their paths) in the specified directory.

Parameters:

- `path`: The relative or absolute path to the directory to search. This string is not case-sensitive.

Returns: An array of the full names (including paths) for the files in the specified directory, or an empty array if no files are found.

Exceptions:

- `IOException`: `path` is a file name.

-or-

A network error has occurred.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is not found or is invalid (for example, it is on an unmapped drive).

#### Remarks
The `Directory.EnumerateFiles` and `Directory.GetFiles` methods differ as follows: When you use `Directory.EnumerateFiles`, you can start enumerating the collection of names before the whole collection is returned; when you use `Directory.GetFiles`, you must wait for the whole array of names to be returned before you can access the array. Therefore, when you are working with many files and directories, `Directory.EnumerateFiles` can be more efficient.

The returned file names are appended to the supplied `path` parameter.

This method is identical to `GetFiles` with the asterisk (\*) specified as the search pattern.

The `path` parameter can specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

The order of the returned file names is not guaranteed; use the `Array.Sort` method if a specific sort order is required.

The case-sensitivity of the `path` parameter corresponds to that of the file system on which the code is running. For example, it's case-insensitive on NTFS (the default Windows file system) and case-sensitive on Linux file systems.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates how to use the `Directory.GetFiles` method to return file names from a user-specified location. The example is configured to catch all errors common to this method.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/Exists/directorylisting.cs._
