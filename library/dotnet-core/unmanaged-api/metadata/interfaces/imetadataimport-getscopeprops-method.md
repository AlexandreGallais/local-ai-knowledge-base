---
title: "IMetaDataImport::GetScopeProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getscopeprops-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::GetScopeProps Method

Gets the name and optionally the version identifier of the assembly or module in the current metadata scope.

## Syntax

```cpp
HRESULT GetScopeProps (
   [out] LPWSTR           szName,
   [in]  ULONG            cchName,
   [out] ULONG            *pchName,
   [out, optional] GUID   *pmvid
);
```

## Parameters

 `szName`
 [out] A buffer for the assembly or module name.

 `cchName`
 [in] The size in wide characters of `szName`.

 `pchName`
 [out] The number of wide characters returned in `szName`.

 `pmvid`
 [out, optional] A pointer to a GUID that uniquely identifies the version of the assembly or module.

## Remarks

 The IMetaDataEmit::SetModuleProps method is used to set these properties.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
