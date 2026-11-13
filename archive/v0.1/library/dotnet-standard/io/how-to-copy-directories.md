---
title: "How to: Copy directories"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/how-to-copy-directories.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Copy directories

This article demonstrates how to use I/O classes to synchronously copy the contents of a directory to another location.

For an example of asynchronous file copy, see Asynchronous file I/O.

This example copies subdirectories by setting the `recursive` parameter of the `CopyDirectory` method to `true`. The `CopyDirectory` method recursively copies subdirectories by calling itself on each subdirectory until there are no more to copy.

## Example

```csharp
﻿using System.IO;

CopyDirectory(@".\", @".\copytest", true);

static void CopyDirectory(string sourceDir, string destinationDir, bool recursive)
{
    // Get information about the source directory
    var dir = new DirectoryInfo(sourceDir);

    // Check if the source directory exists
    if (!dir.Exists)
        throw new DirectoryNotFoundException($"Source directory not found: {dir.FullName}");

    // Cache directories before we start copying
    DirectoryInfo[] dirs = dir.GetDirectories();

    // Create the destination directory
    Directory.CreateDirectory(destinationDir);

    // Get the files in the source directory and copy to the destination directory
    foreach (FileInfo file in dir.GetFiles())
    {
        string targetFilePath = Path.Combine(destinationDir, file.Name);
        file.CopyTo(targetFilePath);
    }

    // If recursive and copying subdirectories, recursively call this method
    if (recursive)
    {
        foreach (DirectoryInfo subDir in dirs)
        {
            string newDestinationDir = Path.Combine(destinationDir, subDir.Name);
            CopyDirectory(subDir.FullName, newDestinationDir, true);
        }
    }
}
```
```vb
﻿Imports System.IO

Module Program
    Sub Main(args As String())
        CopyDirectory(".\", ".\copytest", True)
    End Sub

    Public Sub CopyDirectory(sourceDir As String, destinationDir As String, recursive As Boolean)

        ' Get information about the source directory
        Dim dir As New DirectoryInfo(sourceDir)

        ' Check if the source directory exists
        If Not dir.Exists Then
            Throw New DirectoryNotFoundException($"Source directory not found: {dir.FullName}")
        End If

        ' Cache directories before we start copying
        Dim dirs As DirectoryInfo() = dir.GetDirectories()

        ' Create the destination directory
        Directory.CreateDirectory(destinationDir)

        ' Get the files in the source directory and copy to the destination directory
        For Each file As FileInfo In dir.GetFiles()
            Dim targetFilePath As String = Path.Combine(destinationDir, file.Name)
            file.CopyTo(targetFilePath)
        Next

        ' If recursive and copying subdirectories, recursively call this method
        If recursive Then
            For Each subDir As DirectoryInfo In dirs
                Dim newDestinationDir As String = Path.Combine(destinationDir, subDir.Name)
                CopyDirectory(subDir.FullName, newDestinationDir, True)
            Next
        End If

    End Sub
End Module
```
## See also

- `System.IO.FileInfo`
- `System.IO.DirectoryInfo`
- `System.IO.FileStream`
- File and stream I/O
- Common I/O tasks
- Asynchronous file I/O
