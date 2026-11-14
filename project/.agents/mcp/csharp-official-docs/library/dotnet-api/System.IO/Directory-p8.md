---
title: "Directory class (part 8 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/Directory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Directory class (part 8 of 10)

## Directory.GetFileSystemEntries(String, String) method

```csharp
public static string[] GetFileSystemEntries (string path, string searchPattern);
```

Returns an array of file names and directory names that match a search pattern in a specified path.

Parameters:

- `path`: The relative or absolute path to the directory to search. This string is not case-sensitive.
- `searchPattern`: The search string to match against the names of files and directories in `path`. This parameter can contain a combination of valid literal path and wildcard (* and ?) characters, but it doesn't support regular expressions.

Returns: An array of file names and directory names that match the specified search criteria, or an empty array if no files or directories are found.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentException`: `searchPattern` does not contain a valid pattern.
- `ArgumentNullException`: `path` or `searchPattern` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `IOException`: `path` is a file name.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).

#### Remarks
The order of the returned file and directory names is not guaranteed; use the `Array.Sort` method if a specific sort order is required.

`searchPattern` can be a combination of literal and wildcard characters, but it doesn't support regular expressions. The following wildcard specifiers are permitted in `searchPattern`.

|Wildcard specifier|Matches|
|------------------------|-------------|
|\* (asterisk)|Zero or more characters in that position.|
|? (question mark)|Exactly one character in that position.|

Characters other than the wildcard are literal characters. For example, the `searchPattern` string "\*t" searches for all names in `path` ending with the letter "t". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

`searchPattern` cannot end in two periods ("..") or contain two periods ("..") followed by `DirectorySeparatorChar` or `AltDirectorySeparatorChar`, nor can it contain any invalid characters. You can query for invalid characters by using the `Path.GetInvalidPathChars` method.

> **Note:**
>  When you use the asterisk wildcard character in a `searchPattern` such as "\*.txt", the number of characters in the specified extension affects the search as follows:
>
> -   If the specified extension is exactly three characters long, the method returns files with extensions that begin with the specified extension. For example, "\*.xls" returns both "book.xls" and "book.xlsx".
> -   In all other cases, the method returns files that exactly match the specified extension. For example, "\*.ai" returns "file.ai" but not "file.aif".
>
>  When you use the question mark wildcard character, this method returns only files that match the specified file extension. For example, given two files, "file1.txt" and "file1.txtother", in a directory, a search pattern of "file?.txt" returns just the first file, whereas a search pattern of "file\*.txt" returns both files.

The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

The case-sensitivity of the `path` parameter corresponds to that of the file system on which the code is running. For example, it's case-insensitive on NTFS (the default Windows file system) and case-sensitive on Linux file systems.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example uses the `Directory.GetFileSystemEntries` method to fill an array of strings with the names of all files matching a user-specified filter in a specific location and prints each string in the array to the console. The example is configured to catch all errors common to this method.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/Overview/class1.cs._

## Directory.GetFileSystemEntries(String, String, EnumerationOptions) method

```csharp
public static string[] GetFileSystemEntries (string path, string searchPattern, System.IO.EnumerationOptions enumerationOptions);
```

Returns an array of file names and directory names that match a search pattern and enumeration options in a specified path.

Parameters:

- `path`: The relative or absolute path to the directory to search. This string is not case-sensitive.
- `searchPattern`: The search string to match against the names of files and directories in `path`. This parameter can contain a combination of valid literal and wildcard characters, but it doesn't support regular expressions.
- `enumerationOptions`: An object that describes the search and enumeration configuration to use.

Returns: An array of file names and directory names that match the specified search pattern and enumeration options, or an empty array if no files or directories are found.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentException`: `searchPattern` does not contain a valid pattern.
- `ArgumentNullException`: `path` or `searchPattern` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `IOException`: `path` is a file name.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).

#### Remarks
The order of the returned file and directory names is not guaranteed; use the `Array.Sort` method if a specific sort order is required.

`searchPattern` can be a combination of literal and wildcard characters, but it doesn't support regular expressions. The following wildcard specifiers are permitted in `searchPattern`.

| Wildcard specifier | Matches                                   |
|--------------------|-------------------------------------------|
| \* (asterisk)      | Zero or more characters in that position. |
| ? (question mark)  | Exactly one character in that position.   |

Characters other than the wildcard are literal characters. For example, the `searchPattern` string "\*t" searches for all names in `path` ending with the letter "t". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

`searchPattern` cannot end in two periods ("..") or contain two periods ("..") followed by `DirectorySeparatorChar` or `AltDirectorySeparatorChar`, nor can it contain any invalid characters. You can query for invalid characters by using the `Path.GetInvalidPathChars` method.

> **Note:**
>  When you use the asterisk wildcard character in a `searchPattern` such as "\*.txt", the number of characters in the specified extension affects the search as follows:
>
> -   If the specified extension is exactly three characters long, the method returns files with extensions that begin with the specified extension. For example, "\*.xls" returns both "book.xls" and "book.xlsx".
> -   In all other cases, the method returns files that exactly match the specified extension. For example, "\*.ai" returns "file.ai" but not "file.aif".
>
>  When you use the question mark wildcard character, this method returns only files that match the specified file extension. For example, given two files, "file1.txt" and "file1.txtother", in a directory, a search pattern of "file?.txt" returns just the first file, whereas a search pattern of "file\*.txt" returns both files.

