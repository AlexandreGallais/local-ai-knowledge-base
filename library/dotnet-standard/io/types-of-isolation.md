---
title: "Types of Isolation"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/types-of-isolation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Types of isolation

Access to isolated storage is always restricted to the user who created it. To implement this type of isolation, the common language runtime uses the same notion of user identity that the operating system recognizes, which is the identity associated with the process in which the code is running when the store is opened. This identity is an authenticated user identity, but impersonation can cause the identity of the current user to change dynamically.

 Access to isolated storage is also restricted according to the identity associated with the application's domain and assembly, or with the assembly alone. The runtime obtains these identities in the following ways:

- Domain identity represents the evidence of the application, which in the case of a web application might be the full URL. For shell-hosted code, the domain identity might be based on the application directory path. For example, if the executable runs from the path C:\Office\MyApp.exe, the domain identity would be C:\Office\MyApp.exe.

- Assembly identity is the evidence of the assembly. This might come from a cryptographic digital signature, which can be the assembly's strong name, the software publisher of the assembly, or its URL identity. If an assembly has both a strong name and a software publisher identity, then the software publisher identity is used. If the assembly comes from the Internet and is unsigned, the URL identity is used. For more information about assemblies and strong names, see Programming with Assemblies.

- Roaming stores move with a user that has a roaming user profile. Files are written to a network directory and are downloaded to any computer the user logs into. For more information about roaming user profiles, see `System.IO.IsolatedStorage.IsolatedStorageScope.Roaming`.

 By combining the concepts of user, domain, and assembly identity, isolated storage can isolate data in the following ways, each of which has its own usage scenarios:

- Isolation by user and assembly

- Isolation by user, domain, and assembly

 Either of these isolations can be combined with a roaming user profile. For more information, see the section Isolated Storage and Roaming.

 The following illustration demonstrates how stores are isolated in different scopes:

 Except for roaming stores, isolated storage is always implicitly isolated by computer because it uses the storage facilities that are local to a given computer.

> **Important:**
> Isolated storage is not available for Windows 8.x Store apps. Instead, use the application data classes in the `Windows.Storage` namespaces included in the Windows Runtime API to store local data and files. For more information, see Application data in the Windows Dev Center.

## Isolation by User and Assembly

 When the assembly that uses the data store needs to be accessible from any application's domain, isolation by user and assembly is appropriate. Typically, in this situation, isolated storage is used to store data that applies across multiple applications and is not tied to any particular application, such as the user's name or license information. To access storage isolated by user and assembly, code must be trusted to transfer information between applications. Typically, isolation by user and assembly is allowed on intranets but not on the Internet. Calling the static `System.IO.IsolatedStorage.IsolatedStorageFile.GetStore*` method and passing in a user and an assembly `System.IO.IsolatedStorage.IsolatedStorageScope` returns storage with this kind of isolation.

 The following code example retrieves a store that is isolated by user and assembly. The store can be accessed through the `isoFile` object.
 ```csharp
using System;
using System.IO.IsolatedStorage;

class UserAssembly_IsoStorage
{
    public static void Main()
    {
        SnippetA();
        SnippetB();
    }

    public static void SnippetA()
    {
        IsolatedStorageFile isoFile =
            IsolatedStorageFile.GetStore(IsolatedStorageScope.User |
            IsolatedStorageScope.Assembly, null, null);
    }

    public static void SnippetB()
    {
        IsolatedStorageFile isoFile = IsolatedStorageFile.GetUserStoreForAssembly();
    }
}
```

 For an example that uses the evidence parameters, see `System.IO.IsolatedStorage.IsolatedStorageFile.GetStore(System.IO.IsolatedStorage.IsolatedStorageScope,System.Security.Policy.Evidence,System.Type,System.Security.Policy.Evidence,System.Type)`.

 The `System.IO.IsolatedStorage.IsolatedStorageFile.GetUserStoreForAssembly*` method is available as a shortcut, as shown in the following code example. This shortcut cannot be used to open stores that are capable of roaming; use `System.IO.IsolatedStorage.IsolatedStorageFile.GetStore*` in such cases.
 ```csharp
using System;
using System.IO.IsolatedStorage;

class UserAssembly_IsoStorage
{
    public static void Main()
    {
        SnippetA();
        SnippetB();
    }

    public static void SnippetA()
    {
        IsolatedStorageFile isoFile =
            IsolatedStorageFile.GetStore(IsolatedStorageScope.User |
            IsolatedStorageScope.Assembly, null, null);
    }

    public static void SnippetB()
    {
        IsolatedStorageFile isoFile = IsolatedStorageFile.GetUserStoreForAssembly();
    }
}
```

