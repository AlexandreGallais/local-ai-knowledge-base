---
title: "How to: Anticipate Out-of-Space Conditions with Isolated Storage"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/io/how-to-anticipate-out-of-space-conditions-with-isolated-storage.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Anticipate Out-of-Space Conditions with Isolated Storage

Code that uses isolated storage is constrained by a quota that specifies the maximum size for the data compartment in which isolated storage files and directories exist. The quota is defined by security policy and is configurable by administrators. If the maximum allowed size is exceeded when you try to write data, an `System.IO.IsolatedStorage.IsolatedStorageException` exception is thrown and the operation fails. This helps prevent malicious denial-of-service attacks that could cause the application to refuse requests because data storage is filled.

To help you determine whether a given write attempt is likely to fail for this reason, the `System.IO.IsolatedStorage.IsolatedStorage` class provides three read-only properties: `System.IO.IsolatedStorage.IsolatedStorage.AvailableFreeSpace*`, `System.IO.IsolatedStorage.IsolatedStorage.UsedSize`, and `System.IO.IsolatedStorage.IsolatedStorage.Quota*`. You can use these properties to determine whether writing to the store will cause the maximum allowed size of the store to be exceeded. Keep in mind that isolated storage can be accessed concurrently; therefore, when you compute the amount of remaining storage, the storage space could be consumed by the time you try to write to the store. However, you can use the maximum size of the store to help determine whether the upper limit on available storage is about to be reached.

The `System.IO.IsolatedStorage.IsolatedStorage.Quota` property depends on evidence from the assembly to work properly. For this reason, you should retrieve this property only on `System.IO.IsolatedStorage.IsolatedStorageFile` objects that were created by using the `System.IO.IsolatedStorage.IsolatedStorageFile.GetUserStoreForAssembly*`, `System.IO.IsolatedStorage.IsolatedStorageFile.GetUserStoreForDomain*`, or `System.IO.IsolatedStorage.IsolatedStorageFile.GetStore*` method. `System.IO.IsolatedStorage.IsolatedStorageFile` objects that were created in any other way (for example, objects that were returned from the `System.IO.IsolatedStorage.IsolatedStorageFile.GetEnumerator*` method) will not return an accurate maximum size.

## Example

The following code example obtains an isolated store, creates a few files, and retrieves the `System.IO.IsolatedStorage.IsolatedStorage.AvailableFreeSpace` property. The remaining space is reported in bytes.
```csharp
using System;
using System.IO;
using System.IO.IsolatedStorage;

public class CheckingSpace
{
    public static void Main()
    {
        // Get an isolated store for this assembly and put it into an
        // IsolatedStoreFile object.
        IsolatedStorageFile isoStore =  IsolatedStorageFile.GetStore(IsolatedStorageScope.User |
            IsolatedStorageScope.Assembly, null, null);

        // Create a few placeholder files in the isolated store.
        new IsolatedStorageFileStream("InTheRoot.txt", FileMode.Create, isoStore);
        new IsolatedStorageFileStream("Another.txt", FileMode.Create, isoStore);
        new IsolatedStorageFileStream("AThird.txt", FileMode.Create, isoStore);
        new IsolatedStorageFileStream("AFourth.txt", FileMode.Create, isoStore);
        new IsolatedStorageFileStream("AFifth.txt", FileMode.Create, isoStore);

        Console.WriteLine(isoStore.AvailableFreeSpace + " bytes of space remain in this isolated store.");
    } // End of Main.
}
```

## See also

- `System.IO.IsolatedStorage.IsolatedStorageFile`
- Isolated Storage
- How to: Obtain Stores for Isolated Storage
