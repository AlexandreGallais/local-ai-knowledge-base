---
title: "IMetaDataEmit::DefineSecurityAttributeSet Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-definesecurityattributeset-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::DefineSecurityAttributeSet Method

Creates a set of security permissions to attach to the object referenced by the specified token.

## Syntax

```cpp
HRESULT DefineSecurityAttributeSet (
    [in]  mdToken       tkObj,
    [in]  COR_SECATTR   rSecAttrs[],
    [in]  ULONG         cSecAttrs,
    [out] ULONG         *pulErrorAttr
);
```

## Parameters

 `tkObj`
 [in] The token to which the security information is attached.

 `rSecAttrs`
 [in] An array of `COR_SECATTR` structures.

 `cSecAttrs`
 [in] The number of elements in `rSecAttrs`.

 `pulErrorAttr`
 [out] If the method fails, specifies the index in `rSecAttrs` of the element that caused the problem.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
