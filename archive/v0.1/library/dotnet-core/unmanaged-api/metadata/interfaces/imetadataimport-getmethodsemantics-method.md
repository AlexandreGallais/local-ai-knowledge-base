---
title: "IMetaDataImport::GetMethodSemantics Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-getmethodsemantics-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::GetMethodSemantics Method

Gets flags indicating the relationship between the method referenced by the specified MethodDef token and the paired property and event referenced by the specified EventProp token.

## Syntax

```cpp
HRESULT GetMethodSemantics (
   [in]  mdMethodDef   mb,
   [in]  mdToken       <example-value>,
   [out] DWORD         *pdwSemanticsFlags
);
```

## Parameters

 `mb`
 [in] A MethodDef token <example-value> the method to get the semantic role information for.

 `tkEventProp`
 [in] A token <example-value> the paired property and event for which to get the method's role.

 `pdwSemanticsFlags`
 [out] A pointer to the associated semantics flags. This value is a bitmask from the CorMethodSemanticsAttr enumeration.

## Remarks

 The IMetaDataEmit::DefineProperty method sets a method's semantics flags.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataImport Interface
- IMetaDataImport2 Interface
