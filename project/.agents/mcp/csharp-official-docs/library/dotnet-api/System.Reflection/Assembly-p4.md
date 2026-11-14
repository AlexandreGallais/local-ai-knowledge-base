---
title: "Assembly class (part 4 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/Assembly.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Assembly class (part 4 of 6)

## Assembly.GetManifestResourceStream(Type, String) method

```csharp
public virtual System.IO.Stream? GetManifestResourceStream (Type type, string name);
```

Loads the specified manifest resource, scoped by the namespace of the specified type, from this assembly.

Parameters:

- `type`: The type whose namespace is used to scope the manifest resource name.
- `name`: The case-sensitive name of the manifest resource being requested.

Returns: The manifest resource; or `null` if no resources were specified during compilation or if the resource is not visible to the caller.

Exceptions:

- `ArgumentNullException`: The `name` parameter is `null`.
- `ArgumentException`: The `name` parameter is an empty string ("").
- `FileLoadException`: A file that was found could not be loaded.
- `FileNotFoundException`: `name` was not found.
- `BadImageFormatException`: `name` is not a valid assembly.
- `NotImplementedException`: Resource length is greater than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks
For example, if the full name specified for `type` is "MyNameSpace.MyClasses" and `name` is "Net", this method overload searches for a resource named "MyNameSpace.Net".

A manifest resource is a resource (such as an image file) that is embedded in the assembly at compile time.

Resource information is returned only if the resource is visible to the caller, or the caller has `ReflectionPermission`.

> **Note:**
>  This method returns `null` if a private resource in another assembly is accessed and the caller does not have `ReflectionPermission` with the `MemberAccess` flag.

If the assembly manifest lists a resource file, `Assembly.GetManifestResourceStream` returns a `Stream` object even if the resource file cannot be found on disk at the time. If the resource file is not found, passing the resulting `Stream` object to the `ResourceReader` constructor causes an `ArgumentException`.

## Assembly.GetModule(String) method

```csharp
public virtual System.Reflection.Module? GetModule (string name);
```

Gets the specified module in this assembly.

Parameters:

- `name`: The name of the module being requested.

Returns: The module being requested, or `null` if the module is not found.

Exceptions:

- `ArgumentNullException`: The `name` parameter is `null`.
- `ArgumentException`: The `name` parameter is an empty string ("").
- `FileLoadException`: A file that was found could not be loaded.
- `FileNotFoundException`: `name` was not found.
- `BadImageFormatException`: `name` is not a valid assembly.

#### Remarks
This method works on file names.

Classes in the `Reflection.Emit` namespace emit the scope name for a dynamic module. The scope name can be determined by the `ScopeName` property. Pass the kind of module you want to `Assembly.GetModule`. For example, if you want the module that contains the assembly manifest, pass the scope name of the module to `GetModule`. Otherwise, pass the file name of the module. Assemblies loaded by one of the `Load` methods that have a byte[] parameter have only one module, and that is the manifest module. Always seek these modules using the scope name.

A type can be retrieved from a specific module using `Module.GetType`. Calling `Module.GetType` on the module containing the manifest will not initiate a search of the entire assembly. To retrieve a type from an assembly, regardless of which module it is in, you must call `Assembly.GetType`.

## Assembly.GetModules() method

```csharp
public System.Reflection.Module[] GetModules ();
```

Gets all the modules that are part of this assembly.

Returns: An array of modules.

Exceptions:

- `FileNotFoundException`: The module to be loaded does not specify a file name extension.

#### Remarks
This method works on public and private resource files.

> **Note:**
>  Modules must be emitted with file name extensions.

#### Examples
The following example displays the name of the module in the returned array that contains the assembly manifest.

_Code sample not included: ~/snippets/csharp/System.Reflection/Assembly/GetModules/source.cs._

## Assembly.GetModules(Boolean) method

```csharp
public virtual System.Reflection.Module[] GetModules (bool getResourceModules);
```

Gets all the modules that are part of this assembly, specifying whether to include resource modules.

Parameters:

- `getResourceModules`: `true` to include resource modules; otherwise, `false`.

Returns: An array of modules.

#### Remarks
This method works on public and private resource files.

> **Note:**
>  Modules must be emitted with file name extensions.

## Assembly.GetName() method

```csharp
public virtual System.Reflection.AssemblyName GetName ();
```

Gets an `AssemblyName` for this assembly.

Returns: An object that contains the fully parsed display name for this assembly.

To be added.

## Assembly.GetName(Boolean) method

```csharp
public virtual System.Reflection.AssemblyName GetName (bool copiedName);
```

Gets an `AssemblyName` for this assembly, setting the codebase as specified by `copiedName`.

Parameters:

- `copiedName`: `true` to set the `Assembly.CodeBase` to the location of the assembly after it was shadow copied; `false` to set `Assembly.CodeBase` to the original location.

Returns: An object that contains the fully parsed display name for this assembly.

To be added.

## Assembly.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public virtual void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Gets serialization information with all of the data needed to reinstantiate this assembly.

Parameters:

- `info`: The object to be populated with serialization information.
- `context`: The destination context of the serialization.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.

## Assembly.GetReferencedAssemblies() method

```csharp
public virtual System.Reflection.AssemblyName[] GetReferencedAssemblies ();
```

Gets the `AssemblyName` objects for all the assemblies referenced by this assembly.

Returns: An array that contains the fully parsed display names of all the assemblies referenced by this assembly.

#### Examples

The following code example demonstrates calling the `Assembly.GetReferencedAssemblies` method. This code example is part of a larger example provided for the `Assembly` class.

_Code sample not included: ~/snippets/csharp/System.Reflection/Assembly/GetReferencedAssemblies/Reflection.cs._

