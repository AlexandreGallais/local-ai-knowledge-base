---
title: "How to: Read and write to a newly created data file"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/how-to-read-and-write-to-a-newly-created-data-file.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Read and write to a newly created data file

The `System.IO.BinaryWriter` and `System.IO.BinaryReader` classes are used for writing and reading data other than character strings. The following example shows how to create an empty file stream, write data to it, and read data from it.

The example creates a data file called *Test.data* in the current directory, creates the associated `System.IO.BinaryWriter` and `System.IO.BinaryReader` objects, and uses the `System.IO.BinaryWriter` object to write the integers 0 through 10 to *Test.data*, which leaves the file pointer at the end of the file. The `System.IO.BinaryReader` object then sets the file pointer back to the origin and reads out the specified content.

> **Note:**
> If *Test.data* already exists in the current directory, an `System.IO.IOException` exception is thrown. Use the file mode option `System.IO.FileMode.Create` rather than `System.IO.FileMode.CreateNew` to always create a new file without throwing an exception.

## Example

 ```csharp
using System;
using System.IO;

class MyStream
{
    private const string FILE_NAME = "Test.data";

    public static void Main()
    {
        if (File.Exists(FILE_NAME))
        {
            Console.WriteLine($"{FILE_NAME} already exists!");
            return;
        }

        using (FileStream fs = new FileStream(FILE_NAME, FileMode.CreateNew))
        {
            using (BinaryWriter w = new BinaryWriter(fs))
            {
                for (int i = 0; i < 11; i++)
                {
                    w.Write(i);
                }
            }
        }

        using (FileStream fs = new FileStream(FILE_NAME, FileMode.Open, FileAccess.Read))
        {
            using (BinaryReader r = new BinaryReader(fs))
            {
                for (int i = 0; i < 11; i++)
                {
                    Console.WriteLine(r.ReadInt32());
                }
            }
        }
    }
}

// The example creates a file named "Test.data" and writes the integers 0 through 10 to it in binary format.
// It then writes the contents of Test.data to the console with each integer on a separate line.
```

## See also

- `System.IO.BinaryReader`
- `System.IO.BinaryWriter`
- `System.IO.FileStream`
- `System.IO.FileStream.Seek*`
- `System.IO.SeekOrigin`
- How to: Enumerate directories and files
- How to: Open and append to a log file
- How to: Read text from a file
- How to: Write text to a file
- How to: Read characters from a string
- How to: Write characters to a string
- File and stream I/O
