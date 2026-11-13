---
title: "Isolated Storage (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/isolated-storage.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Isolated storage

For desktop apps, isolated storage is a data storage mechanism that provides isolation and safety by defining standardized ways of associating code with saved data. Standardization provides other benefits as well. Administrators can use tools designed to manipulate isolated storage to configure file storage space, set security policies, and delete unused data. With isolated storage, your code no longer needs unique paths to specify safe locations in the file system, and data is protected from other applications that only have isolated storage access. Hard-coded information that indicates where an application's storage area is located is unnecessary.

> **Important:**
> Isolated storage is not available for Windows 8.x Store apps. Instead, use the application data classes in the `Windows.Storage` namespaces included in the Windows Runtime API to store local data and files. For more information, see Application data in the Windows Dev Center.

## Data Compartments and Stores

When an application stores data in a file, the file name and storage location must be carefully chosen to minimize the possibility that the storage location will be known to another application and, therefore, vulnerable to corruption. Without a standard system in place to manage these problems, improvising techniques that minimize storage conflicts can be complex, and the results can be unreliable.

With isolated storage, data is always isolated by user and by assembly. Credentials such as the origin or the strong name of the assembly determine assembly identity. Data can also be isolated by application domain, using similar credentials.

When you use isolated storage, your application saves data to a unique data compartment that is associated with some aspect of the code's identity, such as its publisher or signature. The data compartment is an abstraction, not a specific storage location; it consists of one or more isolated storage files, called stores, which contain the actual directory locations where data is stored. For example, an application might have a data compartment associated with it, and a directory in the file system would implement the store that actually preserves the data for that application. The data saved in the store can be any kind of data, from user preference information to application state. For the developer, the location of the data compartment is transparent. Stores usually reside on the client, but a server application could use isolated stores to store information by impersonating the user on whose behalf it is functioning. Isolated storage can also store information on a server with a user's roaming profile so that the information will travel with the roaming user.

## Quotas for Isolated Storage

A quota is a limit on the amount of isolated storage that can be used. The quota includes bytes of file space as well as the overhead associated with the directory and other information in the store. Isolated storage uses permission quotas, which are storage limits that are set by using `System.Security.Permissions.IsolatedStoragePermission` objects. If you try to write data that exceeds the quota, an `System.IO.IsolatedStorage.IsolatedStorageException` exception is thrown.  Security policy, which can be modified using the .NET Framework Configuration Tool (Mscorcfg.msc), determines which permissions are granted to code. Code that has been granted `System.Security.Permissions.IsolatedStoragePermission` is restricted to using no more storage than the `System.Security.Permissions.IsolatedStoragePermission.UserQuota` property allows. However, because code can bypass <example-value> quotas by presenting different user identities, permission quotas serve as guidelines for how code should behave rather than as a firm limit on code behavior.

Quotas are not enforced on roaming stores. Because of this, a slightly higher level of permission is required for code to use them. The enumeration values `System.Security.Permissions.IsolatedStorageContainment.AssemblyIsolationByRoamingUser` and `System.Security.Permissions.IsolatedStorageContainment.DomainIsolationByRoamingUser` specify a permission to use isolated storage for a roaming user.

## Secure Access

Using isolated storage enables partially trusted applications to store data in a manner that is controlled by the computer's security policy. This is especially useful for downloaded components that a user might want to run cautiously. Security policy rarely grants this kind of code permission when you access the file system by using standard I/O mechanisms. However, by default, code running from the local computer, a local network, or the Internet is granted the right to use isolated storage.

Administrators can limit how much isolated storage an application or a user has available, based on an appropriate trust level. In addition, administrators can remove a user's persisted data completely. To create or access isolated storage, code must be granted the appropriate `System.Security.Permissions.IsolatedStorageFilePermission` permission.

