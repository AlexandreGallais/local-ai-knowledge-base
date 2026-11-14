---
title: "How to: Find Existing Files and Directories in Isolated Storage"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/io/how-to-find-existing-files-and-directories-in-isolated-storage.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Find existing files and directories in isolated storage

To search for a directory in isolated storage, use the `System.IO.IsolatedStorage.IsolatedStorageFile.GetDirectoryNames*` method. This method takes a string that represents a search pattern. You can use both single-character (?) and multi-character (\*) wildcard characters in the search pattern, but the wildcard characters must appear in the final portion of the name. For example, `directory1/*ect*` is a valid search string, but `*ect*/directory2` is not.

 To search for a file, use the `System.IO.IsolatedStorage.IsolatedStorageFile.GetFileNames*` method. The restriction for wildcard characters in search strings that applies to `System.IO.IsolatedStorage.IsolatedStorageFile.GetDirectoryNames*` also applies to `System.IO.IsolatedStorage.IsolatedStorageFile.GetFileNames*`.

 Neither of these methods is recursive; the `System.IO.IsolatedStorage.IsolatedStorageFile` class does not supply any methods for listing all directories or files in your store. However, recursive methods are shown in the following code example.

## Example

 The following code example illustrates how to create files and directories in an isolated store. First, a store that is isolated for user, domain, and assembly is retrieved and placed in the `isoStore` variable. The `System.IO.IsolatedStorage.IsolatedStorageFile.CreateDirectory*` method is used to set up a few different directories, and the `System.IO.IsolatedStorage.IsolatedStorageFileStream.#ctor(System.String,System.IO.FileMode,System.IO.IsolatedStorage.IsolatedStorageFile)` constructor creates some files in these directories. The code then loops through the results of the `GetAllDirectories` method. This method uses `System.IO.IsolatedStorage.IsolatedStorageFile.GetDirectoryNames*` to find all the directory names in the current directory. These names are stored in an array, and then `GetAllDirectories` calls itself, passing in each directory it has found. As a result, all the directory names are returned in an array. Next, the code calls the `GetAllFiles` method. This method calls `GetAllDirectories` to find out the names of all the directories, and then it checks each directory for files by using the `System.IO.IsolatedStorage.IsolatedStorageFile.GetFileNames*` method. The result is returned in an array for display.
 ```csharp
using System;
using System.IO;
using System.IO.IsolatedStorage;
using System.Collections;
using System.Collections.Generic;

public class FindingExistingFilesAndDirectories
{
    // Retrieves an array of all directories in the store, and
    // displays the results.
    public static void Main()
    {
        // This part of the code sets up a few directories and files in the
        // store.
        IsolatedStorageFile isoStore = IsolatedStorageFile.GetStore(IsolatedStorageScope.User |
            IsolatedStorageScope.Assembly, null, null);
        isoStore.CreateDirectory("TopLevelDirectory");
        isoStore.CreateDirectory("TopLevelDirectory/SecondLevel");
        isoStore.CreateDirectory("AnotherTopLevelDirectory/InsideDirectory");
        isoStore.CreateFile("InTheRoot.txt");
        isoStore.CreateFile("AnotherTopLevelDirectory/InsideDirectory/HereIAm.txt");
        // End of setup.

        Console.WriteLine('\r');
        Console.WriteLine("Here is a list of all directories in this isolated store:");

        foreach (string directory in GetAllDirectories("*", isoStore))
        {
            Console.WriteLine(directory);
        }
        Console.WriteLine('\r');

        // Retrieve all the files in the directory by calling the GetFiles
        // method.

        Console.WriteLine("Here is a list of all the files in this isolated store:");
        foreach (string file in GetAllFiles("*", isoStore)){
            Console.WriteLine(file);
        }
    } // End of Main.

    // Method to retrieve all directories, recursively, within a store.
    public static List<String> GetAllDirectories(string pattern, IsolatedStorageFile storeFile)
    {
        // Get the root of the search string.
        string root = Path.GetDirectoryName(pattern);

        if (root != "")
        {
            root += "/";
        }

        // Retrieve directories.
        List<String> directoryList = new List<String>(storeFile.GetDirectoryNames(pattern));

        // Retrieve subdirectories of matches.
        for (int i = 0, max = directoryList.Count; i < max; i++)
        {
            string directory = directoryList[i] + "/";
            List<String> more = GetAllDirectories(root + directory + "*", storeFile);

            // For each subdirectory found, add in the base path.
            for (int j = 0; j < more.Count; j++)
            {
                more[j] = directory + more[j];
            }

            // Insert the subdirectories into the list and
            // update the counter and upper bound.
            directoryList.InsertRange(i + 1, more);
            i += more.Count;
            max += more.Count;
        }

        return directoryList;
    }

    public static List<String> GetAllFiles(string pattern, IsolatedStorageFile storeFile)
    {
        // Get the root and file portions of the search string.
        string fileString = Path.GetFileName(pattern);

        List<String> fileList = new List<String>(storeFile.GetFileNames(pattern));

        // Loop through the subdirectories, collect matches,
        // and make separators consistent.
        foreach (string directory in GetAllDirectories("*", storeFile))
        {
            foreach (string file in storeFile.GetFileNames(directory + "/" + fileString))
            {
                fileList.Add((directory + "/" + file));
            }
        }

        return fileList;
    } // End of GetFiles.
}
```

## See also

- `System.IO.IsolatedStorage.IsolatedStorageFile`
- Isolated Storage
