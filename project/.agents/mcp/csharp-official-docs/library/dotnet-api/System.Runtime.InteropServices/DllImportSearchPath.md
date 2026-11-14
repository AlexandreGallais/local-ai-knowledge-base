---
title: "DllImportSearchPath enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/DllImportSearchPath.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DllImportSearchPath enum

Namespace: `System.Runtime.InteropServices`

```csharp
public enum DllImportSearchPath
```

Specifies the paths that are used to search for DLLs that provide functions for platform invokes.

#### Remarks
Use the `DefaultDllImportSearchPathsAttribute` attribute to apply a set of paths to an entire assembly or to an individual platform invoke.

## DllImportSearchPath.ApplicationDirectory field

```csharp
ApplicationDirectory
```

Include the application directory in the DLL search path.

## DllImportSearchPath.AssemblyDirectory field

```csharp
AssemblyDirectory
```

When searching for assembly dependencies, include the directory that contains the assembly itself, and search that directory first. When used in Native AOT and single-file deployment models, the application's installation directory is considered the "assembly directory" and is searched.

## DllImportSearchPath.LegacyBehavior field

```csharp
LegacyBehavior
```

Search the application directory, and then call the Win32 LoadLibraryEx function with the `LOAD_WITH_ALTERED_SEARCH_PATH` flag. This value is ignored if any other value is specified. Operating systems that do not support the `DefaultDllImportSearchPathsAttribute` attribute use this value, and ignore other values.

## DllImportSearchPath.SafeDirectories field

```csharp
SafeDirectories
```

Include the application directory, the `%WinDir%\System32` directory, and user directories in the DLL search path.

## DllImportSearchPath.System32 field

```csharp
System32
```

Include the `%WinDir%\System32` directory in the DLL search path.

## DllImportSearchPath.UseDllDirectoryForDependencies field

```csharp
UseDllDirectoryForDependencies
```

Search for the dependencies of a DLL in the folder where the DLL is located before searching other folders.

## DllImportSearchPath.UserDirectories field

```csharp
UserDirectories
```

Include any path that was explicitly added to the process-wide search path by using the Win32 `AddDllDirectory` function.
