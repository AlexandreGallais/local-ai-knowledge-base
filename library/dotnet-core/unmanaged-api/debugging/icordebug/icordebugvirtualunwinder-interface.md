---
title: "ICorDebugVirtualUnwinder Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugvirtualunwinder-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugVirtualUnwinder Interface

Provides methods to help in stack unwinding.

## Methods

|Method|Name|
|------------|----------|
|GetContext Method|Gets the current context of this unwinder.|
|Next Method|Advances to the caller's context.|

## Remarks

The members of the `ICorDebugVirtualUnwinder` interface are implemented by the debugger to help in stack unwinding.

> **Note:**
> This interface is available with .NET Native only. If you implement this interface for ICorDebug scenarios outside of .NET Native, the common language runtime will ignore this interface.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6
