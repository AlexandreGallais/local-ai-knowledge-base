---
title: "Directory class (part 7 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/Directory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Directory class (part 7 of 10)

## Directory.GetFiles(String, String) method

```csharp
public static string[] GetFiles (string path, string searchPattern);
```

Returns the names of files (including their paths) that match the specified search pattern in the specified directory.

Parameters:

- `path`: The relative or absolute path to the directory to search. This string is not case-sensitive.
- `searchPattern`: The search string to match against the names of files in `path`. This parameter can contain a combination of valid literal path and wildcard (* and ?) characters, but it doesn't support regular expressions.

Returns: An array of the full names (including paths) for the files in the specified directory that match the specified search pattern, or an empty array if no files are found.

Exceptions:

- `IOException`: `path` is a file name.

-or-

A network error has occurred.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentException`: `searchPattern` doesn't contain a valid pattern.
- `ArgumentNullException`: `path` or `searchPattern` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is not found or is invalid (for example, it is on an unmapped drive).

#### Remarks
The returned file names are appended to the supplied `path` parameter and the order of the returned file names is not guaranteed; use the `Array.Sort` method if a specific sort order is required.

`searchPattern` can be a combination of literal and wildcard characters, but it doesn't support regular expressions. The following wildcard specifiers are permitted in `searchPattern`.

|Wildcard specifier|Matches|
|------------------------|-------------|
|\* (asterisk)|Zero or more characters in that position.|
|? (question mark)|Exactly one character in that position.|

Characters other than the wildcard are literal characters. For example, the `searchPattern` string "\*t" searches for all names in `path` ending with the letter "t". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

`searchPattern` cannot end in two periods ("..") or contain two periods ("..") followed by `DirectorySeparatorChar` or `AltDirectorySeparatorChar`, nor can it contain any invalid characters. You can query for invalid characters by using the `Path.GetInvalidPathChars` method.

> **Note:**
> Because this method checks against file names with both the 8.3 file name format and the long file name format, a search pattern similar to "\*1\*.txt" may return unexpected file names. For example, using a search pattern of "\*1\*.txt" returns "longfilename.txt" because the equivalent 8.3 file name format is "LONGFI~1.TXT".

The `Directory.EnumerateFiles` and `Directory.GetFiles` methods differ as follows: When you use `Directory.EnumerateFiles`, you can start enumerating the collection of names before the whole collection is returned; when you use `Directory.GetFiles`, you must wait for the whole array of names to be returned before you can access the array. Therefore, when you are working with many files and directories, `Directory.EnumerateFiles` can be more efficient.

The `path` parameter can specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

The case-sensitivity of the `path` parameter corresponds to that of the file system on which the code is running. For example, it's case-insensitive on NTFS (the default Windows file system) and case-sensitive on Linux file systems.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example counts the number of files that begin with the specified letter.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/GetFiles/dir_getfiles2.cs._

## Directory.GetFiles(String, String, EnumerationOptions) method

```csharp
public static string[] GetFiles (string path, string searchPattern, System.IO.EnumerationOptions enumerationOptions);
```

Returns the names of files (including their paths) that match the specified search pattern and enumeration options in the specified directory.

Parameters:

- `path`: The relative or absolute path to the directory to search. This string is not case-sensitive.
- `searchPattern`: The search string to match against the names of files in `path`. This parameter can contain a combination of valid literal and wildcard characters, but it doesn't support regular expressions.
- `enumerationOptions`: An object that describes the search and enumeration configuration to use.

Returns: An array of the full names (including paths) for the files in the specified directory that match the specified search pattern and enumeration options, or an empty array if no files are found.

Exceptions:

- `IOException`: `path` is a file name.

-or-

A network error has occurred.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentException`: `searchPattern` doesn't contain a valid pattern.
- `ArgumentNullException`: `path` or `searchPattern` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is not found or is invalid (for example, it is on an unmapped drive).

#### Remarks
The returned file names are appended to the supplied `path` parameter and the order of the returned file names is not guaranteed; use the `Array.Sort` method if a specific sort order is required.

`searchPattern` can be a combination of literal and wildcard characters, but it doesn't support regular expressions. The following wildcard specifiers are permitted in `searchPattern`.

| Wildcard specifier | Matches                                   |
|--------------------|-------------------------------------------|
| \* (asterisk)      | Zero or more characters in that position. |
| ? (question mark)  | Exactly one character in that position.   |

Characters other than the wildcard are literal characters. For example, the `searchPattern` string "\*t" searches for all names in `path` ending with the letter "t". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

`searchPattern` cannot end in two periods ("..") or contain two periods ("..") followed by `DirectorySeparatorChar` or `AltDirectorySeparatorChar`, nor can it contain any invalid characters. You can query for invalid characters by using the `Path.GetInvalidPathChars` method.

> **Note:**
> Because this method checks against file names with both the 8.3 file name format and the long file name format, a search pattern similar to "\*1\*.txt" may return unexpected file names. For example, using a search pattern of "\*1\*.txt" returns "longfilename.txt" because the equivalent 8.3 file name format is "LONGFI~1.TXT".

