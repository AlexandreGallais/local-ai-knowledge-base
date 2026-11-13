---
title: "IMetaDataEmit::SetPermissionSetProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-setpermissionsetprops-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::SetPermissionSetProps Method

Sets or updates features of the metadata signature of a permission set defined by a prior call to IMetaDataEmit::DefinePermissionSet.

## Syntax

```cpp
HRESULT SetPermissionSetProps (
    [in]  mdToken         tk,
    [in]  DWORD           dwAction,
    [in]  void const      *pvPermission,
    [in]  ULONG           cbPermission,
    [out] mdPermission    *ppm
);
```

## Parameters

 `tk`
 [in] A metadata token that represents the object to be decorated.

 `dwAction`
 [in] A CorDeclSecurity value that specifies the type of declarative security to be used.

 `pvPermission`
 [in] The permission BLOB.

 `cbPermission`
 [in] The size, in bytes, of `pvPermission`.

 `ppm`
 [out] An `mdPermission` metadata token that represents the updated permissions.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
