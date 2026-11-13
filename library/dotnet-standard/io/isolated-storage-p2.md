---
title: "Isolated Storage (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/isolated-storage.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Isolated Storage (part 2 of 3)

## Safety of isolated storage components with regard to untrusted data

**This section applies to the following frameworks:**

- .NET Framework (all versions)
- .NET Core 2.1+
- .NET 5+

.NET Framework and .NET Core offer isolated storage as a mechanism to persist data for a user, an application, or a component. This is a legacy component primarily designed for now-deprecated Code Access Security scenarios.

Various isolated storage APIs and tools can be used to read data across trust boundaries. For example, reading data from a machine-wide scope can aggregate data from other, possibly less-trusted user accounts on the machine. Components or applications that read from machine-wide isolated storage scopes should be aware of the consequences of reading this data.

### Security-sensitive APIs that can read from the machine-wide scope

Components or applications that call any of the following APIs read from the machine-wide scope:

* IsolatedStorageFile.GetEnumerator, passing a scope that includes the IsolatedStorageScope.Machine flag
* IsolatedStorageFile.GetMachineStoreForApplication
* IsolatedStorageFile.GetMachineStoreForAssembly
* IsolatedStorageFile.GetMachineStoreForDomain
* IsolatedStorageFile.GetStore, passing a scope that includes the IsolatedStorageScope.Machine flag
* IsolatedStorageFile.Remove, passing a scope that includes the `IsolatedStorageScope.Machine` flag

The isolated storage tool `storeadm.exe` is impacted if called with the `/machine` switch, as shown in the following code:

```txt
storeadm.exe /machine [any-other-switches]
```

The isolated storage tool is provided as part of Visual Studio and the .NET Framework SDK.

If the application doesn't involve calls to the preceding APIs, or if the workflow doesn't involve calling `storeadm.exe` in this manner, this document doesn't apply.

### Impact in multi-user environments

As mentioned previously, the security impact from these APIs results from data written from one trust environment is read from a different trust environment. Isolated storage generally uses one of three locations to read and write data:

