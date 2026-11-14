---
title: "Directory class (part 4 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/Directory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Directory class (part 4 of 10)

## Directory.EnumerateFileSystemEntries(String) method

```csharp
public static System.Collections.Generic.IEnumerable<string> EnumerateFileSystemEntries (string path);
```

Returns an enumerable collection of file names and directory names in a specified path.

Parameters:

- `path`: The relative or absolute path to the directory to search. This string is not case-sensitive.

Returns: An enumerable collection of file-system entries in the directory specified by `path`.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `DirectoryNotFoundException`: `path` is invalid, such as referring to an unmapped drive.
- `IOException`: `path` is a file name.
- `PathTooLongException`: The specified path, file name, or combined exceed the system-defined maximum length.
- `SecurityException`: The caller does not have the required permission.
- `UnauthorizedAccessException`: The caller does not have the required permission.

#### Remarks
You can specify relative path information with the `path` parameter. Relative path information is interpreted as relative to the current working directory, which you can determine by using the `Directory.GetCurrentDirectory` method.

The `Directory.EnumerateFileSystemEntries` and `Directory.GetFileSystemEntries` methods differ as follows: When you use `Directory.EnumerateFileSystemEntries`, you can start enumerating the collection of entries before the whole collection is returned; when you use `Directory.GetFileSystemEntries`, you must wait for the whole array of entries to be returned before you can access the array. Therefore, when you are working with many files and directories, `Directory.EnumerateFileSystemEntries` can be more efficient.

The returned collection is not cached; each call to the `IEnumerable<T>.GetEnumerator` on the collection will start a new enumeration.

## Directory.EnumerateFileSystemEntries(String, String) method

```csharp
public static System.Collections.Generic.IEnumerable<string> EnumerateFileSystemEntries (string path, string searchPattern);
```

Returns an enumerable collection of file names and directory names that match a search pattern in a specified path.

Parameters:

- `path`: The relative or absolute path to the directory to search. This string is not case-sensitive.
- `searchPattern`: The search string to match against the names of file-system entries in `path`. This parameter can contain a combination of valid literal path and wildcard (* and ?) characters, but it doesn't support regular expressions.

Returns: An enumerable collection of file-system entries in the directory specified by `path` and that match the specified search pattern.

Exceptions:

- `ArgumentException`: `searchPattern` does not contain a valid pattern.
- `ArgumentNullException`: `path` or `searchPattern` is `null`.
- `DirectoryNotFoundException`: `path` is invalid, such as referring to an unmapped drive.
- `IOException`: `path` is a file name.
- `PathTooLongException`: The specified path, file name, or combined exceed the system-defined maximum length.
- `SecurityException`: The caller does not have the required permission.
- `UnauthorizedAccessException`: The caller does not have the required permission.

#### Remarks
`searchPattern` can be a combination of literal and wildcard characters, but it doesn't support regular expressions. The following wildcard specifiers are permitted in `searchPattern`.

|Wildcard specifier|Matches|
|------------------------|-------------|
|\* (asterisk)|Zero or more characters in that position.|
|? (question mark)|Exactly one character in that position.|

Characters other than the wildcard are literal characters. For example, the `searchPattern` string "\*t" searches for all names in `path` ending with the letter "t". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

> **Note:**
>  When you use the asterisk wildcard character in a `searchPattern` such as "\*.txt", the number of characters in the specified extension affects the search as follows:
>
> -   If the specified extension is exactly three characters long, the method returns files with extensions that begin with the specified extension. For example, "\*.xls" returns both "book.xls" and "book.xlsx".
> -   In all other cases, the method returns files that exactly match the specified extension. For example, "\*.ai" returns "file.ai" but not "file.aif".
>
>  When you use the question mark wildcard character, this method returns only files that match the specified file extension. For example, given two files, "file1.txt" and "file1.txtother", in a directory, a search pattern of "file?.txt" returns just the first file, whereas a search pattern of "file\*.txt" returns both files.

`searchPattern` cannot end in two periods ("..") or contain two periods ("..") followed by `DirectorySeparatorChar` or `AltDirectorySeparatorChar`, nor can it contain any invalid characters. You can query for invalid characters by using the `Path.GetInvalidPathChars` method.

You can specify relative path information with the `path` parameter. Relative path information is interpreted as relative to the current working directory, which you can determine by using the `Directory.GetCurrentDirectory` method.

The `Directory.EnumerateFileSystemEntries` and `Directory.GetFileSystemEntries` methods differ as follows: When you use `Directory.EnumerateFileSystemEntries`, you can start enumerating the collection of entries before the whole collection is returned; when you use `Directory.GetFileSystemEntries`, you must wait for the whole array of entries to be returned before you can access the array. Therefore, when you are working with many files and directories, `Directory.EnumerateFileSystemEntries` can be more efficient.

The returned collection is not cached; each call to the `IEnumerable<T>.GetEnumerator` on the collection will start a new enumeration.

## Directory.EnumerateFileSystemEntries(String, String, EnumerationOptions) method

```csharp
public static System.Collections.Generic.IEnumerable<string> EnumerateFileSystemEntries (string path, string searchPattern, System.IO.EnumerationOptions enumerationOptions);
```

Returns an enumerable collection of file names and directory names that match a search pattern and enumeration options in a specified path.

Parameters:

- `path`: The relative or absolute path to the directory to search. This string is not case-sensitive.
- `searchPattern`: The search string to match against the names of files and directories in `path`. This parameter can contain a combination of valid literal and wildcard characters, but it doesn't support regular expressions.
- `enumerationOptions`: An object that describes the search and enumeration configuration to use.

Returns: An enumerable collection of file-system entries in the directory specified by `path`, that match the specified search pattern and the specified enumeration options.

Exceptions:

