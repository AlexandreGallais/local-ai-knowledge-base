---
title: "DirectoryInfo class (part 6 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/DirectoryInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DirectoryInfo class (part 6 of 6)

## DirectoryInfo.GetFileSystemInfos() method

```csharp
public System.IO.FileSystemInfo[] GetFileSystemInfos ();
```

Returns an array of strongly typed `FileSystemInfo` entries representing all the files and subdirectories in a directory.

Returns: An array of strongly typed `FileSystemInfo` entries.

Exceptions:

- `DirectoryNotFoundException`: The path is invalid (for example, it is on an unmapped drive).

#### Remarks
If there are no files or directories in the `DirectoryInfo`, this method returns an empty array. This method is not recursive.

For subdirectories, the `FileSystemInfo` objects returned by this method can be cast to the derived class `DirectoryInfo`. Use the `FileAttributes` value returned by the `Attributes` property to determine whether the `FileSystemInfo` represents a file or a directory.

This method pre-populates the values of the following `FileSystemInfo` properties:

-   `FileSystemInfo.Attributes`

-   `FileSystemInfo.CreationTime`

-   `FileSystemInfo.CreationTimeUtc`

-   `FileSystemInfo.LastAccessTime`

-   `FileSystemInfo.LastAccessTimeUtc`

-   `FileSystemInfo.LastWriteTime`

-   `FileSystemInfo.LastWriteTimeUtc`

#### Examples
The following example counts the files and directories under the specified directory.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/GetFileSystemInfos/fsizesort.cs._

## DirectoryInfo.GetFileSystemInfos(String) method

```csharp
public System.IO.FileSystemInfo[] GetFileSystemInfos (string searchPattern);
```

Retrieves an array of strongly typed `FileSystemInfo` objects representing the files and subdirectories that match the specified search criteria.

Parameters:

- `searchPattern`: The search string to match against the names of directories and files.  This parameter can contain a combination of valid literal path and wildcard (* and ?) characters, but it doesn't support regular expressions.

Returns: An array of strongly typed `FileSystemInfo` objects matching the search criteria.

Exceptions:

- `ArgumentNullException`: `searchPattern` is `null`.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `SecurityException`: The caller does not have the required permission.

#### Remarks
`searchPattern` can be a combination of literal and wildcard characters, but it doesn't support regular expressions. The following wildcard specifiers are permitted in `searchPattern`.

|Wildcard specifier|Matches|
|------------------------|-------------|
|\* (asterisk)|Zero or more characters in that position.|
|? (question mark)|Zero or one character in that position.|

Characters other than the wildcard are literal characters. For example, the string "\*t" searches for all names in  ending with the letter "t". ". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

This method is not recursive.

For subdirectories, the `FileSystemInfo` objects returned by this method can be cast to the derived class `DirectoryInfo`. Use the `FileAttributes` value returned by the `Attributes` property to determine whether the `FileSystemInfo` represents a file or a directory.

Wild cards are permitted. For example, the `searchPattern` string "\*t" searches for all directory names in `path` ending with the letter "t". The `searchPattern` string "s\*" searches for all directory names in `path` beginning with the letter "s".

The string ".." can only be used in `searchPattern` if it is specified as a part of a valid directory name, such as in the directory name "a..b". It cannot be used to move up the directory hierarchy. If there are no files or directories, or no files or directories that match the `searchPattern` string in the `DirectoryInfo`, this method returns an empty array.

This method pre-populates the values of the following `FileSystemInfo` properties:

-   `FileSystemInfo.Attributes`

-   `FileSystemInfo.CreationTime`

-   `FileSystemInfo.CreationTimeUtc`

-   `FileSystemInfo.LastAccessTime`

-   `FileSystemInfo.LastAccessTimeUtc`

-   `FileSystemInfo.LastWriteTime`

-   `FileSystemInfo.LastWriteTimeUtc`

#### Examples
The following example counts the files and directories that match the specified search pattern.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/GetFileSystemInfos/dirinfo getfilesysinfos2.cs._

## DirectoryInfo.GetFileSystemInfos(String, EnumerationOptions) method

```csharp
public System.IO.FileSystemInfo[] GetFileSystemInfos (string searchPattern, System.IO.EnumerationOptions enumerationOptions);
```

Retrieves an array of strongly typed `FileSystemInfo` objects representing the files and subdirectories that match the specified search pattern and enumeration options.

Parameters:

- `searchPattern`: The search string to match against the names of directories and files. This parameter can contain a combination of valid literal path and wildcard (* and ?) characters, but it doesn't support regular expressions.
- `enumerationOptions`: An object that describes the search and enumeration configuration to use.

Returns: An array of strongly typed `FileSystemInfo` objects matching `searchPattern` and `enumerationOptions`.

Exceptions:

- `ArgumentNullException`: `searchPattern` is `null`.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `SecurityException`: The caller does not have the required permission.

#### Remarks
`searchPattern` can be a combination of literal and wildcard characters, but it doesn't support regular expressions. The following wildcard specifiers are permitted in `searchPattern`.

|Wildcard specifier|Matches|
|------------------------|-------------|
|\* (asterisk)|Zero or more characters in that position.|
|? (question mark)|Zero or one character in that position.|

