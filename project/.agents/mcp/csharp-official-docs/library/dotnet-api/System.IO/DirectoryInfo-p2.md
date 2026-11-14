---
title: "DirectoryInfo class (part 2 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/DirectoryInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DirectoryInfo class (part 2 of 6)

## DirectoryInfo.EnumerateDirectories(String) method

```csharp
public System.Collections.Generic.IEnumerable<System.IO.DirectoryInfo> EnumerateDirectories (string searchPattern);
```

Returns an enumerable collection of directory information that matches a specified search pattern.

Parameters:

- `searchPattern`: The search string to match against the names of directories.  This parameter can contain a combination of valid literal path and wildcard (* and ?) characters, but it doesn't support regular expressions.

Returns: An enumerable collection of directories that matches `searchPattern`.

Exceptions:

- `ArgumentNullException`: `searchPattern` is `null`.
- `DirectoryNotFoundException`: The path encapsulated in the `DirectoryInfo` object is invalid (for example, it is on an unmapped drive).
- `SecurityException`: The caller does not have the required permission.

#### Remarks
`searchPattern` can be a combination of literal and wildcard characters, but it doesn't support regular expressions. The following wildcard specifiers are permitted in `searchPattern`.

|Wildcard specifier|Matches|
|------------------------|-------------|
|\* (asterisk)|Zero or more characters in that position.|
|? (question mark)|Zero or one character in that position.|

Characters other than the wildcard are literal characters. For example, the string "\*t" searches for all names in  ending with the letter "t". ". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

The `DirectoryInfo.EnumerateDirectories` and `DirectoryInfo.GetDirectories` methods differ as follows:

- When you use `DirectoryInfo.EnumerateDirectories`, you can start enumerating the collection of `DirectoryInfo` objects before the whole collection is returned.

- When you use `DirectoryInfo.GetDirectories`, you must wait for the whole array of `DirectoryInfo` objects to be returned before you can access the array.

Therefore, when you are working with many files and directories, `DirectoryInfo.EnumerateDirectories` can be more efficient.

This method pre-populates the values of the following `DirectoryInfo` properties:

-   `FileSystemInfo.Attributes`

-   `FileSystemInfo.CreationTime`

-   `FileSystemInfo.CreationTimeUtc`

-   `FileSystemInfo.LastAccessTime`

-   `FileSystemInfo.LastAccessTimeUtc`

-   `FileSystemInfo.LastWriteTime`

-   `FileSystemInfo.LastWriteTimeUtc`

The returned collection is not cached; each call to the `IEnumerable<T>.GetEnumerator` method on  the collection will start a new enumeration.

## DirectoryInfo.EnumerateDirectories(String, EnumerationOptions) method

```csharp
public System.Collections.Generic.IEnumerable<System.IO.DirectoryInfo> EnumerateDirectories (string searchPattern, System.IO.EnumerationOptions enumerationOptions);
```

Returns an enumerable collection of directory information that matches the specified search pattern and enumeration options.

Parameters:

- `searchPattern`: The search string to match against the names of directories. This parameter can contain a combination of valid literal path and wildcard (* and ?) characters, but it doesn't support regular expressions.
- `enumerationOptions`: An object that describes the search and enumeration configuration to use.

Returns: An enumerable collection of directories that matches `searchPattern` and `enumerationOptions`.

Exceptions:

- `ArgumentNullException`: `searchPattern` is `null`.
- `DirectoryNotFoundException`: The path encapsulated in the `DirectoryInfo` object is invalid (for example, it is on an unmapped drive).
- `SecurityException`: The caller does not have the required permission.

#### Remarks
`searchPattern` can be a combination of literal and wildcard characters, but it doesn't support regular expressions. The following wildcard specifiers are permitted in `searchPattern`.

|Wildcard specifier|Matches|
|------------------------|-------------|
|\* (asterisk)|Zero or more characters in that position.|
|? (question mark)|Zero or one character in that position.|

Characters other than the wildcard are literal characters. For example, the string "\*t" searches for all names in  ending with the letter "t". ". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

The `DirectoryInfo.EnumerateDirectories` and `DirectoryInfo.GetDirectories` methods differ as follows:

- When you use `DirectoryInfo.EnumerateDirectories`, you can start enumerating the collection of `DirectoryInfo` objects before the whole collection is returned.

