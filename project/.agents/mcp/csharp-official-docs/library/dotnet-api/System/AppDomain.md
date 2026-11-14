---
title: "AppDomain class (part 1 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/AppDomain.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AppDomain class

Namespace: `System`

```csharp
public sealed class AppDomain : MarshalByRefObject
```

Represents an application domain, which is an isolated environment where applications execute. This class cannot be inherited.

In modern .NET versions, the `AppDomain` implementation is limited by design and does not provide isolation, unloading, or security boundaries. These versions have exactly one `AppDomain`. Isolation and unloading are provided through `AssemblyLoadContext`. Security boundaries should be provided by process boundaries and appropriate remoting techniques.

## AppDomain.BaseDirectory property

```csharp
public string BaseDirectory { get; }
```

Gets the base directory of the application.

Returns: The base directory of the application.

Exceptions:

- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.

#### Remarks
This property corresponds to the `ApplicationBase` property. It can also be retrieved using the `AppDomain.GetData` method with the string "APPBASE".

## AppDomain.CurrentDomain property

```csharp
public static AppDomain CurrentDomain { get; }
```

Gets the current application domain for the current `Thread`.

Returns: The current application domain.

To be added.

## AppDomain.DynamicDirectory property

```csharp
public string? DynamicDirectory { get; }
```

Gets the directory that the assembly resolver uses to probe for dynamically created assemblies.

Returns: The directory that the assembly resolver uses to probe for dynamically created assemblies.

Exceptions:

- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.

To be added.

## AppDomain.FriendlyName property

```csharp
public string FriendlyName { get; }
```

Gets the friendly name of this application domain.

Returns: The friendly name of this application domain.

Exceptions:

- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.

#### Remarks

The friendly name of the default application domain is the file name of the process executable. For example, if the executable used to start the process is `"c:\MyAppDirectory\MyAssembly.exe"`, the friendly name of the default application domain is `"MyAssembly"`. The friendly name doesn't include the file extension.

## AppDomain.Id property

```csharp
public int Id { get; }
```

Gets an integer that uniquely identifies the application domain within the process.

Returns: An integer that identifies the application domain.

To be added.

## AppDomain.IsFullyTrusted property

```csharp
public bool IsFullyTrusted { get; }
```

Gets a value that indicates whether assemblies that are loaded into the current application domain execute with full trust.

Returns: `true` in all cases.

To be added.

## AppDomain.IsHomogenous property

```csharp
public bool IsHomogenous { get; }
```

Gets a value that indicates whether the current application domain has a set of permissions that is granted to all assemblies that are loaded into the application domain.

Returns: `true` in all cases.

To be added.

## AppDomain.MonitoringIsEnabled property

```csharp
public static bool MonitoringIsEnabled { get; set; }
```

Gets or sets a value that indicates whether CPU and memory monitoring of application domains is enabled for the current process. Once monitoring is enabled for a process, it cannot be disabled.

Returns: `true` if monitoring is enabled; otherwise `false`.

Exceptions:

- `ArgumentException`: The current process attempted to assign the value `false` to this property.

#### Remarks
This `static` property (`Shared` property in Visual Basic) controls CPU and memory monitoring of all the application domains in the process.

If you attempt to set this property to `false`, a `ArgumentException` exception is thrown, even if the current value of the property is `false`.

Once monitoring is enabled, you can use the `AppDomain.MonitoringSurvivedMemorySize`, `AppDomain.MonitoringSurvivedProcessMemorySize`, `AppDomain.MonitoringTotalAllocatedMemorySize`, and `AppDomain.MonitoringTotalProcessorTime` instance properties to monitor CPU and memory use of individual application domains.

## AppDomain.MonitoringSurvivedMemorySize property

```csharp
public long MonitoringSurvivedMemorySize { get; }
```

Gets the number of bytes that survived the last collection and that are known to be referenced by the current application domain.

Returns: The number of surviving bytes.

Exceptions:

- `InvalidOperationException`: The `static` (`Shared` in Visual Basic) `AppDomain.MonitoringIsEnabled` property is set to `false`.

#### Remarks
The statistics are updated with each garbage collection. However, they are guaranteed to be accurate only after a full, blocking collection; that is, a collection that includes all generations and that stops the application while collection occurs. For example, the `Collect` method overload performs a full, blocking collection. (Concurrent collection occurs in the background and does not block the application.)

## AppDomain.MonitoringSurvivedProcessMemorySize property

```csharp
public static long MonitoringSurvivedProcessMemorySize { get; }
```

Gets the total bytes that survived from the last collection for all application domains in the process.

Returns: The total number of surviving bytes for the process.

Exceptions:

- `InvalidOperationException`: The `static` (`Shared` in Visual Basic) `AppDomain.MonitoringIsEnabled` property is set to `false`.

#### Remarks
After a full, blocking collection, this number represents the number of bytes currently held live on managed heaps. It should be close to the number reported by the `GC.GetTotalMemory` method. After an ephemeral collection, this number represents the number of bytes currently held live in ephemeral generations.

## AppDomain.MonitoringTotalAllocatedMemorySize property

```csharp
public long MonitoringTotalAllocatedMemorySize { get; }
```

