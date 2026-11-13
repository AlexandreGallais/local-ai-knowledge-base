---
title: "ICorDebugILCode2 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugilcode2-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugILCode2 Interface

Logically extends the ICorDebugILCode interface to provide methods that return the token for a function's local variable signature, and that map a profiler's instrumented intermediate language (IL) offsets to original method IL offsets.

## Methods

|Method|Description|
|------------|-----------------|
|GetInstrumentedILMap Method|Returns a map from profiler instrumented IL offsets to original method IL offsets for this instance.|
|GetLocalVarSigToken Method|Gets the metadata token for the local variable signature for the function that is represented by this instance.|

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5.2

## See also

- ICorDebugILCode Interface
