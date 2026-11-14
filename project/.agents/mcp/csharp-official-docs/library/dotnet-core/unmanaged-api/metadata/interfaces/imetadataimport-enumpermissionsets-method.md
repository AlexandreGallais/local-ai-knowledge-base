---
title: "IMetaDataImport::EnumPermissionSets Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-enumpermissionsets-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::EnumPermissionSets Method

Enumerates permissions for the objects in a specified metadata scope.

## Syntax

```cpp
HRESULT EnumPermissionSets
   [in, out] HCORENUM      *phEnum,
   [in]      mdToken       tk,
   [in]      DWORD         dwActions,
   [out]     mdPermission  rPermission[],
   [in]      ULONG         cMax,
   [out]     ULONG         *pcTokens
);
```

## Parameters

 `phEnum`
 [in, out] A pointer to the enumerator. This must be NULL for the first call of this method.

 `tk`
 [in] A metadata token that limits the scope of the search, or NULL to search the widest scope possible.

 `dwActions`
 [in] Flags representing the `System.Security.Permissions.SecurityAction` values to include in `rPermission`, or zero to return all actions.

 `rPermission`
 [out] The array used to store the Permission tokens.

 `cMax`
 [in] The maximum size of the `rPermission` array.

 `pcTokens`
 [out] The number of Permission tokens returned in `rPermission`.

## Return Value

| HRESULT | Description |
|-------------|-----------------|
| `S_OK` | `EnumPermissionSets` returned successfully. |
| `S_FALSE` | There are no tokens to enumerate. In that case, `pcTokens` is zero. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
