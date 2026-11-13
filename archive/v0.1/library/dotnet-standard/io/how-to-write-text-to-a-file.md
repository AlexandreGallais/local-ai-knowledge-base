---
title: "How to: Write text to a file"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/how-to-write-text-to-a-file.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Write text to a file

This article shows different ways to write text to a file for a .NET app.

The following classes and methods are typically used to write text to a file:

- `System.IO.StreamWriter` contains methods to write to a file synchronously (`System.IO.StreamWriter.Write*` and `System.IO.TextWriter.WriteLine*`) or asynchronously (`System.IO.StreamWriter.WriteAsync*` and `System.IO.StreamWriter.WriteLineAsync*`).

- `System.IO.File` provides static methods to write text to a file such as `System.IO.File.WriteAllLines*` and `System.IO.File.WriteAllText*`, or to append text to a file such as `System.IO.File.AppendAllLines*`, `System.IO.File.AppendAllText*`, and `System.IO.File.AppendText*`.

- `System.IO.Path` is for strings that have file or directory path information. It contains the `System.IO.Path.Combine*` method and in .NET Core 2.1 and later, the `System.IO.Path.Join*` and `System.IO.Path.TryJoin*` methods. These methods let you concatenate strings for building a file or directory path.

> **Note:**
> The following examples show only the minimum amount of code needed. A real-world app usually provides more robust error checking and exception handling.

## Example: Synchronously write text with StreamWriter

The following example shows how to use the `System.IO.StreamWriter` class to synchronously write text to a new file one line at a time. Because the `System.IO.StreamWriter` object is declared and instantiated in a `using` statement, the `System.IO.StreamWriter.Dispose*` method is invoked, which automatically flushes and closes the stream.

```csharp
﻿using System;
using System.IO;

class Program
{
    static void Main(string[] args)
    {

        // Create a string array with the lines of text
        string[] lines = { "First line", "Second line", "Third line" };

        // Set a variable to the Documents path.
        string docPath =
          Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);

        // Write the string array to a new file named "WriteLines.txt".
        using (StreamWriter outputFile = new StreamWriter(Path.Combine(docPath, "WriteLines.txt")))
        {
            foreach (string line in lines)
                outputFile.WriteLine(line);
        }
    }
}
// The example creates a file named "WriteLines.txt" with the following contents:
// First line
// Second line
// Third line
```

## Example: Synchronously append text with StreamWriter

The following example shows how to use the `System.IO.StreamWriter` class to synchronously append text to the text file created in the first example:

```csharp
﻿using System;
using System.IO;

class Program
{
    static void Main(string[] args)
    {

        // Set a variable to the Documents path.
        string docPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);

        // Append text to an existing file named "WriteLines.txt".
        using (StreamWriter outputFile = new StreamWriter(Path.Combine(docPath, "WriteLines.txt"), true))
        {
            outputFile.WriteLine("Fourth Line");
        }
    }
}
// The example adds the following line to the contents of "WriteLines.txt":
// Fourth Line
```

## Example: Asynchronously write text with StreamWriter

The following example shows how to asynchronously write text to a new file using the `System.IO.StreamWriter` class. To invoke the `System.IO.StreamWriter.WriteAsync*` method, the method call must be within an `async` method.

```csharp
﻿using System;
using System.IO;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        // Set a variable to the Documents path.
        string docPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);

        // Write the specified text asynchronously to a new file named "WriteTextAsync.txt".
        using (StreamWriter outputFile = new StreamWriter(Path.Combine(docPath, "WriteTextAsync.txt")))
        {
            await outputFile.WriteAsync("This is a sentence.");
        }
    }
}
// The example creates a file named "WriteTextAsync.txt" with the following contents:
// This is a sentence.
```

## Example: Write and append text with the File class

The following example shows how to write text to a new file and append new lines of text to the same file using the `System.IO.File` class. The `System.IO.File.WriteAllText*` and `System.IO.File.AppendAllLines*` methods open and close the file automatically. If the path you provide to the `System.IO.File.WriteAllText*` method already exists, the file is overwritten.

```csharp
﻿using System;
using System.IO;

class Program
{
    static void Main(string[] args)
    {
        // Create a string with a line of text.
        string text = "First line" + Environment.NewLine;

        // Set a variable to the Documents path.
        string docPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);

        // Write the text to a new file named "WriteFile.txt".
        File.WriteAllText(Path.Combine(docPath, "WriteFile.txt"), text);

        // Create a string array with the additional lines of text
        string[] lines = { "New line 1", "New line 2" };

        // Append new lines of text to the file
        File.AppendAllLines(Path.Combine(docPath, "WriteFile.txt"), lines);
    }
}
// The example creates a file named "WriteFile.txt" with the contents:
// First line
// And then appends the following contents:
// New line 1
// New line 2
```

## See also

- `System.IO.StreamWriter`
- `System.IO.Path`
- `System.IO.File.CreateText*`
- How to: Enumerate directories and files
- How to: Read and write to a newly created data file
- How to: Open and append to a log file
- How to: Read text from a file
- File and stream I/O
