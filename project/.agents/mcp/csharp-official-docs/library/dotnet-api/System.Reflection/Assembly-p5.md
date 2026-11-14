---
title: "Assembly class (part 5 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/Assembly.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Assembly class (part 5 of 6)

## Assembly.GetType(String, Boolean, Boolean) method

```csharp
public virtual Type? GetType (string name, bool throwOnError, bool ignoreCase);
```

Gets the `Type` object with the specified name in the assembly instance, with the options of ignoring the case, and of throwing an exception if the type is not found.

Parameters:

- `name`: The full name of the type.
- `throwOnError`: `true` to throw an exception if the type is not found; `false` to return `null`.
- `ignoreCase`: `true` to ignore the case of the type name; otherwise, `false`.

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

## Assembly.GetTypes() method

```csharp
public virtual Type[] GetTypes ();
```

Gets all types defined in this assembly.

Returns: An array that contains all the types that are defined in this assembly.

Exceptions:

- `ReflectionTypeLoadException`: The assembly contains one or more types that cannot be loaded. The array returned by the `ReflectionTypeLoadException.Types` property of this exception contains a `Type` object for each type that was loaded and `null` for each type that could not be loaded, while the `ReflectionTypeLoadException.LoaderExceptions` property contains an exception for each type that could not be loaded.

#### Remarks
The returned array includes nested and non-public types. To retrieve only public types, use the `Assembly.GetExportedTypes` method.

If the `Assembly.GetTypes` method is called on an assembly and a type in that assembly is dependent on a type in an assembly that has not been loaded (for example, if it derives from a type in the second assembly), a `ReflectionTypeLoadException` is thrown. For example, this can happen if the first assembly was loaded with the `Assembly.ReflectionOnlyLoad` or `Assembly.ReflectionOnlyLoadFrom` methods, and the second assembly was not loaded. It can also happen with assemblies loaded using the `Assembly.Load` and `Assembly.LoadFile` methods if the second assembly cannot be located when the `Assembly.GetTypes` method is called.

> **Note:**
>  If a type has been forwarded to another assembly, it is not included in the returned array. For information on type forwarding, see Type Forwarding in the Common Language Runtime.

To retrieve a collection of `TypeInfo` objects instead of an array of `Type` objects, use the `DefinedTypes` property.

#### Examples
The following example displays parameters of one method on a type in the specified assembly.

_Code sample not included: ~/snippets/csharp/System.Reflection/Assembly/CodeBase/assembly.cs._

## Assembly.IsDefined(Type, Boolean) method

```csharp
public virtual bool IsDefined (Type attributeType, bool inherit);
```

Indicates whether or not a specified attribute has been applied to the assembly.

Parameters:

- `attributeType`: The type of the attribute to be checked for this assembly.
- `inherit`: This argument is ignored for objects of this type.

Returns: `true` if the attribute has been applied to the assembly; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `attributeType` is `null`.
- `ArgumentException`: `attributeType` uses an invalid type.

#### Examples
The following code example applies the `AssemblyTitleAttribute` attribute to an assembly and then uses `Assembly.IsDefined` to indicate whether it was applied. It also tests an attribute that was not applied.

_Code sample not included: ~/snippets/csharp/System.Reflection/Assembly/IsDefined/isdefined.cs._

## Assembly.Load(Byte[]) method

```csharp
public static System.Reflection.Assembly Load (byte[] rawAssembly);
```

Loads the assembly with a common object file format (COFF)-based image containing an emitted assembly.

Parameters:

- `rawAssembly`: A byte array that is a COFF-based image containing an emitted assembly.

Returns: The loaded assembly.

Exceptions:

- `ArgumentNullException`: `rawAssembly` is `null`.
- `BadImageFormatException`: `rawAssembly` is not a valid assembly for the currently loaded runtime.

#### Remarks

This method overload always creates a new `Assembly` object in its own isolated load context.

## Assembly.Load(AssemblyName) method

```csharp
public static System.Reflection.Assembly Load (System.Reflection.AssemblyName assemblyRef);
```

Loads an assembly given its `AssemblyName`.

Parameters:

