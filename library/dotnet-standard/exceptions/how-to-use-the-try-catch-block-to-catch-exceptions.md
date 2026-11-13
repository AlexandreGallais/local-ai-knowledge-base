---
title: "How to: Use the Try-Catch Block to Catch Exceptions"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/exceptions/how-to-use-the-try-catch-block-to-catch-exceptions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to use the try/catch block to catch exceptions

Place any code statements that might raise or throw an exception in a `try` block, and place statements used to handle the exception or exceptions in one or more `catch` blocks below the `try` block. Each `catch` block includes the exception type and can contain additional statements needed to handle that exception type.

In the following example, a `System.IO.StreamReader` opens a file called *data.txt* and retrieves a line from the file. Since the code might throw any of three exceptions, it's placed in a `try` block. Three `catch` blocks catch the exceptions and handle them by displaying the results to the console.

```csharp
using System;
using System.IO;

public class ProcessFile
{
    public static void Main()
    {
        try
        {
            using (StreamReader sr = File.OpenText("data.txt"))
            {
                Console.WriteLine($"The first line of this file is {sr.ReadLine()}");
            }
        }
        catch (FileNotFoundException e)
        {
            Console.WriteLine($"The file was not found: '{e}'");
        }
        catch (DirectoryNotFoundException e)
        {
            Console.WriteLine($"The directory was not found: '{e}'");
        }
        catch (IOException e)
        {
            Console.WriteLine($"The file could not be opened: '{e}'");
        }
    }
}
```
```vb
Imports System.IO

Public Class ProcessFile
    Public Shared Sub Main()
        Try
            Using sr As StreamReader = File.OpenText("data.txt")
                Console.WriteLine($"The first line of this file is {sr.ReadLine()}")
            End Using
        Catch e As FileNotFoundException
            Console.WriteLine($"The file was not found: '{e}'")
        Catch e As DirectoryNotFoundException
            Console.WriteLine($"The directory was not found: '{e}'")
        Catch e As IOException
            Console.WriteLine($"The file could not be opened: '{e}'")
        End Try
    End Sub
End Class
```
The Common Language Runtime (CLR) catches exceptions not handled by `catch` blocks. If an exception is caught by the CLR, one of the following results may occur depending on your CLR configuration:

- A **Debug** dialog box appears.
- The program stops execution and a dialog box with exception information appears.
- An error prints out to the standard error output stream.

> **Note:**
> Most code can throw an exception, and some exceptions, like `System.OutOfMemoryException`, can be thrown by the CLR itself at any time. While applications aren't required to deal with these exceptions, be aware of the possibility when writing libraries to be used by others. For suggestions on when to set code in a `try` block, see Best Practices for Exceptions.

## See also

- Exceptions
- Handling I/O errors in .NET
