---
title: "PathAssemblyResolver class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/PathAssemblyResolver.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PathAssemblyResolver class

Namespace: `System.Reflection`

```csharp
public class PathAssemblyResolver : System.Reflection.MetadataAssemblyResolver
```

Represents a metadata assembly resolver that uses paths to every assembly that may be loaded.

#### Remarks

The file name is expected to be the same as the assembly's simple name. Multiple assemblies can exist on disk with the same name but in different directories. A single instance of `PathAssemblyResolver` can be used with multiple `MetadataAssemblyResolver` instances.

In order for an `AssemblyName` to match a loaded assembly, `Name` must be equal (casing ignored).

* If a public key token is specified for the `AssemblyName`, it must be equal.
* If a public key token is not specified for `AssemblyName`, assemblies with no public key token are selected over those with a public key token.
* If more than one assembly matches, the assembly with the highest `Version` is returned.
* `CultureName` is ignored.

## PathAssemblyResolver.PathAssemblyResolver(String>) constructor

```csharp
public PathAssemblyResolver (System.Collections.Generic.IEnumerable<string> assemblyPaths);
```

Initializes a new instance of the `PathAssemblyResolver` class.

Parameters:

- `assemblyPaths`: A collection of assembly path strings.

Exceptions:

- `ArgumentNullException`: `assemblyPaths` is `null`.
- `ArgumentException`: One of the paths in `assemblyPaths` is invalid.

To be added.

## PathAssemblyResolver.Resolve(MetadataLoadContext, AssemblyName) method

```csharp
public override System.Reflection.Assembly? Resolve (System.Reflection.MetadataLoadContext context, System.Reflection.AssemblyName assemblyName);
```

Returns an assembly from a given assembly name.

Parameters:

- `context`: The metadata load context object that represents the closed universe of `Type` objects loaded for inspection-only purposes.
- `assemblyName`: The name of the assembly.

Returns: The assembly for the provided `assemblyName`.

#### Remarks

For more information, see the `MetadataAssemblyResolver` remarks.
