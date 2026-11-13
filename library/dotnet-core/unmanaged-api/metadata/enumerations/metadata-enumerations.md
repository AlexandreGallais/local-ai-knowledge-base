---
title: "Metadata enumerations (.NET)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/enumerations/metadata-enumerations.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Metadata enumerations (.NET)

These articles describe the unmanaged enumerations that the metadata API uses. For unmanaged enumerations that apply only to .NET Framework, see Metadata enumerations (.NET Framework).

CorAssemblyFlags enumeration\
Contains values that describe the metadata applied to an assembly compilation.

CorCheckDuplicatesFor enumeration\
Contains values used during checks for duplications.

CorDeclSecurity enumeration\
Contains values that describe the types of declarative security used by the common language runtime.

CorElementType enumeration

CorErrorIfEmitOutOfOrder enumeration\
Contains flag values that indicate the conditions under which an error message should be generated when metadata is emitted out of order.

CorFileFlags enumeration\
Contains values that describe the type of file defined in a call to theIMetaDataAssemblyEmit::DefineFile method.

CorFileMapping enumeration\
Contains values that describe the type of file mapping that is returned from a call to theIMetaDataInfo::GetFileMapping method.

CorGenericParamAttr enumeration\
Contains values that describe the `System.Type` parameters for generic types, as used in calls to theIMetaDataEmit2::DefineGenericParam method.

CorImportOptions enumeration\
Contains flag values that control the behavior during importation of an assembly outside the current scope.

CorLinkerOptions enumeration\
Specifies flags to select options for the metadata linker.

CorLocalRefPreservation enumeration\
Contains flag values for the treatment of local references.

CorManifestResourceFlags enumeration\
Contains values that describe the visibility of resources encoded in an assembly manifest.

CorMethodAttr enumeration\
Contains values that describe metadata about a method.

CorMethodImpl enumeration\
Contains values that describe method implementation features.

CorMethodSemanticsAttr enumeration\
Contains values that describe the relationship between a method and an associated property or event.

CorNotificationForTokenMovement enumeration\
Contains flag values that influence notifications upon token movement.

CorOpenFlags enumeration\
Contains flag values that control metadata behavior upon opening manifest files.

CorPEKind enumeration\
Contains values that describe a portable executable file, as returned from a call to theIMetaDataImport2::GetPEKind method.

CorPinvokeMap enumeration\
Contains values that describe features of a PInvoke call.

CorPropertyAttr enumeration\
Contains values that describe the metadata of a property.

CorRefToDefCheck enumeration\
Specifies flags to control which referenced items are converted to their definitions in order to optimize the code.

CorSaveSize enumeration\
Contains values indicating the level of precision required when querying for the size of a save operation.

CorSetENC enumeration\
Contains values used to influence behavior during the generation of metadata.

CorThreadSafetyOptions enumeration\
Specifies flags to select options for thread safety.

CorTypeAttr enumeration\
Contains values that indicate type metadata.

CorValidatorModuleType enumeration\
Provides values used by theIMetaDataValidate interface to specify the type of the module (PE file vs. .obj file).

## See also

- Metadata enumerations (.NET Framework)