- `ArgumentException`: `searchPattern` does not contain a valid pattern.
- `ArgumentNullException`: `path` or `searchPattern` is `null`.
- `DirectoryNotFoundException`: `path` is invalid, such as referring to an unmapped drive.
- `IOException`: `path` is a file name.
- `PathTooLongException`: The specified path, file name, or combined exceed the system-defined maximum length.
- `SecurityException`: The caller does not have the required permission.
- `UnauthorizedAccessException`: The caller does not have the required permission.

#### Remarks

`searchPattern` can be a combination of literal and wildcard characters, but it doesn't support regular expressions. The following wildcard specifiers are permitted in `searchPattern`.

| Wildcard specifier | Matches                                   |
|--------------------|-------------------------------------------|
| \* (asterisk)      | Zero or more characters in that position. |
| ? (question mark)  | Exactly one character in that position.   |

Characters other than the wildcard are literal characters. For example, the `searchPattern` string "\*t" searches for all names in `path` ending with the letter "t". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

> **Note:**
>  When you use the asterisk wildcard character in a `searchPattern` such as "\*.txt", the number of characters in the specified extension affects the search as follows:
>
> -   If the specified extension is exactly three characters long, the method returns files with extensions that begin with the specified extension. For example, "\*.xls" returns both "book.xls" and "book.xlsx".
> -   In all other cases, the method returns files that exactly match the specified extension. For example, "\*.ai" returns "file.ai" but not "file.aif".
>
>  When you use the question mark wildcard character, this method returns only files that match the specified file extension. For example, given two files, "file1.txt" and "file1.txtother", in a directory, a search pattern of "file?.txt" returns just the first file, whereas a search pattern of "file\*.txt" returns both files.

`searchPattern` cannot end in two periods ("..") or contain two periods ("..") followed by `DirectorySeparatorChar` or `AltDirectorySeparatorChar`, nor can it contain any invalid characters. You can query for invalid characters by using the `Path.GetInvalidPathChars` method.

You can specify relative path information with the `path` parameter. Relative path information is interpreted as relative to the current working directory, which you can determine by using the `Directory.GetCurrentDirectory` method.

The `Directory.EnumerateFileSystemEntries` and `Directory.GetFileSystemEntries` methods differ as follows: When you use `Directory.EnumerateFileSystemEntries`, you can start enumerating the collection of entries before the whole collection is returned; when you use `Directory.GetFileSystemEntries`, you must wait for the whole array of entries to be returned before you can access the array. Therefore, when you are working with many files and directories, `Directory.EnumerateFileSystemEntries` can be more efficient.

The returned collection is not cached; each call to the `IEnumerable<T>.GetEnumerator` on the collection will start a new enumeration.

## Directory.EnumerateFileSystemEntries(String, String, SearchOption) method

```csharp
public static System.Collections.Generic.IEnumerable<string> EnumerateFileSystemEntries (string path, string searchPattern, System.IO.SearchOption searchOption);
```

Returns an enumerable collection of file names and directory names that match a search pattern in a specified path, and optionally searches subdirectories.

Parameters:

- `path`: The relative or absolute path to the directory to search. This string is not case-sensitive.
- `searchPattern`: The search string to match against file-system entries in `path`. This parameter can contain a combination of valid literal path and wildcard (* and ?) characters, but it doesn't support regular expressions.
- `searchOption`: One of the enumeration values  that specifies whether the search operation should include only the current directory or should include all subdirectories. The default value is `SearchOption.TopDirectoryOnly`.

Returns: An enumerable collection of file-system entries in the directory specified by `path` and that match the specified search pattern and option.

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
`searchPattern` can be a combination of literal and wildcard characters, but it doesn't support regular expressions. The following wildcard specifiers are permitted in `searchPattern`.

|Wildcard specifier|Matches|
|------------------------|-------------|
|\* (asterisk)|Zero or more characters in that position.|
|? (question mark)|Exactly one character in that position.|

Characters other than the wildcard are literal characters. For example, the `searchPattern` string "\*t" searches for all names in `path` ending with the letter "t". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

> **Note:**
>  When you use the asterisk wildcard character in a `searchPattern` such as "\*.txt", the number of characters in the specified extension affects the search as follows:
>
> -   If the specified extension is exactly three characters long, the method returns files with extensions that begin with the specified extension. For example, "\*.xls" returns both "book.xls" and "book.xlsx".
> -   In all other cases, the method returns files that exactly match the specified extension. For example, "\*.ai" returns "file.ai" but not "file.aif".
>
>  When you use the question mark wildcard character, this method returns only files that match the specified file extension. For example, given two files, "file1.txt" and "file1.txtother", in a directory, a search pattern of "file?.txt" returns just the first file, whereas a search pattern of "file\*.txt" returns both files.

`searchPattern` cannot end in two periods ("..") or contain two periods ("..") followed by `DirectorySeparatorChar` or `AltDirectorySeparatorChar`, nor can it contain any invalid characters. You can query for invalid characters by using the `Path.GetInvalidPathChars` method.

You can specify relative path information with the `path` parameter. Relative path information is interpreted as relative to the current working directory, which you can determine by using the `Directory.GetCurrentDirectory` method.

The `Directory.EnumerateFileSystemEntries` and `Directory.GetFileSystemEntries` methods differ as follows: When you use `Directory.EnumerateFileSystemEntries`, you can start enumerating the collection of entries before the whole collection is returned; when you use `Directory.GetFileSystemEntries`, you must wait for the whole array of entries to be returned before you can access the array. Therefore, when you are working with many files and directories, `Directory.EnumerateFileSystemEntries` can be more efficient.

The returned collection is not cached; each call to the `IEnumerable<T>.GetEnumerator` on the collection will start a new enumeration.
