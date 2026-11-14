---
title: "DirectoryInfo class (part 4 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/DirectoryInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DirectoryInfo class (part 4 of 6)

## DirectoryInfo.EnumerateFileSystemInfos(String, SearchOption) method

```csharp
public System.Collections.Generic.IEnumerable<System.IO.FileSystemInfo> EnumerateFileSystemInfos (string searchPattern, System.IO.SearchOption searchOption);
```

Returns an enumerable collection of file system information that matches a specified search pattern and search subdirectory option.

Parameters:

- `searchPattern`: The search string to match against the names of directories.  This parameter can contain a combination of valid literal path and wildcard (* and ?) characters, but it doesn't support regular expressions.
- `searchOption`: One of the enumeration values that specifies whether the search operation should include only the current directory or all subdirectories. The default value is `SearchOption.TopDirectoryOnly`.

Returns: An enumerable collection of file system information objects that matches `searchPattern` and `searchOption`.

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

The `DirectoryInfo.EnumerateFileSystemInfos` and `DirectoryInfo.GetFileSystemInfos` methods differ as follows:

- When you use `DirectoryInfo.EnumerateFileSystemInfos`, you can start enumerating the collection of `FileSystemInfo` objects before the whole collection is returned.

- When you use `DirectoryInfo.GetFileSystemInfos`, you must wait for the whole array of `FileSystemInfo` objects to be returned before you can access the array.

Therefore, when you are working with many files and directories, `DirectoryInfo.EnumerateFileSystemInfos` can be more efficient.

This method pre-populates the values of the following `FileSystemInfo` properties:

-   `FileSystemInfo.Attributes`

-   `FileSystemInfo.CreationTime`

-   `FileSystemInfo.CreationTimeUtc`

-   `FileSystemInfo.LastAccessTime`

-   `FileSystemInfo.LastAccessTimeUtc`

-   `FileSystemInfo.LastWriteTime`

-   `FileSystemInfo.LastWriteTimeUtc`

The returned collection is not cached; each call to the `IEnumerable<T>.GetEnumerator` method on the collection will start a new enumeration.

## DirectoryInfo.GetDirectories() method

```csharp
public System.IO.DirectoryInfo[] GetDirectories ();
```

Returns the subdirectories of the current directory.

Returns: An array of `DirectoryInfo` objects.

Exceptions:

- `DirectoryNotFoundException`: The path encapsulated in the `DirectoryInfo` object is invalid, such as being on an unmapped drive.
- `SecurityException`: The caller does not have the required permission.
- `UnauthorizedAccessException`: The caller does not have the required permission.

#### Remarks
If there are no subdirectories, this method returns an empty array. This method is not recursive.

This method pre-populates the values of the following `DirectoryInfo` properties:

-   `FileSystemInfo.Attributes`

-   `FileSystemInfo.CreationTime`

-   `FileSystemInfo.CreationTimeUtc`

-   `FileSystemInfo.LastAccessTime`

-   `FileSystemInfo.LastAccessTimeUtc`

-   `FileSystemInfo.LastWriteTime`

-   `FileSystemInfo.LastWriteTimeUtc`

#### Examples
The following example retrieves all the directories in the root directory and displays the directory names.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/GetDirectories/directoryinfogetdirectories.cs._

## DirectoryInfo.GetDirectories(String) method

```csharp
public System.IO.DirectoryInfo[] GetDirectories (string searchPattern);
```

Returns an array of directories in the current `DirectoryInfo` matching the given search criteria.

Parameters:

- `searchPattern`: The search string to match against the names of directories.  This parameter can contain a combination of valid literal path and wildcard (* and ?) characters, but it doesn't support regular expressions.

Returns: An array of type `DirectoryInfo` matching `searchPattern`.

Exceptions:

- `ArgumentNullException`: `searchPattern` is `null`.
- `DirectoryNotFoundException`: The path encapsulated in the `DirectoryInfo` object is invalid (for example, it is on an unmapped drive).
- `UnauthorizedAccessException`: The caller does not have the required permission.

#### Remarks
`searchPattern` can be a combination of literal and wildcard characters, but it doesn't support regular expressions. The following wildcard specifiers are permitted in `searchPattern`.

|Wildcard specifier|Matches|
|------------------------|-------------|
|\* (asterisk)|Zero or more characters in that position.|
|? (question mark)|Zero or one character in that position.|

Characters other than the wildcard are literal characters. For example, the string "\*t" searches for all names in  ending with the letter "t". ". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

This method pre-populates the values of the following `DirectoryInfo` properties:

-   `FileSystemInfo.Attributes`

-   `FileSystemInfo.CreationTime`

-   `FileSystemInfo.CreationTimeUtc`

-   `FileSystemInfo.LastAccessTime`

-   `FileSystemInfo.LastAccessTimeUtc`

-   `FileSystemInfo.LastWriteTime`

-   `FileSystemInfo.LastWriteTimeUtc`

#### Examples
The following example counts the directories in a path that contain the specified letter.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/GetDirectories/dirinfo getdirs2.cs._

## DirectoryInfo.GetDirectories(String, EnumerationOptions) method

```csharp
public System.IO.DirectoryInfo[] GetDirectories (string searchPattern, System.IO.EnumerationOptions enumerationOptions);
```

Returns an array of directories in the current `DirectoryInfo` matching the specified search pattern and enumeration options.

Parameters:

