---
title: "AppDomain class (part 6 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/AppDomain.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AppDomain class (part 6 of 7)

## AppDomain.Load(AssemblyName) method

```csharp
public System.Reflection.Assembly Load (System.Reflection.AssemblyName assemblyRef);
```

Loads an `Assembly` given its `AssemblyName`.

Parameters:

- `assemblyRef`: An object that describes the assembly to load.

Returns: The loaded assembly.

Exceptions:

- `ArgumentNullException`: `assemblyRef` is `null`.
- `FileNotFoundException`: `assemblyRef` is not found.
- `BadImageFormatException`: `assemblyRef` is not a valid assembly for the currently loaded runtime.
- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.
- `FileLoadException`: An assembly or module was loaded twice with two different evidences.

#### Remarks
This method should be used only to load an assembly into the current application domain. This method is provided as a convenience for interoperability callers who cannot call the static `Assembly.Load` method. To load assemblies into other application domains, use a method such as `AppDomain.CreateInstanceAndUnwrap`.

If a version of the requested assembly is already loaded, this method returns the loaded assembly, even if a different version is requested.

Supplying a partial assembly name for `assemblyRef` is not recommended. (A partial name omits one or more of culture, version, or public key token. For overloads that take a string instead of an `AssemblyName` object, "<example-value>" is an example of a partial name and "<example-value>" is an example of a full name.) Using partial names has a negative effect on performance. In addition, a partial assembly name can load an assembly from the global assembly cache only if there is an exact copy of the assembly in the application base directory (`AppDomain.BaseDirectory` or `AppDomainSetup.ApplicationBase`).

If the current `AppDomain` object represents application domain `A`, and the `AppDomain.Load` method is called from application domain `B`, the assembly is loaded into both application domains. The assembly is loaded into both domains because `Assembly` does not derive from `MarshalByRefObject`, and therefore the return value of the `AppDomain.Load` method cannot be marshaled. Instead, the common language runtime tries to load the assembly into the calling application domain. The assemblies that are loaded into the two application domains might be different if the path settings for the two application domains are different.

> **Note:**
> If both the `Name` property and the `CodeBase` property are set, the first attempt to load the assembly uses the display name (including version, culture, and so on, as returned by the `FullName` property). If the file is not found, the `CodeBase` property is used to search for the assembly. If the assembly is found using `AssemblyName.CodeBase`, the display name is matched against the assembly. If the match fails, a `FileLoadException` is thrown.

## AppDomain.Load(String) method

```csharp
public System.Reflection.Assembly Load (string assemblyString);
```

Loads an `Assembly` given its display name.

Parameters:

- `assemblyString`: The display name of the assembly. See `Assembly.FullName`.

Returns: The loaded assembly.

Exceptions:

- `ArgumentNullException`: `assemblyString` is `null`
- `FileNotFoundException`: `assemblyString` is not found.
- `BadImageFormatException`: `assemblyString` is not a valid assembly for the currently loaded runtime.
- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.
- `FileLoadException`: An assembly or module was loaded twice with two different evidences.

#### Remarks
For information that is common to all overloads of this method, see the `Load` method overload.

## AppDomain.Load(Byte[], Byte[]) method

```csharp
public System.Reflection.Assembly Load (byte[] rawAssembly, byte[]? rawSymbolStore);
```

Loads the `Assembly` with a common object file format (COFF) based image containing an emitted `Assembly`. The raw bytes representing the symbols for the `Assembly` are also loaded.

Parameters:

- `rawAssembly`: An array of type `byte` that is a COFF-based image containing an emitted assembly.
- `rawSymbolStore`: An array of type `byte` containing the raw bytes representing the symbols for the assembly.

Returns: The loaded assembly.

Exceptions:

- `ArgumentNullException`: `rawAssembly` is `null`.
- `BadImageFormatException`: `rawAssembly` is not a valid assembly for the currently loaded runtime.
- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.
- `FileLoadException`: An assembly or module was loaded twice with two different evidences.

#### Remarks
For information that is common to all overloads of this method, see the `Load` method overload.

## AppDomain.ReflectionOnlyGetAssemblies() method

```csharp
public System.Reflection.Assembly[] ReflectionOnlyGetAssemblies ();
```

Returns the assemblies that have been loaded into the reflection-only context of the application domain.

Returns: An array of `Assembly` objects that represent the assemblies loaded into the reflection-only context of the application domain.

Exceptions:

- `AppDomainUnloadedException`: An operation is attempted on an unloaded application domain.

#### Remarks
This method returns the assemblies that have been loaded into the reflection-only context. To get the assemblies that have been loaded for execution, use the `AppDomain.GetAssemblies` method.

#### Examples
The following code example loads the System.dll assembly into the execution context and then into the reflection-only context. The `AppDomain.GetAssemblies` and `AppDomain.ReflectionOnlyGetAssemblies` methods are used to display the assemblies loaded into each context.

_Code sample not included: ~/snippets/csharp/System/AppDomain/ReflectionOnlyGetAssemblies/reflectiononly.cs._

## AppDomain.SetCachePath(String) method

```csharp
public void SetCachePath (string? path);
```

Establishes the specified directory path as the location where assemblies are shadow copied.

Parameters:

- `path`: The fully qualified path to the shadow copy location.

Exceptions:

- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.

To be added.

## AppDomain.SetData(String, Object) method

```csharp
public void SetData (string name, object? data);
```

Assigns the specified value to the specified application domain property.

Parameters:

- `name`: The name of a user-defined application domain property to create or change.
- `data`: The value of the property.

