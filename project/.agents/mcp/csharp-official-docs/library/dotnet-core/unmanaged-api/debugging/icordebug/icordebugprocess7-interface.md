---
title: "ICorDebugProcess7 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess7-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugProcess7 Interface

Provides a method that configures the debugger to handle in-memory metadata updates in the target process.

## Methods

|Method|Description|
|------------|-----------------|
|SetWriteableMetadataUpdateMode Method|Sets a value that determines how the debugger handles in-memory updates to metadata within the target process.|

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5.2
