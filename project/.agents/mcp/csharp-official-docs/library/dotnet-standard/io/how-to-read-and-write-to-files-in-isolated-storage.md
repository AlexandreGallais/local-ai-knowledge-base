---
title: "How to: Read and Write to Files in Isolated Storage"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/io/how-to-read-and-write-to-files-in-isolated-storage.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Read and Write to Files in Isolated Storage

To read from, or write to, a file in an isolated store, use an `System.IO.IsolatedStorage.IsolatedStorageFileStream` object with a stream reader (`System.IO.StreamReader` object) or stream writer (`System.IO.StreamWriter` object).

## Example

 The following code example obtains an isolated store and checks whether a file named TestStore.txt exists in the store. If it doesn't exist, it creates the file and writes "Hello Isolated Storage" to the file. If TestStore.txt already exists, the example code reads from the file.

 ```csharp
using System;
using System.IO;
using System.IO.IsolatedStorage;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            IsolatedStorageFile isoStore = IsolatedStorageFile.GetStore(IsolatedStorageScope.User | IsolatedStorageScope.Assembly, null, null);

            if (isoStore.FileExists("TestStore.txt"))
            {
                Console.WriteLine("The file already exists!");
                using (IsolatedStorageFileStream isoStream = new IsolatedStorageFileStream("TestStore.txt", FileMode.Open, isoStore))
                {
                    using (StreamReader reader = new StreamReader(isoStream))
                    {
                        Console.WriteLine("Reading contents:");
                        Console.WriteLine(reader.ReadToEnd());
                    }
                }
            }
            else
            {
                using (IsolatedStorageFileStream isoStream = new IsolatedStorageFileStream("TestStore.txt", FileMode.CreateNew, isoStore))
                {
                    using (StreamWriter writer = new StreamWriter(isoStream))
                    {
                        writer.WriteLine("Hello Isolated Storage");
                        Console.WriteLine("You have written to the file.");
                    }
                }
            }
        }
    }
}
```

## See also

- `System.IO.IsolatedStorage.IsolatedStorageFile`
- `System.IO.IsolatedStorage.IsolatedStorageFileStream`
- `System.IO.FileMode`
- `System.IO.FileAccess`
- `System.IO.StreamReader`
- `System.IO.StreamWriter`
- File and Stream I/O
- Isolated Storage
