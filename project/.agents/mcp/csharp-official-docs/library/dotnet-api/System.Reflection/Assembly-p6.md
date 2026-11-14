---
title: "Assembly class (part 6 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/Assembly.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Assembly class (part 6 of 6)

## Assembly.op_Equality(Assembly, Assembly) method

```csharp
public static bool operator == (System.Reflection.Assembly? left, System.Reflection.Assembly? right);
```

Indicates whether two `Assembly` objects are equal.

Parameters:

- `left`: The assembly to compare to `right`.
- `right`: The assembly to compare to `left`.

Returns: `true` if `left` is equal to `right`; otherwise, `false`.

To be added.

## Assembly.op_Inequality(Assembly, Assembly) method

```csharp
public static bool operator != (System.Reflection.Assembly? left, System.Reflection.Assembly? right);
```

Indicates whether two `Assembly` objects are not equal.

Parameters:

- `left`: The assembly to compare to `right`.
- `right`: The assembly to compare to `left`.

Returns: `true` if `left` is not equal to `right`; otherwise, `false`.

To be added.

## Assembly.ReflectionOnlyLoad(Byte[]) method

```csharp
public static System.Reflection.Assembly ReflectionOnlyLoad (byte[] rawAssembly);
```

Loads the assembly from a common object file format (COFF)-based image containing an emitted assembly. The assembly is loaded into the reflection-only context of the application domain.

Parameters:

- `rawAssembly`: A byte array that is a COFF-based image containing an emitted assembly.

Returns: The loaded assembly.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## Assembly.ReflectionOnlyLoad(String) method

```csharp
public static System.Reflection.Assembly ReflectionOnlyLoad (string assemblyString);
```

Loads an assembly into the reflection-only context, given its display name.

Parameters:

- `assemblyString`: The display name of the assembly, as returned by the `AssemblyName.FullName` property.

Returns: The loaded assembly.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## Assembly.ReflectionOnlyLoadFrom(String) method

```csharp
public static System.Reflection.Assembly ReflectionOnlyLoadFrom (string assemblyFile);
```

Loads an assembly into the reflection-only context, given its path.

Parameters:

- `assemblyFile`: The path of the file that contains the manifest of the assembly.

Returns: The loaded assembly.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## Assembly.SetEntryAssembly(Assembly) method

```csharp
public static void SetEntryAssembly (System.Reflection.Assembly? assembly);
```

Sets the application's entry assembly to the provided assembly object.

Parameters:

- `assembly`: Assembly object that represents the application's new entry assembly.

The assembly passed to this function has to be a runtime defined Assembly

type object. Otherwise, an exception will be thrown.

## Assembly.ToString() method

```csharp
public override string ToString ();
```

Returns the full name of the assembly, also known as the display name.

Returns: The full name of the assembly, or the class name if the full name of the assembly cannot be determined.

To be added.

## Assembly.UnsafeLoadFrom(String) method

```csharp
public static System.Reflection.Assembly UnsafeLoadFrom (string assemblyFile);
```

Loads an assembly into the load-from context, bypassing some security checks.

Parameters:

- `assemblyFile`: The name or path of the file that contains the manifest of the assembly.

Returns: The loaded assembly.

Exceptions:

- `ArgumentNullException`: `assemblyFile` is `null`.
- `FileNotFoundException`: `assemblyFile` is not found, or the module you are trying to load does not specify a filename extension.
- `FileLoadException`: A file that was found could not be loaded.
- `BadImageFormatException`: `assemblyFile` is not a valid assembly for the currently loaded runtime.
- `SecurityException`: A codebase that does not start with "file://" was specified without the required `WebPermission`.
- `ArgumentException`: The `assemblyFile` parameter is an empty string ("").
- `PathTooLongException`: The assembly name exceeds the system-defined maximum length.

Use this method to load a local assembly that the operating system has flagged as having been loaded from the Web (for example, a temporary file that was downloaded from the Internet or intranet).

## Assembly.ModuleResolve event

```csharp
public virtual event System.Reflection.ModuleResolveEventHandler? ModuleResolve;
```

Occurs when the common language runtime class loader cannot resolve a reference to an internal module of an assembly through normal means.

#### Remarks
This event gives the callback a chance to find and load the module itself and return it.
