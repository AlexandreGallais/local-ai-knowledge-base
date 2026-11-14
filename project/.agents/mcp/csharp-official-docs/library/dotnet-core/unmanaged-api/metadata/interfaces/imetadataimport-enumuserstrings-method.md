---
title: "IMetaDataImport::EnumUserStrings Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-enumuserstrings-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::EnumUserStrings Method

Enumerates String tokens representing hard-coded strings in the current metadata scope.

## Syntax

```cpp
HRESULT EnumUserStrings (
   [in, out]  HCORENUM    *phEnum,
   [out]  mdString        rStrings[],
   [in]   ULONG           cMax,
   [out]  ULONG           *pcStrings
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator. This must be NULL for the first call of this method.

 `rStrings`
 [out] The array used to store the String tokens.

 `cMax`
 [in] The maximum size of the `rStrings` array.

 `pcStrings`
 [out] The number of String tokens returned in `rStrings`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumUserStrings` returned successfully. |
| `S_FALSE` | There are no tokens to enumerate. In that case, `pcStrings` is zero. |

## Remarks

 The String tokens are created by the IMetaDataEmit::DefineUserString method. This method is designed to be used by a metadata browser rather than by a compiler.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
