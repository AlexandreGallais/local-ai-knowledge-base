---
title: "Memory-Mapped Files"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/io/memory-mapped-files.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Memory-mapped files

A memory-mapped file contains the contents of a file in virtual memory. This mapping between a file and memory space enables an application, including multiple processes, to modify the file by reading and writing directly to the memory. You can use managed code to access memory-mapped files in the same way that native Windows functions access memory-mapped files, as described in Managing Memory-Mapped Files.

There are two types of memory-mapped files:

- Persisted memory-mapped files

     Persisted files are memory-mapped files that are associated with a source file on a disk. When the last process has finished working with the file, the data is saved to the source file on the disk. These memory-mapped files are suitable for working with extremely large source files.

- Non-persisted memory-mapped files

     Non-persisted files are memory-mapped files that are not associated with a file on a disk. When the last process has finished working with the file, the data is lost and the file is reclaimed by garbage collection. These files are suitable for creating shared memory for inter-process communications (IPC).

## Processes, Views, and Managing Memory

 Memory-mapped files can be shared across multiple processes. Processes can map to the same memory-mapped file by using a common name that is assigned by the process that created the file.

 To work with a memory-mapped file, you must create a view of the entire memory-mapped file or a part of it. You can also create multiple views to the same part of the memory-mapped file, thereby creating concurrent memory. For two views to remain concurrent, they have to be created from the same memory-mapped file.

 Multiple views may also be necessary if the file is greater than the size of the application's logical memory space available for memory mapping (2 GB on a 32-bit computer).

 There are two types of views: stream access view and random access view. Use stream access views for sequential access to a file; this is recommended for non-persisted files and IPC. Random access views are preferred for working with persisted files.

 Memory-mapped files are accessed through the operating system's memory manager, so the file is automatically partitioned into a number of pages and accessed as needed. You do not have to handle the memory management yourself.

 The following illustration shows how multiple processes can have multiple and overlapping views to the same memory-mapped file at the same time.

 The following image shows multiple and overlapped views to a memory-mapped file:

## Programming with Memory-Mapped Files

 The following table provides a guide for using memory-mapped file objects and their members.

|Task|Methods or properties to use|
|----------|----------------------------------|
|To obtain a `System.IO.MemoryMappedFiles.MemoryMappedFile` object that represents a persisted memory-mapped file from a file on disk.|`System.IO.MemoryMappedFiles.MemoryMappedFile.CreateFromFile*` method.|
|To obtain a `System.IO.MemoryMappedFiles.MemoryMappedFile` object that represents a non-persisted memory-mapped file (not associated with a file on disk).|`System.IO.MemoryMappedFiles.MemoryMappedFile.CreateNew*` method. - or - `System.IO.MemoryMappedFiles.MemoryMappedFile.CreateOrOpen*` method.|
|To obtain a `System.IO.MemoryMappedFiles.MemoryMappedFile` object of an existing memory-mapped file (either persisted or non-persisted).|`System.IO.MemoryMappedFiles.MemoryMappedFile.OpenExisting*` method.|
|To obtain a `System.IO.UnmanagedMemoryStream` object for a sequentially accessed view to the memory-mapped file.|`System.IO.MemoryMappedFiles.MemoryMappedFile.CreateViewStream*` method.|
|To obtain a `System.IO.UnmanagedMemoryAccessor` object for a random access view to a memory-mapped file.|`System.IO.MemoryMappedFiles.MemoryMappedFile.CreateViewAccessor*` method.|
|To obtain a `Microsoft.Win32.SafeHandles.SafeMemoryMappedViewHandle` object to use with unmanaged code.|`System.IO.MemoryMappedFiles.MemoryMappedFile.SafeMemoryMappedFileHandle` property. - or - `System.IO.MemoryMappedFiles.MemoryMappedViewAccessor.SafeMemoryMappedViewHandle` property. - or - `System.IO.MemoryMappedFiles.MemoryMappedViewStream.SafeMemoryMappedViewHandle` property.|
|To delay allocating memory until a view is created (non-persisted files only). (To determine the current system page size, use the `System.Environment.SystemPageSize` property.)|`System.IO.MemoryMappedFiles.MemoryMappedFile.CreateNew*` method with the `System.IO.MemoryMappedFiles.MemoryMappedFileOptions.DelayAllocatePages` value. - or - `System.IO.MemoryMappedFiles.MemoryMappedFile.CreateOrOpen*` methods that have a `System.IO.MemoryMappedFiles.MemoryMappedFileOptions` enumeration as a parameter.|

