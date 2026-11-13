---
title: "IMetaDataImport::GetNativeCallConvFromSig Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getnativecallconvfromsig-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::GetNativeCallConvFromSig Method

Gets the native calling convention for the method that is represented by the specified signature pointer.

## Syntax

```cpp
HRESULT GetNativeCallConvFromSig (
   [in]  void const  *pvSig,
   [in]  ULONG       cbSig,
   [out] ULONG       *pCallConv
);
```

## Parameters

 `pvSig`
 [in] A pointer to the metadata signature of the method to return the calling convention for.

 `cbSig`
 [in] The size in bytes of `pvSig`.

 `pCallConv`
 [out] A pointer to the native calling convention.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- `System.Runtime.InteropServices.CallingConvention`
- IMetaDataImport Interface
- IMetaDataImport2 Interface