## Assembly.GetSatelliteAssembly(CultureInfo) method

```csharp
public virtual System.Reflection.Assembly GetSatelliteAssembly (System.Globalization.CultureInfo culture);
```

Gets the satellite assembly for the specified culture.

Parameters:

- `culture`: The specified culture.

Returns: The specified satellite assembly.

Exceptions:

- `ArgumentNullException`: `culture` is `null`.
- `FileNotFoundException`: The assembly cannot be found.
- `FileLoadException`: The satellite assembly with a matching file name was found, but the `CultureInfo` did not match the one specified.
- `BadImageFormatException`: The satellite assembly is not a valid assembly.

#### Remarks
Satellite assemblies contain localized resources, as distinct from main application assemblies, which contain non-localizable executable code and resources for a single culture that serve as the default or neutral culture.

Call this method to use your current assembly version.

## Assembly.GetSatelliteAssembly(CultureInfo, Version) method

```csharp
public virtual System.Reflection.Assembly GetSatelliteAssembly (System.Globalization.CultureInfo culture, Version? version);
```

Gets the specified version of the satellite assembly for the specified culture.

Parameters:

- `culture`: The specified culture.
- `version`: The version of the satellite assembly.

Returns: The specified satellite assembly.

Exceptions:

- `ArgumentNullException`: `culture` is `null`.
- `FileLoadException`: The satellite assembly with a matching file name was found, but the `CultureInfo` or the version did not match the one specified.
- `FileNotFoundException`: The assembly cannot be found.
- `BadImageFormatException`: The satellite assembly is not a valid assembly.

#### Remarks
Satellite assemblies contain localized resources, as distinct from main application assemblies, which contain non-localizable executable code and resources for a single culture that serve as the default or neutral culture.

Call the `GetSatelliteAssembly` overload to use your current assembly version.

If `version` is `null`, the current assembly version is used if both the resource and main assemblies are signed.

## Assembly.GetType(String) method

```csharp
public virtual Type? GetType (string name);
```

Gets the `Type` object with the specified name in the assembly instance.

Parameters:

- `name`: The full name of the type.

Returns: An object that represents the specified class, or `null` if the class is not found.

Exceptions:

- `ArgumentException`: `name` is invalid.
- `ArgumentNullException`: `name` is `null`.
- `FileNotFoundException`: `name` requires a dependent assembly that could not be found.
- `FileLoadException`: `name` requires a dependent assembly that was found but could not be loaded.

-or-

The current assembly was loaded into the reflection-only context, and `name` requires a dependent assembly that was not preloaded.
- `BadImageFormatException`: `name` requires a dependent assembly, but the file is not a valid assembly for the currently loaded runtime.

#### Remarks
This method only searches the current assembly instance. The `name` parameter includes the namespace but not the assembly. To search other assemblies for a type, use the `GetType` method overload, which can optionally include an assembly display name as part of the type name.

If there are assembly-qualified generic type parameters in the type name string, those assembly references will be loaded by the `AssemblyLoadContext` of the method that called Assembly.GetType, or by the `AssemblyLoadContext.CurrentContextualReflectionContext` context if it's set.

> **Note:**
>  If the type has been forwarded to another assembly, it is still returned by this method. For information on type forwarding, see Type Forwarding in the Common Language Runtime.

#### Examples
The following example defines an abstract `MeansOfTransportation` class in the `Transportation` namespace. It calls the `GetType` method to retrieve its `Type` object, calls the `Type.GetProperties` method to get an array of `PropertyInfo` objects that represent the type's properties, and then displays information on the type's abstract properties. Note that the call to the `GetType` method uses the type's fully qualified name (that is, its namespace along with its type name).

_Code sample not included: ~/snippets/csharp/System.Reflection/Assembly/GetType/gettype1.cs._

## Assembly.GetType(String, Boolean) method

```csharp
public virtual Type? GetType (string name, bool throwOnError);
```

Gets the `Type` object with the specified name in the assembly instance and optionally throws an exception if the type is not found.

Parameters:

- `name`: The full name of the type.
- `throwOnError`: `true` to throw an exception if the type is not found; `false` to return `null`.

Returns: An object that represents the specified class.

Exceptions:

- `ArgumentException`: `name` is invalid.

-or-

The length of `name` exceeds 1024 characters.
- `ArgumentNullException`: `name` is `null`.
- `TypeLoadException`: `throwOnError` is `true`, and the type cannot be found.
- `FileNotFoundException`: `name` requires a dependent assembly that could not be found.
- `FileLoadException`: `name` requires a dependent assembly that was found but could not be loaded.

-or-

The current assembly was loaded into the reflection-only context, and `name` requires a dependent assembly that was not preloaded.
- `BadImageFormatException`: `name` requires a dependent assembly, but the file is not a valid assembly for the currently loaded runtime.

#### Remarks
This method only searches the current assembly instance. The `name` parameter includes the namespace but not the assembly. To search other assemblies for a type, use the `GetType` method overload, which can optionally include an assembly display name as part of the type name.

If there are assembly-qualified generic type parameters in the type name string, those assembly references will be loaded by the `AssemblyLoadContext` of the method that called Assembly.GetType, or by the `AssemblyLoadContext.CurrentContextualReflectionContext` context if it's set.

> **Note:**
>  If the type has been forwarded to another assembly, it is still returned by this method. For information on type forwarding, see Type Forwarding in the Common Language Runtime.

The `throwOnError` parameter only affects what happens when the type is not found. It does not affect any other exceptions that might be thrown. In particular, if the type is found but cannot be loaded, `TypeLoadException` can be thrown even if `throwOnError` is `false`.
