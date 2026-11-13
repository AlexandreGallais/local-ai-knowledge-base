---
title: "IMetaDataImport::GetClassLayout Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getclasslayout-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::GetClassLayout Method

Gets layout information for the class referenced by the specified TypeDef token.

## Syntax

```cpp
HRESULT GetClassLayout  (
   [in]  mdTypeDef          td,
   [out] DWORD              *pdwPackSize,
   [out] COR_FIELD_OFFSET   rFieldOffset[],
   [in]  ULONG              cMax,
   [out] ULONG              *pcFieldOffset,
   [out] ULONG              *pulClassSize
);
```

## Parameters

 `td`
 [in] The TypeDef token for the class with the layout to return.

 `pdwPackSize`
 [out] One of the values 1, 2, 4, 8, or 16, representing the pack size of the class.

 `rFieldOffset`
 [out] An array of COR_FIELD_OFFSET values.

 `cMax`
 [in] The maximum size of the `rFieldOffset` array.

 `pcFieldOffset`
 [out] The number of elements returned in `rFieldOffset`.

 `pulClassSize`
 [out] The size in bytes of the class represented by `td`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
