---
title: "AssemblyFlagsAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/AssemblyFlagsAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssemblyFlagsAttribute class

Namespace: `System.Reflection`

```csharp
public sealed class AssemblyFlagsAttribute : Attribute
```

Specifies a bitwise combination of `AssemblyNameFlags` flags for an assembly, describing just-in-time (JIT) compiler options, whether the assembly is retargetable, and whether it has a full or tokenized public key. This class cannot be inherited.

#### Remarks
The `AssemblyNameFlags` enumeration describes the assembly characteristics that can be set using this attribute.

To access the flags that have been specified for an assembly, use the `GetName` property to obtain an `AssemblyName` object, then use the `Flags` property to obtain an `AssemblyNameFlags` value.

To specify `AssemblyNameFlags` flags for a dynamic assembly, set the `Flags` property of the `AssemblyName` object that you pass to the `AppDomain.DefineDynamicAssembly` method.

#### Examples
The following code example shows how to apply the `AssemblyFlagsAttribute` to an assembly, and how to read the flags at run time. The example also creates an instance of the attribute, and uses the `AssemblyFlags` property to display the flags. For an example of how to apply the `AssemblyFlagsAttribute` to a dynamic assembly, see the `Flags` property.

_Code sample not included: ~/snippets/csharp/System.Reflection/AssemblyFlagsAttribute/Overview/source.cs._

## AssemblyFlagsAttribute.AssemblyFlagsAttribute(Int32) constructor

```csharp
public AssemblyFlagsAttribute (int assemblyFlags);
```

Initializes a new instance of the `AssemblyFlagsAttribute` class with the specified combination of `AssemblyNameFlags` flags, cast as an integer value.

Parameters:

- `assemblyFlags`: A bitwise combination of `AssemblyNameFlags` flags, cast as an integer value, representing just-in-time (JIT) compiler options, longevity, whether an assembly is retargetable, and whether it has a full or tokenized public key.

#### Remarks
This untyped constructor is now obsolete. Do not use.

## AssemblyFlagsAttribute.AssemblyFlagsAttribute(AssemblyNameFlags) constructor

```csharp
public AssemblyFlagsAttribute (System.Reflection.AssemblyNameFlags assemblyFlags);
```

Initializes a new instance of the `AssemblyFlagsAttribute` class with the specified combination of `AssemblyNameFlags` flags.

Parameters:

- `assemblyFlags`: A bitwise combination of `AssemblyNameFlags` flags representing just-in-time (JIT) compiler options, longevity, whether an assembly is retargetable, and whether it has a full or tokenized public key.

#### Examples
The following code example shows how to apply the `AssemblyFlagsAttribute` to an assembly, and how to read the flags at run time. The example also creates an instance of the attribute, and uses the `AssemblyFlags` property to display the flags. For an example of how to apply the `AssemblyFlagsAttribute` to a dynamic assembly, see the `Flags` property.

_Code sample not included: ~/snippets/csharp/System.Reflection/AssemblyFlagsAttribute/Overview/source.cs._

## AssemblyFlagsAttribute.AssemblyFlagsAttribute(UInt32) constructor

```csharp
public AssemblyFlagsAttribute (uint flags);
```

Initializes a new instance of the `AssemblyFlagsAttribute` class with the specified combination of `AssemblyNameFlags` flags, cast as an unsigned integer value.

Parameters:

- `flags`: A bitwise combination of `AssemblyNameFlags` flags, cast as an unsigned integer value, representing just-in-time (JIT) compiler options, longevity, whether an assembly is retargetable, and whether it has a full or tokenized public key.

#### Remarks
This untyped constructor is now obsolete. Do not use.

## AssemblyFlagsAttribute.AssemblyFlags property

```csharp
public int AssemblyFlags { get; }
```

Gets an integer value representing the combination of `AssemblyNameFlags` flags specified when this attribute instance was created.

Returns: An integer value representing a bitwise combination of `AssemblyNameFlags` flags.

#### Remarks
This property returns an integer for backward compatibility. Cast the value to the `AssemblyNameFlags` type before using it.

#### Examples
The following code example shows how to apply the `AssemblyFlagsAttribute` to an assembly, and how to read the flags at run time. The example also creates an instance of the attribute, and uses the `AssemblyFlags` property to display the flags. For an example of how to apply the `AssemblyFlagsAttribute` to a dynamic assembly, see the `Flags` property.

_Code sample not included: ~/snippets/csharp/System.Reflection/AssemblyFlagsAttribute/Overview/source.cs._

## AssemblyFlagsAttribute.Flags property

```csharp
public uint Flags { get; }
```

Gets an unsigned integer value representing the combination of `AssemblyNameFlags` flags specified when this attribute instance was created.

Returns: An unsigned integer value representing a bitwise combination of `AssemblyNameFlags` flags.

To be added.
