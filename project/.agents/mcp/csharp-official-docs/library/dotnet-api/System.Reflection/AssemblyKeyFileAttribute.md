---
title: "AssemblyKeyFileAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/AssemblyKeyFileAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssemblyKeyFileAttribute class

Namespace: `System.Reflection`

```csharp
public sealed class AssemblyKeyFileAttribute : Attribute
```

Specifies the name of a file containing the key pair used to generate a strong name.

#### Remarks
When building a strong-named assembly, the author must supply either this attribute or `AssemblyKeyNameAttribute`. If `AssemblyDelaySignAttribute` has also been specified, it is likely that this file will only contain the public key.

An example of the syntax is `[assembly:AssemblyKeyFileAttribute("myKey.snk")]`.

> **Caution:**
>  Since the path and file name persist, ensure that the string you use with `AssemblyKeyFileAttribute` does not contain sensitive information.

#### Examples
The following code example shows the use of the `AssemblyDelaySignAttribute` attribute with the `AssemblyKeyFileAttribute`. To compile this example, you must create a strong-name key file named TestPublicKey.snk using the Sn.exe (Strong Name Tool):

```console
sn -k TestPublicKey.snk
```

Compile the example as a .dll. If you compile from the command line, use the `/t:library` option.

_Code sample not included: ~/snippets/csharp/System.Reflection/AssemblyDelaySignAttribute/Overview/source.cs._

## AssemblyKeyFileAttribute.AssemblyKeyFileAttribute(String) constructor

```csharp
public AssemblyKeyFileAttribute (string keyFile);
```

Initializes a new instance of the `AssemblyKeyFileAttribute` class with the name of the file containing the key pair to generate a strong name for the assembly being attributed.

Parameters:

- `keyFile`: The name of the file containing the key pair.

#### Remarks
There is no default path for the `AssemblyKeyFileAttribute` constructor. The value set by the constructor is interpreted by the linker, or by Microsoft Visual Studio 2005, that invokes the linker.

The default setting for the Al.exe (Assembly Linker) tool assumes that the key file is in the current directory. In Visual Studio 2005, the Visual Basic and Visual C# compilers build and link to subdirectories of the project directory, so if you put the key file in the project directory the relative path might be "..\\..\keyfile.snk" or "..\keyfile.snk" in Visual Basic, or "..\\\\..\\\keyfile.snk" or "..\\\keyfile.snk" in C#. For C#, this attribute can be set in the project properties.

> **Caution:**
>  Because the path and file name persist, ensure that the string you use with `AssemblyKeyFileAttribute` does not contain sensitive information.

## AssemblyKeyFileAttribute.KeyFile property

```csharp
public string KeyFile { get; }
```

Gets the name of the file containing the key pair used to generate a strong name for the attributed assembly.

Returns: A string containing the name of the file that contains the key pair.

#### Remarks

> **Caution:**
>  Because the path and file name persist, ensure that the string you use with `AssemblyKeyFileAttribute` does not contain sensitive information.
