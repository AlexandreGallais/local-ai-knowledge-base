---
title: "IMetaDataImport::EnumParams Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-enumparams-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::EnumParams Method

Enumerates ParamDef tokens representing the parameters of the method referenced by the specified MethodDef token.

## Syntax

```cpp
HRESULT EnumParams (
   [in, out] HCORENUM    *phEnum,
   [in]  mdMethodDef     mb,
   [out] mdParamDef      rParams[],
   [in]  ULONG           cMax,
   [out] ULONG          *pcTokens
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator. This must be NULL for the first call of this method.

 `mb`
 [in] A MethodDef token <example-value> the method with the parameters to enumerate.

 `rParams`
 [out] The array used to store the ParamDef tokens.

 `cMax`
 [in] The maximum size of the `rParams` array.

 `pcTokens`
 [out] The number of ParamDef tokens returned in `rParams`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumParams` returned successfully. |
| `S_FALSE` | There are no tokens to enumerate. In that case, `pcTokens` is zero. |

## Requirements

 **Platform:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
