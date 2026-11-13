---
title: "IMetaDataEmit::DefineImportMember Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-defineimportmember-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit::DefineImportMember Method

Creates a reference to the specified member of a type or module that is defined outside the current scope, and defines a token for that reference.

## Syntax

```cpp
HRESULT DefineImportMember (
    [in]  IMetaDataAssemblyImport  *pAssemImport,
    [in]  const void               *pbHashValue,
    [in]  ULONG                    cbHashValue,
    [in]  IMetaDataImport          *pImport,
    [in]  mdToken                  mbMember,
    [in]  IMetaDataAssemblyEmit    *pAssemEmit,
    [in]  mdToken                  tkParent,
    [out] mdMemberRef              *pmr
);
```

## Parameters

 `pAssemImport`
 [in] An IMetaDataAssemblyImport interface that represents the assembly from which the target member is imported.

 `pbHashValue`
 [in] An array that contains the hash for the assembly specified by `pAssemImport`.

 `cbHashValue`
 [in] The number of bytes in the `pbHashValue` array.

 `pImport`
 [in] An IMetaDataImport interface that represents the metadata scope from which the target member is imported.

 `mbMember`
 [in] The metadata token that specifies the target member. The token can be an `mdMethodDef` (for a member method), `mdProperty` (for a member property), or `mdFieldDef` (for a member field) token.

 `pAssemEmit`
 [in] An IMetaDataAssemblyEmit interface that represents the assembly into which the target member is imported.

 `tkParent`
 [in] The `mdTypeRef` or `mdModuleRef` token for the type or module, respectively, that owns the target member.

 `pmr`
 [out] The `mdMemberRef` token that is defined in the current scope for the member reference.

## Remarks

 The `DefineImportMember` method looks up the member, specified by `mbMember`, that is defined in another scope, specified by `pImport`, and retrieves its properties. It uses this information to call the IMetaDataEmit::DefineMemberRef method in the current scope to create the member reference.

 Generally, before you use the `DefineImportMember` method, you must create, in the current scope, a type reference or module reference for the target member's parent class, interface, or module. The metadata token for this reference is then passed in the `tkParent` argument. You do not need to create a reference to the target member's parent if it will be resolved later by the compiler or linker. To summarize:

- If the target member is a field or method, use either the IMetaDataEmit::DefineTypeRefByName or the IMetaDataEmit::DefineImportType method to create a type reference, in the current scope, for the member's parent class or parent interface.

- If the target member is a global variable or global function (that is, not a member of a class or interface), use the IMetaDataEmit::DefineModuleRef method to create a module reference, in the current scope, for the member's parent module.

- If the target member's parent will be resolved later by the compiler or linker, then pass `mdTokenNil` in `tkParent`. The only scenario in which this applies is when a global function or global variable is being imported from a .obj file that will ultimately be linked into the current module and the metadata merged.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- IMetaDataEmit Interface
- IMetaDataEmit2 Interface
