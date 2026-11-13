---
title: "IMetaDataEmit2::SetGenericParamProps Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit2-setgenericparamprops-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit2::SetGenericParamProps Method

Sets property values for the generic parameter definition referenced by the specified token.

## Syntax

```cpp
HRESULT SetGenericParamProps (
    [in] mdGenericParam   gp,
    [in] DWORD            dwParamFlags,
    [in] LPCWSTR          szName,
    [in] DWORD            reserved,
    [in] mdToken          rtkConstraints[]
);
```

## Parameters

 `gp`
 [in] The token for the generic parameter definition for which to set values.

 `dwParamFlags`
 [in] A value of the CorGenericParamAttr enumeration that describes the type for the generic parameter.

 `szName`
 [in] Optional. The name of the parameter for which to set values.

 `reserved`
 [in] Reserved for future extensibility.

 `rtkConstraints`
 [in] Optional. A zero-terminated array of type constraints. Array members must be an `mdTypeDef`, `mdTypeRef`, or `mdTypeSpec` metadata token.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit2 Interface
- IMetaDataEmit Interface
