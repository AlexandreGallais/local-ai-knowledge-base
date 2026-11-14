---
title: "ManifestResourceInfo class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/ManifestResourceInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ManifestResourceInfo class

Namespace: `System.Reflection`

```csharp
public class ManifestResourceInfo
```

Provides access to manifest resources, which are XML files that describe application dependencies.

To be added.

## ManifestResourceInfo.ManifestResourceInfo(Assembly, String, ResourceLocation) constructor

```csharp
public ManifestResourceInfo (System.Reflection.Assembly? containingAssembly, string? containingFileName, System.Reflection.ResourceLocation resourceLocation);
```

Initializes a new instance of the `ManifestResourceInfo` class for a resource that is contained by the specified assembly and file, and that has the specified location.

Parameters:

- `containingAssembly`: The assembly that contains the manifest resource.
- `containingFileName`: The name of the file that contains the manifest resource, if the file is not the same as the manifest file.
- `resourceLocation`: A bitwise combination of enumeration values that provides information about the location of the manifest resource.

To be added.

## ManifestResourceInfo.FileName property

```csharp
public virtual string? FileName { get; }
```

Gets the name of the file that contains the manifest resource, if it is not the same as the manifest file.

Returns: The manifest resource's file name.

To be added.

## ManifestResourceInfo.ReferencedAssembly property

```csharp
public virtual System.Reflection.Assembly? ReferencedAssembly { get; }
```

Gets the containing assembly for the manifest resource.

Returns: The manifest resource's containing assembly.

To be added.

## ManifestResourceInfo.ResourceLocation property

```csharp
public virtual System.Reflection.ResourceLocation ResourceLocation { get; }
```

Gets the manifest resource's location.

Returns: A bitwise combination of `ResourceLocation` flags that indicates the location of the manifest resource.

To be added.
