---
title: "Directory class (part 2 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/Directory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Directory class (part 2 of 10)

## Directory.EnumerateDirectories(String) method

```csharp
public static System.Collections.Generic.IEnumerable<string> EnumerateDirectories (string path);
```

Returns an enumerable collection of directory full names in a specified path.

Parameters:

- `path`: The relative or absolute path to the directory to search. This string is not case-sensitive.

Returns: An enumerable collection of the full names (including paths) for the directories in the directory specified by `path`.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `DirectoryNotFoundException`: `path` is invalid, such as referring to an unmapped drive.
- `IOException`: `path` is a file name.
- `PathTooLongException`: The specified path, file name, or combined exceed the system-defined maximum length.
- `SecurityException`: The caller does not have the required permission.
- `UnauthorizedAccessException`: The caller does not have the required permission.

#### Remarks
You can specify relative or absolute path information in the `path` parameter. Relative path information is interpreted as relative to the current working directory, which you can determine by using the `Directory.GetCurrentDirectory` method. The returned directory names are prefixed with the value you provided in the `path` parameter. For example, if you provide a relative path in the `path` parameter, the returned directory names will contain a relative path.

The `Directory.EnumerateDirectories` and `Directory.GetDirectories` methods differ as follows: When you use `Directory.EnumerateDirectories`, you can start enumerating the collection of names before the whole collection is returned; when you use `Directory.GetDirectories`, you must wait for the whole array of names to be returned before you can access the array. Therefore, when you are working with many files and directories, `Directory.EnumerateDirectories` can be more efficient.

The returned collection is not cached; each call to the `IEnumerable<T>.GetEnumerator` on the collection will start a new enumeration.

#### Examples
The following example enumerates the top-level directories in a specified path.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/EnumerateDirectories/program.cs._

## Directory.EnumerateDirectories(String, String) method

```csharp
public static System.Collections.Generic.IEnumerable<string> EnumerateDirectories (string path, string searchPattern);
```

Returns an enumerable collection of directory full names that match a search pattern in a specified path.

Parameters:

- `path`: The relative or absolute path to the directory to search. This string is not case-sensitive.
- `searchPattern`: The search string to match against the names of directories in `path`. This parameter can contain a combination of valid literal path and wildcard (* and ?) characters, but it doesn't support regular expressions.

Returns: An enumerable collection of the full names (including paths) for the directories in the directory specified by `path` and that match the specified search pattern.

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

`searchPattern` cannot end in two periods ("..") or contain two periods ("..") followed by `DirectorySeparatorChar` or `AltDirectorySeparatorChar`, nor can it contain any invalid characters. You can query for invalid characters by using the `Path.GetInvalidPathChars` method.

You can specify relative or absolute path information in the `path` parameter. Relative path information is interpreted as relative to the current working directory, which you can determine by using the `Directory.GetCurrentDirectory` method. The returned directory names are prefixed with the value you provided in the `path` parameter. For example, if you provide a relative path in the `path` parameter, the returned directory names will contain a relative path.

The `Directory.EnumerateDirectories` and `Directory.GetDirectories` methods differ as follows: When you use `Directory.EnumerateDirectories`, you can start enumerating the collection of names before the whole collection is returned; when you use `Directory.GetDirectories`, you must wait for the whole array of names to be returned before you can access the array. Therefore, when you are working with many files and directories, `Directory.EnumerateDirectories` can be more efficient.

The returned collection is not cached; each call to the `IEnumerable<T>.GetEnumerator` on the collection will start a new enumeration.

#### Examples
The following example enumerates the top-level directories in a specified path that match a specified search pattern.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/EnumerateDirectories/program1.cs._

## Directory.EnumerateDirectories(String, String, EnumerationOptions) method

```csharp
public static System.Collections.Generic.IEnumerable<string> EnumerateDirectories (string path, string searchPattern, System.IO.EnumerationOptions enumerationOptions);
```

Returns an enumerable collection of the directory full names that match a search pattern in a specified path, and optionally searches subdirectories.

Parameters:

