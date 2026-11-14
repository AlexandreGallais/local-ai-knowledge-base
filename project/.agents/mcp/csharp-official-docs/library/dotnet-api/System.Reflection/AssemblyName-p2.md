---
title: "AssemblyName class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/AssemblyName.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssemblyName class (part 2 of 2)

## AssemblyName.GetAssemblyName(String) method

```csharp
public static System.Reflection.AssemblyName GetAssemblyName (string assemblyFile);
```

Gets the `AssemblyName` for a given file.

Parameters:

- `assemblyFile`: The path for the assembly whose `AssemblyName` is to be returned.

Returns: An object that represents the given assembly file.

Exceptions:

- `ArgumentNullException`: `assemblyFile` is `null`.
- `ArgumentException`: `assemblyFile` is invalid, such as an assembly with an invalid culture.
- `FileNotFoundException`: `assemblyFile` is not found.
- `SecurityException`: The caller does not have path discovery permission.
- `BadImageFormatException`: `assemblyFile` is not a valid assembly.
- `FileLoadException`: An assembly or module was loaded twice with two different sets of evidence.

#### Remarks
This will only work if the file contains an assembly manifest. This method causes the file to be opened and closed, but the assembly is not added to this domain.

#### Examples
The following example gets the `AssemblyName` for an assembly on disk. It will not run unless you replace the string "MyAssembly.exe" with the file name of an assembly (including the path, if necessary) on your hard disk. Alternatively, you can compile this example as "MyAssembly.exe".

_Code sample not included: ~/snippets/csharp/System.Reflection/AssemblyName/GetAssemblyName/assemblyname_getassemblyname.cs._

## AssemblyName.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Gets serialization information with all the data needed to recreate an instance of this `AssemblyName`.

Parameters:

- `info`: The object to be populated with serialization information.
- `context`: The destination context of the serialization.

Exceptions:

- `ArgumentNullException`: `info` is `null`.
- `PlatformNotSupportedException`: In all cases.

To be added.

## AssemblyName.GetPublicKey() method

```csharp
public byte[]? GetPublicKey ();
```

Gets the public key of the assembly.

Returns: A byte array that contains the public key of the assembly.

Exceptions:

- `SecurityException`: A public key was provided (for example, by using the `AssemblyName.SetPublicKey` method), but no public key token was provided.

#### Examples
The following example emits a dynamic assembly and saves it to the current directory. When the assembly is created, the `AssemblyName.SetPublicKey` method is used to give the assembly a public key. The `AssemblyName.GetPublicKey` method is then used to retrieve the public key, which is displayed to the console.

_Code sample not included: ~/snippets/csharp/System.Reflection/AssemblyName/Flags/assemblyname_keypair.cs._

## AssemblyName.GetPublicKeyToken() method

```csharp
public byte[]? GetPublicKeyToken ();
```

Gets the public key token, which is the last 8 bytes of the SHA-1 hash of the public key under which the application or assembly is signed.

Returns: A byte array that contains the public key token.

#### Examples
The following example emits a dynamic assembly and saves it to the current directory. When the assembly is created, the `AssemblyName.SetPublicKeyToken` method is used to set the assembly's public key token. The `AssemblyName.GetPublicKeyToken` method is then used to retrieve the public key token, which is displayed to the console.

_Code sample not included: ~/snippets/csharp/System.Reflection/AssemblyName/Flags/assemblyname_keypair.cs._

## AssemblyName.OnDeserialization(Object) method

```csharp
public void OnDeserialization (object? sender);
```

Implements the `ISerializable` interface and is called back by the deserialization event when deserialization is complete.

Parameters:

- `sender`: The source of the deserialization event.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## AssemblyName.ReferenceMatchesDefinition(AssemblyName, AssemblyName) method

```csharp
public static bool ReferenceMatchesDefinition (System.Reflection.AssemblyName? reference, System.Reflection.AssemblyName? definition);
```

Returns a value indicating whether two assembly names are the same. The comparison is based on the simple assembly names.

Parameters:

- `reference`: The reference assembly name.
- `definition`: The assembly name that is compared to the reference assembly.

Returns: `true` if the simple assembly names are the same; otherwise, `false`.

#### Remarks
The comparison depends only on the simple assembly name. It ignores version, culture, and public key token.

## AssemblyName.SetPublicKey(Byte[]) method

```csharp
public void SetPublicKey (byte[]? publicKey);
```

Sets the public key <example-value> the assembly.

Parameters:

- `publicKey`: A byte array containing the public key of the assembly.

#### Remarks
You must also use the `AssemblyName.SetPublicKeyToken` method to provide a public key token. Otherwise, a `SecurityException` is thrown when the `AssemblyName.GetPublicKey` method is called.

#### Examples
The following example emits a dynamic assembly and saves it to the current directory. When the assembly is created, the `AssemblyName.SetPublicKey` method is used to give the assembly a public key. The `AssemblyName.GetPublicKey` method is then used to retrieve the public key, which is displayed to the console.

_Code sample not included: ~/snippets/csharp/System.Reflection/AssemblyName/SetPublicKey/assemblyname_setpublickey.cs._

## AssemblyName.SetPublicKeyToken(Byte[]) method

```csharp
public void SetPublicKeyToken (byte[]? publicKeyToken);
```

Sets the public key token, which is the last 8 bytes of the SHA-1 hash of the public key under which the application or assembly is signed.

Parameters:

- `publicKeyToken`: A byte array containing the public key token of the assembly.

#### Remarks
When you set the public key by calling the `AssemblyName.SetPublicKey` method, you must also use the `AssemblyName.SetPublicKeyToken` method to provide a public key token. Otherwise, a `SecurityException` is thrown when the `AssemblyName.GetPublicKey` method is called.

#### Examples
The following example emits a dynamic assembly and saves it to the current directory. When the assembly is created, the `AssemblyName.SetPublicKeyToken` method is used to set the assembly's public key token. The `AssemblyName.GetPublicKeyToken` method is then used to retrieve the public key token, which is displayed to the console.

_Code sample not included: ~/snippets/csharp/System.Reflection/AssemblyName/SetPublicKey/assemblyname_setpublickey.cs._

## AssemblyName.ToString() method

```csharp
public override string ToString ();
```

Returns the full name of the assembly, also known as the display name.

Returns: The full name of the assembly, or the class name if the full name cannot be determined.

#### Remarks
See the description of `AssemblyName` for the format of the returned string.

#### Examples
The following example gets an `AssemblyName` object for a hypothetical `MyAssembly.exe` assembly, and then uses the `AssemblyName.ToString` method to retrieve the full assembly name, or display name.

_Code sample not included: ~/snippets/csharp/System.Reflection/AssemblyName/GetAssemblyName/assemblyname_getassemblyname.cs._