Exceptions:

- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.

#### Remarks
Use this method to insert an entry, or modify the value of an entry in an internal cache of name-data pairs that describe properties of this instance of `AppDomain`.

The cache automatically contains predefined system entries that are inserted when the application domain is created. You cannot insert or modify system entries with this method. A method call that attempts to modify a system entry has no effect; the method does not throw an exception. You can inspect the values of system entries with the `AppDomain.GetData` method, or the equivalent `AppDomainSetup` properties described in `AppDomain.GetData`.

You can call this method to set the value of the default timeout interval for evaluating regular expression patterns by supply "REGEX_DEFAULT_MATCH_TIMEOUT" as the value of the `name` argument and a `TimeSpan` value that represents the timeout interval as the value of the `data` argument. You can also insert or modify your own user defined name-data pairs with this method and inspect their values with the `AppDomain.GetData` method.

#### Examples
The following example demonstrates how to use the `SetData` method to create a new value pair. The example then uses the `AppDomain.GetData` method to retrieve the value, and displays it to the console.

_Code sample not included: ~/snippets/csharp/System/AppDomain/GetData/adgetdata.cs._

## AppDomain.SetDynamicBase(String) method

```csharp
public void SetDynamicBase (string? path);
```

Establishes the specified directory path as the base directory for subdirectories where dynamically generated files are stored and accessed.

Parameters:

- `path`: The fully qualified path that is the base directory for subdirectories where dynamic assemblies are stored.

Exceptions:

- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.

To be added.

## AppDomain.SetPrincipalPolicy(PrincipalPolicy) method

```csharp
public void SetPrincipalPolicy (System.Security.Principal.PrincipalPolicy policy);
```

Specifies how principal and identity objects should be attached to a thread if the thread attempts to bind to a principal while executing in this application domain.

Parameters:

- `policy`: One of the `PrincipalPolicy` values that specifies the type of the principal object to attach to threads.

Exceptions:

- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.

#### Remarks
Setting this value will only be effective if you set it before using the `CurrentPrincipal` property. For example, if you set `Thread.CurrentPrincipal` to a given principal (for example, a generic principal) and then use the `AppDomain.SetPrincipalPolicy` method to set the `PrincipalPolicy` to `WindowsPrincipal`, the current principal will remain the generic principal.

#### Examples
The following example shows the effect on threads of using the `AppDomain.SetPrincipalPolicy` method to change the principal policy of the application domain. It also shows the effect of using the `AppDomain.SetThreadPrincipal` method to change the principal that is available for attaching to threads in the application domain.

_Code sample not included: ~/snippets/csharp/System/AppDomain/SetPrincipalPolicy/adprincipal.cs._

## AppDomain.SetShadowCopyFiles() method

```csharp
public void SetShadowCopyFiles ();
```

Turns on shadow copying.

Exceptions:

- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.

To be added.

## AppDomain.SetShadowCopyPath(String) method

```csharp
public void SetShadowCopyPath (string? path);
```

Establishes the specified directory path as the location of assemblies to be shadow copied.

Parameters:

- `path`: A list of directory names, where each name is separated by a semicolon.

Exceptions:

- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.

To be added.

## AppDomain.SetThreadPrincipal(IPrincipal) method

```csharp
public void SetThreadPrincipal (System.Security.Principal.IPrincipal principal);
```

Sets the default principal object to be attached to threads if they attempt to bind to a principal while executing in this application domain.

Parameters:

- `principal`: The principal object to attach to threads.

Exceptions:

- `ArgumentNullException`: `principal` is `null`.
- `PolicyException`: The thread principal has already been set.
- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.

#### Examples
The following example shows the effect of using the `AppDomain.SetThreadPrincipal` method to change the principal that is available for attaching to threads that are executing in the application domain. It also shows the effect on threads of using the `AppDomain.SetPrincipalPolicy` method to change the principal policy of the application domain.

_Code sample not included: ~/snippets/csharp/System/AppDomain/SetPrincipalPolicy/adprincipal.cs._

## AppDomain.ToString() method

```csharp
public override string ToString ();
```

Obtains a string representation that includes the friendly name of the application domain and any context policies.

Returns: A string formed by concatenating the literal string "Name:", the friendly name of the application domain, and either string representations of the context policies or the string "There are no context policies."

Exceptions:

- `AppDomainUnloadedException`: The application domain represented by the current `AppDomain` has been unloaded.

To be added.

## AppDomain.Unload(AppDomain) method

```csharp
public static void Unload (AppDomain domain);
```

Unloads the specified application domain.

Parameters:

- `domain`: An application domain to unload.

Exceptions:

- `ArgumentNullException`: `domain` is `null`.
- `CannotUnloadAppDomainException`: In all cases.
- `Exception`: An error occurred during the unload process.

To be added.

## AppDomain.AssemblyLoad event

```csharp
public event AssemblyLoadEventHandler? AssemblyLoad;
```

Occurs when an assembly is loaded.

#### Remarks
The `AssemblyLoadEventHandler` delegate for this event indicates what assembly was loaded.

To register an event handler for this event, you must have the required permissions, or a `SecurityException` is thrown.

For more information about handling events, see Handling and Raising Events.

#### Examples
The following sample demonstrates the `AssemblyLoad` event.

For this code example to run, you must provide the fully qualified assembly name. For information about how to obtain the fully qualified assembly name, see Assembly Names.

_Code sample not included: ~/snippets/csharp/System/AppDomain/AssemblyLoad/assemblyload.cs._