The `Directory.EnumerateFiles` and `Directory.GetFiles` methods differ as follows: When you use `Directory.EnumerateFiles`, you can start enumerating the collection of names before the whole collection is returned; when you use `Directory.GetFiles`, you must wait for the whole array of names to be returned before you can access the array. Therefore, when you are working with many files and directories, `Directory.EnumerateFiles` can be more efficient.

The `path` parameter can specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

The case-sensitivity of the `path` parameter corresponds to that of the file system on which the code is running. For example, it's case-insensitive on NTFS (the default Windows file system) and case-sensitive on Linux file systems.

For a list of common I/O tasks, see Common I/O Tasks.

## Directory.GetFiles(String, String, SearchOption) method

```csharp
public static string[] GetFiles (string path, string searchPattern, System.IO.SearchOption searchOption);
```

Returns the names of files (including their paths) that match the specified search pattern in the specified directory, using a value to determine whether to search subdirectories.

Parameters:

- `path`: The relative or absolute path to the directory to search. This string is not case-sensitive.
- `searchPattern`: The search string to match against the names of files in `path`. This parameter can contain a combination of valid literal path and wildcard (* and ?) characters, but it doesn't support regular expressions.
- `searchOption`: One of the enumeration values that specifies whether the search operation should include all subdirectories or only the current directory.

Returns: An array of the full names (including paths) for the files in the specified directory that match the specified search pattern and option, or an empty array if no files are found.

Exceptions:

- `ArgumentException`: `searchPattern` does not contain a valid pattern.
- `ArgumentNullException`: `path` or `searchPattern` is `null`.
- `ArgumentOutOfRangeException`: `searchOption` is not a valid `SearchOption` value.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `DirectoryNotFoundException`: The specified path is not found or is invalid (for example, it is on an unmapped drive).
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `IOException`: `path` is a file name.

-or-

A network error has occurred.

#### Remarks
The returned file names are appended to the supplied  parameter `path` and the order of the returned file names is not guaranteed; use the `Array.Sort` method if a specific sort order is required.

`searchPattern` can be a combination of literal and wildcard characters, but it doesn't support regular expressions. The following wildcard specifiers are permitted in `searchPattern`.

|Wildcard specifier|Matches|
|------------------------|-------------|
|\* (asterisk)|Zero or more characters in that position.|
|? (question mark)|Exactly one character in that position.|

Characters other than the wildcard are literal characters. For example, the `searchPattern` string "\*t" searches for all names in `path` ending with the letter "t". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

`searchPattern` cannot end in two periods ("..") or contain two periods ("..") followed by `DirectorySeparatorChar` or `AltDirectorySeparatorChar`, nor can it contain any invalid characters. You can query for invalid characters by using the `Path.GetInvalidPathChars` method.

> **Note:**
> Because this method checks against file names with both the 8.3 file name format and the long file name format, a search pattern similar to "\*1\*.txt" may return unexpected file names. For example, using a search pattern of "\*1\*.txt" returns "longfilename.txt" because the equivalent 8.3 file name format is "LONGFI~1.TXT".

The `Directory.EnumerateFiles` and `Directory.GetFiles` methods differ as follows: When you use `Directory.EnumerateFiles`, you can start enumerating the collection of names before the whole collection is returned; when you use `Directory.GetFiles`, you must wait for the whole array of names to be returned before you can access the array. Therefore, when you are working with many files and directories, `Directory.EnumerateFiles` can be more efficient.

The file names include the full path.

The `path` parameter can specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

The case-sensitivity of the `path` parameter corresponds to that of the file system on which the code is running. For example, it's case-insensitive on NTFS (the default Windows file system) and case-sensitive on Linux file systems.

For a list of common I/O tasks, see Common I/O Tasks.

## Directory.GetFileSystemEntries(String) method

```csharp
public static string[] GetFileSystemEntries (string path);
```

Returns the names of all files and subdirectories in a specified path.

Parameters:

- `path`: The relative or absolute path to the directory to search. This string is not case-sensitive.

Returns: An array of the names of files and subdirectories in the specified directory, or an empty array if no files or subdirectories are found.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `IOException`: `path` is a file name.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).

#### Remarks
The order of the returned file and directory names is not guaranteed; use the `Array.Sort` method if a specific sort order is required.

The `Directory.EnumerateFileSystemEntries` and `Directory.GetFileSystemEntries` methods differ as follows: When you use `Directory.EnumerateFileSystemEntries`, you can start enumerating the collection of entries before the whole collection is returned; when you use `Directory.GetFileSystemEntries`, you must wait for the whole array of entries to be returned before you can access the array. Therefore, when you are working with many files and directories, `Directory.EnumerateFileSystemEntries` can be more efficient.

This method is identical to `Directory.GetFileSystemEntries` with the asterisk (\*) specified as the search pattern.

The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

The case-sensitivity of the `path` parameter corresponds to that of the file system on which the code is running. For example, it's case-insensitive on NTFS (the default Windows file system) and case-sensitive on Linux file systems.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example uses the `Directory.GetFileSystemEntries` method to fill an array of strings with the names of all files and subdirectories in a user-specified location and prints each string in the array to the console. The example is configured to catch all errors common to this method.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/Overview/class1.cs._
