---
title: "IMetaDataImport::IsGlobal Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-isglobal-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::IsGlobal Method

Gets a value indicating whether the field, method, or type represented by the specified metadata token has global scope.

## Syntax

```cpp
HRESULT IsGlobal (
   [in]  mdToken     pd,
   [out] int         *pbGlobal
);
```

## Parameters

 `pd`
 [in] A metadata token that represents a type, field, or method.

 `pbGlobal`
 [out] 1 if the object has global scope; otherwise, 0 (zero).

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
