---
title: "How to: Delete Files and Directories in Isolated Storage"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/how-to-delete-files-and-directories-in-isolated-storage.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Delete Files and Directories in Isolated Storage

You can delete directories and files within an isolated storage file. Within a store, file and directory names are operating-system dependent and are specified as relative to the root of the virtual file system. They are not case-sensitive on Windows operating systems.

 The `System.IO.IsolatedStorage.IsolatedStorageFile` class supplies two methods for deleting directories and files: `System.IO.IsolatedStorage.IsolatedStorageFile.DeleteDirectory*` and `System.IO.IsolatedStorage.IsolatedStorageFile.DeleteFile*`. An `System.IO.IsolatedStorage.IsolatedStorageException` exception is thrown if you try to delete a file or directory that does not exist. If you include a wildcard character in the name, `System.IO.IsolatedStorage.IsolatedStorageFile.DeleteDirectory*` throws an `System.IO.IsolatedStorage.IsolatedStorageException` exception, and `System.IO.IsolatedStorage.IsolatedStorageFile.DeleteFile*` throws an `System.ArgumentException` exception.

 The `System.IO.IsolatedStorage.IsolatedStorageFile.DeleteDirectory*` method fails if the directory contains any files or subdirectories. You can use the `System.IO.IsolatedStorage.IsolatedStorageFile.GetFileNames*` and `System.IO.IsolatedStorage.IsolatedStorageFile.GetDirectoryNames*` methods to retrieve the existing files and directories. For more information about searching the virtual file system of a store, see How to: Find Existing Files and Directories in Isolated Storage.

## Example

 The following code example creates and then deletes several directories and files.
 ```csharp
using System;
using System.IO.IsolatedStorage;
using System.IO;

public class DeletingFilesDirectories
{
    public static void Main()
    {
        // Get a new isolated store for this user domain and assembly.
        // Put the store into an isolatedStorageFile object.

        IsolatedStorageFile isoStore =  IsolatedStorageFile.GetStore(IsolatedStorageScope.User |
            IsolatedStorageScope.Domain | IsolatedStorageScope.Assembly, null, null);

        Console.WriteLine("Creating Directories:");

        // This code creates several different directories.

        isoStore.CreateDirectory("TopLevelDirectory");
        Console.WriteLine("TopLevelDirectory");
        isoStore.CreateDirectory("TopLevelDirectory/SecondLevel");
        Console.WriteLine("TopLevelDirectory/SecondLevel");

        // This code creates two new directories, one inside the other.

        isoStore.CreateDirectory("AnotherTopLevelDirectory/InsideDirectory");
        Console.WriteLine("AnotherTopLevelDirectory/InsideDirectory");
        Console.WriteLine();

        // This code creates a few files and places them in the directories.

        Console.WriteLine("Creating Files:");

        // This file is placed in the root.

        IsolatedStorageFileStream isoStream1 = new IsolatedStorageFileStream("InTheRoot.txt",
            FileMode.Create, isoStore);
        Console.WriteLine("InTheRoot.txt");

        isoStream1.Close();

        // This file is placed in the InsideDirectory.

        IsolatedStorageFileStream isoStream2 = new IsolatedStorageFileStream(
            "AnotherTopLevelDirectory/InsideDirectory/HereIAm.txt", FileMode.Create, isoStore);
        Console.WriteLine("AnotherTopLevelDirectory/InsideDirectory/HereIAm.txt");
        Console.WriteLine();

        isoStream2.Close();

        Console.WriteLine("Deleting File:");

        // This code deletes the HereIAm.txt file.
        isoStore.DeleteFile("AnotherTopLevelDirectory/InsideDirectory/HereIAm.txt");
        Console.WriteLine("AnotherTopLevelDirectory/InsideDirectory/HereIAm.txt");
        Console.WriteLine();

        Console.WriteLine("Deleting Directory:");

        // This code deletes the InsideDirectory.

        isoStore.DeleteDirectory("AnotherTopLevelDirectory/InsideDirectory/");
        Console.WriteLine("AnotherTopLevelDirectory/InsideDirectory/");
        Console.WriteLine();
    } // End of main.
}
```

## See also

- `System.IO.IsolatedStorage.IsolatedStorageFile`
- Isolated Storage
