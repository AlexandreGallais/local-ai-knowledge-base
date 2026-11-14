---
title: "DirectoryInfo class (part 5 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/DirectoryInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DirectoryInfo class (part 5 of 6)

## DirectoryInfo.GetFiles(String) method

```csharp
public System.IO.FileInfo[] GetFiles (string searchPattern);
```

Returns a file list from the current directory matching the given search pattern.

Parameters:

- `searchPattern`: The search string to match against the names of files.  This parameter can contain a combination of valid literal path and wildcard (* and ?) characters, but it doesn't support regular expressions.

Returns: An array of type `FileInfo`.

Exceptions:

- `ArgumentNullException`: `searchPattern` is `null`.
- `DirectoryNotFoundException`: The path is invalid (for example, it is on an unmapped drive).
- `SecurityException`: The caller does not have the required permission.

#### Remarks
`searchPattern` can be a combination of literal and wildcard characters, but it doesn't support regular expressions. The following wildcard specifiers are permitted in `searchPattern`.

|Wildcard specifier|Matches|
|------------------------|-------------|
|\* (asterisk)|Zero or more characters in that position.|
|? (question mark)|Zero or one character in that position.|

Characters other than the wildcard are literal characters. For example, the string "\*t" searches for all names in  ending with the letter "t". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

The `DirectoryInfo.EnumerateFiles` and `DirectoryInfo.GetFiles` methods differ as follows:

- When you use `DirectoryInfo.EnumerateFiles`, you can start enumerating the collection of `FileInfo` objects before the whole collection is returned.

- When you use `DirectoryInfo.GetFiles`, you must wait for the whole array of `FileInfo` objects to be returned before you can access the array.

Therefore, when you are working with many files and directories, `DirectoryInfo.EnumerateFiles` can be more efficient.

If there are no files in the `DirectoryInfo`, this method returns an empty array.

The following wildcard specifiers are permitted in the `searchPattern` parameter.

|Wildcard character|Description|
|------------------------|-----------------|
|*|Zero or more characters.|
|?|Exactly zero or one character.|

The order of the returned file names is not guaranteed; use the `Array.Sort` method if a specific sort order is required.

Wildcards are permitted. For example, the `searchPattern` string "*.txt" searches for all file names having an extension of "txt". The `searchPattern` string "s\*" searches for all file names beginning with the letter "s". If there are no files, or no files that match the `searchPattern` string in the `DirectoryInfo`, this method returns an empty array.

> **Note:**
>  When using the asterisk wildcard character in a `searchPattern` (for example, "*.txt"), the matching behavior varies depending on the length of the specified file extension. A `searchPattern` with a file extension of exactly three characters returns files with an extension of three or more characters, where the first three characters match the file extension specified in the `searchPattern`. A `searchPattern` with a file extension of one, two, or more than three characters returns only files with extensions of exactly that length that match the file extension specified in the `searchPattern`. When using the question mark wildcard character, this method returns only files that match the specified file extension. For example, given two files in a directory, "file1.txt" and "file1.txtother", a search pattern of "file?.txt" returns only the first file, while a search pattern of "file\*.txt" returns both files.

> **Note:**
>  Because this method checks against file names with both the 8.3 file name format and the long file name format, a search pattern similar to "*1\*.txt" may return unexpected file names. For example, using a search pattern of "\*1\*.txt" will return "longfilename.txt" because the equivalent 8.3 file name format would be "longf~1.txt".

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

## DirectoryInfo.GetFiles(String, EnumerationOptions) method

```csharp
public System.IO.FileInfo[] GetFiles (string searchPattern, System.IO.EnumerationOptions enumerationOptions);
```

Returns a file list from the current directory matching the specified search pattern and enumeration options.

Parameters:

- `searchPattern`: The search string to match against the names of files. This parameter can contain a combination of valid literal path and wildcard (* and ?) characters, but it doesn't support regular expressions.
- `enumerationOptions`: An object that describes the search and enumeration configuration to use.

