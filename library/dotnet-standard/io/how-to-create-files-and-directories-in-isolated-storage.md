---
title: "How to: Create Files and Directories in Isolated Storage"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/how-to-create-files-and-directories-in-isolated-storage.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Create Files and Directories in Isolated Storage

After you've obtained an isolated store, you can create directories and files for storing data. Within a store, file and directory names are specified with respect to the root of the virtual file system.

 To create a directory, use the `System.IO.IsolatedStorage.IsolatedStorageFile.CreateDirectory*` instance method. If you specify a subdirectory of a directory that doesn't exist, both directories are created. If you specify a directory that already exists, the method returns without creating a directory, and no exception is thrown. However, if you specify a directory name that contains invalid characters, an `System.IO.IsolatedStorage.IsolatedStorageException` exception is thrown.

 To create a file, use  the `System.IO.IsolatedStorage.IsolatedStorageFile.CreateFile*` method.

 In the Windows operating system, isolated storage file and directory names are case-insensitive. That is, if you create a file named `ThisFile.txt`, and then create another file named `THISFILE.TXT`, only one file is created. The file name keeps its original casing for display purposes.

 Isolated storage file creation will throw an `System.IO.IsolatedStorage.IsolatedStorageException` if the path contains a directory that does not exist.

## Example

 The following code example illustrates how to create files and directories in an isolated store.

 ```csharp
using System;
using System.IO;
using System.IO.IsolatedStorage;

public class CreatingFilesDirectories
{
    public static void Main()
    {
        using (IsolatedStorageFile isoStore = IsolatedStorageFile.GetStore(IsolatedStorageScope.User | IsolatedStorageScope.Domain | IsolatedStorageScope.Assembly, null, null))
        {
            isoStore.CreateDirectory("TopLevelDirectory");
            isoStore.CreateDirectory("TopLevelDirectory/SecondLevel");
            isoStore.CreateDirectory("AnotherTopLevelDirectory/InsideDirectory");
            Console.WriteLine("Created directories.");

            isoStore.CreateFile("InTheRoot.txt");
            Console.WriteLine("Created a new file in the root.");

            isoStore.CreateFile("AnotherTopLevelDirectory/InsideDirectory/HereIAm.txt");
            Console.WriteLine("Created a new file in the InsideDirectory.");
        }
    }
}
```

## See also

- `System.IO.IsolatedStorage.IsolatedStorageFile`
- `System.IO.IsolatedStorage.IsolatedStorageFileStream`
- Isolated Storage