The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

The case-sensitivity of the `path` parameter corresponds to that of the file system on which the code is running. For example, it's case-insensitive on NTFS (the default Windows file system) and case-sensitive on Linux file systems.

For a list of common I/O tasks, see Common I/O Tasks.

## Directory.GetFileSystemEntries(String, String, SearchOption) method

```csharp
public static string[] GetFileSystemEntries (string path, string searchPattern, System.IO.SearchOption searchOption);
```

Returns an array of all the file names and directory names that match a search pattern in a specified path, and optionally searches subdirectories.

Parameters:

- `path`: The relative or absolute path to the directory to search. This string is not case-sensitive.
- `searchPattern`: The search string to match against the names of files and directories in `path`. This parameter can contain a combination of valid literal path and wildcard (* and ?) characters, but it doesn't support regular expressions.
- `searchOption`: One of the enumeration values that specifies whether the search operation should include only the current directory or should include all subdirectories. The default value is `SearchOption.TopDirectoryOnly`.

Returns: An array of file the file names and directory names that match the specified search criteria, or an empty array if no files or directories are found.

Exceptions:

- `ArgumentException`: `searchPattern` does not contain a valid pattern.
- `ArgumentNullException`: `path` or `searchPattern` is `null`.
- `ArgumentOutOfRangeException`: `searchOption` is not a valid `SearchOption` value.
- `DirectoryNotFoundException`: `path` is invalid, such as referring to an unmapped drive.
- `IOException`: `path` is a file name.
- `PathTooLongException`: The specified path, file name, or combined exceed the system-defined maximum length.
- `SecurityException`: The caller does not have the required permission.
- `UnauthorizedAccessException`: The caller does not have the required permission.

#### Remarks
The order of the returned file and directory names is not guaranteed; use the `Array.Sort` method if a specific sort order is required.

`searchPattern` can be a combination of literal and wildcard characters, but it doesn't support regular expressions. The following wildcard specifiers are permitted in `searchPattern`.

|Wildcard specifier|Matches|
|------------------------|-------------|
|\* (asterisk)|Zero or more characters in that position.|
|? (question mark)|Exactly one character in that position.|

Characters other than the wildcard are literal characters. For example, the `searchPattern` string "\*t" searches for all names in `path` ending with the letter "t". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

`searchPattern` cannot end in two periods ("..") or contain two periods ("..") followed by `DirectorySeparatorChar` or `AltDirectorySeparatorChar`, nor can it contain any invalid characters. You can query for invalid characters by using the `Path.GetInvalidPathChars` method.

> **Note:**
>  When you use the asterisk wildcard character in a `searchPattern` such as "\*.txt", the number of characters in the specified extension affects the search as follows:
>
> -   If the specified extension is exactly three characters long, the method returns files with extensions that begin with the specified extension. For example, "\*.xls" returns both "book.xls" and "book.xlsx".
> -   In all other cases, the method returns files that exactly match the specified extension. For example, "\*.ai" returns "file.ai" but not "file.aif".
>
>  When you use the question mark wildcard character, this method returns only files that match the specified file extension. For example, given two files, "file1.txt" and "file1.txtother", in a directory, a search pattern of "file?.txt" returns just the first file, whereas a search pattern of "file\*.txt" returns both files.

The `Directory.EnumerateFileSystemEntries` and `Directory.GetFileSystemEntries` methods differ as follows: When you use `Directory.EnumerateFileSystemEntries`, you can start enumerating the collection of entries before the whole collection is returned; when you use `Directory.GetFileSystemEntries`, you must wait for the whole array of entries to be returned before you can access the array. Therefore, when you are working with many files and directories, `Directory.EnumerateFileSystemEntries` can be more efficient.

You can specify relative path information with the `path` parameter. Relative path information is interpreted as relative to the current working directory, which you can determine by using the `Directory.GetCurrentDirectory` method.

## Directory.GetLastAccessTime(String) method

```csharp
public static DateTime GetLastAccessTime (string path);
```

Returns the date and time the specified file or directory was last accessed.

Parameters:

- `path`: The file or directory for which to obtain access date and time information.

Returns: A structure that is set to the date and time the specified file or directory was last accessed. This value is expressed in local time.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `NotSupportedException`: The `path` parameter is in an invalid format.

#### Remarks

> **Note:**
>  This method may return an inaccurate value, because it uses native functions whose values may not be continuously updated by the operating system.

This method is identical to `File.GetLastAccessTime`.

If the directory described in the `path` parameter does not exist, this method returns 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC), adjusted to local time.

The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

The case-sensitivity of the `path` parameter corresponds to that of the file system on which the code is running. For example, it's case-insensitive on NTFS (the default Windows file system) and case-sensitive on Linux file systems.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates how to use `GetLastAccessTime`.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/GetLastAccessTime/dir_getlastaccess.cs._
