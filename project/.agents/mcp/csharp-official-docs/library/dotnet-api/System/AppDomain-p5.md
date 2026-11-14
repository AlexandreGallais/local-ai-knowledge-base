---
title: "AppDomain class (part 5 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/AppDomain.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AppDomain class (part 5 of 7)

## AppDomain.ExecuteAssembly(String, String[], Byte[], AssemblyHashAlgorithm) method

```csharp
public int ExecuteAssembly (string assemblyFile, string?[]? args, byte[]? hashValue, System.Configuration.Assemblies.AssemblyHashAlgorithm hashAlgorithm);
```

Executes the assembly contained in the specified file, using the specified arguments, hash value, and hash algorithm.

Parameters:

- `assemblyFile`: The name of the file that contains the assembly to execute.
- `args`: The arguments to the entry point of the assembly.
- `hashValue`: Represents the value of the computed hash code.
- `hashAlgorithm`: Represents the hash algorithm used by the assembly manifest.

Returns: The value that is returned by the entry point of the assembly.

Exceptions:

- `ArgumentNullException`: `assemblyFile` is `null`.
- `FileNotFoundException`: `assemblyFile` is not found.
- `BadImageFormatException`: `assemblyFile` is not a valid assembly for the currently loaded runtime.
- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.
- `FileLoadException`: An assembly or module was loaded twice with two different evidences.
- `MissingMethodException`: The specified assembly has no entry point.
- `PlatformNotSupportedException`: In all cases.

To be added.

## AppDomain.ExecuteAssemblyByName(String) method

```csharp
public int ExecuteAssemblyByName (string assemblyName);
```

Executes an assembly given its display name.

Parameters:

- `assemblyName`: The display name of the assembly. See `Assembly.FullName`.

Returns: The value returned by the entry point of the assembly.

Exceptions:

- `ArgumentNullException`: `assemblyName` is `null`.
- `FileNotFoundException`: The assembly specified by `assemblyName` is not found.
- `BadImageFormatException`: The assembly specified by `assemblyName` is not a valid assembly for the currently loaded runtime.
- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.
- `FileLoadException`: The assembly specified by `assemblyName` was found, but could not be loaded.
- `MissingMethodException`: The specified assembly has no entry point.

#### Remarks
The `AppDomain.ExecuteAssemblyByName` method provides similar functionality to the `AppDomain.ExecuteAssembly` method, but specifies the assembly by display name or `AssemblyName` rather than by file location. Therefore, `AppDomain.ExecuteAssemblyByName` loads assemblies with the `Assembly.Load` method rather than with the `Assembly.LoadFile` method.

The assembly begins executing at the entry point specified in the .NET header.

This method does not create a new process or application domain, and it does not execute the entry point method on a new thread.

To create the `AppDomain` to load and execute, use the `AppDomain.CreateDomain` method.

## AppDomain.ExecuteAssemblyByName(AssemblyName, String[]) method

```csharp
public int ExecuteAssemblyByName (System.Reflection.AssemblyName assemblyName, params string?[]? args);
```

Executes the assembly given an `AssemblyName`, using the specified arguments.

Parameters:

- `assemblyName`: An `AssemblyName` object representing the name of the assembly.
- `args`: Command-line arguments to pass when starting the process.

Returns: The value that is returned by the entry point of the assembly.

Exceptions:

- `FileNotFoundException`: The assembly specified by `assemblyName` is not found.
- `FileLoadException`: The assembly specified by `assemblyName` was found, but could not be loaded.
- `BadImageFormatException`: The assembly specified by `assemblyName` is not a valid assembly for the currently loaded runtime.
- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.
- `MissingMethodException`: The specified assembly has no entry point.

#### Remarks
The `AppDomain.ExecuteAssemblyByName` method provides similar functionality to the `AppDomain.ExecuteAssembly` method, but specifies the assembly by display name or `AssemblyName` rather than by file location. Therefore, `AppDomain.ExecuteAssemblyByName` loads assemblies with the `Assembly.Load` method rather than with the `Assembly.LoadFile` method.

The assembly begins executing at the entry point specified in the .NET header.

