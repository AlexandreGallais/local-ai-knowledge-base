---
title: "ObfuscateAssemblyAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/ObfuscateAssemblyAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ObfuscateAssemblyAttribute class

Namespace: `System.Reflection`

```csharp
public sealed class ObfuscateAssemblyAttribute : Attribute
```

Instructs obfuscation tools to use their standard obfuscation rules for the appropriate assembly type.

#### Remarks
The `ObfuscationAttribute` and `ObfuscateAssemblyAttribute` attributes provide a way for assembly authors to annotate their binaries so that obfuscation tools can process them correctly with minimal external configuration.

Applying this attribute to an assembly tells the obfuscation tool to use its default rules for the assembly type.

> **Important:**
>  Applying this attribute does not automatically obfuscate the assembly. Applying the attribute is an alternative to creating a configuration file for the obfuscation tool. That is, it merely provides instructions for an obfuscation tool. Microsoft recommends that vendors of obfuscation tools follow the semantics described here. However, there is no guarantee that a particular tool follows Microsoft recommendations.

You can apply `ObfuscationAttribute` to types within an assembly, and to members on those types. The innermost attribute controls the way an obfuscation tool treats any particular code entity.

#### Examples
The following code example shows a private assembly that has been marked with the `ObfuscateAssemblyAttribute`. The `StripAfterObfuscation` property is `false`, to prevent the obfuscation tool from stripping the attribute after processing.

For a code example that shows the use of `ObfuscateAssemblyAttribute` with `ObfuscationAttribute`, see the `ObfuscationAttribute` class.

_Code sample not included: ~/snippets/csharp/System.Reflection/ObfuscateAssemblyAttribute/Overview/source.cs._

## ObfuscateAssemblyAttribute.ObfuscateAssemblyAttribute(Boolean) constructor

```csharp
public ObfuscateAssemblyAttribute (bool assemblyIsPrivate);
```

Initializes a new instance of the `ObfuscateAssemblyAttribute` class, specifying whether the assembly to be obfuscated is public or private.

Parameters:

- `assemblyIsPrivate`: `true` if the assembly is used within the scope of one application; otherwise, `false`.

#### Remarks
Mark assemblies as private if they are used only by your application, and are not libraries to be used by other software. Generally, marking an assembly as private tells an obfuscator that it can obfuscate the names of all methods, including public methods, as part of obfuscating an application. If an assembly is public, an obfuscator should not obfuscate the names of public members.

> **Important:**
>  Applying this attribute does not automatically obfuscate the assembly. Applying the attribute is an alternative to creating a configuration file for the obfuscation tool. That is, it merely provides instructions for an obfuscation tool. Microsoft recommends that vendors of obfuscation tools follow the semantics described here. However, there is no guarantee that a particular tool follows Microsoft recommendations.

#### Examples
The following code example shows how the attribute constructor specifies that an assembly is private. The `StripAfterObfuscation` property is `false`, to prevent the obfuscation tool from stripping the attribute after processing.

_Code sample not included: ~/snippets/csharp/System.Reflection/ObfuscateAssemblyAttribute/Overview/source.cs._

## ObfuscateAssemblyAttribute.AssemblyIsPrivate property

```csharp
public bool AssemblyIsPrivate { get; }
```

Gets a `Boolean` value indicating whether the assembly was marked private.

Returns: `true` if the assembly was marked private; otherwise, `false`.

#### Remarks
A private assembly is used only by the application of which it is a part, and not by other software.

> **Important:**
>  Applying this attribute does not automatically obfuscate the assembly. Applying the attribute is an alternative to creating a configuration file for the obfuscation tool. That is, it merely provides instructions for an obfuscation tool. Microsoft recommends that vendors of obfuscation tools follow the semantics described here. However, there is no guarantee that a particular tool follows Microsoft recommendations.

#### Examples
The following code example shows how the attribute constructor sets the `AssemblyIsPrivate` property to `true`, to specify that an assembly is private. The `StripAfterObfuscation` property is `false`, to prevent the obfuscation tool from stripping the attribute after processing.

_Code sample not included: ~/snippets/csharp/System.Reflection/ObfuscateAssemblyAttribute/Overview/source.cs._

## ObfuscateAssemblyAttribute.StripAfterObfuscation property

```csharp
public bool StripAfterObfuscation { get; set; }
```

Gets or sets a `Boolean` value indicating whether the obfuscation tool should remove the attribute after processing.

Returns: `true` if the obfuscation tool should remove the attribute after processing; otherwise, `false`. The default value for this property is `true`.

#### Remarks
Attributes should not be stripped if your library will be included as part of another application, and obfuscated as part of that application.

Specifying that obfuscation tools should strip the `ObfuscateAssemblyAttribute` does not affect instances of `ObfuscationAttribute` that have been applied to types and members within the assembly.

> **Important:**
>  Applying this attribute does not automatically obfuscate the assembly. Applying the attribute is an alternative to creating a configuration file for the obfuscation tool. That is, it merely provides instructions for an obfuscation tool. Microsoft recommends that vendors of obfuscation tools follow the semantics described here. However, there is no guarantee that a particular tool follows Microsoft recommendations.

#### Examples
The following code example shows the `ObfuscateAssemblyAttribute` attribute with the `StripAfterObfuscation` property set to `false`, to prevent the obfuscation tool from stripping the attribute after processing.

_Code sample not included: ~/snippets/csharp/System.Reflection/ObfuscateAssemblyAttribute/Overview/source.cs._
