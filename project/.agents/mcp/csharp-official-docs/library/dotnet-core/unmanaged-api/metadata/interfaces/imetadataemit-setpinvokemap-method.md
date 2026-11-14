---
title: "IMetaDataEmit::SetPinvokeMap Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-setpinvokemap-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataEmit::SetPinvokeMap Method

Sets or changes features of a method's PInvoke signature, as defined by a prior call to IMetaDataEmit::DefinePinvokeMap.

## Syntax

```cpp
HRESULT SetPinvokeMap (
    [in]  mdToken      tk,
    [in]  DWORD        dwMappingFlags,
    [in]  LPCWSTR      szImportName,
    [in]  mdModuleRef  mrImportDLL
);
```

## Parameters

 `tk`
 [in] The `mdToken` to which mapping information applies.

 `dwMappingFlags`
 [in] Flags used by PInvoke to do the mapping. This is a bitmask of `CorPinvokeMap` values.

 `szImportName`
 [in] The name of the target export in the native DLL.

 `mrImportDLL`
 [in] The `mdModuleRef` token for the target unmanaged DLL.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
