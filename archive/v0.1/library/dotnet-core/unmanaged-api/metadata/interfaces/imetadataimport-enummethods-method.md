---
title: "IMetaDataImport::EnumMethods Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-enummethods-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::EnumMethods Method

Enumerates MethodDef tokens representing methods of the specified type.

## Syntax

```cpp
HRESULT EnumMethods (
   [in, out] HCORENUM   *phEnum,
   [in]  mdTypeDef      cl,
   [out] mdMethodDef    rMethods[],
   [in]  ULONG          cMax,
   [out] ULONG          *pcTokens
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator. This must be NULL for the first call of this method.

 `cl`
 [in] A TypeDef token <example-value> the type with the methods to enumerate.

 `rMethods`
 [out] The array to store the MethodDef tokens.

 `cMax`
 [in] The maximum size of the MethodDef `rMethods` array.

 `pcTokens`
 [out] The number of MethodDef tokens returned in `rMethods`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumMethods` returned successfully. |
| `S_FALSE` | There are no MethodDef tokens to enumerate. In that case, `pcTokens` is zero. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