Gets the total size, in bytes, of all memory allocations that have been made by the application domain since it was created, without subtracting memory that has been collected.

Returns: The total size of all memory allocations.

Exceptions:

- `InvalidOperationException`: The `static` (`Shared` in Visual Basic) `AppDomain.MonitoringIsEnabled` property is set to `false`.

To be added.

## AppDomain.MonitoringTotalProcessorTime property

```csharp
public TimeSpan MonitoringTotalProcessorTime { get; }
```

Gets the total processor time that has been used by all threads while executing in the current application domain, since the process started.

Returns: Total processor time for the current application domain.

Exceptions:

- `InvalidOperationException`: The `static` (`Shared` in Visual Basic) `AppDomain.MonitoringIsEnabled` property is set to `false`.

#### Remarks
The total time that is reported for an application domain includes the time each thread in the process spent executing in that application domain.

A thread that calls into unmanaged code is still associated with an application domain, and the processor time spent executing the unmanaged code is reported for the application domain where the call was made.

When a thread is blocked or sleeping, it does not consume processor time.

## AppDomain.PermissionSet property

```csharp
public System.Security.PermissionSet PermissionSet { get; }
```

Gets the permission set of a sandboxed application domain.

Returns: The permission set of the sandboxed application domain.

#### Remarks

## AppDomain.RelativeSearchPath property

```csharp
public string? RelativeSearchPath { get; }
```

Gets the path under the base directory where the assembly resolver should probe for private assemblies.

Returns: The path under the base directory where the assembly resolver should probe for private assemblies.

Exceptions:

- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.

#### Remarks
Private assemblies are deployed in the same directory structure as the application. If the path specified by the `RelativeSearchPath` property is not under `AppDomainSetup.ApplicationBase`, it is ignored.

## AppDomain.SetupInformation property

```csharp
public AppDomainSetup SetupInformation { get; }
```

Gets the application domain configuration information for this instance.

Returns: The application domain initialization information.

Exceptions:

- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.

To be added.

## AppDomain.ShadowCopyFiles property

```csharp
public bool ShadowCopyFiles { get; }
```

Gets an value that indicates whether the application domain is configured to shadow copy files.

Returns: `true` if the application domain is configured to shadow copy files; otherwise, `false`.

Exceptions:

- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.

To be added.

## AppDomain.AppendPrivatePath(String) method

```csharp
public void AppendPrivatePath (string? path);
```

Appends the specified directory name to the private path list.

Parameters:

- `path`: The name of the directory to be appended to the private path.

Exceptions:

- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.

To be added.

## AppDomain.ApplyPolicy(String) method

```csharp
public string ApplyPolicy (string assemblyName);
```

Returns the assembly display name after policy has been applied.

Parameters:

- `assemblyName`: The assembly display name, in the form provided by the `Assembly.FullName` property.

Returns: A string containing the assembly display name after policy has been applied.

To be added.

## AppDomain.ClearPrivatePath() method

```csharp
public void ClearPrivatePath ();
```

Resets the path that specifies the location of private assemblies to the empty string ("").

Exceptions:

- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.

To be added.

## AppDomain.ClearShadowCopyPath() method

```csharp
public void ClearShadowCopyPath ();
```

Resets the list of directories containing shadow copied assemblies to the empty string ("").

Exceptions:

- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.

To be added.

## AppDomain.CreateDomain(String) method

```csharp
public static AppDomain CreateDomain (string friendlyName);
```

Creates a new application domain with the specified name.

Parameters:

- `friendlyName`: The friendly name of the domain.

Returns: The newly created application domain.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## AppDomain.CreateInstance(String, String) method

```csharp
public System.Runtime.Remoting.ObjectHandle? CreateInstance (string assemblyName, string typeName);
```

Creates a new instance of the specified type defined in the specified assembly.

Parameters:

- `assemblyName`: The display name of the assembly. See `Assembly.FullName`.
- `typeName`: The fully qualified name of the requested type, including the namespace but not the assembly, as returned by the `Type.FullName` property.

Returns: An object that is a wrapper for the new instance specified by `typeName`. The return value needs to be unwrapped to access the real object.

Exceptions:

- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.
- `ArgumentNullException`: `assemblyName` or `typeName` is `null`.
- `BadImageFormatException`: `assemblyName` is not a valid assembly for the currently loaded runtime.
- `FileLoadException`: An assembly or module was loaded twice with two different evidences.
- `FileNotFoundException`: `assemblyName` was not found.
- `MethodAccessException`: The caller does not have permission to call this constructor.
- `MissingMethodException`: No matching public constructor was found.
- `TypeLoadException`: `typeName` was not found in `assemblyName`.
- `NullReferenceException`: This instance is `null`.

#### Remarks
This method calls the parameterless constructor for `typeName`.

See `AssemblyName` for the format of `assemblyName`.

An attempt to call `AppDomain.CreateInstance` on a target application domain that is not the current application domain will result in a successful load of the assembly in the target application domain. Since an `Assembly` is not `MarshalByRefObject`, when this method attempts to return the `Assembly` for the loaded assembly to the current application domain, the common language runtime will try to load the assembly into the current application domain and the load might fail. The assembly that is loaded into the current application domain might be different from the assembly that was loaded first if the path settings for the two application domains are different.
