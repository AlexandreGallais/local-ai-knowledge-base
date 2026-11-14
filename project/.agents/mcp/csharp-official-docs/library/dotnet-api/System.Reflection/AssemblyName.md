---
title: "AssemblyName class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/AssemblyName.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssemblyName class

Namespace: `System.Reflection`

```csharp
public sealed class AssemblyName : ICloneable, System.Runtime.Serialization.IDeserializationCallback, System.Runtime.Serialization.ISerializable
```

Describes an assembly's unique identity in full.

#### Remarks
The `AssemblyName` object contains information about an assembly, which you can use to bind to that assembly. An assembly's identity consists of the following:

- Simple name.
- Version number.
- Cryptographic key pair.
- Supported culture.

The simple name is typically the file name for the manifest file without its extension. The key pair includes a public and private key, used to create strong-name signatures for assemblies.

All compilers that support the common language runtime will emit the simple name of a nested class, and reflection constructs a mangled name when queried, in accordance with the following conventions.

|Delimiter|Meaning|
|---------------|-------------|
|Backslash (\\)|Escape character.|
|Comma (,)|Precedes the assembly name.|
|Plus sign (+)|Precedes a nested class.|

For example, the fully qualified name for a class might look like this:

ContainingClass+NestedClass,MyAssembly

A "++" becomes "\\+\\+", and a "\\" becomes "\\\\".

This qualified name can be persisted and later used to load the `Type`. To search for and load a `Type`, use `Type.GetType` either with the type name only or with the assembly qualified type name. `Type.GetType` with the type name only will look for the `Type` in the caller's assembly and then in the System assembly. `Type.GetType` with the assembly qualified type name will look for the `Type` in any assembly.

A fully specified `AssemblyName` must have the name, culture, public key or public key token, major version, minor version, build number, and revision number parameters. The last four are packaged in the `Version` type.

To create a simple name, create an `AssemblyName` object using the parameterless constructor and set the `AssemblyName.Name`. The other properties are optional.

To create a full strong name, create an `AssemblyName` object using the parameterless constructor and set the `AssemblyName.Name` and `AssemblyName.KeyPair`. The other properties are optional. Use `AssemblyName.SetPublicKey` and `AssemblyName.SetPublicKeyToken` to set the public key and the strong name. The strong name signing always uses the `SHA1` hash algorithm.

To ensure that the names are constructed correctly, use the following properties:

- `Assembly.FullName`
- `AssemblyName.FullName`
- `Type.AssemblyQualifiedName`

You can also get the name by using the `/l` option with the Gacutil.exe (Global Assembly Cache Tool).

For a partially specified strong name, create an `AssemblyName` object using the parameterless constructor and set the name and public key. An assembly created using such an `AssemblyName` can be signed later using the Assembly Linker (Al.exe).

It is possible to specify a public key and a `AssemblyName.KeyPair` with inconsistent values. This can be useful in developer scenarios. In this case, the public key <example-value> with `AssemblyName.GetPublicKey` specifies the correct public key, while the `AssemblyName.KeyPair` specifies the public and private keys used during development. When the runtime detects a mismatch between the `AssemblyName.KeyPair` and the public key, it looks up in the registry the correct key that matches the public key.

The format of the display name of an `AssemblyName` is a comma-delimited Unicode string that begins with the name, as follows:

`Name <,Culture = CultureInfo> <,Version = Major.Minor.Build.Revision> <, StrongName> <,PublicKeyToken> '<example-value>'`

`Name` is the textual name of the assembly. `CultureInfo` is the RFC1766-format-defined culture. `Major`, `Minor`, `Build`, and `Revision` are the major version, minor version, build number, and revision number of the assembly. `StrongName` is the hexadecimal-encoded low-order 64 bits of the hash value of the public key <example-value> using the SHA-1 hashing algorithm and the public key <example-value> by `AssemblyName.SetPublicKey`. `PublicKeyToken` is the hexadecimal-encoded public key <example-value> by `AssemblyName.SetPublicKey`.

Hexadecimal encoding is defined as the conversion of each byte of a binary object to two hexadecimal characters, progressing from least to most significant byte. Additional display values will be added as deemed necessary.

If the full public key is known, then PublicKey may be substituted for StrongName.