- `path`: The relative or absolute path to the directory to search. This string is not case-sensitive.
- `searchPattern`: The search string to match against the names of directories in `path`. This parameter can contain a combination of valid literal path and wildcard (* and ?) characters, but it doesn't support regular expressions.
- `enumerationOptions`: An object that describes the search and enumeration configuration to use.

Returns: An enumerable collection of the full names (including paths) for the directories in the directory specified by `path` and that match the specified search pattern and enumeration options.

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

`searchPattern` cannot end in two periods ("..") or contain two periods ("..") followed by `DirectorySeparatorChar` or `AltDirectorySeparatorChar`, nor can it contain any invalid characters. You can query for invalid characters by using the `Path.GetInvalidPathChars` method.

You can specify relative or absolute path information in the `path` parameter. Relative path information is interpreted as relative to the current working directory, which you can determine by using the `Directory.GetCurrentDirectory` method. The returned directory names are prefixed with the value you provided in the `path` parameter. For example, if you provide a relative path in the `path` parameter, the returned directory names will contain a relative path.

The `Directory.EnumerateDirectories` and `Directory.GetDirectories` methods differ as follows: When you use `Directory.EnumerateDirectories`, you can start enumerating the collection of names before the whole collection is returned; when you use `Directory.GetDirectories`, you must wait for the whole array of names to be returned before you can access the array. Therefore, when you are working with many files and directories, `Directory.EnumerateDirectories` can be more efficient.

The returned collection is not cached; each call to the `IEnumerable<T>.GetEnumerator` on the collection will start a new enumeration.

## Directory.EnumerateDirectories(String, String, SearchOption) method

```csharp
public static System.Collections.Generic.IEnumerable<string> EnumerateDirectories (string path, string searchPattern, System.IO.SearchOption searchOption);
```

Returns an enumerable collection of directory full names that match a search pattern in a specified path, and optionally searches subdirectories.

Parameters:

- `path`: The relative or absolute path to the directory to search. This string is not case-sensitive.
- `searchPattern`: The search string to match against the names of directories in `path`. This parameter can contain a combination of valid literal path and wildcard (* and ?) characters, but it doesn't support regular expressions.
- `searchOption`: One of the enumeration values that specifies whether the search operation should include only the current directory or should include all subdirectories. The default value is `SearchOption.TopDirectoryOnly`.

Returns: An enumerable collection of the full names (including paths) for the directories in the directory specified by `path` and that match the specified search pattern and search option.

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

| Wildcard specifier | Matches                                   |
|--------------------|-------------------------------------------|
| \* (asterisk)      | Zero or more characters in that position. |
| ? (question mark)  | Exactly one character in that position.   |

Characters other than the wildcard are literal characters. For example, the `searchPattern` string "\*t" searches for all names in `path` ending with the letter "t". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

`searchPattern` cannot end in two periods ("..") or contain two periods ("..") followed by `DirectorySeparatorChar` or `AltDirectorySeparatorChar`, nor can it contain any invalid characters. You can query for invalid characters by using the `Path.GetInvalidPathChars` method.

You can specify relative or absolute path information in the `path` parameter. Relative path information is interpreted as relative to the current working directory, which you can determine by using the `Directory.GetCurrentDirectory` method. The returned directory names are prefixed with the value you provided in the `path` parameter. For example, if you provide a relative path in the `path` parameter, the returned directory names will contain a relative path.

The `Directory.EnumerateDirectories` and `Directory.GetDirectories` methods differ as follows: When you use `Directory.EnumerateDirectories`, you can start enumerating the collection of names before the whole collection is returned; when you use `Directory.GetDirectories`, you must wait for the whole array of names to be returned before you can access the array. Therefore, when you are working with many files and directories, `Directory.EnumerateDirectories` can be more efficient.

The returned collection is not cached; each call to the `IEnumerable<T>.GetEnumerator` on the collection will start a new enumeration.

#### Examples
The following example enumerates directories in a specified path that match a specified search pattern. It uses the `searchOption` parameter to specify that all subdirectories should be included in the search.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/EnumerateDirectories/program2.cs._