Returns: An array of strongly typed `FileInfo` objects that match `searchPattern` and `enumerationOptions`.

Exceptions:

- `ArgumentNullException`: `searchPattern` is `null`.
- `DirectoryNotFoundException`: The path is invalid (for example, it is on an unmapped drive).
- `SecurityException`: The caller does not have the required permission.

#### Remarks
`searchPattern` can be a combination of literal and wildcard characters, but it doesn't support regular expressions. The following wildcard specifiers are permitted in `searchPattern`.

|Wildcard specifier|Matches|
|------------------------|-------------|
|\* (asterisk)|Zero or more characters in that position.|
|? (question mark)|Zero or one character in that position.|

Characters other than the wildcard are literal characters. For example, the string "\*t" searches for all names in  ending with the letter "t". The `searchPattern` string "s\*" searches for all names in `path` beginning with the letter "s".

The `DirectoryInfo.EnumerateFiles` and `DirectoryInfo.GetFiles` methods differ as follows:

- When you use `DirectoryInfo.EnumerateFiles`, you can start enumerating the collection of `FileInfo` objects before the whole collection is returned.

- When you use `DirectoryInfo.GetFiles`, you must wait for the whole array of `FileInfo` objects to be returned before you can access the array.

Therefore, when you are working with many files and directories, `DirectoryInfo.EnumerateFiles` can be more efficient.

If there are no files in the `DirectoryInfo`, this method returns an empty array.

The following wildcard specifiers are permitted in the `searchPattern` parameter.

|Wildcard character|Description|
|------------------------|-----------------|
|*|Zero or more characters.|
|?|Exactly zero or one character.|

The order of the returned file names is not guaranteed; use the `Array.Sort` method if a specific sort order is required.

Wildcards are permitted. For example, the `searchPattern` string "*.txt" searches for all file names having an extension of "txt". The `searchPattern` string "s\*" searches for all file names beginning with the letter "s". If there are no files, or no files that match the `searchPattern` string in the `DirectoryInfo`, this method returns an empty array.

> **Note:**
>  When using the asterisk wildcard character in a `searchPattern` (for example, "*.txt"), the matching behavior varies depending on the length of the specified file extension. A `searchPattern` with a file extension of exactly three characters returns files with an extension of three or more characters, where the first three characters match the file extension specified in the `searchPattern`. A `searchPattern` with a file extension of one, two, or more than three characters returns only files with extensions of exactly that length that match the file extension specified in the `searchPattern`. When using the question mark wildcard character, this method returns only files that match the specified file extension. For example, given two files in a directory, "file1.txt" and "file1.txtother", a search pattern of "file?.txt" returns only the first file, while a search pattern of "file\*.txt" returns both files.

> **Note:**
>  Because this method checks against file names with both the 8.3 file name format and the long file name format, a search pattern similar to "*1\*.txt" may return unexpected file names. For example, using a search pattern of "\*1\*.txt" will return "longfilename.txt" because the equivalent 8.3 file name format would be "longf~1.txt".

This method pre-populates the values of the following `FileInfo` properties:

-   `FileSystemInfo.Attributes`

-   `FileSystemInfo.CreationTime`

-   `FileSystemInfo.CreationTimeUtc`

-   `FileSystemInfo.LastAccessTime`

-   `FileSystemInfo.LastAccessTimeUtc`

-   `FileSystemInfo.LastWriteTime`

-   `FileSystemInfo.LastWriteTimeUtc`

-   `FileInfo.Length`

## DirectoryInfo.GetFiles(String, SearchOption) method

```csharp
public System.IO.FileInfo[] GetFiles (string searchPattern, System.IO.SearchOption searchOption);
```

Returns a file list from the current directory matching the given search pattern and using a value to determine whether to search subdirectories.

Parameters:

