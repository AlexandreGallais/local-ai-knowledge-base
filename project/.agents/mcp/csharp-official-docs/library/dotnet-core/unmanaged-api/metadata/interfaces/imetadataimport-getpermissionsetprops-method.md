---
title: "IMetaDataImport::GetPermissionSetProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getpermissionsetprops-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport::GetPermissionSetProps Method

Gets the metadata associated with the `System.Security.PermissionSet` represented by the specified Permission token.

## Syntax

```cpp
HRESULT GetPermissionSetProps (
   [in]  mdPermission      pm,
   [out] DWORD             *pdwAction,
   [out] void const        **ppvPermission,
   [out] ULONG             *pcbPermission
);
```

## Parameters

 `pm`
 [in] The Permission metadata token that represents the permission set to get the metadata properties for.

 `pdwAction`
 [out] A pointer to the permission set.

 `ppvPermission`
 [out] A pointer to the binary metadata signature of the permission set.

 `pcbPermission`
 [out] The size in bytes of `ppvPermission`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- `System.Security.PermissionSet`
- IMetaDataImport Interface
- IMetaDataImport2 Interface
