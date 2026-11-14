---
title: "AssemblyNameProxy class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/AssemblyNameProxy.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssemblyNameProxy class

Namespace: `System.Reflection`

```csharp
public class AssemblyNameProxy : MarshalByRefObject
```

Provides a remotable version of the `AssemblyName`.

To be added.

## AssemblyNameProxy.AssemblyNameProxy() constructor

```csharp
public AssemblyNameProxy ();
```

Initializes a new instance of the `AssemblyNameProxy` class.

To be added.

## AssemblyNameProxy.GetAssemblyName(String) method

```csharp
public System.Reflection.AssemblyName GetAssemblyName (string assemblyFile);
```

Gets the `AssemblyName` for a given file.

Parameters:

- `assemblyFile`: The assembly file for which to get the `AssemblyName`.

Returns: An `AssemblyName` object representing the given file.

Exceptions:

- `ArgumentNullException`: `assemblyFile` is `null`.
- `ArgumentException`: `assemblyFile` is empty.
- `FileNotFoundException`: `assemblyFile` is not found.
- `SecurityException`: The caller does not have the required permission.
- `BadImageFormatException`: `assemblyFile` is not a valid assembly.

#### Remarks
This will only work if the file contains an assembly manifest. This method causes the file to be opened and closed.
