---
title: "ICorDebugMergedAssemblyRecord Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmergedassemblyrecord-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugMergedAssemblyRecord Interface

Provides information about a merged assembly.

## Methods

|Method|Description|
|------------|-----------------|
|GetCulture Method|Gets the culture name string of the assembly.|
|GetIndex Method|Gets the assembly's prefix index.|
|GetPublicKey Method|Gets the assembly's public key.|
|GetPublicKeyToken Method|Gets the assembly's public key token.|
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
