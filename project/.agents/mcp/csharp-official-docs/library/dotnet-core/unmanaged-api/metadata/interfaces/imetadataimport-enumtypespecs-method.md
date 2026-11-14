---
title: "IMetaDataImport::EnumTypeSpecs Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-enumtypespecs-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::EnumTypeSpecs Method

Enumerates TypeSpec tokens defined in the current metadata scope.

## Syntax

```cpp
HRESULT EnumTypeSpecs (
   [in, out] HCORENUM    *phEnum,
   [out] mdTypeSpec      rTypeSpecs[],
   [in]  ULONG           cMax,
   [out] ULONG           *pcTypeSpecs
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator. This value must be NULL for the first call of this method.

 `rTypeSpecs`
 [out] The array used to store the TypeSpec tokens.

 `cMax`
 [in] The maximum size of the `rTypeSpecs` array.

 `pcTypeSpecs`
 [out] The number of TypeSpec tokens returned in `rTypeSpecs`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumTypeSpecs` returned successfully. |
| `S_FALSE` | There are no tokens to enumerate. In that case, `pcTypeSpecs` is zero. |

## Remarks

 The TypeSpec tokens are created by the IMetaDataEmit::GetTokenFromTypeSpec method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
