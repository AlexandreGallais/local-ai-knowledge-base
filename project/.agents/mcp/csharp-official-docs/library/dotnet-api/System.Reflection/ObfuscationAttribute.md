---
title: "ObfuscationAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/ObfuscationAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ObfuscationAttribute class

Namespace: `System.Reflection`

```csharp
public sealed class ObfuscationAttribute : Attribute
```

Instructs obfuscation tools to take the specified actions for an assembly, type, or member.

#### Remarks
The `ObfuscationAttribute` and `ObfuscateAssemblyAttribute` attributes allow assembly authors to annotate their binaries so that obfuscation tools can process them correctly with minimal external configuration.

> **Important:**
>  Applying this attribute does not automatically obfuscate the code entity to which you apply it. Applying the attribute is an alternative to creating a configuration file for the obfuscation tool. That is, it merely provides instructions for an obfuscation tool. Microsoft recommends that vendors of obfuscation tools follow the semantics described here. However, there is no guarantee that a particular tool follows Microsoft recommendations.

The `ObfuscationAttribute` attribute has a string `Feature` property. Obfuscation tools can map the string values of this property to features they implement, preferably by using an XML configuration file that users can access. The `ObfuscationAttribute` defines two feature strings, "default" and "all". The string "default" should map to the default obfuscation features of a tool, and "all" should map to the complete set of obfuscation features supported by a tool. The default value of the `Feature` property is "all", enabling the complete set of obfuscation features.

When applied to an assembly, `ObfuscationAttribute` also applies to all types within the assembly. If the `ApplyToMembers` property is not specified, or is set to `true`, the attribute applies to all members as well. `ObfuscationAttribute` does not specify whether an assembly is public or private. To specify whether an assembly is public or private, use the `ObfuscateAssemblyAttribute` attribute.

When applied to classes and structures, `ObfuscationAttribute` also applies to all members of the type if the `ApplyToMembers` property is not specified, or is set to `true`.

When applied to methods, parameters, fields, and properties, the attribute affects only the entity to which it is applied.

#### Examples
The following code example shows a public assembly with two types: `Type1` and `Type2`. The assembly is marked for obfuscation with the `ObfuscateAssemblyAttribute`, which marks the assembly to be treated as public (that is, the `AssemblyIsPrivate` property is `false`).

`Type1` is marked for obfuscation because the assembly is marked for obfuscation. One member of `Type1` is excluded from obfuscation, using the `Exclude` property.

`Type2` is excluded from obfuscation, but its members are marked for obfuscation because the `ApplyToMembers` property is `false`.

The `MethodA` method of `Type2` is marked with the value `"default"` for the `Feature` property. It is necessary to specify `false` for the `Exclude` property to avoid excluding `MethodA` from obfuscation, because the default for the `Exclude` property is `true`. The obfuscation tool should not strip the attribute after obfuscation because the `StripAfterObfuscation` property is `false`. All the other attributes in this code example are stripped after obfuscation, because the `StripAfterObfuscation` property is not specified, and therefore defaults to `true`.

The code example includes code to display the attributes and their properties. You can also examine the attributes by opening the DLL with the Ildasm.exe (IL Disassembler).

_Code sample not included: ~/snippets/csharp/System.Reflection/ObfuscationAttribute/Overview/source.cs._

## ObfuscationAttribute.ObfuscationAttribute() constructor

```csharp
public ObfuscationAttribute ();
```

Initializes a new instance of the `ObfuscationAttribute` class.

#### Remarks
`ObfuscationAttribute` does not specify whether an assembly is public or private. To specify whether an assembly is public or private, use `ObfuscateAssemblyAttribute`.

## ObfuscationAttribute.ApplyToMembers property

```csharp
public bool ApplyToMembers { get; set; }
```

Gets or sets a `Boolean` value indicating whether the attribute of a type is to apply to the members of the type.

Returns: `true` if the attribute is to apply to the members of the type; otherwise, `false`. The default is `true`.

#### Remarks
The value of this property is ignored when the attribute is applied to a member.

> **Important:**
>  Applying this attribute does not automatically obfuscate the code entity to which you apply it. Applying the attribute is an alternative to creating a configuration file for the obfuscation tool. That is, it merely provides instructions for an obfuscation tool. Microsoft recommends that vendors of obfuscation tools follow the semantics described here. However, there is no guarantee that a particular tool follows Microsoft recommendations.

#### Examples
The following code example shows a type that is excluded from obfuscation, but the exclusion does not apply to its members because the `ApplyToMembers` property is `false`.

