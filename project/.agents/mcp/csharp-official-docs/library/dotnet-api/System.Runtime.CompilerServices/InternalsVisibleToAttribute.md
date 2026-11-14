---
title: "InternalsVisibleToAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/InternalsVisibleToAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InternalsVisibleToAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class InternalsVisibleToAttribute : Attribute
```

Specifies that types that are ordinarily visible only within the current assembly are visible to a specified assembly.

The `InternalsVisibleToAttribute` attribute specifies that types that are ordinarily visible only within the current assembly are visible to a specified assembly.

Ordinarily, types and members with `internal` scope in C# or `Friend` scope in Visual Basic are visible only in the assembly in which they are defined. Types and members with `protected internal` scope (`Protected Friend` scope in Visual Basic) are visible only in their own assembly or to types that derive from their containing class. Types and members with `private protected` scope (`Private Protected` scope in Visual Basic) are visible in the containing class or in types that derive from their containing class within the current assembly.

The `InternalsVisibleToAttribute` attribute makes these types and members also visible to the types in a specified assembly, which is known as a friend assembly. This applies only to `internal` (`Friend` in Visual Basic), `protected internal`(`Protected Friend` in Visual Basic), and `private protected` (`Private Protected` in Visual Basic) members, but not `private` ones.

> **Note:**
> In the case of `private protected` (`Private Protected` in Visual Basic) members, the `InternalsVisibleToAttribute` attribute extends accessibility only to types that derive from the *containing class* of the member.

The attribute is applied at the assembly level. This means that it can be included at the beginning of a source code file, or it can be included in the AssemblyInfo file in a Visual Studio project. You can use the attribute to specify a single friend assembly that can access the internal types and members of the current assembly. You can define multiple friend assemblies in two ways. They can appear as individual assembly-level attributes, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/InternalsVisibleToAttribute/Overview/Friend/multiple1.cs._

They can also appear with separate `InternalsVisibleToAttribute` tags but a single `assembly` keyword, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/InternalsVisibleToAttribute/Overview/Friend/multiple2.cs._

The friend assembly is identified by the `InternalsVisibleToAttribute.%23ctor` constructor. Both the current assembly and the friend assembly must be unsigned, or both assemblies must be signed with a strong name.

If both assemblies are unsigned, the `assemblyName` argument consists of the name of the friend assembly, specified without a directory path or file name extension.

If both assemblies are signed with a strong name, the argument to the `InternalsVisibleToAttribute.%23ctor` constructor must consist of the name of the assembly without its directory path or file name extension, along with the full public key (and not its public key token). To get the full public key of a strong-named assembly, see the Get the full public key <example-value> later in this article. For more information about using `InternalsVisibleToAttribute` with strong-named assemblies, see the `InternalsVisibleToAttribute.%23ctor` constructor.

Do not include values for the `CultureInfo`, `Version`, or `ProcessorArchitecture` field in the argument; the Visual Basic, C#, and C++ compilers treat this as a compiler error. If you use a compiler that does not treat it as an error (such as the IL Assembler (ILAsm.exe)) and the assemblies are strong-named, a `MethodAccessException` exception is thrown the first time the specified friend assembly accesses the assembly that contains the `InternalsVisibleToAttribute` attribute.

For more information about how to use this attribute, see Friend assemblies and C++ friend assemblies.

#### Get the full public key

You can use the Strong Name Tool (Sn.exe) to retrieve the full public key from a strong-named key (.snk) file. To do this, you perform the following steps:

1. Extract the public key from the strong-named key file to a separate file:

`Sn -p  <snk_file> <outfile>`

2. Display the full public key to the console:

`Sn -tp <outfile>`

3. Copy and paste the full public key value into your source code.

#### Compile the friend assembly with C\#

If you use the C# compiler to compile the friend assembly, you must explicitly specify the name of the output file (.exe or .dll) by using the **/out** compiler option. This is required because the compiler has not yet generated the name for the assembly it is building at the time it is binding to external references. The **/out** compiler option is optional for the Visual Basic <example-value>, and the corresponding **-out** or **-o** compiler option should not be used when compiling friend assemblies with the F# compiler.

#### Compile the friend assembly with C++

In C++, in order to make the internal members enabled by the `InternalsVisibleToAttribute` attribute accessible to a friend assembly, you must use the `as_friend` attribute in the C++  directive. For more information, see Friend Assemblies (C++).

**Signed assemblies**

The following example uses the `InternalsVisibleToAttribute` attribute to make an `internal` method named `AppendDirectorySeparator` in a signed assembly visible to another signed assembly. It defines a `FileUtilities` class that includes an internal `AppendDirectorySeparator` method. The `InternalsVisibleToAttribute` attribute is applied to the assembly that contains the `FileUtilities` class. The attribute allows an assembly named `Friend1` to access this internal member.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/InternalsVisibleToAttribute/Overview/Friend/assembly1.cs._

If the following example is compiled into a strong-named assembly named `Friend1`, the `Example.Main` method in `Friend1` can successfully call the `FileUtilities.AppendDirectorySeparator` method, although the method is internal to the `Assembly1` assembly. If you're compiling in C# from the command line, you must use the **/out** compiler switch to ensure that the name of the friend assembly is available when the compiler binds to external references.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/InternalsVisibleToAttribute/Overview/Friend/friend1.cs._

**Unsigned assemblies**

The following example uses the `InternalsVisibleToAttribute` attribute to make an `internal` member of an unsigned assembly visible to another unsigned assembly. The attribute ensures that the `internal` `StringLib.IsFirstLetterUpperCase` method in an assembly named `UtilityLib` is visible to the code in an assembly named `Friend2`. The following is the source code for UtilityLib.dll:

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/InternalsVisibleToAttribute/Overview/UtilityLib/utilitylib.cs._

The following example provides the source code for the `Friend2` assembly. Note that if you are compiling in C# from the command line, you must use the **/out** compiler switch to ensure that the name of the friend assembly is available when the compiler binds to external references.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/InternalsVisibleToAttribute/Overview/Friend/friend2.cs._

## InternalsVisibleToAttribute.InternalsVisibleToAttribute(String) constructor

```csharp
public InternalsVisibleToAttribute (string assemblyName);
```

Initializes a new instance of the `InternalsVisibleToAttribute` class with the name of the specified friend assembly.

Parameters:

- `assemblyName`: The name of a friend assembly.

#### Remarks
The `InternalsVisibleToAttribute.%23ctor` constructor defines a friend assembly, which is an assembly that has access to the internal and private protected types and members of the current assembly.

Both the current assembly and the friend assembly must be unsigned, or both must be signed with a strong name. (For more information about strong-named assemblies, see Create and use strong-named assemblies.) If both are unsigned, the `assemblyName` argument consists of the name of the friend assembly, specified without a directory path or file extension. If both are signed, `assemblyName` consists of the name of the friend assembly without its directory path or file name extension, along with its full public key (but not its public key token). The other components of a strong name, such as those that provide culture, version, or processor architecture information, cannot be specified in the `assemblyName` argument.

> **Important:**
> If you use the C# compiler to compile the friend assembly, you must explicitly specify the name of the output file (.exe or .dll) by using the **/out** compiler option. This is required because the compiler has not yet generated the name for the assembly it is building at the time it is binding to external references. The **/out** compiler option is optional for the Visual Basic <example-value>, and the corresponding **-out** or **-o** compiler option should not be used when compiling friend assemblies with the F# compiler.

You can use Sn.exe (Strong Name Tool) to retrieve the full public key from a strong-named key (.snk) file. To do this, you perform the following steps:

1. Extract the public key from the strong-named key file to a separate file:

**Sn -p**  *snk_file* *outfile*

2. Display the full public key to the console:

**Sn -tp**  *outfile*

3. Copy and paste the full public key value into your source code.

For more information about how to use the `InternalsVisibleToAttribute` attribute, see Friend assemblies.

#### Examples
**Signed assemblies**

The following example uses the `InternalsVisibleToAttribute` attribute to make an `internal` method named `AppendDirectorySeparator` in a signed assembly visible to another signed assembly. It defines a `FileUtilities` class that includes an internal `AppendDirectorySeparator` method. The `InternalsVisibleToAttribute` attribute is applied to the assembly that contains the `FileUtilities` class. The attribute allows an assembly named `Friend1` to access this internal member.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/InternalsVisibleToAttribute/Overview/Friend/assembly1.cs._

If the following example is compiled into a strong-named assembly named `Friend1`, it can successfully call the `FileUtilities.AppendDirectorySeparator` method, even though the method is internal to the `Assembly1` assembly. Note that if you are compiling in C# from the command line, you must use the **/out** compiler switch to ensure that the name of the friend assembly is available when the compiler binds to external references.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/InternalsVisibleToAttribute/Overview/Friend/friend1.cs._

The following example uses the `InternalsVisibleToAttribute` attribute to make an `internal` member of an unsigned assembly visible to another unsigned assembly. The attribute ensures that the `internal` `StringLib.IsFirstLetterUpperCase` method in an assembly named `UtilityLib` is visible to the code in an assembly named `Friend2`. The following is the source code for UtilityLib.dll:

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/InternalsVisibleToAttribute/Overview/UtilityLib/utilitylib.cs._

**Unsigned assemblies**

The following example provides the source code for the `Friend2` assembly. Note that if you are compiling in C# from the command line, you must use the **/out** compiler switch to ensure that the name of the friend assembly is available when the compiler binds to external references.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/InternalsVisibleToAttribute/Overview/Friend/friend2.cs._

## InternalsVisibleToAttribute.AllInternalsVisible property

```csharp
public bool AllInternalsVisible { get; set; }
```

This property is not implemented.

Returns: This property does not return a value.

To be added.

## InternalsVisibleToAttribute.AssemblyName property

```csharp
public string AssemblyName { get; }
```

Gets the name of the friend assembly to which all types and type members that are marked with the `internal` keyword are to be made visible.

Returns: A string that represents the name of the friend assembly.

#### Remarks
For more information about how to use the `InternalsVisibleToAttribute` attribute, see the following topics:

- Friend Assemblies (C++)

- Friend assemblies
