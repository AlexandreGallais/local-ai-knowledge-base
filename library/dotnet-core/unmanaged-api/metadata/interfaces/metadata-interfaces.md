---
title: "Metadata interfaces (.NET)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/interfaces/metadata-interfaces.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Metadata interfaces (.NET)

These articles describe the unmanaged metadata interfaces that provide access to the metadata exposed by .NET types, methods, fields, and other APIs. For unmanaged API metadata interfaces that are specific to .NET Framework, see Metadata interfaces.

IMapToken interface\
Provides mapping capabilities between imported and emitted metadata signatures.

IMetaDataAssemblyEmit interface\
Provides methods that support the self-description model used by the common language runtime (CLR) to resolve and consume resources.

IMetaDataAssemblyImport interface\
Provides methods to access and examine the contents of an assembly manifest.

IMetaDataDispenser interface\
`IMetaDataDispenser` is obsolete. Use `IMetaDataDispenserEx` instead.

IMetaDataDispenserEx interface\
Provides methods that map areas of memory for creating or modifying metadata.

IMetaDataEmit interface\
Provides methods to create, modify and store metadata about the assembly in the currently defined scope.

IMetaDataEmit2 interface\
Provides methods for defining and modifying the metadata signatures of methods and constructors with parameters of type `System.Type`.

IMetaDataError interface\
Provides a callback mechanism for reporting errors during the resolution of the metadata signature for an assembly.

IMetaDataFilter interface\
Provides methods for marking and filtering metadata tokens to avoid repeating actions that have already been taken.

IMetaDataImport interface\
Provides methods for importing and manipulating types from other assemblies.

IMetaDataImport2 interface\
Extends `IMetaDataImport` to provide the capability of working with generic types.

IMetaDataInfo interface\
Provides a method that gets information about the mapping of metadata from an on-disk file into memory.

IMetaDataTables interface\
Provides methods for the storage and retrieval of metadata information in tables.

IMetaDataTables2 interface\
Extends `IMetaDataTables` to include methods for working with metadata streams.

IMetaDataValidate interface\
Provides methods to use for validation of metadata signatures.

## See also

- Metadata interfaces (.NET Framework)
