---
title: "How to: Obtain Stores for Isolated Storage"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/io/how-to-obtain-stores-for-isolated-storage.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Obtain stores for isolated storage

An isolated store exposes a virtual file system within a data compartment. The `System.IO.IsolatedStorage.IsolatedStorageFile` class supplies a number of methods for interacting with an isolated store. To create and retrieve stores, `System.IO.IsolatedStorage.IsolatedStorageFile` provides three static methods:

- `System.IO.IsolatedStorage.IsolatedStorageFile.GetUserStoreForAssembly*` returns storage that is isolated by user and assembly.

- `System.IO.IsolatedStorage.IsolatedStorageFile.GetUserStoreForDomain*` returns storage that is isolated by domain and assembly.

     Both methods retrieve a store that belongs to the code from which they are called.

- The static method `System.IO.IsolatedStorage.IsolatedStorageFile.GetStore*` returns an isolated store that is specified by passing in a combination of scope parameters.

 The following code returns a store that is isolated by user, assembly, and domain.
 ```csharp
using System;
using System.IO.IsolatedStorage;

public class ObtainingAStore
{
    public static void Main()
    {
        // Get a new isolated store for this assembly and put it into an
        // isolated store object.

        IsolatedStorageFile isoStore = IsolatedStorageFile.GetStore(IsolatedStorageScope.User |
            IsolatedStorageScope.Assembly, null, null);
    }
}

public class ObtainingAStoreWithDomain
{
    public static void Dummy()
    {
        IsolatedStorageFile isoStore = IsolatedStorageFile.GetStore(IsolatedStorageScope.User |
            IsolatedStorageScope.Assembly | IsolatedStorageScope.Domain, null, null);
    }
}
```

 You can use the `System.IO.IsolatedStorage.IsolatedStorageFile.GetStore*` method to specify that a store should roam with a roaming user profile. For details on how to set this up, see Types of Isolation.

 Isolated stores obtained from within different assemblies are, by default, different stores. You can access the store of a different assembly or domain by passing in the assembly or domain evidence in the parameters of the `System.IO.IsolatedStorage.IsolatedStorageFile.GetStore*` method. This requires permission to access isolated storage by application domain identity. For more information, see the `System.IO.IsolatedStorage.IsolatedStorageFile.GetStore*` method overloads.

 The `System.IO.IsolatedStorage.IsolatedStorageFile.GetUserStoreForAssembly*`, `System.IO.IsolatedStorage.IsolatedStorageFile.GetUserStoreForDomain*`, and `System.IO.IsolatedStorage.IsolatedStorageFile.GetStore*` methods return an `System.IO.IsolatedStorage.IsolatedStorageFile` object. To help you decide which isolation type is most appropriate for your situation, see Types of Isolation. When you have an isolated storage file object, you can use the isolated storage methods to read, write, create, and delete files and directories.

 There is no mechanism that prevents code from passing an `System.IO.IsolatedStorage.IsolatedStorageFile` object to code that does not have sufficient access to get the store itself. Domain and assembly identities and isolated storage permissions are checked only when a reference to an `System.IO.IsolatedStorage.IsolatedStorage` object is obtained, typically in the `System.IO.IsolatedStorage.IsolatedStorageFile.GetUserStoreForAssembly*`, `System.IO.IsolatedStorage.IsolatedStorageFile.GetUserStoreForDomain*`, or `System.IO.IsolatedStorage.IsolatedStorageFile.GetStore*` method. Protecting references to `System.IO.IsolatedStorage.IsolatedStorageFile` objects is, therefore, the responsibility of the code that uses these references.

## Example

 The following code provides a simple example of a class obtaining a store that is isolated by user and assembly. The code can be changed to retrieve a store that is isolated by user, domain, and assembly by adding `System.IO.IsolatedStorage.IsolatedStorageScope.Domain` to the arguments that the `System.IO.IsolatedStorage.IsolatedStorageFile.GetStore*` method passes.

 After you run the code, you can confirm that a store was created by typing **StoreAdm /LIST** at the command line. This runs the Isolated Storage tool (Storeadm.exe) and lists all the current isolated stores for the user.
 ```csharp
using System;
using System.IO.IsolatedStorage;

public class ObtainingAStore
{
    public static void Main()
    {
        // Get a new isolated store for this assembly and put it into an
        // isolated store object.

        IsolatedStorageFile isoStore = IsolatedStorageFile.GetStore(IsolatedStorageScope.User |
            IsolatedStorageScope.Assembly, null, null);
    }
}

public class ObtainingAStoreWithDomain
{
    public static void Dummy()
    {
        IsolatedStorageFile isoStore = IsolatedStorageFile.GetStore(IsolatedStorageScope.User |
            IsolatedStorageScope.Assembly | IsolatedStorageScope.Domain, null, null);
    }
}
```

## See also

- `System.IO.IsolatedStorage.IsolatedStorageFile`
- `System.IO.IsolatedStorage.IsolatedStorageScope`
- Isolated Storage
- Types of Isolation
- Assemblies in .NET