This method does not create a new process or application domain, and it does not execute the entry point method on a new thread.

## AppDomain.ExecuteAssemblyByName(String, String[]) method

```csharp
public int ExecuteAssemblyByName (string assemblyName, params string?[]? args);
```

Executes the assembly given its display name, using the specified arguments.

Parameters:

- `assemblyName`: The display name of the assembly. See `Assembly.FullName`.
- `args`: Command-line arguments to pass when starting the process.

Returns: The value that is returned by the entry point of the assembly.

Exceptions:

- `ArgumentNullException`: `assemblyName` is `null`.
- `FileNotFoundException`: The assembly specified by `assemblyName` is not found.
- `FileLoadException`: The assembly specified by `assemblyName` was found, but could not be loaded.
- `BadImageFormatException`: The assembly specified by `assemblyName` is not a valid assembly for the currently loaded runtime.
- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.
- `MissingMethodException`: The specified assembly has no entry point.

#### Remarks
The `AppDomain.ExecuteAssemblyByName` method provides similar functionality to the `AppDomain.ExecuteAssembly` method, but specifies the assembly by display name or `AssemblyName` rather than by file location. Therefore, `AppDomain.ExecuteAssemblyByName` loads assemblies with the `Assembly.Load` method rather than with the `Assembly.LoadFile` method.

The assembly begins executing at the entry point specified in the .NET header.

This method does not create a new process or application domain, and it does not execute the entry point method on a new thread.

## AppDomain.GetAssemblies() method

```csharp
public System.Reflection.Assembly[] GetAssemblies ();
```

Gets the assemblies that have been loaded into the execution context of this application domain.

Returns: An array of assemblies in this application domain.

Exceptions:

- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.

To be added.

## AppDomain.GetCurrentThreadId() method

```csharp
public static int GetCurrentThreadId ();
```

Gets the current thread identifier.

Returns: A 32-bit signed integer that is the identifier of the current thread.

To be added.

## AppDomain.GetData(String) method

```csharp
public object? GetData (string name);
```

Gets the value stored in the current application domain for the specified name.

Parameters:

- `name`: The name of a predefined application domain property, or the name of an application domain property you have defined.

Returns: The value of the `name` property, or `null` if the property does not exist.

Exceptions:

- `ArgumentNullException`: `name` is `null`.
- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.

#### Remarks
Use this method to retrieve the value of an entry in an internal cache of name-data pairs that describe properties of this instance of `AppDomain`. Note that the comparison of `name` with the name of key-value pairs is case-sensitive.

The cache automatically contains predefined system entries that are inserted when the application domain is created. You can inspect their values with the `AppDomain.GetData` method, or the equivalent `AppDomainSetup` properties.

You can insert or modify your own user defined name-data pairs with the `AppDomain.SetData` method and inspect their values with the `AppDomain.GetData` method.

The following table describes the `name` of each predefined system entry and its corresponding `AppDomainSetup` property.

| Value of 'name'                                   | Property                                                                                  |
|---------------------------------------------------|-------------------------------------------------------------------------------------------|
| "APPBASE"                                         | `AppDomainSetup.ApplicationBase`               |
| "APP_CONFIG_FILE"                                 | `AppDomainSetup.ConfigurationFile`             |
| "APP_LAUNCH_URL"                                  | (no property) "APP_LAUNCH_URL" represents the URL originally requested by the user, before any redirection. It is available only when the application has been launched with a browser. Not all browsers provide this value.|
| "CODE_DOWNLOAD_DISABLED"                          | `AppDomainSetup.DisallowCodeDownload`          |
| "DEV_PATH"                                        | (no property)                                                                            |
| "DISALLOW_APP"                                    | `AppDomainSetup.DisallowPublisherPolicy`       |
| "DISALLOW_APP_BASE_PROBING"                       | `AppDomainSetup.DisallowApplicationBaseProbing` |
| "DISALLOW_APP_REDIRECTS"                          | `AppDomainSetup.DisallowBindingRedirects`      |
| "LICENSE_FILE", or an application-specific string | `AppDomainSetup.LicenseFile`                   |
| "LOADER_OPTIMIZATION"                             | `AppDomainSetup.LoaderOptimization`            |
| "LOCATION_URI"                                    | (no property)                                                                            |
| "REGEX_DEFAULT_MATCH_TIMEOUT"                     | `Regex.MatchTimeout` "REGEX_DEFAULT_MATCH_TIMEOUT" is not a system entry, and its value can be set by calling the `AppDomain.SetData` method. |
| "SHADOW_COPY_DIRS"                                | `AppDomainSetup.ShadowCopyDirectories`         |