- `searchPattern`: The search string to match against the names of directories. This parameter can contain a combination of valid literal path and wildcard (* and ?) characters, but it doesn't support regular expressions.
- `enumerationOptions`: An object that describes the search and enumeration configuration to use.

Returns: An array of type `DirectoryInfo` matching `searchPattern` and `enumerationOptions`.

Exceptions:

- `ArgumentNullException`: `searchPattern` is `null`.
- `DirectoryNotFoundException`: The path encapsulated in the `DirectoryInfo` object is invalid (for example, it is on an unmapped drive).
- `UnauthorizedAccessException`: The caller does not have the required permission.

#### Remarks
`searchPattern` can be a combination of literal and wildcard characters, but it doesn't support regular expressions. The following wildcard specifiers are permitted in `searchPattern`.

|Wildcard specifier|Matches|
|------------------------|-------------|
|\* (asterisk)|Zero or more characters in that position.|
|? (question mark)|Zero or one character in that position.|

Characters other than the wildcard are literal characters. For example, the string "\*t" searches for all names in  ending with the letter "t". ". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

This method pre-populates the values of the following `DirectoryInfo` properties:

-   `FileSystemInfo.Attributes`

-   `FileSystemInfo.CreationTime`

-   `FileSystemInfo.CreationTimeUtc`

-   `FileSystemInfo.LastAccessTime`

-   `FileSystemInfo.LastAccessTimeUtc`

-   `FileSystemInfo.LastWriteTime`

-   `FileSystemInfo.LastWriteTimeUtc`

## DirectoryInfo.GetDirectories(String, SearchOption) method

```csharp
public System.IO.DirectoryInfo[] GetDirectories (string searchPattern, System.IO.SearchOption searchOption);
```

Returns an array of directories in the current `DirectoryInfo` matching the given search criteria and using a value to determine whether to search subdirectories.

Parameters:

- `searchPattern`: The search string to match against the names of directories.  This parameter can contain a combination of valid literal path and wildcard (* and ?) characters, but it doesn't support regular expressions.
- `searchOption`: One of the enumeration values that specifies whether the search operation should include only the current directory or all subdirectories.

Returns: An array of type `DirectoryInfo` matching `searchPattern`.

Exceptions:

- `ArgumentNullException`: `searchPattern` is `null`.
- `ArgumentOutOfRangeException`: `searchOption` is not a valid `SearchOption` value.
- `DirectoryNotFoundException`: The path encapsulated in the `DirectoryInfo` object is invalid (for example, it is on an unmapped drive).
- `UnauthorizedAccessException`: The caller does not have the required permission.

#### Remarks
`searchPattern` can be a combination of literal and wildcard characters, but it doesn't support regular expressions. The following wildcard specifiers are permitted in `searchPattern`.

|Wildcard specifier|Matches|
|------------------------|-------------|
|\* (asterisk)|Zero or more characters in that position.|
|? (question mark)|Zero or one character in that position.|

Characters other than the wildcard are literal characters. For example, the string "\*t" searches for all names in  ending with the letter "t". ". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

If there are no subdirectories, or no subdirectories match the `searchPattern` parameter, this method returns an empty array.

This method pre-populates the values of the following `DirectoryInfo` properties:

-   `FileSystemInfo.Attributes`

-   `FileSystemInfo.CreationTime`

-   `FileSystemInfo.CreationTimeUtc`

-   `FileSystemInfo.LastAccessTime`

-   `FileSystemInfo.LastAccessTimeUtc`

-   `FileSystemInfo.LastWriteTime`

-   `FileSystemInfo.LastWriteTimeUtc`

#### Examples
The following example lists all of the directories and files that begin with the letter "c" in "c:\\".

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/GetDirectories/searchoption.cs._

## DirectoryInfo.GetFiles() method

```csharp
public System.IO.FileInfo[] GetFiles ();
```

Returns a file list from the current directory.

Returns: An array of type `FileInfo`.

Exceptions:

- `DirectoryNotFoundException`: The path is invalid, such as being on an unmapped drive.

#### Remarks
The `DirectoryInfo.EnumerateFiles` and `DirectoryInfo.GetFiles` methods differ as follows:

- When you use `DirectoryInfo.EnumerateFiles`, you can start enumerating the collection of `FileInfo` objects before the whole collection is returned.

- When you use `DirectoryInfo.GetFiles`, you must wait for the whole array of `FileInfo` objects to be returned before you can access the array.

Therefore, when you are working with many files and directories, `DirectoryInfo.EnumerateFiles` can be more efficient.

If there are no files in the `DirectoryInfo`, this method returns an empty array.

The order of the returned file names is not guaranteed; use the `Array.Sort` method if a specific sort order is required.

This method pre-populates the values of the following `FileInfo` properties:

-   `FileSystemInfo.Attributes`

-   `FileSystemInfo.CreationTime`

-   `FileSystemInfo.CreationTimeUtc`

-   `FileSystemInfo.LastAccessTime`

-   `FileSystemInfo.LastAccessTimeUtc`

-   `FileSystemInfo.LastWriteTime`

-   `FileSystemInfo.LastWriteTimeUtc`

-   `FileInfo.Length`

#### Examples
The following example shows how to get a list of files from a directory by using different search options. The example assumes a directory that has files named log1.txt, log2.txt, test1.txt, test2.txt, test3.txt, and a subdirectory that has a file named SubFile.txt.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/GetFiles/directoryinfogetfiles2.cs._
