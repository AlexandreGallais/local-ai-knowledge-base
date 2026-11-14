---
title: "Assembly class (part 1 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/Assembly.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Assembly class

Namespace: `System.Reflection`

```csharp
public abstract class Assembly : System.Reflection.ICustomAttributeProvider, System.Runtime.Serialization.ISerializable
```

Represents an assembly, which is a reusable, versionable, and self-describing building block of a common language runtime application.

#### Remarks
Use the `Assembly` class to load assemblies, to explore the metadata and constituent parts of assemblies, to discover the types contained in assemblies, and to create instances of those types.

To get an array of `Assembly` objects representing the assemblies that are currently loaded, use the `AppDomain.GetAssemblies` method.

To load assemblies dynamically, the `Assembly` class provides the following static methods:

- The `Assembly.ReflectionOnlyLoad` and `Assembly.ReflectionOnlyLoadFrom` methods enable you to load an assembly for reflection, but not for execution. For example, an assembly that targets a 64-bit platform can be examined by code that is running on a 32-bit platform.
- The `Assembly.LoadFile` and `Assembly.LoadFrom` methods load assemblies by their path.

To get an `Assembly` object for the currently executing assembly, use the `Assembly.GetExecutingAssembly` method.

Many members of the `Assembly` class provide information about an assembly. For example:

- The `Assembly.GetName` method returns an `AssemblyName` object that provides access to the parts of the assembly display name.
- The `Assembly.GetCustomAttributes` method lists the attributes applied to the assembly.
- The `Assembly.GetFiles` method provides access to the files in the assembly manifest.
- The `Assembly.GetManifestResourceNames` method provides the names of the resources in the assembly manifest.

The `Assembly.GetTypes` method lists all the types in the assembly. The `Assembly.GetExportedTypes` method lists the types that are visible to callers outside the assembly. The `Assembly.GetType` method can be used to search for a particular type in the assembly. The `Assembly.CreateInstance` method can be used to search for and create instances of types in the assembly.

#### Examples
The following code example shows how to obtain the currently executing assembly, create an instance of a type contained in that assembly, and invoke one of the type's methods with late binding. For this purpose, the code example defines a class named `Example`, with a method named `SampleMethod`. The constructor of the class accepts an integer, which is used to compute the return value of the method.

The code example also demonstrates the use of the `Assembly.GetName` method to obtain an `AssemblyName` object that can be used to parse the full name of the assembly. The example displays the version number of the assembly, the `CodeBase` property, and the `EntryPoint` property.

_Code sample not included: ~/snippets/csharp/System.Reflection/Assembly/Overview/source.cs._

## Assembly.Assembly() constructor

```csharp
protected Assembly ();
```

Initializes a new instance of the `Assembly` class.

#### Remarks
This constructor is invoked by derived classes during the construction of `Assembly` objects.

## Assembly.CodeBase property

```csharp
public virtual string? CodeBase { get; }
```

Gets the location of the assembly as specified originally, for example, in an `AssemblyName` object.

Returns: The location of the assembly as specified originally.

Exceptions:

- `NotImplementedException`: In all cases.

To be added.

## Assembly.CustomAttributes property

```csharp
public virtual System.Collections.Generic.IEnumerable<System.Reflection.CustomAttributeData> CustomAttributes { get; }
```

Gets a collection that contains this assembly's custom attributes.

Returns: A collection that contains this assembly's custom attributes.

To be added.

## Assembly.DefinedTypes property

```csharp
public virtual System.Collections.Generic.IEnumerable<System.Reflection.TypeInfo> DefinedTypes { get; }
```

Gets a collection of the types defined in this assembly.

Returns: A collection of the types defined in this assembly.

#### Remarks
The `DefinedTypes` property is comparable to the `Assembly.GetTypes` method, except that the `DefinedTypes` property returns a collection of `TypeInfo` objects, and the `Assembly.GetTypes` method returns an array of `Type` objects.

The returned array includes nested types.

## Assembly.EntryPoint property

```csharp
public virtual System.Reflection.MethodInfo? EntryPoint { get; }
```

Gets the entry point of this assembly.

Returns: An object that represents the entry point of this assembly. If no entry point is found (for example, the assembly is a DLL), `null` is returned.

To be added.

## Assembly.EscapedCodeBase property

```csharp
public virtual string EscapedCodeBase { get; }
```

Gets the URI, including escape characters, that represents the codebase.

Returns: A URI with escape characters.

To be added.

## Assembly.ExportedTypes property

```csharp
public virtual System.Collections.Generic.IEnumerable<Type> ExportedTypes { get; }
```

Gets a collection of the public types defined in this assembly that are visible outside the assembly.

Returns: A collection of the public types defined in this assembly that are visible outside the assembly.

To be added.

## Assembly.FullName property

```csharp
public virtual string? FullName { get; }
```

Gets the display name of the assembly.

Returns: The display name of the assembly.

#### Remarks
See `AssemblyName` for a description of the format of the display name of an assembly.

> **Note:**
>  Writing your own code to parse display names is not recommended. Instead, pass the display name to the `AssemblyName.%23ctor` constructor, which parses it and populates the appropriate fields of the new `AssemblyName`.

