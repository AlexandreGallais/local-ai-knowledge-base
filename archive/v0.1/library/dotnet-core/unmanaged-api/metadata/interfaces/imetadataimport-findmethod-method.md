---
title: "IMetaDataImport::FindMethod Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-findmethod-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataImport::FindMethod Method

Gets a pointer to the MethodDef token for the method that is enclosed by the specified `System.Type` and that has the specified name and metadata signature.

## Syntax

```cpp
HRESULT FindMethod (
   [in]  mdTypeDef          td,
   [in]  LPCWSTR            szName,
   [in]  PCCOR_SIGNATURE    pvSigBlob,
   [in]  ULONG              cbSigBlob,
   [out] mdMethodDef        *pmb
);
```

## Parameters

 `td`
 [in] The `mdTypeDef` token for the type (a class or interface) that encloses the member to search for. If this value is `mdTokenNil`, then the lookup is done for a global function.

 `szName`
 [in] The name of the method to search for.

 `pvSigBlob`
 [in] A pointer to the binary metadata signature of the method.

 `cbSigBlob`
 [in] The size in bytes of `pvSigBlob`.

 `pmb`
 [out] A pointer to the matching MethodDef token.

## Remarks

 You specify the method using its enclosing class or interface (`td`), its name (`szName`), and optionally its signature (`pvSigBlob`). There might be multiple methods with the same name in a class or interface. In that case, pass the method's signature to find the unique match.

 The signature passed to `FindMethod` must have been generated in the current scope, because signatures are bound to a particular scope. A signature can embed a token that identifies the enclosing class or value type. The token is an index into the local TypeDef table. You cannot build a runtime signature outside the context of the current scope and use that signature as input to input to `FindMethod`.

 `FindMethod` finds only methods that were defined directly in the class or interface; it does not find inherited methods.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- `System.Reflection.MethodInfo`
- IMetaDataImport Interface
- IMetaDataImport2 Interface