### Security

 You can apply access rights when you create a memory-mapped file, by using the following methods that take a `System.IO.MemoryMappedFiles.MemoryMappedFileAccess` enumeration as a parameter:

- `System.IO.MemoryMappedFiles.MemoryMappedFile.CreateFromFile*`

- `System.IO.MemoryMappedFiles.MemoryMappedFile.CreateNew*`

- `System.IO.MemoryMappedFiles.MemoryMappedFile.CreateOrOpen*`

 You can specify access rights for opening an existing memory-mapped file by using the `System.IO.MemoryMappedFiles.MemoryMappedFile.OpenExisting*` methods that take an `System.IO.MemoryMappedFiles.MemoryMappedFileRights` as a parameter.

 In addition, you can include a `System.IO.MemoryMappedFiles.MemoryMappedFileSecurity` object that contains predefined access rules.

 To apply new or changed access rules to a memory-mapped file, use the `System.IO.MemoryMappedFiles.MemoryMappedFile.SetAccessControl*` method. To retrieve access or audit rules from an existing file, use the `System.IO.MemoryMappedFiles.MemoryMappedFile.GetAccessControl*` method.

## Examples

### Persisted Memory-Mapped Files

 The `System.IO.MemoryMappedFiles.MemoryMappedFile.CreateFromFile*` methods create a memory-mapped file from an existing file on disk.

 The following example creates a memory-mapped view of a part of an extremely large file and manipulates a portion of it.

 ```csharp
using System;
using System.IO;
using System.IO.MemoryMappedFiles;
using System.Runtime.InteropServices;

class Program
{
    static void Main(string[] args)
    {
        long offset = 0x10000000; // 256 megabytes
        long length = 0x20000000; // 512 megabytes

        // Create the memory-mapped file.
        using (var mmf = MemoryMappedFile.CreateFromFile(@"c:\ExtremelyLargeImage.data", FileMode.Open,"ImgA"))
        {
            // Create a random access view, from the 256th megabyte (the offset)
            // to the 768th megabyte (the offset plus length).
            using (var accessor = mmf.CreateViewAccessor(offset, length))
            {
                int colorSize = Marshal.SizeOf(typeof(MyColor));
                MyColor color;

                // Make changes to the view.
                for (long i = 0; i < length; i += colorSize)
                {
                    accessor.Read(i, out color);
                    color.Brighten(10);
                    accessor.Write(i, ref color);
                }
            }
        }
    }
}

public struct MyColor
{
    public short Red;
    public short Green;
    public short Blue;
    public short Alpha;

    // Make the view brighter.
    public void Brighten(short value)
    {
        Red = (short)Math.Min(short.MaxValue, (int)Red + value);
        Green = (short)Math.Min(short.MaxValue, (int)Green + value);
        Blue = (short)Math.Min(short.MaxValue, (int)Blue + value);
        Alpha = (short)Math.Min(short.MaxValue, (int)Alpha + value);
    }
}
```

 The following example opens the same memory-mapped file for another process.

 ```csharp
using System;
using System.IO.MemoryMappedFiles;
using System.Runtime.InteropServices;

class Program
{
    static void Main(string[] args)
    {
        // Assumes another process has created the memory-mapped file.
        using (var mmf = MemoryMappedFile.OpenExisting("ImgA"))
        {
            using (var accessor = mmf.CreateViewAccessor(4000000, 2000000))
            {
                int colorSize = Marshal.SizeOf(typeof(MyColor));
                MyColor color;

                // Make changes to the view.
                for (long i = 0; i < 1500000; i += colorSize)
                {
                    accessor.Read(i, out color);
                    color.Brighten(20);
                    accessor.Write(i, ref color);
                }
            }
        }
    }
}

public struct MyColor
{
    public short Red;
    public short Green;
    public short Blue;
    public short Alpha;

    // Make the view brigher.
    public void Brighten(short value)
    {
        Red = (short)Math.Min(short.MaxValue, (int)Red + value);
        Green = (short)Math.Min(short.MaxValue, (int)Green + value);
        Blue = (short)Math.Min(short.MaxValue, (int)Blue + value);
        Alpha = (short)Math.Min(short.MaxValue, (int)Alpha + value);
    }
}
```

