---
title: "IMetaDataImport Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport Interface

Provides methods for importing and manipulating existing metadata from a portable executable (PE) file or other source, such as a type library or a stand-alone, runtime metadata binary.

## Methods

| Method | Description |
|------------|-----------------|
|CloseEnum Method| Closes the enumerator with the specified handle. |
|CountEnum Method| Gets the number of elements in the enumerator with the specified handle. |
|EnumCustomAttributes Method|Enumerates a list of custom attribute-definition tokens associated with the specified type or member.|
|EnumEvents Method| Enumerates event definition tokens for the specified TypeDef token. |
|EnumFields Method| Enumerates FieldDef tokens for the type referenced by the specified TypeDef token. |
|EnumFieldsWithName Method| Enumerates FieldDef tokens of the specified type with the specified name. |
|EnumInterfaceImpls Method| Enumerates MethodDef tokens representing interface implementations. |
|EnumMemberRefs Method| Enumerates MemberRef tokens representing members of the specified type. |
|EnumMembers Method| Enumerates MemberDef tokens representing members of the specified type. |
|EnumMembersWithName Method| Enumerates MemberDef tokens representing members of the specified type with the specified name. |
|EnumMethodImpls Method| Enumerates MethodBody and MethodDeclaration tokens representing methods of the specified type. |
|EnumMethods Method| Enumerates MethodDef tokens representing methods of the specified type. |
|EnumMethodSemantics Method|Enumerates the properties and the property-change events to which the specified method is related.|
|EnumMethodsWithName Method| Enumerates methods that have the specified name and that are defined by the type referenced by the specified TypeDef token. |
|EnumModuleRefs Method| Enumerates ModuleRef tokens that represent imported modules. |
|EnumParams Method| Enumerates ParamDef tokens representing the parameters of the method referenced by the specified MethodDef token. |
|EnumPermissionSets Method| Enumerates permissions for the objects in a specified metadata scope. |
|EnumProperties Method| Enumerates PropertyDef tokens representing the properties of the type referenced by the specified TypeDef token. |
|EnumSignatures Method|Enumerates Signature tokens representing stand-alone signatures in the current scope.|
|EnumTypeDefs Method| Enumerates TypeDef tokens representing all types within the current scope. |
|EnumTypeRefs Method| Enumerates TypeRef tokens defined in the current metadata scope. |
|EnumTypeSpecs Method| Enumerates TypeSpec tokens defined in the current metadata scope. |
|EnumUnresolvedMethods Method| Enumerates MemberDef tokens representing the unresolved methods in the current metadata scope. |
|EnumUserStrings Method|Enumerates String tokens representing hard-coded strings in the current metadata scope.|
|FindField Method| Gets the FieldDef token for the field that is a member of the specified type, and has the specified name and metadata signature. |
|FindMember Method| Gets a pointer to the MemberDef token for the member defined by the specified type with the specified name and metadata signature. |
|FindMemberRef Method| Gets a pointer to the MemberRef token for the member defined by the specified type with the specified name and metadata signature. |
|FindMethod Method| Gets a pointer to the MethodDef token for the method defined by the specified type with the specified name and metadata signature. |
|FindTypeDefByName Method| Gets a pointer to the TypeDef metadata token for the type with the specified name. |
|FindTypeRef Method| Gets a pointer to the TypeRef metadata token that references the type in the specified search scope with the specified name. |
|GetClassLayout Method| Gets layout information for the class referenced by the specified TypeDef token. |
|GetCustomAttributeByName Method| Gets the value of the custom attribute, given its name. |
|GetCustomAttributeProps Method| Gets the value of the custom attribute, given its metadata token. |
|GetEventProps Method| Gets metadata information (including the declaring type, the add and remove methods for delegates, and any flags and other associated data) for the event represented by the specified event token. |
|GetFieldMarshal Method| Gets a pointer to the native, unmanaged type of the field represented by the specified Field metadata token. |
|GetFieldProps Method| Gets metadata associated with the field referenced by the specified FieldDef token. |
|GetInterfaceImplProps Method| Gets a pointer to the metadata tokens for the type that implements the specified method and for the interface that declares that method. |
|GetMemberProps Method| Gets metadata information (including the name, binary signature, and relative virtual address) of the type member referenced by the specified metadata token. |
|GetMemberRefProps Method| Gets metadata associated with the member referenced by the specified token. |
|GetMethodProps Method| Gets the metadata associated with the method referenced by the specified MethodDef token. |
|GetMethodSemantics Method| Gets a pointer to the relationship between the method referenced by the specified MethodDef token and the paired property and event referenced by the specified EventProp token. |
|GetModuleFromScope Method| Gets a pointer to the metadata token for the module referenced in the current metadata scope. |
|GetModuleRefProps Method| Gets the name of the module referenced by the specified metadata token. |
|GetNameFromToken <example-value>|Gets the UTF-8 name of the object referenced by the specified metadata token.|
|GetNativeCallConvFromSig Method| Gets the native calling convention for the method that is represented by the specified signature pointer. |
|GetNestedClassProps Method| Gets the TypeDef token for the enclosing parent type of the specified nested type. |
|GetParamForMethodIndex Method| Gets a pointer to the token that represents the parameter at the specified ordinal position in the sequence of method parameters for the method represented by the specified MethodDef token. |
|GetParamProps Method| Gets metadata values for the parameter referenced by the specified ParamDef token. |
|GetPermissionSetProps Method| Gets the metadata associated with the System.Security.PermissionSet represented by the specified Permission token. |
|GetPinvokeMap| Gets a ModuleRef token to represent the target assembly of a PInvoke call. |
|GetPropertyProps Method| Gets the metadata associated with the property represented by the specified token. |
|GetRVA Method| Gets the offset of the relative virtual address of the code object represented by the specified token. |
|GetScopeProps Method| Gets the name and optionally the version identifier of the assembly or module in the current metadata scope. |
|GetSigFromToken <example-value>| Gets the binary metadata signature associated with the specified token. |
|GetTypeDefProps Method| Returns metadata information for the type represented by the specified TypeDef token. |
|GetTypeRefProps Method| Gets the metadata associated with the type referenced by the specified TypeRef token. |
|GetTypeSpecFromToken <example-value>| Gets the binary metadata signature of the type specification represented by the specified token. |
|GetUserString Method| Gets the literal string represented by the specified metadata token. |
|IsGlobal Method| Gets a value indicating whether the field, method, or type represented by the specified metadata token has global scope. |
|IsValidToken <example-value>| Gets a value indicating whether the specified token holds a valid reference to a code object. |
|ResetEnum Method| Resets the specified enumerator to the specified position. |
|ResolveTypeRef Method| Gets type information for the type referenced by the specified TypeRef token. |

## Remarks

 The design of the `IMetaDataImport` interface is intended primarily to be used by tools and services that will be importing type information (for example, development tools) or managing deployed components (for example, resolution/activation services). The methods in `IMetaDataImport` fall into the following task categories:

- Enumerating collections of items in the metadata scope.

- Finding an item that has a specific set of characteristics.

- Getting properties of a specified item.

- The Get methods are specifically designed to return single-valued properties of a metadata item. When the property is a reference to another item, a token for that item is returned. Any pointer input type can be NULL to indicate that the particular value is not being requested. To obtain properties that are essentially collection objects (for example, the collection of interfaces that a class implements), use the enumeration methods.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- Metadata Interfaces
- IMetaDataImport2 Interface
