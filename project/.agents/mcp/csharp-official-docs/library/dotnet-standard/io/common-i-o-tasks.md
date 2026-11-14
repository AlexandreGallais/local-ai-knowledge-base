---
title: "Common I/O Tasks"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/io/common-i-o-tasks.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Common I/O Tasks

The `System.IO` namespace provides several classes that allow for various actions, such as reading and writing, to be performed on files, directories, and streams. For more information, see File and Stream I/O.

## Common File Tasks

|To do this...|See the example in this topic...|
|-------------------|--------------------------------------|
|Create a text file|`System.IO.File.CreateText*` method `System.IO.FileInfo.CreateText*` method `System.IO.File.Create*` method `System.IO.FileInfo.Create*` method|
|Write to a text file|How to: Write Text to a File How to: Write a Text File (C++/CLI)|
|Read from a text file|How to: Read Text from a File|
|Append text to a file|How to: Open and Append to a Log File `System.IO.File.AppendText*` method `System.IO.FileInfo.AppendText*` method|
|Rename or move a file|`System.IO.File.Move*` method `System.IO.FileInfo.MoveTo*` method|
|Delete a file|`System.IO.File.Delete*` method `System.IO.FileInfo.Delete*` method|
|Copy a file|`System.IO.File.Copy*` method `System.IO.FileInfo.CopyTo*` method|
|Get the size of a file|`System.IO.FileInfo.Length` property|
|Get the attributes of a file|`System.IO.File.GetAttributes*` method|
|Set the attributes of a file|`System.IO.File.SetAttributes*` method|
|Determine whether a file exists|`System.IO.File.Exists*` method|
|Read from a binary file|How to: Read and Write to a Newly Created Data File|
|Write to a binary file|How to: Read and Write to a Newly Created Data File|
|Retrieve a file name extension|`System.IO.Path.GetExtension*` method|
|Retrieve the fully qualified path of a file|`System.IO.Path.GetFullPath*` method|
|Retrieve the file name and extension from a path|`System.IO.Path.GetFileName*` method|
|Change the extension of a file|`System.IO.Path.ChangeExtension*` method|

## Common Directory Tasks

|To do this...|See the example in this topic...|
|-------------------|--------------------------------------|
|Access a file in a special folder such as My Documents|How to: Write Text to a File|
|Create a directory|`System.IO.Directory.CreateDirectory*` method `System.IO.FileInfo.Directory` property|
|Create a subdirectory|`System.IO.DirectoryInfo.CreateSubdirectory*` method|
|Rename or move a directory|`System.IO.Directory.Move*` method `System.IO.DirectoryInfo.MoveTo*` method|
|Copy a directory|How to: Copy Directories|
|Delete a directory|`System.IO.Directory.Delete*` method `System.IO.DirectoryInfo.Delete*` method|
|See the files and subdirectories in a directory|How to: Enumerate Directories and Files|
|Find the size of a directory|`System.IO.Directory` class|
|Determine whether a directory exists|`System.IO.Directory.Exists*` method|

## See also

- File and Stream I/O
- Composing Streams
- Asynchronous File I/O