#### Examples
The following example retrieves the display name of the currently executing assembly, and the display name of the assembly that contains the `Int32` type (`int` in C#, `Integer` in Visual Basic).

_Code sample not included: ~/snippets/csharp/System.Reflection/Assembly/FullName/Example.cs._

## Assembly.GlobalAssemblyCache property

```csharp
public virtual bool GlobalAssemblyCache { get; }
```

Gets a value indicating whether the assembly was loaded from the global assembly cache (.NET Framework only).

Returns: `false` in all cases.

This property is marked obsolete and generates a compile-time warning.

## Assembly.HostContext property

```csharp
public virtual long HostContext { get; }
```

Gets the host context with which the assembly was loaded.

Returns: An `Int64` value that indicates the host context with which the assembly was loaded, if any.

To be added.

## Assembly.ImageRuntimeVersion property

```csharp
public virtual string ImageRuntimeVersion { get; }
```

Gets a string representing the version of the common language runtime (CLR) saved in the file containing the manifest.

Returns: The CLR version folder name. This is not a full path.

#### Remarks

By default, `Assembly.ImageRuntimeVersion` is set to the version of the CLR used to build the assembly. However, it might have been set to another value at compile time.

## Assembly.IsCollectible property

```csharp
public virtual bool IsCollectible { get; }
```

Gets a value that indicates whether this assembly is held in a collectible `AssemblyLoadContext`.

Returns: `true` if this assembly is held in a collectible `AssemblyLoadContext`; otherwise, `false`.

To be added.

## Assembly.IsDynamic property

```csharp
public virtual bool IsDynamic { get; }
```

Gets a value that indicates whether the current assembly was generated dynamically in the current process by using reflection emit.

Returns: `true` if the current assembly was generated dynamically in the current process; otherwise, `false`.

#### Remarks
Dynamic assemblies are represented by the derived class `AssemblyBuilder`.

When a dynamic assembly is saved to disk, the saved assembly is not dynamic. If the saved assembly is loaded into another process, the `IsDynamic` property returns `false`.

## Assembly.IsFullyTrusted property

```csharp
public bool IsFullyTrusted { get; }
```

Gets a value that indicates whether the current assembly is loaded with full trust.

Returns: `true` in all cases.

To be added.

## Assembly.Location property

```csharp
public virtual string Location { get; }
```

Gets the full path or UNC location of the loaded file that contains the manifest.

Returns: The location of the loaded file that contains the manifest. If the assembly is loaded from a byte array, such as when using `Assembly.Load`, the value returned is an empty string ("").

Exceptions:

- `NotSupportedException`: The current assembly is a dynamic assembly, represented by an `AssemblyBuilder` object.

#### Remarks

For bundled assemblies, the value returned is an empty string.

#### Examples
The following example displays the location of the loaded file that contains the manifest.

_Code sample not included: ~/snippets/csharp/System.Reflection/Assembly/CodeBase/assembly.cs._

## Assembly.ManifestModule property

```csharp
public virtual System.Reflection.Module ManifestModule { get; }
```

Gets the module that contains the manifest for the current assembly.

Returns: The module that contains the manifest for the assembly.

To be added.

## Assembly.Modules property

```csharp
public virtual System.Collections.Generic.IEnumerable<System.Reflection.Module> Modules { get; }
```

Gets a collection that contains the modules in this assembly.

Returns: A collection that contains the modules in this assembly.

To be added.

## Assembly.ReflectionOnly property

```csharp
public virtual bool ReflectionOnly { get; }
```

Gets a `Boolean` value indicating whether this assembly was loaded into the reflection-only context.

Returns: `true` if the assembly was loaded into the reflection-only context, rather than the execution context; otherwise, `false`.

#### Remarks
If an assembly has been loaded into the reflection-only context, using the `Assembly.ReflectionOnlyLoad` method, you cannot execute code in the assembly. To execute code, the assembly must be loaded into the execution context.

## Assembly.SecurityRuleSet property

```csharp
public virtual System.Security.SecurityRuleSet SecurityRuleSet { get; }
```

Gets a value that indicates which set of security rules the common language runtime (CLR) enforces for this assembly.

Returns: The security rule set that the CLR enforces for this assembly.

To be added.

## Assembly.CreateInstance(String) method

```csharp
public object? CreateInstance (string typeName);
```

Locates the specified type from this assembly and creates an instance of it using the system activator, using case-sensitive search.

Parameters:

- `typeName`: The `Type.FullName` of the type to locate.

Returns: An instance of the specified type created with the parameterless constructor; or `null` if `typeName` is not found. The type is resolved using the default binder, without specifying culture or activation attributes, and with `BindingFlags` set to `Public` or `Instance`.

Exceptions:

- `ArgumentException`: `typeName` is an empty string ("") or a string beginning with a null character.

-or-

The current assembly was loaded into the reflection-only context.
- `ArgumentNullException`: `typeName` is `null`.
- `MissingMethodException`: No matching constructor was found.
- `FileNotFoundException`: `typeName` requires a dependent assembly that could not be found.
- `FileLoadException`: `typeName` requires a dependent assembly that was found but could not be loaded.

-or-

The current assembly was loaded into the reflection-only context, and `typeName` requires a dependent assembly that was not preloaded.
- `BadImageFormatException`: `typeName` requires a dependent assembly, but the file is not a valid assembly for the currently loaded runtime.

#### Remarks
If the runtime is unable to find `typeName` in the `Assembly` instance, it returns `null` instead of throwing an exception. This might happen because:

- You haven't specified the fully qualified name of the type.

- You've specified the fully qualified type name, but its case doesn't match the case of the type's `FullName` property. For a case-insensitive comparison of `typeName` with the type's full name, call the `CreateInstance` overload and specify `true` for the `ignoreCase` argument.

- The type doesn't exist in the current `Assembly` instance.

#### Examples
The following example defines a `Person` class and calls the `CreateInstance` method to instantiate it.

_Code sample not included: ~/snippets/csharp/System.Reflection/Assembly/CreateInstance/createinstance1.cs._