1. `%LOCALAPPDATA%\IsolatedStorage\`: For example, `C:\Users\<username>\AppData\Local\IsolatedStorage\`, for `User` scope.
2. `%APPDATA%\IsolatedStorage\`: For example, `C:\Users\<username>\AppData\Roaming\IsolatedStorage\`, for `User|Roaming` scope.
3. `%PROGRAMDATA%\IsolatedStorage\`: For example, `C:\ProgramData\IsolatedStorage\`, for `Machine` scope.

The first two locations are isolated per-user. Windows ensures that different user accounts on the same machine cannot access each other's user profile folders. Two different user accounts who use the `User` or `User|Roaming` stores will not see each other's data and cannot interfere with each other's data.

The third location is shared across all user accounts on the machine. Different accounts can read from and write to this location, and they're able to see each other's data.

The preceding paths may differ based on the version of Windows in use.

Now consider a multi-user system with two registered users _Mallory_ and _Bob_. Mallory has the ability to access her user profile directory `C:\Users\Mallory\`, and she can access the shared machine-wide storage location `C:\ProgramData\IsolatedStorage\`. She cannot access Bob's user profile directory `C:\Users\Bob\`.

If Mallory wishes to attack Bob, she might write data to the machine-wide storage location, then attempt to influence Bob into reading from the machine-wide store. When Bob runs an app that reads from this store, that app will operate on the data Mallory placed there, but from within the context of Bob's user account. The remainder of this document contemplates various attack vectors and what steps apps can do to minimize their risk to these attacks.

> **Note:**
> In order for such an attack to take place, Mallory requires:
>
> * A user account on the machine.
> * The ability to place a file into a known location on the file system.
> * Knowledge that Bob will at some point run an app that attempts to read this data.
>
> These are not threat vectors that apply to standard single-user desktop environments like home PCs or single-employee enterprise workstations.

#### Elevation of privilege

An **elevation of privilege** attack occurs when Bob's app reads Mallory's file and automatically tries to take some action based on the contents of that payload. Consider an app that reads the contents of a startup script from the machine-wide store and passes those contents to `Process.Start`. If Mallory can place a malicious script inside the machine-wide store, when Bob launches his app:

* His app parses and launches Mallory's malicious script _under the context of Bob's user profile_.
* Mallory gains access to Bob's account on the local machine.

#### Denial of service

A **denial of service** attack occurs when Bob's app reads Mallory's file and crashes or otherwise stops functioning correctly. Consider again the app mentioned previously, which attempts to parse a startup script from the machine-wide store. If Mallory can place a file with malformed contents inside the machine-wide store, she might:

* Cause Bob's app to throw an exception early in the startup path.
* Prevent the app from launching successfully because of the exception.

She has then denied Bob the ability to launch the app under his own user account.

#### Information disclosure

An **information disclosure** attack occurs when Mallory can trick Bob into disclosing the contents of a file that Mallory does not normally have access to. Consider that Bob has a secret file *C:\Users\Bob\secret.txt* that Mallory wants to read. She knows the path to this file, but she cannot read it because Windows forbids her from gaining access to Bob's user profile directory.

Instead, Mallory places a hard link into the machine-wide store. This is a special kind of file that itself does not contain any contents, rather, it points to another file on disk. Attempting to read the hard link file will instead read the contents of the file targeted by the link. After creating the hard link, Mallory still cannot read the file contents because she does not have access to the target (`C:\Users\Bob\secret.txt`) of the link. However, Bob _does_ have access to this file.

When Bob's app reads from the machine-wide store, it now inadvertently reads the contents of his `secret.txt` file, just as if the file itself had been present in the machine-wide store. When Bob's app exits, if it attempts to resave the file to the machine-wide store, it will end up placing an actual copy of the file in the *C:\ProgramData\IsolatedStorage\* directory. Since this directory is readable by any user on the machine, Mallory can now read the contents of the file.

### Best practices to defend against these attacks

**Important:** If your environment has multiple mutually untrusted users, **do not** call the API `IsolatedStorageFile.GetEnumerator(IsolatedStorageScope.Machine)` or invoke the tool `storeadm.exe /machine /list`. Both of these assume that they're operating on trusted data. If an attacker can seed a malicious payload in the machine-wide store, that payload can lead to an elevation of privilege attack under the context of the user who runs these commands.

If operating in a multi-user environment, reconsider use of isolated storage features that target the _Machine_ scope. If an app must read data from a machine-wide location, prefer to read the data from a location that's writable only by admin accounts. The `%PROGRAMFILES%` directory and the `HKLM` registry hive are examples of locations that are writable by only administrators and readable by everyone. Data read from those locations is therefore considered trustworthy.

If an app must use the _Machine_ scope in a multi-user environment, validate the contents of any file that you read from the machine-wide store. If the app deserializing object graphs from these files, consider using safer serializers like `XmlSerializer` instead of dangerous serializers like `BinaryFormatter` or `NetDataContractSerializer`. Use caution with deeply nested object graphs or object graphs that perform resource allocation based on the file contents.

## Isolated Storage Locations

Sometimes it is helpful to verify a change to isolated storage by using the file system of the operating system. You might also want to know the location of isolated storage files. This location is different depending on the operating system. The following table shows the root locations where isolated storage is created on a few common operating systems. Look for Microsoft\IsolatedStorage directories under this root location. You must change folder settings to show hidden files and folders in order to see isolated storage in the file system.

|Operating system|Location in file system|
|----------------------|-----------------------------|
|Windows 2000, Windows XP, Windows Server 2003  (upgrade from Windows NT 4.0)|Roaming-enabled stores = \<SYSTEMROOT>\Profiles\\<user\>\Application Data Nonroaming stores = \<SYSTEMROOT>\Profiles\\<user\>\Local Settings\Application Data|
|Windows 2000  - clean installation (and upgrades from Windows 98 and Windows NT 3.51)|Roaming-enabled stores = \<SYSTEMDRIVE>\Documents and Settings\\<user\>\Application Data Nonroaming stores = \<SYSTEMDRIVE>\Documents and Settings\\<user\>\Local Settings\Application Data|
|Windows XP, Windows Server 2003 - clean installation (and upgrades from Windows 2000 and Windows 98)|Roaming-enabled stores = \<SYSTEMDRIVE>\Documents and Settings\\<user\>\Application Data Nonroaming stores = \<SYSTEMDRIVE>\Documents and Settings\\<user\>\Local Settings\Application Data|
|Windows 8, Windows 7, Windows Server 2008, Windows Vista|Roaming-enabled stores = \<SYSTEMDRIVE>\Users\\<user\>\AppData\Roaming Nonroaming stores = \<SYSTEMDRIVE>\Users\\<user\>\AppData\Local|

## Creating, Enumerating, and Deleting Isolated Storage

.NET provides three classes in the `System.IO.IsolatedStorage` namespace to help you perform tasks that involve isolated storage:

- `System.IO.IsolatedStorage.IsolatedStorageFile`, derives from `System.IO.IsolatedStorage.IsolatedStorage` and provides basic management of stored assembly and application files. An instance of the `System.IO.IsolatedStorage.IsolatedStorageFile` class represents a single store located in the file system.

- `System.IO.IsolatedStorage.IsolatedStorageFileStream` derives from `System.IO.FileStream` and provides access to the files in a store.

- `System.IO.IsolatedStorage.IsolatedStorageScope` is an enumeration that enables you to create and select a store with the appropriate isolation type.

The isolated storage classes enable you to create, enumerate, and delete isolated storage. The methods for performing these tasks are available through the `System.IO.IsolatedStorage.IsolatedStorageFile` object. Some operations require you to have the `System.Security.Permissions.IsolatedStorageFilePermission` permission that represents the right to administer isolated storage; you might also need to have operating system rights to access the file or directory.

For a series of examples that demonstrate common isolated storage tasks, see the how-to topics listed in Related Topics.

## Scenarios for Isolated Storage

Isolated storage is useful in many situations, including these four scenarios:

- Downloaded controls. Managed code controls downloaded from the Internet are not allowed to write to the hard drive through normal I/O classes, but they can use isolated storage to persist users' settings and application states.

- Shared component storage. Components that are shared between applications can use isolated storage to provide controlled access to data stores.

- Server storage. Server applications can use isolated storage to provide individual stores for a large number of users making requests to the application. Because isolated storage is always segregated by user, the server must impersonate the user making the request. In this case, data is isolated based on the identity of the principal, which is the same identity the application uses to distinguish between its users.

- Roaming. Applications can also use isolated storage with roaming user profiles. This allows a user's isolated stores to roam with the profile.

Do not use isolated storage in the following situations:

- To store high-value secrets, such as unencrypted keys or passwords, because isolated storage is not protected from highly trusted code, from unmanaged code, or from trusted users of the computer.

- To store code.

- To store configuration and deployment settings, which administrators control. (User preferences are not considered to be configuration settings because administrators do not control them.)

Many applications use a database to store and isolate data, in which case one or more rows in a database might represent storage for a specific user. You might choose to use isolated storage instead of a database when the number of users is small, when the overhead of using a database is significant, or when no database facility exists. Also, when the application requires storage that is more flexible and complex than what a row in a database provides, isolated storage can provide a viable alternative.

## Related articles

|Title|Description|
|-----------|-----------------|
|Types of Isolation|Describes the different types of isolation.|
|How to: Obtain Stores for Isolated Storage|Provides an example of using the `System.IO.IsolatedStorage.IsolatedStorageFile` class to obtain a store isolated by user and assembly.|
|How to: Enumerate Stores for Isolated Storage|Shows how to use the `System.IO.IsolatedStorage.IsolatedStorageFile.GetEnumerator*` method to calculate the size of all isolated storage for the user.|
|How to: Delete Stores in Isolated Storage|Shows how to use the `System.IO.IsolatedStorage.IsolatedStorageFile.Remove*` method in two different ways to delete isolated stores.|
|How to: Anticipate Out-of-Space Conditions with Isolated Storage|Shows how to measure the remaining space in an isolated store.|
|How to: Create Files and Directories in Isolated Storage|Provides some examples of creating files and directories in an isolated store.|
|How to: Find Existing Files and Directories in Isolated Storage|Demonstrates how to read the directory structure and files in isolated storage.|
|How to: Read and Write to Files in Isolated Storage|Provides an example of writing a string to an isolated storage file and reading it back.|
|How to: Delete Files and Directories in Isolated Storage|Demonstrates how to delete isolated storage files and directories.|
|File and Stream I/O|Explains how you can perform synchronous and asynchronous file and data stream access.|
