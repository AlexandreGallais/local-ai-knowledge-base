---
title: "How to: Enumerate Stores for Isolated Storage"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/how-to-enumerate-stores-for-isolated-storage.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Enumerate Stores for Isolated Storage

You can enumerate all isolated stores for the current user by using the  `System.IO.IsolatedStorage.IsolatedStorageFile.GetEnumerator*` static method. This  method takes an `System.IO.IsolatedStorage.IsolatedStorageScope` value and returns an `System.IO.IsolatedStorage.IsolatedStorageFile` enumerator. To enumerate stores, you must have the `System.Security.Permissions.IsolatedStorageFilePermission` permission that specifies the `System.Security.Permissions.IsolatedStorageContainment.AdministerIsolatedStorageByUser` value. If you call the `System.IO.IsolatedStorage.IsolatedStorageFile.GetEnumerator*` method with the `System.IO.IsolatedStorage.IsolatedStorageScope.User` value, it returns an array of `System.IO.IsolatedStorage.IsolatedStorageFile` objects that are defined for the current user.

## Example

 The following code example obtains a store that is isolated by user and assembly, creates a few files, and retrieves those files by using the `System.IO.IsolatedStorage.IsolatedStorageFile.GetEnumerator*` method.

 ```csharp
using System;
using System.IO;
using System.IO.IsolatedStorage;
using System.Collections;

public class EnumeratingStores
{
    public static void Main()
    {
        using (IsolatedStorageFile isoStore = IsolatedStorageFile.GetStore(IsolatedStorageScope.User | IsolatedStorageScope.Assembly, null, null))
        {
            isoStore.CreateFile("TestFileA.Txt");
            isoStore.CreateFile("TestFileB.Txt");
            isoStore.CreateFile("TestFileC.Txt");
            isoStore.CreateFile("TestFileD.Txt");
        }

        IEnumerator allFiles = IsolatedStorageFile.GetEnumerator(IsolatedStorageScope.User);
        long totalsize = 0;

        while (allFiles.MoveNext())
        {
            IsolatedStorageFile storeFile = (IsolatedStorageFile)allFiles.Current;
            totalsize += (long)storeFile.UsedSize;
        }

        Console.WriteLine("The total size = " + totalsize);
    }
}
```

## See also

- `System.IO.IsolatedStorage.IsolatedStorageFile`
- Isolated Storage