Also note that except for `Name`, which must come first, the lexical order of parameters is unimportant. However, any parameter (`Version`, `Culture`, `StrongName` or `PublicKey`) not specifically set is considered to be omitted, and the `AssemblyName` is then considered partial. When specifying partial information, Name parameters must be specified in the order described above.

When supplying a display name, the convention `StrongName =null` or `PublicKey= null` indicates that binding and matching against a simply named assembly is required. Additionally, the convention `Culture= ""` (double quote representing an empty string) indicates matching against the default culture.

The following example shows an `AssemblyName` for a simply named assembly with default culture.

```txt
ExampleAssembly, Culture=""
```

The following example shows a fully specified reference for a strongly named assembly with culture "en".

```txt
ExampleAssembly, Version=1.0.0.0, Culture=en, PublicKeyToken=<example-value>
```

#### Examples
This example shows how to use various reflection classes to analyze the metadata contained in an assembly.

_Code sample not included: ~/snippets/csharp/System.Reflection/Assembly/GetReferencedAssemblies/Reflection.cs._

## AssemblyName.AssemblyName() constructor

```csharp
public AssemblyName ();
```

Initializes a new instance of the `AssemblyName` class.

#### Examples
The following example creates a dynamic assembly named `MyAssembly.exe` and saves it to your hard disk. After running the example, you can use the Ildasm.exe (IL Disassembler) to examine the assembly metadata.

_Code sample not included: ~/snippets/csharp/System.Reflection/AssemblyName/.ctor/assemblyname_constructor.cs._

## AssemblyName.AssemblyName(String) constructor

```csharp
public AssemblyName (string assemblyName);
```

Initializes a new instance of the `AssemblyName` class with the specified display name.

Parameters:

- `assemblyName`: The display name of the assembly, as returned by the `AssemblyName.FullName` property.

Exceptions:

- `ArgumentNullException`: `assemblyName` is `null`.
- `ArgumentException`: `assemblyName` is a zero-length string.
- `FileLoadException`: The referenced assembly could not be found, or could not be loaded.

#### Remarks
The supplied `assemblyName` is parsed, and the appropriate fields of the new `AssemblyName` are initialized with values from the display name. This is the recommended way of parsing display names. Writing your own code to parse display names is not recommended.

#### Examples
The following example creates an instance of `AssemblyName` from a display name. The individual elements of the display name are output to the console as properties of the `AssemblyName` object.

_Code sample not included: ~/snippets/csharp/System.Reflection/AssemblyName/.ctor/source.cs._

## AssemblyName.CodeBase property

```csharp
public string? CodeBase { get; set; }
```

Gets or sets the location of the assembly as a URL.

Returns: A string that is the URL location of the assembly.

To be added.

## AssemblyName.ContentType property

```csharp
public System.Reflection.AssemblyContentType ContentType { get; set; }
```

Gets or sets a value that indicates what type of content the assembly contains.

Returns: A value that indicates what type of content the assembly contains.

To be added.

## AssemblyName.CultureInfo property

```csharp
public System.Globalization.CultureInfo? CultureInfo { get; set; }
```

Gets or sets the culture supported by the assembly.

Returns: An object that represents the culture supported by the assembly.

#### Examples
The following example emits a dynamic assembly and saves it to the current directory. When the assembly is created, the `CultureInfo` property is used to specify the culture, which is part of the assembly's display name.

_Code sample not included: ~/snippets/csharp/System.Reflection/AssemblyName/CodeBase/assemblyname_codebase.cs._

## AssemblyName.CultureName property

```csharp
public string? CultureName { get; set; }
```

Gets or sets the name of the culture associated with the assembly.

Returns: The culture name.

To be added.

## AssemblyName.EscapedCodeBase property

```csharp
public string? EscapedCodeBase { get; }
```

Gets the URI, including escape characters, that represents the codebase.

Returns: A URI with escape characters.

To be added.

## AssemblyName.Flags property

```csharp
public System.Reflection.AssemblyNameFlags Flags { get; set; }
```

Gets or sets the attributes of the assembly.

Returns: A value that represents the attributes of the assembly.

#### Examples
The following example emits a dynamic assembly and saves it to the current directory. When the assembly is created, the `Flags` property is used to specify that the assembly has a public key.

_Code sample not included: ~/snippets/csharp/System.Reflection/AssemblyName/Flags/assemblyname_keypair.cs._

## AssemblyName.FullName property

```csharp
public string FullName { get; }
```

Gets the full name of the assembly, also known as the display name.

