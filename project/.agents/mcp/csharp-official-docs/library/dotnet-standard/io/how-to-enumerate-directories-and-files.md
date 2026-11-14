---
title: "How to: Enumerate directories and files"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/io/how-to-enumerate-directories-and-files.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Enumerate directories and files

Enumerable collections provide better performance than arrays when you work with large collections of directories and files. To enumerate directories and files, use methods that return an enumerable collection of directory or file names, or their `System.IO.DirectoryInfo`, `System.IO.FileInfo`, or `System.IO.FileSystemInfo` objects.

If you want to search and return only the names of directories or files, use the enumeration methods of the `System.IO.Directory` class. If you want to search and return other properties of directories or files, use the `System.IO.DirectoryInfo` and `System.IO.FileSystemInfo` classes.

You can use enumerable collections from these methods as the `System.Collections.Generic.IEnumerable`1` parameter for constructors of collection classes like `System.Collections.Generic.List`1`.

The following table summarizes the methods that return enumerable collections of files and directories:

|To search and return|Use method|
|------------------|-------------------------------------|-------------------|
|Directory names|`System.IO.Directory.EnumerateDirectories*`|
|Directory information (`System.IO.DirectoryInfo`)|`System.IO.DirectoryInfo.EnumerateDirectories*`|
|File names|`System.IO.Directory.EnumerateFiles*`|
|File information (`System.IO.FileInfo`)|`System.IO.DirectoryInfo.EnumerateFiles*`|
|File system entry names|`System.IO.Directory.EnumerateFileSystemEntries*`|
|File system entry information (`System.IO.FileSystemInfo`)|`System.IO.DirectoryInfo.EnumerateFileSystemInfos*`|
|Directory and file names |`System.IO.Directory.EnumerateFileSystemEntries*`|

> **Note:**
> Although you can immediately enumerate all the files in the subdirectories of a parent directory by using the `System.IO.SearchOption.AllDirectories` option of the optional `System.IO.SearchOption` enumeration, `System.UnauthorizedAccessException` errors may make the enumeration incomplete. You can catch these exceptions by first enumerating directories and then enumerating files.

## Examples: Use the Directory class

The following example uses the `System.IO.Directory.EnumerateDirectories(System.String)` method to get a list of the top-level directory names in a specified path.

```csharp
using System;
using System.Collections.Generic;
using System.IO;

class Program
{
    private static void Main(string[] args)
    {
        try
        {
            // Set a variable to the My Documents path.
            string docPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);

            List<string> dirs = new List<string>(Directory.EnumerateDirectories(docPath));

            foreach (var dir in dirs)
            {
                Console.WriteLine($"{dir.Substring(dir.LastIndexOf(Path.DirectorySeparatorChar) + 1)}");
            }
            Console.WriteLine($"{dirs.Count} directories found.");
        }
        catch (UnauthorizedAccessException ex)
        {
            Console.WriteLine(ex.Message);
        }
        catch (PathTooLongException ex)
        {
            Console.WriteLine(ex.Message);
        }
    }
}
```

The following example uses the `System.IO.Directory.EnumerateFiles(System.String,System.String,System.IO.SearchOption)` method to recursively enumerate all file names in a directory and subdirectories that match a certain pattern. It then reads each line of each file and displays the lines that contain a specified string, with their filenames and paths.

```csharp
using System;
using System.IO;
using System.Linq;

class Program
{
    static void Main(string[] args)
    {
        try
        {
            // Set a variable to the My Documents path.
            string docPath =
            Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);

            var files = from file in Directory.EnumerateFiles(docPath, "*.txt", SearchOption.AllDirectories)
                        from line in File.ReadLines(file)
                        where line.Contains("Microsoft")
                        select new
                        {
                            File = file,
                            Line = line
                        };

            foreach (var f in files)
            {
                Console.WriteLine($"{f.File}\t{f.Line}");
            }
            Console.WriteLine($"{files.Count().ToString()} files found.");
        }
        catch (UnauthorizedAccessException uAEx)
        {
            Console.WriteLine(uAEx.Message);
        }
        catch (PathTooLongException pathEx)
        {
            Console.WriteLine(pathEx.Message);
        }
    }
}
```

## Examples: Use the DirectoryInfo class

The following example uses the `System.IO.DirectoryInfo.EnumerateDirectories*` method to list a collection of top-level directories whose `System.IO.FileSystemInfo.CreationTimeUtc` is earlier than a certain `System.DateTime` value.

```csharp
﻿using System;
using System.IO;

namespace EnumDir
{
    class Program
    {
        static void Main(string[] args)
        {
            // Set a variable to the Documents path.
            string docPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);

            DirectoryInfo dirPrograms = new DirectoryInfo(docPath);
            DateTime StartOf2009 = new DateTime(2009, 01, 01);

            var dirs = from dir in dirPrograms.EnumerateDirectories()
            where dir.CreationTimeUtc > StartOf2009
            select new
            {
                ProgDir = dir,
            };

            foreach (var di in dirs)
            {
                Console.WriteLine($"{di.ProgDir.Name}");
            }
        }
    }
}
```

The following example uses the `System.IO.DirectoryInfo.EnumerateFiles*` method to list all files whose `System.IO.FileInfo.Length` exceeds 10MB. This example first enumerates the top-level directories, to catch possible unauthorized access exceptions, and then enumerates the files.

```csharp
using System;
using System.IO;

class Program
{
    static void Main(string[] args)
    {
        // Set a variable to the My Documents path.
        string docPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);

        DirectoryInfo diTop = new DirectoryInfo(docPath);

        try
        {
            foreach (var fi in diTop.EnumerateFiles())
            {
                try
                {
                    // Display each file over 10 MB;
                    if (fi.Length > 10000000)
                    {
                        Console.WriteLine($"{fi.FullName}\t\t{fi.Length.ToString("N0")}");
                    }
                }
                catch (UnauthorizedAccessException unAuthTop)
                {
                    Console.WriteLine($"{unAuthTop.Message}");
                }
            }

            foreach (var di in diTop.EnumerateDirectories("*"))
            {
                try
                {
                    foreach (var fi in di.EnumerateFiles("*", SearchOption.AllDirectories))
                    {
                        try
                        {
                            // Display each file over 10 MB;
                            if (fi.Length > 10000000)
                            {
                                Console.WriteLine($"{fi.FullName}\t\t{fi.Length.ToString("N0")}");
                            }
                        }
                        catch (UnauthorizedAccessException unAuthFile)
                        {
                            Console.WriteLine($"unAuthFile: {unAuthFile.Message}");
                        }
                    }
                }
                catch (UnauthorizedAccessException unAuthSubDir)
                {
                    Console.WriteLine($"unAuthSubDir: {unAuthSubDir.Message}");
                }
            }
        }
        catch (DirectoryNotFoundException dirNotFound)
        {
            Console.WriteLine($"{dirNotFound.Message}");
        }
        catch (UnauthorizedAccessException unAuthDir)
        {
            Console.WriteLine($"unAuthDir: {unAuthDir.Message}");
        }
        catch (PathTooLongException longPath)
        {
            Console.WriteLine($"{longPath.Message}");
        }
    }
}
```

## See also

- File and stream I/O
