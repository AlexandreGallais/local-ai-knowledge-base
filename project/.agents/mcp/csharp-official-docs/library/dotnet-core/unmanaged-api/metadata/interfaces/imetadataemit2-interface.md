---
title: "IMetaDataEmit2 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/metadata/interfaces/imetadataemit2-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMetaDataEmit2 Interface

Extends the IMetaDataEmit interface primarily to provide the ability to work with generic types.

## Methods

| Method | Description |
|------------|-----------------|
|DefineGenericParam Method| Creates a definition for a generic type parameter, and gets a token to that generic type parameter. |
|DefineMethodSpec Method| Creates a generic instance of a method, and gets a token to the definition. |
|GetDeltaSaveSize Method|Gets a value indicating the difference in size of the data that is required to express the changes for the current edit-and-continue session.|
|ResetENCLog Method|Resets the edit-and-continue log and starts a new session.|
|SaveDelta Method|Saves changes from the current edit-and-continue session to the specified file.|
|SaveDeltaToMemory Method|Saves changes from the current edit-and-continue session to memory.|
|SaveDeltaToStream Method|Saves changes from the current edit-and-continue session to the specified stream.|
|SetGenericParamProps Method| Sets property values for the generic parameter definition referenced by the specified token. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- Metadata Interfaces
- IMetaDataEmit Interface
