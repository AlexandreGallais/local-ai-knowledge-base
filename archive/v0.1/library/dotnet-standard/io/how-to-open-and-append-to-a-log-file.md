---
title: "How to: Open and append to a log file"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/how-to-open-and-append-to-a-log-file.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Open and append to a log file

`System.IO.StreamWriter` and `System.IO.StreamReader` write characters to and read characters from streams. The following code example opens the *log.txt* file for input, or creates it if it doesn't exist, and appends log information to the end of the file. The example then writes the contents of the file to standard output for display.

As an alternative to this example, you could store the information as a single string or string array, and use the `System.IO.File.WriteAllText*` or `System.IO.File.WriteAllLines*` method to achieve the same functionality.

> **Note:**
> Visual Basic users may choose to use the methods and properties provided by the `Microsoft.VisualBasic.Logging.Log` class or `Microsoft.VisualBasic.FileIO.FileSystem` class for creating or writing to log files.

## Example

 ```csharp
using System;
using System.IO;

class DirAppend
{
    public static void Main()
    {
        using (StreamWriter w = File.AppendText("log.txt"))
        {
            Log("Test1", w);
            Log("Test2", w);
        }

        using (StreamReader r = File.OpenText("log.txt"))
        {
            DumpLog(r);
        }
    }

    public static void Log(string logMessage, TextWriter w)
    {
        w.Write("\r\nLog Entry : ");
        w.WriteLine($"{DateTime.Now.ToLongTimeString()} {DateTime.Now.ToLongDateString()}");
        w.WriteLine("  :");
        w.WriteLine($"  :{logMessage}");
        w.WriteLine ("-------------------------------");
    }

    public static void DumpLog(StreamReader r)
    {
        string line;
        while ((line = r.ReadLine()) != null)
        {
            Console.WriteLine(line);
        }
    }
}
// The example creates a file named "log.txt" and writes the following lines to it,
// or appends them to the existing "log.txt" file:

// Log Entry : <current long time string> <current long date string>
//  :
//  :Test1
// -------------------------------

// Log Entry : <current long time string> <current long date string>
//  :
//  :Test2
// -------------------------------

// It then writes the contents of "log.txt" to the console.
```

## See also

- `System.IO.StreamWriter`
- `System.IO.StreamReader`
- `System.IO.File.AppendText*`
- `System.IO.File.OpenText*`
- `System.IO.StreamReader.ReadLine*`
- How to: Enumerate directories and files
- How to: Read and write to a newly created data file
- How to: Read text from a file
- How to: Write text to a file
- How to: Read characters from a string
- How to: Write characters to a string
- File and stream I/O
