---
title: "IMetaDataEmit::DefineTypeRefByName Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-definetyperefbyname-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataEmit::DefineTypeRefByName Method

Gets a metadata token for a type that is defined in the specified scope, which is outside the current scope.

## Syntax

```cpp
HRESULT DefineTypeRefByName (
    [in]  mdToken     <example-value>,
    [in]  LPCWSTR     szName,
    [out] mdTypeRef   *ptr
);
```

## Parameters

 `tkResolutionScope`
 [in] The token <example-value> the resolution scope. The following token types are valid:

- `mdModuleRef`, if the type is defined in the same assembly in which the caller is defined.

- `mdAssemblyRef`, if the type is defined in an assembly other than the one in which the caller is defined.

- `mdTypeRef`, if the type is a nested type.

- `mdModule`, if the type is defined in the same module in which the caller is defined.

- Null, if the type is defined globally.

 `szName`
 [in] The name of the target type in Unicode.

 `ptr`
 [out] A pointer to the `mdTypeRef` token that is assigned to the type.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
