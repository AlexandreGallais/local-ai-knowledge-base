---
title: "How to: Delete Stores in Isolated Storage"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/io/how-to-delete-stores-in-isolated-storage.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Delete stores in isolated storage

The `System.IO.IsolatedStorage.IsolatedStorageFile` class supplies two methods for deleting isolated storage files:

- The instance method `System.IO.IsolatedStorage.IsolatedStorageFile.Remove` does not take any arguments and deletes the store that calls it. No permissions are required for this operation. Any code that can access the store can delete any or all the data inside it.

- The static method `System.IO.IsolatedStorage.IsolatedStorageFile.Remove(System.IO.IsolatedStorage.IsolatedStorageScope)` takes the `System.IO.IsolatedStorage.IsolatedStorageScope.User` enumeration value, and deletes all the stores for the user who is running the code. This operation requires `System.Security.Permissions.IsolatedStorageFilePermission` permission for the `System.Security.Permissions.IsolatedStorageContainment.AdministerIsolatedStorageByUser` value.

## Example

 The following code example demonstrates the use of the static and instance `System.IO.IsolatedStorage.IsolatedStorageFile.Remove*` methods. The class obtains two stores; one is isolated for user and assembly and the other is isolated for user, domain, and assembly. The user, domain, and assembly store is then deleted by calling the `System.IO.IsolatedStorage.IsolatedStorageFile.Remove` method of the isolated storage file  `isoStore1`. Then, all remaining stores for the user are deleted by calling the static method `System.IO.IsolatedStorage.IsolatedStorageFile.Remove(System.IO.IsolatedStorage.IsolatedStorageScope)`.
 ```csharp
using System;
using System.IO.IsolatedStorage;

public class DeletingStores
{
    public static void Main()
    {
        // Get a new isolated store for this user, domain, and assembly.
        // Put the store into an IsolatedStorageFile object.

        IsolatedStorageFile isoStore1 =  IsolatedStorageFile.GetStore(IsolatedStorageScope.User |
            IsolatedStorageScope.Domain | IsolatedStorageScope.Assembly, null, null);
        Console.WriteLine("A store isolated by user, assembly, and domain has been obtained.");

        // Get a new isolated store for user and assembly.
        // Put that store into a different IsolatedStorageFile object.

        IsolatedStorageFile isoStore2 = IsolatedStorageFile.GetStore(IsolatedStorageScope.User |
            IsolatedStorageScope.Assembly, null, null);
        Console.WriteLine("A store isolated by user and assembly has been obtained.");

        // The Remove method deletes a specific store, in this case the
        // isoStore1 file.

        isoStore1.Remove();
        Console.WriteLine("The user, domain, and assembly isolated store has been deleted.");

        // This static method deletes all the isolated stores for this user.

        IsolatedStorageFile.Remove(IsolatedStorageScope.User);
        Console.WriteLine("All isolated stores for this user have been deleted.");
    } // End of Main.
}
```

## See also

- `System.IO.IsolatedStorage.IsolatedStorageFile`
- Isolated Storage
