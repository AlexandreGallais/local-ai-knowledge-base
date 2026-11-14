---
title: "IMetaDataImport2 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataimport2-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataImport2 Interface

Extends the IMetaDataImport interface to provide the capability of working with generic types.

## Methods

| Method | Description |
|------------|-----------------|
|EnumGenericParamConstraints Method| Gets an enumerator for an array of generic parameter constraints associated with the generic parameter represented by the specified token. |
|EnumGenericParams Method| Gets an enumerator for an array of generic parameter tokens associated with the specified TypeDef or MethodDef token. |
|EnumMethodSpecs Method| Gets an enumerator for an array of MethodSpec tokens associated with the specified MethodDef or MemberRef token. |
|GetGenericParamConstraintProps Method| Gets the metadata associated with the generic parameter constraint represented by the specified constraint token. |
|GetGenericParamProps Method| Gets the metadata associated with the generic parameter represented by the specified token. |
|GetMethodSpecProps Method| Gets the metadata signature of the method referenced by the specified MethodSpec token. |
|GetPEKind Method|Gets a value identifying the nature of the code in a portable executable (PE) file, typically a DLL or EXE file, defined in the current metadata scope|
|GetVersionString Method| Gets the version number of the runtime that was used to build the assembly. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- `System.Reflection.PortableExecutableKinds`
- Metadata Interfaces
- IMetaDataImport Interface
