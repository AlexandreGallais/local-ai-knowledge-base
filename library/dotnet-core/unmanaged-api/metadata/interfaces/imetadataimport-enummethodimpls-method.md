---
title: "IMetaDataImport::EnumMethodImpls Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-enummethodimpls-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::EnumMethodImpls Method

Enumerates MethodBody and MethodDeclaration tokens representing methods of the specified type.

## Syntax

```cpp
HRESULT EnumMethodImpls (
   [in, out] HCORENUM    *phEnum,
   [in]      mdTypeDef   td,
   [out]     mdToken     <example-value>[],
   [out]     mdToken     <example-value>[],
   [in]      ULONG       cMax,
   [in]      ULONG       *pcTokens
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator. This must be NULL for the first call of this method.

 `td`
 [in] A TypeDef token for the type whose method implementations to enumerate.

 `rMethodBody`
 [out] The array to store the MethodBody tokens.

 `rMethodDecl`
 [out] The array to store the MethodDeclaration tokens.

 `cMax`
 [in] The maximum size of the `rMethodBody` and `rMethodDecl` arrays.

 `pcTokens`
 [in] The actual number of methods returned in `rMethodBody` and `rMethodDecl`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumMethodImpls` returned successfully. |
| `S_FALSE` | There are no method tokens to enumerate. In that case, `pcTokens` is zero. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
