---
title: "IMetaDataEmit::DefinePinvokeMap Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-definepinvokemap-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
