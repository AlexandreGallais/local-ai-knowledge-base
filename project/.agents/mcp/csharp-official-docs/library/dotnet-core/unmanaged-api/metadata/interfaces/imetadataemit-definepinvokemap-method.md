---
title: "IMetaDataEmit::DefinePinvokeMap Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-definepinvokemap-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataEmit::DefinePinvokeMap Method

Sets features of the PInvoke signature of the method referenced by the specified token.

## Syntax

```cpp
HRESULT DefinePinvokeMap (
    [in]  mdToken            tk,
    [in]  DWORD              dwMappingFlags,
    [in]  LPCWSTR            szImportName,
    [in]  mdModuleRef        mrImportDLL
);
```

## Parameters

 `tk`
 [in] The token for the target method.

 `dwMappingFlags`
 [in] Flags used by PInvoke to do the mapping.

 `szImportName`
 [in] The name of the target export method in an unmanaged DLL.

 `mrImportDLL`
 [in] The token for the target native DLL.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
