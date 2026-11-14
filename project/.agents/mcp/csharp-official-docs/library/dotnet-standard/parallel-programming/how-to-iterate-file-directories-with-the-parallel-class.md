---
title: "How to: Iterate File Directories with the Parallel Class"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-iterate-file-directories-with-the-parallel-class.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Iterate File Directories with the Parallel Class

In many cases, file iteration is an operation that can be easily parallelized. The topic How to: Iterate File Directories with PLINQ shows the easiest way to perform this task for many scenarios. However, complications can arise when your code has to deal with the many types of exceptions that can arise when accessing the file system. The following example shows one approach to the problem. It uses a stack-based iteration to traverse all files and folders under a specified directory, and it enables your code to catch and handle various exceptions. Of course, the way that you handle the exceptions is up to you.

## Example

 The following example iterates the directories sequentially, but processes the files in parallel. This is probably the best approach when you have a large file-to-directory ratio. It is also possible to parallelize the directory iteration, and access each file sequentially. It is probably not efficient to parallelize both loops unless you are specifically targeting a machine with a large number of processors. However, as in all cases, you should test your application thoroughly to determine the best approach.

 ```csharp
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Security;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    static void Main()
    {
        try
        {
            TraverseTreeParallelForEach(@"C:\Program Files", (f) =>
            {
                // Exceptions are no-ops.
                try
                {
                    // Do nothing with the data except read it.
                    byte[] data = File.ReadAllBytes(f);
                }
                catch (FileNotFoundException) { }
                catch (IOException) { }
                catch (UnauthorizedAccessException) { }
                catch (SecurityException) { }
                // Display the filename.
                Console.WriteLine(f);
            });
        }
        catch (ArgumentException)
        {
            Console.WriteLine(@"The directory 'C:\Program Files' does not exist.");
        }

        // Keep the console window open.
        Console.ReadKey();
    }

    public static void TraverseTreeParallelForEach(string root, Action<string> action)
    {
        //Count of files traversed and timer for diagnostic output
        int fileCount = 0;
        var sw = Stopwatch.StartNew();

        // Determine whether to parallelize file processing on each folder based on processor count.
        int procCount = Environment.ProcessorCount;

        // Data structure to hold names of subfolders to be examined for files.
        Stack<string> dirs = new Stack<string>();

        if (!Directory.Exists(root))
        {
            throw new ArgumentException(
                "The given root directory doesn't exist.", nameof(root));
        }
        dirs.Push(root);

        while (dirs.Count > 0)
        {
            string currentDir = dirs.Pop();
            string[] subDirs = { };
            string[] files = { };

            try
            {
                subDirs = Directory.GetDirectories(currentDir);
            }
            // Thrown if we do not have discovery permission on the directory.
            catch (UnauthorizedAccessException e)
            {
                Console.WriteLine(e.Message);
                continue;
            }
            // Thrown if another process has deleted the directory after we retrieved its name.
            catch (DirectoryNotFoundException e)
            {
                Console.WriteLine(e.Message);
                continue;
            }

            try
            {
                files = Directory.GetFiles(currentDir);
            }
            catch (UnauthorizedAccessException e)
            {
                Console.WriteLine(e.Message);
                continue;
            }
            catch (DirectoryNotFoundException e)
            {
                Console.WriteLine(e.Message);
                continue;
            }
            catch (IOException e)
            {
                Console.WriteLine(e.Message);
                continue;
            }

            // Execute in parallel if there are enough files in the directory.
            // Otherwise, execute sequentially.Files are opened and processed
            // synchronously but this could be modified to perform async I/O.
            try
            {
                if (files.Length < procCount)
                {
                    foreach (var file in files)
                    {
                        action(file);
                        fileCount++;
                    }
                }
                else
                {
                    Parallel.ForEach(files, () => 0,
                        (file, loopState, localCount) =>
                        {
                            action(file);
                            return (int)++localCount;
                        },
                        (c) =>
                        {
                            Interlocked.Add(ref fileCount, c);
                        });
                }
            }
            catch (AggregateException ae)
            {
                ae.Handle((ex) =>
                {
                    if (ex is UnauthorizedAccessException)
                    {
                        // Here we just output a message and go on.
                        Console.WriteLine(ex.Message);
                        return true;
                    }
                    // Handle other exceptions here if necessary...

                    return false;
                });
            }

            // Push the subdirectories onto the stack for traversal.
            // This could also be done before handing the files.
            foreach (string str in subDirs)
                dirs.Push(str);
        }

        // For diagnostic purposes.
        Console.WriteLine($"Processed {fileCount} files in {sw.ElapsedMilliseconds} milliseconds");
    }
}
```

 In this example, the file I/O is performed synchronously. When dealing with large files or slow network connections, it might be preferable to access the files asynchronously. You can combine asynchronous I/O techniques with parallel iteration. For more information, see TPL and Traditional .NET Asynchronous Programming.

 The example uses the local `fileCount` variable to maintain a count of the total number of files processed. Because the variable might be accessed concurrently by multiple tasks, access to it is synchronized by calling the `System.Threading.Interlocked.Add*` method.

 Note that if an exception is thrown on the main thread, the threads that are started by the `System.Threading.Tasks.Parallel.ForEach*` method might continue to run. To stop these threads, you can set a Boolean variable in your exception handlers, and check its value on each iteration of the parallel loop. If the value indicates that an exception has been thrown, use the `System.Threading.Tasks.ParallelLoopState` variable to stop or break from the loop. For more information, see How to: Stop or Break from a Parallel.For Loop.

## See also

- Data Parallelism