- When you use `DirectoryInfo.GetDirectories`, you must wait for the whole array of `DirectoryInfo` objects to be returned before you can access the array.

Therefore, when you are working with many files and directories, `DirectoryInfo.EnumerateDirectories` can be more efficient.

This method pre-populates the values of the following `DirectoryInfo` properties:

-   `FileSystemInfo.Attributes`

-   `FileSystemInfo.CreationTime`

-   `FileSystemInfo.CreationTimeUtc`

-   `FileSystemInfo.LastAccessTime`

-   `FileSystemInfo.LastAccessTimeUtc`

-   `FileSystemInfo.LastWriteTime`

-   `FileSystemInfo.LastWriteTimeUtc`

The returned collection is not cached; each call to the `IEnumerable<T>.GetEnumerator` method on  the collection will start a new enumeration.

## DirectoryInfo.EnumerateDirectories(String, SearchOption) method

```csharp
public System.Collections.Generic.IEnumerable<System.IO.DirectoryInfo> EnumerateDirectories (string searchPattern, System.IO.SearchOption searchOption);
```

Returns an enumerable collection of directory information that matches a specified search pattern and search subdirectory option.

Parameters:

- `searchPattern`: The search string to match against the names of directories.  This parameter can contain a combination of valid literal path and wildcard (* and ?) characters, but it doesn't support regular expressions.
- `searchOption`: One of the enumeration values that specifies whether the search operation should include only the current directory or all subdirectories. The default value is `SearchOption.TopDirectoryOnly`.

Returns: An enumerable collection of directories that matches `searchPattern` and `searchOption`.

Exceptions:

- `ArgumentNullException`: `searchPattern` is `null`.
- `ArgumentOutOfRangeException`: `searchOption` is not a valid `SearchOption` value.
- `DirectoryNotFoundException`: The path encapsulated in the `DirectoryInfo` object is invalid (for example, it is on an unmapped drive).
- `SecurityException`: The caller does not have the required permission.

#### Remarks
`searchPattern` can be a combination of literal and wildcard characters, but it doesn't support regular expressions. The following wildcard specifiers are permitted in `searchPattern`.

|Wildcard specifier|Matches|
|------------------------|-------------|
|\* (asterisk)|Zero or more characters in that position.|
|? (question mark)|Zero or one character in that position.|

Characters other than the wildcard are literal characters. For example, the string "\*t" searches for all names in  ending with the letter "t". ". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

The `DirectoryInfo.EnumerateDirectories` and `DirectoryInfo.GetDirectories` methods differ as follows:

- When you use `DirectoryInfo.EnumerateDirectories`, you can start enumerating the collection of `DirectoryInfo` objects before the whole collection is returned.

- When you use `DirectoryInfo.GetDirectories`, you must wait for the whole array of `DirectoryInfo` objects to be returned before you can access the array.

Therefore, when you are working with many files and directories, `DirectoryInfo.EnumerateDirectories` can be more efficient.

This method pre-populates the values of the following `DirectoryInfo` properties:

-   `FileSystemInfo.Attributes`

-   `FileSystemInfo.CreationTime`

-   `FileSystemInfo.CreationTimeUtc`

-   `FileSystemInfo.LastAccessTime`

-   `FileSystemInfo.LastAccessTimeUtc`

-   `FileSystemInfo.LastWriteTime`

-   `FileSystemInfo.LastWriteTimeUtc`

The returned collection is not cached; each call to the `IEnumerable<T>.GetEnumerator` method on  the collection will start a new enumeration.

#### Examples
The following example uses this method and the `DirectoryInfo.EnumerateFiles` method to enumerate the files and directories within the start directory and display the name and size of any files over 10 MB.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/EnumerateDirectories/program1.cs._

## DirectoryInfo.EnumerateFiles() method

```csharp
public System.Collections.Generic.IEnumerable<System.IO.FileInfo> EnumerateFiles ();
```

Returns an enumerable collection of file information in the current directory.

Returns: An enumerable collection of the files in the current directory.

Exceptions:

- `DirectoryNotFoundException`: The path encapsulated in the `DirectoryInfo` object is invalid (for example, it is on an unmapped drive).
- `SecurityException`: The caller does not have the required permission.

