---
title: "IMetaDataAssemblyImport::FindAssembliesByName Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataassemblyimport-findassembliesbyname-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataAssemblyImport::FindAssembliesByName Method

Gets an array of assemblies with the specified `szAssemblyName` parameter, using the standard rules employed by the common language runtime (CLR) for resolving references.

## Syntax

```cpp
HRESULT FindAssembliesByName (
    [in]  LPCWSTR     szAppBase,
    [in]  LPCWSTR     szPrivateBin,
    [in]  LPCWSTR     szAssemblyName,
    [out] IUnknown    *ppIUnk[],
    [in]  ULONG       cMax,
    [out] ULONG       *pcAssemblies
);
```

## Parameters

 `szAppBase`
 [in] The root directory in which to search for the given assembly. If this value is set to `null`, `FindAssembliesByName` will look only in the global assembly cache for the assembly.

 `szPrivateBin`
 [in] A list of semicolon-delimited subdirectories (for example, "bin;bin2"), under the root directory, in which to search for the assembly. These directories are probed in addition to those specified in the default probing rules.

 `szAssemblyName`
 [in] The name of the assembly to find. The format of this string is defined in the class reference page for `System.Reflection.AssemblyName`.

 `ppIUnk`
 [out] An array that holds the `IMetadataAssemblyImport` interface pointers.

 `cMax`
 [in] The maximum number of interface pointers to place in `ppIUnk`.

 `pcAssemblies`
 [out] The number of interface pointers returned—that is, the number of interface pointers actually placed in `ppIUnk`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `FindAssembliesByName` returned successfully. |
| `S_FALSE` | There are no assemblies. |

## Remarks

 Given an assembly name, the `FindAssembliesByName` method finds the assembly by following the standard rules for resolving assembly references. (For more information, see How the Runtime Locates Assemblies.) `FindAssembliesByName` allows the caller to configure various aspects of the assembly resolver context, such as application base and private search path.

 The `FindAssembliesByName` method requires the CLR to be initialized in the process in order to invoke the assembly resolution logic. Therefore, you must call CoInitializeEE (passing COINITEE_DEFAULT) before calling `FindAssembliesByName`, and then follow with a call to CoUninitializeCor.

 `FindAssembliesByName` returns an IMetaDataImport pointer to the file containing the assembly manifest for the assembly name that is passed in. If the given assembly name is not fully specified (for example, if it does not include a version), multiple assemblies might be returned.

 `FindAssembliesByName` is commonly used by a compiler that attempts to find a referenced assembly at compile time.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- How the Runtime Locates Assemblies
- IMetaDataAssemblyImport Interface