Characters other than the wildcard are literal characters. For example, the string "\*t" searches for all names in  ending with the letter "t". ". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

This method is not recursive.

For subdirectories, the `FileSystemInfo` objects returned by this method can be cast to the derived class `DirectoryInfo`. Use the `FileAttributes` value returned by the `Attributes` property to determine whether the `FileSystemInfo` represents a file or a directory.

Wild cards are permitted. For example, the `searchPattern` string "\*t" searches for all directory names in `path` ending with the letter "t". The `searchPattern` string "s\*" searches for all directory names in `path` beginning with the letter "s".

The string ".." can only be used in `searchPattern` if it is specified as a part of a valid directory name, such as in the directory name "a..b". It cannot be used to move up the directory hierarchy. If there are no files or directories, or no files or directories that match the `searchPattern` string in the `DirectoryInfo`, this method returns an empty array.

This method pre-populates the values of the following `FileSystemInfo` properties:

-   `FileSystemInfo.Attributes`

-   `FileSystemInfo.CreationTime`

-   `FileSystemInfo.CreationTimeUtc`

-   `FileSystemInfo.LastAccessTime`

-   `FileSystemInfo.LastAccessTimeUtc`

-   `FileSystemInfo.LastWriteTime`

-   `FileSystemInfo.LastWriteTimeUtc`

## DirectoryInfo.GetFileSystemInfos(String, SearchOption) method

```csharp
public System.IO.FileSystemInfo[] GetFileSystemInfos (string searchPattern, System.IO.SearchOption searchOption);
```

Retrieves an array of `FileSystemInfo` objects that represent the files and subdirectories matching the specified search criteria.

Parameters:

- `searchPattern`: The search string to match against the names of directories and files.  This parameter can contain a combination of valid literal path and wildcard (* and ?) characters, but it doesn't support regular expressions.
- `searchOption`: One of the enumeration values that specifies whether the search operation should include only the current directory or all subdirectories. The default value is `SearchOption.TopDirectoryOnly`.

Returns: An array of file system entries that match the search criteria.

Exceptions:

- `ArgumentNullException`: `searchPattern` is `null`.
- `ArgumentOutOfRangeException`: `searchOption` is not a valid `SearchOption` value.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `SecurityException`: The caller does not have the required permission.

#### Remarks
`searchPattern` can be a combination of literal and wildcard characters, but it doesn't support regular expressions. The following wildcard specifiers are permitted in `searchPattern`.

|Wildcard specifier|Matches|
|------------------------|-------------|
|\* (asterisk)|Zero or more characters in that position.|
|? (question mark)|Zero or one character in that position.|

Characters other than the wildcard are literal characters. For example, the string "\*t" searches for all names in  ending with the letter "t". ". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

For subdirectories, the `FileSystemInfo` objects returned by this method can be cast to the derived class `DirectoryInfo`. Use the `FileAttributes` value returned by the `Attributes` property to determine whether the `FileSystemInfo` represents a file or a directory.

This method pre-populates the values of the following `FileSystemInfo` properties:

-   `FileSystemInfo.Attributes`

-   `FileSystemInfo.CreationTime`

-   `FileSystemInfo.CreationTimeUtc`

-   `FileSystemInfo.LastAccessTime`

-   `FileSystemInfo.LastAccessTimeUtc`

-   `FileSystemInfo.LastWriteTime`

-   `FileSystemInfo.LastWriteTimeUtc`

## DirectoryInfo.MoveTo(String) method

```csharp
public void MoveTo (string destDirName);
```

Moves a `DirectoryInfo` instance and its contents to a new path.

Parameters:

- `destDirName`: The name and path to which to move this directory. The destination cannot be another disk volume or a directory with the identical name. It can be an existing directory to which you want to add this directory as a subdirectory.

Exceptions:

- `ArgumentNullException`: `destDirName` is `null`.
- `ArgumentException`: `destDirName` is an empty string (''").
- `IOException`: An attempt was made to move a directory to a different volume.

-or-

`destDirName` already exists.

-or-

You are not authorized to access this path.

-or-

The directory being moved and the destination directory have the same name.
- `SecurityException`: The caller does not have the required permission.
- `DirectoryNotFoundException`: The destination directory cannot be found.

#### Remarks
This method throws an `IOException` if, for example, you try to move c:\mydir to c:\public, and c:\public already exists. You must specify "c:\\\public\\\mydir" as the `destDirName` parameter, or specify a new directory name such as "c:\\\newdir".

This method permits moving a directory to a read-only directory. The read/write attribute of neither directory is affected.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates moving a directory.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/MoveTo/directoryinfomoveto.cs._

## DirectoryInfo.ToString() method

```csharp
public override string ToString ();
```

Returns the original path that was passed to the `DirectoryInfo` constructor. Use the `DirectoryInfo.FullName` or `DirectoryInfo.Name` properties for the full path or file/directory name instead of this method.

Returns: The original path that was passed by the user.

#### Remarks

> **Important:**
> The string returned by the `DirectoryInfo.ToString` method represents the path that was passed to the `DirectoryInfo` constructor. Instead of calling the `ToString` method, you should retrieve the value of either of the following properties, depending on your intent:
> - `Name`, to get the name of the directory, without any parent path information.
> - `FullName`, to get the fully qualified path of the directory.
