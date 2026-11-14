---
title: "ICorDebugILCode Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugilcode-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugILCode Interface

Represents a segment of intermediate language (IL) code.

## Methods

|Method|Description|
|------------|-----------------|
|GetEHClauses Method|Returns a pointer to a list of exception handling (EH) clauses that are defined for this IL.|

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5.2