Returns: A string that is the full name of the assembly, also known as the display name.

#### Remarks
The display name typically consists of the simple name, version number, supported culture, and public key. For example:

```txt
mylib, Version=1.2.1900.0, Culture=neutral, PublicKeyToken=<example-value>
```

Writing your own code to parse display names is not recommended. Instead, pass the display name to the `AssemblyName.%23ctor` constructor, which parses it and populates the appropriate fields of the new `AssemblyName`.

When an assembly is loaded, this value can also be obtained using the `FullName` property.

#### Examples
The following example emits a dynamic assembly and saves it to the current directory. When the assembly is created, the code example sets the `AssemblyName.Name`, `AssemblyName.Version`, `AssemblyName.CultureInfo`, and `AssemblyName.KeyPair` properties, which together comprise an assembly's full name, or display name. The `FullName` property is then used to retrieve the display name.

_Code sample not included: ~/snippets/csharp/System.Reflection/AssemblyName/CodeBase/assemblyname_codebase.cs._

## AssemblyName.HashAlgorithm property

```csharp
public System.Configuration.Assemblies.AssemblyHashAlgorithm HashAlgorithm { get; set; }
```

Gets or sets the hash algorithm used by the assembly manifest.

Returns: The hash algorithm used by the assembly manifest.

To be added.

## AssemblyName.KeyPair property

```csharp
public System.Reflection.StrongNameKeyPair? KeyPair { get; set; }
```

Gets or sets the public and private cryptographic key pair that is used to create a strong name signature for the assembly.

Returns: The public and private cryptographic key pair to be used to create a strong name for the assembly.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## AssemblyName.Name property

```csharp
public string? Name { get; set; }
```

Gets or sets the simple name of the assembly. This is usually, but not necessarily, the file name of the manifest file of the assembly, minus its extension.

Returns: The simple name of the assembly.

#### Remarks
The manifest file is the file that contains the assembly manifest.

For example, the simple name of a single-file assembly named "MyAssembly.dll" is "MyAssembly".

#### Examples
The following example emits a dynamic assembly and saves it to the current directory. When the assembly is created, the `Name` property is used to set the simple name of the dynamic assembly.

_Code sample not included: ~/snippets/csharp/System.Reflection/AssemblyName/.ctor/assemblyname_constructor.cs._

## AssemblyName.ProcessorArchitecture property

```csharp
public System.Reflection.ProcessorArchitecture ProcessorArchitecture { get; set; }
```

Gets or sets a value that identifies the processor and bits-per-word of the platform targeted by an executable.

Returns: One of the enumeration values that identifies the processor and bits-per-word of the platform targeted by an executable.

To be added.

## AssemblyName.Version property

```csharp
public Version? Version { get; set; }
```

Gets or sets the major, minor, build, and revision numbers of the assembly.

Returns: An object that represents the major, minor, build, and revision numbers of the assembly.

#### Remarks
All components of the version must be integers greater than or equal to zero. Metadata restricts the major, minor, build, and revision components for an assembly to a maximum value of `MaxValue` - 1. If a component exceeds this value, no error is thrown; however, in a dynamic assembly, that component is zero.

#### Examples
This section contains two examples. The first example shows how to retrieve the version of the currently executing assembly. The second example shows how to use the `Version` property to specify the assembly version when you emit a dynamic assembly.

**Example 1**

The following example retrieves and displays the version numbers of the currently executing assembly and the assembly that contains the `String` class.

_Code sample not included: ~/snippets/csharp/System.Reflection/AssemblyName/Version/Example.cs._

**Example 2**

The following example emits a dynamic assembly and saves it to the current directory. When the assembly is created, the `Version` property is used to specify version information for the assembly.

_Code sample not included: ~/snippets/csharp/System.Reflection/AssemblyName/.ctor/assemblyname_constructor.cs._

## AssemblyName.VersionCompatibility property

```csharp
public System.Configuration.Assemblies.AssemblyVersionCompatibility VersionCompatibility { get; set; }
```

Gets or sets the information related to the assembly's compatibility with other assemblies.

Returns: A value that represents information about the assembly's compatibility with other assemblies.

To be added.

## AssemblyName.Clone() method

```csharp
public object Clone ();
```

Makes a copy of this `AssemblyName` object.

Returns: An object that is a copy of this `AssemblyName` object.

#### Remarks
A new object is created, identical to the original.
