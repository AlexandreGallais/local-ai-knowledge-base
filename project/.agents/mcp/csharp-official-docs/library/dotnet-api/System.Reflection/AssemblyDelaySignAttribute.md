---
title: "AssemblyDelaySignAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/AssemblyDelaySignAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssemblyDelaySignAttribute class

Namespace: `System.Reflection`

```csharp
public sealed class AssemblyDelaySignAttribute : Attribute
```

Specifies that the assembly is not fully signed when created.

#### Remarks
When this attribute is used on an assembly, space is reserved for the signature, which is later filled by a signing tool such as the Sn.exe utility. Delayed signing is used when the author of the assembly does not have access to the private key that will be used to generate the signature, as in `[assembly:AssemblyDelaySignAttribute(true)]`.

The classes in `System.Runtime.CompilerServices` are intended for use by compilers only. Do not use them unless you are building a compiler.

For more information, see the Common Language Infrastructure (CLI) documentation, especially "Partition II: Metadata Definition and Semantics".

#### Examples
The following code example shows the use of the `AssemblyDelaySignAttribute` attribute with the `AssemblyKeyFileAttribute`. To compile this example, you must create a strong-name key file named TestPublicKey.snk using the Sn.exe (Strong Name Tool):

```console
sn -k TestPublicKey.snk
```

Compile the example as a .dll. If you compile from the command line, use the `/t:library` option.

_Code sample not included: ~/snippets/csharp/System.Reflection/AssemblyDelaySignAttribute/Overview/source.cs._

## AssemblyDelaySignAttribute.AssemblyDelaySignAttribute(Boolean) constructor

```csharp
public AssemblyDelaySignAttribute (bool delaySign);
```

Initializes a new instance of the `AssemblyDelaySignAttribute` class.

Parameters:

- `delaySign`: `true` if the feature this attribute represents is activated; otherwise, `false`.

To be added.

## AssemblyDelaySignAttribute.DelaySign property

```csharp
public bool DelaySign { get; }
```

Gets a value indicating the state of the attribute.

Returns: `true` if this assembly has been built as delay-signed; otherwise, `false`.

To be added.
