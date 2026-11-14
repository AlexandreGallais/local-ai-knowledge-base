---
title: "IMetaDataImport::IsValidToken Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-isvalidtoken-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::IsValidToken <example-value>

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

 `true` if `tk` is a valid metadata token <example-value> the current scope. Otherwise, `false`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