- `searchPattern`: The search string to match against the names of files.  This parameter can contain a combination of valid literal path and wildcard (* and ?) characters, but it doesn't support regular expressions.
- `searchOption`: One of the enumeration values that specifies whether the search operation should include only the current directory or all subdirectories.

Returns: An array of type `FileInfo`.

Exceptions:

- `ArgumentNullException`: `searchPattern` is `null`.
- `ArgumentOutOfRangeException`: `searchOption` is not a valid `SearchOption` value.
- `DirectoryNotFoundException`: The path is invalid (for example, it is on an unmapped drive).
- `SecurityException`: The caller does not have the required permission.

#### Remarks
The `DirectoryInfo.EnumerateFiles` and `DirectoryInfo.GetFiles` methods differ as follows:

- When you use `DirectoryInfo.EnumerateFiles`, you can start enumerating the collection of `FileInfo` objects before the whole collection is returned.

- When you use `DirectoryInfo.GetFiles`, you must wait for the whole array of `FileInfo` objects to be returned before you can access the array.

Therefore, when you are working with many files and directories, `DirectoryInfo.EnumerateFiles` can be more efficient.

If there are no files in the `DirectoryInfo`, this method returns an empty array.

The following wildcard specifiers are permitted in `searchPattern`.

|Wildcard character|Description|
|------------------------|-----------------|
|\* (asterisk)|Zero or more characters.|
|? (question mark)|Exactly zero or one character.|

The order of the returned file names is not guaranteed; use the `Array.Sort` method if a specific sort order is required.

Wildcards are permitted. For example, the `searchPattern` string "*.txt" searches for all file names having an extension of "txt". The `searchPattern` string "s\*" searches for all file names beginning with the letter "s". If there are no files, or no files that match the `searchPattern` string in the `DirectoryInfo`, this method returns an empty array.

> **Note:**
>  When using the asterisk wildcard character in a `searchPattern` (for example, "*.txt"), the matching behavior varies depending on the length of the specified file extension. A `searchPattern` with a file extension of exactly three characters returns files with an extension of three or more characters, where the first three characters match the file extension specified in the `searchPattern`. A `searchPattern` with a file extension of one, two, or more than three characters returns only files with extensions of exactly that length that match the file extension specified in the `searchPattern`. When using the question mark wildcard character, this method returns only files that match the specified file extension. For example, given two files in a directory, "file1.txt" and "file1.txtother", a search pattern of "file?.txt" returns only the first file, while a search pattern of "file\*.txt" returns both files.

The following list shows the behavior of different lengths for the `searchPattern` parameter:

-   "*.abc" returns files having an extension of .abc, .abcd, .abcde, .abcdef, and so on.

-   "*.abcd" returns only files having an extension of .abcd.

-   "*.abcde" returns only files having an extension of .abcde.

-   "*.abcdef" returns only files having an extension of .abcdef.

> **Note:**
>  Because this method checks against file names with both the 8.3 file name format and the long file name format, a search pattern similar to "*1\*.txt" may return unexpected file names. For example, using a search pattern of "\*1\*.txt" will return "longfilename.txt" because the equivalent 8.3 file name format would be "longf~1.txt".

This method pre-populates the values of the following `FileInfo` properties:

1.  `FileSystemInfo.Attributes`

2.  `FileSystemInfo.CreationTime`

3.  `FileSystemInfo.CreationTimeUtc`

4.  `FileSystemInfo.LastAccessTime`

5.  `FileSystemInfo.LastAccessTimeUtc`

6.  `FileSystemInfo.LastWriteTime`

7.  `FileSystemInfo.LastWriteTimeUtc`

8.  `FileInfo.Length`

#### Examples
The following example shows how to get a list of files from a directory by using different search options. The example assumes a directory that has files named log1.txt, log2.txt, test1.txt, test2.txt, test3.txt, and a subdirectory that has a file named SubFile.txt.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/GetFiles/directoryinfogetfiles2.cs._
