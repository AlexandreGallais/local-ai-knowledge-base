---
title: "ZipFile class (part 6 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZipFile.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZipFile class (part 6 of 11)

## ZipFile.ExtractToDirectory(String, String, Encoding) method

```csharp
public static void ExtractToDirectory (string sourceArchiveFileName, string destinationDirectoryName, System.Text.Encoding? entryNameEncoding);
```

Extracts all the files in the specified zip archive to a directory on the file system and uses the specified character encoding for entry names and comments.

Parameters:

- `sourceArchiveFileName`: The path to the archive that is to be extracted.
- `destinationDirectoryName`: The path to the directory in which to place the extracted files, specified as a relative or absolute path. A relative path is interpreted as relative to the current working directory. The directory can already exist. Missing directories are created as needed when extracting entries.
- `entryNameEncoding`: The encoding to use when reading or writing entry names and comments in this archive. Specify a value for this parameter only when an encoding is required for interoperability with zip archive tools and libraries that do not support UTF-8 encoding for entry names or comments.

Exceptions:

- `ArgumentException`: `destinationDirectoryName` or `sourceArchiveFileName` is `String.Empty`, contains only white space, or contains at least one invalid character.

-or-

`entryNameEncoding` is set to a Unicode encoding other than UTF-8.
- `ArgumentNullException`: `destinationDirectoryName` or `sourceArchiveFileName` is `null`.
- `PathTooLongException`: The specified path in `destinationDirectoryName` or `sourceArchiveFileName` exceeds the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `IOException`: The name of an entry in the archive is `String.Empty`, contains only white space, or contains at least one invalid character.

-or-

Extracting an archive entry would create a file that is outside the directory specified by `destinationDirectoryName`. (For example, this might happen if the entry name contains parent directory accessors.)

-or-

An archive entry to extract has the same name as an entry that has already been extracted or that exists in `destinationDirectoryName`.
- `UnauthorizedAccessException`: The caller does not have the required permission to access the archive or the destination directory.
- `NotSupportedException`: `destinationDirectoryName` or `sourceArchiveFileName` contains an invalid format.
- `FileNotFoundException`: `sourceArchiveFileName` was not found.
- `InvalidDataException`: The archive specified by `sourceArchiveFileName` is not a valid zip archive.

-or-

An archive entry was not found or was corrupt.

-or-

An archive entry was compressed by using a compression method that isn't supported.

#### Remarks

The directory specified by `destinationDirectoryName` can already exist. This method creates the destination directory, its missing parent directories, and subdirectories as needed when extracting entries. If the archive is empty, this method doesn't create the destination directory.

Exceptions related to validating the paths in the `destinationDirectoryName` or `sourceArchiveFileName` parameters are thrown before extraction. Otherwise, if an error occurs during extraction, the archive remains partially extracted. Each extracted file has the same relative path to the directory specified by `destinationDirectoryName` as its source entry has to the root of the archive.

If an entry in the zip archive is a symbolic link, it's extracted as a regular folder since symbolic link information isn't preserved in the ZIP format.
If `destinationDirectoryName` or any of its parent directories is a pre-existing junction or symbolic link, the link is followed and the extraction writes to the final target folder.

If `entryNameEncoding` is set to a value other than `null`, entry names and comments are decoded according to the following rules:

- For entries where the language encoding flag (in the general-purpose bit flag of the local file header) is not set, the entry names and comments are decoded by using the specified encoding.
- For entries where the language encoding flag is set, the entry names and comments are decoded by using UTF-8.

If `entryNameEncoding` is set to `null`, entry names and comments are decoded according to the following rules:

- For entries where the language encoding flag (in the general-purpose bit flag of the local file header) is not set, entry names and comments are decoded by using the current system default code page.
- For entries where the language encoding flag is set, the entry names and comments are decoded by using UTF-8.

## ZipFile.ExtractToDirectory(Stream, String, Encoding, Boolean) method

```csharp
public static void ExtractToDirectory (System.IO.Stream source, string destinationDirectoryName, System.Text.Encoding? entryNameEncoding, bool overwriteFiles);
```

Extracts all the files from the zip archive stored in the specified stream and places them in the specified destination directory on the file system, uses the specified character encoding for entry names and comments, and optionally allows choosing if the files in the destination directory should be overwritten.

Parameters:

- `source`: The stream from which the zip archive is to be extracted.
- `destinationDirectoryName`: The path to the directory in which to place the extracted files, specified as a relative or absolute path. A relative path is interpreted as relative to the current working directory. The directory can already exist. Missing directories are created as needed when extracting entries.
- `entryNameEncoding`: The encoding to use when reading or writing entry names and comments in this archive. Specify a value for this parameter only when an encoding is required for interoperability with zip archive tools and libraries that do not support UTF-8 encoding for entry names or comments.
- `overwriteFiles`: `true` to overwrite files; `false` otherwise.

Exceptions:

- `ArgumentException`: `destinationDirectoryName` is `String.Empty`, contains only white space, or contains at least one invalid character.

-or-

