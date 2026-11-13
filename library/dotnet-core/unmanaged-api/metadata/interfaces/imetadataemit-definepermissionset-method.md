---
title: "IMetaDataEmit::DefinePermissionSet Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-definepermissionset-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::DefinePermissionSet Method

Creates a definition for a permission set with the specified metadata signature, and gets a token to that permission set definition.

## Syntax

```cpp
HRESULT DefinePermissionSet (
    [in]  mdToken        tk,
    [in]  DWORD          dwAction,
    [in]  void const     *pvPermission,
    [in]  ULONG          cbPermission,
    [out] mdPermission   *ppm
);
```

## Parameters

 `tk`
 [in] The object to be decorated.

 `dwAction`
 [in] A CorDeclSecurity value that specifies the type of declarative security to be used.

 `pvPermission`
 [in] The permission BLOB.

 `cbPermission`
 [in] The size, in bytes, of `pvPermission`.

 `ppm`
 [out] The returned permission token.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
