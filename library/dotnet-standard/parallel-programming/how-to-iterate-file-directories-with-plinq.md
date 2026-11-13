---
title: "How to: Iterate File Directories with PLINQ"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/how-to-iterate-file-directories-with-plinq.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Iterate File Directories with PLINQ

This article shows two ways to parallelize operations on file directories. The first query uses the `System.IO.Directory.GetFiles*` method to populate an array of file names in a directory and all subdirectories. This method can introduce latency at the beginning of the operation, because it doesn't return until the entire array is populated. However, after the array is populated, PLINQ can process it in parallel quickly.

The second query uses the static `System.IO.Directory.EnumerateDirectories*` and `System.IO.DirectoryInfo.EnumerateFiles*` methods, which begin returning results immediately. This approach can be faster when you're iterating over large directory trees, but the processing time compared to the first example depends on many factors.

> **Note:**
> These examples are intended to demonstrate usage and might not run faster than the equivalent sequential LINQ to Objects query. For more information about speedup, see Understanding Speedup in PLINQ.

## GetFiles example

 This example shows how to iterate over file directories in simple scenarios when you have access to all directories in the tree, the file sizes aren't large, and the access times are not significant. This approach involves a period of latency at the beginning while the array of file names is being constructed.

 ```csharp
﻿using System;
using System.Diagnostics;
using System.IO;
using System.Linq;

class ExampleWithFiles
{
    static void Main()
    {
        // Supply a tree for which you have at least read permissions.
        string path = @"C:\Program Files";

        FileIterationOne(path);
        FileIterationTwo(path);

        Console.ReadKey();
    }

    // Use Directory.GetFiles to get the source sequence of file names.
    public static void FileIterationOne(string path)
    {
        var sw = Stopwatch.StartNew();
        int count = 0;
        string[]? files = null;
        try
        {
            files = Directory.GetFiles(path, "*.*", SearchOption.AllDirectories);
        }
        catch (UnauthorizedAccessException)
        {
            Console.WriteLine("You do not have permission to access one or more folders in this directory tree.");
            return;
        }
        catch (FileNotFoundException)
        {
            Console.WriteLine($"The specified directory {path} was not found.");
        }

        var fileContents =
            from FileName in files?.AsParallel()
            let extension = Path.GetExtension(FileName)
            where extension == ".txt" || extension == ".htm"
            let Text = File.ReadAllText(FileName)
            select new
            {
                Text,
                FileName
            };

        try
        {
            foreach (var item in fileContents)
            {
                Console.WriteLine($"{Path.GetFileName(item.FileName)}:{item.Text.Length}");
                count++;
            }
        }
        catch (AggregateException ae)
        {
            ae.Handle(ex =>
            {
                if (ex is UnauthorizedAccessException uae)
                {
                    Console.WriteLine(uae.Message);
                    return true;
                }
                return false;
            });
        }

        Console.WriteLine($"FileIterationOne processed {count} files in {sw.ElapsedMilliseconds} milliseconds");
    }

    public static void FileIterationTwo(string path) //225512 ms
    {
        var count = 0;
        var sw = Stopwatch.StartNew();
        var fileNames =
            from dir in Directory.EnumerateFiles(path, "*.*", SearchOption.AllDirectories)
            select dir;

        var fileContents =
            from FileName in fileNames.AsParallel()
            let extension = Path.GetExtension(FileName)
            where extension == ".txt" || extension == ".htm"
            let Text = File.ReadAllText(FileName)
            select new
            {
                Text,
                FileName
            };
        try
        {
            foreach (var item in fileContents)
            {
                Console.WriteLine($"{Path.GetFileName(item.FileName)}:{item.Text.Length}");
                count++;
            }
        }
        catch (AggregateException ae)
        {
            ae.Handle(ex =>
            {
                if (ex is UnauthorizedAccessException uae)
                {
                    Console.WriteLine(uae.Message);
                    return true;
                }
                return false;
            });
        }

        Console.WriteLine($"FileIterationTwo processed {count} files in {sw.ElapsedMilliseconds} milliseconds");
    }
}
```