To access isolated storage, code must have all necessary native platform operating system rights. The access control lists (ACLs) that control which users have the rights to use the file system must be satisfied. .NET applications already have operating system rights to access isolated storage unless they perform (platform-specific) impersonation. In this case, the application is responsible for ensuring that the impersonated user identity has the proper operating system rights to access isolated storage. This access provides a convenient way for code that is run or downloaded from the web to read and write to a storage area related to a particular user.

To control access to isolated storage, the common language runtime uses `System.Security.Permissions.IsolatedStorageFilePermission` objects. Each object has properties that specify the following values:

- Allowed usage, which indicates the type of access that is allowed. The values are members of the `System.Security.Permissions.IsolatedStorageContainment` enumeration. For more information about these values, see the table in the next section.

- Storage quota, as discussed in the preceding section.

The runtime demands `System.Security.Permissions.IsolatedStorageFilePermission` permission when code first attempts to open a store. It decides whether to grant this permission, based on how much the code is trusted. If the permission is granted, the allowed usage and storage quota values are determined by security policy and by the code's request for `System.Security.Permissions.IsolatedStorageFilePermission`. Security policy is set by using the .NET Framework Configuration Tool (Mscorcfg.msc). All callers in the call stack are checked to ensure that each caller has at least the appropriate allowed usage. The runtime also checks the quota imposed on the code that opened or created the store in which the file is to be saved. If these conditions are satisfied, permission is granted. The quota is checked again every time a file is written to the store.

Application code is not required to request permission because the common language runtime will grant whatever `System.Security.Permissions.IsolatedStorageFilePermission` is appropriate based on security policy. However, there are good reasons to request specific permissions that your application needs, including `System.Security.Permissions.IsolatedStorageFilePermission`.

## Allowed Usage and Security Risks

The allowed usage specified by `System.Security.Permissions.IsolatedStorageFilePermission` determines the degree to which code will be allowed to create and use isolated storage. The following table shows how the allowed usage specified in the permission corresponds to types of isolation and summarizes the security risks associated with each allowed usage.

|Allowed usage|Isolation types|Security impact|
|-------------------|---------------------|---------------------|
|`System.Security.Permissions.IsolatedStorageContainment.None`|No isolated storage use is allowed.|There is no security impact.|
|`System.Security.Permissions.IsolatedStorageContainment.DomainIsolationByUser`|Isolation by user, domain, and assembly. Each assembly has a separate substore within the domain. Stores that use this permission are also implicitly isolated by computer.|This permission level leaves resources open to unauthorized overuse, although enforced quotas make it more difficult. This is called a denial of service attack.|
|`System.Security.Permissions.IsolatedStorageContainment.DomainIsolationByRoamingUser`|Same as `DomainIsolationByUser`, but store is saved to a location that will roam if roaming user profiles are enabled and quotas are not enforced.|Because quotas must be disabled, storage resources are more vulnerable to a denial of service attack.|
|`System.Security.Permissions.IsolatedStorageContainment.AssemblyIsolationByUser`|Isolation by user and assembly. Stores that use this permission are also implicitly isolated by computer.|Quotas are enforced at this level to help prevent a denial of service attack. The same assembly in another domain can access this store, opening the possibility that information could be leaked between applications.|
|`System.Security.Permissions.IsolatedStorageContainment.AssemblyIsolationByRoamingUser`|Same as `AssemblyIsolationByUser`, but store is saved to a location that will roam if roaming user profiles are enabled and quotas are not enforced.|Same as in `AssemblyIsolationByUser`, but without quotas, the risk of a denial of service attack increases.|
|`System.Security.Permissions.IsolatedStorageContainment.AdministerIsolatedStorageByUser`|Isolation by user. Typically, only administrative or debugging tools use this level of permission.|Access with this permission allows code to view or delete any of a user's isolated storage files or directories (regardless of assembly isolation). Risks include, but are not limited to, leaking information and data loss.|
|`System.Security.Permissions.IsolatedStorageContainment.UnrestrictedIsolatedStorage`|Isolation by all users, domains, and assemblies. Typically, only administrative or debugging tools use this level of permission.|This permission creates the potential for a total compromise of all isolated stores for all users.|
