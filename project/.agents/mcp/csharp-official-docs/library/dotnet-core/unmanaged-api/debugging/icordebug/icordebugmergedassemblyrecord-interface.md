---
title: "ICorDebugMergedAssemblyRecord Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmergedassemblyrecord-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugMergedAssemblyRecord Interface

Provides information about a merged assembly.

## Methods

|Method|Description|
|------------|-----------------|
|GetCulture Method|Gets the culture name string of the assembly.|
|GetIndex Method|Gets the assembly's prefix index.|
|GetPublicKey <example-value>|Gets the assembly's public key.|
|GetPublicKeyToken <example-value>|Gets the assembly's public key token.|
|GetSimpleName Method|Gets the simple name of the assembly.|
|GetVersion Method|Gets the assembly's version information.|

## Remarks

> **Note:**
> This interface is available with .NET Native only. If you implement this interface for ICorDebug scenarios outside of .NET Native, the common language runtime will ignore this interface.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6
