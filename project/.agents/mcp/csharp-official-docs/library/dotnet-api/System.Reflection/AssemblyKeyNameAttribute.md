---
title: "AssemblyKeyNameAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/AssemblyKeyNameAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssemblyKeyNameAttribute class

Namespace: `System.Reflection`

```csharp
public sealed class AssemblyKeyNameAttribute : Attribute
```

Specifies the name of a key <example-value> within the CSP containing the key pair used to generate a strong name.

#### Remarks
When building a strong-named assembly, the author must supply either this attribute or `AssemblyKeyFileAttribute`.

An example of the syntax is `[assembly:AssemblyKeyNameAttribute("myContainer")]`.

The classes in `System.Runtime.CompilerServices` are intended for use by compilers only. Do not use them unless you are building a compiler.

For more information, see the Common Language Infrastructure (CLI) documentation, especially "Partition II: Metadata Definition and Semantics".

## AssemblyKeyNameAttribute.AssemblyKeyNameAttribute(String) constructor

```csharp
public AssemblyKeyNameAttribute (string keyName);
```

Initializes a new instance of the `AssemblyKeyNameAttribute` class with the name of the container holding the key pair used to generate a strong name for the assembly being attributed.

Parameters:

- `keyName`: The name of the container containing the key pair.

To be added.

## AssemblyKeyNameAttribute.KeyName property

```csharp
public string KeyName { get; }
```

Gets the name of the container having the key pair that is used to generate a strong name for the attributed assembly.

Returns: A string containing the name of the container that has the relevant key pair.

To be added.