#### Remarks
The `DirectoryInfo.EnumerateFiles` and `DirectoryInfo.GetFiles` methods differ as follows:

- When you use `DirectoryInfo.EnumerateFiles`, you can start enumerating the collection of `FileInfo` objects before the whole collection is returned.

- When you use `DirectoryInfo.GetFiles`, you must wait for the whole array of `FileInfo` objects to be returned before you can access the array.

Therefore, when you are working with many files and directories, `DirectoryInfo.EnumerateFiles` can be more efficient.

This method pre-populates the values of the following `FileInfo` properties:

-   `FileSystemInfo.Attributes`

-   `FileSystemInfo.CreationTime`

-   `FileSystemInfo.CreationTimeUtc`

-   `FileSystemInfo.LastAccessTime`

-   `FileSystemInfo.LastAccessTimeUtc`

-   `FileSystemInfo.LastWriteTime`

-   `FileSystemInfo.LastWriteTimeUtc`

-   `FileInfo.Length`

The returned collection is not cached; each call to the `IEnumerable<T>.GetEnumerator` method on the collection will start a new enumeration.

#### Examples
The following example enumerates the files under a specified directory and uses a LINQ query to return the names of all files that were created before 2009 by checking the value of the `CreationTimeUtc` property.

If you only need the names of the files, use the static `Directory` class for better performance. For an example, see the `EnumerateFiles` method.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/EnumerateFiles/program.cs._

The following example shows how to enumerate files in a directory by using different search options. The example assumes a directory that has files named log1.txt, log2.txt, test1.txt, test2.txt, test3.txt, and a subdirectory that has a file named SubFile.txt.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/EnumerateFiles/program2.cs._

## DirectoryInfo.EnumerateFiles(String) method

```csharp
public System.Collections.Generic.IEnumerable<System.IO.FileInfo> EnumerateFiles (string searchPattern);
```

Returns an enumerable collection of file information that matches a search pattern.

Parameters:

- `searchPattern`: The search string to match against the names of files.  This parameter can contain a combination of valid literal path and wildcard (* and ?) characters, but it doesn't support regular expressions.

Returns: An enumerable collection of files that matches `searchPattern`.

Exceptions:

- `ArgumentNullException`: `searchPattern` is `null`.
- `DirectoryNotFoundException`: The path encapsulated in the `DirectoryInfo` object is invalid, (for example, it is on an unmapped drive).
- `SecurityException`: The caller does not have the required permission.

#### Remarks
`searchPattern` can be a combination of literal and wildcard characters, but it doesn't support regular expressions. The following wildcard specifiers are permitted in `searchPattern`.

|Wildcard specifier|Matches|
|------------------------|-------------|
|\* (asterisk)|Zero or more characters in that position.|
|? (question mark)|Zero or one character in that position.|

Characters other than the wildcard are literal characters. For example, the string "\*t" searches for all names in  ending with the letter "t". ". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

The `DirectoryInfo.EnumerateFiles` and `DirectoryInfo.GetFiles` methods differ as follows:

- When you use `DirectoryInfo.EnumerateFiles`, you can start enumerating the collection of `FileInfo` objects before the whole collection is returned.

- When you use `DirectoryInfo.GetFiles`, you must wait for the whole array of `FileInfo` objects to be returned before you can access the array.

Therefore, when you are working with many files and directories, `DirectoryInfo.EnumerateFiles` can be more efficient.

This method pre-populates the values of the following `FileInfo` properties:

-   `FileSystemInfo.Attributes`

-   `FileSystemInfo.CreationTime`

-   `FileSystemInfo.CreationTimeUtc`

-   `FileSystemInfo.LastAccessTime`

-   `FileSystemInfo.LastAccessTimeUtc`

-   `FileSystemInfo.LastWriteTime`

-   `FileSystemInfo.LastWriteTimeUtc`

-   `FileInfo.Length`

The returned collection is not cached; each call to the `IEnumerable<T>.GetEnumerator` method on the collection will start a new enumeration.

#### Examples
The following example shows how to enumerate files in a directory by using different search options. The example assumes a directory that has files named log1.txt, log2.txt, test1.txt, test2.txt, test3.txt, and a subdirectory that has a file named SubFile.txt.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/EnumerateFiles/program2.cs._