This code is part of a larger example that can be compiled and executed. See the `ObfuscationAttribute` class.

_Code sample not included: ~/snippets/csharp/System.Reflection/ObfuscationAttribute/Overview/source.cs._

## ObfuscationAttribute.Exclude property

```csharp
public bool Exclude { get; set; }
```

Gets or sets a `Boolean` value indicating whether the obfuscation tool should exclude the type or member from obfuscation.

Returns: `true` if the type or member to which this attribute is applied should be excluded from obfuscation; otherwise, `false`. The default is `true`.

#### Remarks

> **Important:**
>  Applying this attribute does not automatically obfuscate the code entity to which you apply it. Applying the attribute is an alternative to creating a configuration file for the obfuscation tool. That is, it merely provides instructions for an obfuscation tool. Microsoft recommends that vendors of obfuscation tools follow the semantics described here. However, there is no guarantee that a particular tool follows Microsoft recommendations.

#### Examples
The following code example shows a type that is marked to be excluded from obfuscation. It is not necessary to specify the `Exclude` property, because it defaults to `true`, but specifying it explicitly makes your intent clear. The `ObfuscationAttribute.ApplyToMembers` is set to `false`, so that the exclusion from obfuscation does not apply to the members of the class. That is, the class name is visible but the members are obfuscated.

The `MethodA` method is marked with the value `"default"` for the `Feature` property. It is necessary to specify `false` for the `Exclude` property in order to avoid excluding `MethodA` from obfuscation, because the default for the `Exclude` property is `true`. The `StripAfterObfuscation` property is `false` so that the obfuscation tool will not strip the attribute after obfuscation.

This code is part of a larger example that can be compiled and executed. See the `ObfuscationAttribute` class.

_Code sample not included: ~/snippets/csharp/System.Reflection/ObfuscationAttribute/Overview/source.cs._

## ObfuscationAttribute.Feature property

```csharp
public string? Feature { get; set; }
```

Gets or sets a string value that is recognized by the obfuscation tool, and which specifies processing options.

Returns: A string value that is recognized by the obfuscation tool, and which specifies processing options. The default is "all".

#### Remarks
The value passed to this property depends on the obfuscation tool used. It is recommended that vendors of obfuscation tools support at least "default" and "all". Vendors can use these settings in conjunction with the XML configuration file.

> **Important:**
>  Applying this attribute does not automatically obfuscate the code entity to which you apply it. Applying the attribute is an alternative to creating a configuration file for the obfuscation tool. That is, it merely provides instructions for an obfuscation tool. Microsoft recommends that vendors of obfuscation tools follow the semantics described here. However, there is no guarantee that a particular tool follows Microsoft recommendations.

#### Examples
The following code example shows a method that is marked with the value `"default"` for the `Feature` property. It is necessary to specify `false` for the `Exclude` property to avoid excluding `MethodA` from obfuscation, because the default for the `Exclude` property is `true`. The `StripAfterObfuscation` property is `false` so that the obfuscation tool will not strip the attribute after obfuscation.

This code is part of a larger example that can be compiled and executed. See the `ObfuscationAttribute` class.

_Code sample not included: ~/snippets/csharp/System.Reflection/ObfuscationAttribute/Overview/source.cs._

## ObfuscationAttribute.StripAfterObfuscation property

```csharp
public bool StripAfterObfuscation { get; set; }
```

Gets or sets a `Boolean` value indicating whether the obfuscation tool should remove this attribute after processing.

Returns: `true` if an obfuscation tool should remove the attribute after processing; otherwise, `false`. The default is `true`.

#### Remarks
Attributes should not be stripped if your library will be included as part of another application, and obfuscated as part of that application.

> **Important:**
>  Applying this attribute does not automatically obfuscate the code entity to which you apply it. Applying the attribute is an alternative to creating a configuration file for the obfuscation tool. That is, it merely provides instructions for an obfuscation tool. Microsoft recommends that vendors of obfuscation tools follow the semantics described here. However, there is no guarantee that a particular tool follows Microsoft recommendations.

#### Examples
The following code example shows an `ObfuscationAttribute` whose `StripAfterObfuscation` property is `false` so that the obfuscation tool will not strip the attribute after obfuscation. It is necessary to specify `false` for the `Exclude` property to avoid excluding `MethodA` from obfuscation, because the default for the `Exclude` property is `true`.

This code is part of a larger example that can be compiled and executed. See the `ObfuscationAttribute` class.

_Code sample not included: ~/snippets/csharp/System.Reflection/ObfuscationAttribute/Overview/source.cs._
