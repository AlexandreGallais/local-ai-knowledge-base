---
title: "DefaultDllImportSearchPathsAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/DefaultDllImportSearchPathsAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DefaultDllImportSearchPathsAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class DefaultDllImportSearchPathsAttribute : Attribute
```

Specifies the paths that are used to search for DLLs that provide functions for platform invokes.

#### Remarks
When applied to an assembly, this attribute specifies the paths that are used by default to search for any DLL that provides a function for a platform invoke, in any code in the assembly. When applied to an individual platform invoke, this attribute overrides the default search paths that were specified for the assembly.

This attribute is ignored for any platform invoke that specifies an absolute path.

Use this attribute to prevent the Win32 `LoadLibraryEx` function from searching the current working directory. This helps protect your application from attacks in which malicious software places a DLL in the current working directory, so that when a platform invoke calls the Win32 `LoadLibraryEx` function, the function's default search order finds the malicious DLL instead of the system DLL it was intended to find.

The common language runtime handles the call to the LoadLibraryEx function according to the following algorithm:

1.  If the attribute is applied to an individual platform invoke, use the values specified by that instance of the attribute.

2.  Otherwise, if the attribute is applied to the assembly that contains the platform invoke, use the values specified by that instance of the attribute.

3.  Otherwise, search the assembly directory and then call the `LoadLibraryEx` function with the `LOAD_WITH_ALTERED_SEARCH_PATH` flag.

This attribute has no effect on non-Windows platforms or the Mono runtime.

## DefaultDllImportSearchPathsAttribute.DefaultDllImportSearchPathsAttribute(DllImportSearchPath) constructor

```csharp
public DefaultDllImportSearchPathsAttribute (System.Runtime.InteropServices.DllImportSearchPath paths);
```

Initializes a new instance of the `DefaultDllImportSearchPathsAttribute` class, specifying the paths to use when searching for the targets of platform invokes.

Parameters:

- `paths`: A bitwise combination of enumeration values that specify the paths that the `LoadLibraryEx` function searches during platform invokes.

To be added.

## DefaultDllImportSearchPathsAttribute.Paths property

```csharp
public System.Runtime.InteropServices.DllImportSearchPath Paths { get; }
```

Gets a bitwise combination of enumeration values that specify the paths that the `LoadLibraryEx` function searches during platform invokes.

Returns: A bitwise combination of enumeration values that specify search paths for platform invokes.

#### Remarks
When the `DefaultDllImportSearchPathsAttribute` attribute is applied to an assembly, the paths are used by default to search for the targets of any platform invokes that are performed by code in the assembly. When the attribute is applied to an individual platform invoke, the paths are used to search for the target of the individual platform invoke and override the paths that are specified for the assembly.
