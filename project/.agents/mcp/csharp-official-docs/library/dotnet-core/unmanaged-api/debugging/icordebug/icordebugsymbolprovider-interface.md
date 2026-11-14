---
title: "ICorDebugSymbolProvider Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugsymbolprovider-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugSymbolProvider Interface

Provides methods that can be used to retrieve debug symbol information.

## Methods

|Method|Description|
|------------|-----------------|
|GetAssemblyImageBytes Method|Reads data from a merged assembly given a relative virtual address (RVA) in the merged assembly.|
|GetAssemblyImageMetadata Method|Returns the metadata from a merged assembly.|
|GetCodeRange Method|Gets the method start address and size given a relative virtual address (RVA) in a method.|
|GetInstanceFieldSymbols Method|Gets the instance field symbols that correspond to a typespec signature.|
|GetMergedAssemblyRecords Method|Gets the symbol records for all the merged assemblies.|
|GetMethodLocalSymbols Method|Gets a method's local symbols given the relative virtual address (RVA) of that method.|
|GetMethodParameterSymbols Method|Gets a method's parameter symbols given the relative virtual address (RVA) of that method.|
|GetMethodProps Method|Returns information about method properties, such as the method's metadata token and information about its generic parameters, given a relative virtual address (RVA) in that method.|
|GetObjectSize Method|Returns the object size for an object based on its typespec signature.|
|GetStaticFieldSymbols Method|Gets the static field symbols that correspond to a typespec signature.|
|GetTypeProps Method|Returns information about a type's properties, such as the number of signature of its generic parameters, given a relative virtual address (RVA) in a vtable.|

## Remarks

> **Note:**
> This interface is available with .NET Native only. If you implement this interface for ICorDebug scenarios outside of .NET Native, the common language runtime will ignore this interface.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6
