---
title: "ICorDebugILCode2 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugilcode2-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugILCode2 Interface

Logically extends the ICorDebugILCode interface to provide methods that return the token for a function'<example-value>'s instrumented intermediate language (IL) offsets to original method IL offsets.

## Methods

|Method|Description|
|------------|-----------------|
|GetInstrumentedILMap Method|Returns a map from profiler instrumented IL offsets to original method IL offsets for this instance.|
|GetLocalVarSigToken <example-value>|Gets the metadata token for the local variable signature for the function that is represented by this instance.|

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5.2

## See also

- ICorDebugILCode Interface