### Non-Persisted Memory-Mapped Files

 The `System.IO.MemoryMappedFiles.MemoryMappedFile.CreateNew*` and `System.IO.MemoryMappedFiles.MemoryMappedFile.CreateOrOpen*` methods create a memory-mapped file that is not mapped to an existing file on disk.

 The following example consists of three separate processes (console applications) that write Boolean values to a memory-mapped file. The following sequence of actions occur:

1. `Process A` creates the memory-mapped file and writes a value to it.

2. `Process B` opens the memory-mapped file and writes a value to it.

3. `Process C` opens the memory-mapped file and writes a value to it.

4. `Process A` reads and displays the values from the memory-mapped file.

5. After `Process A` is finished with the memory-mapped file, the file is immediately reclaimed by garbage collection.

 To run this example, do the following:

1. Compile the applications and open three Command Prompt windows.

2. In the first Command Prompt window, run `Process A`.

3. In the second Command Prompt window, run `Process B`.

4. Return to `Process A` and press ENTER.

5. In the third Command Prompt window, run `Process C`.

6. Return to `Process A` and press ENTER.

 The output of `Process A` is as follows:

```console
Start Process B and press ENTER to continue.
Start Process C and press ENTER to continue.
Process A says: True
Process B says: False
Process C says: True
```

 **Process A**

 ```csharp
using System;
using System.IO;
using System.IO.MemoryMappedFiles;
using System.Threading;

class Program
{
    // Process A:
    static void Main(string[] args)
    {
        using (MemoryMappedFile mmf = MemoryMappedFile.CreateNew("testmap", 10000))
        {
            bool mutexCreated;
            Mutex mutex = new Mutex(true, "testmapmutex", out mutexCreated);
            using (MemoryMappedViewStream stream = mmf.CreateViewStream())
            {
                BinaryWriter writer = new BinaryWriter(stream);
                writer.Write(1);
            }
            mutex.ReleaseMutex();

            Console.WriteLine("Start Process B and press ENTER to continue.");
            Console.ReadLine();

            Console.WriteLine("Start Process C and press ENTER to continue.");
            Console.ReadLine();

            mutex.WaitOne();
            using (MemoryMappedViewStream stream = mmf.CreateViewStream())
            {
                BinaryReader reader = new BinaryReader(stream);
                Console.WriteLine($"Process A says: {reader.ReadBoolean()}");
                Console.WriteLine($"Process B says: {reader.ReadBoolean()}");
                Console.WriteLine($"Process C says: {reader.ReadBoolean()}");
            }
            mutex.ReleaseMutex();
        }
    }
}
```

 **Process B**

 ```csharp
using System;
using System.IO;
using System.IO.MemoryMappedFiles;
using System.Threading;

class Program
{
    // Process B:
    static void Main(string[] args)
    {
        try
        {
            using (MemoryMappedFile mmf = MemoryMappedFile.OpenExisting("testmap"))
            {

                Mutex mutex = Mutex.OpenExisting("testmapmutex");
                mutex.WaitOne();

                using (MemoryMappedViewStream stream = mmf.CreateViewStream(1, 0))
                {
                    BinaryWriter writer = new BinaryWriter(stream);
                    writer.Write(0);
                }
                mutex.ReleaseMutex();
            }
        }
        catch (FileNotFoundException)
        {
            Console.WriteLine("Memory-mapped file does not exist. Run Process A first.");
        }
    }
}
```

 **Process C**

 ```csharp
using System;
using System.IO;
using System.IO.MemoryMappedFiles;
using System.Threading;

class Program
{
    // Process C:
    static void Main(string[] args)
    {
        try
        {
            using (MemoryMappedFile mmf = MemoryMappedFile.OpenExisting("testmap"))
            {

                Mutex mutex = Mutex.OpenExisting("testmapmutex");
                mutex.WaitOne();

                using (MemoryMappedViewStream stream = mmf.CreateViewStream(2, 0))
                {
                    BinaryWriter writer = new BinaryWriter(stream);
                    writer.Write(1);
                }
                mutex.ReleaseMutex();
            }
        }
        catch (FileNotFoundException)
        {
            Console.WriteLine("Memory-mapped file does not exist. Run Process A first, then B.");
        }
    }
}
```

## See also

- File and Stream I/O
