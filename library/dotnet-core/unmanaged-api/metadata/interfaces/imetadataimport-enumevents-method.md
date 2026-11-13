---
title: "IMetaDataImport::EnumEvents Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-enumevents-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::EnumEvents Method

Enumerates event definition tokens for the specified TypeDef token.

## Syntax

```cpp
HRESULT EnumEvents (
   [in, out] HCORENUM    *phEnum,
   [in]      mdTypeDef   td,
   [out]     mdEvent     rEvents[],
   [in]      ULONG       cMax,
   [out]    ULONG        *pcEvents
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator.

 `td`
 [in] The TypeDef token whose event definitions are to be enumerated.

 `rEvents`
 [out] The array of returned events.

 `cMax`
 [in] The maximum size of the `rEvents` array.

 `pcEvents`
 [out] The actual number of events returned in `rEvents`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumEvents` returned successfully. |
| `S_FALSE` | There are no events to enumerate. In that case, `pcEvents` is zero. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
