---
title: "IMetaDataImport::IsValidToken Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-isvalidtoken-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::IsValidToken Method

Gets a value indicating whether the specified token holds a valid reference to a code object.

## Syntax

```cpp
BOOL IsValidToken (
   [in] mdToken     tk
);
```

## Parameters

 `tk`
 [in] The token to check the reference validity for.

## Return Value

 `true` if `tk` is a valid metadata token within the current scope. Otherwise, `false`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
