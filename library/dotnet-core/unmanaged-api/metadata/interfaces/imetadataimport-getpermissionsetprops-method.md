---
title: "IMetaDataImport::GetPermissionSetProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getpermissionsetprops-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
