---
title: "IMetaDataDispenserEx Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadatadispenserex-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataDispenserEx Interface

Extends the IMetaDataDispenser Interface interface to provide the capability to control how the metadata APIs operate on the current metadata scope.

## Methods

| Method | Description |
|------------|-----------------|
|FindAssembly Method| This method is not implemented. If called, it returns E_NOTIMPL. |
|FindAssemblyModule Method| This method is not implemented. If called, it returns E_NOTIMPL. |
|GetCORSystemDirectory Method|Gets the directory that holds the current common language runtime (CLR). This method is supported only for use by out-of-process debuggers. If called from another component, it will return E_NOTIMPL.|
|GetOption Method| Gets the value of the specified option for the current metadata scope. The option controls how calls to the current metadata scope are handled. |
|OpenScopeOnITypeInfo Method| This method is not implemented. If called, it returns E_NOTIMPL. |
|SetOption Method| Sets the specified option to a given value for the current metadata scope. The option controls how calls to the current metadata scope are handled. |

## Requirements

 **Platform:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

## See also

- Metadata Interfaces
- IMetaDataDispenser Interface
- IMetaDataEmit Interface
- IMetaDataImport Interface