- `assemblyRef`: The object that describes the assembly to be loaded.

Returns: The loaded assembly.

Exceptions:

- `ArgumentNullException`: `assemblyRef` is `null`.
- `FileNotFoundException`: `assemblyRef` is not found.
- `FileLoadException`: A file that was found could not be loaded.
- `BadImageFormatException`: `assemblyRef` is not a valid assembly for the currently loaded runtime.

#### Remarks

The target assembly will be loaded into the current `AssemblyLoadContext` or into the `AssemblyLoadContext.CurrentContextualReflectionContext` context if it's set. For more information on assembly loading, see Managed assembly loading algorithm.

#### Examples
The following example instantiates an `AssemblyName` object and uses it to load the `sysglobal.dll` assembly. The example then displays the full name of the assembly's public types.

_Code sample not included: ~/snippets/csharp/System.Reflection/Assembly/Load/Load21.cs._

## Assembly.Load(String) method

```csharp
public static System.Reflection.Assembly Load (string assemblyString);
```

Loads an assembly with the specified name.

Parameters:

- `assemblyString`: The long or short form of the assembly name.

Returns: The loaded assembly.

Exceptions:

- `ArgumentNullException`: `assemblyString` is `null`.
- `ArgumentException`: `assemblyString` is a zero-length string.
- `FileNotFoundException`: `assemblyString` is not found.
- `FileLoadException`: A file that was found could not be loaded.
- `BadImageFormatException`: `assemblyString` is not a valid assembly for the currently loaded runtime.

#### Remarks

The target assembly will be loaded into the current `AssemblyLoadContext` or into the `AssemblyLoadContext.CurrentContextualReflectionContext` context if it's set. For more information on assembly loading, see Managed assembly loading algorithm.

To load the correct assembly, it'<example-value>'s `FullName` property.

`FileLoadException` is thrown if `assemblyString` specifies the full assembly name, and the first assembly that matches the simple name has a different version, culture, or public key token. The loader does not continue probing for other assemblies that match the simple name.

#### Examples
The following example loads an assembly given its fully qualified name, and lists all the types contained in the specified assembly. For information about how to obtain the fully qualified assembly name, see Assembly Names.

_Code sample not included: ~/snippets/csharp/System.Reflection/Assembly/Load/load1.cs._

## Assembly.Load(Byte[], Byte[]) method

```csharp
public static System.Reflection.Assembly Load (byte[] rawAssembly, byte[]? rawSymbolStore);
```

Loads the assembly with a common object file format (COFF)-based image containing an emitted assembly, optionally including symbols for the assembly.

Parameters:

- `rawAssembly`: A byte array that is a COFF-based image containing an emitted assembly.
- `rawSymbolStore`: A byte array that contains the raw bytes representing the symbols for the assembly.

Returns: The loaded assembly.

Exceptions:

- `ArgumentNullException`: `rawAssembly` is `null`.
- `BadImageFormatException`: `rawAssembly` is not a valid assembly for the currently loaded runtime.

#### Remarks

The target assembly is loaded into the current `AssemblyLoadContext`. For more information on assembly loading, see Managed assembly loading algorithm.

This method overload always creates a new `Assembly` object in its own isolated load context.

## Assembly.LoadFile(String) method

```csharp
public static System.Reflection.Assembly LoadFile (string path);
```

Loads the contents of an assembly file on the specified path.

Parameters:

- `path`: The fully qualified path of the file to load.

Returns: The loaded assembly.

Exceptions:

- `ArgumentException`: The `path` argument is not an absolute path.
- `ArgumentNullException`: The `path` parameter is `null`.
- `FileLoadException`: A file that was found could not be loaded.
- `FileNotFoundException`: The `path` parameter is an empty string ("") or does not exist.
- `BadImageFormatException`: `path` is not a valid assembly for the currently loaded runtime.

#### Remarks

This API is present in .NET for compatibility, but it's recommended to use `AssemblyLoadContext` overloads instead.

## Assembly.LoadFrom(String) method

```csharp
public static System.Reflection.Assembly LoadFrom (string assemblyFile);
```