## Isolation by User, Domain, and Assembly

 If your application uses a third-party assembly that requires a private data store, you can use isolated storage to store the private data. Isolation by user, domain, and assembly ensures that only code in a given assembly can access the data, and only when the assembly is used by the application that was running when the assembly created the store, and only when the user for whom the store was created runs the application. Isolation by user, domain, and assembly keeps the third-party assembly from leaking data to other applications. This isolation type should be your default choice if you know that you want to use isolated storage but are not sure which type of isolation to use. Calling the static `System.IO.IsolatedStorage.IsolatedStorageFile.GetStore*` method of `System.IO.IsolatedStorage.IsolatedStorageFile` and passing in a user, domain, and assembly `System.IO.IsolatedStorage.IsolatedStorageScope` returns storage with this kind of isolation.

 The following code example retrieves a store isolated by user, domain, and assembly. The store can be accessed through the `isoFile` object.
 ```csharp
using System;
using System.IO.IsolatedStorage;

class UserDomainAssembly_IsoStorage
{
    public static void Main()
    {
        SnippetA();
        SnippetB();
    }

    public static void SnippetA()
    {
        IsolatedStorageFile isoFile =
            IsolatedStorageFile.GetStore(IsolatedStorageScope.User |
                IsolatedStorageScope.Domain |
                IsolatedStorageScope.Assembly, null, null);
    }

    public static void SnippetB()
    {
        IsolatedStorageFile isoFile = IsolatedStorageFile.GetUserStoreForDomain();
    }
}
```

 Another method is available as a shortcut, as shown in the following code example. This shortcut cannot be used to open stores that are capable of roaming; use `System.IO.IsolatedStorage.IsolatedStorageFile.GetStore*` in such cases.
 ```csharp
using System;
using System.IO.IsolatedStorage;

class UserDomainAssembly_IsoStorage
{
    public static void Main()
    {
        SnippetA();
        SnippetB();
    }

    public static void SnippetA()
    {
        IsolatedStorageFile isoFile =
            IsolatedStorageFile.GetStore(IsolatedStorageScope.User |
                IsolatedStorageScope.Domain |
                IsolatedStorageScope.Assembly, null, null);
    }

    public static void SnippetB()
    {
        IsolatedStorageFile isoFile = IsolatedStorageFile.GetUserStoreForDomain();
    }
}
```

## Isolated Storage and Roaming

 Roaming user profiles are a Windows feature that enables a user to set up an identity on a network and use that identity to log into any network computer, carrying over all personalized settings. An assembly that uses isolated storage can specify that the user's isolated storage should move with the roaming user profile. Roaming can be used in conjunction with isolation by user and assembly or with isolation by user, domain, and assembly. If a roaming scope is not used, stores will not roam even if a roaming user profile is used.

 The following code example retrieves a roaming store isolated by user and assembly. The store can be accessed through the `isoFile` object.
 ```csharp
using System;
using System.IO.IsolatedStorage;

class RoamingIsoStorage
{
    public static void Main()
    {
        SnippetA();
        SnippetB();
    }

    public static void SnippetA()
    {
        IsolatedStorageFile isoFile =
            IsolatedStorageFile.GetStore(IsolatedStorageScope.User |
                IsolatedStorageScope.Assembly |
                IsolatedStorageScope.Roaming, null, null);
    }

    public static void SnippetB()
    {
        IsolatedStorageFile isoFile =
            IsolatedStorageFile.GetStore(IsolatedStorageScope.User |
                IsolatedStorageScope.Assembly | IsolatedStorageScope.Domain |
                IsolatedStorageScope.Roaming, null, null);
    }
}
```

 A domain scope can be added to create a roaming store isolated by user, domain, and application. The following code example demonstrates this.
 ```csharp
using System;
using System.IO.IsolatedStorage;

class RoamingIsoStorage
{
    public static void Main()
    {
        SnippetA();
        SnippetB();
    }

    public static void SnippetA()
    {
        IsolatedStorageFile isoFile =
            IsolatedStorageFile.GetStore(IsolatedStorageScope.User |
                IsolatedStorageScope.Assembly |
                IsolatedStorageScope.Roaming, null, null);
    }

    public static void SnippetB()
    {
        IsolatedStorageFile isoFile =
            IsolatedStorageFile.GetStore(IsolatedStorageScope.User |
                IsolatedStorageScope.Assembly | IsolatedStorageScope.Domain |
                IsolatedStorageScope.Roaming, null, null);
    }
}
```

## See also

- `System.IO.IsolatedStorage.IsolatedStorageScope`
- Isolated Storage