`entryNameEncoding` is set to a Unicode encoding other than UTF-8.
- `ArgumentNullException`: `destinationDirectoryName` or `source` is `null`.
- `PathTooLongException`: The specified path in `destinationDirectoryName` exceeds the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `IOException`: The name of an entry in the archive is `String.Empty`, contains only white space, or contains at least one invalid character.

-or-

Extracting an archive entry would create a file that is outside the directory specified by `destinationDirectoryName`. (For example, this might happen if the entry name contains parent directory accessors.)

-or-

`overwriteFiles` is `false` and an archive entry to extract has the same name as an entry that has already been extracted or that exists in `destinationDirectoryName`.
- `UnauthorizedAccessException`: The caller does not have the required permission to access the archive or the destination directory.
- `NotSupportedException`: `destinationDirectoryName` contains an invalid format.
- `InvalidDataException`: The archive contained in the `source` stream is not a valid zip archive.

-or-

An archive entry was not found or was corrupt.

-or-

An archive entry was compressed by using a compression method that isn't supported.

#### Remarks

The directory specified by `destinationDirectoryName` can already exist. This method creates the destination directory, its missing parent directories, and subdirectories as needed when extracting entries. If the archive is empty, this method doesn't create the destination directory.

Exceptions related to validating the paths in the `destinationDirectoryName` or the files in the zip archive contained in the `source` parameters are thrown before extraction. Otherwise, if an error occurs during extraction, the archive remains partially extracted. Each extracted file has the same relative path to the directory specified by `destinationDirectoryName` as its source entry has to the root of the archive.

If an entry in the zip archive is a symbolic link, it's extracted as a regular folder since symbolic link information isn't preserved in the ZIP format. If `destinationDirectoryName` or any of its parent directories is a pre-existing junction or symbolic link, the link is followed and the extraction writes to the final target folder.

If a file to be archived has an invalid last modified time, the first date and time representable in the zip timestamp format (midnight on January 1, 1980) will be used.

## ZipFile.ExtractToDirectory(String, String, Encoding, Boolean) method

```csharp
public static void ExtractToDirectory (string sourceArchiveFileName, string destinationDirectoryName, System.Text.Encoding? entryNameEncoding, bool overwriteFiles);
```

Extracts all of the files in the specified archive to a directory on the file system.

Parameters:

- `sourceArchiveFileName`: The path on the file system to the archive that is to be extracted.
- `destinationDirectoryName`: The path to the destination directory on the file system. The directory can already exist. Missing directories are created as needed when extracting entries.
- `entryNameEncoding`: The encoding to use when reading entry names and comments in this `ZipArchive`.
- `overwriteFiles`: `true` to overwrite files; `false` otherwise.

Exceptions:

- `ArgumentException`: `sourceArchiveFileName` or `destinationDirectoryName` is a zero-length string, contains only whitespace, or contains one or more invalid characters as defined by `Path.InvalidPathChars`.

-or-

`entryNameEncoding` is set to a Unicode encoding other than UTF-8.
- `ArgumentNullException`: `sourceArchiveFileName` or `destinationDirectoryName` is `null`.
- `PathTooLongException`: `sourceArchiveFileName` or `destinationDirectoryName` specifies a path, a file name, or both that exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The path specified by `sourceArchiveFileName` or `destinationDirectoryName` is invalid (for example, it is on an unmapped drive).
- `IOException`: `overwriteFiles` is `false` and an archive entry to extract has the same name as a file that already exists in `destinationDirectoryName`.

-or-

An I/O error has occurred.

-or-

The name of a `ZipArchiveEntry` is zero-length, contains only whitespace, or contains one or more invalid characters as defined by `Path.InvalidPathChars`.

-or-

Extracting a `ZipArchiveEntry` would result in a file destination that is outside the destination directory (for example, because of parent directory accessors).

-or-

A `ZipArchiveEntry` has the same name as an already extracted entry from the same archive.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `NotSupportedException`: `sourceArchiveFileName` or `destinationDirectoryName` is in an invalid format.
- `FileNotFoundException`: `sourceArchiveFileName` was not found.
- `InvalidDataException`: The archive specified by `sourceArchiveFileName` is not a valid `ZipArchive`.

-or-

An archive entry was not found or was corrupt.

-or-

An archive entry has been compressed using a compression method that isn't supported.

#### Remarks

The directory specified by `destinationDirectoryName` can already exist. This method creates the destination directory, its missing parent directories, and subdirectories as needed when extracting entries. If the archive is empty, this method doesn't create the destination directory.

If there is an error while extracting the archive, the archive will remain partially extracted.

Each entry will be extracted such that the extracted file has the same relative path to the `destinationDirectoryName` as the entry has to the archive.

The `sourceArchiveFileName` and `destinationDirectoryName` parameters accept both relative and absolute paths. A relative path is interpreted as relative to the current working directory.

If an entry in the zip archive is a symbolic link, it's extracted as a regular folder since symbolic link information isn't preserved in the ZIP format.
If `destinationDirectoryName` or any of its parent directories is a pre-existing junction or symbolic link, the link is followed and the extraction writes to the final target folder.

If a file to be archived has an invalid last modified time, the first date and time representable in the zip timestamp format (midnight on January 1, 1980) will be used.