#### Examples
The following example creates a new application domain, sets a system-provided value for the domain, and adds a new value pair for the domain. The example then demonstrates how to use the `AppDomain.GetData` method to retrieve the data from these value pairs and display them to the console.

_Code sample not included: ~/snippets/csharp/System/AppDomain/GetData/adgetdata.cs._

## AppDomain.IsCompatibilitySwitchSet(String) method

```csharp
public bool? IsCompatibilitySwitchSet (string value);
```

Gets a nullable Boolean value that indicates whether any compatibility switches are set, and if so, whether the specified compatibility switch is set.

Parameters:

- `value`: The compatibility switch to test.

Returns: A null reference (`Nothing` in Visual Basic) if no compatibility switches are set; otherwise, a Boolean value that indicates whether the compatibility switch that is specified by `value` is set.

#### Remarks
This method tests whether the specified compatibility switch has been set for the current application domain. Compatibility switches typically restore a behavior (such as the way strings are sorted) that was changed between versions of .NET.

## AppDomain.IsDefaultAppDomain() method

```csharp
public bool IsDefaultAppDomain ();
```

Returns a value that indicates whether the application domain is the default application domain for the process.

Returns: `true` if the current `AppDomain` object represents the default application domain for the process; otherwise, `false`.

Every managed process has a default application domain. Execution begins in the default domain.

## AppDomain.IsFinalizingForUnload() method

```csharp
public bool IsFinalizingForUnload ();
```

Indicates whether this application domain is unloading, and the objects it contains are being finalized by the common language runtime.

Returns: `true` if this application domain is unloading and the common language runtime has started invoking finalizers; otherwise, `false`.

#### Remarks
The finalization method for an object provides you an opportunity to perform any necessary cleanup operations before the object is garbage collected. After finalization, the object is accessible but in an invalid state and therefore unusable. Eventually, garbage collection completes and reclaims the object.

An object's finalization method is called in one of the following situations: during garbage collection, when the common language runtime is shutting down, or when the application domain that contains the object is unloaded. The `AppDomain.IsFinalizingForUnload` method returns `true` only in the last case; it does not return `true` if finalization results from routine garbage collection or from CLR shutdown.

> **Note:**
> To determine whether finalization is due to CLR shutdown, use the `HasShutdownStarted` property. It returns `true` if finalization is due to an application domain being unloaded or to the CLR shutting down.

While executing in your finalization method during domain unloading, you might want to access another object that is referenced by a static field and has a finalization method. However, you cannot reliably do so because the accessed object might already have been finalized.

> **Note:**
> An exception to this rule is the `Console` class, which contains static fields that reference stream objects, but is implemented specially so you can always write to the system console, even during domain unloading or system shutdown.

Use this method in an object's finalization method to determine whether the application domain that contains the object is unloading. If that is the case, you cannot reliably access any object that has a finalization method and is referenced by a static field.

## AppDomain.Load(Byte[]) method

```csharp
public System.Reflection.Assembly Load (byte[] rawAssembly);
```

Loads the `Assembly` with a common object file format (COFF) based image containing an emitted `Assembly`.

Parameters:

- `rawAssembly`: An array of type `byte` that is a COFF-based image containing an emitted assembly.

Returns: The loaded assembly.

Exceptions:

- `ArgumentNullException`: `rawAssembly` is `null`.
- `BadImageFormatException`: `rawAssembly` is not a valid assembly for the currently loaded runtime.
- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.
- `FileLoadException`: An assembly or module was loaded twice with two different evidences.

#### Remarks
For information that is common to all overloads of this method, see the `Load` method overload.
