---
title: "IMetaDataImport::GetPinvokeMap Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getpinvokemap-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::GetPinvokeMap Method

Gets a ModuleRef token to represent the target assembly of a PInvoke call.

## Syntax

```cpp
HRESULT GetPinvokeMap (
   [in]  mdToken       tk,
   [out] DWORD         *pdwMappingFlags,
   [out] LPWSTR        szImportName,
   [in]  ULONG         cchImportName,
   [out] ULONG         *pchImportName,
   [out] mdModuleRef   *pmrImportDLL
);
```

## Parameters

 `tk`
 [in] A FieldDef or MethodDef token to get the PInvoke mapping metadata for.

 `pdwMappingFlags`
 [out] A pointer to flags used for mapping. This value is a bitmask from the CorPinvokeMap enumeration.

 `szImportName`
 [out] The name of the unmanaged target DLL.

 `cchImportName`
 [in] The size in wide characters of `szImportName`.

 `pchImportName`
 [out] The number of wide characters returned in `szImportName`.

 `pmrImportDLL`
 [out] A pointer to a ModuleRef token that represents the unmanaged target object library.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