Loads an assembly given its file name or path.

Parameters:

- `assemblyFile`: The name or path of the file that contains the manifest of the assembly.

Returns: The loaded assembly.

Exceptions:

- `ArgumentNullException`: `assemblyFile` is `null`.
- `FileNotFoundException`: `assemblyFile` is not found, or the module you are trying to load does not specify a filename extension.
- `FileLoadException`: A file that was found could not be loaded.
- `BadImageFormatException`: `assemblyFile` is not a valid assembly for the currently loaded runtime; for example, a 32-bit assembly in a 64-bit process.
- `SecurityException`: A codebase that does not start with "file://" was specified without the required `WebPermission`.
- `ArgumentException`: The `assemblyFile` parameter is an empty string ("").
- `PathTooLongException`: The assembly name exceeds the system-defined maximum length.

#### Remarks

This API is present in .NET for compatibility, but it is recommended to use `AssemblyLoadContext` overloads instead.

## Assembly.LoadFrom(String, Byte[], AssemblyHashAlgorithm) method

```csharp
public static System.Reflection.Assembly LoadFrom (string assemblyFile, byte[]? hashValue, System.Configuration.Assemblies.AssemblyHashAlgorithm hashAlgorithm);
```

Loads an assembly given its file name or path, hash value, and hash algorithm.

Parameters:

- `assemblyFile`: The name or path of the file that contains the manifest of the assembly.
- `hashValue`: The value of the computed hash code.
- `hashAlgorithm`: The hash algorithm used for hashing files and for generating the strong name.

Returns: The loaded assembly.

Exceptions:

- `NotSupportedException`: In all cases.

#### Remarks

This API is not supported. This method throws `NotSupportedException` when called. Use `LoadFrom` instead.

## Assembly.LoadModule(String, Byte[]) method

```csharp
public System.Reflection.Module LoadModule (string moduleName, byte[]? rawModule);
```

Loads the module, internal to this assembly, with a common object file format (COFF)-based image containing an emitted module, or a resource file.

Parameters:

- `moduleName`: The name of the module. This string must correspond to a file name in this assembly's manifest.
- `rawModule`: A byte array that is a COFF-based image containing an emitted module, or a resource.

Returns: The loaded module.

Exceptions:

- `ArgumentNullException`: `moduleName` or `rawModule` is `null`.
- `ArgumentException`: `moduleName` does not match a file entry in this assembly's manifest.
- `BadImageFormatException`: `rawModule` is not a valid module.
- `FileLoadException`: A file that was found could not be loaded.

To be added.

## Assembly.LoadModule(String, Byte[], Byte[]) method

```csharp
public virtual System.Reflection.Module LoadModule (string moduleName, byte[]? rawModule, byte[]? rawSymbolStore);
```

Loads the module, internal to this assembly, with a common object file format (COFF)-based image containing an emitted module, or a resource file. The raw bytes representing the symbols for the module are also loaded.

Parameters:

- `moduleName`: The name of the module. This string must correspond to a file name in this assembly's manifest.
- `rawModule`: A byte array that is a COFF-based image containing an emitted module, or a resource.
- `rawSymbolStore`: A byte array containing the raw bytes representing the symbols for the module. Must be `null` if this is a resource file.

Returns: The loaded module.

Exceptions:

- `ArgumentNullException`: `moduleName` or `rawModule` is `null`.
- `ArgumentException`: `moduleName` does not match a file entry in this assembly's manifest.
- `BadImageFormatException`: `rawModule` is not a valid module.
- `FileLoadException`: A file that was found could not be loaded.

To be added.

## Assembly.LoadWithPartialName(String) method

```csharp
public static System.Reflection.Assembly? LoadWithPartialName (string partialName);
```

Loads an assembly from the application directory or from the global assembly cache using a partial name.

Parameters:

- `partialName`: The display name of the assembly.

Returns: The loaded assembly. If `partialName` is not found, this method returns `null`.

Exceptions:

- `ArgumentNullException`: The `partialName` parameter is `null`.
- `BadImageFormatException`: The assembly is not a valid assembly for the currently loaded runtime.

To be added.
