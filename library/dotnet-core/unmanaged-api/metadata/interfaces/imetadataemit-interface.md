---
title: "IMetaDataEmit Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/imetadataemit-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IMetaDataEmit Interface

Provides methods to create, modify, and save metadata about the assembly in the currently defined scope. The metadata can be stored in memory or saved to disk.

## Methods

| Method | Description |
|------------|-----------------|
|ApplyEditAndContinue Method| Updates the current assembly scope with the changes made in the specified `pImport`. |
|DefineCustomAttribute Method| Creates a definition for a custom attribute with the specified metadata signature, to be attached to the specified object, and gets a token to that custom attribute definition. |
|DefineEvent Method| Creates a definition for an event with the specified metadata signature, and gets a token to that event definition. |
|DefineField Method| Creates a definition for a field with the specified metadata signature, and gets a token to that field definition. |
|DefineImportMember Method| Creates a definition for a member of a type that is defined in a module outside the current scope, and gets a token for that reference definition. |
|DefineImportType Method| Creates a definition for a reference to a type that is defined in a module outside the current scope, and gets a token to that reference definition. |
|DefineMemberRef Method| Creates a definition for a reference to a member of a module outside the current scope, and gets a token to that reference definition. |
|DefineMethod Method| Creates a definition for a method with the specified signature, and returns a token to that method definition. |
|DefineMethodImpl Method|Creates a definition for implementation of a method inherited from an interface, and returns a token to that method-implementation definition.|
|DefineModuleRef Method| Creates the metadata signature for a module with the specified name. |
|DefineNestedType Method| Creates the metadata signature of a type definition and returns an `mdTypeDef` token for that type, additionally specifying that the defined type is a member of the type referenced by `tdEncloser`. |
|DefineParam Method| Creates a parameter definition with the specified signature for the method referenced by the specified token, and gets a token for that parameter definition. |
|DefinePermissionSet Method| Creates a definition for a permission set with the specified metadata signature, and gets a token to that permission set definition. |
|DefinePinvokeMap Method| Sets features of the PInvoke signature of the method referenced by the specified token. |
|DefineProperty Method| Creates a property definition for the specified type, with the specified `get` and `set` method accessors, and gets a token to that property definition. |
|DefineSecurityAttributeSet Method| Creates a set of security permissions to attach to the object referenced by the specified token. |
|DefineTypeDef Method| Creates a type definition for a common language runtime type, and gets a metadata token to that type definition. |
|DefineTypeRefByName Method| Gets a metadata token for a type that is defined in another module outside the current scope. |
|DefineUserString Method| Gets a metadata token for the specified literal string. |
|DeleteClassLayout Method| Destroys the class layout metadata signature for the type referenced by the specified token. |
|DeleteFieldMarshal Method| Destroys the PInvoke marshalling metadata signature for the object referenced by the specified token. |
|DeletePinvokeMap Method| Destroys the PInvoke mapping metadata for the object referenced by the specified token. |
|DeleteToken Method| Deletes the specified token from the current metadata scope. |
|GetSaveSize Method| Gets the estimated binary size of the assembly in the current scope. |
|GetTokenFromSig Method| Gets a token for the specified metadata signature. |
|GetTokenFromTypeSpec Method| Gets a metadata token for the type with the specified metadata signature. |
|Merge Method| Adds the specified imported scope to the list of scopes to be merged. |
|MergeEnd Method|Merges into the current scope all the metadata scopes specified by one or more prior calls to `IMetaDataEmit::Merge`.|
|Save Method| Saves all metadata in the current scope to the file at the specified address. |
|SaveToMemory Method| Saves all metadata in the current scope to the specified area of memory. |
|SaveToStream Method| Saves all metadata in the current scope to the specified `IStream`. |
|SetClassLayout Method|Sets or updates the class layout signature of a type defined by a prior call to `IMetaDataEmit::DefineTypeDef`.|
|SetCustomAttributeValue Method|Sets or updates the value of a custom attribute defined by a prior call to `IMetaDataEmit::DefineCustomAttribute`.|
|SetEventProps Method|Sets or updates the specified feature of an event defined by a prior call to `IMetaDataEmit::DefineEvent`.|
|SetFieldMarshal Method| Sets the PInvoke marshalling information for the field, method return, or method parameter referenced by the specified token. |
|SetFieldProps Method| Sets or updates the default value for the field referenced by the specified field token. |
|SetFieldRVA Method| Sets a global variable value for the relative virtual address of the field referenced by the specified token. |
|SetHandler Method| Sets the method referenced by the specified `IUnknown` pointer as a notification callback for token remaps. |
|SetMethodImplFlags Method| Sets or updates the metadata signature of the inherited method implementation referenced by the specified token. |
|SetMethodProps Method|Sets or updates the feature, stored at the specified relative virtual address, of a method defined by a prior call to `IMetaDataEmit::DefineMethod`.|
|SetModuleProps Method|Updates references to a module defined by a prior call to `IMetaDataEmit::DefineModuleRef`.|
|SetParamProps Method|Sets or changes features of a method parameter that was defined by a prior call to `IMetaDataEmit::DefineParam`.|
|SetParent Method|Establishes that the specified member, as defined by a prior call to `IMetaDataEmit::DefineMemberRef`, is a member of the specified type, as defined by a prior call to `IMetaDataEmit::DefineTypeDef`.|
|SetPermissionSetProps Method|Sets or updates features of the metadata signature of a permission set defined by a prior call to `IMetaDataEmit::DefinePermissionSet`.|
|SetPinvokeMap Method|Sets or changes features of a method's PInvoke signature, as defined by a prior call to `IMetaDataEmit::DefinePinvokeMap`.|
|SetPropertyProps Method|Sets the features stored in metadata for a property defined by a prior call to `IMetaDataEmit::DefineProperty`.|
|SetRVA Method| Sets the relative virtual address of the specified method. |
|SetTypeDefProps Method|Sets features of a type defined by a prior call to `IMetaDataEmit::DefineTypeDef`.|
|TranslateSigWithScope Method| Imports an assembly into the current scope and gets a new metadata signature for the merged scope. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- Metadata Interfaces
- IMetaDataEmit2 Interface
