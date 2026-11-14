---
title: "How to: Compress and extract files"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/io/how-to-compress-and-extract-files.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Compress and extract files

The `System.IO.Compression` namespace contains the following classes for compressing and decompressing files and streams. You also can use these types to read and modify the contents of a compressed file:

- `System.IO.Compression.ZipFile`
- `System.IO.Compression.ZipArchive`
- `System.IO.Compression.ZipArchiveEntry`
- `System.IO.Compression.DeflateStream`
- `System.IO.Compression.GZipStream`

The following examples show some of the operations you can perform with compressed files. These examples require the following NuGet packages to be added to your project:

- System.IO.Compression
- System.IO.Compression.ZipFile

If you're using .NET Framework, add references to these two libraries to your project:

- `System.IO.Compression`
- `System.IO.Compression.FileSystem`

## Example 1: Create and extract a .zip file

The following example shows how to create and extract a compressed *.zip* file by using the `System.IO.Compression.ZipFile` class. The example compresses the contents of a folder into a new *.zip* file, and then extracts the file to a new folder.

To run the sample, create a *start* folder in your program folder and populate it with files to zip.

```csharp
using System;
using System.IO.Compression;

class Program
{
    static void Main(string[] args)
    {
        string startPath = @".\start";
        string zipPath = @".\result.zip";
        string extractPath = @".\extract";

        ZipFile.CreateFromDirectory(startPath, zipPath);

        ZipFile.ExtractToDirectory(zipPath, extractPath);
    }
}
```

## Example 2: Extract specific file extensions

The following example iterates through the contents of an existing *.zip* file and extracts files with a *.txt* extension. It uses the `System.IO.Compression.ZipArchive` class to access the *.zip* file, and the `System.IO.Compression.ZipArchiveEntry` class to inspect the individual entries. The extension method `System.IO.Compression.ZipFileExtensions.ExtractToFile*` for the `System.IO.Compression.ZipArchiveEntry` object is available in the `System.IO.Compression.ZipFileExtensions` class.

To run the sample, place a *.zip* file called *result.zip* in your program folder. When prompted, provide a folder name to extract to.

> **Important:**
> When unzipping files, you must look for malicious file paths, which can escape from the directory you unzip into. This is known as a path traversal attack. The following example demonstrates how to check for malicious file paths and provides a safe way to unzip.

```csharp
using System;
using System.IO;
using System.IO.Compression;

class Program
{
    static void Main(string[] args)
    {
        string zipPath = @".\result.zip";

        Console.WriteLine("Provide path where to extract the zip file:");
        string extractPath = Console.ReadLine();

        // Normalizes the path.
        extractPath = Path.GetFullPath(extractPath);

        // Ensures that the last character on the extraction path
        // is the directory separator char.
        // Without this, a malicious zip file could try to traverse outside of the expected
        // extraction path.
        if (!extractPath.EndsWith(Path.DirectorySeparatorChar.ToString(), StringComparison.Ordinal))
            extractPath += Path.DirectorySeparatorChar;

        using (ZipArchive archive = ZipFile.OpenRead(zipPath))
        {
            foreach (ZipArchiveEntry entry in archive.Entries)
            {
                if (entry.FullName.EndsWith(".txt", StringComparison.OrdinalIgnoreCase))
                {
                    // Gets the full path to ensure that relative segments are removed.
                    string destinationPath = Path.GetFullPath(Path.Combine(extractPath, entry.FullName));

                    // Ordinal match is safest, case-sensitive volumes can be mounted within volumes that
                    // are case-insensitive.
                    if (destinationPath.StartsWith(extractPath, StringComparison.Ordinal))
                        entry.ExtractToFile(destinationPath);
                }
            }
        }
    }
}
```

## Example 3: Add a file to an existing .zip file

The following example uses the `System.IO.Compression.ZipArchive` class to access an existing *.zip* file, and adds a file to it. The new file gets compressed when you add it to the existing *.zip* file.

```csharp
using System;
using System.IO;
using System.IO.Compression;

namespace ConsoleApplication
{
    class Program
    {
        static void Main(string[] args)
        {
            using (FileStream zipToOpen = new FileStream(@"c:\users\exampleuser\release.zip", FileMode.Open))
            {
                using (ZipArchive archive = new ZipArchive(zipToOpen, ZipArchiveMode.Update))
                {
                    ZipArchiveEntry readmeEntry = archive.CreateEntry("Readme.txt");
                    using (StreamWriter writer = new StreamWriter(readmeEntry.Open()))
                    {
                            writer.WriteLine("Information about this package.");
                            writer.WriteLine("========================");
                    }
                }
            }
        }
    }
}
```

## Example 4: Compress and decompress .gz files

You can also use the `System.IO.Compression.GZipStream` and `System.IO.Compression.DeflateStream` classes to compress and decompress data. They use the same compression algorithm. You can decompress `System.IO.Compression.GZipStream` objects that are written to a *.gz* file by using many common tools. The following example shows how to compress and decompress a directory of files by using the `System.IO.Compression.GZipStream` class:

```csharp
using System;
using System.IO;
using System.IO.Compression;

public class Program
{
    private static string directoryPath = @".\temp";
    public static void Main()
    {
        DirectoryInfo directorySelected = new DirectoryInfo(directoryPath);
        Compress(directorySelected);

        foreach (FileInfo fileToDecompress in directorySelected.GetFiles("*.gz"))
        {
            Decompress(fileToDecompress);
        }
    }

    public static void Compress(DirectoryInfo directorySelected)
    {
        foreach (FileInfo fileToCompress in directorySelected.GetFiles())
        {
            using (FileStream originalFileStream = fileToCompress.OpenRead())
            {
                if ((File.GetAttributes(fileToCompress.FullName) &
                   FileAttributes.Hidden) != FileAttributes.Hidden & fileToCompress.Extension != ".gz")
                {
                    using (FileStream compressedFileStream = File.Create(fileToCompress.FullName + ".gz"))
                    {
                        using (GZipStream compressionStream = new GZipStream(compressedFileStream,
                           CompressionMode.Compress))
                        {
                            originalFileStream.CopyTo(compressionStream);
                        }
                    }
                    FileInfo info = new FileInfo(directoryPath + Path.DirectorySeparatorChar + fileToCompress.Name + ".gz");
                    Console.WriteLine($"Compressed {fileToCompress.Name} from {fileToCompress.Length.ToString()} to {info.Length.ToString()} bytes.");
                }
            }
        }
    }

    public static void Decompress(FileInfo fileToDecompress)
    {
        using (FileStream originalFileStream = fileToDecompress.OpenRead())
        {
            string currentFileName = fileToDecompress.FullName;
            string newFileName = currentFileName.Remove(currentFileName.Length - fileToDecompress.Extension.Length);

            using (FileStream decompressedFileStream = File.Create(newFileName))
            {
                using (GZipStream decompressionStream = new GZipStream(originalFileStream, CompressionMode.Decompress))
                {
                    decompressionStream.CopyTo(decompressedFileStream);
                    Console.WriteLine($"Decompressed: {fileToDecompress.Name}");
                }
            }
        }
    }
}
```

## See also

- `System.IO.Compression.ZipArchive`
- `System.IO.Compression.ZipFile`
- `System.IO.Compression.ZipArchiveEntry`
- `System.IO.Compression.DeflateStream`
- `System.IO.Compression.GZipStream`
- File and stream I/O