## EnumerateFiles example

 This example shows how to iterate over file directories in simple scenarios when you have access to all directories in the tree, the file sizes aren't large, and the access times are not significant. This approach begins producing results faster than the previous example.

 ```csharp
﻿using System;
using System.Diagnostics;
using System.IO;
using System.Linq;

class ExampleWithFiles
{
    static void Main()
    {
        // Supply a tree for which you have at least read permissions.
        string path = @"C:\Program Files";

        FileIterationOne(path);
        FileIterationTwo(path);

        Console.ReadKey();
    }

    // Use Directory.GetFiles to get the source sequence of file names.
    public static void FileIterationOne(string path)
    {
        var sw = Stopwatch.StartNew();
        int count = 0;
        string[]? files = null;
        try
        {
            files = Directory.GetFiles(path, "*.*", SearchOption.AllDirectories);
        }
        catch (UnauthorizedAccessException)
        {
            Console.WriteLine("You do not have permission to access one or more folders in this directory tree.");
            return;
        }
        catch (FileNotFoundException)
        {
            Console.WriteLine($"The specified directory {path} was not found.");
        }

        var fileContents =
            from FileName in files?.AsParallel()
            let extension = Path.GetExtension(FileName)
            where extension == ".txt" || extension == ".htm"
            let Text = File.ReadAllText(FileName)
            select new
            {
                Text,
                FileName
            };

        try
        {
            foreach (var item in fileContents)
            {
                Console.WriteLine($"{Path.GetFileName(item.FileName)}:{item.Text.Length}");
                count++;
            }
        }
        catch (AggregateException ae)
        {
            ae.Handle(ex =>
            {
                if (ex is UnauthorizedAccessException uae)
                {
                    Console.WriteLine(uae.Message);
                    return true;
                }
                return false;
            });
        }

        Console.WriteLine($"FileIterationOne processed {count} files in {sw.ElapsedMilliseconds} milliseconds");
    }

    public static void FileIterationTwo(string path) //225512 ms
    {
        var count = 0;
        var sw = Stopwatch.StartNew();
        var fileNames =
            from dir in Directory.EnumerateFiles(path, "*.*", SearchOption.AllDirectories)
            select dir;

        var fileContents =
            from FileName in fileNames.AsParallel()
            let extension = Path.GetExtension(FileName)
            where extension == ".txt" || extension == ".htm"
            let Text = File.ReadAllText(FileName)
            select new
            {
                Text,
                FileName
            };
        try
        {
            foreach (var item in fileContents)
            {
                Console.WriteLine($"{Path.GetFileName(item.FileName)}:{item.Text.Length}");
                count++;
            }
        }
        catch (AggregateException ae)
        {
            ae.Handle(ex =>
            {
                if (ex is UnauthorizedAccessException uae)
                {
                    Console.WriteLine(uae.Message);
                    return true;
                }
                return false;
            });
        }

        Console.WriteLine($"FileIterationTwo processed {count} files in {sw.ElapsedMilliseconds} milliseconds");
    }
}
```

 When using `System.IO.Directory.GetFiles*`, be sure that you have sufficient permissions on all directories in the tree. Otherwise, an exception will be thrown and no results will be returned. When using the `System.IO.Directory.EnumerateDirectories*` in a PLINQ query, it is problematic to handle I/O exceptions in a graceful way that enables you to continue iterating. If your code must handle I/O or unauthorized access exceptions, then you should consider the approach described in How to: Iterate File Directories with the Parallel Class.

 If I/O latency is an issue, for example with file I/O over a network, consider using one of the asynchronous I/O techniques described in TPL and Traditional .NET Asynchronous Programming and in this blog post.

## See also

- Parallel LINQ (PLINQ)
