---
title: "IMetaDataImport::GetNativeCallConvFromSig Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getnativecallconvfromsig-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
