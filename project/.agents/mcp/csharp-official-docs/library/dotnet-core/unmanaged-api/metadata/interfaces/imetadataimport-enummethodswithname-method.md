---
title: "IMetaDataImport::EnumMethodsWithName Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-enummethodswithname-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::EnumMethodsWithName Method

Enumerates methods that have the specified name and that are defined by the type referenced by the specified TypeDef token.

## Syntax

```cpp
HRESULT EnumMethodsWithName (
   [in, out] HCORENUM    *phEnum,
   [in]  mdTypeDef       cl,
   [in]  LPCWSTR         szName,
   [out] mdMethodDef     rMethods[],
   [in]  ULONG           cMax,
   [out] ULONG           *pcTokens
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator. This must be NULL for the first call of this method.

 `cl`
 [in] A TypeDef token <example-value> the type whose methods to enumerate.

 `szName`
 [in] The name that limits the scope of the enumeration.

 `rMethods`
 [out] The array used to store the MethodDef tokens.

 `cMax`
 [in] The maximum size of the `rMethods` array.

 `pcTokens`
 [out] The number of MethodDef tokens returned in `rMethods`.

## Remarks

 This method enumerates fields and methods, but not properties or events. Unlike IMetaDataImport::EnumMethods, `EnumMethodsWithName` discards all method tokens that do not have the specified name.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumMethodsWithName` returned successfully. |
| `S_FALSE` | There are no tokens to enumerate. In that case, `pcTokens` is zero. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
